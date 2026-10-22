

import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";

import { prisma } from "./lib/prisma";

import authRoutes from "./routes/auth.routes";
import productsRoutes from "./routes/products.routes";
import ordersRoutes from "./routes/orders.routes";
import usersRoutes from "./routes/users.routes";
import stripeRoutes from "./routes/stripe.routes";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(helmet());

const allowedOrigins = (
  process.env.FRONTEND_URL || "http://localhost:3000"
)
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: allowedOrigins,
  })
);

// WEBHOOK DE STRIPE: debe estar antes de express.json()
app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const signature = req.headers["stripe-signature"];

    if (!secretKey || !webhookSecret) {
      console.error("Faltan las claves de Stripe");
      res.sendStatus(503);
      return;
    }

    if (typeof signature !== "string" || !Buffer.isBuffer(req.body)) {
      res.sendStatus(400);
      return;
    }

    const stripe = new Stripe(secretKey);

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      );
    } catch (error) {
      console.error("Firma de Stripe no válida:", error);
      res.sendStatus(400);
      return;
    }

    try {
      if (
        event.type === "checkout.session.completed" ||
        event.type === "checkout.session.async_payment_succeeded"
      ) {
        const session = event.data.object as Stripe.Checkout.Session;

        // Nunca confirmar pedidos sin pago efectivo.
        if (session.payment_status !== "paid") {
          res.json({ received: true });
          return;
        }

        const orderId = session.metadata?.orderId;

        if (
          !orderId ||
          session.client_reference_id !== orderId ||
          session.currency?.toLowerCase() !== "eur" ||
          typeof session.amount_total !== "number"
        ) {
          console.error("Sesión de Stripe con datos inválidos");
          res.sendStatus(400);
          return;
        }

        const order = await prisma.order.findUnique({
          where: { id: orderId },
        });

        if (
          !order ||
          order.stripeSessionId !== session.id ||
          order.total !== session.amount_total
        ) {
          console.error("El pago no coincide con el pedido:", orderId);
          res.sendStatus(409);
          return;
        }

        if (order.status === "PENDING") {
          await prisma.order.updateMany({
            where: {
              id: order.id,
              status: "PENDING",
              stripeSessionId: session.id,
            },
            data: { status: "PAID" },
          });

          console.log("Pago confirmado para el pedido:", order.id);
        } else if (order.status === "CANCELLED") {
          // No reactivar pedidos cancelados automáticamente:
          // podría haberse devuelto ya su stock.
          console.error(
            "ATENCIÓN: pago recibido para pedido cancelado:",
            order.id
          );
          res.sendStatus(409);
          return;
        }
      }

      if (
        event.type === "checkout.session.expired" ||
        event.type === "checkout.session.async_payment_failed"
      ) {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;

        if (!orderId || session.client_reference_id !== orderId) {
          res.sendStatus(400);
          return;
        }

        await prisma.$transaction(
          async (tx) => {
            const order = await tx.order.findFirst({
              where: {
                id: orderId,
                stripeSessionId: session.id,
                status: "PENDING",
              },
              include: { items: true },
            });

            if (!order) return;

            const updated = await tx.order.updateMany({
              where: {
                id: order.id,
                status: "PENDING",
                stripeSessionId: session.id,
              },
              data: { status: "CANCELLED" },
            });

            if (updated.count !== 1) return;

            for (const item of order.items) {
              await tx.product.update({
                where: { id: item.productId },
                data: {
                  stock: { increment: item.quantity },
                },
              });
            }

            console.log(
              "Pedido cancelado y stock recuperado:",
              order.id
            );
          },
          { isolationLevel: "Serializable" }
        );
      }

      res.json({ received: true });
    } catch (error) {
      console.error("Error procesando webhook de Stripe:", error);
      res.sendStatus(500);
    }
  }
);

// JSON para las demás rutas
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/stripe", stripeRoutes);

app.get("/", (_req, res) => {
  res.json({
    message: "Money Way Empire API",
    status: "online",
  });
});

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Backend de Money Way Empire funcionando",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/db-health", async (_req, res) => {
  try {
    const totalUsers = await prisma.user.count();

    res.json({
      success: true,
      message: "Conexión con PostgreSQL correcta",
      totalUsers,
    });
  } catch (error) {
    console.error("Error de conexión con PostgreSQL:", error);

    res.status(500).json({
      success: false,
      message: "No se ha podido conectar con PostgreSQL",
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `Money Way Empire API funcionando en http://localhost:${PORT}`
  );
});


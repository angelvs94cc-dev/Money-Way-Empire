
import { Router } from "express";
import Stripe from "stripe";
import { requireAuth } from "../middlewares/auth.middleware";
import { prisma } from "../lib/prisma";

const router = Router();

function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (
    !secretKey ||
    (!secretKey.startsWith("sk_test_") &&
      !secretKey.startsWith("rk_test_"))
  ) {
    throw new Error("Falta una clave válida de Stripe de pruebas");
  }

  return new Stripe(secretKey);
}

function isValidPayment(
  session: Stripe.Checkout.Session,
  order: {
    id: string;
    total: number;
    stripeSessionId: string | null;
  }
): boolean {
  return (
    session.id === order.stripeSessionId &&
    session.client_reference_id === order.id &&
    session.metadata?.orderId === order.id &&
    session.mode === "payment" &&
    session.status === "complete" &&
    session.payment_status === "paid" &&
    session.currency?.toLowerCase() === "eur" &&
    session.amount_total === order.total &&
    session.livemode === false
  );
}

// GET /api/stripe/status
router.get("/status", requireAuth, (_req, res) => {
  try {
    getStripe();

    res.json({
      success: true,
      message: "Stripe configurado en modo de pruebas",
    });
  } catch {
    res.status(503).json({
      success: false,
      message: "Stripe no está configurado correctamente",
    });
  }
});

// POST /api/stripe/verify
// Recuperar un pago confirmado cuando no llega el webhook.
router.post("/verify", requireAuth, async (req, res) => {
  try {
    const userId = res.locals.userId as string;
    const orderId: unknown = req.body?.orderId;

    if (typeof orderId !== "string" || !orderId.trim()) {
      res.status(400).json({
        success: false,
        message: "Debes indicar un pedido válido",
      });
      return;
    }

    const order = await prisma.order.findFirst({
      where: {
        id: orderId.trim(),
        userId,
      },
    });

    if (!order) {
      res.status(404).json({
        success: false,
        message: "Pedido no encontrado",
      });
      return;
    }

    if (order.status === "PAID") {
      res.json({
        success: true,
        status: "PAID",
        message: "El pago ya estaba confirmado",
      });
      return;
    }

    if (order.status !== "PENDING" || !order.stripeSessionId) {
      res.status(409).json({
        success: false,
        message: "Este pedido no tiene un pago pendiente verificable",
      });
      return;
    }

    const stripe = getStripe();

    const session = await stripe.checkout.sessions.retrieve(
      order.stripeSessionId
    );

    if (!isValidPayment(session, order)) {
      res.status(409).json({
        success: false,
        status: "PENDING",
        message: "Stripe todavía no confirma el pago de este pedido",
      });
      return;
    }

    const updated = await prisma.order.updateMany({
      where: {
        id: order.id,
        userId,
        status: "PENDING",
        stripeSessionId: session.id,
        total: session.amount_total!,
      },
      data: {
        status: "PAID",
      },
    });

    if (updated.count !== 1) {
      const current = await prisma.order.findUnique({
        where: { id: order.id },
      });

      if (current?.status !== "PAID") {
        res.status(409).json({
          success: false,
          message: "El pedido cambió durante la verificación",
        });
        return;
      }
    }

    res.json({
      success: true,
      status: "PAID",
      message: "Pago confirmado correctamente con Stripe",
    });
  } catch (error) {
    console.error("Error al verificar el pago de Stripe:", error);

    res.status(500).json({
      success: false,
      message: "No se pudo verificar el pago",
    });
  }
});

// POST /api/stripe/checkout
router.post("/checkout", requireAuth, async (req, res) => {
  try {
    const userId = res.locals.userId as string;
    const orderId: unknown = req.body?.orderId;

    if (typeof orderId !== "string" || !orderId.trim()) {
      res.status(400).json({
        success: false,
        message: "Debes indicar un pedido válido",
      });
      return;
    }

    const order = await prisma.order.findFirst({
      where: {
        id: orderId.trim(),
        userId,
      },
      include: {
        items: true,
      },
    });

    if (!order) {
      res.status(404).json({
        success: false,
        message: "Pedido no encontrado",
      });
      return;
    }

    if (order.status !== "PENDING") {
      res.status(409).json({
        success: false,
        message: "Este pedido no está pendiente de pago",
      });
      return;
    }

    const stripe = getStripe();

    // Si ya existe una sesión, consultar su estado.
    if (order.stripeSessionId) {
      const existingSession = await stripe.checkout.sessions.retrieve(
        order.stripeSessionId
      );

      if (isValidPayment(existingSession, order)) {
        const updated = await prisma.order.updateMany({
          where: {
            id: order.id,
            userId,
            status: "PENDING",
            stripeSessionId: existingSession.id,
            total: existingSession.amount_total!,
          },
          data: {
            status: "PAID",
          },
        });

        if (updated.count !== 1) {
          res.status(409).json({
            success: false,
            message: "El pedido ha cambiado. Actualiza la página.",
          });
          return;
        }

        res.json({
          success: true,
          status: "PAID",
          message: "El pago ya estaba confirmado en Stripe",
        });
        return;
      }

      if (
        existingSession.status === "open" &&
        existingSession.payment_status === "unpaid" &&
        existingSession.url
      ) {
        res.json({
          success: true,
          checkoutUrl: existingSession.url,
          sessionId: existingSession.id,
        });
        return;
      }

      res.status(409).json({
        success: false,
        message:
          "La sesión anterior no permite continuar. Revisa el pedido.",
      });
      return;
    }

    if (
      order.items.length === 0 ||
      order.items.some(
        (item) =>
          !Number.isSafeInteger(item.unitPrice) ||
          item.unitPrice <= 0 ||
          !Number.isSafeInteger(item.quantity) ||
          item.quantity <= 0
      )
    ) {
      res.status(400).json({
        success: false,
        message: "El pedido contiene importes no válidos",
      });
      return;
    }

    const calculatedTotal = order.items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );

    if (
      !Number.isSafeInteger(calculatedTotal) ||
      calculatedTotal !== order.total
    ) {
      res.status(409).json({
        success: false,
        message: "El total del pedido no coincide",
      });
      return;
    }

    const session = await stripe.checkout.sessions.create(
      {
        mode: "payment",
        client_reference_id: order.id,
        metadata: {
          orderId: order.id,
        },
        line_items: order.items.map((item) => ({
          price_data: {
            currency: "eur",
            product_data: {
              name: [
                item.productName,
                item.size ? `Talla ${item.size}` : null,
                item.color ? `Color ${item.color}` : null,
              ]
                .filter(Boolean)
                .join(" - "),
            },
            unit_amount: item.unitPrice,
          },
          quantity: item.quantity,
        })),
        success_url:
          "http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url:
          "http://localhost:3000/checkout/cancel",
      },
      {
        idempotencyKey: `checkout-${order.id}`,
      }
    );

    const updated = await prisma.order.updateMany({
      where: {
        id: order.id,
        userId,
        status: "PENDING",
        stripeSessionId: null,
      },
      data: {
        stripeSessionId: session.id,
      },
    });

    if (updated.count !== 1) {
      res.status(409).json({
        success: false,
        message: "El pedido ya tiene una sesión de pago",
      });
      return;
    }

    res.json({
      success: true,
      checkoutUrl: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Error en Stripe Checkout:", error);

    res.status(500).json({
      success: false,
      message: "No se pudo procesar el pago",
    });
  }
});

export default router;

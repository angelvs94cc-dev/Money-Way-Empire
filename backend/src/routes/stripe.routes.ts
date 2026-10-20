
import { Router } from "express";
import Stripe from "stripe";
import { requireAuth } from "../middlewares/auth.middleware";
import { prisma } from "../lib/prisma";

const router = Router();

// Inicializar Stripe únicamente en modo de pruebas.
// Admitimos claves secretas (sk_test_) y restringidas (rk_test_).
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

// GET /api/stripe/status
// Comprobar la configuración local de Stripe.
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

// POST /api/stripe/checkout
// Crear una sesión de pago para un pedido pendiente.
router.post("/checkout", requireAuth, async (req, res) => {
  try {
    const userId = res.locals.userId as string;
    const orderId: unknown = req.body?.orderId;

    // Validar identificador del pedido.
    if (typeof orderId !== "string" || !orderId.trim()) {
      res.status(400).json({
        success: false,
        message: "Debes indicar un pedido válido",
      });
      return;
    }

    // Buscar únicamente pedidos del usuario autenticado.
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

    // Solo pueden pagarse pedidos pendientes.
    if (order.status !== "PENDING") {
      res.status(409).json({
        success: false,
        message: "Este pedido no está pendiente de pago",
      });
      return;
    }

    // Evitar crear otra sesión para el mismo pedido.
    if (order.stripeSessionId) {
      res.status(409).json({
        success: false,
        message: "Este pedido ya tiene una sesión de pago",
      });
      return;
    }

    // Validar productos, cantidades e importes.
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

    // Los precios se almacenan en céntimos.
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

    const stripe = getStripe();

    // Crear la sesión de Stripe Checkout.
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

    // Asociar la sesión de Stripe al pedido.
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

    // Devolver la URL de Stripe Checkout.
    res.json({
      success: true,
      checkoutUrl: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Error al crear Stripe Checkout:", error);

    res.status(500).json({
      success: false,
      message: "No se pudo iniciar el pago",
    });
  }
});

export default router;

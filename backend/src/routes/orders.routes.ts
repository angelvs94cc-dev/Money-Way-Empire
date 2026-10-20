
import { Router, Request, Response } from "express";
import { OrderStatus } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/admin.middleware";

const router = Router();

type PedidoItem = {
  productId: string;
  quantity: number;
  size?: string | null;
  color?: string | null;
};

const estadosValidos: OrderStatus[] = [
  "PENDING",
  "PAID",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

// ADMIN: CONSULTAR TODOS LOS PEDIDOS
router.get(
  "/admin",
  requireAuth,
  requireAdmin,
  async (_req: Request, res: Response) => {
    try {
      const pedidos = await prisma.order.findMany({
        include: {
          items: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      res.json({
        success: true,
        orders: pedidos,
      });
    } catch (error) {
      console.error("Error al consultar pedidos de admin:", error);

      res.status(500).json({
        success: false,
        message: "No se pudieron consultar los pedidos",
      });
    }
  }
);



 // ADMIN: ACTUALIZAR ESTADO Y CANCELAR PEDIDOS CON DEVOLUCIÓN DE STOCK
router.patch(
  "/admin/:id/status",
  requireAuth,
  requireAdmin,
  async (req: Request, res: Response) => {
    try {
      const id = String(req.params.id);
      const status: unknown = req.body?.status;

      if (
        typeof status !== "string" ||
        !estadosValidos.includes(status as OrderStatus)
      ) {
        res.status(400).json({
          success: false,
          message: "Estado de pedido no válido",
        });
        return;
      }

      const nuevoEstado = status as OrderStatus;

      const pedido = await prisma.$transaction(
        async (tx) => {
          const actual = await tx.order.findUnique({
            where: { id },
            include: { items: true },
          });

          if (!actual) {
            throw new Error("ORDER_NOT_FOUND");
          }

          if (actual.status === "CANCELLED") {
            throw new Error("ALREADY_CANCELLED");
          }

          if (actual.status === nuevoEstado) {
            return tx.order.findUniqueOrThrow({
              where: { id },
              include: {
                items: true,
                user: {
                  select: { id: true, name: true, email: true },
                },
              },
            });
          }

          if (nuevoEstado === "CANCELLED") {
            // Solo cancelamos pedidos que no se han enviado.
            if (
              actual.status === "SHIPPED" ||
              actual.status === "DELIVERED"
            ) {
              throw new Error("CANNOT_CANCEL_SHIPPED");
            }

            // El cambio condicional evita procesar dos veces
            // una misma cancelación.
            const cambio = await tx.order.updateMany({
              where: {
                id,
                status: actual.status,
              },
              data: {
                status: "CANCELLED",
              },
            });

            if (cambio.count !== 1) {
              throw new Error("ORDER_CHANGED");
            }

            const cantidades = new Map<string, number>();

            for (const item of actual.items) {
              cantidades.set(
                item.productId,
                (cantidades.get(item.productId) ?? 0) +
                  item.quantity
              );
            }

            // Devolvemos las unidades incluso si el producto
            // se ha desactivado de la tienda.
            for (const [productId, cantidad] of cantidades) {
              await tx.product.update({
                where: { id: productId },
                data: {
                  stock: { increment: cantidad },
                },
              });
            }
          } else {
            // Evitamos retroceder pedidos enviados o entregados.
            const transiciones: Record<OrderStatus, OrderStatus[]> = {
              PENDING: [],
              PAID: ["SHIPPED"],
              SHIPPED: ["DELIVERED"],
              DELIVERED: [],
              CANCELLED: [],
            };

            if (!transiciones[actual.status].includes(nuevoEstado)) {
              throw new Error("INVALID_TRANSITION");
            }

            const cambio = await tx.order.updateMany({
              where: {
                id,
                status: actual.status,
              },
              data: {
                status: nuevoEstado,
              },
            });

            if (cambio.count !== 1) {
              throw new Error("ORDER_CHANGED");
            }
          }

          return tx.order.findUniqueOrThrow({
            where: { id },
            include: {
              items: true,
              user: {
                select: { id: true, name: true, email: true },
              },
            },
          });
        },
        {
          isolationLevel: "Serializable",
        }
      );

      res.json({
        success: true,
        message:
          nuevoEstado === "CANCELLED"
            ? "Pedido cancelado y stock recuperado"
            : "Estado del pedido actualizado",
        order: pedido,
      });
    } catch (error) {
      console.error("Error al actualizar pedido:", error);

      const mensajes: Record<string, string> = {
        ORDER_NOT_FOUND: "Pedido no encontrado",
        ALREADY_CANCELLED: "El pedido ya está cancelado",
        CANNOT_CANCEL_SHIPPED:
          "No se puede cancelar un pedido enviado o entregado",
        INVALID_TRANSITION: "Cambio de estado no permitido",
        ORDER_CHANGED:
          "El pedido ha cambiado. Actualiza la página e inténtalo de nuevo",
      };

      if (error instanceof Error && mensajes[error.message]) {
        res.status(
          error.message === "ORDER_NOT_FOUND" ? 404 : 409
        ).json({
          success: false,
          message: mensajes[error.message],
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: "No se pudo actualizar el pedido",
      });
    }
  }
);


// CLIENTE: CONSULTAR SUS PROPIOS PEDIDOS
router.get("/", requireAuth, async (_req: Request, res: Response) => {
  try {
    const userId = res.locals.userId as string;

    const pedidos = await prisma.order.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });

    res.json({
      success: true,
      orders: pedidos,
    });
  } catch (error) {
    console.error("Error al consultar pedidos:", error);

    res.status(500).json({
      success: false,
      message: "No se pudieron consultar los pedidos",
    });
  }
});

// CLIENTE: CREAR UN PEDIDO
router.post("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId as string;
    const items: unknown = req.body?.items;

    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({
        success: false,
        message: "El pedido debe contener productos",
      });
      return;
    }

    if (items.length > 50) {
      res.status(400).json({
        success: false,
        message: "Demasiados productos en el pedido",
      });
      return;
    }

    const productosSolicitados: PedidoItem[] = [];

    for (const item of items) {
      if (
        !item ||
        typeof item.productId !== "string" ||
        !Number.isSafeInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 10 ||
        (item.size != null && typeof item.size !== "string") ||
        (item.color != null && typeof item.color !== "string")
      ) {
        res.status(400).json({
          success: false,
          message: "Hay productos con datos incorrectos",
        });
        return;
      }

      productosSolicitados.push({
        productId: item.productId,
        quantity: item.quantity,
        size: item.size ?? null,
        color: item.color ?? null,
      });
    }

    const pedido = await prisma.$transaction(
      async (tx) => {
        const lineas: {
          productId: string;
          productName: string;
          quantity: number;
          unitPrice: number;
          size: string | null;
          color: string | null;
        }[] = [];

        const cantidadesPorProducto = new Map<string, number>();

        for (const item of productosSolicitados) {
          const producto = await tx.product.findUnique({
            where: { id: item.productId },
          });

          if (!producto || !producto.active) {
            throw new Error("PRODUCT_NOT_FOUND");
          }

          const talla = item.size?.trim() || null;
          const color = item.color?.trim() || null;

          if (
            (producto.sizes.length > 0 &&
              (!talla || !producto.sizes.includes(talla))) ||
            (producto.sizes.length === 0 && talla !== null)
          ) {
            throw new Error("INVALID_SIZE");
          }

          if (
            (producto.colors.length > 0 &&
              (!color || !producto.colors.includes(color))) ||
            (producto.colors.length === 0 && color !== null)
          ) {
            throw new Error("INVALID_COLOR");
          }

          lineas.push({
            productId: producto.id,
            productName: producto.name,
            quantity: item.quantity,
            unitPrice: producto.price,
            size: talla,
            color,
          });

          cantidadesPorProducto.set(
            producto.id,
            (cantidadesPorProducto.get(producto.id) ?? 0) +
              item.quantity
          );
        }

        for (const [productId, cantidad] of cantidadesPorProducto) {
          const resultado = await tx.product.updateMany({
            where: {
              id: productId,
              active: true,
              stock: { gte: cantidad },
            },
            data: {
              stock: { decrement: cantidad },
            },
          });

          if (resultado.count !== 1) {
            throw new Error("INSUFFICIENT_STOCK");
          }
        }

        const total = lineas.reduce(
          (suma, item) => suma + item.unitPrice * item.quantity,
          0
        );

        return tx.order.create({
          data: {
            userId,
            total,
            status: "PENDING",
            items: {
              create: lineas,
            },
          },
          include: {
            items: true,
          },
        });
      },
      {
        isolationLevel: "Serializable",
      }
    );

    res.status(201).json({
      success: true,
      message: "Pedido registrado correctamente",
      order: pedido,
    });
  } catch (error) {
    console.error("Error al crear pedido:", error);

    if (error instanceof Error) {
      const mensajes: Record<string, string> = {
        PRODUCT_NOT_FOUND: "Producto no disponible",
        INVALID_SIZE: "La talla seleccionada no es válida",
        INVALID_COLOR: "El color seleccionado no es válido",
        INSUFFICIENT_STOCK: "No hay stock suficiente",
      };

      if (mensajes[error.message]) {
        res.status(400).json({
          success: false,
          message: mensajes[error.message],
        });
        return;
      }
    }

    res.status(500).json({
      success: false,
      message: "No se pudo registrar el pedido",
    });
  }
});

export default router;




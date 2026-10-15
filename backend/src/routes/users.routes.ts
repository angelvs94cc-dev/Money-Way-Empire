
import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();

// ADMIN: CONSULTAR TODOS LOS USUARIOS REGISTRADOS
router.get(
  "/admin",
  requireAuth,
  async (_req: Request, res: Response) => {
    try {
      const userId = res.locals.userId as string;

      const administrador = await prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
      });

      if (!administrador || administrador.role !== "ADMIN") {
        res.status(403).json({
          success: false,
          message: "No tienes permisos de administrador",
        });
        return;
      }

      const usuarios = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          _count: {
            select: {
              orders: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      res.json({
        success: true,
        users: usuarios,
      });
    } catch (error) {
      console.error("Error al consultar usuarios:", error);

      res.status(500).json({
        success: false,
        message: "No se pudieron consultar los usuarios",
      });
    }
  }
);

export default router;

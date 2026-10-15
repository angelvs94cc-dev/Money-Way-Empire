
import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";

export async function requireAdmin(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.userId;

    if (typeof userId !== "string") {
      res.status(401).json({
        success: false,
        message: "Necesitas iniciar sesión",
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user || user.role !== "ADMIN") {
      res.status(403).json({
        success: false,
        message: "No tienes permisos de administrador",
      });
      return;
    }

    next();
  } catch (error) {
    console.error("Error al comprobar permisos:", error);

    res.status(500).json({
      success: false,
      message: "Error al comprobar permisos",
    });
  }
}

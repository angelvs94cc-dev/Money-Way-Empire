
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      message: "Necesitas iniciar sesión",
    });
    return;
  }

  const token = authorization.slice(7);
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    res.status(500).json({
      success: false,
      message: "Error de configuración del servidor",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret);

    if (
      typeof decoded === "string" ||
      typeof (decoded as JwtPayload).sub !== "string"
    ) {
      res.status(401).json({
        success: false,
        message: "Token no válido",
      });
      return;
    }

    res.locals.userId = (decoded as JwtPayload).sub;
    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Token inválido o caducado",
    });
  }
}

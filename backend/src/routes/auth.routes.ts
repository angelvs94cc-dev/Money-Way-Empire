import { requireAdmin } from "../middlewares/admin.middleware";
import { requireAuth } from "../middlewares/auth.middleware";
import { Router } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";


const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !email.trim() ||
      password.length < 8
    ) {
      res.status(400).json({
        success: false,
        message: "Introduce nombre, email y contraseña de al menos 8 caracteres",
      });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "Este correo electrónico ya está registrado",
      });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    res.status(201).json({
      success: true,
      message: "Usuario registrado correctamente",
      user,
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);

    res.status(500).json({
      success: false,
      message: "Error al registrar usuario",
    });
  }
});


router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body ?? {};

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      res.status(400).json({
        success: false,
        message: "Introduce tu correo y contraseña",
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email.trim().toLowerCase(),
      },
    });

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Correo o contraseña incorrectos",
      });
      return;
    }

    const validPassword = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!validPassword) {
      res.status(401).json({
        success: false,
        message: "Correo o contraseña incorrectos",
      });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET no está configurada");
    }

    const token = jwt.sign(
      { sub: user.id, role: user.role },
      jwtSecret,
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      message: "Inicio de sesión correcto",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);

    res.status(500).json({
      success: false,
      message: "Error interno al iniciar sesión",
    });
  }
});




router.get("/me", requireAuth, async (_req, res) => {
  try {
    const userId = res.locals.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Usuario no encontrado",
      });
      return;
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error al obtener el usuario:", error);

    res.status(500).json({
      success: false,
      message: "Error al obtener los datos del usuario",
    });
  }
});


router.get("/admin", requireAuth, requireAdmin, (_req, res) => {
  res.json({
    success: true,
    message: "Bienvenido al panel de administración de Money Way Empire",
  });
});


export default router;

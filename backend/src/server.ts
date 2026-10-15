

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { prisma } from "./lib/prisma";

import authRoutes from "./routes/auth.routes";
import productsRoutes from "./routes/products.routes";
import ordersRoutes from "./routes/orders.routes";
import usersRoutes from "./routes/users.routes";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT) || 4000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

// RUTAS DE LA API
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/users", usersRoutes);

// RUTA PRINCIPAL
app.get("/", (_req, res) => {
  res.json({
    message: "Money Way Empire API",
    status: "online",
  });
});

// COMPROBAR ESTADO DEL BACKEND
app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Backend de Money Way Empire funcionando",
    timestamp: new Date().toISOString(),
  });
});

// COMPROBAR CONEXIÓN CON POSTGRESQL
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


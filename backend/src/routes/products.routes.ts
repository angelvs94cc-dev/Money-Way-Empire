
import { Router } from "express";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/admin.middleware";

const router = Router();

const CATEGORIES = ["Camisetas", "Sudaderas", "Mascarillas"];

function validStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === "string" && item.trim().length > 0
    )
  );
}

// GET /api/products
// Devuelve todos los productos activos de la tienda.
router.get("/", async (_req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
    });

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);

    res.status(500).json({
      success: false,
      message: "Error al obtener los productos",
    });
  }
});

// POST /api/products
// Solo los administradores pueden crear productos.
router.post("/", requireAuth, requireAdmin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      imageUrl,
      category,
      sizes,
      colors,
      featured,
    } = req.body;

    if (
      typeof name !== "string" ||
      !name.trim() ||
      !Number.isSafeInteger(price) ||
      price <= 0 ||
      !Number.isSafeInteger(stock) ||
      stock < 0 ||
      (description !== undefined &&
        description !== null &&
        typeof description !== "string") ||
      (imageUrl !== undefined &&
        imageUrl !== null &&
        typeof imageUrl !== "string") ||
      (category !== undefined &&
        (typeof category !== "string" ||
          !CATEGORIES.includes(category))) ||
      (sizes !== undefined && !validStringArray(sizes)) ||
      (colors !== undefined && !validStringArray(colors)) ||
      (featured !== undefined && typeof featured !== "boolean")
    ) {
      res.status(400).json({
        success: false,
        message: "Datos del producto no válidos",
      });
      return;
    }

    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        description: description ?? null,
        price,
        stock,
        imageUrl: imageUrl ?? null,
        category: category ?? "Camisetas",
        sizes: sizes ?? [],
        colors: colors ?? [],
        featured: featured ?? false,
      },
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error al crear producto:", error);

    res.status(500).json({
      success: false,
      message: "Error al crear el producto",
    });
  }
});

// PATCH /api/products/:id
// Solo los administradores pueden editar productos.
router.patch("/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const id = req.params.id as string;

    const {
      name,
      description,
      price,
      stock,
      imageUrl,
      category,
      sizes,
      colors,
      featured,
      active,
    } = req.body;

    if (
      (name !== undefined &&
        (typeof name !== "string" || !name.trim())) ||
      (description !== undefined &&
        description !== null &&
        typeof description !== "string") ||
      (price !== undefined &&
        (!Number.isSafeInteger(price) || price <= 0)) ||
      (stock !== undefined &&
        (!Number.isSafeInteger(stock) || stock < 0)) ||
      (imageUrl !== undefined &&
        imageUrl !== null &&
        typeof imageUrl !== "string") ||
      (category !== undefined &&
        (typeof category !== "string" ||
          !CATEGORIES.includes(category))) ||
      (sizes !== undefined && !validStringArray(sizes)) ||
      (colors !== undefined && !validStringArray(colors)) ||
      (featured !== undefined && typeof featured !== "boolean") ||
      (active !== undefined && typeof active !== "boolean")
    ) {
      res.status(400).json({
        success: false,
        message: "Datos del producto no válidos",
      });
      return;
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      });
      return;
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(name !== undefined && { name: name.trim() }),
        ...(description !== undefined && { description }),
        ...(price !== undefined && { price }),
        ...(stock !== undefined && { stock }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(category !== undefined && { category }),
        ...(sizes !== undefined && { sizes }),
        ...(colors !== undefined && { colors }),
        ...(featured !== undefined && { featured }),
        ...(active !== undefined && { active }),
      },
    });

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error al editar producto:", error);

    res.status(500).json({
      success: false,
      message: "Error al editar el producto",
    });
  }
});

// DELETE /api/products/:id
// Desactiva el producto sin borrarlo de la base de datos.
router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const id = req.params.id as string;

    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      });
      return;
    }

    await prisma.product.update({
      where: { id },
      data: { active: false },
    });

    res.json({
      success: true,
      message: "Producto desactivado correctamente",
    });
  } catch (error) {
    console.error("Error al desactivar producto:", error);

    res.status(500).json({
      success: false,
      message: "Error al desactivar el producto",
    });
  }
});

export default router;

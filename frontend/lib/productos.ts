export type Categoria =
  | "Camisetas"
  | "Sudaderas"
  | "Mascarillas";

export type Producto = {
  id: number;
  nombre: string;
  categoria: Categoria;
  precio: number;
  descripcion: string;
  detalles: string[];
  imagen: string;
  tallas: string[];
  colores: string[];
  destacado: boolean;
};

export const productos: Producto[] = [
  {
    id: 1,
    nombre: "MWE Classic Tee",
    categoria: "Camisetas",
    precio: 24.9,
    descripcion:
      "Camiseta de estilo urbano con identidad Money Way Empire.",
    detalles: [
      "Diseño Money Way Empire",
      "Estética urbana",
      "Producto de demostración",
    ],
    imagen: "",
    tallas: ["S", "M", "L", "XL"],
    colores: ["Negro", "Blanco"],
    destacado: true,
  },
  {
    id: 2,
    nombre: "MWE Street Tee",
    categoria: "Camisetas",
    precio: 29.9,
    descripcion:
      "Camiseta inspirada en la cultura urbana y el streetwear.",
    detalles: [
      "Diseño de inspiración urbana",
      "Estética streetwear",
      "Producto de demostración",
    ],
    imagen: "",
    tallas: ["S", "M", "L", "XL"],
    colores: ["Negro", "Gris"],
    destacado: false,
  },
  {
    id: 3,
    nombre: "MWE Essential Hoodie",
    categoria: "Sudaderas",
    precio: 49.9,
    descripcion:
      "Sudadera de estética urbana para el día a día.",
    detalles: [
      "Diseño Money Way Empire",
      "Estilo urbano",
      "Producto de demostración",
    ],
    imagen: "",
    tallas: ["S", "M", "L", "XL", "XXL"],
    colores: ["Negro", "Gris"],
    destacado: true,
  },
  {
    id: 4,
    nombre: "MWE Underground Hoodie",
    categoria: "Sudaderas",
    precio: 54.9,
    descripcion:
      "Sudadera inspirada en la música y la cultura underground.",
    detalles: [
      "Inspiración underground",
      "Diseño streetwear",
      "Producto de demostración",
    ],
    imagen: "",
    tallas: ["M", "L", "XL"],
    colores: ["Negro"],
    destacado: false,
  },
  {
    id: 5,
    nombre: "MWE Face Mask",
    categoria: "Mascarillas",
    precio: 9.9,
    descripcion:
      "Mascarilla de merchandising con identidad gráfica MWE.",
    detalles: [
      "Merchandising Money Way Empire",
      "Sin especificaciones sanitarias",
      "Producto de demostración",
    ],
    imagen: "",
    tallas: ["Única"],
    colores: ["Negro"],
    destacado: false,
  },
];

export function formatearPrecio(precio: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(precio);
}

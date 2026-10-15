
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatearPrecio } from "../../lib/productos";

type ProductoAPI = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  imageUrl: string | null;
  category: string;
  sizes: string[];
  colors: string[];
  featured: boolean;
  active: boolean;
};

type RespuestaProductos = {
  success: boolean;
  products: ProductoAPI[];
};

export default function ShopPage() {
  const [productos, setProductos] =
    useState<ProductoAPI[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [categoria, setCategoria] = useState("Todos");

  useEffect(() => {
    let activo = true;

    async function cargarProductos() {
      try {
        const respuesta = await fetch(
          "http://localhost:4000/api/products",
          { cache: "no-store" }
        );

        if (!respuesta.ok) {
          throw new Error("Error al consultar productos");
        }

        const datos: RespuestaProductos =
          await respuesta.json();

        if (
          !datos.success ||
          !Array.isArray(datos.products)
        ) {
          throw new Error("Respuesta no válida");
        }

        if (activo) {
          setProductos(
            datos.products.filter(
              (producto) => producto.active
            )
          );
        }
      } catch (errorCapturado) {
        console.error(errorCapturado);

        if (activo) {
          setError(
            "No se pudo conectar con la tienda. Comprueba que el backend esté arrancado."
          );
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargarProductos();

    return () => {
      activo = false;
    };
  }, []);

  const categorias = [
    "Todos",
    ...Array.from(
      new Set(productos.map((p) => p.category))
    ),
  ];

  const productosFiltrados =
    categoria === "Todos"
      ? productos
      : productos.filter(
          (p) => p.category === categoria
        );

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* CABECERA */}
      <section className="border-b border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.3em] text-gold">
            Money Way Empire / Merchandising
          </p>

          <h1 className="text-5xl font-black uppercase md:text-7xl">
            Nuestra{" "}
            <span className="text-gold">
              tienda.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Streetwear, música y cultura urbana.
            Descubre la colección oficial de
            Money Way Empire.
          </p>

          <Link
            href="/carrito"
            className="mt-8 inline-block border border-gold px-6 py-3 text-sm font-bold text-gold transition hover:bg-gold hover:text-black"
          >
            VER MI CARRITO →
          </Link>
        </div>
      </section>

      {/* CATÁLOGO */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        {cargando ? (
          <p className="py-20 text-center text-zinc-400">
            Cargando productos...
          </p>
        ) : error ? (
          <div className="py-20 text-center">
            <h2 className="text-2xl font-black uppercase">
              No se pudo cargar la tienda
            </h2>

            <p
              role="alert"
              className="mt-5 text-zinc-400"
            >
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-8 bg-gold px-8 py-3 font-bold text-black"
            >
              REINTENTAR
            </button>
          </div>
        ) : (
          <>
            {/* FILTROS */}
            <div className="mb-12 flex flex-wrap items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-black uppercase">
                  Colección
                </h2>

                <p className="mt-2 text-sm text-zinc-400">
                  {productosFiltrados.length}{" "}
                  {productosFiltrados.length === 1
                    ? "producto"
                    : "productos"}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {categorias.map((opcion) => (
                  <button
                    key={opcion}
                    type="button"
                    onClick={() =>
                      setCategoria(opcion)
                    }
                    aria-pressed={
                      categoria === opcion
                    }
                    className={`border px-5 py-3 text-sm font-bold transition ${
                      categoria === opcion
                        ? "border-gold bg-gold text-black"
                        : "border-white/20 text-zinc-300 hover:border-gold hover:text-gold"
                    }`}
                  >
                    {opcion}
                  </button>
                ))}
              </div>
            </div>

            {/* PRODUCTOS */}
            {productosFiltrados.length === 0 ? (
              <div className="border border-white/10 bg-graphite px-6 py-20 text-center">
                <h2 className="text-2xl font-black uppercase">
                  No hay productos disponibles
                </h2>

                <p className="mt-5 text-zinc-400">
                  Próximamente añadiremos más
                  artículos a la colección.
                </p>
              </div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {productosFiltrados.map(
                  (producto) => (
                    <article
                      key={producto.id}
                      className="flex flex-col overflow-hidden border border-white/10 bg-graphite"
                    >
                      {/* IMAGEN */}
                      <Link
                        href={`/shop/${producto.id}`}
                        className="block"
                      >
                        <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-zinc-800 p-8 text-center">
                          {producto.imageUrl ? (
                            <img
                              src={producto.imageUrl}
                              alt={producto.name}
                              className="h-full w-full object-cover transition duration-300 hover:scale-105"
                            />
                          ) : (
                            <div>
                              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
                                Money Way Empire
                              </p>

                              <h3 className="mt-6 text-2xl font-black uppercase">
                                {producto.name}
                              </h3>

                              <p className="mt-5 text-xs text-zinc-500">
                                Imagen próximamente
                              </p>
                            </div>
                          )}

                          {producto.featured && (
                            <span className="absolute left-4 top-4 bg-gold px-3 py-2 text-xs font-black uppercase text-black">
                              Destacado
                            </span>
                          )}
                        </div>
                      </Link>

                      {/* INFORMACIÓN */}
                      <div className="flex flex-1 flex-col p-6">
                        <p className="text-xs font-bold uppercase tracking-widest text-gold">
                          {producto.category}
                        </p>

                        <Link
                          href={`/shop/${producto.id}`}
                          className="mt-3 text-xl font-black uppercase hover:text-gold"
                        >
                          {producto.name}
                        </Link>

                        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-zinc-400">
                          {producto.description ||
                            "Producto oficial de Money Way Empire."}
                        </p>

                        <p className="mt-4 text-sm text-zinc-400">
                          {producto.sizes.length > 0
                            ? `Tallas: ${producto.sizes.join(", ")}`
                            : "Talla única"}
                        </p>

                        <p
                          className={`mt-4 text-sm font-bold ${
                            producto.stock > 0
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {producto.stock > 0
                            ? `${producto.stock} unidades disponibles`
                            : "Agotado"}
                        </p>

                        <div className="mt-auto pt-8">
                          <p className="mb-6 text-2xl font-black text-gold">
                            {formatearPrecio(
                              producto.price / 100
                            )}
                          </p>

                          <Link
                            href={`/shop/${producto.id}`}
                            className="block bg-gold px-6 py-4 text-center text-sm font-black uppercase text-black transition hover:bg-gold-light"
                          >
                            VER PRODUCTO →
                          </Link>
                        </div>
                      </div>
                    </article>
                  )
                )}
              </div>
            )}
          </>
        )}
      </section>

      {/* PIE DE SECCIÓN */}
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm text-zinc-500">
            Colección oficial Money Way Empire.
            El pago online todavía no está
            habilitado.
          </p>
        </div>
      </section>
    </main>
  );
}

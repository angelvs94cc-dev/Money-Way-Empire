"use client";
import { Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formatearPrecio } from "../../../lib/productos";
import {
  agregarAlCarrito,
  obtenerCarrito,
} from "../../../lib/carrito";

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

function ProductoContenido() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [producto, setProducto] =
    useState<ProductoAPI | null>(null);

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [tallaSeleccionada, setTallaSeleccionada] =
    useState("");
  const [colorSeleccionado, setColorSeleccionado] =
    useState("");
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState("");
  const [anadido, setAnadido] = useState(false);

  useEffect(() => {
    let activo = true;

    async function cargarProducto() {
      setCargando(true);
      setError("");
      setProducto(null);
      setTallaSeleccionada("");
      setColorSeleccionado("");
      setCantidad(1);
      setMensaje("");
      setAnadido(false);

      try {
        const respuesta = await fetch(
          (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000") + "/api/products",
          { cache: "no-store" }
        );

        if (!respuesta.ok) {
          throw new Error(
            "No se pudo consultar el catálogo"
          );
        }

        const datos: RespuestaProductos =
          await respuesta.json();

        if (
          !datos.success ||
          !Array.isArray(datos.products)
        ) {
          throw new Error(
            "La API ha devuelto una respuesta no válida"
          );
        }

        const encontrado =
          datos.products.find(
            (item) =>
              item.id === id && item.active
          ) ?? null;

        if (activo) {
          setProducto(encontrado);
        }
      } catch (errorCapturado) {
        console.error(
          "Error al cargar el producto:",
          errorCapturado
        );

        if (activo) {
          setError(
            "No hemos podido cargar el producto. Comprueba que el backend esté funcionando."
          );
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargarProducto();

    return () => {
      activo = false;
    };
  }, [id]);

  if (cargando) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
        <p className="text-zinc-400">
          Cargando producto...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center text-foreground">
        <h1 className="text-3xl font-black uppercase">
          No se pudo cargar el producto
        </h1>

        <p
          role="alert"
          className="mt-6 max-w-xl text-zinc-400"
        >
          {error}
        </p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-8 bg-gold px-8 py-4 font-bold text-black"
        >
          REINTENTAR
        </button>
      </main>
    );
  }

  if (!producto) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center text-foreground">
        <p className="text-sm font-bold uppercase tracking-widest text-gold">
          Error 404
        </p>

        <h1 className="mt-6 text-4xl font-black uppercase md:text-6xl">
          Producto no encontrado
        </h1>

        <p className="mt-6 text-zinc-400">
          El producto que buscas no existe o ya
          no está disponible.
        </p>

        <Link
          href="/shop"
          className="mt-10 bg-gold px-8 py-4 font-bold text-black"
        >
          VOLVER A SHOP
        </Link>
      </main>
    );
  }

  const sinStock = producto.stock <= 0;

  const limiteCantidad = Math.min(
    10,
    producto.stock
  );

  const subtotal =
    (producto.price * cantidad) / 100;

  function cambiarCantidad(cambio: number) {
    if (!producto) return;

    setCantidad((actual) =>
      Math.max(
        1,
        Math.min(
          Math.max(1, limiteCantidad),
          actual + cambio
        )
      )
    );

    setMensaje("");
    setAnadido(false);
  }

  function anadirProducto() {
    if (!producto) return;

    setAnadido(false);

    if (sinStock) {
      setMensaje(
        "Este producto está agotado."
      );
      return;
    }

    if (
      producto.sizes.length > 0 &&
      !tallaSeleccionada
    ) {
      setMensaje("Selecciona una talla.");
      return;
    }

    if (
      producto.colors.length > 0 &&
      !colorSeleccionado
    ) {
      setMensaje("Selecciona un color.");
      return;
    }

    if (
      !Number.isInteger(cantidad) ||
      cantidad < 1 ||
      cantidad > limiteCantidad
    ) {
      setMensaje(
        "La cantidad seleccionada no es válida."
      );
      return;
    }

    const carritoActual = obtenerCarrito();

    const unidadesGuardadas =
      carritoActual
        .filter(
          (item) =>
            item.productoId === producto.id
        )
        .reduce(
          (total, item) =>
            total + item.cantidad,
          0
        );

    if (
      unidadesGuardadas + cantidad >
      producto.stock
    ) {
      setMensaje(
        `Solo hay ${producto.stock} unidades disponibles en total. Ya tienes ${unidadesGuardadas} en el carrito.`
      );
      return;
    }

    try {
      agregarAlCarrito({
        productoId: producto.id,
        talla: tallaSeleccionada,
        color: colorSeleccionado,
        cantidad,
      });

      setMensaje(
        "¡Producto añadido al carrito correctamente!"
      );
      setAnadido(true);
    } catch (errorCapturado) {
      console.error(
        "Error al añadir al carrito:",
        errorCapturado
      );

      setMensaje(
        "No se pudo guardar el producto en el carrito."
      );
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* MIGAS DE PAN */}
      <section className="border-b border-white/10 px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Link
              href="/"
              className="text-zinc-400 hover:text-gold"
            >
              Inicio
            </Link>

            <span className="text-zinc-600">
              /
            </span>

            <Link
              href="/shop"
              className="text-zinc-400 hover:text-gold"
            >
              Shop
            </Link>

            <span className="text-zinc-600">
              /
            </span>

            <span className="text-gold">
              {producto.name}
            </span>
          </div>
        </div>
      </section>

      {/* PRODUCTO */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* IMAGEN */}
          <div className="overflow-hidden border border-white/10 bg-graphite">
            <div className="flex aspect-[4/5] flex-col items-center justify-center bg-zinc-800 p-10 text-center">
              {producto.imageUrl ? (
                <img
                  src={producto.imageUrl}
                  alt={producto.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <>
                  <p className="text-sm font-bold uppercase tracking-[0.3em] text-gold">
                    Money Way Empire
                  </p>

                  <h2 className="mt-8 text-4xl font-black uppercase md:text-5xl">
                    {producto.name}
                  </h2>

                  <p className="mt-6 text-sm text-zinc-500">
                    Fotografía próximamente
                  </p>
                </>
              )}
            </div>
          </div>

          {/* INFORMACIÓN */}
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-gold">
              {producto.category}
            </p>

            <h1 className="mt-5 text-4xl font-black uppercase md:text-6xl">
              {producto.name}
            </h1>

            {producto.featured && (
              <p className="mt-5 inline-block border border-gold px-4 py-2 text-xs font-bold uppercase tracking-widest text-gold">
                Producto destacado
              </p>
            )}

            <p className="mt-8 text-3xl font-black text-gold">
              {formatearPrecio(
                producto.price / 100
              )}
            </p>

            <p className="mt-8 leading-relaxed text-zinc-400">
              {producto.description ||
                "Producto oficial de Money Way Empire."}
            </p>

            <p
              className={`mt-6 text-sm font-bold ${
                sinStock
                  ? "text-red-400"
                  : "text-green-400"
              }`}
            >
              {sinStock
                ? "PRODUCTO AGOTADO"
                : `DISPONIBLE · ${producto.stock} unidades en stock`}
            </p>

            <div className="mt-10 border-t border-white/10 pt-8">
              {/* TALLAS */}
              {producto.sizes.length > 0 && (
                <>
                  <h2 className="text-sm font-bold uppercase tracking-widest">
                    Selecciona tu talla
                  </h2>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {producto.sizes.map(
                      (talla) => (
                        <button
                          key={talla}
                          type="button"
                          onClick={() => {
                            setTallaSeleccionada(
                              talla
                            );
                            setMensaje("");
                            setAnadido(false);
                          }}
                          aria-pressed={
                            tallaSeleccionada ===
                            talla
                          }
                          className={`min-w-14 border px-4 py-3 text-sm font-bold transition ${
                            tallaSeleccionada ===
                            talla
                              ? "border-gold bg-gold text-black"
                              : "border-white/20 text-zinc-300 hover:border-gold"
                          }`}
                        >
                          {talla}
                        </button>
                      )
                    )}
                  </div>
                </>
              )}

              {/* COLORES */}
              {producto.colors.length > 0 && (
                <>
                  <h2 className="mt-10 text-sm font-bold uppercase tracking-widest">
                    Selecciona un color
                  </h2>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {producto.colors.map(
                      (color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => {
                            setColorSeleccionado(
                              color
                            );
                            setMensaje("");
                            setAnadido(false);
                          }}
                          aria-pressed={
                            colorSeleccionado ===
                            color
                          }
                          className={`border px-5 py-3 text-sm font-bold transition ${
                            colorSeleccionado ===
                            color
                              ? "border-gold bg-gold text-black"
                              : "border-white/20 text-zinc-300 hover:border-gold"
                          }`}
                        >
                          {color}
                        </button>
                      )
                    )}
                  </div>
                </>
              )}

              {/* CANTIDAD */}
              <h2 className="mt-10 text-sm font-bold uppercase tracking-widest">
                Cantidad
              </h2>

              <div className="mt-5 flex w-fit items-center border border-white/20">
                <button
                  type="button"
                  onClick={() =>
                    cambiarCantidad(-1)
                  }
                  disabled={
                    sinStock || cantidad <= 1
                  }
                  aria-label="Reducir cantidad"
                  className="px-5 py-3 text-xl hover:text-gold disabled:cursor-not-allowed disabled:opacity-30"
                >
                  −
                </button>

                <span className="min-w-12 text-center font-bold">
                  {cantidad}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    cambiarCantidad(1)
                  }
                  disabled={
                    sinStock ||
                    cantidad >= limiteCantidad
                  }
                  aria-label="Aumentar cantidad"
                  className="px-5 py-3 text-xl hover:text-gold disabled:cursor-not-allowed disabled:opacity-30"
                >
                  +
                </button>
              </div>

              {/* SUBTOTAL */}
              <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-8">
                <span className="font-bold uppercase">
                  Subtotal
                </span>

                <span className="text-2xl font-black text-gold">
                  {formatearPrecio(subtotal)}
                </span>
              </div>

              {/* AÑADIR AL CARRITO */}
              <button
                type="button"
                onClick={anadirProducto}
                disabled={sinStock}
                className="mt-8 w-full bg-gold px-8 py-5 text-lg font-black uppercase text-black transition hover:bg-gold-light disabled:cursor-not-allowed disabled:bg-zinc-600 disabled:text-zinc-300"
              >
                {sinStock
                  ? "PRODUCTO AGOTADO"
                  : "AÑADIR AL CARRITO"}
              </button>

              {mensaje && (
                <div
                  role="status"
                  className="mt-5 border border-white/15 bg-graphite p-4"
                >
                  <p className="text-sm text-zinc-300">
                    {mensaje}
                  </p>

                  {anadido && (
                    <Link
                      href="/carrito"
                      className="mt-4 inline-block font-bold text-gold hover:text-gold-light"
                    >
                      VER CARRITO →
                    </Link>
                  )}
                </div>
              )}

              <p className="mt-6 text-xs leading-relaxed text-zinc-500">
                La selección se guarda en el
                carrito de este navegador.
                Los pedidos y pagos reales
                todavía no están habilitados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DETALLES */}
      <section className="border-y border-white/10 bg-graphite px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-black uppercase md:text-4xl">
            Detalles del producto
          </h2>

          <div className="mt-8 space-y-4 text-zinc-400">
            <p>
              {producto.description ||
                "Artículo de la colección Money Way Empire."}
            </p>

            <p>
              Categoría: {producto.category}
            </p>

            {producto.sizes.length > 0 && (
              <p>
                Tallas disponibles:{" "}
                {producto.sizes.join(", ")}
              </p>
            )}

            {producto.colors.length > 0 && (
              <p>
                Colores disponibles:{" "}
                {producto.colors.join(", ")}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* VOLVER */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-black uppercase md:text-5xl">
            Sigue explorando
            <span className="block text-gold">
              la colección.
            </span>
          </h2>

          <Link
            href="/shop"
            className="mt-10 inline-block border border-gold px-8 py-4 font-bold text-gold hover:bg-gold hover:text-black"
          >
            ← VOLVER A SHOP
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function ProductoPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-background p-12 text-foreground">
          Cargando producto...
        </main>
      }
    >
      <ProductoContenido />
    </Suspense>
  );
}

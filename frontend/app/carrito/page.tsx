
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatearPrecio } from "../../lib/productos";
import {
  obtenerCarrito,
  actualizarCantidad,
  eliminarDelCarrito,
  vaciarCarrito,
  EVENTO_CARRITO,
  type ItemCarrito,
} from "../../lib/carrito";

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

type LineaCarrito = ItemCarrito & {
  producto: ProductoAPI;
};

export default function CarritoPage() {
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [productos, setProductos] = useState<ProductoAPI[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [confirmando, setConfirmando] = useState(false);
  const [mensajeCompra, setMensajeCompra] = useState("");

  useEffect(() => {
    let activo = true;

    function actualizar() {
      if (activo) {
        setItems(obtenerCarrito());
      }
    }

    async function cargarProductos() {
      try {
        const respuesta = await fetch(
          (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000") + "/api/products",
          { cache: "no-store" }
        );

        if (!respuesta.ok) {
          throw new Error("No se pudo conectar con el backend");
        }

        const datos: RespuestaProductos =
          await respuesta.json();

        if (
          !datos.success ||
          !Array.isArray(datos.products)
        ) {
          throw new Error("Respuesta de la API no válida");
        }

        if (activo) {
          setProductos(datos.products);
          setError("");
        }
      } catch (errorCapturado) {
        console.error(
          "Error al cargar productos del carrito:",
          errorCapturado
        );

        if (activo) {
          setError(
            "No se pudieron consultar los productos. Comprueba que el backend esté funcionando."
          );
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    actualizar();
    cargarProductos();

    window.addEventListener(
      EVENTO_CARRITO,
      actualizar
    );

    window.addEventListener("storage", actualizar);

    return () => {
      activo = false;

      window.removeEventListener(
        EVENTO_CARRITO,
        actualizar
      );

      window.removeEventListener(
        "storage",
        actualizar
      );
    };
  }, []);

  const lineas: LineaCarrito[] = items.flatMap(
    (item) => {
      const producto = productos.find(
        (p) => p.id === item.productoId && p.active
      );

      if (!producto) {
        return [];
      }

      return [{ ...item, producto }];
    }
  );

  const productosNoDisponibles =
    items.length - lineas.length;

  const subtotalCentimos = lineas.reduce(
    (total, linea) =>
      total + linea.producto.price * linea.cantidad,
    0
  );

  const subtotal = subtotalCentimos / 100;

  const cantidadTotal = lineas.reduce(
    (total, linea) => total + linea.cantidad,
    0
  );

  function cantidadDelProducto(
    productoId: string
  ): number {
    return items
      .filter(
        (item) => item.productoId === productoId
      )
      .reduce(
        (total, item) => total + item.cantidad,
        0
      );
  }

  function cambiarCantidad(
    linea: LineaCarrito,
    cambio: number
  ) {
    const nuevaCantidad = linea.cantidad + cambio;

    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(
        linea.productoId,
        linea.talla,
        linea.color
      );
      return;
    }

    if (nuevaCantidad > 10) {
      return;
    }

    if (cambio > 0) {
      const cantidadActual = cantidadDelProducto(
        linea.productoId
      );

      if (
        cantidadActual + cambio >
        linea.producto.stock
      ) {
        return;
      }
    }

    actualizarCantidad(
      linea.productoId,
      linea.talla,
      linea.color,
      nuevaCantidad
    );
  }

async function confirmarPedido() {
  if (confirmando || lineas.length === 0) return;

  const token = sessionStorage.getItem("mwe-token");

  if (!token) {
    setMensajeCompra("Debes iniciar sesión para confirmar el pedido.");
    return;
  }

  if (
    productosNoDisponibles > 0 ||
    lineas.some((linea) => linea.cantidad > linea.producto.stock)
  ) {
    setMensajeCompra("Revisa los productos y las cantidades del carrito.");
    return;
  }

  setConfirmando(true);
  setMensajeCompra("");

  try {
    const respuesta = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000") + "/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: lineas.map((linea) => ({
          productId: linea.productoId,
          quantity: linea.cantidad,
          size: linea.talla || null,
          color: linea.color || null,
        })),
      }),
    });

    const datos = await respuesta.json();

    if (!respuesta.ok || !datos.success) {
      throw new Error(datos.message || "No se pudo registrar el pedido.");
    }

    vaciarCarrito();

    window.location.assign("/mi-cuenta");
  } catch (errorCapturado) {
    setMensajeCompra(
      errorCapturado instanceof Error
        ? errorCapturado.message
        : "No se pudo confirmar el pedido."
    );
  } finally {
    setConfirmando(false);
  }
}

  if (cargando) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
        <p className="text-zinc-400">
          Cargando carrito...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center text-foreground">
        <h1 className="text-3xl font-black uppercase">
          Error al cargar el carrito
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

        <Link
          href="/shop"
          className="mt-6 text-sm font-bold text-gold"
        >
          ← VOLVER A SHOP
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* CABECERA */}
      <section className="border-b border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/shop"
            className="text-sm text-zinc-400 hover:text-gold"
          >
            ← Volver a Shop
          </Link>

          <p className="mb-5 mt-10 text-sm font-bold uppercase tracking-[0.3em] text-gold">
            Money Way Empire / Shop
          </p>

          <h1 className="text-5xl font-black uppercase md:text-7xl">
            Tu <span className="text-gold">carrito.</span>
          </h1>

          <p className="mt-6 text-zinc-400">
            {cantidadTotal}{" "}
            {cantidadTotal === 1
              ? "artículo"
              : "artículos"}{" "}
            en tu carrito
          </p>
        </div>
      </section>

      {/* PRODUCTOS NO DISPONIBLES */}
      {productosNoDisponibles > 0 && (
        <section className="mx-auto max-w-7xl px-6 pt-8">
          <div
            role="alert"
            className="border border-yellow-600/40 bg-graphite p-5"
          >
            <p className="font-bold text-yellow-400">
              Hay productos que ya no están disponibles.
            </p>

            <p className="mt-2 text-sm text-zinc-400">
              {productosNoDisponibles}{" "}
              {productosNoDisponibles === 1
                ? "artículo guardado no aparece"
                : "artículos guardados no aparecen"}{" "}
              porque no se encuentran en el catálogo
              activo. Puedes vaciar el carrito para
              eliminarlos.
            </p>
          </div>
        </section>
      )}

      {lineas.length === 0 ? (
        /* CARRITO VACÍO */
        <section className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h2 className="text-3xl font-black uppercase">
            Tu carrito está vacío
          </h2>

          <p className="mt-6 text-zinc-400">
            Todavía no has añadido ningún producto
            disponible.
          </p>

          <Link
            href="/shop"
            className="mt-10 inline-block bg-gold px-8 py-4 font-bold text-black hover:bg-gold-light"
          >
            EXPLORAR TIENDA
          </Link>

          {items.length > 0 && (
            <div className="mt-8">
              <button
                type="button"
                onClick={vaciarCarrito}
                className="text-sm font-bold text-red-400 hover:text-red-300"
              >
                VACIAR CARRITO
              </button>
            </div>
          )}
        </section>
      ) : (
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* PRODUCTOS */}
            <div className="space-y-6 lg:col-span-2">
              {lineas.map((linea) => {
                const cantidadActual =
                  cantidadDelProducto(
                    linea.productoId
                  );

                const superaStock =
                  cantidadActual >
                  linea.producto.stock;

                const puedeAumentar =
                  linea.cantidad < 10 &&
                  cantidadActual <
                    linea.producto.stock;

                const totalLinea =
                  (linea.producto.price *
                    linea.cantidad) /
                  100;

                return (
                  <article
                    key={`${linea.productoId}-${linea.talla}-${linea.color}`}
                    className="grid gap-6 border border-white/10 bg-graphite p-6 sm:grid-cols-[140px_1fr]"
                  >
                    {/* MINIATURA */}
                    <div className="flex aspect-square items-center justify-center overflow-hidden bg-zinc-800 p-4 text-center">
                      {linea.producto.imageUrl ? (
                        <img
                          src={
                            linea.producto.imageUrl
                          }
                          alt={linea.producto.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-xs font-black uppercase text-gold">
                          Money Way Empire
                        </span>
                      )}
                    </div>

                    {/* INFORMACIÓN */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gold">
                        {linea.producto.category}
                      </p>

                      <Link
                        href={`/shop/${linea.productoId}`}
                        className="mt-3 block text-xl font-black uppercase hover:text-gold"
                      >
                        {linea.producto.name}
                      </Link>

                      <p className="mt-3 text-sm text-zinc-400">
                        {linea.talla
                          ? `Talla: ${linea.talla}`
                          : "Sin talla"}
                        {" · "}
                        {linea.color
                          ? `Color: ${linea.color}`
                          : "Sin color"}
                      </p>

                      <p className="mt-4 font-bold">
                        {formatearPrecio(
                          linea.producto.price / 100
                        )}{" "}
                        / unidad
                      </p>

                      <p className="mt-3 text-xs text-zinc-500">
                        Stock disponible:{" "}
                        {linea.producto.stock}
                      </p>

                      {superaStock && (
                        <p
                          role="alert"
                          className="mt-3 text-sm text-red-400"
                        >
                          La cantidad guardada
                          supera el stock disponible.
                          Reduce las unidades.
                        </p>
                      )}

                      {/* CANTIDAD */}
                      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center border border-white/20">
                          <button
                            type="button"
                            aria-label="Reducir cantidad"
                            onClick={() =>
                              cambiarCantidad(
                                linea,
                                -1
                              )
                            }
                            className="px-4 py-2 hover:text-gold"
                          >
                            −
                          </button>

                          <span className="min-w-10 text-center font-bold">
                            {linea.cantidad}
                          </span>

                          <button
                            type="button"
                            aria-label="Aumentar cantidad"
                            disabled={!puedeAumentar}
                            onClick={() =>
                              cambiarCantidad(
                                linea,
                                1
                              )
                            }
                            className="px-4 py-2 hover:text-gold disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xl font-black text-gold">
                          {formatearPrecio(
                            totalLinea
                          )}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          eliminarDelCarrito(
                            linea.productoId,
                            linea.talla,
                            linea.color
                          )
                        }
                        className="mt-6 text-sm font-bold text-red-400 hover:text-red-300"
                      >
                        ELIMINAR PRODUCTO
                      </button>
                    </div>
                  </article>
                );
              })}

              <button
                type="button"
                onClick={vaciarCarrito}
                className="border border-white/20 px-6 py-3 text-sm font-bold text-zinc-300 hover:border-red-400 hover:text-red-400"
              >
                VACIAR CARRITO
              </button>
            </div>

            {/* RESUMEN */}
            <aside className="h-fit border border-white/10 bg-graphite p-8">
              <h2 className="text-2xl font-black uppercase">
                Resumen del pedido
              </h2>

              <div className="mt-8 flex justify-between text-zinc-400">
                <span>Artículos</span>
                <span>{cantidadTotal}</span>
              </div>

              <div className="mt-5 flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>
                  {formatearPrecio(subtotal)}
                </span>
              </div>

              <div className="mt-5 flex justify-between text-zinc-400">
                <span>Envío</span>
                <span>Por calcular</span>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-8">
                <span className="font-bold uppercase">
                  Subtotal
                </span>

                <span className="text-2xl font-black text-gold">
                  {formatearPrecio(subtotal)}
                </span>
              </div>

              <button
  		type="button"
  		disabled={
    		  confirmando ||
    		  productosNoDisponibles > 0 ||
    		  lineas.some(
      		    (linea) => linea.cantidad > linea.producto.stock
    	          )
 	        }
  		onClick={() => void confirmarPedido()}
  		className="mt-8 w-full bg-gold px-6 py-4 font-black uppercase text-black disabled:cursor-not-allowed  			disabled:opacity-40"
	       >
  		{confirmando ? "REGISTRANDO PEDIDO..." : "CONFIRMAR PEDIDO DE PRUEBA"}
	       </button>

  	       {mensajeCompra && (
  		<p role="alert" className="mt-4 text-sm text-red-400">
                 {mensajeCompra}
                </p>
               )}

              <p className="mt-5 text-xs leading-relaxed text-zinc-500">
                Estamos preparando la gestión de
                pedidos y los pagos seguros. Por
                ahora no se realizarán cobros.
                El stock y los precios se
                verificarán de nuevo al confirmar
                un pedido.
              </p>

              <Link
                href="/shop"
                className="mt-8 block text-center text-sm font-bold text-gold hover:text-gold-light"
              >
                ← SEGUIR COMPRANDO
              </Link>
            </aside>
          </div>
        </section>
      )}
    </main>
  );
}

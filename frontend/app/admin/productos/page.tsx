
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Producto = {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  featured: boolean;
  active: boolean;
};

export default function AdminProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [desactivandoId, setDesactivandoId] = useState<string | null>(null);

  useEffect(() => {
    async function cargarProductos() {
      const token = sessionStorage.getItem("mwe-token");

      if (!token) {
        setError("Debes iniciar sesión para acceder.");
        setCargando(false);
        return;
      }

      try {
        const acceso = await fetch(
          "http://localhost:4000/api/auth/admin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );

        if (!acceso.ok) {
          throw new Error(
            acceso.status === 403
              ? "No tienes permisos de administrador."
              : "No se ha podido verificar tu sesión."
          );
        }

        const respuesta = await fetch(
          "http://localhost:4000/api/products",
          { cache: "no-store" }
        );

        if (!respuesta.ok) {
          throw new Error("No se pudieron cargar los productos.");
        }

        const datos = await respuesta.json();
        setProductos(datos.products ?? []);
      } catch (errorCapturado) {
        setError(
          errorCapturado instanceof Error
            ? errorCapturado.message
            : "Ha ocurrido un error."
        );
      } finally {
        setCargando(false);
      }
    }

    void cargarProductos();
  }, []);

  async function desactivarProducto(producto: Producto) {
    const confirmado = window.confirm(
      `¿Seguro que quieres desactivar "${producto.name}"?\n\n` +
        "Dejará de aparecer en la tienda, pero no se borrará de la base de datos."
    );

    if (!confirmado) return;

    const token = sessionStorage.getItem("mwe-token");

    if (!token) {
      setError("Tu sesión ha caducado. Vuelve a iniciar sesión.");
      return;
    }

    setError("");
    setDesactivandoId(producto.id);

    try {
      const respuesta = await fetch(
        `http://localhost:4000/api/products/${producto.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const datos = await respuesta.json();

      if (!respuesta.ok || !datos.success) {
        throw new Error(
          datos.message || "No se pudo desactivar el producto."
        );
      }

      setProductos((actuales) =>
        actuales.filter((item) => item.id !== producto.id)
      );
    } catch (errorCapturado) {
      setError(
        errorCapturado instanceof Error
          ? errorCapturado.message
          : "Error al desactivar el producto."
      );
    } finally {
      setDesactivandoId(null);
    }
  }

  if (cargando) {
    return (
      <main className="min-h-screen bg-background px-6 py-24 text-foreground">
        <p className="text-center">Cargando productos...</p>
      </main>
    );
  }

  if (error && productos.length === 0) {
    return (
      <main className="min-h-screen bg-background px-6 py-24 text-foreground">
        <h1 className="text-3xl font-black uppercase text-gold">
          Gestión de productos
        </h1>

        <p className="mt-6 text-red-400">{error}</p>

        <Link href="/login" className="mt-6 inline-block text-gold">
          Iniciar sesión
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-16 text-foreground">
      <div className="mx-auto max-w-7xl">
        <Link href="/admin" className="text-sm font-bold text-gold">
          ← VOLVER AL PANEL
        </Link>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-gold">
              Money Way Empire
            </p>

            <h1 className="mt-4 text-4xl font-black uppercase md:text-6xl">
              Gestión de <span className="text-gold">productos.</span>
            </h1>
          </div>

          <Link
            href="/admin/productos/nuevo"
            className="bg-gold px-6 py-4 font-black uppercase text-black"
          >
            + AÑADIR PRODUCTO
          </Link>
        </div>

        <div className="mt-12 border border-white/10 bg-graphite p-6">
          <p className="text-sm text-zinc-400">
            Productos activos: {productos.length}
          </p>

          {error && (
            <p role="alert" className="mt-5 text-sm text-red-400">
              {error}
            </p>
          )}

          {productos.length === 0 ? (
            <p className="mt-8 text-zinc-400">
              Todavía no hay productos activos en la tienda.
            </p>
          ) : (
            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/20 text-sm uppercase text-gold">
                    <th className="px-4 py-4">Producto</th>
                    <th className="px-4 py-4">Categoría</th>
                    <th className="px-4 py-4">Precio</th>
                    <th className="px-4 py-4">Stock</th>
                    <th className="px-4 py-4">Destacado</th>
                    <th className="px-4 py-4">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {productos.map((producto) => (
                    <tr
                      key={producto.id}
                      className="border-b border-white/10"
                    >
                      <td className="px-4 py-5 font-bold">
                        {producto.name}
                      </td>

                      <td className="px-4 py-5 text-zinc-400">
                        {producto.category}
                      </td>

                      <td className="px-4 py-5">
                        {(producto.price / 100).toFixed(2)} €
                      </td>

                      <td className="px-4 py-5">
                        {producto.stock}
                      </td>

                      <td className="px-4 py-5">
                        {producto.featured ? "Sí" : "No"}
                      </td>

                      <td className="px-4 py-5">
                        <div className="flex flex-wrap items-center gap-3">
                          <Link
                            href={`/admin/productos/${producto.id}/editar`}
                            className="inline-block border border-gold px-4 py-2 text-sm font-bold text-gold transition hover:bg-gold hover:text-black"
                          >
                            EDITAR
                          </Link>

                          <button
                            type="button"
                            disabled={desactivandoId !== null}
                            onClick={() => void desactivarProducto(producto)}
                            className="border border-red-500/60 px-4 py-2 text-sm font-bold text-red-400 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {desactivandoId === producto.id
                              ? "DESACTIVANDO..."
                              : "DESACTIVAR"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}


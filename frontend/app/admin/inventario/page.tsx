
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Producto = {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  featured: boolean;
  active: boolean;
};

type RespuestaProductos = {
  success?: boolean;
  message?: string;
  products?: Producto[];
};

const API = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000") + "";
const LIMITE_STOCK_BAJO = 5;

function formatoPrecio(centimos: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(centimos / 100);
}

function estadoStock(stock: number) {
  if (stock <= 0) {
    return {
      texto: "Agotado",
      estilo: "font-bold text-red-400",
    };
  }

  if (stock <= LIMITE_STOCK_BAJO) {
    return {
      texto: "Stock bajo",
      estilo: "font-bold text-yellow-400",
    };
  }

  return {
    texto: "Disponible",
    estilo: "font-bold text-green-400",
  };
}

export default function AdminInventarioPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("TODOS");

  useEffect(() => {
    async function cargarInventario() {
      const token = sessionStorage.getItem("mwe-token");

      if (!token) {
        setError("Debes iniciar sesión para acceder.");
        setCargando(false);
        return;
      }

      try {
        const acceso = await fetch(
          `${API}/api/auth/admin`,
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
          `${API}/api/products`,
          {
            cache: "no-store",
          }
        );

        if (!respuesta.ok) {
          throw new Error(
            "No se pudo consultar el inventario."
          );
        }

        const datos: RespuestaProductos =
          await respuesta.json();

        if (!Array.isArray(datos.products)) {
          throw new Error(
            "La API no ha devuelto una lista de productos válida."
          );
        }

        setProductos(
          datos.products.filter((producto) => producto.active)
        );
      } catch (errorCapturado) {
        setError(
          errorCapturado instanceof Error
            ? errorCapturado.message
            : "Error al cargar el inventario."
        );
      } finally {
        setCargando(false);
      }
    }

    void cargarInventario();
  }, []);

  const unidadesTotales = productos.reduce(
    (total, producto) => total + producto.stock,
    0
  );

  const agotados = productos.filter(
    (producto) => producto.stock <= 0
  ).length;

  const stockBajo = productos.filter(
    (producto) =>
      producto.stock > 0 &&
      producto.stock <= LIMITE_STOCK_BAJO
  ).length;

  const productosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    return productos.filter((producto) => {
      const coincideBusqueda =
        producto.name.toLowerCase().includes(texto) ||
        producto.category.toLowerCase().includes(texto);

      let coincideEstado = true;

      if (filtro === "AGOTADOS") {
        coincideEstado = producto.stock <= 0;
      } else if (filtro === "BAJO") {
        coincideEstado =
          producto.stock > 0 &&
          producto.stock <= LIMITE_STOCK_BAJO;
      } else if (filtro === "DISPONIBLES") {
        coincideEstado =
          producto.stock > LIMITE_STOCK_BAJO;
      }

      return coincideBusqueda && coincideEstado;
    });
  }, [productos, busqueda, filtro]);

  if (cargando) {
    return (
      <main className="min-h-screen bg-background px-6 py-20 text-foreground">
        <p className="text-center text-zinc-400">
          Cargando inventario...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background px-6 py-20 text-foreground">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-black uppercase text-gold">
            Gestión de inventario
          </h1>

          <p role="alert" className="mt-6 text-red-400">
            {error}
          </p>

          <Link
            href="/admin"
            className="mt-8 inline-block border border-gold px-5 py-3 font-bold text-gold"
          >
            VOLVER AL PANEL
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-12 text-foreground md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-gold">
              Money Way Empire
            </p>

            <h1 className="mt-4 text-3xl font-black uppercase md:text-5xl">
              Gestión de{" "}
              <span className="text-gold">
                inventario.
              </span>
            </h1>

            <p className="mt-4 text-zinc-400">
              Controla las existencias de los productos de tu tienda.
            </p>
          </div>

          <Link
            href="/admin"
            className="border border-gold px-5 py-3 text-sm font-bold text-gold transition hover:bg-gold hover:text-black"
          >
            VOLVER AL PANEL
          </Link>
        </div>

        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              titulo: "Productos activos",
              valor: productos.length,
            },
            {
              titulo: "Unidades disponibles",
              valor: unidadesTotales,
            },
            {
              titulo: "Stock bajo",
              valor: stockBajo,
            },
            {
              titulo: "Productos agotados",
              valor: agotados,
            },
          ].map((dato) => (
            <div
              key={dato.titulo}
              className="border border-white/10 bg-graphite p-6"
            >
              <p className="text-sm text-zinc-400">
                {dato.titulo}
              </p>

              <p className="mt-3 text-3xl font-black text-gold">
                {dato.valor}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-8 flex flex-wrap gap-4">
          <input
            type="search"
            value={busqueda}
            onChange={(evento) =>
              setBusqueda(evento.target.value)
            }
            placeholder="Buscar producto o categoría..."
            aria-label="Buscar productos en inventario"
            className="min-w-0 flex-1 border border-white/20 bg-graphite px-4 py-3 text-white placeholder:text-zinc-500"
          />

          <select
            value={filtro}
            onChange={(evento) =>
              setFiltro(evento.target.value)
            }
            aria-label="Filtrar inventario"
            className="border border-white/20 bg-graphite px-4 py-3 text-white"
          >
            <option value="TODOS">Todos los productos</option>
            <option value="DISPONIBLES">
              Disponibles
            </option>
            <option value="BAJO">Stock bajo</option>
            <option value="AGOTADOS">Agotados</option>
          </select>
        </div>

        <p className="mb-4 text-sm text-zinc-400">
          Mostrando {productosFiltrados.length} de{" "}
          {productos.length} productos
        </p>

        {productosFiltrados.length === 0 ? (
          <div className="border border-white/10 bg-graphite p-10 text-center">
            <p className="text-zinc-400">
              No hay productos para mostrar.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-white/10 bg-graphite">
            <table className="w-full min-w-[780px] text-left text-sm">
              <thead className="border-b border-white/10 text-xs uppercase tracking-wider text-gold">
                <tr>
                  <th className="px-5 py-4">Producto</th>
                  <th className="px-5 py-4">Categoría</th>
                  <th className="px-5 py-4">Precio</th>
                  <th className="px-5 py-4 text-center">
                    Unidades
                  </th>
                  <th className="px-5 py-4">Estado</th>
                  <th className="px-5 py-4">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {productosFiltrados.map((producto) => {
                  const estado = estadoStock(producto.stock);

                  return (
                    <tr
                      key={producto.id}
                      className="border-b border-white/10 last:border-b-0"
                    >
                      <td className="px-5 py-5 font-bold">
                        {producto.name}
                      </td>

                      <td className="px-5 py-5 text-zinc-400">
                        {producto.category}
                      </td>

                      <td className="px-5 py-5">
                        {formatoPrecio(producto.price)}
                      </td>

                      <td className="px-5 py-5 text-center font-bold">
                        {producto.stock}
                      </td>

                      <td className="px-5 py-5">
                        <span className={estado.estilo}>
                          {estado.texto}
                        </span>
                      </td>

                      <td className="px-5 py-5">
                        <Link
                          href={`/admin/productos/${producto.id}/editar`}
                          className="inline-block border border-gold px-4 py-2 text-xs font-bold text-gold transition hover:bg-gold hover:text-black"
                        >
                          EDITAR STOCK
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-6 text-xs text-zinc-500">
          El inventario muestra los productos activos.
          Para modificar existencias, utiliza el botón
          EDITAR STOCK de cada producto.
        </p>
      </div>
    </main>
  );
}

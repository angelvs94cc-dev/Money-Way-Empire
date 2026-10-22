"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type EstadoPedido =
  | "PENDING"
  | "PAID"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

type ProductoPedido = {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  size: string | null;
  color: string | null;
};

type Pedido = {
  id: string;
  status: EstadoPedido;
  total: number;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  items: ProductoPedido[];
};

type RespuestaPedidos = {
  success: boolean;
  message?: string;
  orders?: Pedido[];
};

const API = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000") + "";

const ESTADOS: Record<EstadoPedido, string> = {
  PENDING: "Pendiente",
  PAID: "Pagado",
  SHIPPED: "Enviado",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
};

function formatoPrecio(centimos: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(centimos / 100);
}

function formatoFecha(fecha: string) {
  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(fecha));
}

export default function AdminPedidosPage() {
  const router = useRouter();

  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [guardandoId, setGuardandoId] = useState<string | null>(
    null
  );
  const [filtro, setFiltro] = useState("TODOS");

  useEffect(() => {
    async function cargarPedidos() {
      const token = sessionStorage.getItem("mwe-token");

      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        const verificacion = await fetch(
          `${API}/api/auth/admin`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );

        if (!verificacion.ok) {
          router.replace("/mi-cuenta");
          return;
        }

        const respuesta = await fetch(
          `${API}/api/orders/admin`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );

        const datos: RespuestaPedidos =
          await respuesta.json();

        if (!respuesta.ok || !datos.success) {
          throw new Error(
            datos.message ||
              "No se pudieron cargar los pedidos"
          );
        }

        setPedidos(datos.orders ?? []);
      } catch (errorCapturado) {
        setError(
          errorCapturado instanceof Error
            ? errorCapturado.message
            : "Error al cargar los pedidos"
        );
      } finally {
        setCargando(false);
      }
    }

    void cargarPedidos();
  }, [router]);

  async function cambiarEstado(
    pedido: Pedido,
    nuevoEstado: EstadoPedido
  ) {
    if (pedido.status === nuevoEstado) return;

    const permitido =
      (nuevoEstado === "CANCELLED" &&
        (pedido.status === "PENDING" || pedido.status === "PAID")) ||
      ((pedido.status === "PENDING" || pedido.status === "PAID") &&
        nuevoEstado === "SHIPPED") ||
      (pedido.status === "SHIPPED" && nuevoEstado === "DELIVERED");

    if (!permitido) {
      setError("Este cambio de estado no está permitido.");
      return;
    }

    const confirmado = window.confirm(
      nuevoEstado === "CANCELLED"
        ? `¿Cancelar el pedido #${pedido.id.slice(0, 8).toUpperCase()}? Las unidades de sus productos volverán al stock. Esta acción no se puede deshacer.`
        : `¿Cambiar el pedido #${pedido.id.slice(0, 8).toUpperCase()} de "${ESTADOS[pedido.status]}" a "${ESTADOS[nuevoEstado]}"?`
    );

    if (!confirmado) return;

    const token = sessionStorage.getItem("mwe-token");

    if (!token) {
      router.replace("/login");
      return;
    }

    setGuardandoId(pedido.id);
    setError("");
    setMensaje("");

    try {
      const respuesta = await fetch(
        `${API}/api/orders/admin/${pedido.id}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: nuevoEstado,
          }),
        }
      );

      const datos = await respuesta.json();

      if (!respuesta.ok || !datos.success) {
        throw new Error(
          datos.message ||
            "No se pudo actualizar el pedido"
        );
      }

      setPedidos((anteriores) =>
        anteriores.map((actual) =>
          actual.id === pedido.id
            ? {
                ...actual,
                status: datos.order.status,
              }
            : actual
        )
      );

      setMensaje(
        nuevoEstado === "CANCELLED"
          ? "Pedido cancelado. El stock se ha recuperado correctamente."
          : "Estado actualizado correctamente."
      );
    } catch (errorCapturado) {
      setError(
        errorCapturado instanceof Error
          ? errorCapturado.message
          : "Error al actualizar el pedido"
      );
    } finally {
      setGuardandoId(null);
    }
  }

  const pedidosFiltrados = pedidos.filter(
    (pedido) =>
      filtro === "TODOS" || pedido.status === filtro
  );

  const pendientes = pedidos.filter(
    (pedido) => pedido.status === "PENDING"
  ).length;

  const enviados = pedidos.filter(
    (pedido) => pedido.status === "SHIPPED"
  ).length;

  const entregados = pedidos.filter(
    (pedido) => pedido.status === "DELIVERED"
  ).length;

  if (cargando) {
    return (
      <main className="min-h-screen bg-background px-6 py-20 text-foreground">
        <p className="text-center text-zinc-400">
          Cargando pedidos...
        </p>
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
              <span className="text-gold">pedidos.</span>
            </h1>

            <p className="mt-4 text-zinc-400">
              Consulta y administra los pedidos de tu tienda.
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
            { titulo: "Total pedidos", valor: pedidos.length },
            { titulo: "Pendientes", valor: pendientes },
            { titulo: "Enviados", valor: enviados },
            { titulo: "Entregados", valor: entregados },
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

        {error && (
          <p
            role="alert"
            className="mb-6 border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400"
          >
            {error}
          </p>
        )}

        {mensaje && (
          <p
            role="status"
            className="mb-6 border border-white/20 p-4 text-sm text-gold"
          >
            {mensaje}
          </p>
        )}

        <div className="mb-8 flex flex-wrap items-center gap-4">
          <label
            htmlFor="filtro"
            className="text-sm font-bold uppercase"
          >
            Filtrar por estado
          </label>

          <select
            id="filtro"
            value={filtro}
            onChange={(evento) =>
              setFiltro(evento.target.value)
            }
            className="border border-white/20 bg-graphite px-4 py-3 text-white"
          >
            <option value="TODOS">Todos</option>
            {Object.entries(ESTADOS).map(
              ([valor, nombre]) => (
                <option key={valor} value={valor}>
                  {nombre}
                </option>
              )
            )}
          </select>
        </div>

        {pedidosFiltrados.length === 0 ? (
          <div className="border border-white/10 bg-graphite p-10 text-center">
            <p className="text-zinc-400">
              No hay pedidos para mostrar.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {pedidosFiltrados.map((pedido) => (
              <article
                key={pedido.id}
                className="border border-white/10 bg-graphite p-6 md:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-zinc-500">
                      Número de pedido
                    </p>

                    <h2 className="mt-2 break-all text-lg font-black text-gold">
                      #{pedido.id.slice(0, 8).toUpperCase()}
                    </h2>

                    <p className="mt-2 text-xs text-zinc-500">
                      {pedido.id}
                    </p>

                    <p className="mt-3 text-sm text-zinc-400">
                      {formatoFecha(pedido.createdAt)}
                    </p>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-xs uppercase tracking-widest text-zinc-500">
                      Importe total
                    </p>

                    <p className="mt-2 text-2xl font-black text-gold">
                      {formatoPrecio(pedido.total)}
                    </p>

                    <p className="mt-2 text-sm text-zinc-400">
                      {ESTADOS[pedido.status]}
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-6 border-t border-white/10 pt-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-3 text-sm font-black uppercase text-gold">
                      Cliente
                    </h3>

                    <p className="font-bold">
                      {pedido.user.name}
                    </p>

                    <p className="mt-1 break-all text-sm text-zinc-400">
                      {pedido.user.email}
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-3 text-sm font-black uppercase text-gold">
                      Estado del pedido
                    </h3>

                    <select
                      aria-label={`Estado del pedido ${pedido.id}`}
                      value={pedido.status}
                      disabled={
                        guardandoId === pedido.id ||
                        pedido.status === "CANCELLED"
                      }
                      onChange={(evento) =>
                        void cambiarEstado(
                          pedido,
                          evento.target.value as EstadoPedido
                        )
                      }
                      className="w-full max-w-sm border border-white/20 bg-background px-4 py-3 text-white disabled:opacity-50"
                    >
                      {Object.entries(ESTADOS).map(([valor, nombre]) => {
                        const destino = valor as EstadoPedido;
                        const disponible =
                          destino === pedido.status ||
                          (destino === "CANCELLED" &&
                            (pedido.status === "PENDING" ||
                              pedido.status === "PAID")) ||
                          ((pedido.status === "PENDING" ||
                            pedido.status === "PAID") &&
                            destino === "SHIPPED") ||
                          (pedido.status === "SHIPPED" &&
                            destino === "DELIVERED");

                        return (
                          <option
                            key={valor}
                            value={valor}
                            disabled={!disponible}
                          >
                            {nombre}
                          </option>
                        );
                      })}
                    </select>

                    {guardandoId === pedido.id && (
                      <p className="mt-2 text-xs text-zinc-400">
                        Guardando cambios...
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <h3 className="mb-5 text-sm font-black uppercase text-gold">
                    Productos del pedido
                  </h3>

                  <div className="space-y-4">
                    {pedido.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-4"
                      >
                        <div>
                          <p className="font-bold">
                            {item.productName}
                          </p>

                          <p className="mt-2 text-sm text-zinc-400">
                            Cantidad: {item.quantity}
                          </p>

                          {item.size && (
                            <p className="text-sm text-zinc-400">
                              Talla: {item.size}
                            </p>
                          )}

                          {item.color && (
                            <p className="text-sm text-zinc-400">
                              Color: {item.color}
                            </p>
                          )}
                        </div>

                        <div className="text-right">
                          <p className="font-bold">
                            {formatoPrecio(
                              item.unitPrice * item.quantity
                            )}
                          </p>

                          <p className="mt-1 text-xs text-zinc-500">
                            {formatoPrecio(item.unitPrice)} / ud.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

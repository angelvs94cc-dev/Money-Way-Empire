
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type ProductoPedido = {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  size: string | null;
  color: string | null;
};

type Pedido = {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  items: ProductoPedido[];
};

type RespuestaPedidos = {
  success: boolean;
  message?: string;
  orders?: Pedido[];
};

function formatearPrecio(centimos: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(centimos / 100);
}

function formatearFecha(fecha: string) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(fecha));
}

function traducirEstado(estado: string) {
  const estados: Record<string, string> = {
    PENDING: "Pendiente",
    PAID: "Pagado",
    SHIPPED: "Enviado",
    DELIVERED: "Entregado",
    CANCELLED: "Cancelado",
  };

  return estados[estado] ?? estado;
}

export default function MiCuentaPage() {
  const router = useRouter();

  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("mwe-token");

    if (!token) {
      router.replace("/login");
      return;
    }

    async function cargarPedidos() {
      try {
        const respuesta = await fetch(
          "http://localhost:4000/api/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );

        if (respuesta.status === 401) {
          sessionStorage.removeItem("mwe-token");
          router.replace("/login");
          return;
        }

        const datos: RespuestaPedidos =
          await respuesta.json();

        if (!respuesta.ok || !datos.success) {
          throw new Error(
            datos.message ||
              "No se pudieron cargar tus pedidos."
          );
        }

        setPedidos(datos.orders ?? []);
      } catch (errorCapturado) {
        setError(
          errorCapturado instanceof Error
            ? errorCapturado.message
            : "Ha ocurrido un error inesperado."
        );
      } finally {
        setCargando(false);
      }
    }

    void cargarPedidos();
  }, [router]);

  function cerrarSesion() {
    sessionStorage.removeItem("mwe-token");
    router.replace("/login");
  }

  if (cargando) {
    return (
      <main className="min-h-screen bg-background px-6 py-24 text-center text-foreground">
        <p className="text-gold">
          Cargando tu cuenta...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-gold">
            Money Way Empire
          </p>

          <h1 className="mt-6 text-5xl font-black uppercase md:text-7xl">
            Mi <span className="text-gold">cuenta.</span>
          </h1>

          <p className="mt-6 text-zinc-400">
            Consulta el historial de tus pedidos.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="border border-white/20 px-6 py-3 text-sm font-bold hover:border-gold hover:text-gold"
            >
              IR A LA TIENDA
            </Link>

            <button
              type="button"
              onClick={cerrarSesion}
              className="border border-red-500/40 px-6 py-3 text-sm font-bold text-red-400 hover:border-red-400"
            >
              CERRAR SESIÓN
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-3xl font-black uppercase">
          Mis <span className="text-gold">pedidos</span>
        </h2>

        {error && (
          <p
            role="alert"
            className="mt-8 border border-red-500/30 bg-graphite p-6 text-red-400"
          >
            {error}
          </p>
        )}

        {!error && pedidos.length === 0 && (
          <div className="mt-10 border border-white/10 bg-graphite p-10">
            <h3 className="text-xl font-black uppercase">
              Todavía no tienes pedidos
            </h3>

            <p className="mt-4 text-zinc-400">
              Cuando realices tu primera compra,
              podrás consultar aquí sus detalles.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-block bg-gold px-8 py-4 font-black uppercase text-black hover:bg-gold-light"
            >
              EXPLORAR TIENDA
            </Link>
          </div>
        )}

        {!error && pedidos.length > 0 && (
          <div className="mt-10 space-y-8">
            {pedidos.map((pedido) => (
              <article
                key={pedido.id}
                className="border border-white/10 bg-graphite p-6 md:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-6 border-b border-white/10 pb-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gold">
                      Número de pedido
                    </p>

                    <p className="mt-2 break-all text-sm font-bold">
                      {pedido.id}
                    </p>

                    <p className="mt-3 text-sm text-zinc-400">
                      {formatearFecha(pedido.createdAt)}
                    </p>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-sm text-zinc-400">
                      Estado
                    </p>

                    <p className="mt-2 font-black uppercase text-gold">
                      {traducirEstado(pedido.status)}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-5">
                  {pedido.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-wrap justify-between gap-4"
                    >
                      <div>
                        <p className="font-bold">
                          {item.productName}
                        </p>

                        <p className="mt-2 text-sm text-zinc-400">
                          Cantidad: {item.quantity}
                          {item.size
                            ? ` · Talla: ${item.size}`
                            : ""}
                          {item.color
                            ? ` · Color: ${item.color}`
                            : ""}
                        </p>
                      </div>

                      <p className="font-bold">
                        {formatearPrecio(
                          item.unitPrice * item.quantity
                        )}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                  <span className="font-bold uppercase">
                    Total del pedido
                  </span>

                  <span className="text-2xl font-black text-gold">
                    {formatearPrecio(pedido.total)}
                  </span>
                </div>

                {pedido.status === "PENDING" && (
                  <p className="mt-5 text-xs text-zinc-500">
                    Pedido pendiente de pago.
                    No se ha realizado ningún cobro.
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}


"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Estado = "cargando" | "pagado" | "pendiente" | "sin-sesion" | "error";

type Pedido = {
  id: string;
  status: string;
  stripeSessionId: string | null;
};

export default function CheckoutSuccessPage() {
  const [estado, setEstado] = useState<Estado>("cargando");

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");

    if (!sessionId) {
      setEstado("sin-sesion");
      return;
    }

    const token = sessionStorage.getItem("mwe-token");

    if (!token) {
      setEstado("error");
      return;
    }

    let cancelado = false;

    async function comprobarPedido() {
      try {
        const respuesta = await fetch("http://localhost:4000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });

        if (!respuesta.ok) throw new Error("No se pudieron consultar los pedidos");

        const datos = await respuesta.json();

        if (!datos.success || !Array.isArray(datos.orders)) {
          throw new Error("Respuesta de pedidos no válida");
        }

        const pedido = (datos.orders as Pedido[]).find(
          (item) => item.stripeSessionId === sessionId
        );

        if (!cancelado) {
          if (!pedido) {
            setEstado("error");
          } else if (["PAID", "SHIPPED", "DELIVERED"].includes(pedido.status)) {
            setEstado("pagado");
          } else {
            setEstado("pendiente");
          }
        }
      } catch {
        if (!cancelado) setEstado("error");
      }
    }

    void comprobarPedido();

    return () => {
      cancelado = true;
    };
  }, []);

  const contenido = {
    cargando: {
      titulo: "Comprobando tu pedido",
      mensaje: "Estamos consultando el estado de tu compra.",
    },
    pagado: {
      titulo: "¡Pago confirmado!",
      mensaje: "Tu pedido figura como pagado. Gracias por comprar en Money Way Empire.",
    },
    pendiente: {
      titulo: "Pago en proceso",
      mensaje:
        "Tu pedido todavía no figura como pagado. La confirmación puede tardar unos instantes. Consulta tus pedidos más tarde.",
    },
    "sin-sesion": {
      titulo: "Consulta tus pedidos",
      mensaje: "Para comprobar una compra, accede desde el enlace de confirmación de Stripe.",
    },
    error: {
      titulo: "No podemos verificar el pago",
      mensaje:
        "No hemos podido comprobar el estado del pedido. Consulta tu cuenta antes de intentar pagar de nuevo.",
    },
  }[estado];

  return (
    <main className="min-h-screen bg-background px-6 py-24 text-foreground">
      <section className="mx-auto max-w-2xl border border-white/10 bg-graphite p-8 text-center md:p-14">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-gold">
          Money Way Empire
        </p>

        <h1 className="mt-6 text-4xl font-black uppercase md:text-5xl">
          {contenido.titulo}
        </h1>

        <p className="mt-8 text-lg text-zinc-300">
          {contenido.mensaje}
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/mi-cuenta"
            className="bg-gold px-7 py-4 text-sm font-black uppercase text-black"
          >
            Ver mis pedidos
          </Link>

          <Link
            href="/shop"
            className="border border-white/30 px-7 py-4 text-sm font-black uppercase text-white"
          >
            Volver a la tienda
          </Link>
        </div>
      </section>
    </main>
  );
}

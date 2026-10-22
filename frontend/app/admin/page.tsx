
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [cargando, setCargando] = useState(true);
  const [autorizado, setAutorizado] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("mwe-token");

    if (!token) {
      setMensaje("Debes iniciar sesión para acceder.");
      setCargando(false);
      return;
    }

    async function comprobarAdmin() {
      try {
        const respuesta = await fetch(
          (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000") + "/api/auth/admin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );

        if (!respuesta.ok) {
          if (respuesta.status === 403) {
            throw new Error(
              "No tienes permisos de administrador."
            );
          }

          throw new Error(
            "No se ha podido verificar tu acceso."
          );
        }

        setAutorizado(true);
      } catch (error) {
        setMensaje(
          error instanceof Error
            ? error.message
            : "Ha ocurrido un error."
        );
      } finally {
        setCargando(false);
      }
    }

    void comprobarAdmin();
  }, []);

  if (cargando) {
    return (
      <main className="min-h-screen bg-background px-6 py-24 text-center text-foreground">
        Comprobando permisos...
      </main>
    );
  }

  if (!autorizado) {
    return (
      <main className="min-h-screen bg-background px-6 py-24 text-center text-foreground">
        <h1 className="text-4xl font-black uppercase text-gold">
          Acceso restringido
        </h1>
        <p className="mt-6 text-zinc-400">{mensaje}</p>
        <Link
          href="/login"
          className="mt-8 inline-block border border-gold px-6 py-3 font-bold text-gold"
        >
          INICIAR SESIÓN
        </Link>
      </main>
    );
  }

  const secciones = [
    {
      titulo: "Productos",
      descripcion: "Crear, editar y gestionar productos.",
      enlace: "/admin/productos",
    },
    {
      titulo: "Pedidos",
      descripcion: "Consultar pedidos y actualizar estados.",
      enlace: "/admin/pedidos",
    },
    {
      titulo: "Inventario",
      descripcion: "Controlar las existencias de la tienda.",
      enlace: "/admin/inventario",
    },
    {
      titulo: "Usuarios",
      descripcion: "Consultar los clientes registrados.",
      enlace: "/admin/usuarios",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-gold">
            Money Way Empire
          </p>

          <h1 className="mt-6 text-5xl font-black uppercase md:text-7xl">
            Panel de <span className="text-gold">administración.</span>
          </h1>

          <p className="mt-6 text-zinc-400">
            Gestiona tu tienda desde un único lugar.
          </p>

          <div className="mt-8 inline-flex border border-green-500/30 px-5 py-3 text-sm font-bold text-green-400">
            ACCESO ADMINISTRADOR AUTORIZADO
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-16 md:grid-cols-2">
        {secciones.map((seccion) => (
          <Link
            key={seccion.titulo}
            href={seccion.enlace}
            className="group border border-white/10 bg-graphite p-8 transition hover:border-gold"
          >
            <h2 className="text-2xl font-black uppercase group-hover:text-gold">
              {seccion.titulo}
            </h2>

            <p className="mt-4 text-zinc-400">
              {seccion.descripcion}
            </p>

            <p className="mt-8 text-sm font-bold uppercase text-gold">
              GESTIONAR →
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
}

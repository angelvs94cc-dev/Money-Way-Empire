
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Usuario = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  createdAt: string;
  _count: {
    orders: number;
  };
};

type RespuestaUsuarios = {
  success: boolean;
  message?: string;
  users?: Usuario[];
};

const API = "http://localhost:4000";

function formatoFecha(fecha: string) {
  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(fecha));
}

export default function AdminUsuariosPage() {
  const router = useRouter();

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [filtroRol, setFiltroRol] = useState("TODOS");

  useEffect(() => {
    async function cargarUsuarios() {
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
          `${API}/api/users/admin`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );

        const datos: RespuestaUsuarios =
          await respuesta.json();

        if (!respuesta.ok || !datos.success) {
          throw new Error(
            datos.message ||
              "No se pudieron cargar los usuarios"
          );
        }

        setUsuarios(datos.users ?? []);
      } catch (errorCapturado) {
        setError(
          errorCapturado instanceof Error
            ? errorCapturado.message
            : "Error al cargar los usuarios"
        );
      } finally {
        setCargando(false);
      }
    }

    void cargarUsuarios();
  }, [router]);

  const usuariosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    return usuarios.filter((usuario) => {
      const coincideBusqueda =
        usuario.name.toLowerCase().includes(texto) ||
        usuario.email.toLowerCase().includes(texto);

      const coincideRol =
        filtroRol === "TODOS" ||
        usuario.role === filtroRol;

      return coincideBusqueda && coincideRol;
    });
  }, [usuarios, busqueda, filtroRol]);

  const administradores = usuarios.filter(
    (usuario) => usuario.role === "ADMIN"
  ).length;

  const clientes = usuarios.filter(
    (usuario) => usuario.role === "USER"
  ).length;

  const totalPedidos = usuarios.reduce(
    (total, usuario) => total + usuario._count.orders,
    0
  );

  if (cargando) {
    return (
      <main className="min-h-screen bg-background px-6 py-20 text-foreground">
        <p className="text-center text-zinc-400">
          Cargando usuarios...
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
              <span className="text-gold">
                usuarios.
              </span>
            </h1>

            <p className="mt-4 text-zinc-400">
              Consulta las cuentas registradas en tu tienda.
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
              titulo: "Total usuarios",
              valor: usuarios.length,
            },
            {
              titulo: "Clientes",
              valor: clientes,
            },
            {
              titulo: "Administradores",
              valor: administradores,
            },
            {
              titulo: "Pedidos realizados",
              valor: totalPedidos,
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

        {error && (
          <p
            role="alert"
            className="mb-6 border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400"
          >
            {error}
          </p>
        )}

        <div className="mb-8 flex flex-wrap gap-4">
          <input
            type="search"
            value={busqueda}
            onChange={(evento) =>
              setBusqueda(evento.target.value)
            }
            placeholder="Buscar por nombre o correo..."
            aria-label="Buscar usuarios"
            className="min-w-0 flex-1 border border-white/20 bg-graphite px-4 py-3 text-white placeholder:text-zinc-500"
          />

          <select
            value={filtroRol}
            onChange={(evento) =>
              setFiltroRol(evento.target.value)
            }
            aria-label="Filtrar por rol"
            className="border border-white/20 bg-graphite px-4 py-3 text-white"
          >
            <option value="TODOS">Todos los roles</option>
            <option value="USER">Clientes</option>
            <option value="ADMIN">
              Administradores
            </option>
          </select>
        </div>

        <p className="mb-4 text-sm text-zinc-400">
          Mostrando {usuariosFiltrados.length} de{" "}
          {usuarios.length} usuarios
        </p>

        {usuariosFiltrados.length === 0 ? (
          <div className="border border-white/10 bg-graphite p-10 text-center">
            <p className="text-zinc-400">
              No hay usuarios para mostrar.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-white/10 bg-graphite">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-white/10 text-xs uppercase tracking-wider text-gold">
                <tr>
                  <th className="px-5 py-4">
                    Usuario
                  </th>
                  <th className="px-5 py-4">
                    Rol
                  </th>
                  <th className="px-5 py-4">
                    Registro
                  </th>
                  <th className="px-5 py-4 text-center">
                    Pedidos
                  </th>
                </tr>
              </thead>

              <tbody>
                {usuariosFiltrados.map((usuario) => (
                  <tr
                    key={usuario.id}
                    className="border-b border-white/10 last:border-b-0"
                  >
                    <td className="px-5 py-5">
                      <p className="font-bold">
                        {usuario.name}
                      </p>

                      <p className="mt-1 break-all text-zinc-400">
                        {usuario.email}
                      </p>
                    </td>

                    <td className="px-5 py-5">
                      <span
                        className={
                          usuario.role === "ADMIN"
                            ? "font-bold text-gold"
                            : "text-zinc-300"
                        }
                      >
                        {usuario.role === "ADMIN"
                          ? "Administrador"
                          : "Cliente"}
                      </span>
                    </td>

                    <td className="px-5 py-5 text-zinc-300">
                      {formatoFecha(usuario.createdAt)}
                    </td>

                    <td className="px-5 py-5 text-center font-bold">
                      {usuario._count.orders}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

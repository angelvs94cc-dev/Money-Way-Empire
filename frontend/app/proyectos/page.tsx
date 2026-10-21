
"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  proyectosPublicados,
  type CategoriaProyecto,
} from "../../data/proyectos";

type Filtro = "Todos" | CategoriaProyecto;

const categorias: Filtro[] = [
  "Todos",
  "Audiovisual",
  "Fotografía",
  "Diseño y branding",
  "Marketing",
  "Desarrollo web",
];

const rutas: Record<Filtro, string> = {
  Todos: "/proyectos",
  Audiovisual: "/proyectos?categoria=audiovisual",
  Fotografía: "/proyectos?categoria=fotografia",
  "Diseño y branding": "/proyectos?categoria=diseno-branding",
  Marketing: "/proyectos?categoria=marketing",
  "Desarrollo web": "/proyectos?categoria=desarrollo-web",
};

const parametros: Record<string, Filtro> = {
  audiovisual: "Audiovisual",
  fotografia: "Fotografía",
  "diseno-branding": "Diseño y branding",
  marketing: "Marketing",
  "desarrollo-web": "Desarrollo web",
};

function ContenidoProyectos() {
  const searchParams = useSearchParams();

  const categoriaActiva: Filtro =
    parametros[searchParams.get("categoria") ?? ""] ?? "Todos";

  const proyectosFiltrados =
    categoriaActiva === "Todos"
      ? proyectosPublicados
      : proyectosPublicados.filter(
          (proyecto) => proyecto.categoria === categoriaActiva
        );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-white/10 px-6 pb-16 pt-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.3em] text-gold">
            Money Way Empire / Portfolio
          </p>

          <h1 className="max-w-5xl text-5xl font-black uppercase leading-tight md:text-7xl">
            Nuestro trabajo.
            <span className="block text-gold">
              Nuestra identidad.
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-400">
            Proyectos de música, audiovisual, fotografía, diseño,
            marketing y desarrollo web. Descubre los trabajos que
            forman parte de nuestro universo creativo.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-14">
        <div className="flex flex-wrap gap-3">
          {categorias.map((categoria) => (
            <Link
              key={categoria}
              href={rutas[categoria]}
              aria-current={
                categoriaActiva === categoria ? "page" : undefined
              }
              className={`border px-5 py-3 text-sm font-bold transition ${
                categoriaActiva === categoria
                  ? "border-gold bg-gold text-black"
                  : "border-white/20 text-zinc-300 hover:border-gold hover:text-gold"
              }`}
            >
              {categoria === "Marketing" ? "Marketing digital" : categoria}
            </Link>
          ))}
        </div>

        <p className="mt-8 text-sm text-zinc-500">
          {proyectosFiltrados.length} proyectos
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 pt-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {proyectosFiltrados.map((proyecto) => (
            <article
              key={proyecto.id}
              className="group overflow-hidden border border-white/10 bg-graphite transition hover:border-gold/60"
            >
              <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-zinc-800">
                {proyecto.imagen ? (
                  <img
                    src={proyecto.imagen}
                    alt={proyecto.titulo}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="px-6 text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
                      Money Way Empire
                    </p>
                    <p className="mt-4 text-2xl font-black uppercase text-zinc-400">
                      {proyecto.subcategoria || proyecto.categoria}
                    </p>
                  </div>
                )}
              </div>

              <div className="p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-gold">
                  {proyecto.subcategoria || proyecto.categoria}
                </p>

                <h2 className="mt-4 text-2xl font-black uppercase">
                  {proyecto.titulo}
                </h2>

                {proyecto.cliente &&
                  !["No consta", "Marca/cliente pendiente", "Artista/cliente no verificado"].includes(
                    proyecto.cliente
                  ) && (
                    <p className="mt-3 text-sm text-zinc-300">
                      {proyecto.cliente}
                    </p>
                  )}

                <p className="mt-5 leading-relaxed text-zinc-400">
                  {proyecto.descripcion}
                </p>

                {proyecto.enlace && (
                  <a
                    href={proyecto.enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-3 font-bold text-gold transition group-hover:gap-5"
                  >
                    VER PROYECTO
                    <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {proyectosFiltrados.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-xl font-bold">
              Próximamente
            </p>
            <p className="mt-3 text-zinc-400">
              Estamos preparando los trabajos de esta categoría.
            </p>
            <Link
              href="/proyectos"
              className="mt-6 inline-block font-bold text-gold"
            >
              VER TODOS LOS PROYECTOS →
            </Link>
          </div>
        )}
      </section>

      <section className="border-t border-white/10 bg-graphite px-6 py-24">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-5 text-sm font-bold uppercase tracking-widest text-gold">
            Tu proyecto puede ser el siguiente
          </p>

          <h2 className="text-4xl font-black uppercase md:text-6xl">
            Hagamos algo juntos.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
            ¿Tienes una idea o un proyecto creativo?
            Hablemos de cómo podemos hacerlo realidad.
          </p>

          <Link
            href="/contacto"
            className="mt-10 inline-block bg-gold px-8 py-4 font-bold text-black transition hover:bg-gold-light"
          >
            CUÉNTANOS TU PROYECTO
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function ProyectosPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-background px-6 py-24 text-foreground">
          Cargando proyectos...
        </main>
      }
    >
      <ContenidoProyectos />
    </Suspense>
  );
}

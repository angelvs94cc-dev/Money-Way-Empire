
"use client";

import Link from "next/link";
import { useState } from "react";

type Categoria =
  | "Todos"
  | "Audiovisual"
  | "Diseño y branding"
  | "Marketing"
  | "Desarrollo web";

type Proyecto = {
  id: number;
  titulo: string;
  categoria: Exclude<Categoria, "Todos">;
  tipo: string;
  descripcion: string;
  imagen: string;
  enlace: string;
};

const categorias: Categoria[] = [
  "Todos",
  "Audiovisual",
  "Diseño y branding",
  "Marketing",
  "Desarrollo web",
];

// PROYECTOS DE EJEMPLO
// Más adelante los sustituiremos por tus trabajos reales
// y los conectaremos con la base de datos.

const proyectos: Proyecto[] = [
  {
    id: 1,
    titulo: "Proyecto audiovisual 01",
    categoria: "Audiovisual",
    tipo: "Videoclip musical",
    descripcion:
      "Producción audiovisual para un lanzamiento musical.",
    imagen: "",
    enlace: "/proyectos/audiovisual",
  },
  {
    id: 2,
    titulo: "Proyecto de branding 01",
    categoria: "Diseño y branding",
    tipo: "Identidad visual",
    descripcion:
      "Desarrollo de identidad gráfica para una marca.",
    imagen: "",
    enlace: "/proyectos/diseno-branding",
  },
  {
    id: 3,
    titulo: "Proyecto de marketing 01",
    categoria: "Marketing",
    tipo: "Campaña digital",
    descripcion:
      "Estrategia de comunicación y publicidad digital.",
    imagen: "",
    enlace: "/proyectos/marketing",
  },
  {
    id: 4,
    titulo: "Proyecto web 01",
    categoria: "Desarrollo web",
    tipo: "Desarrollo web",
    descripcion:
      "Diseño y desarrollo de una experiencia digital.",
    imagen: "",
    enlace: "/proyectos/desarrollo-web",
  },
  {
    id: 5,
    titulo: "Proyecto audiovisual 02",
    categoria: "Audiovisual",
    tipo: "Publicidad y contenido",
    descripcion:
      "Creación de contenido audiovisual para una campaña.",
    imagen: "",
    enlace: "/proyectos/audiovisual",
  },
  {
    id: 6,
    titulo: "Proyecto de diseño 02",
    categoria: "Diseño y branding",
    tipo: "Diseño gráfico",
    descripcion:
      "Diseño de materiales gráficos y promocionales.",
    imagen: "",
    enlace: "/proyectos/diseno-branding",
  },
];

export default function ProyectosPage() {
  const [categoriaActiva, setCategoriaActiva] =
    useState<Categoria>("Todos");

  const proyectosFiltrados =
    categoriaActiva === "Todos"
      ? proyectos
      : proyectos.filter(
          (proyecto) => proyecto.categoria === categoriaActiva
        );

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* CABECERA */}
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
            Exploramos la creatividad a través de la música,
            el audiovisual, el diseño, el marketing y la tecnología.
            Descubre los proyectos que forman parte de nuestro
            universo creativo.
          </p>
        </div>
      </section>

      {/* FILTROS */}
      <section className="mx-auto max-w-7xl px-6 pt-14">
        <div className="flex flex-wrap gap-3">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              type="button"
              onClick={() => setCategoriaActiva(categoria)}
              aria-pressed={categoriaActiva === categoria}
              className={`border px-5 py-3 text-sm font-bold transition ${
                categoriaActiva === categoria
                  ? "border-gold bg-gold text-black"
                  : "border-white/20 text-zinc-300 hover:border-gold hover:text-gold"
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>

        <p className="mt-8 text-sm text-zinc-500">
          {proyectosFiltrados.length} proyectos
        </p>
      </section>

      {/* CUADRÍCULA DE PROYECTOS */}
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {proyectosFiltrados.map((proyecto) => (
            <article
              key={proyecto.id}
              className="group overflow-hidden border border-white/10 bg-graphite transition hover:border-gold/60"
            >
              {/* IMAGEN DEL PROYECTO */}
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

                    <p className="mt-4 text-2xl font-black uppercase text-zinc-500">
                      {proyecto.tipo}
                    </p>

                    <p className="mt-3 text-xs text-zinc-600">
                      Imagen próximamente
                    </p>
                  </div>
                )}
              </div>

              {/* INFORMACIÓN */}
              <div className="p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-gold">
                  {proyecto.categoria}
                </p>

                <h2 className="mt-4 text-2xl font-black uppercase">
                  {proyecto.titulo}
                </h2>

                <p className="mt-3 text-sm text-zinc-400">
                  {proyecto.tipo}
                </p>

                <p className="mt-5 leading-relaxed text-zinc-400">
                  {proyecto.descripcion}
                </p>

                <Link
                  href={proyecto.enlace}
                  className="mt-8 inline-flex items-center gap-3 font-bold text-gold transition group-hover:gap-5"
                >
                  VER CATEGORÍA
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {proyectosFiltrados.length === 0 && (
          <p className="py-16 text-center text-zinc-400">
            Todavía no hay proyectos en esta categoría.
          </p>
        )}
      </section>

      {/* CONTACTO */}
      <section className="border-t border-white/10 bg-graphite px-6 py-24">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-5 text-sm font-bold uppercase tracking-widest text-gold">
            Tu proyecto puede ser el siguiente
          </p>

          <h2 className="text-4xl font-black uppercase md:text-6xl">
            Hagamos algo juntos.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
            ¿Tienes una idea, una marca o un proyecto creativo?
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

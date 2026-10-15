
"use client";

import Link from "next/link";
import { useState } from "react";

type TipoLanzamiento = "Single" | "EP" | "Álbum";

type Lanzamiento = {
  id: number;
  titulo: string;
  artista: string;
  tipo: TipoLanzamiento;
  genero: string;
  portada: string;
  fecha: string;
  spotify: string;
  youtube: string;
  appleMusic: string;
};

type Filtro = "Todos" | TipoLanzamiento;

const filtros: Filtro[] = [
  "Todos",
  "Single",
  "EP",
  "Álbum",
];

const lanzamientos: Lanzamiento[] = [
  {
    id: 1,
    titulo: "CHITO",
    artista: "Cream Mami",
    tipo: "Single",
    genero: "Música urbana",
    portada: "",
    fecha: "2026",
    spotify: "",
    youtube: "",
    appleMusic: "",
  },
  {
    id: 2,
    titulo: "Madrid Vice City",
    artista: "Cream Mami",
    tipo: "EP",
    genero: "Rap / Trap",
    portada: "",
    fecha: "",
    spotify: "",
    youtube: "",
    appleMusic: "",
  },
  {
    id: 3,
    titulo: "Demasiado",
    artista: "Cream Mami",
    tipo: "Single",
    genero: "Música urbana",
    portada: "",
    fecha: "",
    spotify: "",
    youtube: "",
    appleMusic: "",
  },
  {
    id: 4,
    titulo: "Trapichero",
    artista: "Cream Mami",
    tipo: "Single",
    genero: "Rap / Trap",
    portada: "",
    fecha: "",
    spotify: "",
    youtube: "",
    appleMusic: "",
  },
  {
    id: 5,
    titulo: "Calypo",
    artista: "Cream Mami",
    tipo: "Single",
    genero: "Música urbana",
    portada: "",
    fecha: "",
    spotify: "",
    youtube: "",
    appleMusic: "",
  },
];

export default function LanzamientosPage() {
  const [filtroActivo, setFiltroActivo] =
    useState<Filtro>("Todos");

  const lanzamientosFiltrados =
    filtroActivo === "Todos"
      ? lanzamientos
      : lanzamientos.filter(
          (lanzamiento) =>
            lanzamiento.tipo === filtroActivo
        );

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* CABECERA */}
      <section className="border-b border-white/10 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/musica"
            className="text-sm text-zinc-400 transition hover:text-gold"
          >
            ← Volver a Música
          </Link>

          <p className="mb-5 mt-12 text-sm font-bold uppercase tracking-[0.3em] text-gold">
            Money Way Empire / Discografía
          </p>

          <h1 className="max-w-5xl text-5xl font-black uppercase leading-tight md:text-7xl">
            Nuestra
            <span className="block text-gold">
              música.
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-400">
            Descubre los lanzamientos musicales
            de Money Way Empire. Singles, EPs,
            álbumes y sonidos que forman parte
            de nuestra identidad.
          </p>
        </div>
      </section>

      {/* CATÁLOGO */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12">
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gold">
            Catálogo musical
          </p>

          <h2 className="text-4xl font-black uppercase md:text-5xl">
            Lanzamientos
          </h2>

          <p className="mt-6 max-w-3xl text-zinc-400">
            Explora nuestra selección de música
            y descubre los proyectos publicados.
          </p>
        </div>

        {/* FILTROS */}
        <div className="mb-12 flex flex-wrap gap-3">
          {filtros.map((filtro) => (
            <button
              key={filtro}
              type="button"
              onClick={() => setFiltroActivo(filtro)}
              aria-pressed={filtroActivo === filtro}
              className={`border px-6 py-3 text-sm font-bold uppercase transition ${
                filtroActivo === filtro
                  ? "border-gold bg-gold text-black"
                  : "border-white/20 text-zinc-300 hover:border-gold hover:text-gold"
              }`}
            >
              {filtro === "Todos"
                ? "Todos"
                : filtro === "Álbum"
                ? "Álbumes"
                : filtro === "Single"
                ? "Singles"
                : "EPs"}
            </button>
          ))}
        </div>

        {/* RESULTADOS */}
        <p className="mb-8 text-sm text-zinc-500">
          {lanzamientosFiltrados.length}{" "}
          {lanzamientosFiltrados.length === 1
            ? "lanzamiento"
            : "lanzamientos"}
        </p>

        {/* TARJETAS */}
        {lanzamientosFiltrados.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {lanzamientosFiltrados.map(
              (lanzamiento) => (
                <article
                  key={lanzamiento.id}
                  className="flex flex-col overflow-hidden border border-white/10 bg-graphite transition hover:border-gold/60"
                >
                  {/* PORTADA */}
                  <div className="flex aspect-square flex-col items-center justify-center bg-zinc-800 p-8 text-center">
                    {lanzamiento.portada ? (
                      <img
                        src={lanzamiento.portada}
                        alt={`Portada de ${lanzamiento.titulo}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <>
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
                          Money Way Empire
                        </p>

                        <h3 className="mt-6 text-3xl font-black uppercase">
                          {lanzamiento.titulo}
                        </h3>

                        <p className="mt-4 text-xs text-zinc-500">
                          Portada próximamente
                        </p>
                      </>
                    )}
                  </div>

                  {/* INFORMACIÓN */}
                  <div className="flex flex-1 flex-col p-8">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs font-bold uppercase tracking-widest text-gold">
                        {lanzamiento.tipo}
                      </span>

                      {lanzamiento.fecha && (
                        <span className="text-sm text-zinc-500">
                          {lanzamiento.fecha}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-5 text-2xl font-black uppercase">
                      {lanzamiento.titulo}
                    </h3>

                    <p className="mt-3 text-zinc-300">
                      {lanzamiento.artista}
                    </p>

                    <p className="mt-3 text-sm text-zinc-500">
                      {lanzamiento.genero}
                    </p>

                    {/* ENLACES MUSICALES */}
                    <div className="mt-auto flex flex-wrap gap-4 pt-8 text-sm font-bold">
                      {lanzamiento.spotify && (
                        <a
                          href={lanzamiento.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gold transition hover:text-gold-light"
                        >
                          SPOTIFY ↗
                        </a>
                      )}

                      {lanzamiento.youtube && (
                        <a
                          href={lanzamiento.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gold transition hover:text-gold-light"
                        >
                          YOUTUBE ↗
                        </a>
                      )}

                      {lanzamiento.appleMusic && (
                        <a
                          href={lanzamiento.appleMusic}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gold transition hover:text-gold-light"
                        >
                          APPLE MUSIC ↗
                        </a>
                      )}
                    </div>

                    {!lanzamiento.spotify &&
                      !lanzamiento.youtube &&
                      !lanzamiento.appleMusic && (
                        <p className="mt-auto pt-8 text-sm text-zinc-500">
                          Enlaces de escucha pendientes
                        </p>
                      )}
                  </div>
                </article>
              )
            )}
          </div>
        ) : (
          <div className="border border-white/10 bg-graphite p-12 text-center">
            <h3 className="text-2xl font-black uppercase">
              Sin lanzamientos
            </h3>

            <p className="mt-4 text-zinc-400">
              Todavía no hay publicaciones
              en esta categoría.
            </p>
          </div>
        )}
      </section>

      {/* PRODUCCIÓN MUSICAL */}
      <section className="border-y border-white/10 bg-graphite px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gold">
            Servicios musicales
          </p>

          <h2 className="text-4xl font-black uppercase md:text-5xl">
            ¿Estás creando música?
          </h2>

          <p className="mt-6 max-w-3xl leading-relaxed text-zinc-400">
            Además de nuestros lanzamientos,
            desarrollamos proyectos musicales
            mediante producción, grabación,
            mezcla, mastering y composición.
          </p>

          <Link
            href="/servicios/produccion-musical"
            className="mt-8 inline-block border border-gold px-8 py-4 font-bold text-gold transition hover:bg-gold hover:text-black"
          >
            VER PRODUCCIÓN MUSICAL →
          </Link>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-5 text-sm font-bold uppercase tracking-widest text-gold">
            Money Way Empire Music
          </p>

          <h2 className="text-4xl font-black uppercase md:text-6xl">
            La música nos conecta.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
            ¿Quieres colaborar con nosotros
            o desarrollar un proyecto musical?
            Estamos abiertos a escuchar nuevas propuestas.
          </p>

          <Link
            href="/contacto"
            className="mt-10 inline-block bg-gold px-8 py-4 font-bold text-black transition hover:bg-gold-light"
          >
            CONTACTAR
          </Link>
        </div>
      </section>
    </main>
  );
}

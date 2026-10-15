
"use client";

import Link from "next/link";
import { useState } from "react";

type Evento = {
  id: number;
  titulo: string;
  fecha: string;
  ciudad: string;
  recinto: string;
  organizador: string;
  descripcion: string;
  cartel: string;
  entradas: string;
  estado: "proximo" | "pasado";
};

const eventos: Evento[] = [];

// Los eventos reales se incorporarán más adelante.
// Ejemplo de estructura:
//
// {
//   id: 1,
//   titulo: "Nombre del concierto",
//   fecha: "2026-12-15",
//   ciudad: "Madrid",
//   recinto: "Nombre de la sala",
//   organizador: "Nombre del organizador",
//   descripcion: "Información del concierto.",
//   cartel: "/eventos/concierto.jpg",
//   entradas: "https://...",
//   estado: "proximo",
// }

function formatearFecha(fecha: string) {
  if (!fecha) return "Fecha por confirmar";

  const fechaLocal = new Date(`${fecha}T12:00:00`);

  if (Number.isNaN(fechaLocal.getTime())) {
    return fecha;
  }

  return fechaLocal.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function EventosPage() {
  const [filtro, setFiltro] = useState<
    "proximo" | "pasado"
  >("proximo");

  const eventosFiltrados = eventos
    .filter((evento) => evento.estado === filtro)
    .sort((a, b) =>
      filtro === "proximo"
        ? a.fecha.localeCompare(b.fecha)
        : b.fecha.localeCompare(a.fecha)
    );

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* CABECERA */}
      <section className="border-b border-white/10 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.3em] text-gold">
            Money Way Empire / Live
          </p>

          <h1 className="max-w-5xl text-5xl font-black uppercase leading-tight md:text-7xl">
            Vive la
            <span className="block text-gold">
              experiencia.
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-400">
            Conciertos, festivales, sesiones y experiencias
            que conectan música, cultura y comunidad.
            Descubre nuestros próximos eventos y revive
            los que ya han pasado.
          </p>

          <a
            href="#agenda"
            className="mt-10 inline-block bg-gold px-8 py-4 font-bold text-black transition hover:bg-gold-light"
          >
            EXPLORAR AGENDA ↓
          </a>
        </div>
      </section>

      {/* AGENDA */}
      <section
        id="agenda"
        className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24"
      >
        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gold">
          Agenda
        </p>

        <h2 className="text-4xl font-black uppercase md:text-5xl">
          Nuestros eventos
        </h2>

        <p className="mt-6 max-w-3xl leading-relaxed text-zinc-400">
          Consulta los próximos encuentros y explora
          nuestro archivo de eventos anteriores.
        </p>

        {/* FILTROS */}
        <div className="mt-12 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setFiltro("proximo")}
            aria-pressed={filtro === "proximo"}
            className={`border px-6 py-3 text-sm font-bold uppercase transition ${
              filtro === "proximo"
                ? "border-gold bg-gold text-black"
                : "border-white/20 text-zinc-300 hover:border-gold hover:text-gold"
            }`}
          >
            Próximos eventos
          </button>

          <button
            type="button"
            onClick={() => setFiltro("pasado")}
            aria-pressed={filtro === "pasado"}
            className={`border px-6 py-3 text-sm font-bold uppercase transition ${
              filtro === "pasado"
                ? "border-gold bg-gold text-black"
                : "border-white/20 text-zinc-300 hover:border-gold hover:text-gold"
            }`}
          >
            Eventos anteriores
          </button>
        </div>

        {/* LISTADO */}
        {eventosFiltrados.length > 0 ? (
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {eventosFiltrados.map((evento) => (
              <article
                key={evento.id}
                className="flex flex-col overflow-hidden border border-white/10 bg-graphite transition hover:border-gold/60"
              >
                {/* CARTEL */}
                <div className="aspect-[3/4] overflow-hidden bg-zinc-800">
                  {evento.cartel ? (
                    <img
                      src={evento.cartel}
                      alt={`Cartel de ${evento.titulo}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                      <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
                        Money Way Empire
                      </p>

                      <h3 className="mt-6 text-3xl font-black uppercase">
                        {evento.titulo}
                      </h3>

                      <p className="mt-4 text-sm text-zinc-500">
                        Cartel pendiente
                      </p>
                    </div>
                  )}
                </div>

                {/* DATOS */}
                <div className="flex flex-1 flex-col p-8">
                  <p className="text-sm font-bold uppercase tracking-widest text-gold">
                    {formatearFecha(evento.fecha)}
                  </p>

                  <h3 className="mt-4 text-2xl font-black uppercase">
                    {evento.titulo}
                  </h3>

                  <p className="mt-5 font-bold text-zinc-200">
                    {evento.ciudad}
                    {evento.recinto
                      ? ` · ${evento.recinto}`
                      : ""}
                  </p>

                  {evento.organizador && (
                    <p className="mt-3 text-sm text-zinc-500">
                      Organiza: {evento.organizador}
                    </p>
                  )}

                  <p className="mt-6 flex-1 leading-relaxed text-zinc-400">
                    {evento.descripcion}
                  </p>

                  {evento.estado === "proximo" &&
                    evento.entradas && (
                      <a
                        href={evento.entradas}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 block bg-gold px-6 py-4 text-center font-bold text-black transition hover:bg-gold-light"
                      >
                        COMPRAR ENTRADAS ↗
                      </a>
                    )}

                  {evento.estado === "proximo" &&
                    !evento.entradas && (
                      <p className="mt-8 border border-white/15 px-6 py-4 text-center text-sm text-zinc-400">
                        Entradas no disponibles en la web
                      </p>
                    )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-12 border border-white/10 bg-graphite px-8 py-20 text-center">
            <p className="mb-5 text-sm font-bold uppercase tracking-widest text-gold">
              Money Way Empire Events
            </p>

            <h3 className="text-3xl font-black uppercase">
              {filtro === "proximo"
                ? "Próximamente"
                : "Archivo de eventos"}
            </h3>

            <p className="mx-auto mt-6 max-w-xl text-zinc-400">
              {filtro === "proximo"
                ? "Todavía no hemos publicado los próximos eventos. Vuelve pronto para descubrir nuevas fechas."
                : "Estamos preparando el archivo de conciertos, festivales y eventos anteriores."}
            </p>
          </div>
        )}
      </section>

      {/* ORGANIZACIÓN DE EVENTOS */}
      <section className="border-y border-white/10 bg-graphite px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gold">
            Producción de eventos
          </p>

          <h2 className="max-w-4xl text-4xl font-black uppercase md:text-5xl">
            De la idea
            <span className="block text-gold">
              al escenario.
            </span>
          </h2>

          <p className="mt-6 max-w-3xl leading-relaxed text-zinc-400">
            También desarrollamos propuestas de organización
            y producción de eventos. Combinamos creatividad,
            música, comunicación y coordinación para dar
            forma a experiencias en directo.
          </p>

          <Link
            href="/servicios/organizacion-de-eventos"
            className="mt-10 inline-block border border-gold px-8 py-4 font-bold text-gold transition hover:bg-gold hover:text-black"
          >
            VER SERVICIOS DE EVENTOS →
          </Link>
        </div>
      </section>

      {/* BOOKING */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gold">
              Música en directo
            </p>

            <h2 className="text-4xl font-black uppercase md:text-5xl">
              ¿Buscas artistas
              <span className="block text-gold">
                para tu evento?
              </span>
            </h2>

            <p className="mt-6 leading-relaxed text-zinc-400">
              Explora nuestra sección de booking y
              descubre propuestas musicales para
              conciertos, festivales y eventos.
            </p>

            <Link
              href="/musica/booking"
              className="mt-8 inline-block bg-gold px-8 py-4 font-bold text-black transition hover:bg-gold-light"
            >
              EXPLORAR BOOKING →
            </Link>
          </div>

          <div className="flex min-h-80 items-center justify-center border border-white/10 bg-graphite p-10 text-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-gold">
                Money Way Empire
              </p>

              <p className="mt-6 text-4xl font-black uppercase">
                Live
                <span className="block text-gold">
                  Experiences.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="border-t border-white/10 bg-graphite px-6 py-24">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-5 text-sm font-bold uppercase tracking-widest text-gold">
            Colaboraciones y propuestas
          </p>

          <h2 className="text-4xl font-black uppercase md:text-6xl">
            Hagamos que ocurra.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
            ¿Quieres organizar un evento, contratar
            artistas o colaborar con Money Way Empire?
            Cuéntanos tu propuesta.
          </p>

          <Link
            href="/contacto?asunto=eventos"
            className="mt-10 inline-block bg-gold px-8 py-4 font-bold text-black transition hover:bg-gold-light"
          >
            CONTACTAR
          </Link>
        </div>
      </section>
    </main>
  );
}

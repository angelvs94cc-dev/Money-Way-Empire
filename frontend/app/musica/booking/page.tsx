
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Booking de artistas | Money Way Empire",
  description:
    "Booking de artistas y DJs de Money Way Empire. Música urbana, rap, trap y actuaciones para conciertos, festivales y eventos.",
};

type Artista = {
  id: number;
  nombre: string;
  categoria: string;
  generos: string[];
  descripcion: string;
  imagen: string;
  instagram: string;
  spotify: string;
  youtube: string;
  destacado: boolean;
};

const artistas: Artista[] = [
  {
    id: 1,
    nombre: "Cream Mami",
    categoria: "Artista / Rapero",
    generos: ["Rap", "Trap", "Música urbana", "Jersey Club"],
    descripcion:
      "Artista de música urbana con una propuesta que combina rap, trap y sonidos contemporáneos. Un directo con personalidad, energía y una identidad artística propia.",
    imagen: "",
    instagram: "https://www.instagram.com/cremitamami/",
    spotify: "",
    youtube: "",
    destacado: true,
  },
];

// Más adelante añadiremos artistas desde el panel de administración.
// No es necesario modificar este archivo cada vez que
// queramos incorporar un artista nuevo.

export default function BookingPage() {
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
            Money Way Empire / Music
          </p>

          <h1 className="max-w-5xl text-5xl font-black uppercase leading-tight md:text-7xl">
            Artist
            <span className="block text-gold">Booking.</span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-400">
            Talento, música y espectáculo en directo.
            Descubre nuestras propuestas artísticas
            para conciertos, festivales, salas y eventos.
          </p>

          <Link
            href="/contacto?asunto=booking"
            className="mt-10 inline-block bg-gold px-8 py-4 font-bold text-black transition hover:bg-gold-light"
          >
            SOLICITAR CONTRATACIÓN
          </Link>
        </div>
      </section>

      {/* CATÁLOGO DE ARTISTAS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12">
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gold">
            Nuestro talento
          </p>

          <h2 className="text-4xl font-black uppercase md:text-5xl">
            Artistas
          </h2>

          <p className="mt-6 max-w-3xl text-zinc-400">
            Conoce a los artistas que forman parte
            de nuestra propuesta de booking.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {artistas.map((artista) => (
            <article
              key={artista.id}
              className="flex flex-col overflow-hidden border border-white/10 bg-graphite transition hover:border-gold/60"
            >
              {/* FOTOGRAFÍA */}
              <div className="flex aspect-[4/5] flex-col items-center justify-center bg-zinc-800 p-8 text-center">
                {artista.imagen ? (
                  <img
                    src={artista.imagen}
                    alt={artista.nombre}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
                      Money Way Empire
                    </p>

                    <h3 className="mt-6 text-4xl font-black uppercase">
                      {artista.nombre}
                    </h3>

                    <p className="mt-4 text-sm text-zinc-500">
                      Fotografía del artista próximamente
                    </p>
                  </>
                )}
              </div>

              {/* INFORMACIÓN */}
              <div className="flex flex-1 flex-col p-8">
                {artista.destacado && (
                  <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gold">
                    Artista destacado
                  </p>
                )}

                <h3 className="text-3xl font-black uppercase">
                  {artista.nombre}
                </h3>

                <p className="mt-3 text-sm font-bold uppercase tracking-widest text-zinc-400">
                  {artista.categoria}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {artista.generos.map((genero) => (
                    <span
                      key={genero}
                      className="border border-white/15 px-3 py-2 text-xs text-zinc-300"
                    >
                      {genero}
                    </span>
                  ))}
                </div>

                <p className="mt-6 flex-1 leading-relaxed text-zinc-400">
                  {artista.descripcion}
                </p>

                {/* REDES SOCIALES */}
                <div className="mt-8 flex flex-wrap gap-5 text-sm font-bold">
                  {artista.instagram && (
                    <a
                      href={artista.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold transition hover:text-gold-light"
                    >
                      INSTAGRAM ↗
                    </a>
                  )}

                  {artista.spotify && (
                    <a
                      href={artista.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold transition hover:text-gold-light"
                    >
                      SPOTIFY ↗
                    </a>
                  )}

                  {artista.youtube && (
                    <a
                      href={artista.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold transition hover:text-gold-light"
                    >
                      YOUTUBE ↗
                    </a>
                  )}
                </div>

                {/* CONTRATACIÓN */}
                <Link
                  href={`/contacto?asunto=booking&artista=${encodeURIComponent(
                    artista.nombre
                  )}`}
                  className="mt-8 block bg-gold px-6 py-4 text-center font-bold text-black transition hover:bg-gold-light"
                >
                  CONTRATAR ARTISTA →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* TIPOS DE EVENTOS */}
      <section className="border-y border-white/10 bg-graphite px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gold">
            Actuaciones en directo
          </p>

          <h2 className="text-4xl font-black uppercase md:text-5xl">
            ¿Qué estás organizando?
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <article className="border border-white/10 bg-background p-8">
              <span className="text-sm font-bold text-gold">01</span>

              <h3 className="mt-6 text-2xl font-black uppercase">
                Festivales
              </h3>

              <p className="mt-5 leading-relaxed text-zinc-400">
                Propuestas musicales para festivales
                y encuentros culturales de diferentes formatos.
              </p>
            </article>

            <article className="border border-white/10 bg-background p-8">
              <span className="text-sm font-bold text-gold">02</span>

              <h3 className="mt-6 text-2xl font-black uppercase">
                Conciertos y salas
              </h3>

              <p className="mt-5 leading-relaxed text-zinc-400">
                Actuaciones para salas de conciertos,
                ciclos musicales y programación en directo.
              </p>
            </article>

            <article className="border border-white/10 bg-background p-8">
              <span className="text-sm font-bold text-gold">03</span>

              <h3 className="mt-6 text-2xl font-black uppercase">
                Eventos
              </h3>

              <p className="mt-5 leading-relaxed text-zinc-400">
                Música en directo y propuestas artísticas
                para eventos culturales, privados y de marca.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* PROCESO DE BOOKING */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gold">
          Contrataciones
        </p>

        <h2 className="text-4xl font-black uppercase md:text-5xl">
          Cómo solicitar un artista
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-4xl font-black text-gold">01.</p>

            <h3 className="mt-5 text-xl font-bold uppercase">
              Elige el artista
            </h3>

            <p className="mt-4 text-zinc-400">
              Explora las propuestas musicales
              y selecciona el artista que encaja con tu evento.
            </p>
          </div>

          <div>
            <p className="text-4xl font-black text-gold">02.</p>

            <h3 className="mt-5 text-xl font-bold uppercase">
              Envíanos tu propuesta
            </h3>

            <p className="mt-4 text-zinc-400">
              Indícanos la fecha, ubicación, tipo de evento
              y los detalles de la actuación.
            </p>
          </div>

          <div>
            <p className="text-4xl font-black text-gold">03.</p>

            <h3 className="mt-5 text-xl font-bold uppercase">
              Confirmamos disponibilidad
            </h3>

            <p className="mt-4 text-zinc-400">
              Revisaremos la propuesta y contactaremos
              contigo para estudiar las condiciones.
            </p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="border-t border-white/10 bg-graphite px-6 py-24">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-5 text-sm font-bold uppercase tracking-widest text-gold">
            Money Way Empire Booking
          </p>

          <h2 className="text-4xl font-black uppercase md:text-6xl">
            Lleva la música
            <span className="block text-gold">
              a tu escenario.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
            ¿Estás preparando un concierto, festival o evento?
            Envíanos tu propuesta y estudiaremos
            la disponibilidad del artista.
          </p>

          <Link
            href="/contacto?asunto=booking"
            className="mt-10 inline-block bg-gold px-8 py-4 font-bold text-black transition hover:bg-gold-light"
          >
            SOLICITAR BOOKING
          </Link>
        </div>
      </section>
    </main>
  );
}

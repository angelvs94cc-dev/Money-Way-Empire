
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Música",
  description:
    "Descubre el universo musical de Money Way Empire. Artistas, booking, lanzamientos, conciertos y cultura urbana.",
};

const secciones = [
  {
    numero: "01",
    titulo: "Booking",
    subtitulo: "Artistas y actuaciones en directo",
    descripcion:
      "Conectamos artistas y DJs con conciertos, festivales, salas, promotores y eventos. Descubre las propuestas artísticas y consulta disponibilidad para contrataciones.",
    enlace: "/musica/booking",
    boton: "EXPLORAR BOOKING",
  },
  {
    numero: "02",
    titulo: "Lanzamientos",
    subtitulo: "Nuestra música",
    descripcion:
      "Explora los singles, EPs, álbumes y videoclips que forman parte del universo musical de Money Way Empire. Descubre nuevos sonidos y accede a las plataformas de escucha.",
    enlace: "/musica/lanzamientos",
    boton: "DESCUBRIR LANZAMIENTOS",
  },
];

const valores = [
  {
    numero: "01",
    titulo: "Identidad artística",
    descripcion:
      "Apostamos por propuestas musicales con personalidad, autenticidad y una visión creativa propia.",
  },
  {
    numero: "02",
    titulo: "Cultura urbana",
    descripcion:
      "Nuestras raíces están en el rap y la música urbana, sin renunciar a explorar nuevos géneros y sonidos.",
  },
  {
    numero: "03",
    titulo: "Creatividad sin límites",
    descripcion:
      "Conectamos música, producción audiovisual, diseño y comunicación para desarrollar proyectos artísticos completos.",
  },
];

export default function MusicaPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* CABECERA */}
      <section className="border-b border-white/10 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.3em] text-gold">
            Money Way Empire / Music
          </p>

          <h1 className="max-w-5xl text-5xl font-black uppercase leading-tight md:text-7xl">
            La música es
            <span className="block text-gold">
              nuestro origen.
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-400">
            Money Way Empire nace de la música y la cultura urbana.
            Un espacio para desarrollar propuestas artísticas,
            conectar talento con escenarios y dar visibilidad
            a nuevos lanzamientos.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/musica/booking"
              className="bg-gold px-8 py-4 font-bold text-black transition hover:bg-gold-light"
            >
              BOOKING
            </Link>

            <Link
              href="/musica/lanzamientos"
              className="border border-white/20 px-8 py-4 font-bold transition hover:border-gold hover:text-gold"
            >
              LANZAMIENTOS
            </Link>
          </div>
        </div>
      </section>

      {/* SECCIONES PRINCIPALES */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gold">
          Explora nuestro universo
        </p>

        <h2 className="mb-12 text-4xl font-black uppercase md:text-5xl">
          Música y talento
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {secciones.map((seccion) => (
            <article
              key={seccion.numero}
              className="group flex flex-col justify-between border border-white/10 bg-graphite p-8 transition hover:border-gold/60 md:p-12"
            >
              <div>
                <span className="text-sm font-bold tracking-widest text-gold">
                  {seccion.numero}
                </span>

                <h3 className="mt-8 text-4xl font-black uppercase md:text-5xl">
                  {seccion.titulo}
                </h3>

                <p className="mt-4 text-sm font-bold uppercase tracking-widest text-gold">
                  {seccion.subtitulo}
                </p>

                <p className="mt-8 max-w-lg leading-relaxed text-zinc-400">
                  {seccion.descripcion}
                </p>
              </div>

              <Link
                href={seccion.enlace}
                className="mt-12 inline-flex w-fit items-center gap-3 font-bold text-gold transition group-hover:gap-5"
              >
                {seccion.boton}
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* FILOSOFÍA MUSICAL */}
      <section className="border-y border-white/10 bg-graphite px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gold">
            Nuestra filosofía
          </p>

          <h2 className="text-4xl font-black uppercase md:text-5xl">
            Mucho más que música
          </h2>

          <p className="mt-6 max-w-3xl leading-relaxed text-zinc-400">
            Entendemos la música como una expresión cultural que
            conecta personas, ideas y disciplinas creativas.
            Por eso combinamos nuestra visión musical con
            herramientas audiovisuales, gráficas y digitales.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {valores.map((valor) => (
              <article
                key={valor.numero}
                className="border border-white/10 bg-background p-8"
              >
                <span className="text-sm font-bold text-gold">
                  {valor.numero}
                </span>

                <h3 className="mt-6 text-2xl font-black uppercase">
                  {valor.titulo}
                </h3>

                <p className="mt-5 leading-relaxed text-zinc-400">
                  {valor.descripcion}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONEXIÓN CON SERVICIOS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gold">
              Desarrollo artístico
            </p>

            <h2 className="text-4xl font-black uppercase md:text-5xl">
              Tu música merece
              <span className="block text-gold">
                una identidad propia.
              </span>
            </h2>

            <p className="mt-6 leading-relaxed text-zinc-400">
              Además de nuestros proyectos musicales,
              ofrecemos producción musical, videoclips,
              diseño gráfico y marketing digital para
              acompañar a artistas en sus proyectos.
            </p>

            <Link
              href="/servicios"
              className="mt-8 inline-flex items-center gap-3 font-bold text-gold transition hover:text-gold-light"
            >
              DESCUBRIR SERVICIOS →
            </Link>
          </div>

          <div className="flex min-h-80 flex-col items-center justify-center border border-white/10 bg-graphite p-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-gold">
              Money Way Empire
            </p>

            <p className="mt-6 text-4xl font-black uppercase md:text-5xl">
              Music.
              <span className="block text-gold">
                Culture.
              </span>
              Empire.
            </p>

            <p className="mt-6 text-sm text-zinc-500">
              Espacio visual provisional
            </p>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="border-t border-white/10 bg-graphite px-6 py-24">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-5 text-sm font-bold uppercase tracking-widest text-gold">
            Conecta con nosotros
          </p>

          <h2 className="text-4xl font-black uppercase md:text-6xl">
            Hagamos que suene.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
            ¿Quieres contratar una actuación, colaborar
            con nosotros o desarrollar un proyecto musical?
            Cuéntanos tu propuesta.
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

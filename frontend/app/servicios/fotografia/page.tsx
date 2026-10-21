
import Link from "next/link";

export const metadata = {
  title: "Fotografía | Money Way Empire",
  description:
    "Servicios de fotografía para artistas, proyectos musicales, marcas y producciones audiovisuales.",
};

const servicios = [
  {
    titulo: "Retratos de artistas",
    descripcion:
      "Sesiones fotográficas para músicos, DJs y artistas que buscan una imagen profesional para sus lanzamientos, redes sociales y material promocional.",
  },
  {
    titulo: "Fotografía promocional",
    descripcion:
      "Imágenes para campañas, portadas, carteles, publicaciones y contenido digital relacionado con proyectos musicales.",
  },
  {
    titulo: "Moda y lifestyle",
    descripcion:
      "Fotografía de moda urbana, estilismos y propuestas visuales que conectan la identidad del artista con su estética.",
  },
  {
    titulo: "Fotografía de rodaje",
    descripcion:
      "Fotografías durante la producción de videoclips y otros proyectos audiovisuales, para documentar el rodaje y crear contenido adicional.",
  },
];

export default function FotografiaPage() {
  return (
    <main className="min-h-screen bg-background text-white">
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-gold">
          Servicios
        </p>

        <h1 className="mb-6 text-4xl font-black tracking-tight md:text-6xl">
          Fotografía
        </h1>

        <p className="max-w-3xl text-lg leading-relaxed text-white/70">
          Creamos imágenes que transmiten personalidad,
          identidad y estilo. Trabajamos con artistas,
          proyectos musicales y marcas vinculadas a la
          cultura y la creatividad.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <h2 className="mb-8 text-2xl font-bold md:text-3xl">
          Qué ofrecemos
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {servicios.map((servicio) => (
            <article
              key={servicio.titulo}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-8"
            >
              <h3 className="mb-3 text-xl font-bold text-gold">
                {servicio.titulo}
              </h3>

              <p className="leading-relaxed text-white/65">
                {servicio.descripcion}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-2xl border border-white/10 bg-graphite p-8 md:p-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            Descubre nuestros trabajos
          </h2>

          <p className="mb-8 max-w-2xl text-white/65">
            Explora las sesiones de retrato, fotografía
            de moda y proyectos visuales que forman
            parte de nuestro portfolio.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/proyectos?categoria=fotografia"
              className="rounded-lg bg-gold px-6 py-3 font-bold text-black transition hover:opacity-85"
            >
              Ver proyectos de fotografía
            </Link>

            <Link
              href="/contacto?servicio=fotografia"
              className="rounded-lg border border-white/20 px-6 py-3 font-semibold transition hover:border-gold hover:text-gold"
            >
              Solicitar presupuesto
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

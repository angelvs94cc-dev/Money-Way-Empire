
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Producción audiovisual",
  description:
    "Producción de videoclips, publicidad, fotografía, contenido para redes sociales y proyectos audiovisuales con Money Way Empire.",
};

const servicios = [
  {
    numero: "01",
    titulo: "Videoclips musicales",
    descripcion:
      "Desarrollamos piezas audiovisuales que refuerzan la identidad de cada artista, desde el concepto creativo hasta la edición final.",
  },
  {
    numero: "02",
    titulo: "Publicidad y branded content",
    descripcion:
      "Creamos campañas y contenidos audiovisuales para marcas, productos y proyectos que buscan conectar con su público.",
  },
  {
    numero: "03",
    titulo: "Fotografía",
    descripcion:
      "Realizamos sesiones fotográficas para artistas, marcas de ropa, productos, eventos y campañas promocionales.",
  },
  {
    numero: "04",
    titulo: "Contenido para redes sociales",
    descripcion:
      "Producimos vídeos verticales, reels, piezas promocionales y contenido adaptado a las diferentes plataformas digitales.",
  },
  {
    numero: "05",
    titulo: "Cobertura de eventos",
    descripcion:
      "Documentamos conciertos, festivales, presentaciones y eventos mediante fotografía y vídeo.",
  },
  {
    numero: "06",
    titulo: "Edición y postproducción",
    descripcion:
      "Trabajamos el montaje, la corrección de color, los efectos visuales y el acabado final de cada producción.",
  },
];

const proceso = [
  {
    numero: "01",
    titulo: "Idea",
    descripcion:
      "Escuchamos tu propuesta y desarrollamos el concepto audiovisual.",
  },
  {
    numero: "02",
    titulo: "Preproducción",
    descripcion:
      "Planificamos localizaciones, equipo, recursos y necesidades del rodaje.",
  },
  {
    numero: "03",
    titulo: "Producción",
    descripcion:
      "Realizamos la grabación o sesión fotográfica según el proyecto.",
  },
  {
    numero: "04",
    titulo: "Postproducción",
    descripcion:
      "Editamos y preparamos el contenido para su entrega y publicación.",
  },
];

export default function AudiovisualPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* CABECERA */}
      <section className="border-b border-white/10 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/servicios"
            className="text-sm text-zinc-400 transition hover:text-gold"
          >
            ← Volver a servicios
          </Link>

          <p className="mb-5 mt-12 text-sm font-bold uppercase tracking-[0.3em] text-gold">
            Money Way Empire / Audiovisual
          </p>

          <h1 className="max-w-5xl text-5xl font-black uppercase leading-tight md:text-7xl">
            Contamos historias.
            <span className="block text-gold">
              Creamos imágenes.
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-400">
            Transformamos conceptos en imágenes con personalidad.
            Desde videoclips y campañas publicitarias hasta
            fotografía, contenido digital y producciones para
            artistas, marcas y eventos.
          </p>

          <Link
            href="/contacto?servicio=audiovisual"
            className="mt-10 inline-block bg-gold px-8 py-4 font-bold text-black transition hover:bg-gold-light"
          >
            CUÉNTANOS TU PROYECTO
          </Link>
        </div>
      </section>

      {/* SERVICIOS AUDIOVISUALES */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gold">
          Qué hacemos
        </p>

        <h2 className="mb-12 text-4xl font-black uppercase md:text-5xl">
          Servicios audiovisuales
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servicios.map((servicio) => (
            <article
              key={servicio.numero}
              className="border border-white/10 bg-graphite p-8 transition hover:border-gold/60"
            >
              <span className="text-sm font-bold text-gold">
                {servicio.numero}
              </span>

              <h3 className="mt-6 text-2xl font-black uppercase">
                {servicio.titulo}
              </h3>

              <p className="mt-5 leading-relaxed text-zinc-400">
                {servicio.descripcion}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ESPECIALIZACIÓN */}
      <section className="border-y border-white/10 bg-graphite px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gold">
            Nuestra visión
          </p>

          <h2 className="text-4xl font-black uppercase md:text-5xl">
            Creatividad con identidad
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="border border-white/10 bg-background p-8">
              <h3 className="text-2xl font-bold text-gold">
                Música
              </h3>
              <p className="mt-4 text-zinc-400">
                Videoclips, visualizers, sesiones en directo
                y contenidos promocionales para artistas.
              </p>
            </div>

            <div className="border border-white/10 bg-background p-8">
              <h3 className="text-2xl font-bold text-gold">
                Moda y marcas
              </h3>
              <p className="mt-4 text-zinc-400">
                Campañas, fotografía editorial, lanzamientos
                de colecciones y contenidos de producto.
              </p>
            </div>

            <div className="border border-white/10 bg-background p-8">
              <h3 className="text-2xl font-bold text-gold">
                Cultura y eventos
              </h3>
              <p className="mt-4 text-zinc-400">
                Cobertura de conciertos, festivales,
                eventos culturales y experiencias en directo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gold">
          Cómo trabajamos
        </p>

        <h2 className="text-4xl font-black uppercase md:text-5xl">
          Del concepto a la pantalla
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {proceso.map((paso) => (
            <div key={paso.numero}>
              <span className="text-4xl font-black text-gold">
                {paso.numero}
              </span>

              <h3 className="mt-5 text-xl font-bold">
                {paso.titulo}
              </h3>

              <p className="mt-3 leading-relaxed text-zinc-400">
                {paso.descripcion}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACTO */}
      <section className="bg-graphite px-6 py-24">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-5 text-sm font-bold uppercase tracking-widest text-gold">
            Trabajemos juntos
          </p>

          <h2 className="text-4xl font-black uppercase md:text-6xl">
            Hagamos realidad tu idea.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
            ¿Necesitas un videoclip, una campaña audiovisual,
            una sesión fotográfica o contenido para tu marca?
            Cuéntanos qué tienes en mente.
          </p>

          <Link
            href="/contacto?servicio=audiovisual"
            className="mt-10 inline-block bg-gold px-8 py-4 font-bold text-black transition hover:bg-gold-light"
          >
            SOLICITAR PRESUPUESTO
          </Link>
        </div>
      </section>
    </main>
  );
}


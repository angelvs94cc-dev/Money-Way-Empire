
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Producción musical",
  description:
    "Producción musical en Money Way Empire. Grabación de voces, instrumentales, composición, mezcla y mastering para artistas y proyectos musicales.",
};

const serviciosMusicales = [
  {
    numero: "01",
    titulo: "Grabación de voces",
    descripcion:
      "Capturamos tu sonido con atención al detalle. Sesiones de grabación para singles, EPs, álbumes y otros proyectos musicales.",
  },
  {
    numero: "02",
    titulo: "Producción de instrumentales",
    descripcion:
      "Creamos beats e instrumentales originales adaptados a tu identidad artística, desde rap y trap hasta reggaetón, electrónica y otros géneros.",
  },
  {
    numero: "03",
    titulo: "Composición musical",
    descripcion:
      "Desarrollamos ideas musicales, melodías, estructuras y arreglos para dar forma a canciones con personalidad propia.",
  },
  {
    numero: "04",
    titulo: "Mezcla",
    descripcion:
      "Trabajamos el equilibrio, la claridad y el carácter de cada elemento de tu canción para conseguir un sonido cohesionado.",
  },
  {
    numero: "05",
    titulo: "Mastering",
    descripcion:
      "Preparamos el sonido final de tus canciones para su publicación, cuidando la consistencia y la calidad de escucha.",
  },
];

export default function ProduccionMusicalPage() {
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
            Money Way Empire / Music Studio
          </p>

          <h1 className="max-w-5xl text-5xl font-black uppercase leading-tight md:text-7xl">
            Tu sonido.
            <span className="block text-gold">
              Nuestra pasión.
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-400">
            Acompañamos a artistas y proyectos musicales durante
            el proceso creativo. Desde la primera idea hasta
            el resultado final, trabajamos para desarrollar
            un sonido que represente tu identidad.
          </p>

          <Link
            href="/contacto?servicio=produccion-musical"
            className="mt-10 inline-block bg-gold px-8 py-4 font-bold text-black transition hover:bg-gold-light"
          >
            SOLICITAR INFORMACIÓN
          </Link>
        </div>
      </section>

      {/* SERVICIOS MUSICALES */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12">
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gold">
            Qué hacemos
          </p>

          <h2 className="text-4xl font-black uppercase md:text-5xl">
            Servicios de producción
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {serviciosMusicales.map((servicio) => (
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

      {/* PROCESO DE TRABAJO */}
      <section className="bg-graphite px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gold">
            Nuestro proceso
          </p>

          <h2 className="text-4xl font-black uppercase md:text-5xl">
            De la idea al sonido final
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div>
              <span className="text-3xl font-black text-gold">
                01
              </span>
              <h3 className="mt-4 text-xl font-bold">
                Escuchamos tu idea
              </h3>
              <p className="mt-3 text-zinc-400">
                Conocemos tus referencias, objetivos y estilo musical.
              </p>
            </div>

            <div>
              <span className="text-3xl font-black text-gold">
                02
              </span>
              <h3 className="mt-4 text-xl font-bold">
                Creamos juntos
              </h3>
              <p className="mt-3 text-zinc-400">
                Desarrollamos la producción y trabajamos los detalles
                que definen tu sonido.
              </p>
            </div>

            <div>
              <span className="text-3xl font-black text-gold">
                03
              </span>
              <h3 className="mt-4 text-xl font-bold">
                Preparamos el lanzamiento
              </h3>
              <p className="mt-3 text-zinc-400">
                Finalizamos los archivos musicales para que puedas
                publicar tu proyecto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-5 text-sm font-bold uppercase tracking-widest text-gold">
            Trabajemos juntos
          </p>

          <h2 className="text-4xl font-black uppercase md:text-6xl">
            Hagamos música.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
            ¿Tienes una canción, un EP o un álbum en mente?
            Cuéntanos tu proyecto y hablamos de cómo darle forma.
          </p>

          <Link
            href="/contacto?servicio=produccion-musical"
            className="mt-10 inline-block bg-gold px-8 py-4 font-bold text-black transition hover:bg-gold-light"
          >
            CUÉNTANOS TU PROYECTO
          </Link>
        </div>
      </section>
    </main>
  );
}


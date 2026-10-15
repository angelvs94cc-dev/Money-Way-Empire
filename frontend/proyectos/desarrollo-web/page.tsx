
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Proyectos de desarrollo web",
  description:
    "Portfolio de desarrollo web de Money Way Empire: páginas corporativas, tiendas online, portfolios artísticos y aplicaciones digitales.",
};

const proyectos = [
  {
    id: 1,
    titulo: "Página web corporativa 01",
    tipo: "Diseño y desarrollo web",
    descripcion:
      "Diseño y desarrollo de una página web corporativa adaptada a la identidad, los objetivos y las necesidades de una marca.",
  },
  {
    id: 2,
    titulo: "Tienda online 01",
    tipo: "Comercio electrónico",
    descripcion:
      "Desarrollo de una tienda online con catálogo de productos, navegación por categorías y experiencia de compra.",
  },
  {
    id: 3,
    titulo: "Portfolio artístico 01",
    tipo: "Web para artistas",
    descripcion:
      "Creación de un espacio digital para presentar trabajos, contenidos multimedia y servicios profesionales.",
  },
  {
    id: 4,
    titulo: "Aplicación web 01",
    tipo: "Aplicación digital",
    descripcion:
      "Desarrollo de una aplicación web con funcionalidades interactivas y una interfaz adaptada a diferentes dispositivos.",
  },
];

export default function ProyectosDesarrolloWebPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* CABECERA */}
      <section className="border-b border-white/10 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/proyectos"
            className="text-sm text-zinc-400 transition hover:text-gold"
          >
            ← Volver a todos los proyectos
          </Link>

          <p className="mb-5 mt-12 text-sm font-bold uppercase tracking-[0.3em] text-gold">
            Money Way Empire / Portfolio
          </p>

          <h1 className="max-w-5xl text-5xl font-black uppercase leading-tight md:text-7xl">
            Proyectos de
            <span className="block text-gold">
              desarrollo web.
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-400">
            Diseñamos y desarrollamos experiencias digitales
            que combinan creatividad, tecnología y funcionalidad.
            Explora nuestros proyectos de páginas web,
            tiendas online y aplicaciones.
          </p>
        </div>
      </section>

      {/* PROYECTOS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gold">
              Nuestro trabajo
            </p>

            <h2 className="text-4xl font-black uppercase md:text-5xl">
              Selección de proyectos web
            </h2>
          </div>

          <Link
            href="/proyectos"
            className="font-bold text-gold transition hover:text-gold-light"
          >
            VER TODOS LOS PROYECTOS →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {proyectos.map((proyecto) => (
            <article
              key={proyecto.id}
              className="group overflow-hidden border border-white/10 bg-graphite transition hover:border-gold/60"
            >
              {/* IMAGEN PROVISIONAL */}
              <div className="flex aspect-video flex-col items-center justify-center bg-zinc-800 px-6 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
                  Money Way Empire
                </p>

                <p className="mt-4 text-2xl font-black uppercase text-zinc-500">
                  {proyecto.tipo}
                </p>

                <p className="mt-3 text-xs text-zinc-600">
                  Captura del proyecto próximamente
                </p>
              </div>

              {/* INFORMACIÓN */}
              <div className="p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-gold">
                  {proyecto.tipo}
                </p>

                <h3 className="mt-4 text-2xl font-black uppercase">
                  {proyecto.titulo}
                </h3>

                <p className="mt-5 leading-relaxed text-zinc-400">
                  {proyecto.descripcion}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* TIPOS DE PROYECTOS */}
      <section className="border-y border-white/10 bg-graphite px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gold">
            Qué desarrollamos
          </p>

          <h2 className="text-4xl font-black uppercase md:text-5xl">
            Soluciones digitales
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="border border-white/10 bg-background p-8">
              <h3 className="text-2xl font-bold text-gold">
                Páginas web
              </h3>

              <p className="mt-4 text-zinc-400">
                Webs corporativas, páginas promocionales
                y portfolios para marcas, artistas y proyectos.
              </p>
            </div>

            <div className="border border-white/10 bg-background p-8">
              <h3 className="text-2xl font-bold text-gold">
                Tiendas online
              </h3>

              <p className="mt-4 text-zinc-400">
                Plataformas de comercio electrónico
                con catálogos, productos y procesos de compra.
              </p>
            </div>

            <div className="border border-white/10 bg-background p-8">
              <h3 className="text-2xl font-bold text-gold">
                Aplicaciones web
              </h3>

              <p className="mt-4 text-zinc-400">
                Soluciones digitales interactivas
                adaptadas a las necesidades de cada proyecto.
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
            ¿Tienes un proyecto digital?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
            ¿Necesitas una página web, una tienda online
            o una aplicación personalizada?
            Cuéntanos tu idea y estudiamos cómo desarrollarla.
          </p>

          <Link
            href="/contacto"
            className="mt-10 inline-block bg-gold px-8 py-4 font-bold text-black transition hover:bg-gold-light"
          >
            SOLICITAR PRESUPUESTO
          </Link>
        </div>
      </section>
    </main>
  );
}

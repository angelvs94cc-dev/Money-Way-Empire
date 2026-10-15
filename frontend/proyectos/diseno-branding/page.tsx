
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Proyectos de diseño y branding",
  description:
    "Portfolio de diseño gráfico y branding de Money Way Empire: identidades visuales, portadas musicales, cartelería, moda y merchandising.",
};

const proyectos = [
  {
    id: 1,
    titulo: "Identidad visual 01",
    tipo: "Branding",
    descripcion:
      "Desarrollo de una identidad visual para una marca, incluyendo logotipo, colores y aplicaciones gráficas.",
  },
  {
    id: 2,
    titulo: "Portada musical 01",
    tipo: "Diseño musical",
    descripcion:
      "Diseño de una portada para un lanzamiento musical, adaptada al concepto artístico y a las plataformas digitales.",
  },
  {
    id: 3,
    titulo: "Cartelería 01",
    tipo: "Diseño publicitario",
    descripcion:
      "Creación de materiales gráficos para la promoción de conciertos, festivales y eventos culturales.",
  },
  {
    id: 4,
    titulo: "Colección streetwear 01",
    tipo: "Moda y merchandising",
    descripcion:
      "Diseño de gráficos para prendas de ropa y productos de merchandising.",
  },
];

export default function ProyectosDisenoBrandingPage() {
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
            Diseño
            <span className="block text-gold">
              y branding.
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-400">
            El diseño es una forma de comunicar quién eres.
            Descubre nuestros proyectos de identidad visual,
            diseño gráfico, portadas musicales, cartelería
            y creatividad aplicada a la moda y las marcas.
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
              Selección de diseño
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
                  Imagen del proyecto próximamente
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

      {/* CONTACTO */}
      <section className="border-t border-white/10 bg-graphite px-6 py-24">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-5 text-sm font-bold uppercase tracking-widest text-gold">
            Tu proyecto puede ser el siguiente
          </p>

          <h2 className="text-4xl font-black uppercase md:text-6xl">
            Diseñemos algo juntos.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
            ¿Necesitas una identidad visual, una portada musical,
            un cartel o diseños para tu marca?
            Cuéntanos qué tienes en mente.
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

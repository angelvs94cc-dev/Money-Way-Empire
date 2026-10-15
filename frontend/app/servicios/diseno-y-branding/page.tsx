
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Diseño y branding",
  description:
    "Diseño gráfico, identidad visual, branding, portadas musicales, diseño para moda y materiales publicitarios en Money Way Empire.",
};

const servicios = [
  {
    numero: "01",
    titulo: "Identidad visual y branding",
    descripcion:
      "Desarrollamos identidades visuales para artistas, marcas y proyectos. Definimos una imagen coherente, reconocible y con personalidad.",
  },
  {
    numero: "02",
    titulo: "Diseño gráfico",
    descripcion:
      "Creamos carteles, piezas promocionales, composiciones gráficas y materiales visuales para soportes físicos y digitales.",
  },
  {
    numero: "03",
    titulo: "Portadas musicales",
    descripcion:
      "Diseñamos portadas de singles, EPs y álbumes que representan el universo creativo de cada artista y lanzamiento.",
  },
  {
    numero: "04",
    titulo: "Diseño para moda y merchandising",
    descripcion:
      "Desarrollamos gráficos para camisetas, sudaderas, colecciones de ropa y productos de merchandising.",
  },
  {
    numero: "05",
    titulo: "Diseño publicitario",
    descripcion:
      "Diseñamos creatividades para campañas, anuncios, redes sociales y acciones de comunicación.",
  },
  {
    numero: "06",
    titulo: "Diseño editorial",
    descripcion:
      "Maquetamos dosieres, catálogos, presentaciones, press kits y otros materiales de comunicación profesional.",
  },
];

const proceso = [
  {
    numero: "01",
    titulo: "Briefing",
    descripcion:
      "Conocemos tu proyecto, sus objetivos, su público y las referencias visuales.",
  },
  {
    numero: "02",
    titulo: "Concepto creativo",
    descripcion:
      "Definimos una dirección artística y exploramos las soluciones visuales.",
  },
  {
    numero: "03",
    titulo: "Diseño",
    descripcion:
      "Desarrollamos las propuestas gráficas y ajustamos los detalles.",
  },
  {
    numero: "04",
    titulo: "Entrega",
    descripcion:
      "Preparamos los archivos finales para los formatos y usos acordados.",
  },
];

export default function DisenoBrandingPage() {
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
            Money Way Empire / Diseño y branding
          </p>

          <h1 className="max-w-5xl text-5xl font-black uppercase leading-tight md:text-7xl">
            Diseñamos ideas.
            <span className="block text-gold">
              Construimos identidad.
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-400">
            El diseño es mucho más que estética. Creamos
            identidades visuales y piezas gráficas que transmiten
            personalidad, refuerzan mensajes y conectan
            artistas, marcas y proyectos con su público.
          </p>

          <Link
            href="/contacto"
            className="mt-10 inline-block bg-gold px-8 py-4 font-bold text-black transition hover:bg-gold-light"
          >
            CUÉNTANOS TU IDEA
          </Link>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gold">
          Qué hacemos
        </p>

        <h2 className="mb-12 text-4xl font-black uppercase md:text-5xl">
          Servicios de diseño
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

      {/* ÁMBITOS DE TRABAJO */}
      <section className="border-y border-white/10 bg-graphite px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gold">
            Nuestra especialidad
          </p>

          <h2 className="text-4xl font-black uppercase md:text-5xl">
            Diseño con personalidad
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="border border-white/10 bg-background p-8">
              <h3 className="text-2xl font-bold text-gold">
                Artistas y música
              </h3>
              <p className="mt-4 text-zinc-400">
                Portadas, identidad artística, cartelería,
                merchandising y materiales promocionales.
              </p>
            </div>

            <div className="border border-white/10 bg-background p-8">
              <h3 className="text-2xl font-bold text-gold">
                Moda y streetwear
              </h3>
              <p className="mt-4 text-zinc-400">
                Identidad de marca, gráficos para prendas,
                campañas y diseño de colecciones.
              </p>
            </div>

            <div className="border border-white/10 bg-background p-8">
              <h3 className="text-2xl font-bold text-gold">
                Eventos y marcas
              </h3>
              <p className="mt-4 text-zinc-400">
                Identidad visual de eventos, carteles,
                materiales publicitarios y comunicación gráfica.
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
          De la idea al diseño
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
            Dale identidad a tu proyecto.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
            ¿Necesitas una identidad visual, una portada,
            diseños para tu marca o materiales publicitarios?
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

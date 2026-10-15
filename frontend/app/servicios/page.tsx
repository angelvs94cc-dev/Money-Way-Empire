
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Descubre los servicios de Money Way Empire: producción musical, audiovisual, diseño y branding, marketing digital y desarrollo web.",
};

const servicios = [
  {
    numero: "01",
    titulo: "Producción musical",
    descripcion:
      "Damos forma a tu sonido. Grabación, producción de instrumentales, composición, mezcla y mastering para artistas y proyectos musicales.",
    enlace: "/servicios/produccion-musical",
  },
  {
    numero: "02",
    titulo: "Audiovisual",
    descripcion:
      "Creamos contenido audiovisual con identidad propia: videoclips, vídeos corporativos, publicidad, fotografía y contenido para redes sociales.",
    enlace: "/servicios/audiovisual",
  },
  {
    numero: "03",
    titulo: "Diseño y branding",
    descripcion:
      "Construimos identidades visuales que destacan. Diseño gráfico, logotipos, imagen corporativa, portadas y materiales publicitarios.",
    enlace: "/servicios/diseno-branding",
  },
  {
    numero: "04",
    titulo: "Marketing digital",
    descripcion:
      "Impulsamos artistas, marcas y negocios mediante estrategias digitales, campañas publicitarias, redes sociales y posicionamiento online.",
    enlace: "/servicios/marketing-digital",
  },
  {
    numero: "05",
    titulo: "Desarrollo web",
    descripcion:
      "Diseñamos y desarrollamos páginas web, tiendas online y experiencias digitales adaptadas a las necesidades de cada proyecto.",
    enlace: "/servicios/desarrollo-web",
  },
  {
  numero: "06",
  titulo: "Organización y producción de eventos",
  descripcion:
    "Convertimos ideas en experiencias. Planificamos, organizamos y producimos conciertos, festivales, presentaciones de marcas, lanzamientos y eventos culturales. Coordinamos los recursos artísticos, técnicos y logísticos para hacer realidad cada proyecto.",
  enlace: "/servicios/organizacion-de-eventos",
},
];

export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-24">
        <p className="mb-5 text-sm font-bold uppercase tracking-[0.3em] text-gold">
          Money Way Empire / Creative Studio
        </p>

        <h1 className="max-w-5xl text-5xl font-black uppercase leading-tight md:text-7xl">
          Ideas que se convierten
          <span className="block text-gold">en realidad.</span>
        </h1>

        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-400">
          Somos un proyecto creativo multidisciplinar que conecta
          música, producción audiovisual, diseño, marketing y
          tecnología. Trabajamos con artistas, emprendedores,
          empresas y marcas que quieren llevar sus ideas más lejos.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          {servicios.map((servicio) => (
            <article
              key={servicio.numero}
              className="group flex flex-col justify-between border border-white/10 bg-graphite p-8 transition duration-300 hover:border-gold/60 md:p-10"
            >
              <div>
                <span className="text-sm font-bold tracking-widest text-gold">
                  {servicio.numero}
                </span>

                <h2 className="mt-6 text-3xl font-black uppercase">
                  {servicio.titulo}
                </h2>

                <p className="mt-5 leading-relaxed text-zinc-400">
                  {servicio.descripcion}
                </p>
              </div>

              <Link
                href={servicio.enlace}
                className="mt-10 inline-flex w-fit items-center gap-3 font-bold text-gold transition group-hover:gap-5"
              >
                DESCUBRIR SERVICIO
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-graphite px-6 py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-black uppercase md:text-4xl">
              ¿Tienes un proyecto en mente?
            </h2>

            <p className="mt-4 text-zinc-400">
              Cuéntanos qué necesitas y estudiamos cómo hacerlo realidad.
            </p>
          </div>

          <Link
            href="/contacto"
            className="bg-gold px-8 py-4 font-bold text-black transition hover:bg-gold-light"
          >
            HABLEMOS
          </Link>
        </div>
      </section>
    </main>
  );
}

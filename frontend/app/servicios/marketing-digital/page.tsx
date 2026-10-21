
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Marketing digital",
  description:
    "Marketing digital para artistas, marcas y proyectos. Estrategia, redes sociales, publicidad online, SEO y campañas digitales con Money Way Empire.",
};

const servicios = [
  {
    numero: "01",
    titulo: "Estrategia de marketing",
    descripcion:
      "Diseñamos estrategias de comunicación y marketing adaptadas a los objetivos, la identidad y el público de cada proyecto.",
  },
  {
    numero: "02",
    titulo: "Redes sociales",
    descripcion:
      "Planificamos contenidos, gestionamos perfiles y desarrollamos estrategias para construir comunidades y mejorar la presencia digital.",
  },
  {
    numero: "03",
    titulo: "Publicidad digital",
    descripcion:
      "Creamos y gestionamos campañas en Google Ads, Meta Ads y otras plataformas para promocionar productos, servicios, eventos y lanzamientos.",
  },
  {
    numero: "04",
    titulo: "SEO y posicionamiento web",
    descripcion:
      "Trabajamos la optimización de páginas web y contenidos para mejorar su visibilidad en buscadores y atraer tráfico relevante.",
  },
  {
    numero: "05",
    titulo: "Lanzamientos y promoción musical",
    descripcion:
      "Desarrollamos planes promocionales para singles, álbumes, videoclips y proyectos artísticos, coordinando contenidos y acciones digitales.",
  },
  {
    numero: "06",
    titulo: "Analítica y optimización",
    descripcion:
      "Analizamos el rendimiento de campañas, sitios web y canales digitales para identificar oportunidades de mejora y optimizar resultados.",
  },
];

const proceso = [
  {
    numero: "01",
    titulo: "Análisis",
    descripcion:
      "Estudiamos el proyecto, su público, su competencia y su situación digital.",
  },
  {
    numero: "02",
    titulo: "Estrategia",
    descripcion:
      "Definimos objetivos, canales, acciones y métricas para evaluar los resultados.",
  },
  {
    numero: "03",
    titulo: "Ejecución",
    descripcion:
      "Ponemos en marcha las campañas y acciones de comunicación acordadas.",
  },
  {
    numero: "04",
    titulo: "Optimización",
    descripcion:
      "Medimos el rendimiento y ajustamos las acciones según los datos obtenidos.",
  },
];

export default function MarketingDigitalPage() {
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
            Money Way Empire / Marketing digital
          </p>

          <h1 className="max-w-5xl text-5xl font-black uppercase leading-tight md:text-7xl">
            Conectamos marcas.
            <span className="block text-gold">
              Impulsamos proyectos.
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-400">
            Combinamos creatividad, estrategia y análisis para
            dar visibilidad a artistas, marcas y proyectos.
            Diseñamos acciones digitales orientadas a conectar
            con el público adecuado y alcanzar objetivos reales.
          </p>

          <Link
            href="/contacto?servicio=marketing-digital"
            className="mt-10 inline-block bg-gold px-8 py-4 font-bold text-black transition hover:bg-gold-light"
          >
            IMPULSA TU PROYECTO
          </Link>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gold">
          Qué hacemos
        </p>

        <h2 className="mb-12 text-4xl font-black uppercase md:text-5xl">
          Servicios de marketing
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
            Nuestra especialidad
          </p>

          <h2 className="text-4xl font-black uppercase md:text-5xl">
            Estrategia para cada proyecto
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="border border-white/10 bg-background p-8">
              <h3 className="text-2xl font-bold text-gold">
                Artistas y música
              </h3>
              <p className="mt-4 text-zinc-400">
                Promoción de lanzamientos, campañas de videoclips,
                estrategia de contenidos y crecimiento de audiencias.
              </p>
            </div>

            <div className="border border-white/10 bg-background p-8">
              <h3 className="text-2xl font-bold text-gold">
                Moda y marcas
              </h3>
              <p className="mt-4 text-zinc-400">
                Campañas publicitarias, posicionamiento de marca,
                promoción de colecciones y comunicación digital.
              </p>
            </div>

            <div className="border border-white/10 bg-background p-8">
              <h3 className="text-2xl font-bold text-gold">
                Eventos y cultura
              </h3>
              <p className="mt-4 text-zinc-400">
                Promoción de conciertos y festivales,
                campañas de difusión y estrategias de venta de entradas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESO DE TRABAJO */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gold">
          Cómo trabajamos
        </p>

        <h2 className="text-4xl font-black uppercase md:text-5xl">
          De la estrategia a los resultados
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
            Haz que tu proyecto llegue más lejos.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
            ¿Quieres promocionar tu música, impulsar tu marca,
            lanzar una campaña o mejorar tu presencia digital?
            Cuéntanos qué necesitas.
          </p>

          <Link
            href="/contacto?servicio=marketing-digital"
            className="mt-10 inline-block bg-gold px-8 py-4 font-bold text-black transition hover:bg-gold-light"
          >
            SOLICITAR PRESUPUESTO
          </Link>
        </div>
      </section>
    </main>
  );
}



import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Desarrollo web",
  description:
    "Diseño y desarrollo de páginas web, tiendas online, portfolios y plataformas digitales para artistas, marcas y empresas con Money Way Empire.",
};

const servicios = [
  {
    numero: "01",
    titulo: "Diseño y desarrollo web",
    descripcion:
      "Diseñamos y desarrollamos páginas web modernas, funcionales y adaptadas a la identidad de cada marca, artista o proyecto.",
  },
  {
    numero: "02",
    titulo: "Tiendas online",
    descripcion:
      "Creamos tiendas digitales con catálogos de productos, carrito de compra, gestión de pedidos e integración de sistemas de pago.",
  },
  {
    numero: "03",
    titulo: "Webs para artistas",
    descripcion:
      "Desarrollamos páginas para músicos, DJs y creadores con discografía, videoclips, agenda de conciertos, contenido multimedia y contacto profesional.",
  },
  {
    numero: "04",
    titulo: "Webs para eventos",
    descripcion:
      "Creamos páginas para conciertos, festivales y eventos culturales con programación, información, artistas y enlaces de venta de entradas.",
  },
  {
    numero: "05",
    titulo: "Mantenimiento y optimización",
    descripcion:
      "Realizamos mejoras técnicas, actualizaciones, optimización de rendimiento y mantenimiento de proyectos web.",
  },
  {
    numero: "06",
    titulo: "Soluciones digitales a medida",
    descripcion:
      "Desarrollamos funcionalidades específicas, formularios, paneles de administración e integraciones adaptadas a las necesidades del proyecto.",
  },
];

const tecnologias = [
  {
    titulo: "Diseño y experiencia de usuario",
    descripcion:
      "Diseñamos interfaces intuitivas, atractivas y adaptadas a ordenadores, tabletas y móviles.",
  },
  {
    titulo: "Desarrollo moderno",
    descripcion:
      "Trabajamos con tecnologías web como HTML, CSS, JavaScript, TypeScript, React y Next.js, según las necesidades de cada proyecto.",
  },
  {
    titulo: "Gestión de contenidos",
    descripcion:
      "Desarrollamos soluciones que permiten gestionar y actualizar contenidos, productos y publicaciones.",
  },
];

const proceso = [
  {
    numero: "01",
    titulo: "Análisis",
    descripcion:
      "Estudiamos tus necesidades, objetivos, público y funcionalidades necesarias.",
  },
  {
    numero: "02",
    titulo: "Diseño",
    descripcion:
      "Definimos la estructura, navegación, experiencia de usuario e identidad visual.",
  },
  {
    numero: "03",
    titulo: "Desarrollo",
    descripcion:
      "Construimos la web e implementamos las funcionalidades acordadas.",
  },
  {
    numero: "04",
    titulo: "Pruebas y publicación",
    descripcion:
      "Comprobamos su funcionamiento, corregimos errores y preparamos el lanzamiento.",
  },
];

export default function DesarrolloWebPage() {
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
            Money Way Empire / Desarrollo web
          </p>

          <h1 className="max-w-5xl text-5xl font-black uppercase leading-tight md:text-7xl">
            Diseñamos experiencias.
            <span className="block text-gold">
              Construimos el futuro digital.
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-400">
            Creamos páginas web y experiencias digitales que
            combinan diseño, tecnología y funcionalidad.
            Desde portfolios artísticos hasta tiendas online
            y plataformas para marcas, empresas y eventos.
          </p>

          <Link
            href="/contacto"
            className="mt-10 inline-block bg-gold px-8 py-4 font-bold text-black transition hover:bg-gold-light"
          >
            HABLEMOS DE TU WEB
          </Link>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gold">
          Qué hacemos
        </p>

        <h2 className="mb-12 text-4xl font-black uppercase md:text-5xl">
          Servicios de desarrollo web
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

      {/* TECNOLOGÍA Y ENFOQUE */}
      <section className="border-y border-white/10 bg-graphite px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gold">
            Nuestra forma de trabajar
          </p>

          <h2 className="text-4xl font-black uppercase md:text-5xl">
            Diseño, tecnología y funcionalidad
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {tecnologias.map((tecnologia) => (
              <article
                key={tecnologia.titulo}
                className="border border-white/10 bg-background p-8"
              >
                <h3 className="text-2xl font-bold text-gold">
                  {tecnologia.titulo}
                </h3>

                <p className="mt-4 leading-relaxed text-zinc-400">
                  {tecnologia.descripcion}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TIPOS DE PROYECTOS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gold">
          Para quién trabajamos
        </p>

        <h2 className="text-4xl font-black uppercase md:text-5xl">
          Cada proyecto necesita su espacio
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="border border-white/10 bg-graphite p-8">
            <h3 className="text-2xl font-bold text-gold">
              Artistas y creadores
            </h3>
            <p className="mt-4 text-zinc-400">
              Portfolios, páginas oficiales, discografías,
              contenidos multimedia y espacios de contratación.
            </p>
          </div>

          <div className="border border-white/10 bg-graphite p-8">
            <h3 className="text-2xl font-bold text-gold">
              Marcas y tiendas
            </h3>
            <p className="mt-4 text-zinc-400">
              Webs corporativas, catálogos, tiendas online
              y plataformas de comercio electrónico.
            </p>
          </div>

          <div className="border border-white/10 bg-graphite p-8">
            <h3 className="text-2xl font-bold text-gold">
              Eventos y promotores
            </h3>
            <p className="mt-4 text-zinc-400">
              Páginas de festivales, agendas culturales,
              programación de eventos y promoción de entradas.
            </p>
          </div>
        </div>
      </section>

      {/* PROCESO DE TRABAJO */}
      <section className="border-t border-white/10 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gold">
            Cómo trabajamos
          </p>

          <h2 className="text-4xl font-black uppercase md:text-5xl">
            De la idea a la web
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
        </div>
      </section>

      {/* CONTACTO */}
      <section className="bg-graphite px-6 py-24">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-5 text-sm font-bold uppercase tracking-widest text-gold">
            Trabajemos juntos
          </p>

          <h2 className="text-4xl font-black uppercase md:text-6xl">
            Tu próximo proyecto empieza aquí.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
            ¿Necesitas una página web, una tienda online
            o una solución digital personalizada?
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

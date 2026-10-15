
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Organización y producción de eventos",
  description:
    "Organización y producción de conciertos, festivales, eventos de cultura urbana, presentaciones de marcas y experiencias en directo con Money Way Empire.",
};

const serviciosEventos = [
  {
    numero: "01",
    titulo: "Conciertos y actuaciones",
    descripcion:
      "Planificamos y coordinamos conciertos, showcases, giras y actuaciones en directo, adaptándonos a las necesidades de cada artista y promotor.",
  },
  {
    numero: "02",
    titulo: "Festivales",
    descripcion:
      "Participamos en la planificación y producción de festivales musicales, coordinando los diferentes elementos necesarios para desarrollar el evento.",
  },
  {
    numero: "03",
    titulo: "Eventos para marcas",
    descripcion:
      "Organizamos presentaciones de colecciones, lanzamientos de productos, activaciones de marca y experiencias relacionadas con la moda y la cultura urbana.",
  },
  {
    numero: "04",
    titulo: "Producción técnica",
    descripcion:
      "Coordinamos las necesidades de sonido, iluminación, escenarios, audiovisuales y otros recursos técnicos mediante profesionales y proveedores especializados.",
  },
  {
    numero: "05",
    titulo: "Booking y contratación artística",
    descripcion:
      "Ayudamos a seleccionar y coordinar artistas, DJs y actuaciones musicales para eventos, teniendo en cuenta el público, el concepto y el presupuesto.",
  },
  {
    numero: "06",
    titulo: "Comunicación y promoción",
    descripcion:
      "Desarrollamos materiales gráficos, contenido audiovisual y estrategias de comunicación para dar visibilidad al evento y conectar con su público.",
  },
];

const proceso = [
  {
    numero: "01",
    titulo: "Concepto",
    descripcion:
      "Escuchamos tu idea, definimos los objetivos, el público y el tipo de evento.",
  },
  {
    numero: "02",
    titulo: "Planificación",
    descripcion:
      "Estudiamos las necesidades, el presupuesto, los proveedores y la organización general.",
  },
  {
    numero: "03",
    titulo: "Producción",
    descripcion:
      "Coordinamos los equipos y recursos necesarios para preparar el evento.",
  },
  {
    numero: "04",
    titulo: "Ejecución",
    descripcion:
      "Supervisamos el desarrollo del evento y coordinamos los aspectos de producción acordados.",
  },
];

export default function OrganizacionEventosPage() {
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
            Money Way Empire / Live Experiences
          </p>

          <h1 className="max-w-5xl text-5xl font-black uppercase leading-tight md:text-7xl">
            Creamos eventos.
            <span className="block text-gold">
              Generamos experiencias.
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-400">
            De un concierto a la presentación de una marca.
            Transformamos ideas en experiencias que conectan
            con el público a través de la música, la creatividad
            y la cultura urbana.
          </p>

          <Link
            href="/contacto"
            className="mt-10 inline-block bg-gold px-8 py-4 font-bold text-black transition hover:bg-gold-light"
          >
            ORGANIZA TU EVENTO CON NOSOTROS
          </Link>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gold">
          Qué hacemos
        </p>

        <h2 className="mb-12 text-4xl font-black uppercase md:text-5xl">
          Producción de eventos
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {serviciosEventos.map((servicio) => (
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

      {/* TIPOS DE EVENTOS */}
      <section className="border-y border-white/10 bg-graphite px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gold">
            Nuestro universo
          </p>

          <h2 className="text-4xl font-black uppercase md:text-5xl">
            Música, marcas y cultura
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="border border-white/10 bg-background p-8">
              <h3 className="text-2xl font-bold text-gold">
                Música en directo
              </h3>
              <p className="mt-4 text-zinc-400">
                Conciertos, showcases, sesiones de DJs,
                presentaciones musicales y festivales.
              </p>
            </div>

            <div className="border border-white/10 bg-background p-8">
              <h3 className="text-2xl font-bold text-gold">
                Moda y streetwear
              </h3>
              <p className="mt-4 text-zinc-400">
                Presentaciones de colecciones, eventos de marca,
                pop-ups y experiencias de moda urbana.
              </p>
            </div>

            <div className="border border-white/10 bg-background p-8">
              <h3 className="text-2xl font-bold text-gold">
                Cultura urbana
              </h3>
              <p className="mt-4 text-zinc-400">
                Encuentros culturales, eventos creativos,
                competiciones y experiencias para comunidades.
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
          De la idea al directo
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
            Tu evento empieza aquí.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
            ¿Quieres organizar un concierto, festival,
            presentación de marca o evento cultural?
            Cuéntanos tu idea y estudiamos cómo producirla.
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

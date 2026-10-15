


const servicios = [
  "Producción musical",
  "Producción audiovisual",
  "Diseño y branding",
  "Marketing digital",
  "Desarrollo web",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      

      <main>
        {/* PORTADA PRINCIPAL */}
        <section className="mx-auto flex min-h-[65vh] max-w-7xl flex-col justify-center px-6 py-24">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.3em] text-gold">
            Creative Studio · Music · Entertainment
          </p>

          <h1 className="max-w-5xl text-5xl font-black uppercase leading-tight md:text-8xl">
            Creamos cultura.
            <span className="block text-gold">
              Construimos marcas.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg text-zinc-400">
            Sello musical, estudio creativo y productora audiovisual.
            Transformamos ideas en música, imágenes, experiencias
            y proyectos digitales.
          </p>

          <a
            href="#servicios"
            className="mt-10 w-fit bg-gold px-8 py-4 font-bold text-black transition hover:bg-gold-light"
          >
            DESCUBRE LO QUE HACEMOS
          </a>
        </section>

        {/* SERVICIOS */}
        <section id="servicios" className="bg-zinc-900 px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 text-4xl font-bold">
              Servicios
            </h2>

            <div className="grid gap-5 md:grid-cols-3">
              {servicios.map((servicio) => (
                <div
                  key={servicio}
                  className="border border-white/10 bg-zinc-950 p-8"
                >
                  <h3 className="text-xl font-semibold">
                    {servicio}
                  </h3>

                  <p className="mt-4 text-sm text-zinc-400">
                    Soluciones creativas adaptadas a cada proyecto.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROYECTOS */}
        <section
          id="proyectos"
          className="mx-auto max-w-7xl px-6 py-24"
        >
          <h2 className="text-4xl font-bold">
            Nuestros proyectos
          </h2>

          <p className="mt-5 text-zinc-400">
            Próximamente mostraremos nuestros trabajos audiovisuales,
            musicales, de diseño y desarrollo digital.
          </p>
        </section>

        {/* MÚSICA */}
        <section id="musica" className="bg-zinc-900 px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-4xl font-bold">
              Música
            </h2>

            <p className="mt-5 text-zinc-400">
              Artistas, lanzamientos, producción musical y booking.
            </p>
          </div>
        </section>

        {/* EVENTOS */}
        <section
          id="eventos"
          className="mx-auto max-w-7xl px-6 py-24"
        >
          <h2 className="text-4xl font-bold">
            Eventos
          </h2>

          <p className="mt-5 text-zinc-400">
            Organización, producción y promoción de experiencias
            en directo.
          </p>
        </section>

        {/* TIENDA */}
        <section id="shop" className="bg-zinc-900 px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-4xl font-bold">
              Shop
            </h2>

            <p className="mt-5 text-zinc-400">
              Nuestra colección de ropa y merchandising llegará pronto.
            </p>
          </div>
        </section>
      </main>

      {/* PIE DE PÁGINA */}
      <footer
        id="contacto"
        className="border-t border-white/10 px-6 py-12"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold">
            Hablemos de tu proyecto
          </h2>

          <p className="mt-4 text-zinc-400">
            Money Way Empire — Música, creatividad y negocios.
          </p>
        </div>
      </footer>
    </div>
  );
}

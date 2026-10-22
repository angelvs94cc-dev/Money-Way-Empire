import Link from "next/link";

const servicios = [
  {
    nombre: "Producción musical",
    frase: "Del primer sonido a la versión final.",
    descripcion: "Grabación, producción musical, instrumentales, composición, mezcla y mastering para desarrollar tu música con identidad propia.",
    href: "/servicios/produccion-musical",
  },
  {
    nombre: "Producción audiovisual",
    frase: "Convertimos ideas en imágenes que conectan.",
    descripcion: "Videoclips, publicidad, entrevistas, contenido de marca, videolyrics y producciones audiovisuales para dar vida a cada proyecto.",
    href: "/servicios/audiovisual",
  },
  {
    nombre: "Fotografía",
    frase: "Imágenes que construyen identidad.",
    descripcion: "Retratos, fotografía promocional, moda, editorial y campañas visuales para artistas y marcas.",
    href: "/servicios/fotografia",
  },
  {
    nombre: "Diseño y branding",
    frase: "Tu identidad también comunica.",
    descripcion: "Creamos identidades visuales, logotipos, portadas, carteles y diseños gráficos que hacen reconocible cada proyecto.",
    href: "/servicios/diseno-y-branding",
  },
  {
    nombre: "Marketing digital",
    frase: "Creatividad, estrategia y resultados.",
    descripcion: "Diseñamos campañas publicitarias, estrategias digitales y acciones de promoción para conectar tu proyecto con su público.",
    href: "/servicios/marketing-digital",
  },
  {
    nombre: "Desarrollo web",
    frase: "Tu proyecto también necesita presencia digital.",
    descripcion: "Diseñamos y desarrollamos páginas web, tiendas online y plataformas digitales adaptadas a las necesidades de cada cliente.",
    href: "/servicios/desarrollo-web",
  },
];

const proyectos = [
  {
    categoria: "PRODUCCIÓN AUDIOVISUAL",
    nombre: "EN EL PUNTO DE MIRA",
    detalle: "Papi Trujillo · Dafresito · Khaled",
    descripcion: "Dirección, grabación y edición de un videoclip con millones de reproducciones.",
    href: "https://youtu.be/fLEKF2bEhps",
    externo: true,
  },
  {
    categoria: "PRODUCCIÓN VISUAL",
    nombre: "KALU IBIZA",
    detalle: "Moda · Lifestyle",
    descripcion: "Un proyecto visual vinculado a la moda y la identidad de marca.",
    href: "https://youtu.be/uDuh6L0xUIc",
    externo: true,
  },
  {
    categoria: "MARKETING DIGITAL",
    nombre: "CAMAVINGA",
    detalle: "Campaña Google Ads · YouTube",
    descripcion: "Una campaña audiovisual con más de 228.000 impresiones y 31.000 visualizaciones publicitarias.",
    href: "/proyectos",
    externo: false,
  },
];

const botonPrincipal =
  "inline-flex w-fit items-center justify-center bg-gold px-7 py-4 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-gold-light";

const botonSecundario =
  "inline-flex w-fit items-center justify-center border border-white/25 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:border-gold hover:text-gold";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <main>
        {/* HERO */}
        <section className="mx-auto flex min-h-[75vh] max-w-7xl flex-col justify-center px-6 py-24">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-gold sm:text-sm">
            MUSIC · CREATIVE STUDIO · 360° MARKETING
          </p>

          <h1 className="max-w-6xl text-5xl font-black uppercase leading-[1.05] tracking-tight sm:text-6xl md:text-8xl">
            De la idea
            <span className="block text-gold">al impacto.</span>
          </h1>

          <p className="mt-8 max-w-3xl text-base leading-8 text-zinc-300 md:text-lg">
            Money Way Empire es un colectivo musical, estudio creativo y
            productora audiovisual con una visión 360° del marketing, la moda
            y el entretenimiento. Transformamos ideas en música, imágenes,
            experiencias y proyectos digitales para impulsar artistas, marcas
            y proyectos vinculados a la industria musical.
          </p>

          <Link href="#servicios" className={`mt-10 ${botonPrincipal}`}>
            DESCUBRE LO QUE HACEMOS
          </Link>
        </section>

        {/* SERVICIOS */}
        <section id="servicios" className="bg-zinc-900 px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-gold">
              QUÉ HACEMOS
            </p>
            <h2 className="mb-5 text-4xl font-black uppercase md:text-5xl">
              Nuestros servicios
            </h2>
            <p className="mb-12 max-w-2xl leading-7 text-zinc-400">
              Música, creatividad, estrategia y tecnología al servicio de cada proyecto.
            </p>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {servicios.map((servicio, index) => (
                <Link
                  key={servicio.nombre}
                  href={servicio.href}
                  className="group flex h-full flex-col border border-white/10 bg-zinc-950 p-8 transition hover:border-gold/70"
                >
                  <span className="mb-8 text-sm font-bold text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-2xl font-bold">
                    {servicio.nombre}
                  </h3>
                  <p className="mt-3 font-semibold text-zinc-200">
                    {servicio.frase}
                  </p>
                  <p className="mt-4 flex-1 text-sm leading-7 text-zinc-400">
                    {servicio.descripcion}
                  </p>
                  <span className="mt-8 text-sm font-bold text-gold transition group-hover:translate-x-1">
                    DESCUBRIR SERVICIO →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* PROYECTOS */}
        <section id="proyectos" className="mx-auto max-w-7xl px-6 py-24">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-gold">
            NUESTRO TRABAJO
          </p>
          <h2 className="text-4xl font-black uppercase md:text-5xl">
            Proyectos destacados
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-zinc-400">
            Cada proyecto cuenta una historia. Descubre algunos de los trabajos
            que forman parte de nuestro recorrido creativo.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {proyectos.map((proyecto) => (
              <Link
                key={proyecto.nombre}
                href={proyecto.href}
                target={proyecto.externo ? "_blank" : undefined}
                rel={proyecto.externo ? "noopener noreferrer" : undefined}
                className="group flex min-h-72 flex-col border border-white/10 bg-zinc-900 p-7 transition hover:border-gold/70"
              >
                <span className="text-xs font-bold tracking-widest text-gold">
                  {proyecto.categoria}
                </span>
                <h3 className="mt-8 text-2xl font-black">
                  {proyecto.nombre}
                </h3>
                <p className="mt-2 text-sm text-zinc-300">
                  {proyecto.detalle}
                </p>
                <p className="mt-5 flex-1 text-sm leading-7 text-zinc-400">
                  {proyecto.descripcion}
                </p>
                <span className="mt-7 text-sm font-bold text-gold">
                  VER PROYECTO →
                </span>
              </Link>
            ))}
          </div>

          <Link href="/proyectos" className={`mt-10 ${botonSecundario}`}>
            VER TODOS LOS PROYECTOS
          </Link>
        </section>

        {/* MÚSICA */}
        <section id="musica" className="bg-zinc-900 px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-gold">
              NUESTRO ORIGEN
            </p>
            <h2 className="text-4xl font-black uppercase md:text-5xl">
              Música
            </h2>
            <p className="mt-6 max-w-3xl leading-8 text-zinc-300">
              La música está en nuestro origen. Impulsamos proyectos artísticos,
              conectamos talento y llevamos nuestras propuestas del estudio
              al escenario.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/musica" className={botonPrincipal}>
                DESCUBRIR NUESTRA MÚSICA
              </Link>
              <Link href="/musica/booking" className={botonSecundario}>
                BOOKING
              </Link>
            </div>
          </div>
        </section>

        {/* EVENTOS */}
        <section id="eventos" className="mx-auto max-w-7xl px-6 py-24">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-gold">
            EXPERIENCIAS EN DIRECTO
          </p>
          <h2 className="text-4xl font-black uppercase md:text-5xl">
            Eventos
          </h2>
          <p className="mt-6 max-w-3xl leading-8 text-zinc-400">
            Creamos y participamos en experiencias que conectan música,
            artistas y público. Descubre nuestros próximos eventos y revive
            los encuentros que ya hemos celebrado.
          </p>
          <Link href="/eventos" className={`mt-9 ${botonPrincipal}`}>
            EXPLORAR EVENTOS
          </Link>
        </section>

        {/* TIENDA */}
        <section id="shop" className="bg-zinc-900 px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-gold">
              ESTILO E IDENTIDAD
            </p>
            <h2 className="text-4xl font-black uppercase md:text-5xl">
              Shop
            </h2>
            <p className="mt-6 max-w-3xl leading-8 text-zinc-300">
              La creatividad también se viste. Descubre el merchandising
              de Cream Mami y las colecciones de ropa de Money Way Empire:
              dos líneas con personalidad propia, conectadas por la música,
              la cultura y la identidad visual.
            </p>
            <Link href="/shop" className={`mt-9 ${botonPrincipal}`}>
              EXPLORAR LA TIENDA
            </Link>
          </div>
        </section>

        {/* FUNDADOR */}
        <section className="mx-auto max-w-7xl px-6 py-24">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-gold">
            EL PROYECTO
          </p>
          <h2 className="max-w-3xl text-4xl font-black uppercase md:text-5xl">
            Detrás de Money Way Empire
          </h2>
          <p className="mt-7 max-w-3xl leading-8 text-zinc-400">
            Money Way Empire nace de la visión de Ángel Eladio Velaz Sánchez,
            profesional de la comunicación, el marketing y la producción
            audiovisual, y artista musical bajo el nombre de Cream Mami.
            Un proyecto que conecta distintas disciplinas creativas para
            desarrollar ideas con identidad propia.
          </p>
        </section>

        {/* CONTACTO */}
        <section id="contacto" className="border-t border-white/10 bg-zinc-900 px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-gold">
              HABLEMOS
            </p>
            <h2 className="text-4xl font-black uppercase md:text-5xl">
              Hablemos de tu proyecto
            </h2>
            <p className="mt-6 max-w-3xl leading-8 text-zinc-300">
              ¿Tienes una idea, un lanzamiento, una marca o un evento en mente?
              Cuéntanos qué necesitas y estudiemos cómo llevarlo al siguiente nivel.
            </p>
            <Link href="/contacto" className={`mt-9 ${botonPrincipal}`}>
              CONTACTAR
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm text-zinc-400">
            © 2026 Money Way Empire — Música, creatividad y negocios.
          </p>
        </div>
      </footer>
    </div>
  );
}
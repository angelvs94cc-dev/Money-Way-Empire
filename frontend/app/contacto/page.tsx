
"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";

const servicios = [
  { valor: "produccion-musical", nombre: "Producción musical" },
  { valor: "audiovisual", nombre: "Producción audiovisual" },
  { valor: "fotografia", nombre: "Fotografía" },
  { valor: "diseno-y-branding", nombre: "Diseño y branding" },
  { valor: "marketing-digital", nombre: "Marketing digital" },
  { valor: "desarrollo-web", nombre: "Desarrollo web" },
  { valor: "booking", nombre: "Booking de artistas" },
  { valor: "eventos", nombre: "Eventos" },
  { valor: "shop", nombre: "Tienda y pedidos" },
  { valor: "otros", nombre: "Otros" },
];

const destinatarios: Record<string, string> = {
  booking: "booking@moneywayempire.com",
  eventos: "eventos@moneywayempire.com",
  shop: "shop@moneywayempire.com",
};

function obtenerDestinatario(servicio: string) {
  return destinatarios[servicio] || "info@moneywayempire.com";
}

function ContactoContenido() {
  const parametros = useSearchParams();
  const servicioURL = parametros.get("servicio") || "";

  const servicioInicial = servicios.some(
    (servicio) => servicio.valor === servicioURL
  )
    ? servicioURL
    : "";

  const [servicioSeleccionado, setServicioSeleccionado] =
    useState(servicioInicial);

  const [estado, setEstado] = useState("");

  function enviarFormulario(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setEstado("");

    const datos = new FormData(evento.currentTarget);

    const nombre = String(datos.get("nombre") || "").trim();
    const email = String(datos.get("email") || "").trim();
    const mensaje = String(datos.get("mensaje") || "").trim();

    const servicio = servicios.find(
      (item) => item.valor === servicioSeleccionado
    );

    if (!nombre || !email || !mensaje || !servicio) {
      setEstado("Completa todos los campos obligatorios.");
      return;
    }

    const destinatario = obtenerDestinatario(servicio.valor);

    const asunto = `Consulta Money Way Empire - ${servicio.nombre}`;

    const cuerpo = [
      `Nombre: ${nombre}`,
      `Correo electrónico: ${email}`,
      `Servicio: ${servicio.nombre}`,
      "",
      "Mensaje:",
      mensaje,
    ].join("\n");

    const enlace = `mailto:${destinatario}?subject=${encodeURIComponent(
      asunto
    )}&body=${encodeURIComponent(cuerpo)}`;

    window.location.href = enlace;

    setEstado(
      "Se ha preparado el mensaje para tu aplicación de correo. Si se abre, revisa los datos y pulsa Enviar."
    );
  }

  return (
    <main className="min-h-screen bg-background text-white">
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-gold">
          Money Way Empire
        </p>

        <h1 className="mb-6 text-4xl font-black md:text-6xl">
          Contacto
        </h1>

        <p className="max-w-3xl text-lg leading-relaxed text-white/70">
          ¿Tienes un proyecto musical, necesitas una producción
          audiovisual o quieres dar forma a tu identidad de marca?
          Cuéntanos tu idea y estudiamos cómo hacerla realidad.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 lg:grid-cols-[1.4fr_1fr]">
        <form
          onSubmit={enviarFormulario}
          className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-10"
        >
          <h2 className="text-2xl font-bold">
            Cuéntanos tu proyecto
          </h2>

          <div>
            <label
              htmlFor="nombre"
              className="mb-2 block text-sm font-medium"
            >
              Nombre *
            </label>

            <input
              id="nombre"
              name="nombre"
              type="text"
              autoComplete="name"
              required
              maxLength={120}
              placeholder="Tu nombre"
              className="w-full rounded-lg border border-white/20 bg-black/30 px-4 py-3 text-white outline-none focus:border-gold"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium"
            >
              Correo electrónico *
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="tu@email.com"
              className="w-full rounded-lg border border-white/20 bg-black/30 px-4 py-3 text-white outline-none focus:border-gold"
            />
          </div>

          <div>
            <label
              htmlFor="servicio"
              className="mb-2 block text-sm font-medium"
            >
              ¿Qué necesitas? *
            </label>

            <select
              id="servicio"
              name="servicio"
              required
              value={servicioSeleccionado}
              onChange={(evento) =>
                setServicioSeleccionado(evento.target.value)
              }
              className="w-full rounded-lg border border-white/20 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-gold"
            >
              <option value="" disabled>
                Selecciona un servicio
              </option>

              {servicios.map((servicio) => (
                <option
                  key={servicio.valor}
                  value={servicio.valor}
                >
                  {servicio.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="mensaje"
              className="mb-2 block text-sm font-medium"
            >
              Mensaje *
            </label>

            <textarea
              id="mensaje"
              name="mensaje"
              required
              rows={6}
              maxLength={5000}
              placeholder="Háblanos de tu proyecto, objetivos, fechas y presupuesto aproximado..."
              className="w-full resize-y rounded-lg border border-white/20 bg-black/30 px-4 py-3 text-white outline-none focus:border-gold"
            />
          </div>

          <label className="flex items-start gap-3 text-sm text-white/70">
            <input
              type="checkbox"
              required
              className="mt-1 accent-yellow-500"
            />

            <span>
              Acepto que los datos facilitados se utilicen
              para responder a esta consulta. *
            </span>
          </label>

          <button
            type="submit"
            className="w-full rounded-lg bg-gold px-6 py-4 font-bold text-black transition hover:opacity-85"
          >
            Preparar consulta
          </button>

          {estado && (
            <p role="status" className="text-sm text-white/70">
              {estado}
            </p>
          )}
        </form>

        <aside className="space-y-8">
          <div className="rounded-2xl border border-white/10 bg-graphite p-8">
            <h2 className="mb-4 text-2xl font-bold">
              Hablemos de música
            </h2>

            <p className="leading-relaxed text-white/70">
              Trabajamos con artistas, sellos, promotores
              y proyectos vinculados al sector musical.
              Desde una sesión de estudio hasta una campaña
              de lanzamiento, podemos ayudarte a desarrollar
              tu propuesta.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 p-8">
            <h2 className="mb-4 text-xl font-bold">
              ¿Qué puedes consultarnos?
            </h2>

            <p className="leading-relaxed text-white/70">
              Presupuestos, colaboraciones, producciones,
              fotografía, diseño, campañas digitales,
              desarrollo web, booking y eventos.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default function ContactoPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-background p-8 text-white">
          Cargando formulario...
        </main>
      }
    >
      <ContactoContenido />
    </Suspense>
  );
}

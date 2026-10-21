
"use client";

import Link from "next/link";
import { useState } from "react";

const menus = [
  {
    nombre: "Servicios",
    enlace: "/servicios",
    opciones: [
      {
        nombre: "Producción musical",
        enlace: "/servicios/produccion-musical",
      },
      {
        nombre: "Producción audiovisual",
        enlace: "/servicios/audiovisual",
      },
      {
        nombre: "Fotografía",
        enlace: "/servicios/fotografia",
      },
      {
        nombre: "Diseño y branding",
        enlace: "/servicios/diseno-y-branding",
      },
      {
        nombre: "Marketing digital",
        enlace: "/servicios/marketing-digital",
      },
      {
        nombre: "Desarrollo web",
        enlace: "/servicios/desarrollo-web",
      },
    ],
  },
  {
    nombre: "Proyectos",
    enlace: "/proyectos",
    opciones: [
      {
        nombre: "Todos los proyectos",
        enlace: "/proyectos",
      },
      {
        nombre: "Audiovisual",
        enlace: "/proyectos?categoria=audiovisual",
      },
      {
        nombre: "Fotografía",
        enlace: "/proyectos?categoria=fotografia",
      },
      {
        nombre: "Diseño y branding",
        enlace: "/proyectos?categoria=diseno-branding",
      },
      {
        nombre: "Marketing digital",
        enlace: "/proyectos?categoria=marketing",
      },
      {
        nombre: "Desarrollo web",
        enlace: "/proyectos?categoria=desarrollo-web",
      },
    ],
  },
  {
    nombre: "Música",
    enlace: "/musica",
    opciones: [
      {
        nombre: "Booking",
        enlace: "/musica/booking",
      },
      {
        nombre: "Lanzamientos",
        enlace: "/musica/lanzamientos",
      },
    ],
  },
];

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState<string | null>(
    null
  );

  const [movilAbierto, setMovilAbierto] = useState(false);

  const cerrarMenus = () => {
    setMenuAbierto(null);
    setMovilAbierto(false);
  };

  return (
    <header className="relative z-50 border-b border-white/10 bg-background">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5">
        <Link
          href="/"
          className="text-xl font-black tracking-widest text-gold"
          onClick={cerrarMenus}
        >
          MONEY WAY EMPIRE
        </Link>

        <button
          type="button"
          className="rounded border border-white/20 px-3 py-2 text-sm lg:hidden"
          onClick={() => {
            setMovilAbierto(!movilAbierto);
            setMenuAbierto(null);
          }}
          aria-expanded={movilAbierto}
          aria-controls="menu-principal"
        >
          {movilAbierto ? "Cerrar" : "Menú"}
        </button>

        <div
          id="menu-principal"
          className={`${
            movilAbierto ? "flex" : "hidden"
          } absolute left-0 right-0 top-full flex-col gap-5 border-b border-white/10 bg-background px-6 py-6 lg:static lg:flex lg:flex-row lg:items-center lg:gap-6 lg:border-0 lg:p-0`}
        >
          <Link
            href="/"
            className="transition hover:text-gold"
            onClick={cerrarMenus}
          >
            Inicio
          </Link>

          {menus.map((menu) => (
            <div
              key={menu.nombre}
              className="relative"
              onMouseEnter={() => setMenuAbierto(menu.nombre)}
              onMouseLeave={() => setMenuAbierto(null)}
            >
              <div className="flex items-center gap-2">
                <Link
                  href={menu.enlace}
                  className="transition hover:text-gold"
                  onClick={cerrarMenus}
                >
                  {menu.nombre}
                </Link>

                <button
                  type="button"
                  className="px-1 text-gold"
                  aria-label={`Desplegar ${menu.nombre}`}
                  aria-expanded={
                    menuAbierto === menu.nombre
                  }
                  onClick={() =>
                    setMenuAbierto(
                      menuAbierto === menu.nombre
                        ? null
                        : menu.nombre
                    )
                  }
                >
                  ▾
                </button>
              </div>

              {menuAbierto === menu.nombre && (
                <div className="mt-3 flex flex-col gap-3 rounded border border-white/10 bg-graphite p-4 lg:absolute lg:left-0 lg:top-full lg:mt-0 lg:w-72 lg:shadow-xl">
                  {menu.opciones.map((opcion) => (
                    <Link
                      key={opcion.enlace}
                      href={opcion.enlace}
                      className="text-sm transition hover:text-gold"
                      onClick={cerrarMenus}
                    >
                      {opcion.nombre}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link
            href="/eventos"
            className="transition hover:text-gold"
            onClick={cerrarMenus}
          >
            Eventos
          </Link>

          <Link
            href="/shop"
            className="transition hover:text-gold"
            onClick={cerrarMenus}
          >
            Shop
          </Link>

          <Link
            href="/contacto"
            className="transition hover:text-gold"
            onClick={cerrarMenus}
          >
            Contacto
          </Link>

          <Link
            href="/mi-cuenta"
            aria-label="Mi cuenta"
            className="transition hover:text-gold"
            onClick={cerrarMenus}
          >
            ♙ Cuenta
          </Link>

          <Link
            href="/carrito"
            aria-label="Carrito de compra"
            className="transition hover:text-gold"
            onClick={cerrarMenus}
          >
            🛍 Carrito
          </Link>
        </div>
      </nav>
    </header>
  );
}

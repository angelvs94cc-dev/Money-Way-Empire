
"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type RespuestaRegistro = {
  success: boolean;
  message?: string;
};

type RespuestaLogin = {
  success: boolean;
  message?: string;
  token?: string;
};

export default function RegistroPage() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  async function registrarUsuario(
    evento: FormEvent<HTMLFormElement>
  ) {
    evento.preventDefault();
    setError("");

    if (password !== confirmarPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (password.length < 8) {
      setError(
        "La contraseña debe tener al menos 8 caracteres."
      );
      return;
    }

    setCargando(true);

    try {
      const correo = email.trim().toLowerCase();

      const respuestaRegistro = await fetch(
        "http://localhost:4000/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: nombre.trim(),
            email: correo,
            password,
          }),
        }
      );

      const datosRegistro: RespuestaRegistro =
        await respuestaRegistro.json();

      if (!respuestaRegistro.ok || !datosRegistro.success) {
        throw new Error(
          datosRegistro.message ||
            "No se pudo crear la cuenta."
        );
      }

      // Iniciar sesión después de crear la cuenta.
      const respuestaLogin = await fetch(
        "http://localhost:4000/api/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: correo,
            password,
          }),
        }
      );

      const datosLogin: RespuestaLogin =
        await respuestaLogin.json();

      if (
        !respuestaLogin.ok ||
        !datosLogin.success ||
        !datosLogin.token
      ) {
        throw new Error(
          "La cuenta se ha creado, pero no se ha podido iniciar sesión. Entra desde la página de login."
        );
      }

      sessionStorage.setItem(
        "mwe-token",
        datosLogin.token
      );

      router.push("/carrito");
    } catch (errorCapturado) {
      setError(
        errorCapturado instanceof Error
          ? errorCapturado.message
          : "Ha ocurrido un error inesperado."
      );
    } finally {
      setCargando(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-20 text-foreground">
      <section className="w-full max-w-md border border-white/10 bg-graphite p-8 md:p-12">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-gold">
          Money Way Empire
        </p>

        <h1 className="mt-5 text-4xl font-black uppercase">
          Crear{" "}
          <span className="text-gold">
            cuenta.
          </span>
        </h1>

        <p className="mt-5 text-sm text-zinc-400">
          Regístrate para comprar en nuestra tienda
          y gestionar tus pedidos.
        </p>

        <form
          onSubmit={registrarUsuario}
          className="mt-10 space-y-6"
        >
          <div>
            <label
              htmlFor="nombre"
              className="mb-2 block text-sm font-bold"
            >
              Nombre
            </label>

            <input
              id="nombre"
              type="text"
              autoComplete="name"
              required
              minLength={2}
              value={nombre}
              onChange={(evento) =>
                setNombre(evento.target.value)
              }
              className="w-full border border-white/20 bg-background px-4 py-3 text-white outline-none focus:border-gold"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-bold"
            >
              Correo electrónico
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(evento) =>
                setEmail(evento.target.value)
              }
              className="w-full border border-white/20 bg-background px-4 py-3 text-white outline-none focus:border-gold"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-bold"
            >
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(evento) =>
                setPassword(evento.target.value)
              }
              className="w-full border border-white/20 bg-background px-4 py-3 text-white outline-none focus:border-gold"
            />
          </div>

          <div>
            <label
              htmlFor="confirmarPassword"
              className="mb-2 block text-sm font-bold"
            >
              Repetir contraseña
            </label>

            <input
              id="confirmarPassword"
              type="password"
              autoComplete="new-password"
              required
              value={confirmarPassword}
              onChange={(evento) =>
                setConfirmarPassword(evento.target.value)
              }
              className="w-full border border-white/20 bg-background px-4 py-3 text-white outline-none focus:border-gold"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="text-sm text-red-400"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-gold px-6 py-4 font-black uppercase text-black hover:bg-gold-light disabled:opacity-50"
          >
            {cargando
              ? "CREANDO CUENTA..."
              : "CREAR CUENTA"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-400">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/login"
            className="font-bold text-gold hover:text-gold-light"
          >
            Inicia sesión
          </Link>
        </p>

        <Link
          href="/shop"
          className="mt-6 block text-center text-sm font-bold text-gold"
        >
          ← VOLVER A SHOP
        </Link>
      </section>
    </main>
  );
}

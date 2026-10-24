
"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type RespuestaLogin = {
  success: boolean;
  message?: string;
  token?: string;
};

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  async function iniciarSesion(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setError("");
    setCargando(true);

    try {
      const respuesta = await fetch(
        (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000") + "/api/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const datos: RespuestaLogin = await respuesta.json();

      if (!respuesta.ok || !datos.success || !datos.token) {
        throw new Error(
          datos.message || "No se pudo iniciar sesión"
        );
      }

      // Solución provisional para el MVP local.
      // Antes de publicar, implementaremos cookies HttpOnly.
      sessionStorage.setItem("mwe-token", datos.token);

      router.push("/mi-cuenta");
    } catch (errorCapturado) {
      setError(
        errorCapturado instanceof Error
          ? errorCapturado.message
          : "Ha ocurrido un error al iniciar sesión"
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
          Iniciar <span className="text-gold">sesión.</span>
        </h1>

        <p className="mt-5 text-sm text-zinc-400">
          Accede a tu cuenta para continuar con tu pedido.
        </p>

        <form onSubmit={iniciarSesion} className="mt-10 space-y-6">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-bold">
              Correo electrónico
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(evento) => setEmail(evento.target.value)}
              placeholder="tu@email.com"
              className="w-full border border-white/20 bg-background px-4 py-3 text-white outline-none focus:border-gold"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-bold">
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(evento) => setPassword(evento.target.value)}
              className="w-full border border-white/20 bg-background px-4 py-3 text-white outline-none focus:border-gold"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-gold px-6 py-4 font-black uppercase text-black hover:bg-gold-light disabled:opacity-50"
          >
            {cargando ? "ACCEDIENDO..." : "INICIAR SESIÓN"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          ¿Todavía no tienes cuenta?{" "}
          <Link href="/registro" className="font-bold text-gold hover:underline">
            Regístrate aquí
          </Link>
        </p>

        <Link
          href="/shop"
          className="mt-8 block text-center text-sm font-bold text-gold"
        >
          ← VOLVER A SHOP
        </Link>
      </section>
    </main>
  );
}


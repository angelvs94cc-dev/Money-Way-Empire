"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";

type Producto = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  category: string;
  imageUrl: string | null;
  sizes: string[];
  colors: string[];
  featured: boolean;
  active: boolean;
};

export default function EditarProductoPage() {
  const router = useRouter();
  const params = useParams();
  const id = String(params.id ?? "");

  const [autorizado, setAutorizado] = useState(false);
  const [comprobando, setComprobando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("0");
  const [categoria, setCategoria] = useState("Camisetas");
  const [imagen, setImagen] = useState("");
  const [tallas, setTallas] = useState("");
  const [colores, setColores] = useState("");
  const [destacado, setDestacado] = useState(false);
  const [activo, setActivo] = useState(true);

  useEffect(() => {
    async function verificarAdmin() {
      const token = sessionStorage.getItem("mwe-token");

      if (!token) {
        setError("Debes iniciar sesión.");
        setComprobando(false);
        return;
      }

      try {
        const respuesta = await fetch(
          "http://localhost:4000/api/auth/admin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );

        if (!respuesta.ok) {
          throw new Error("No tienes acceso de administrador.");
        }

        const productosRespuesta = await fetch("http://localhost:4000/api/products", {
          cache: "no-store",
          headers: { Authorization: `Bearer ${token}` },
        });
        const datos = await productosRespuesta.json();
        if (!productosRespuesta.ok || !datos.success || !Array.isArray(datos.products)) {
          throw new Error(datos.message || "No se pudieron cargar los productos.");
        }
        const producto = (datos.products as Producto[]).find((p) => p.id === id);
        if (!producto) {
          throw new Error("Producto no encontrado. Comprueba si sigue activo o existe.");
        }
        setNombre(producto.name);
        setDescripcion(producto.description ?? "");
        setPrecio(String(producto.price / 100));
        setStock(String(producto.stock));
        setCategoria(producto.category);
        setImagen(producto.imageUrl ?? "");
        setTallas(producto.sizes.join(", "));
        setColores(producto.colors.join(", "));
        setDestacado(producto.featured);
        setActivo(producto.active);
        setAutorizado(true);
      } catch (errorCapturado) {
        setError(
          errorCapturado instanceof Error
            ? errorCapturado.message
            : "Error al verificar permisos."
        );
      } finally {
        setComprobando(false);
      }
    }

    void verificarAdmin();
  }, [id]);

  async function editarProducto(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setError("");

    const token = sessionStorage.getItem("mwe-token");

    if (!token) {
      setError("Tu sesión ha caducado. Inicia sesión de nuevo.");
      return;
    }

    const precioNumero = Number(precio.replace(",", "."));
    const precioCentimos = Math.round(precioNumero * 100);
    const stockNumero = Number(stock);

    if (
      !Number.isFinite(precioNumero) ||
      precioNumero <= 0 ||
      !Number.isSafeInteger(precioCentimos) ||
      !Number.isSafeInteger(stockNumero) ||
      stockNumero < 0
    ) {
      setError("Introduce un precio y un stock válidos.");
      return;
    }

    setGuardando(true);

    try {
      const respuesta = await fetch(
        `http://localhost:4000/api/products/${encodeURIComponent(id)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: nombre.trim(),
            description: descripcion.trim() || null,
            price: precioCentimos,
            stock: stockNumero,
            category: categoria,
            imageUrl: imagen.trim() || null,
            sizes: tallas
              .split(",")
              .map((talla) => talla.trim())
              .filter(Boolean),
            colors: colores
              .split(",")
              .map((color) => color.trim())
              .filter(Boolean),
            featured: destacado,
            active: activo,
          }),
        }
      );

      const datos = await respuesta.json();

      if (!respuesta.ok || !datos.success) {
        throw new Error(
          datos.message || "No se pudo actualizar el producto."
        );
      }

      router.push("/admin/productos");
    } catch (errorCapturado) {
      setError(
        errorCapturado instanceof Error
          ? errorCapturado.message
          : "Error al crear el producto."
      );
    } finally {
      setGuardando(false);
    }
  }

  if (comprobando) {
    return (
      <main className="min-h-screen bg-background p-12 text-foreground">
        Cargando producto y comprobando permisos...
      </main>
    );
  }

  if (!autorizado) {
    return (
      <main className="min-h-screen bg-background p-12 text-foreground">
        <h1 className="text-3xl font-black text-gold">
          Acceso restringido
        </h1>
        <p className="mt-6 text-red-400">{error}</p>
        <Link href="/login" className="mt-6 inline-block text-gold">
          INICIAR SESIÓN
        </Link>
      </main>
    );
  }

  const campo =
    "mt-2 w-full border border-white/20 bg-background px-4 py-3 text-foreground outline-none focus:border-gold";

  return (
    <main className="min-h-screen bg-background px-6 py-16 text-foreground">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/admin/productos"
          className="text-sm font-bold text-gold"
        >
          ← VOLVER A PRODUCTOS
        </Link>

        <p className="mt-12 text-sm font-bold uppercase tracking-widest text-gold">
          Money Way Empire
        </p>

        <h1 className="mt-4 text-4xl font-black uppercase md:text-6xl">
          Editar <span className="text-gold">producto.</span>
        </h1>

        <p className="mt-6 text-zinc-400">
          Modifica los datos del producto de la tienda.
        </p>

        <form
          onSubmit={editarProducto}
          className="mt-12 space-y-7 border border-white/10 bg-graphite p-6 md:p-10"
        >
          <div>
            <label htmlFor="nombre" className="font-bold">
              Nombre del producto *
            </label>
            <input
              id="nombre"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Camiseta Money Way Empire"
              className={campo}
            />
          </div>

          <div>
            <label htmlFor="descripcion" className="font-bold">
              Descripción
            </label>
            <textarea
              id="descripcion"
              rows={4}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Descripción del producto..."
              className={campo}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="precio" className="font-bold">
                Precio en euros *
              </label>
              <input
                id="precio"
                required
                inputMode="decimal"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                placeholder="29,90"
                className={campo}
              />
            </div>

            <div>
              <label htmlFor="stock" className="font-bold">
                Unidades disponibles *
              </label>
              <input
                id="stock"
                type="number"
                min="0"
                step="1"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className={campo}
              />
            </div>
          </div>

          <div>
            <label htmlFor="categoria" className="font-bold">
              Categoría *
            </label>
            <select
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className={campo}
            >
              <option value="Camisetas">Camisetas</option>
              <option value="Sudaderas">Sudaderas</option>
              <option value="Mascarillas">Mascarillas</option>
            </select>
          </div>

          <div>
            <label htmlFor="imagen" className="font-bold">
              URL de la imagen
            </label>
            <input
              id="imagen"
              type="url"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
              placeholder="https://ejemplo.com/imagen.jpg"
              className={campo}
            />
          </div>

          <div>
            <label htmlFor="tallas" className="font-bold">
              Tallas
            </label>
            <input
              id="tallas"
              value={tallas}
              onChange={(e) => setTallas(e.target.value)}
              placeholder="S, M, L, XL"
              className={campo}
            />
            <p className="mt-2 text-xs text-zinc-400">
              Separa las tallas con comas.
            </p>
          </div>

          <div>
            <label htmlFor="colores" className="font-bold">
              Colores
            </label>
            <input
              id="colores"
              value={colores}
              onChange={(e) => setColores(e.target.value)}
              placeholder="Negro, Blanco, Rojo"
              className={campo}
            />
          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={destacado}
              onChange={(e) => setDestacado(e.target.checked)}
              className="h-5 w-5 accent-yellow-500"
            />
            <span className="font-bold">
              Destacar producto en la tienda
            </span>
          </label>

          <label className="flex items-center gap-3">
            <input type="checkbox" checked={activo} onChange={(e) => setActivo(e.target.checked)} className="h-5 w-5 accent-yellow-500" />
            <span className="font-bold">Producto activo en la tienda</span>
          </label>

          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={guardando}
            className="w-full bg-gold px-6 py-4 font-black uppercase text-black disabled:opacity-50"
          >
            {guardando ? "GUARDANDO..." : "GUARDAR CAMBIOS"}
          </button>
        </form>
      </div>
    </main>
  );
}
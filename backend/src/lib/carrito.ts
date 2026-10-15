
export type ItemCarrito = {
  productoId: string;
  talla: string;
  color: string;
  cantidad: number;
};

const CLAVE_CARRITO = "mwe-carrito";

export const EVENTO_CARRITO = "mwe-carrito-actualizado";

function esItemValido(item: unknown): item is ItemCarrito {
  if (typeof item !== "object" || item === null) {
    return false;
  }

  const dato = item as Record<string, unknown>;

  return (
    typeof dato.productoId === "string" &&
    dato.productoId.trim().length > 0 &&
    typeof dato.talla === "string" &&
    typeof dato.color === "string" &&
    typeof dato.cantidad === "number" &&
    Number.isSafeInteger(dato.cantidad) &&
    dato.cantidad > 0
  );
}

export function obtenerCarrito(): ItemCarrito[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const guardado = localStorage.getItem(CLAVE_CARRITO);

    if (!guardado) {
      return [];
    }

    const datos: unknown = JSON.parse(guardado);

    if (!Array.isArray(datos)) {
      return [];
    }

    return datos.filter(esItemValido);
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    return [];
  }
}

export function guardarCarrito(items: ItemCarrito[]): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const itemsValidos = items.filter(esItemValido);

    localStorage.setItem(
      CLAVE_CARRITO,
      JSON.stringify(itemsValidos)
    );

    window.dispatchEvent(new Event(EVENTO_CARRITO));
  } catch (error) {
    console.error("Error al guardar el carrito:", error);
  }
}

export function agregarAlCarrito(
  nuevoItem: ItemCarrito
): void {
  if (!esItemValido(nuevoItem)) {
    return;
  }

  const carrito = obtenerCarrito();

  const existente = carrito.find(
    (item) =>
      item.productoId === nuevoItem.productoId &&
      item.talla === nuevoItem.talla &&
      item.color === nuevoItem.color
  );

  if (existente) {
    existente.cantidad += nuevoItem.cantidad;
  } else {
    carrito.push({ ...nuevoItem });
  }

  guardarCarrito(carrito);
}

export function actualizarCantidad(
  productoId: string,
  talla: string,
  color: string,
  cantidad: number
): void {
  if (!Number.isSafeInteger(cantidad)) {
    return;
  }

  const carrito = obtenerCarrito();

  const actualizado = carrito
    .map((item) => {
      if (
        item.productoId === productoId &&
        item.talla === talla &&
        item.color === color
      ) {
        return { ...item, cantidad };
      }

      return item;
    })
    .filter((item) => item.cantidad > 0);

  guardarCarrito(actualizado);
}

export function eliminarDelCarrito(
  productoId: string,
  talla: string,
  color: string
): void {
  const carrito = obtenerCarrito();

  const actualizado = carrito.filter(
    (item) =>
      !(
        item.productoId === productoId &&
        item.talla === talla &&
        item.color === color
      )
  );

  guardarCarrito(actualizado);
}

export function vaciarCarrito(): void {
  guardarCarrito([]);
}

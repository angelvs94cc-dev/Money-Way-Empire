
export type ItemCarrito = {
  productoId: string;
  talla: string;
  color: string;
  cantidad: number;
};

const CLAVE_CARRITO = "mwe-carrito";

export const EVENTO_CARRITO =
  "mwe-carrito-actualizado";

export function obtenerCarrito(): ItemCarrito[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const guardado = localStorage.getItem(
      CLAVE_CARRITO
    );

    if (!guardado) {
      return [];
    }

    const datos: unknown = JSON.parse(guardado);

    if (!Array.isArray(datos)) {
      return [];
    }

    return datos.filter(
      (item): item is ItemCarrito =>
        typeof item === "object" &&
        item !== null &&
        typeof item.productoId === "string" &&
        item.productoId.length > 0 &&
        typeof item.talla === "string" &&
        typeof item.color === "string" &&
        typeof item.cantidad === "number" &&
        Number.isInteger(item.cantidad) &&
        item.cantidad > 0
    );
  } catch (error) {
    console.error(
      "Error al recuperar el carrito:",
      error
    );

    return [];
  }
}

export function guardarCarrito(
  items: ItemCarrito[]
): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    CLAVE_CARRITO,
    JSON.stringify(items)
  );

  window.dispatchEvent(
    new Event(EVENTO_CARRITO)
  );
}

export function agregarAlCarrito(
  nuevoItem: ItemCarrito
): void {
  if (
    !nuevoItem.productoId ||
    !Number.isInteger(nuevoItem.cantidad) ||
    nuevoItem.cantidad < 1
  ) {
    return;
  }

  const carrito = obtenerCarrito();

  const existente = carrito.find(
    (item) =>
      item.productoId ===
        nuevoItem.productoId &&
      item.talla === nuevoItem.talla &&
      item.color === nuevoItem.color
  );

  if (existente) {
    existente.cantidad +=
      nuevoItem.cantidad;
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
  if (!Number.isInteger(cantidad)) {
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
        return {
          ...item,
          cantidad,
        };
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

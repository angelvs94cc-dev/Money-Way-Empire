type ImagenesPorColor = Record<string, string[]>;

const BASE = "/images/merchandising/money_way_empire_mockups_web";

const galerias: Record<string, ImagenesPorColor> = {
  "camiseta mwe currency": {
    Blanco: [
      `${BASE}/MWE Currency/mwe_camiseta_blanca_frontal.webp`,
    ],
    Negro: [
      `${BASE}/MWE Currency/mwe_camiseta_negra.webp`,
      `${BASE}/MWE Currency/mwe_camiseta_negra_frontal.webp`,
      `${BASE}/MWE Currency/mwe_camiseta_negra_trasera.webp`,
    ],
  },

  "sudadera mwe currency": {
    Blanco: [
      `${BASE}/MWE Currency/mwe_sudadera_blanca.webp`,
      `${BASE}/MWE Currency/mwe_sudadera_blanca_frontal.webp`,
      `${BASE}/MWE Currency/mwe_sudadera_blanca_trasera.webp`,
    ],
    Negro: [
      `${BASE}/MWE Currency/mwe_sudadera_negra.webp`,
      `${BASE}/MWE Currency/mwe_sudadera_negra_frontal.webp`,
      `${BASE}/MWE Currency/mwe_sudadera_negra_trasera.webp`,
    ],
  },

  "camiseta mwe sigil": {
    Blanco: [
      `${BASE}/MWE Sigil/camisetas blancas.png`,
      `${BASE}/MWE Sigil/mwe_camiseta_blanca_frontal.webp`,
      `${BASE}/MWE Sigil/camiseta por detras.png`,
    ],
  },

  "sudadera mwe sigil": {
    Blanco: [
      `${BASE}/MWE Sigil/Mesa de trabajo 1.png`,
      `${BASE}/MWE Sigil/mwe_sudadera_blanca_frontal.webp`,
      `${BASE}/MWE Sigil/sudadera blanca por detras.png`,
    ],
  },
};

export function obtenerGaleriaProducto(
  nombre: string,
  color: string,
  imagenPrincipal?: string | null
): string[] {
  const galeria = galerias[nombre.trim().toLowerCase()];
  const imagenes = galeria?.[color];

  return imagenes?.length
    ? imagenes
    : imagenPrincipal
      ? [imagenPrincipal]
      : [];
}
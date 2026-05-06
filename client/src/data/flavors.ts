/**
 * Mapa de ID de producto → sabores disponibles.
 * Los productos que aparecen aquí muestran sub-contadores por sabor.
 * Los demás siguen con el contador simple.
 */
export const PRODUCT_FLAVORS: Record<number, string[]> = {
  // Hamburguesas Legumbres (x6)
  9: ["Lenteja", "Garbanzo", "Arroz yamaní", "Arvejas", "Verduras c/ Arroz yamaní", "Soja c/ Cebolla caramelizada", "Calabaza c/ avena"],

  // Tartas individuales — Integrales
  18: ["Calabaza c/ Choclo y Queso", "Jamón y Queso", "Cebolla y Queso", "Verdura", "Caprese", "Cebolla Caramelizada", "Roquefort"],

  // Pastafrola individual
  25: ["Membrillo", "Batata", "Ricota"],

  // Tartas individuales — Keto
  45: ["Calabaza c/ Choclo y Queso", "Jamón y Queso", "Cebolla y Queso", "Verdura", "Caprese", "Cebolla Caramelizada", "Roquefort"],

  // Alfajor relleno keto
  46: ["DDL", "Ganache de chocolate"],

  // Alfajor bañado en chocolate keto
  47: ["DDL", "Ganache de chocolate"],

  // Bombón keto
  48: ["DDL", "DDL de arándanos"],

  // Muffins keto
  54: ["Nueces", "Arándanos", "Chocolate"],
};

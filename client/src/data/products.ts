import { Product } from "@shared/schema";

export const PRODUCTS: Product[] = [
  // Panes
  { id: 1, name: "Pan de Masa Madre", category: "Panes", price: 3500, isActive: true },
  { id: 2, name: "Baguette Rústica", category: "Panes", price: 2200, isActive: true },
  { id: 3, name: "Ciabatta (x2)", category: "Panes", price: 1800, isActive: true },
  { id: 4, name: "Pan de Campo", category: "Panes", price: 2800, isActive: true },
  { id: 5, name: "Focaccia de Hierbas", category: "Panes", price: 3200, isActive: true },

  // Keto
  { id: 10, name: "Pan de Almendras Keto", category: "Keto", price: 5500, isActive: true },
  { id: 11, name: "Crackers de Semillas", category: "Keto", price: 2500, isActive: true },
  { id: 12, name: "Brownie Keto", category: "Keto", price: 3000, isActive: true },
  { id: 13, name: "Muffin de Arándanos Keto", category: "Keto", price: 2800, isActive: true },

  // Dulces
  { id: 20, name: "Medialunas de Manteca (docena)", category: "Dulces", price: 4800, isActive: true },
  { id: 21, name: "Alfajor de Maicena (x6)", category: "Dulces", price: 3600, isActive: true },
  { id: 22, name: "Torta de Ricota", category: "Dulces", price: 4200, isActive: true },
  { id: 23, name: "Budín de Limón", category: "Dulces", price: 3500, isActive: true },

  // Combos
  { id: 30, name: "Combo Desayuno (Pan + Medialunas)", category: "Combos", price: 7500, isActive: true },
  { id: 31, name: "Combo Familiar (Surtido)", category: "Combos", price: 12000, isActive: true },
  { id: 32, name: "Combo Keto Semanal", category: "Combos", price: 15000, isActive: true },
];

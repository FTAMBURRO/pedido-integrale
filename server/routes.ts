import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Optional API if they want to move to dynamic data later
  app.get(api.products.list.path, async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  return httpServer;
}

// Simple seed function to populate DB if empty (optional, since frontend uses static data)
async function seedDatabase() {
  const existing = await storage.getProducts();
  if (existing.length === 0) {
    const seedProducts = [
      { name: "Pan de Masa Madre", category: "Panes", price: 3500 },
      { name: "Pan Integral", category: "Panes", price: 3200 },
      { name: "Brownie Keto", category: "Keto", price: 2500 },
      { name: "Alfajor de Maicena", category: "Dulces", price: 1200 },
      { name: "Combo Desayuno", category: "Combos", price: 5500 },
    ];
    for (const p of seedProducts) {
      await storage.createProduct(p);
    }
  }
}

// Call seed in background
seedDatabase().catch(console.error);

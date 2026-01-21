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

// Seed function is optional since we use in-memory storage with static data
// If you add DATABASE_URL later, products will be auto-seeded from @/data/products.ts

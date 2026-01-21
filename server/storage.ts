import { db, hasDatabase } from "./db";
import { products, type Product, type InsertProduct } from "@shared/schema";
import { eq } from "drizzle-orm";
import { PRODUCTS } from "@/data/products";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(): Promise<Product[]> {
    if (!db) throw new Error("Database not configured");
    return await db.select().from(products);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    if (!db) throw new Error("Database not configured");
    const [product] = await db
      .insert(products)
      .values(insertProduct)
      .returning();
    return product;
  }
}

class InMemoryStorage implements IStorage {
  private data: Product[];
  private nextId: number;

  constructor(seed: Product[]) {
    this.data = [...seed];
    this.nextId = seed.reduce((max, item) => Math.max(max, item.id), 0) + 1;
  }

  async getProducts(): Promise<Product[]> {
    return this.data;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const product: Product = {
      id: this.nextId++,
      isActive: true,
      ...insertProduct,
    };

    this.data.push(product);
    return product;
  }
}

export const storage = hasDatabase
  ? new DatabaseStorage()
  : new InMemoryStorage(PRODUCTS);

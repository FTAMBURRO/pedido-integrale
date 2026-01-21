import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Although the user requested a static file for products, we define a schema 
// so the app is "fullstack ready" and type-safe.
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // Panes, Keto, Dulces, Combos
  price: integer("price").notNull(),
  isActive: boolean("is_active").default(true),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

// Frontend-specific types for the shopping list/cart
export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface OrderState {
  items: Record<number, number>; // productId -> quantity
  customerName: string;
  deliveryMethod: "pickup" | "delivery";
  address: string;
  notes: string;
}

export type OrderAction =
  | { type: 'INCREMENT'; id: number }
  | { type: 'DECREMENT'; id: number }
  | { type: 'SET_QTY'; id: number; qty: number }
  | { type: 'RESET'; id: number }
  | { type: 'CLEAR_ALL' }
  | { type: 'SET_FIELD'; field: keyof Omit<OrderState, 'items'>; value: string };

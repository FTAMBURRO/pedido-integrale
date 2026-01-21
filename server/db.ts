import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

export const databaseUrl = process.env.DATABASE_URL;
export const hasDatabase = Boolean(databaseUrl);

// Only initialize Postgres when a DATABASE_URL is provided. This lets the app
// run in a lightweight, in-memory mode for local demos.
export const pool = hasDatabase
  ? new Pool({ connectionString: databaseUrl })
  : null;

export const db = hasDatabase ? drizzle(pool!, { schema }) : null;

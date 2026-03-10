import pool from './pool';

/**
 * Creates the database schema if it does not already exist.
 * Safe to call on every server startup (idempotent).
 */
export async function initDatabase(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id   TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
      email TEXT UNIQUE NOT NULL,
      name  TEXT
    )
  `);
}

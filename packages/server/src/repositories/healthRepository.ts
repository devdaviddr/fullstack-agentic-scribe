import pool from '../db/pool';

/**
 * Repository for simple health checks.  Keeps the SQL in a single place
 * so tests can stub or override the behaviour more easily.
 */
export async function pingDatabase(): Promise<void> {
  await pool.query('SELECT 1');
}

import { Pool } from 'pg';

/** Shared pg connection pool, configured from DATABASE_URL env var. */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;

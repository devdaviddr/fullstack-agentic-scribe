import pool from '../db/pool';
import type { User } from '@shared/index';

/**
 * Database access for users-related queries.
 *
 * Keeping raw SQL calls in the repository layer makes it easier to test
 * and swap out the persistence mechanism later.
 */
export async function getAllUsers(): Promise<User[]> {
  const result = await pool.query<{ id: string; email: string; name: string | null }>(
    'SELECT id, email, name FROM users ORDER BY email'
  );
  return result.rows;
}

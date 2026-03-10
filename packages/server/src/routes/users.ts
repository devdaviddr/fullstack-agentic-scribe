import { Router } from 'express';
import pool from '../db/pool';
import type { UsersResponse, ApiError } from '@shared/index';

const router = Router();

/**
 * GET /api/users
 * Returns all users from the database, ordered by email.
 */
router.get('/', async (_req, res) => {
  try {
    const result = await pool.query<{ id: string; email: string; name: string | null }>(
      'SELECT id, email, name FROM users ORDER BY email'
    );
    const response: UsersResponse = { users: result.rows };
    res.json(response);
  } catch (err) {
    console.error('Error fetching users:', err);
    res
      .status(500)
      .json({ error: 'Internal server error', message: 'Failed to fetch users' } satisfies ApiError);
  }
});

export default router;

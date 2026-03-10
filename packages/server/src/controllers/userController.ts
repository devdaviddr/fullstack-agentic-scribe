import type { Request, Response } from 'express';
import type { UsersResponse, ApiError } from '@shared/index';
import * as userService from '../services/userService';

/**
 * Express handler for GET /api/users.  Pulls data from the service layer
 * and formats the response shape.
 */
export async function getUsersHandler(
  _req: Request,
  res: Response<UsersResponse | ApiError>
): Promise<void> {
  try {
    const users = await userService.fetchUsers();
    res.json({ users });
  } catch (err) {
    console.error('Error fetching users:', err);
    res
      .status(500)
      .json({ error: 'Internal server error', message: 'Failed to fetch users' } satisfies ApiError);
  }
}

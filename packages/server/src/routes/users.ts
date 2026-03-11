import { Router } from 'express';
import type { UsersResponse, ApiError } from '@shared/index';
import { getUsersHandler } from '../controllers/userController';

const router = Router();

/**
 * GET /api/users
 * Returns all users from the database, ordered by email.
 * Delegates to `controllers/userController` for implementation.
 */
router.get<{}, UsersResponse | ApiError>('/', getUsersHandler);

export default router;

import { Router } from 'express';
import type { HealthResponse } from '@shared/index';
import { healthHandler } from '../controllers/healthController';

const router = Router();

/**
 * GET /api/health
 * Returns server and database connectivity status.
 * The actual logic lives in `controllers/healthController.ts`.
 */
router.get<{}, HealthResponse>('/', healthHandler);

export default router;

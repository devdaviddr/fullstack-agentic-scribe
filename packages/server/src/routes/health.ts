import { Router, type Request, type Response } from 'express';
import pool from '../db/pool';
import type { HealthResponse } from '@shared/index';

const router = Router();

/**
 * GET /api/health
 * Returns server and database connectivity status.
 */
router.get<{}, HealthResponse>(
  '/',
  // With the generics on `router.get` we can just pull the standard
  // express types directly instead of doing the `Parameters<>` dance.
  async (_req: Request<{}, HealthResponse>, res: Response<HealthResponse>) => {
  try {
    await pool.query('SELECT 1');
    const response: HealthResponse = {
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString(),
    };
    res.json(response);
  } catch {
    const response: HealthResponse = {
      status: 'degraded',
      database: 'disconnected',
      timestamp: new Date().toISOString(),
    };
    res.status(503).json(response);
  }
});

export default router;

import { Router } from 'express';
import pool from '../db/pool';
import type { HealthResponse } from '@shared/index';

const router = Router();

/**
 * GET /api/health
 * Returns server and database connectivity status.
 */
router.get('/', async (_req, res) => {
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

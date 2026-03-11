import type { Request, Response } from 'express';
import type { HealthResponse } from '@shared/index';
import * as healthService from '../services/healthService';

/**
 * Handler for the health-check route.  Delegates to the service layer and
 * shapes the outgoing JSON.
 */
export async function healthHandler(
  _req: Request,
  res: Response<HealthResponse>
): Promise<void> {
  const status = await healthService.getHealthStatus();
  const response: HealthResponse = {
    status,
    database: status === 'ok' ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  };

  if (status === 'ok') {
    res.json(response);
  } else {
    res.status(503).json(response);
  }
}

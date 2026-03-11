import type { Request, Response } from 'express';
import { healthHandler } from '../controllers/healthController';
import * as healthService from '../services/healthService';
import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest';

describe('healthController.healthHandler', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  const jsonMock = vi.fn();
  const statusMock = vi.fn().mockReturnValue({ json: jsonMock });

  beforeEach(() => {
    req = {};
    res = { status: statusMock as any, json: jsonMock as any };
    vi.restoreAllMocks();
  });

  test('returns 200 when service says ok', async () => {
    vi.spyOn(healthService, 'getHealthStatus').mockResolvedValue('ok');
    await healthHandler(req as Request, res as Response);
    expect(statusMock).not.toHaveBeenCalled();
    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'ok' })
    );
  });

  test('returns 503 when service says degraded', async () => {
    vi.spyOn(healthService, 'getHealthStatus').mockResolvedValue('degraded');
    await healthHandler(req as Request, res as Response);
    expect(statusMock).toHaveBeenCalledWith(503);
    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'degraded' })
    );
  });
});

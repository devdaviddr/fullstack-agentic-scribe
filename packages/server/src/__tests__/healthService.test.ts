import * as healthService from '../services/healthService';
import * as healthRepo from '../repositories/healthRepository';
import { vi, describe, test, expect, beforeEach } from 'vitest';

describe('healthService', () => {
  beforeEach(() => vi.restoreAllMocks());

  test('getHealthStatus returns ok when repo succeeds', async () => {
    vi.spyOn(healthRepo, 'pingDatabase').mockResolvedValue();
    expect(await healthService.getHealthStatus()).toBe('ok');
  });

  test('getHealthStatus returns degraded when repo throws', async () => {
    vi.spyOn(healthRepo, 'pingDatabase').mockRejectedValue(new Error('x'));
    expect(await healthService.getHealthStatus()).toBe('degraded');
  });
});

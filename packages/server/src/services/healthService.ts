import * as healthRepo from '../repositories/healthRepository';

/**
 * Determines the current health status of the application.
 */
export async function getHealthStatus(): Promise<'ok' | 'degraded'> {
  try {
    await healthRepo.pingDatabase();
    return 'ok';
  } catch {
    return 'degraded';
  }
}

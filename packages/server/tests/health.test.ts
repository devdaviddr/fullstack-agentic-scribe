import request from 'supertest';
import app from '../src/index';
import pool from '../src/db/pool';
import { vi, describe, test, expect, afterEach } from 'vitest';

// create a reusable spy for pool.query so we can control its behaviour per test
const querySpy = vi.spyOn(pool, 'query');
querySpy.mockResolvedValue({ rows: [] } as any);

describe('GET /api/health', () => {
  test('responds with ok when database reachable', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('handles database failure gracefully', async () => {
    querySpy.mockRejectedValueOnce(new Error('db down'));
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(503);
    expect(res.body.status).toBe('degraded');
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

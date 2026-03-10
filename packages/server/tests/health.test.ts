import request from 'supertest';
import app from '../src/index';
import pool from '../src/db/pool';
import { vi, describe, test, expect, afterEach } from 'vitest';

// stub the pool to avoid needing a real database
vi.spyOn(pool, 'query').mockResolvedValue({ rows: [] } as any);

describe('GET /api/health', () => {
  test('responds with ok when database reachable', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('handles database failure gracefully', async () => {
    (pool.query as any).mockRejectedValueOnce(new Error('db down'));
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(503);
    expect(res.body.status).toBe('degraded');
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

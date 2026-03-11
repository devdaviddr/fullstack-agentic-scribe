import request from 'supertest';
import app from '../src/index';
import pool from '../src/db/pool';
import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest';

// we will mock console.error inside beforeEach so restoreAllMocks doesn’t clear it

let querySpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  vi.restoreAllMocks();
  vi.spyOn(console, 'error').mockImplementation(() => {});
  querySpy = vi.spyOn(pool, 'query');
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('GET /api/users', () => {
  test('returns users if pool returns rows', async () => {
    querySpy.mockResolvedValue({ rows: [{ id: '1', email: 'a@a.com', name: null }] });
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(res.body.users).toHaveLength(1);
  });

  test('errors if query throws', async () => {
    querySpy.mockRejectedValue(new Error('db fail'));
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('error');
  });
});

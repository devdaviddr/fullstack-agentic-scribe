import pool from '../../db/pool';
import * as userRepo from '../../repositories/userRepository';
import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest';

describe('userRepository', () => {
  let spy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    spy = vi.spyOn(pool, 'query');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('getAllUsers calls correct SQL and returns rows', async () => {
    const fakeRows = [{ id: '1', email: 'a@a.com', name: 'A' }];
    spy.mockResolvedValue({ rows: fakeRows } as any);

    const users = await userRepo.getAllUsers();
    expect(spy).toHaveBeenCalledWith(
      'SELECT id, email, name FROM users ORDER BY email'
    );
    expect(users).toEqual(fakeRows);
  });
});

import * as userService from '../services/userService';
import * as userRepo from '../repositories/userRepository';
import { vi, describe, test, expect } from 'vitest';

describe('userService.fetchUsers', () => {
  beforeEach(() => vi.restoreAllMocks());

  test('returns users provided by repository', async () => {
    const fakeUsers = [{ id: '1', email: 'x@x.com', name: null }];
    vi.spyOn(userRepo, 'getAllUsers').mockResolvedValue(fakeUsers);
    const users = await userService.fetchUsers();
    expect(users).toBe(fakeUsers);
  });

  test('propagates errors from repository', async () => {
    vi.spyOn(userRepo, 'getAllUsers').mockRejectedValue(new Error('fail'));
    await expect(userService.fetchUsers()).rejects.toThrow('fail');
  });
});

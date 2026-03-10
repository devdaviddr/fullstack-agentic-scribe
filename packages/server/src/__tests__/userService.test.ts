import * as userService from '../services/userService';
import * as userRepo from '../repositories/userRepository';
import { vi, describe, test, expect } from 'vitest';

describe('userService.fetchUsers', () => {
  test('returns users provided by repository', async () => {
    const fakeUsers = [{ id: '1', email: 'x@x.com', name: null }];
    vi.spyOn(userRepo, 'getAllUsers').mockResolvedValue(fakeUsers);
    const users = await userService.fetchUsers();
    expect(users).toBe(fakeUsers);
  });
});

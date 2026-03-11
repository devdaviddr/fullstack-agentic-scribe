import type { Request, Response } from 'express';
import { getUsersHandler } from '../controllers/userController';
import * as userService from '../services/userService';
import { vi, describe, test, expect, beforeEach } from 'vitest';

describe('userController.getUsersHandler', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  const jsonMock = vi.fn();
  const statusMock = vi.fn().mockReturnValue({ json: jsonMock });

  beforeEach(() => {
    req = {};
    res = { status: statusMock as any, json: jsonMock as any };
    vi.restoreAllMocks();
  });

  test('returns users on success', async () => {
    const fake = [{ id: '1', email: 'x@x.com', name: null }];
    vi.spyOn(userService, 'fetchUsers').mockResolvedValue(fake as any);
    await getUsersHandler(req as Request, res as Response);
    expect(statusMock).not.toHaveBeenCalled();
    expect(jsonMock).toHaveBeenCalledWith({ users: fake });
  });

  test('sends 500 and error on failure', async () => {
    vi.spyOn(userService, 'fetchUsers').mockRejectedValue(new Error('oops'));
    await getUsersHandler(req as Request, res as Response);
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.any(String) })
    );
  });
});

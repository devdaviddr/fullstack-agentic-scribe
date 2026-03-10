import { Request, Response, NextFunction } from 'express';
import type { ApiError } from '@shared/index';

/**
 * Global Express error-handling middleware.
 * Catches any unhandled errors and returns a JSON error response.
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error(err.stack);
  res
    .status(500)
    .json({ error: 'Internal server error', message: err.message } satisfies ApiError);
}

import type { Request, Response } from 'express';

/**
 * A type-safe Express request handler.
 *
 * Generic parameters mirror Express's own order:
 *   P      - request params type
 *   ResBody - type of the `res.json()` response
 *   ReqBody - request body type
 *   ReqQuery - query string type
 *
 * Only the parameters you care about need to be supplied; everything else
 * defaults to `any` so you don't have to specify unused generics.
 */
export type RouteHandler<
  P = {},
  ResBody = any,
  ReqBody = any,
  ReqQuery = any
> = (
  req: Request<P, ResBody, ReqBody, ReqQuery>,
  res: Response<ResBody>
) => unknown;

/**
 * Convenience helper for typing an Express `Response` when you already
 * know the response body shape but don't care about the request types.
 */
export type TypedResponse<ResBody> = Response<ResBody>;

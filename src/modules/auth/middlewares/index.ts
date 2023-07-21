import { Middleware } from '../types/middleware'

export const withMiddlewares = (...middlewares: Middleware[]): Middleware => {
  // Create chain of middlewares
  const chain = middlewares.reduceRight(
    (next, middleware) => (req, res) => middleware(req, res, next),
    (_req, res) => res.status(200).json({ success: true })
  )
  return chain
}

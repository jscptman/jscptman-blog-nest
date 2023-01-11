import { Request, Response, NextFunction } from 'express';
export function requestLoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(
    `🚀 ~ file: logger.middleware.ts:7 ~ LoggerMiddleware ~ use
    ~Request ${req.method} ${req.url}
    `,
  );
  next();
}

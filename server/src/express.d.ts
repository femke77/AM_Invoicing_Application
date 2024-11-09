import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      pagination?: {
        skip: number;
        take: number;
      };
    }
  }
}

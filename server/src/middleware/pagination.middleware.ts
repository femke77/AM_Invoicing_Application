import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class PaginationMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    req.pagination = {
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
    };

    next();
  }
}

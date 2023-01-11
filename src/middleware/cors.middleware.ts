import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import { ConfigOptions } from 'config/interfaces';
@Injectable()
export class CorsMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService<ConfigOptions, true>,
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    const whiteList = this.configService.get('whiteList', {
      infer: true,
    });
    const origin = req.headers['origin'];
    // console.log(
    //   '🚀 ~ file: cors.middleware.ts:15 ~ CorsMiddleware ~ use ~ req.headers',
    //   req.headers,
    // );
    const matchedItem = whiteList.find((listItem) => listItem === origin);
    if (matchedItem) {
      res.setHeader('Access-Control-Allow-Origin', matchedItem);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    next();
  }
}

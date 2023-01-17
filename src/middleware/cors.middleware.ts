/*
 * @Author: jscptman jscptman@163.com
 * @Date: 2022-12-31 13:51:19
 * @LastEditors: jscptman jscptman@163.com
 * @LastEditTime: 2023-01-16 12:00:54
 * @FilePath: /jscptman-blog-nest/src/middleware/cors.middleware.ts
 * @Description:
 *
 * Copyright (c) 2023 by jscptman jscptman@163.com, All Rights Reserved.
 */
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
    const matchedItem = whiteList.find((listItem) => listItem === origin);
    if (matchedItem) {
      res.setHeader('Access-Control-Allow-Origin', matchedItem);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    next();
  }
}

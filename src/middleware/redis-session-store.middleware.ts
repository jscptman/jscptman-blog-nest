/*
 * @Author: jscptman jscptman@163.com
 * @Date: 2023-01-13 12:07:39
 * @LastEditors: jscptman jscptman@163.com
 * @LastEditTime: 2023-01-17 12:58:49
 * @FilePath: /jscptman-blog-nest/src/middleware/redis-session-store.middleware.ts
 * @Description:
 *
 * Copyright (c) 2023 by jscptman jscptman@163.com, All Rights Reserved.
 */
import { type ConfigService } from '@nestjs/config';
import { ConfigOptions } from 'config/interfaces';
import * as session from 'express-session';
import s = require('connect-redis');
import { type RequestHandler } from 'express';
import { CustomCacheProvider } from 'src/common/cache/custom-cache.provider';

export const redisSessionStoreFactory = async (
  configService: ConfigService<ConfigOptions, true>,
  customCacheProvider: CustomCacheProvider,
): Promise<RequestHandler> => {
  const redisClient_db_2 = await customCacheProvider.getDbClient(2);
  const RedisStore = s(session);
  const redisStore = new RedisStore({
    client: redisClient_db_2 as unknown as s.Client,
    disableTouch: true,
    ttl: 86400,
  });
  return session({
    store: redisStore,
    ...configService.get('sessionOptions'),
  });
};

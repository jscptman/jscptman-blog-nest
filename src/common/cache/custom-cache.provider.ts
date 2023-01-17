/*
 * @Author: jscptman jscptman@163.com
 * @Date: 2023-01-13 12:07:39
 * @LastEditors: jscptman jscptman@163.com
 * @LastEditTime: 2023-01-17 13:01:40
 * @FilePath: /jscptman-blog-nest/src/common/cache/custom-cache.provider.ts
 * @Description:
 *
 * Copyright (c) 2023 by jscptman jscptman@163.com, All Rights Reserved.
 */
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';
import { ConfigOptions } from 'config/interfaces';
import { Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
@Injectable()
export class CustomCacheProvider {
  private readonly redisClient_db_1: RedisClientType;
  private readonly redisClient_db_2: RedisClientType;
  constructor(
    private readonly configService: ConfigService<ConfigOptions, true>,
  ) {
    const redisConfig = configService.get('db.redis', {
      infer: true,
    });
    const { ttl, name, ...otherConfig } = redisConfig;
    this.redisClient_db_1 = createClient(
      Object.assign({}, redisConfig, {
        database: 1,
      }),
    );
    this.redisClient_db_2 = createClient({
      name,
      socket: otherConfig,
      database: 2,
      legacyMode: true,
    });
  }

  async getDbClient(
    this: Record<string, any>,
    dbIndex: 1 | 2 | 0,
  ): Promise<RedisClientType> {
    const clientName = `redisClient_db_${dbIndex}` as const;
    if (!this[clientName].isReady) {
      await this[clientName].connect();
    }
    return this[clientName];
  }
}

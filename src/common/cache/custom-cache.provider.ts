import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';
import { ConfigOptions } from 'config/interfaces';
import { Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
@Injectable()
export class CustomCacheProvider {
  private readonly redisClient_db_1: RedisClientType;
  constructor(
    private readonly configService: ConfigService<ConfigOptions, true>,
  ) {
    this.redisClient_db_1 = createClient(
      Object.assign({}, configService.get('db.redis', { infer: true }), {
        database: 1,
      }),
    );
  }
  async getVerificationInstance() {
    if (!this.redisClient_db_1.isReady) {
      await this.redisClient_db_1.connect();
    }
    return this;
  }
  getDbClient_1() {
    return this.redisClient_db_1;
  }
}

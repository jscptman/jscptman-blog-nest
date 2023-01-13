import { type ConfigService } from '@nestjs/config';
import { ConfigOptions } from 'config/interfaces';
import { type RedisClientType, createClient } from 'redis';
import * as session from 'express-session';
import s = require('connect-redis');
import { type RequestHandler } from 'express';

export const redisSessionStoreFactory = (
  configService: ConfigService<ConfigOptions, true>,
): RequestHandler => {
  const { ttl, name, ...otherConfig } = configService.get('db.redis', {
    infer: true,
  });
  const redisClient: RedisClientType = createClient({
    legacyMode: true,
    socket: otherConfig,
    name,
    database: 3,
  });
  redisClient.connect().catch(console.error);
  const RedisStore = s(session);
  const redisStore = new RedisStore({
    client: redisClient as unknown as s.Client,
  });
  return session({
    store: redisStore,
    ...configService.get('sessionOptions'),
  });
};

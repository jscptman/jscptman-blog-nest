import { Module, CacheModule } from '@nestjs/common';
import { routes } from './routes';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { ConfigOptions } from '../config/interfaces';
import configuration from '../config';
import { redisStore } from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import { RouterModule } from '@nestjs/core';
import AdminModule from './admin/index.module';
import WwwModule from './www/index.module';
import { LoggerModule } from './common/logger/logger.module';
import winston = require('winston');
import DailyRotateFile = require('winston-daily-rotate-file');
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [
    AdminModule,
    WwwModule,
    RouterModule.register(routes),
    ConfigModule.forRoot({
      load: [configuration],
      cache: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigOptions, true>) => {
        const { type, host, port, username, password, database, synchronize } =
          configService.get('db.mysql', { infer: true });
        return {
          type,
          host,
          port,
          username,
          password,
          database,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize,
        };
      },
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      inject: [ConfigService],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      useFactory: async (configService: ConfigService<ConfigOptions, true>) => {
        const { host, port } = configService.get('db.redis', {
          infer: true,
        });
        const store = await redisStore({
          socket: {
            host,
            port,
          },
          ttl: 5,
          database: 0,
        });
        return {
          store: () => store,
        };
      },
    }),
    LoggerModule.forRootAsync({
      global: true,
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const customFormat = winston.format.combine(
          winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
          winston.format.align(),
          winston.format.printf(
            (info) =>
              `${info.level}: ${[info.timestamp]}: ${info.context ?? ''} ${
                info.message
              } ${info.stack ?? ''}`,
          ),
        );
        return {
          format: customFormat,
          transports: [
            new DailyRotateFile({
              format: customFormat,
              filename: 'logs/error-%DATE%.log',
              datePattern: 'YYYY-MM-DD',
              level: 'error',
              zippedArchive: true,
              maxSize: '20m',
              maxFiles: '14d',
            }),
          ],
          silent: configService.get('env') === 'production' ? true : false,
        };
      },
    }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigOptions, true>) => ({
        ttl: configService.get('throttleOptions.ttl', { infer: true }),
        limit: configService.get('throttleOptions.limit', { infer: true }),
      }),
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}

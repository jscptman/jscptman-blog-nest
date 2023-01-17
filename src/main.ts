/*
 * @Author: jscptman jscptman@163.com
 * @Date: 2022-12-27 13:23:09
 * @LastEditors: jscptman jscptman@163.com
 * @LastEditTime: 2023-01-16 19:47:11
 * @FilePath: /jscptman-blog-nest/src/main.ts
 * @Description:
 *
 * Copyright (c) 2023 by jscptman jscptman@163.com, All Rights Reserved.
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionsFilter } from './filters';
import { ResponseTransformInterceptor } from './interceptors';
import { ConfigService } from '@nestjs/config';
import { ConfigOptions } from 'config/interfaces';
import { LoggerProvider } from './common/logger/logger.provider';
import { validationPipeFactory } from './pipes';
import * as compression from 'compression';
import { redisSessionStoreFactory } from './middleware';
import { setupSwaggerDocument } from './common/docs/swagger.doc';
import { CustomCacheProvider } from './common/cache/custom-cache.provider';
import helmet from 'helmet';
import * as fs from 'fs';
import * as path from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: fs.readFileSync(path.join(__dirname, '../secrets/agent2-key.pem')),
      cert: fs.readFileSync(path.join(__dirname, '../secrets/agent2-cert.pem')),
    },
  });
  const configService = app.get(ConfigService<ConfigOptions, true>);
  const loggerProvider = app.get(LoggerProvider);
  const customCacheProvider = app.get(CustomCacheProvider);
  setupSwaggerDocument(app, configService.get('swaggerOptions')); // 生成swagger文档
  app.enableCors(configService.get('corsOptions', { infer: true })); // 开启全局cors
  // app.use(helmet()); //保证这条代码在所有use之前运行, 注册helmet
  app.use(compression()); // 开启响应体压缩
  app.use(await redisSessionStoreFactory(configService, customCacheProvider)); // 开启sessionStore
  app.useGlobalFilters(new HttpExceptionsFilter(loggerProvider)); // 注册全局异常过滤器, 用来在错误日志中进行记录
  app.useGlobalPipes(validationPipeFactory(configService)); // 注册全局验证管道
  app.useGlobalInterceptors(new ResponseTransformInterceptor()); // 开启全局响应拦截器, 规范响应数据格式

  await app.listen(configService.get('app.httpsPort', { infer: true }));
}

bootstrap();

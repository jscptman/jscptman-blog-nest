import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestLoggerMiddleware } from './middleware';
import { HttpExceptionsFilter } from './filters';
import { ResponseTransformInterceptor } from './interceptors';
import { ConfigService } from '@nestjs/config';
import { ConfigOptions } from 'config/interfaces';
import { LoggerProvider } from './common/logger/logger.provider';
import { validationPipeFactory } from './pipes';
import * as compression from 'compression';
import { redisSessionStoreFactory } from './middleware';
import { setupSwaggerDocument } from './common/docs/swagger.doc';
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

  setupSwaggerDocument(app, configService.get('swaggerOptions')); // 生成swagger文档
  app.enableCors(configService.get('corsOptions', { infer: true })); // 开启全局cors
  app.use(helmet()); //保证这条代码在所有use之前运行, 注册helmet
  app.use(RequestLoggerMiddleware); // 注册全局requestLogger中间件
  app.use(compression()); // 开启响应体压缩
  app.use(redisSessionStoreFactory(configService)); // 开启sessionStore
  app.useGlobalFilters(new HttpExceptionsFilter(loggerProvider)); // 注册全局异常过滤器, 用来在错误日志中进行记录
  app.useGlobalPipes(validationPipeFactory(configService)); // 注册全局验证管道
  app.useGlobalInterceptors(new ResponseTransformInterceptor()); // 开启全局响应拦截器, 规范响应数据格式

  await app.listen(configService.get('app.httpsPort', { infer: true }));
}

bootstrap();

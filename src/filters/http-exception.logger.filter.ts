/*
 * @Author: jscptman jscptman@163.com
 * @Date: 2022-12-29 22:54:03
 * @LastEditors: jscptman jscptman@163.com
 * @LastEditTime: 2023-01-16 12:00:43
 * @FilePath: /jscptman-blog-nest/src/filters/http-exception.logger.filter.ts
 * @Description:
 *
 * Copyright (c) 2023 by jscptman jscptman@163.com, All Rights Reserved.
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { LoggerProvider } from 'src/common/logger/logger.provider';
import CustomException from 'src/common/exceptions/custom-exceptions.classes';

@Catch()
export class HttpExceptionsFilter implements ExceptionFilter {
  constructor(private readonly loggerService: LoggerProvider) {}
  catch(exception: HttpException | CustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    if (exception instanceof HttpException) {
      // HTTP 异常不记录
      const statusCode = exception.getStatus();
      const message = exception.message;
      const error = exception.name;
      response.status(statusCode).json({
        statusCode,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
        error,
      });
    } else {
      console.log(
        '🚀 ~ file: http-exception.logger.filter.ts:30 ~ HttpExceptionsFilter ~ exception',
        exception,
      );
      this.loggerService.error(
        exception.getMessage(),
        exception.getContext(),
        exception.getStack(),
      );
      response.status(500).end();
    }
  }
}

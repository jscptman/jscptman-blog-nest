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
    console.log(
      '🚀 ~ file: http-exception.logger.filter.ts:14 ~ HttpExceptionsFilter ~ exception',
      exception,
    );
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

import { LoggerService, Injectable, Inject } from '@nestjs/common';
import { Logger, LoggerOptions, createLogger } from 'winston';
import { MODULE_OPTIONS_TOKEN } from './logger.module-definition';
@Injectable()
export class LoggerProvider implements LoggerService {
  private context?: string;
  private readonly logger: Logger;
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private readonly loggerOptions: LoggerOptions,
  ) {
    this.logger = createLogger(loggerOptions);
  }

  public setContext(context: string) {
    this.context = context;
  }

  public log(message: any, context?: string): any {
    context = context || this.context;

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.info(msg as string, { context, ...meta });
    }

    return this.logger.info(message, { context });
  }

  public error(message: any, context?: string, trace?: string): any {
    context = context || this.context;

    if (message instanceof Error) {
      const { message: msg, name, stack, ...meta } = message;

      return this.logger.error(msg, {
        context,
        stack: [trace || message.stack],
        ...meta,
      });
    }

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.error(msg as string, {
        context,
        stack: [trace],
        ...meta,
      });
    }

    return this.logger.error(message, { context, stack: [trace] });
  }

  public warn(message: any, context?: string): any {
    context = context || this.context;

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.warn(msg as string, { context, ...meta });
    }

    return this.logger.warn(message, { context });
  }
}

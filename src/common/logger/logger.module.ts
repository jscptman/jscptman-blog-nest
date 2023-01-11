import { Module } from '@nestjs/common';
import { LoggerProvider } from './logger.provider';
import { ConfigurableModuleClass } from './logger.module-definition';
@Module({
  providers: [LoggerProvider],
  exports: [LoggerProvider],
})
export class LoggerModule extends ConfigurableModuleClass {}

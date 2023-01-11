import { ModuleMetadata } from '@nestjs/common';
import { LoggerOptions } from 'winston';

export interface LoggerModuleOptions
  extends Pick<ModuleMetadata, 'imports'>,
    LoggerOptions {}

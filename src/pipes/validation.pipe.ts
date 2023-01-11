import { ValidationPipe } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import { ConfigOptions } from 'config/interfaces';

export const validationPipeFactory = (
  configService: ConfigService<ConfigOptions, true>,
) =>
  new ValidationPipe({
    disableErrorMessages:
      configService.get('env', { infer: true }) === 'production' ? true : false,
    whitelist: true,
    transform: true,
  });

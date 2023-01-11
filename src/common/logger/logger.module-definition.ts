import { ConfigurableModuleBuilder } from '@nestjs/common';
import { LoggerModuleOptions } from './interfaces';
export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<LoggerModuleOptions>()
    .setExtras(
      {
        global: false,
        imports: [],
      },
      (definition, extras) => ({
        ...definition,
        global: extras.global,
        imports: extras.imports,
      }),
    )
    .setClassMethodName('forRoot')
    .build();

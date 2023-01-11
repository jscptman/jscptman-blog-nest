import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwaggerDocument(
  app: INestApplication,
  envOptions: Record<string, any>,
) {
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const config = new DocumentBuilder()
    .setTitle(envOptions.title)
    .setDescription(envOptions.description)
    .setVersion(envOptions.version)
    .build();

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);
}

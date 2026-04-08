import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  process.on('uncaughtException', (error) => {
    console.error('[AuthService] uncaughtException', error);
  });

  process.on('unhandledRejection', (reason) => {
    console.error('[AuthService] unhandledRejection', reason);
  });
  const app = await NestFactory.create(ApiGatewayModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  const config = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Document Builder')
    .setDescription('Document Builder')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, swaggerDocument, {
    yamlDocumentUrl: '/openapi.yaml',
  });

  const host = config.getOrThrow<string>('HOST');
  const port = config.getOrThrow<string>('GATEWAY_PORT');
  await app.listen(port, host, () =>
    console.log(`Listening on ${host}:${port}`),
  );
}
bootstrap();

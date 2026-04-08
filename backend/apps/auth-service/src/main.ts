import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import { SERVICES_PORTS } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuthServiceModule);
  const config = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  const host = config.getOrThrow<string>('HOST');
  const port = config.getOrThrow<number>('AUTH_PORT');
  await app.listen(port, host, () =>
    console.log(`Listening on ${host}:${port}`),
  );
}
bootstrap();

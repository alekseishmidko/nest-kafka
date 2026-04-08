import { NestFactory } from '@nestjs/core';
import { EventsServiceModule } from './events-service.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(EventsServiceModule);
  const config = app.get(ConfigService);
  const host = config.getOrThrow<string>('HOST');
  const port = config.getOrThrow<number>('EVENTS_PORT');
  await app.listen(port, host, () =>
    console.log(`Listening on ${host}:${port}`),
  );
}
bootstrap();

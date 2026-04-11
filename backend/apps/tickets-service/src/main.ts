import { NestFactory } from '@nestjs/core';
import { TicketsServiceModule } from './tickets-service.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(TicketsServiceModule);
  const config = app.get(ConfigService);
  const host = config.getOrThrow<string>('HOST');
  const port = config.getOrThrow<number>('TICKETS_PORT');
  await app.listen(port, host, () =>
    console.log(`Listening on ${host}:${port}`),
  );
}
bootstrap();

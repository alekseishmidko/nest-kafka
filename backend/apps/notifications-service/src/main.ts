import { NestFactory } from '@nestjs/core';
import { NotificationsServiceModule } from './notifications-service.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KAFKA_BROKER, KAFKA_CLIENT_ID } from '@app/kafka';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsServiceModule);

  // connect kafka microservices for consuming events
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: `${KAFKA_CLIENT_ID}-notifications`,
        brokers: [KAFKA_BROKER],
      },
      consumer: {
        groupId: `notifications-consumer-group`,
      },
    },
  });

  // start microservices (kafka consumer)
  await app.startAllMicroservices();

  const config = app.get(ConfigService);
  const host = config.getOrThrow<string>('HOST');
  const port = config.getOrThrow<number>('NOTIFICATIONS_PORT');
  await app.listen(port, host, () =>
    console.log(`Notifications Listening on ${host}:${port}`),
  );
}
bootstrap();

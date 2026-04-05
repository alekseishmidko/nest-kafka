import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import { SERVICES_PORTS } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthServiceModule);
  console.log(`http://localhost:${SERVICES_PORTS.AUTH_SERVICE}`);

  await app.listen(3201);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';

async function bootstrap() {
  console.log(`Server is running on http://localhost:${6001}`);
  const app = await NestFactory.create(AuthServiceModule);
  await app.listen(process.env.port ?? 6001);
}
bootstrap();

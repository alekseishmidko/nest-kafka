import { Module } from '@nestjs/common';
import { TicketsServiceController } from './tickets-service.controller';
import { TicketsServiceService } from './tickets-service.service';
import { KafkaModule } from '@app/kafka';
import { DatabaseModule } from '@app/database';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `.env.${process.env.NODE_ENV}.local`,
        `.env.${process.env.NODE_ENV}`,
        '.env',
      ],
    }),
    KafkaModule.register('tickets-service-group'),
    DatabaseModule,
  ],
  controllers: [TicketsServiceController],
  providers: [TicketsServiceService],
})
export class TicketsServiceModule {}

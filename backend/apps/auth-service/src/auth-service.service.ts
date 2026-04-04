import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { KAFKA_SERVICE, KAFKA_TOPICS } from '@app/kafka';

import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AuthServiceService implements OnModuleInit {
  constructor(@Inject(KAFKA_SERVICE) private readonly kafka: ClientKafka) {}

  async onModuleInit(): Promise<void> {
    await this.kafka.connect();
  }

  async simulateUserRegistration() {
    this.kafka.emit(KAFKA_TOPICS.USER_REGISTERED, {
      email: '123@asa',
      timestamp: new Date().toISOString(),
    });

    return { message: 'User registered' };
  }
}

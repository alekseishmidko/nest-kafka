import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { sql } from 'drizzle-orm';
import { Pool } from 'pg';

import * as schema from './schema';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);

  private readonly pool: Pool;
  public readonly db: NodePgDatabase<typeof schema>;

  constructor(private readonly configService: ConfigService) {
    const connectionString =
      this.configService.getOrThrow<string>('DATABASE_URL');

    this.pool = new Pool({
      connectionString,
    });

    this.db = drizzle(this.pool, { schema });
  }

  async onModuleInit(): Promise<void> {
    try {
      await this.pool.query('SELECT 1');
      this.logger.log('[Database] PostgreSQL connected successfully');
    } catch (error) {
      this.logger.error('[Database] PostgreSQL connection failed', error);
      throw error;
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
    this.logger.log('[Database] PostgreSQL connection closed');
  }

  get schema() {
    return schema;
  }
}

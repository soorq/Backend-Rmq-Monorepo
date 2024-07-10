import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { POST_SERVICE } from './contants/service';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { RmqModule } from '@lib/common';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_URI: Joi.string().optional(),
        PORT: Joi.string().required(),
      }),
      envFilePath: './apps/root_app/.env',
    }),
    ThrottlerModule.forRoot([
      { name: 'short', limit: 5, ttl: 1000 },
      { name: 'long', limit: 100, ttl: 60000 },
    ]),
    RmqModule.register({ name: POST_SERVICE }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}

import { AuthModule } from '@lib/common/auth/auth.module';
import { PostController } from './post.controller';
import { ConfigModule } from '@nestjs/config';
import { PostService } from './post.service';
import { RmqModule } from '@lib/common';
import { Module } from '@nestjs/common';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBITMQ_URI: Joi.string().optional(),
        RABBITMQ_POST_QUEUE: Joi.string().optional(),
      }),
      envFilePath: './apps/post/.env',
    }),
    RmqModule,
    AuthModule,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}

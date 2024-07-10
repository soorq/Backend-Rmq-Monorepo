import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { RmqModule } from '@lib/common';
import { Module } from '@nestjs/common';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
      }),
      envFilePath: './apps/auth/.env',
    }),
    RmqModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

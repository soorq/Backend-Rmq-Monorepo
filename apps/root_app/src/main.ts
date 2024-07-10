import type { NestExpressApplication } from "@nestjs/platform-express";
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');

  const cfg = new ConfigService();

  await app.listen(cfg.get('PORT'), () =>
    console.log(`Server running on port: ${cfg.get('PORT')}`),
  );
}
bootstrap();

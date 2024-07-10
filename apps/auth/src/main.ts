import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { RmqService } from '@lib/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const rmq = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmq.getOptions('AUTH', true));
  await app.startAllMicroservices();
  const cfg = new ConfigService();
  await app.listen(cfg.get('PORT'), () =>
    console.log(`Server running on port: ${cfg.get('PORT')}`),
  );
}
bootstrap();

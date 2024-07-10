import { NestFactory } from '@nestjs/core';
import { PostModule } from './post.module';
import { RmqService } from '@lib/common';

async function bootstrap() {
  const app = await NestFactory.create(PostModule);
  const rmq = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmq.getOptions('POST'));
  await app.startAllMicroservices();
}
bootstrap();

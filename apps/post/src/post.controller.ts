import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@lib/common/rmq/rmq.service';
import { Controller } from '@nestjs/common';
import { PostService } from './post.service';

@Controller()
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern('say_hello')
  async handleSayHello(@Payload() data: any, @Ctx() ctx: RmqContext) {
    this.postService.getHello(data);
    this.rmqService.ack(ctx);
  }
}

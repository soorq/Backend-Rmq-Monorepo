import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { POST_SERVICE } from "./contants/service";

@Injectable()
export class AppService {
  constructor(
    @Inject(POST_SERVICE) private postClient: ClientProxy,
  ) {}

  async getHello(): Promise<string> {
    this.postClient.emit('say_hello', {
      name: 'value iam sending',
    });

    return 'Main_app DONE';
  }
}

import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PostService {
  private readonly logg = new Logger(PostService.name);

  getHello(data: any): string {
    this.logg.log('Post', data);
    return 'Hello World!';
  }
}

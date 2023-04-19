import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerRepository {
  getHello(): string {
    return 'Hello World!';
  }
}

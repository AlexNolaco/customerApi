import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { CustomerDTO } from './dtos/customerDTO';

@Injectable()
export class CustomersService {
  
  async createCustomer(customer) {
    customer.id = uuid();

    //persistence
    return customer;
  }

  getCustomerById(): string {
    return 'Hello World!';
  }

  updateCustomerById(): string {
    return 'Hello World!';
  }

}

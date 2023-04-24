import { Injectable } from '@nestjs/common';
import { CustomersRepository } from './customers.repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CustomersService {
  constructor(private readonly customersRepository: CustomersRepository) { }

  async createCustomer(customer) {
    customer.id = uuidv4();
    let result = await this.customersRepository.createCustomer(customer);
    return result;
  }

  async getCustomerById(id) {
    const result = await this.customersRepository.getCustomerById(id);
    return result;
  }

  async updateCustomerById(id, customer) {
    const result = await this.customersRepository.updateCustomerById(id, customer);
    return result;
  }
}

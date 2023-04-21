import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Redis } from "ioredis"

@Injectable()
export class CustomersService {

  async createCustomer(customer) {
    const redis = new Redis();
    customer.id = uuidv4();
    await redis.set(`customer:${customer.id}`, JSON.stringify(customer));
    return customer;
  }

  async getCustomerById(id) {
    const redis = new Redis();
    const customer = await redis.get(`customer:${id}`, (err, result) => {
      if (err) 
        return (err);
      return result;
    });
    return JSON.parse(customer);
  }

  async updateCustomerById(id, customer) {
    const redis = new Redis();
    let result = await this.getCustomerById(id);
    if (!result) 
      return result;
    else {
      await redis.set(`customer:${id}`, JSON.stringify(customer)); 
      return customer; 
    }
  }
}

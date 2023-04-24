const config = require('../config/app.config');
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis'

@Injectable()
export class CustomersRepository {
  redisInstance: Redis;

  getInstance() {
    if (this.redisInstance)
      return this.redisInstance;
    else {
      this.redisInstance = new Redis({
        port: config.redis_port, 
        host: config.redis_host 
      });
      return this.redisInstance;
    }
  }

  async createCustomer(customer) {
    this.getInstance();
    await this.redisInstance.set(`customer:${customer.id}`, JSON.stringify(customer));
    return customer;
  }

  async getCustomerById(id) {
    this.getInstance();
    const customer = await this.redisInstance.get(`customer:${id}`, (err, result) => {
      if (err)
        return (err);
      return result;
    });
    return JSON.parse(customer);
  }

  async updateCustomerById(id, customer) {
    this.getInstance();
    let result = await this.getCustomerById(id);
    if (!result)
      return result;
    else {
      await this.redisInstance.set(`customer:${id}`, JSON.stringify(customer));
      return customer;
    }
  }
}

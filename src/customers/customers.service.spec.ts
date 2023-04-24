import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { CreateCustomerRequestModel } from './models/createCustomerRequest';
import { Response } from 'express';
import { CustomersRepository } from './customers.repository';
import { UpdateCustomerRequestModel } from './models/updateCustomerRequest';

class CustomersRepositoryMock {
  async createCustomer(customer: any) {
    return {
      'document': 45973631060,
      'name': 'Alex Sander Nolaço da Silveira',
      'id': '165ec741-53c4-4034-adac-962c70324979'
    };
  }

  async getCustomerById(id: any) {
    return {
      'document': 45973631060,
      'name': 'Alex Sander Nolaço da Silveira',
      'id': '165ec741-53c4-4034-adac-962c70324979'
    };
  }

  async updateCustomerById(id: any, customer: any) {
    return {
      'document': 45973631060,
      'name': 'Alex Sander Nolaço da Silveira',
      'id': '165ec741-53c4-4034-adac-962c70324979'
    };
  }
}

describe('CustomersService Unit Tests', () => {
  let customersService: CustomersService;
  const CustomerRepositoryProvider = {
    provide: CustomersRepository,
    useClass: CustomersRepositoryMock,
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersService],
      providers: [CustomersRepository, CustomerRepositoryProvider],
    }).compile();
    customersService = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', async () => {
    expect(customersService).toBeDefined();
  });

  describe('createCustomer', () => {
    it('should return', async () => {
      const expected = {
        'document': 45973631060,
        'name': 'Alex Sander Nolaço da Silveira',
        'id': '165ec741-53c4-4034-adac-962c70324979'
      };
      let customer =  new CreateCustomerRequestModel();
      customer.name = "Alex Sander Nolaço da Silveira";
      customer.document = 45973631060;
      const result = await customersService.createCustomer(customer);
      expect(result).toEqual(expected);
    });
  });

  describe('updateCustomerById', () => {
    it('should return', async () => {
      const expected = {
        'document': 45973631060,
        'name': 'Alex Sander Nolaço da Silveira',
        'id': '165ec741-53c4-4034-adac-962c70324979'
      };
      const customer =  new UpdateCustomerRequestModel();
      customer.name = 'Alex Sander Nolaço da Silveira';
      customer.document = 45973631060;
      customer.id = '165ec741-53c4-4034-adac-962c70324979'
      const result = await customersService.updateCustomerById(customer.id, customer);
      expect(result).toEqual(expected);
    });
  });
  describe('getCustomerById', () => {
    it('should return', async () => {
      const expected = {
        'document': 45973631060,
        'name': 'Alex Sander Nolaço da Silveira',
        'id': '165ec741-53c4-4034-adac-962c70324979'
      };
      const id = '165ec741-53c4-4034-adac-962c70324979';
      const result = await customersService.getCustomerById(id);
      expect(result).toEqual(expected);
    });
  });
});


import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CreateCustomerRequestModel } from './models/createCustomerRequest';
import { Response } from 'express';
import { UpdateCustomerRequestModel } from './models/updateCustomerRequest';

describe('CustomersController Unit Tests', () => {
  let customersController: CustomersController;
  const CustomerServiceProvider = {
    provide: CustomersService,
    useClass: CustomersServiceMock,
  };
  const requestMock = new CreateCustomerRequestModel();
  const statusResponseMock = {
    send: jest.fn((x) => x),
  }
  const responseMock = {
    status: jest.fn((x) => statusResponseMock),
    send: jest.fn((x) => x)
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [CustomersService, CustomerServiceProvider],
    }).compile();
    customersController = module.get<CustomersController>(CustomersController);
  });

  it('should be defined', async () => {
    expect(customersController).toBeDefined();
  });

  describe('endpoint createCustomer Unit Tests', () => {
    it('should return', async () => {
      const expected = {
        'document': 45973631060,
        'name': 'Alex Sander Nolaço da Silveira',
        'id': '165ec741-53c4-4034-adac-962c70324979'
      };
      const result = await customersController.createCustomer(requestMock, responseMock);
      expect(result).toEqual(expected);
    });
  });

  describe('endpoint getCustomerById Unit Tests', () => {
    it('should return', async () => {
      const expected = {
        'document': 45973631060,
        'name': 'Alex Sander Nolaço da Silveira',
        'id': '165ec741-53c4-4034-adac-962c70324979'
      };
      const result = await customersController
        .getCustomerById('165ec741-53c4-4034-adac-962c70324979', responseMock);
      expect(result).toEqual(expected);
    });
  });

  it('badGatewayMessage', async () => {
    const expected = {
      'error': 'Bad Gateway',
      'message': 'cache indisponível',
      'statusCode': 502,
    };
    const result = await customersController.badGatewayMessage(responseMock);
    expect(result).toEqual(expected);
  });

  describe('endpoint updateCustomerById Unit Tests', () => {
    it('should return conflict id', async () => {
      const expected = {
        'error': 'Conflict',
        'message': 'conflito de ID',
        'statusCode': 409,
      };
      var mock = new UpdateCustomerRequestModel();
      const result = await customersController
      .updateCustomerById('165ec741-53c4-4034-adac-962c70324979', mock, responseMock);
      expect(result).toEqual(expected);
    });

    it('should return customer', async () => {
      const expected = {
        'document': 45973631060,
        'name': 'Alex Sander Nolaço da Silveira',
        'id': '165ec741-53c4-4034-adac-962c70324979'
      };
      var mock = new UpdateCustomerRequestModel();
      mock.id = '165ec741-53c4-4034-adac-962c70324979';
      const result = await customersController
        .updateCustomerById('165ec741-53c4-4034-adac-962c70324979', mock, responseMock);
      expect(result).toEqual(expected);
    });
  });
});

class CustomersServiceMock {
  async createCustomer(req: any, res: any) {
    return {
      'document': 45973631060,
      'name': 'Alex Sander Nolaço da Silveira',
      'id': '165ec741-53c4-4034-adac-962c70324979'
    };
  }

  async getCustomerById(id: any, res: any) {
    return {
      'document': 45973631060,
      'name': 'Alex Sander Nolaço da Silveira',
      'id': '165ec741-53c4-4034-adac-962c70324979'
    };
  }

  async updateCustomerById(id: any, req: any, res: any) {
    return {
      'document': 45973631060,
      'name': 'Alex Sander Nolaço da Silveira',
      'id': '165ec741-53c4-4034-adac-962c70324979'
    };
  }
}
import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

describe('CustomersController', () => {
  let CustomersController: CustomersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [CustomersService],
    }).compile();

    CustomersController = app.get<CustomersController>(CustomersController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(CustomersController.getHello()).toBe('Hello World!');
    });
  });
});

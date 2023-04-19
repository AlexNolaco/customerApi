import { Controller, Get, Post, Body } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getHello(): string {
    return this.customerService.getHello();
  }

  @Post()
  async createAdminUser(@Body() createUserDto) {
    //const user = await this.usersService.createAdminUser(createUserDto);
    return {
      message: 'Administrador cadastrado com sucesso',
    };
  }
}

import { Body, Controller, Get, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Response } from 'express';
import { CustomerDTO } from './dtos/customerDTO';

@Controller('customers')
export class CustomersController {
  constructor(private readonly CustomersService: CustomersService) {}
  
  @Post()
  createCustomer(@Req() req: Request, @Res() res: Response): any {
    let result = this.CustomersService.createCustomer(req.body)
    .then((customer) => res.status(HttpStatus.OK).send(customer))
    .catch((err) => console.log(err));
  }

  @Put(':id')
  updateCustomerById(@Param('id') id: string) {
    return this.CustomersService.updateCustomerById();
  }

  @Get(':id')
  getCustomerById(@Param('id') id: string)   {
    return this.CustomersService.getCustomerById();
  }

}

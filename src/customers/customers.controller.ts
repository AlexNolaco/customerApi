import { Controller, Get, HttpStatus, Param, Post, Put, Req, Res, Logger } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Request, Response, NextFunction } from 'express';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }

  @Post()
  createCustomer(@Req() req: Request, @Res() res: Response): any {
    Logger.log('[POST] createCustomer endpoint');
    return this.customersService.createCustomer(req.body)
      .then((customer) => {
        Logger.log('Customer created!')
        res.status(HttpStatus.CREATED).send(customer)
      })
      .catch((err) => {
        Logger.error('Customer not created!')
        res.status(HttpStatus.BAD_GATEWAY).send('cache indisponível')
      });
  }

  @Put(':id')
  updateCustomerById(@Param('id') id: string, @Req() req: Request, @Res() res: Response): any {
    Logger.log('[PUT] updateCustomerById endpoint');
    return this.customersService.updateCustomerById(id, req.body)
      .then((customer) => res.status(HttpStatus.CREATED).send(customer))
      .catch((err) => res.status(HttpStatus.BAD_GATEWAY).send('cache indisponível'));
  }

  @Get(':id')
  getCustomerById(@Param('id') id: string, @Res() res: Response) {
    return this.customersService.getCustomerById(id)
      .then((customer) => res.status(HttpStatus.OK).send(customer))
      .catch((err) => res.status(HttpStatus.BAD_GATEWAY).send('cache indisponível'));;
  }
}

import { Controller, Get, HttpStatus, Param, Post, Put, Req, Res, Logger } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Request, Response, NextFunction } from 'express';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }

  @Post() //preciso de auth
  createCustomer(@Req() req: Request, @Res() res: Response): any {
    Logger.log("Teste");
    return this.customersService.createCustomer(req.body)
      .then((customer) => res.status(HttpStatus.CREATED).send(customer))
      .catch((err) => {
        Logger.error(err);
        res.status(HttpStatus.BAD_GATEWAY).send('cache indisponível')
      });
  }

  @Put(':id')
  updateCustomerById(@Param('id') id: string, @Req() req: Request, @Res() res: Response): any {
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

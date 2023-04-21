import { Controller, Get, HttpStatus, Param, Post, Put, Req, Res, Logger } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Request, Response, NextFunction } from 'express';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }

  @Post()
  createCustomer(@Req() req: Request, @Res() res: Response): any {
    Logger.log('[POST] createCustomer endpoint');
    this.customersService.createCustomer(req.body)
      .then((customer) => {
        Logger.log('Customer created')
        return res.status(HttpStatus.CREATED).send(customer)
      })
      .catch((err) => {
        Logger.error('Customer not created')
        return res.status(HttpStatus.BAD_GATEWAY).send('cache indisponível')
      });
  }

  @Get(':id')
  getCustomerById(@Param('id') id: string, @Res() res: Response) {
    Logger.log('[GET] getCustomerById endpoint');
    this.customersService.getCustomerById(id)
      .then((customer) => {
        if (!customer) {
          Logger.warn('Customer not found');
          return res.status(HttpStatus.NOT_FOUND).send("cliente inexistente");
        } else {
          Logger.log('Customer returned')
          return res.status(HttpStatus.OK).send(customer);
        }
      })
      .catch((err) => {
        res.status(HttpStatus.BAD_GATEWAY).send('cache indisponível')
      });
  }

  @Put(':id')
  updateCustomerById(@Param('id') id: string, @Req() req: Request, @Res() res: Response): any {
    Logger.log('[PUT] updateCustomerById endpoint');

    if (id !== req.body.id) {
      Logger.warn('Id Conflict');
      return res.status(HttpStatus.CONFLICT).send('conflito de ID')
    }
    this.customersService.updateCustomerById(id, req.body)
      .then((customer) => {
        if (!customer) {
          Logger.warn('Customer not found');
          return res.status(HttpStatus.NOT_FOUND).send("cliente inexistente");
        } else {
          Logger.log('Customer updated')
          return res.status(HttpStatus.OK).send(customer)
        }
      })
      .catch((err) => {
        Logger.error('Customer not updated')
        return res.status(HttpStatus.BAD_GATEWAY).send('cache indisponível');
      });
  }
}

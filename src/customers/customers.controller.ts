import { Controller, Get, HttpStatus, Param, Post, Put, Res, Logger, Body } from '@nestjs/common';
import { Response } from 'express';
import { CustomersService } from './customers.service';
import { CreateCustomerRequestModel } from './models/createCustomerRequest';
import { UpdateCustomerRequestModel } from './models/updateCustomerRequest';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }

  @Post()
  @ApiResponse({ status: 201, description: 'customer' })
  @ApiResponse({ status: 401, description: 'não autorizado' })
  @ApiResponse({ status: 400, description: 'request inválida' })
  @ApiResponse({ status: 502, description: 'cache indisponível / sso indisponivel' })
  createCustomer(@Body() req: CreateCustomerRequestModel, @Res() res: Response): any {
    return this.customersService.createCustomer(req)
      .then((customer) => {
        return res.status(HttpStatus.CREATED).send(customer);
      })
      .catch((err) => {
        return this.badGatewayMessage(res);
      });
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'customer' })
  @ApiResponse({ status: 401, description: 'não autorizado' })
  @ApiResponse({ status: 400, description: 'request inválida' })
  @ApiResponse({ status: 502, description: 'cache indisponível / sso indisponivel' })
  getCustomerById(@Param('id') id: string, @Res() res: Response): any {
    return this.customersService.getCustomerById(id)
      .then((customer) => {
        if (!customer) {
          return res.status(HttpStatus.NOT_FOUND).send({
            'statusCode': HttpStatus.NOT_FOUND,
            'message': 'cliente inexistente',
            'error': 'Not Found'
          });
        } else {
          return res.status(HttpStatus.OK).send(customer);
        }
      })
      .catch((err) => {
        return this.badGatewayMessage(res);
      });
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'customer' })
  @ApiResponse({ status: 401, description: 'não autorizado' })
  @ApiResponse({ status: 400, description: 'request inválida' })
  @ApiResponse({ status: 502, description: 'cache indisponível / sso indisponivel' })
  updateCustomerById(@Param('id') id: string, @Body() req: UpdateCustomerRequestModel, @Res() res: Response): any {
    if (id !== req.id) {
      return res.status(HttpStatus.CONFLICT).send({
        'statusCode': HttpStatus.CONFLICT,
        'message': 'conflito de ID',
        'error': 'Conflict'
      });
    }
    return this.customersService.updateCustomerById(id, req)
      .then((customer) => {
        if (!customer) {
          return res.status(HttpStatus.NOT_FOUND).send({
            'statusCode': HttpStatus.NOT_FOUND,
            'message': 'cliente inexistente',
            'error': 'Not Found'
          });
        } else {
          return res.status(HttpStatus.OK).send(customer);
        }
      })
      .catch((err) => {
        return this.badGatewayMessage(res);
      });
  }

  badGatewayMessage(res) {
    return res.status(HttpStatus.BAD_GATEWAY).send({
      'statusCode': HttpStatus.BAD_GATEWAY,
      'message': 'cache indisponível',
      'error': 'Bad Gateway'
    });
  }
}
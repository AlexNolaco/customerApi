import { Module, NestModule, MiddlewareConsumer, RequestMethod  } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';

@Module({
  imports: [],
  controllers: [CustomersController],
  providers: [CustomersService],
})

export class CustomersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude()
      .forRoutes({ path: 'customers', method: RequestMethod.POST })
      
  }
}

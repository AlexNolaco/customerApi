/* istanbul ignore file */
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors: ValidationError[]) => 
      new BadRequestException('request inválida'),
  }));
  const config = new DocumentBuilder()
    .setTitle('Customer API')
    .setDescription('Stone NodeJS Backend Developer Challenge - Alex Sander Nolaço da Silveira')
    .setVersion('1.0.0')
    .build();
  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true
  };
  
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('/', app, document);
  await app.listen(3000);
}
bootstrap();

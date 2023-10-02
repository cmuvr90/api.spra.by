import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.setGlobalPrefix('api/v1');

  const adminApiConfig = new DocumentBuilder()
    .setTitle('SPRABY API')
    .setDescription('spra.by api documentations')
    .setVersion('1.0')
    .build();
  const adminApiDocument = SwaggerModule.createDocument(app, adminApiConfig);
  SwaggerModule.setup('', app, adminApiDocument);

  const configService = app.get(ConfigService);

  await app.listen(configService.get('port'));
}

bootstrap();

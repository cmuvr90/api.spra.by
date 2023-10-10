import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { I18nValidationPipe } from 'nestjs-i18n';
import { I18nValidationExceptionFilter } from 'nestjs-i18n';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new I18nValidationPipe(), new ValidationPipe());
  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      detailedErrors: false,
    }),
  );
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
  console.log(`Started ${configService.get('host')}:${configService.get('port')}`);
}

bootstrap();

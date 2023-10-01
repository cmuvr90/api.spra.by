import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('process.env.PORT = ', process.env);
  await app.listen(process.env.PORT);
}

bootstrap();

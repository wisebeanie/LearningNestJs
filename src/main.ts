import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )
  Sentry.init({
    dsn:
      'https://8cbff84606c649e182db27fe10232e73@o576862.ingest.sentry.io/5730939',
  });
  await app.listen(3000);
}
bootstrap();

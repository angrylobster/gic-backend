import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppExceptionFilter } from './app.filters';
import {
  AppLoggingInterceptor,
  AppResponseBodyInterceptor,
} from './app.interceptors';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(
    new AppLoggingInterceptor(),
    new AppResponseBodyInterceptor(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalFilters(new AppExceptionFilter());
  await app.listen(3000);
}
bootstrap();

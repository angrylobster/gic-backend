import { NestFactory } from '@nestjs/core';
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
  await app.listen(3000);
}
bootstrap();

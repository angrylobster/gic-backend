import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppExceptionFilter } from './app.filters';
import {
  AppLoggingInterceptor,
  AppResponseBodyInterceptor,
} from './app.interceptors';
import { AppModule } from './app.module';
import { MongoConfigService } from './config/mongo-config.service';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  loadGlobals(app);
  const mongoConfigService = app.get(MongoConfigService);
  if (mongoConfigService.isUsingMemoryServer) {
    await seedDB(app);
  }
  await app.listen(3000);
}

function loadGlobals(app: INestApplication) {
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
}

async function seedDB(app: INestApplication) {
  const seedService = await app.get(SeedService);
  await seedService.seed();
}

bootstrap();

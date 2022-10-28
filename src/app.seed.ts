import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed/seed.module';
import { SeedService } from './seed/seed.service';

async function seed() {
  const seedModule = await NestFactory.create(SeedModule);
  const logger = new Logger();
  const seedService = seedModule.get(SeedService);
  await seedService.seed();
  logger.log('Seed script was successful');
  await seedModule.close();
  logger.log('Closed connection to DB');
}

seed();

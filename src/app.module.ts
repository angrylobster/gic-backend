import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DrinksModule } from './drinks/drinks.module';
import { CafesModule } from './cafes/cafes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeesModule } from './employees/employees.module';
import { ConfigModule } from '@nestjs/config';
import { MongoConfigModule } from './config/mongo-config.module';
import { MongoConfigService } from './config/mongo-config.service';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CafesModule,
    DrinksModule,
    EmployeesModule,
    MongooseModule.forRootAsync({
      imports: [MongoConfigModule],
      useFactory: async (mongoConfigService: MongoConfigService) => ({
        uri: await mongoConfigService.getMongoUri(),
      }),
      inject: [MongoConfigService],
    }),
    SeedModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DrinksModule } from './drinks/drinks.module';
import { CafesModule } from './cafes/cafes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeesModule } from './employees/employees.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    DrinksModule,
    CafesModule,
    MongooseModule.forRoot('mongodb://localhost', { dbName: 'gic-backend' }),
    EmployeesModule,
    SeedModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

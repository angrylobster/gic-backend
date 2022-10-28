import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Cafe, CafeSchema } from '../cafes/cafes.schema';
import { MongoConfigModule } from '../config/mongo-config.module';
import { MongoConfigService } from '../config/mongo-config.service';
import { Employee, EmployeeSchema } from '../employees/employee.schema';
import { SeedService } from './seed.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [MongoConfigModule],
      useFactory: async (mongoConfigService: MongoConfigService) => ({
        uri: await mongoConfigService.getMongoUri(),
      }),
      inject: [MongoConfigService],
    }),
    MongooseModule.forFeature([
      {
        name: Cafe.name,
        schema: CafeSchema,
        collection: Cafe.name,
      },
      {
        name: Employee.name,
        schema: EmployeeSchema,
        collection: Employee.name,
      },
    ]),
  ],
  providers: [SeedService],
})
export class SeedModule {}

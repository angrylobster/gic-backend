import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cafe, CafeSchema } from '../cafes/cafes.schema';
import { Employee, EmployeeSchema } from '../employees/employee.schema';
import { SeedService } from './seed.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost', { dbName: 'gic-backend' }),
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

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cafe, CafeSchema } from './cafes.schema';
import { CafesController } from './cafes.controller';
import { CafesService } from './cafes.service';
import { Employee, EmployeeSchema } from '../employees/employee.schema';
import { EmployeesService } from '../employees/employees.service';

@Module({
  imports: [
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
  controllers: [CafesController],
  providers: [CafesService, EmployeesService],
})
export class CafesModule {}

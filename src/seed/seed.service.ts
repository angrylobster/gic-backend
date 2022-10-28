import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cafe, CafeDocument } from '../cafes/cafes.schema';
import { Employee, EmployeeDocument } from '../employees/employee.schema';
import * as CAFE_SEED from './seed.cafes.json';
import * as EMPLOYEES_SEED from './seed.employees.json';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Cafe.name) private readonly cafeModel: Model<CafeDocument>,
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  async seed() {
    await this.dropCollections();
    await Promise.all([
      this.cafeModel.insertMany(CAFE_SEED),
      this.employeeModel.insertMany(EMPLOYEES_SEED),
    ]);
  }

  private async dropCollections() {
    await Promise.all([
      this.cafeModel.deleteMany({}),
      this.employeeModel.deleteMany({}),
    ]);
  }
}

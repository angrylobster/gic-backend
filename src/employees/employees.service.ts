import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from './employee.schema';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  getAllEmployees() {
    return this.employeeModel.aggregate([
      { $match: {} },
      {
        $lookup: {
          from: 'Cafe',
          localField: 'cafe',
          foreignField: '_id',
          as: 'cafe',
        },
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          name: 1,
          days_worked: 1,
          cafe: '$cafe.name',
        },
      },
      {
        $unwind: {
          path: '$cafe',
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
  }
}

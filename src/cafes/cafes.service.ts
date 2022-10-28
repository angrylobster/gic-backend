import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from '../employees/employee.schema';
import { AddEmployeeDto, FindCafeQueryDto } from './cafes.interfaces';
import { Cafe, CafeDocument } from './cafes.schema';

@Injectable()
export class CafesService {
  constructor(
    @InjectModel(Cafe.name) private readonly cafeModel: Model<CafeDocument>,
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  findAll(query: FindCafeQueryDto) {
    return this.cafeModel.aggregate([
      {
        $match: query,
      },
      {
        $project: {
          _id: 0,
          name: 1,
          description: 1,
          logo: 1,
          location: 1,
          id: '$_id',
          employees: {
            $size: '$employees',
          },
        },
      },
    ]);
    // return this.cafeModel
    //   .find(query)
    //   .populate('employees', null, Employee.name)
    //   .sort({ employees: -1 });
  }

  async createOne(payload: any) {
    const cafe = new this.cafeModel(payload);
    const newCafe = await cafe.save();
    return newCafe.toJSON();
  }

  findById(id: string) {
    return this.cafeModel.findById(id);
  }

  async addEmployeeToCafe(payload: AddEmployeeDto) {
    const [cafe, employee] = await Promise.all([
      this.cafeModel.findById(payload.cafeId),
      this.employeeModel.findById(payload.employeeId),
    ]);

    if (!cafe || !employee)
      throw new NotFoundException('Could not find cafe or employee');

    if (cafe.employees.includes(employee.id))
      throw new BadRequestException('Cafe already has this employee');

    if (employee.cafe)
      throw new BadRequestException('Employee is already working at a cafe');

    cafe.employees.push(employee);
    employee.cafe = cafe;

    await Promise.all([cafe.save(), employee.save()]);

    return cafe;
  }
}

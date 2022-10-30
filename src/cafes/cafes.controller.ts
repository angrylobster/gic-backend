import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EmployeesService } from '../employees/employees.service';
import {
  AddEmployeeDto,
  CreateCafeDto,
  FindCafeQueryDto,
} from './cafes.interfaces';
import { CafesService } from './cafes.service';

@Controller()
export class CafesController {
  constructor(
    private readonly cafeService: CafesService,
    private readonly employeeService: EmployeesService,
  ) {}

  @Get('/cafes')
  findAll(@Query() query: FindCafeQueryDto) {
    return this.cafeService.findAll(query);
  }

  @Post('/cafe')
  createOne(@Body() payload: CreateCafeDto) {
    return this.cafeService.createOne(payload);
  }

  @Get('/cafes/employees')
  getEmployees() {
    return this.employeeService.getAllEmployees();
  }

  @Get('/cafe/:id')
  findById(@Param('id') id: string) {
    return this.cafeService.findById(id);
  }

  @Post('/cafe/employee')
  addEmployeeToCafe(@Body() payload: AddEmployeeDto) {
    return this.cafeService.addEmployeeToCafe(payload);
  }
}

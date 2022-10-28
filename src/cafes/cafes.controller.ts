import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  AddEmployeeDto,
  CreateCafeDto,
  FindCafeQueryDto,
} from './cafes.interfaces';
import { CafesService } from './cafes.service';

@Controller('cafes')
export class CafesController {
  constructor(private readonly cafeService: CafesService) {}

  @Get('/')
  findAll(@Query() query: FindCafeQueryDto) {
    return this.cafeService.findAll(query);
  }

  @Post('/')
  createOne(@Body() payload: CreateCafeDto) {
    return this.cafeService.createOne(payload);
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.cafeService.findById(id);
  }

  @Post('/employee')
  addEmployeeToCafe(@Body() payload: AddEmployeeDto) {
    return this.cafeService.addEmployeeToCafe(payload);
  }
}

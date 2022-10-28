import { IsOptional, IsString } from 'class-validator';

export class CreateCafeDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  logo: string;

  @IsString()
  location: string;
}

export class FindCafeQueryDto {
  @IsString()
  @IsOptional()
  location: string;
}

export class AddEmployeeDto {
  @IsString()
  employeeId: string;

  @IsString()
  cafeId: string;
}

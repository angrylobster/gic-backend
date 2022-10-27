import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { DrinkDto, DrinksQueryDto } from './drinks.interfaces';
import { DrinksService } from './drinks.service';

@Controller('drinks')
export class DrinksController {
  constructor(private readonly drinksService: DrinksService) {}

  @Get('/')
  async getDrinksByType(@Query() query: DrinksQueryDto): Promise<DrinkDto[]> {
    return await this.drinksService.getDrinks(query.type);
  }
}

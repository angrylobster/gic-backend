import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DrinksController } from './drinks.controller';
import { DrinksService } from './drinks.service';

@Module({
  controllers: [DrinksController],
  imports: [HttpModule.register({})],
  providers: [DrinksService],
})
export class DrinksModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DrinksModule } from './drinks/drinks.module';

@Module({
  imports: [DrinksModule],
  controllers: [AppController],
})
export class AppModule {}

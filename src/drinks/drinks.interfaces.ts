import { Expose, Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import {
  generateDrinkUUID,
  getAverageRating,
  getDescription,
  getDrinkName,
  getPrice,
} from './drinks.utils';

export enum EDrinkType {
  Coffee = 'coffee',
  Beer = 'beer',
}

export interface SampleApiBeerRating {
  average: number;
  reviews: number;
}

export interface SampleApiCoffee {
  title: string;
  description: string;
  id: number;
  image: string;
}

export interface SampleApiBeer {
  name: string;
  price: string;
  rating: SampleApiBeerRating;
  image: string;
  id: number;
}

export type SampleApiDrink = SampleApiBeer & SampleApiCoffee;

export class DrinksQueryDto {
  @IsEnum(EDrinkType)
  @IsOptional()
  type?: EDrinkType;
}

export class DrinkDto {
  @Transform(({ obj: drink }) => getDrinkName(drink))
  @Expose()
  name: string;

  @Expose()
  @Transform(({ obj: drink }) => getPrice(drink))
  price: string;

  @Transform(({ obj: drink }) => getAverageRating(drink))
  @Expose()
  rating: number;

  @Transform(({ obj: drink }) => getDescription(drink))
  @Expose()
  description: string;

  @Expose()
  image: string;

  @Expose()
  @Transform(({ obj: drink }) => generateDrinkUUID(drink))
  id: string;
}

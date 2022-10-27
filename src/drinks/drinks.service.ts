import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { firstValueFrom } from 'rxjs';
import { DrinkDto, EDrinkType, SampleApiCoffee } from './drinks.interfaces';

@Injectable()
export class DrinksService {
  private readonly SAMPLE_API_DRINKS_URL = 'https://api.sampleapis.com';
  private readonly RANDOM_COFFEE_IMAGE_URL =
    'https://coffee.alexflipnote.dev/random.json';

  constructor(private readonly httpService: HttpService) {}

  async getDrinks(drink?: EDrinkType) {
    const [beers, coffees] = await Promise.all([
      !drink || drink === EDrinkType.Beer ? this.getBeers() : [],
      !drink || drink === EDrinkType.Coffee ? this.getCoffees() : [],
    ]);

    const formattedDrinks = plainToInstance(DrinkDto, [...beers, ...coffees], {
      excludeExtraneousValues: true,
    });

    return formattedDrinks.sort((firstDrink, secondDrink) =>
      this.sortByRatingDescending(firstDrink, secondDrink),
    );
  }

  private async getBeers() {
    const { data: beers } = await firstValueFrom(
      this.httpService.get(`${this.SAMPLE_API_DRINKS_URL}/beers/ale`),
    );
    return beers;
  }

  private async getCoffees() {
    const [{ data: coffees }, { data: coffeeImageResponse }] =
      await Promise.all([
        firstValueFrom(
          this.httpService.get<SampleApiCoffee[]>(
            `${this.SAMPLE_API_DRINKS_URL}/coffee/hot`,
          ),
        ),
        firstValueFrom(this.httpService.get(this.RANDOM_COFFEE_IMAGE_URL)),
      ]);
    const { file } = coffeeImageResponse;
    return coffees.map((coffee) => ({ ...coffee, image: file }));
  }

  private sortByRatingDescending(
    firstDrink: DrinkDto,
    secondDrink: DrinkDto,
  ): number {
    if (firstDrink.rating < secondDrink.rating) return 1;
    if (firstDrink.rating > secondDrink.rating) return -1;
    return 0;
  }
}

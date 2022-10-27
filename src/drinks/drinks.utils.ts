import {
  BEER_DESCRIPTION_MAP,
  BEER_NAME_TYPE_MAP,
  BEER_SUBSTRING_MAP,
  COFFEE_PRICE_MAXIMUM,
  COFFEE_PRICE_MINIMUM,
  DRINK_RATING_DECIMAL_PLACES,
  DRINK_RATING_MAXIMUM,
  PRICE_DECIMAL_PLACES,
} from './drinks.constants';
import { DrinkDto, SampleApiDrink } from './drinks.interfaces';
import { v5 as uuid } from 'uuid';

const UUID_HASH = '1b671a64-40d5-491e-99b0-da01ff1f3341';

export function getDrinkName(drink: SampleApiDrink) {
  return drink.name || drink.title;
}

export function getAverageRating(drink: SampleApiDrink) {
  return drink.rating
    ? drink.rating.average.toFixed(DRINK_RATING_DECIMAL_PLACES)
    : generateRandomNumber(DRINK_RATING_MAXIMUM).toFixed(
        DRINK_RATING_DECIMAL_PLACES,
      );
}

export function getDescription(drink: SampleApiDrink) {
  if (drink.title) return drink.title;

  const beerName = drink.name;
  const mappedBeerType = BEER_NAME_TYPE_MAP[beerName];
  if (mappedBeerType) return BEER_DESCRIPTION_MAP[mappedBeerType];

  for (const substring in BEER_SUBSTRING_MAP) {
    if (beerName.includes(substring))
      return BEER_DESCRIPTION_MAP[BEER_SUBSTRING_MAP[substring]];
  }

  return '';
}

export function getPrice(drink: SampleApiDrink) {
  return (
    drink.price ||
    `$${generateRandomNumber(
      COFFEE_PRICE_MAXIMUM,
      COFFEE_PRICE_MINIMUM,
    ).toFixed(PRICE_DECIMAL_PLACES)}`
  );
}

export function generateRandomNumber(maxValue: number, minValue = 0) {
  return +(Math.random() * (maxValue - minValue) + minValue);
}

export function sortByRatingDescending(
  firstDrink: DrinkDto,
  secondDrink: DrinkDto,
): number {
  if (firstDrink.rating < secondDrink.rating) return 1;
  if (firstDrink.rating > secondDrink.rating) return -1;
  return 0;
}

export function generateDrinkUUID(drink: SampleApiDrink) {
  return uuid(`${drink.id}-${drink.name}`, UUID_HASH);
}

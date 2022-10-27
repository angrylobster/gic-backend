import { CallHandler, Injectable, NestInterceptor } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs';
import { DrinkDto } from './drinks.interfaces';

@Injectable()
export class DrinkResponseInterceptor implements NestInterceptor {
  intercept(_: unknown, handler: CallHandler) {
    return handler.handle().pipe(
      map((data: unknown) => {
        return plainToInstance(DrinkDto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { AppResponse } from './app.interfaces';

@Injectable()
export class AppLoggingInterceptor implements NestInterceptor {
  private logger = new Logger();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTimestamp = Date.now();
    return next.handle().pipe(
      map((value) => {
        this.logger.debug(
          JSON.stringify(value),
          `${context.switchToHttp().getRequest().route?.path} ${
            Date.now() - startTimestamp
          }ms`,
        );
        return value;
      }),
    );
  }
}

@Injectable()
export class AppResponseBodyInterceptor<T>
  implements NestInterceptor<T, AppResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<AppResponse<T>> {
    return next.handle().pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        data,
      })),
    );
  }
}

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { standardResponse } from './interfaces';

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, standardResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<standardResponse<T>> {
    return next.handle().pipe(
      map((data) => ({
        data,
        code: 200,
        message: 'OK',
      })),
    );
  }
}

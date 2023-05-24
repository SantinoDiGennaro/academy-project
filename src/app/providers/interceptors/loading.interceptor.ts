import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize, tap } from 'rxjs';
import { UtilsService } from '../services/utils.service';

interface ResponseModel<T> {
  data: T;
  error: Error;
  message: string;
}

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  counter = 0;

  constructor(private readonly utils: UtilsService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.counter) {
      this.utils.loading$.next(true);
    }
    this.counter++;

    return next.handle(req).pipe(
      finalize(() => {
        this.counter--;
        if (this.counter) {
          this.utils.loading$.next(false);
        }
      })
    );
  }
}

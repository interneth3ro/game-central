import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (localStorage.getItem('profile')) {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${JSON.parse(localStorage.getItem('profile') || '{}').token}`)
      });

      return next.handle(authReq);
    }
    return next.handle(request);
  }
}

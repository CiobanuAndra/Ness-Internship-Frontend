import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const modifiedRequest = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
      },
    });

    return next.handle(modifiedRequest)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'Something bad happened; Please try again later.';
          if (error.error instanceof ErrorEvent) {
            //client-side errors
            errorMessage = `Error: ${error.error.message}`;
          } else {
            //server-side errors
            if (error.status === 422) {
              errorMessage = 'User with this email already exists';
            } else {
              errorMessage = `Error Status: ${error.status} Message: ${error.message}`;
            }
          }
          return throwError(() => new Error(errorMessage));
        })
      )
  };
};

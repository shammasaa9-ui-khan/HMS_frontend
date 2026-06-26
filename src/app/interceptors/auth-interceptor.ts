import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  let clonedReq = req;

  if (typeof window !== 'undefined' && window.localStorage) {
    const token = localStorage.getItem('token');
    
    if (token) {
      clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  }

  return next(clonedReq).pipe(
    catchError((error: any) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401 && !req.url.includes('/api/auth/login') && !req.url.includes('/api/auth/register')) {
          // Token expired or invalid -> Auto Logout
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
          alert('Your session has expired. Please log in again.');
          router.navigate(['/login']);
        }
      }
      return throwError(() => error);
    })
  );
};

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  if (typeof window !== 'undefined' && window.localStorage) {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
  }
  
  // Store the attempted URL for redirecting
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('redirectAfterLogin', state.url);
  }
  
  router.navigate(['/login']);
  return false;
};

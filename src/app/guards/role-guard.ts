import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const expectedRoles = route.data['roles'] as Array<string>;
  
  if (typeof window !== 'undefined' && window.localStorage) {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (expectedRoles.includes(user.role)) {
          return true;
        }
      } catch (e) {
        console.error('Failed to parse user from local storage');
      }
    }
  }
  
  router.navigate(['/unauthorized']);
  return false;
};

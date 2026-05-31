import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRoles = route.data?.['roles'] as Array<string>;

  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  const userRole = authService.getUserRole();
  if (!userRole || !expectedRoles.includes(userRole)) {
    if (userRole === 'CLIENT') router.navigate(['/client']);
    else if (userRole === 'ADMIN') router.navigate(['/admin']);
    else if (userRole === 'RECEPTIONIST') router.navigate(['/receptionist']);
    else router.navigate(['/']);
    return false;
  }
  return true;
};
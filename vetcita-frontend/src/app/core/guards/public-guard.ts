import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const publicGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    const role = authService.getUserRole();

    if (role === 'ROLE_CLIENT' || role === 'CLIENT') {
      router.navigate(['/client/citas']);
    } else if (role === 'ROLE_ADMIN' || role === 'ADMIN') {
      router.navigate(['/admin/dashboard']);
    } else if (role === 'ROLE_RECEPTIONIST' || role === 'RECEPTIONIST') {
      router.navigate(['/recepcionist/dashboard']);
    } else if (role === 'ROLE_VET' || role === 'VET') {
      router.navigate(['/vet/agenda']);
    } else {
      router.navigate(['/admin/dashboard']);
    }
    
    return false;
  }

  return true;
};

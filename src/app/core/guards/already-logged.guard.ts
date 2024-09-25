import { AuthService } from './../services/auth/auth.service';
import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

export const alreadyLoggedGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  const token = authService.getAccessToken()

  if (!token) {
    return true
  }

  return authService.validateToken(token).pipe(
    map((isValid) =>{
      if (isValid) {
        router.navigate(['/secure'])
      }
      return !isValid
    }),
    catchError(() => {
      return of(true)
    })
  )
};

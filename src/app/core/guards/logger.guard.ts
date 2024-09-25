import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { catchError, map, of, switchMap } from 'rxjs';

export const LoggerGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getAccessToken();

  if (!token){
    router.navigate(['/login']);
    return false;
  }

  if (authService.isTokenExpired(token)){
    console.log('Token expired. Refreshing...');
    authService.refreshAccessToken().pipe(
      switchMap(newToken =>{
        if (newToken){
          return of(true)
        }else{
          router.navigate(['/login']);
          return of(false);
        }
      })
    )
  }

  return authService.validateToken(token).pipe(
    map(isValid => {
      if (!isValid) {
        router.navigate(['/login']);
      }
      return isValid;
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};

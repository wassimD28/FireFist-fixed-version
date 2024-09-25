import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoggerGuard } from './core/guards/logger.guard';
import { alreadyLoggedGuard } from './core/guards/already-logged.guard';


export const routes: Routes = [
  {
    path: 'secure',
    loadComponent: () => import('./pages/layout/layout.component').then((c) => c.LayoutComponent),
    canMatch: [LoggerGuard],
    children: [
      {
        path: 'exercises',
        loadComponent: () => import('./pages/exercise-index/exercise-index.component').then((c) => c.ExerciseIndexComponent),
        canMatch: [LoggerGuard],
      },
      {
        path: 'show-exer',
        loadComponent: () => import('./pages/exercise-show/exercise-show.component').then((c) => c.ExerciseShowComponent),
      }
    ]
  },
  {
    path: 'login',
    loadComponent: ()=> import('./pages/login/login.component').then((c) => c.LoginComponent),
    canMatch: [alreadyLoggedGuard]
  },
  {
    path: 'register',
    loadComponent: ()=> import('./pages/register/register.component').then((c) => c.RegisterComponent),
    canMatch: [alreadyLoggedGuard]
  },
  { path: '**', redirectTo: 'login' }
];


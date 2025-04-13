import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./Pages/Auth/Login/Login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./Pages/Auth/Register/Register.page').then((m) => m.RegisterPage),
  },
];

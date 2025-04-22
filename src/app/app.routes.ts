import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('@Features/auth/pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('@Features/auth/pages/register/register.page').then(
        (m) => m.RegisterPage
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('../app/features/profile/pages/profile/profile.page').then(
        (m) => m.ProfilePage
      ),
  },
];

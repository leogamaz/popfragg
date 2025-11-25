import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Login',
    data: {
      showHeader: false,
    },
    loadComponent: () =>
      import('@Features/auth/pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'login/steamcallback',
    title: 'Steam Callback',
    data: {
      showHeader: false,
    },
    loadComponent: () =>
      import('@Features/auth/pages/steam-callback/steam-callback.component').then((m) => m.SteamCallbackComponent),
  },
  {
    path: 'register',
    title: 'Register',
    data: {
      showHeader: false,
    },
    loadComponent: () =>
      import('@Features/auth/pages/register/register.page').then(
        (m) => m.RegisterPage
      ),
  },
  {
    path: 'profile',
    title: 'Profile',
    data: {
      showHeader: true,
    },
    loadComponent: () =>
      import('../app/features/profile/pages/profile/profile.page').then(
        (m) => m.ProfilePage
      ),
  },
  {
    path: 'nades',
    children: [
      {
        path: '',
        title: 'Nades',
        loadComponent: () =>
          import('../app/features/nades/pages/nades/nades.page').then(
            (m) => m.NadesPage
          ),
      },
      {
        path: ':mapName',
        title: 'Nades Detail',
        loadComponent: () =>
          import('../app/features/nades/pages/nades/nades.page').then(
            (m) => m.NadesPage
          ),
      }
    ]
  },
  {
    path: '',
    loadComponent: () =>
      import('../app/features/home/home/home.page').then(
        (m) => m.HomePage
      ),
  },
];

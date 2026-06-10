import { Routes } from '@angular/router';

export class AppRoutesHelper {
  static readonly urlPaths = {
    Home: '',
    Signup: 'signup',
    Signin: 'signin',
    ChorusDashboard: ':language/:accent/:sentenceIndex',
  } as const;

  static readonly authFlowPaths = [
    AppRoutesHelper.urlPaths.Signin,
    AppRoutesHelper.urlPaths.Signup,
  ];
}
const staticRoutes: Routes = [
  {
    path: AppRoutesHelper.urlPaths.Home,
    loadComponent: () => import('@features/landing/landing').then((m) => m.Landing),
  },
  {
    path: AppRoutesHelper.urlPaths.Signin,
    loadComponent: () => import('@features/auth/signin/signin').then((m) => m.Signin),
  },
  {
    path: AppRoutesHelper.urlPaths.Signup,
    loadComponent: () => import('@features/auth/signup/signup').then((m) => m.Signup),
  },
];
const dynamicRoutes: Routes = [
  {
    path: AppRoutesHelper.urlPaths.ChorusDashboard,
    loadComponent: () =>
      import('@features/dashboard/chorus-dashboard/chorus-dashboard').then(
        (m) => m.ChorusDashboard,
      ),
  },
];
export const routes: Routes = [...staticRoutes, ...dynamicRoutes];

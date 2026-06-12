import { Routes } from '@angular/router';

export class AppRoutesHelper {
  static readonly routes = {
    Home: '',
    Signup: 'signup',
    Signin: 'signin',
    ChorusDashboard: ':language/:accent/chorus/:sentenceIndex',
    PairsDashboard: ':language/:accent/pairs/:pairIndex/example/:exampleIndex',
  } as const;

  static readonly authFlowRoutes = [AppRoutesHelper.routes.Signin, AppRoutesHelper.routes.Signup];

  static getHomeRoute(): any[] {
    return ['/', AppRoutesHelper.routes.Home];
  }

  static getSigninRoute(): any[] {
    return ['/', AppRoutesHelper.routes.Signin];
  }

  static getSignupRoute(): any[] {
    return ['/', AppRoutesHelper.routes.Signup];
  }

  static getChorusDashboardRoute(language: string, accent: string, sentenceIndex: number): any[] {
    return ['/', language, accent, 'chorus', sentenceIndex];
  }

  static getPairsDashboardRoute(
    language: string,
    accent: string,
    pairsIndex: number,
    exampleIndex: number,
  ): any[] {
    return ['/', language, accent, 'pairs', pairsIndex, 'example', exampleIndex];
  }
}

const staticRoutes: Routes = [
  {
    path: AppRoutesHelper.routes.Home,
    loadComponent: () => import('@features/landing/landing').then((m) => m.Landing),
  },
  {
    path: AppRoutesHelper.routes.Signin,
    loadComponent: () => import('@features/auth/signin/signin').then((m) => m.Signin),
  },
  {
    path: AppRoutesHelper.routes.Signup,
    loadComponent: () => import('@features/auth/signup/signup').then((m) => m.Signup),
  },
];
const dynamicRoutes: Routes = [
  {
    path: AppRoutesHelper.routes.ChorusDashboard,
    loadComponent: () =>
      import('@features/dashboard/chorus-dashboard/chorus-dashboard').then(
        (m) => m.ChorusDashboard,
      ),
  },
  {
    path: AppRoutesHelper.routes.PairsDashboard,
    loadComponent: () =>
      import('@features/pairs/pairs-dashboard/pairs-dashboard').then((m) => m.PairsDashboard),
  },
];
export const routes: Routes = [...staticRoutes, ...dynamicRoutes];

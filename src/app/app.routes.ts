import { Routes } from '@angular/router';

export class AppRoutesHelper {
  static readonly routes = {
    Home: '',
    Signup: 'signup',
    Signin: 'signin',
    ListLanguages: 'languages',
    Ipa: 'ipa',
    // ex. /english  /spanish
    ListAccents: ':language',
    // ex. /english/america/chorus/1
    ChorusDashboard: ':language/:accent/chorus/:sentenceIndex',
    // ex. /english/america/pairs/1/example/1
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

  static getIpaRoute(): any[] {
    return ['/', AppRoutesHelper.routes.Ipa];
  }

  static getLanguagesRoute(): any[] {
    return ['/', AppRoutesHelper.routes.ListLanguages];
  }

  static getAccentsRoute(language: string): any[] {
    return ['/', language];
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
  {
    path: AppRoutesHelper.routes.ListLanguages,
    loadComponent: () =>
      import('@features/list-languages/languages/languages').then((m) => m.Languages),
  },
  {
    path: AppRoutesHelper.routes.Ipa,
    loadComponent: () => import('@features/ipa/ipa/ipa').then((m) => m.Ipa),
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
  {
    path: AppRoutesHelper.routes.ListAccents,
    loadComponent: () => import('@features/list-accents/accents/accents').then((m) => m.Accents),
  },
];
export const routes: Routes = [...staticRoutes, ...dynamicRoutes];

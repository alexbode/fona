import { Routes } from '@angular/router';

export class AppRoutesHelper {
  static readonly routes = {
    Home: '',
    Signup: 'signup',
    Signin: 'signin',
    ForgotPassword: 'forgot-password',
    ResetPassword: 'reset-password',
    ListLanguages: 'languages',
    Ipa: 'ipa',
    // ex. /english  /spanish
    ListAccents: ':language',
    // ex. /english/america
    ModeSelection: ':language/:accent',
    // ex. /english/america/chorus
    ChorusDashboard: ':language/:accent/chorus',
    // ex. /english/america/pairs
    PairsSelection: ':language/:accent/pairs',
    // ex. /english/america/pairs/1
    PairsDashboard: ':language/:accent/pairs/:pairIndex',
    // ex. /english/america/summary
    Summary: ':language/:accent/summary',
    // ex. /paywall/english/america
    Paywall: 'paywall/:language/:accent',
    // ex. /english/america/pairs-quiz
    PairsQuiz: ':language/:accent/pairs-quiz',
  } as const;

  static readonly authFlowRoutes = [
    AppRoutesHelper.routes.Signin,
    AppRoutesHelper.routes.Signup,
    AppRoutesHelper.routes.ForgotPassword,
    AppRoutesHelper.routes.ResetPassword,
  ];

  static getPairsQuizRoute(language: string, accent: string): any[] {
    return ['/', language.toLowerCase(), accent.toLowerCase(), 'pairs-quiz'];
  }

  static getHomeRoute(): any[] {
    return ['/', AppRoutesHelper.routes.Home];
  }

  static getSigninRoute(): any[] {
    return ['/', AppRoutesHelper.routes.Signin];
  }

  static getForgotPasswordRoute(): any[] {
    return ['/', AppRoutesHelper.routes.ForgotPassword];
  }

  static getResetPasswordRoute(): any[] {
    return ['/', AppRoutesHelper.routes.ResetPassword];
  }

  static getModeSelectionRoute(language: string, accent: string): any[] {
    return ['/', language.toLowerCase(), accent.toLowerCase()];
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
    return ['/', language.toLowerCase()];
  }

  static getChorusDashboardRoute(language: string, accent: string): any[] {
    return ['/', language.toLowerCase(), accent.toLowerCase(), 'chorus'];
  }

  static getPairsSelectionRoute(language: string, accent: string): any[] {
    return ['/', language.toLowerCase(), accent.toLowerCase(), 'pairs'];
  }

  static getPairsDashboardRoute(language: string, accent: string, pairsIndex: number): any[] {
    return ['/', language.toLowerCase(), accent.toLowerCase(), 'pairs', pairsIndex];
  }

  static getSummaryRoute(language: string, accent: string): any[] {
    return ['/', language.toLowerCase(), accent.toLowerCase(), 'summary'];
  }

  static getPaywallRoute(language: string, accent: string): any[] {
    return ['/', 'paywall', language.toLowerCase(), accent.toLowerCase()];
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
    path: AppRoutesHelper.routes.ForgotPassword,
    loadComponent: () =>
      import('@features/auth/forgot-password/forgot-password').then((m) => m.ForgotPassword),
  },
  {
    path: AppRoutesHelper.routes.ResetPassword,
    loadComponent: () =>
      import('@features/auth/reset-password/reset-password').then((m) => m.ResetPassword),
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
    path: AppRoutesHelper.routes.Paywall,
    loadComponent: () => import('@features/paywall/paywall').then((m) => m.Paywall),
  },
  {
    path: AppRoutesHelper.routes.ChorusDashboard,
    loadComponent: () =>
      import('@features/chorus/chorus-dashboard/chorus-dashboard').then((m) => m.ChorusDashboard),
  },
  {
    path: AppRoutesHelper.routes.PairsDashboard,
    loadComponent: () =>
      import('@features/pairs/pairs-dashboard/pairs-dashboard').then((m) => m.PairsDashboard),
  },
  {
    path: AppRoutesHelper.routes.PairsSelection,
    loadComponent: () =>
      import('@features/pairs/pairs-selection/pairs-selection').then((m) => m.PairsSelection), // Load selection page
  },
  {
    path: AppRoutesHelper.routes.PairsQuiz,
    loadComponent: () => import('@features/pairs/pairs-quiz/pairs-quiz').then((m) => m.PairsQuiz),
  },
  {
    path: AppRoutesHelper.routes.Summary,
    loadComponent: () => import('@features/summary/summary').then((m) => m.Summary),
  },
  {
    path: AppRoutesHelper.routes.ModeSelection,
    loadComponent: () =>
      import('@features/mode-selection/mode-selection').then((m) => m.ModeSelection),
  },
  {
    path: AppRoutesHelper.routes.ListAccents,
    loadComponent: () => import('@features/list-accents/accents/accents').then((m) => m.Accents),
  },
];
export const routes: Routes = [...staticRoutes, ...dynamicRoutes];

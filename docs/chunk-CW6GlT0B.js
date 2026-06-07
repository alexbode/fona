import {
  s as si,
  o as oi,
  l as li,
  d as di,
  r as ri,
  u as ut,
  i as ie$1,
  m as mt,
  H as He,
  M as Mn$1,
  C as Cn$1,
  a as le,
  j as jn,
} from './chunk-CJ2t4CXR.js';
import {
  E,
  m,
  r as rn,
  d as dl,
  o,
  _ as _e,
  A as Av,
  t as tE,
  e as eE,
  l as lw,
  c as cw,
  j as jo,
  R as RE,
  V as Va,
  C as Cf,
  a as Ef,
  $ as $y,
  K as Kv,
  k as km,
  v as vf,
  W as Wy,
  J as Jv,
  F as Ff,
  b as jE,
  g as od,
  n as nE,
  f as $a,
} from './main-EJUFTFOR.js';
import {
  D as Dn,
  c as ce,
  M as Mn,
  V as Vn,
  $ as $e,
  y as yn,
  C as Cn,
  J as Jt,
  Y as Yt,
} from './chunk-RPbjdju4.js';
function te(i, a) {
  i & 1 && (jo(0, 'mat-error'), RE(1, 'Email is required'), Va());
}
function ie(i, a) {
  i & 1 && (jo(0, 'mat-error'), RE(1, 'Please enter a valid email address'), Va());
}
function ne(i, a) {
  i & 1 && (jo(0, 'mat-error'), RE(1, 'Password is required'), Va());
}
function re(i, a) {
  if ((i & 1 && (jo(0, 'div'), RE(1), Va()), i & 2)) {
    let l = nE();
    (km(), $a(' ', l.errorMessage(), ' '));
  }
}
function oe(i, a) {
  i & 1 && RE(0, ' Signing up... ');
}
function ae(i, a) {
  i & 1 && RE(0, ' Sign Up ');
}
var ee = class i {
  fb = E(Dn);
  authService = E(m);
  router = E(rn);
  logger = E(dl);
  appRoutesHelper = o;
  showPassword = false;
  isLoading = _e(false);
  errorMessage = _e(null);
  loginForm = this.fb.nonNullable.group({
    email: ['', [ce.required, ce.email]],
    password: ['', [ce.required, ce.minLength(6)]],
  });
  async onSubmit() {
    if (this.loginForm.invalid) return;
    (this.isLoading.set(true), this.errorMessage.set(null));
    let { email: a, password: l } = this.loginForm.getRawValue();
    try {
      let { data: e, error: c } = await this.authService.signIn(a, l);
      if (c) throw c;
      this.router.navigateByUrl(this.appRoutesHelper.urlPaths.Home);
    } catch (e) {
      (this.logger.error('signup.ts onSubmit | message: ', e.message),
        this.errorMessage.set(e.message || 'An error occurred during login.'));
    } finally {
      this.isLoading.set(false);
    }
  }
  static ɵfac = function (l) {
    return new (l || i)();
  };
  static ɵcmp = Av({
    type: i,
    selectors: [['app-signup']],
    decls: 32,
    vars: 11,
    consts: [
      [1, 'login-container'],
      [1, 'login-card'],
      [1, 'login-form', 3, 'ngSubmit', 'formGroup'],
      [
        'matInput',
        '',
        'formControlName',
        'email',
        'type',
        'email',
        'placeholder',
        'Enter your email',
      ],
      [1, 'password-wrapper'],
      [
        'matInput',
        '',
        'formControlName',
        'password',
        'placeholder',
        'Enter your password',
        3,
        'type',
      ],
      [3, 'click'],
      ['matButton', 'tonal', 'type', 'submit', 3, 'disabled'],
      [3, 'href'],
    ],
    template: function (l, e) {
      (l & 1 &&
        (jo(0, 'div', 0)(1, 'mat-card', 1)(2, 'mat-card-header')(3, 'mat-card-title'),
        RE(4, 'Sign Up'),
        Va()(),
        jo(5, 'mat-card-content')(6, 'form', 2),
        Cf('ngSubmit', function () {
          return e.onSubmit();
        }),
        jo(7, 'p'),
        RE(8, 'Sign up with Email'),
        Va(),
        jo(9, 'mat-form-field')(10, 'mat-label'),
        RE(11, 'Email / Username'),
        Va(),
        Ef(12, 'input', 3),
        $y(),
        Kv(13, te, 2, 0, 'mat-error'),
        Kv(14, ie, 2, 0, 'mat-error'),
        Va(),
        jo(15, 'mat-form-field')(16, 'mat-label'),
        RE(17, 'Password'),
        Va(),
        jo(18, 'div', 4),
        Ef(19, 'input', 5),
        $y(),
        jo(20, 'span', 6),
        Cf('click', function () {
          return (e.showPassword = !e.showPassword);
        }),
        jo(21, 'mat-icon'),
        RE(22),
        Va()()(),
        Kv(23, ne, 2, 0, 'mat-error'),
        Va(),
        Kv(24, re, 2, 1, 'div'),
        jo(25, 'button', 7),
        Kv(26, oe, 1, 0)(27, ae, 1, 0),
        Va()(),
        jo(28, 'span'),
        RE(29, 'Already have an account? '),
        jo(30, 'a', 8),
        RE(31, 'Sign In'),
        Va()()()()()),
        l & 2 &&
          (km(6),
          vf('formGroup', e.loginForm),
          km(6),
          Wy(),
          km(),
          Jv(
            e.loginForm.controls.email.hasError('required') && e.loginForm.controls.email.touched
              ? 13
              : -1,
          ),
          km(),
          Jv(
            e.loginForm.controls.email.hasError('email') && e.loginForm.controls.email.touched
              ? 14
              : -1,
          ),
          km(5),
          vf('type', e.showPassword ? 'text' : 'password'),
          Wy(),
          km(3),
          Ff(e.showPassword ? 'visibility' : 'visibility_off'),
          km(),
          Jv(
            e.loginForm.controls.password.hasError('required') &&
              e.loginForm.controls.password.touched
              ? 23
              : -1,
          ),
          km(),
          Jv(e.errorMessage() ? 24 : -1),
          km(),
          vf('disabled', e.loginForm.invalid || e.isLoading()),
          km(),
          Jv(e.isLoading() ? 26 : 27),
          km(4),
          vf('href', jE(e.appRoutesHelper.urlPaths.Signin), od)));
    },
    dependencies: [
      Mn,
      Vn,
      $e,
      yn,
      Cn,
      Jt,
      Yt,
      si,
      oi,
      li,
      di,
      ri,
      ut,
      ie$1,
      mt,
      He,
      Mn$1,
      Cn$1,
      tE,
      eE,
      le,
      jn,
      lw,
      cw,
    ],
    styles: [
      '.login-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100%}.login-card[_ngcontent-%COMP%]{width:100%;max-width:400px;padding:16px}.login-form[_ngcontent-%COMP%]{display:flex;flex-direction:column}.password-wrapper[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between}',
    ],
  });
};
export { ee as Signup };

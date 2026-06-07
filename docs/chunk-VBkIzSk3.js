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
} from './chunk-DhC4-mlb.js';
import {
  E,
  m,
  _ as _i,
  s as sl,
  o,
  a as _e,
  T as Tv,
  J as J0,
  K as K0,
  r as rw,
  n as nw,
  L as Lo,
  C as CE,
  F as Fa,
  v as vf,
  p as pf,
  R as Ry,
  $ as $v,
  b as Cm,
  f as ff,
  P as Py,
  U as Uv,
  A as Af,
  S as SE,
  c as om,
  z as zv,
  H as Ha,
} from './main-5CP2EVYS.js';
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
} from './chunk-DuM-lQYB.js';
function te(i, a) {
  i & 1 && (Lo(0, 'mat-error'), CE(1, 'Email is required'), Fa());
}
function ie(i, a) {
  i & 1 && (Lo(0, 'mat-error'), CE(1, 'Please enter a valid email address'), Fa());
}
function ne(i, a) {
  i & 1 && (Lo(0, 'mat-error'), CE(1, 'Password is required'), Fa());
}
function re(i, a) {
  if ((i & 1 && (Lo(0, 'div'), CE(1), Fa()), i & 2)) {
    let l = zv();
    (Cm(), Ha(' ', l.errorMessage(), ' '));
  }
}
function oe(i, a) {
  i & 1 && CE(0, ' Signing up... ');
}
function ae(i, a) {
  i & 1 && CE(0, ' Sign Up ');
}
var ee = class i {
  fb = E(Dn);
  authService = E(m);
  router = E(_i);
  logger = E(sl);
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
  static ɵcmp = Tv({
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
        (Lo(0, 'div', 0)(1, 'mat-card', 1)(2, 'mat-card-header')(3, 'mat-card-title'),
        CE(4, 'Sign Up'),
        Fa()(),
        Lo(5, 'mat-card-content')(6, 'form', 2),
        vf('ngSubmit', function () {
          return e.onSubmit();
        }),
        Lo(7, 'p'),
        CE(8, 'Sign up with Email'),
        Fa(),
        Lo(9, 'mat-form-field')(10, 'mat-label'),
        CE(11, 'Email / Username'),
        Fa(),
        pf(12, 'input', 3),
        Ry(),
        $v(13, te, 2, 0, 'mat-error'),
        $v(14, ie, 2, 0, 'mat-error'),
        Fa(),
        Lo(15, 'mat-form-field')(16, 'mat-label'),
        CE(17, 'Password'),
        Fa(),
        Lo(18, 'div', 4),
        pf(19, 'input', 5),
        Ry(),
        Lo(20, 'span', 6),
        vf('click', function () {
          return (e.showPassword = !e.showPassword);
        }),
        Lo(21, 'mat-icon'),
        CE(22),
        Fa()()(),
        $v(23, ne, 2, 0, 'mat-error'),
        Fa(),
        $v(24, re, 2, 1, 'div'),
        Lo(25, 'button', 7),
        $v(26, oe, 1, 0)(27, ae, 1, 0),
        Fa()(),
        Lo(28, 'span'),
        CE(29, 'Already have an account? '),
        Lo(30, 'a', 8),
        CE(31, 'Sign In'),
        Fa()()()()()),
        l & 2 &&
          (Cm(6),
          ff('formGroup', e.loginForm),
          Cm(6),
          Py(),
          Cm(),
          Uv(
            e.loginForm.controls.email.hasError('required') && e.loginForm.controls.email.touched
              ? 13
              : -1,
          ),
          Cm(),
          Uv(
            e.loginForm.controls.email.hasError('email') && e.loginForm.controls.email.touched
              ? 14
              : -1,
          ),
          Cm(5),
          ff('type', e.showPassword ? 'text' : 'password'),
          Py(),
          Cm(3),
          Af(e.showPassword ? 'visibility' : 'visibility_off'),
          Cm(),
          Uv(
            e.loginForm.controls.password.hasError('required') &&
              e.loginForm.controls.password.touched
              ? 23
              : -1,
          ),
          Cm(),
          Uv(e.errorMessage() ? 24 : -1),
          Cm(),
          ff('disabled', e.loginForm.invalid || e.isLoading()),
          Cm(),
          Uv(e.isLoading() ? 26 : 27),
          Cm(4),
          ff('href', SE(e.appRoutesHelper.urlPaths.Signin), om)));
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
      J0,
      K0,
      le,
      jn,
      rw,
      nw,
    ],
    styles: [
      '.login-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100%}.login-card[_ngcontent-%COMP%]{width:100%;max-width:400px;padding:16px}.login-form[_ngcontent-%COMP%]{display:flex;flex-direction:column}.password-wrapper[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between}',
    ],
  });
};
export { ee as Signup };

import { g, c as ce, q as qt$1, J as Jt$1 } from './chunk-DuM-lQYB.js';
import {
  d as Cv,
  B as Bc,
  X as Xt$1,
  E,
  N,
  T as Tv,
  Z as Zv,
  Y as Yv,
  e as _f,
  M as Mv,
  j as ja,
  V as Va,
  g as Lw,
  h as Jn,
  i as dO,
  k as Ae$1,
  l as So,
  D as De$1,
  q as cO,
  t as ot,
  u as lO,
  w as c0,
  a as _e$1,
  x as J,
  y as en,
  G as Mf,
  I as ws,
  O as Yp,
  Q as pt$1,
  W as zp,
  a0 as Dn,
  a1 as Jp,
  a2 as Vp,
  a3 as gO,
  a4 as Zu,
  a5 as af,
  L as Lo,
  v as vf,
  $ as $v,
  F as Fa,
  b as Cm,
  U as Uv,
  a6 as RE,
  a7 as wf,
  a8 as Df,
  a9 as eE,
  aa as Jv,
  ab as Xv,
  ac as Tf,
  ad as If,
  ae as mf,
  af as Sy,
  ag as Jw,
  ah as Vn,
  ai as eg,
  aj as pO,
  ak as df,
  al as Pl,
  am as Q,
  an as hf,
  p as pf,
  z as zv,
  f as ff,
  ao as tE,
  ap as zn,
  aq as Xn,
  ar as dt,
  as as at,
  at as Kn,
  C as CE,
  A as Af,
  au as x,
  av as Qp,
  aw as OE,
} from './main-5CP2EVYS.js';
var pe = ['*'];
var ue = [
    [
      ['', 'mat-card-avatar', ''],
      ['', 'matCardAvatar', ''],
    ],
    [
      ['mat-card-title'],
      ['mat-card-subtitle'],
      ['', 'mat-card-title', ''],
      ['', 'mat-card-subtitle', ''],
      ['', 'matCardTitle', ''],
      ['', 'matCardSubtitle', ''],
    ],
    '*',
  ],
  _e = [
    '[mat-card-avatar], [matCardAvatar]',
    `mat-card-title, mat-card-subtitle,
      [mat-card-title], [mat-card-subtitle],
      [matCardTitle], [matCardSubtitle]`,
    '*',
  ],
  ge = new N('MAT_CARD_CONFIG'),
  oi = (() => {
    class i {
      appearance;
      constructor() {
        let t = E(ge, { optional: true });
        this.appearance = t?.appearance || 'raised';
      }
      static ɵfac = function (e) {
        return new (e || i)();
      };
      static ɵcmp = Tv({
        type: i,
        selectors: [['mat-card']],
        hostAttrs: [1, 'mat-mdc-card', 'mdc-card'],
        hostVars: 8,
        hostBindings: function (e, n) {
          e & 2 &&
            _f('mat-mdc-card-outlined', n.appearance === 'outlined')(
              'mdc-card--outlined',
              n.appearance === 'outlined',
            )('mat-mdc-card-filled', n.appearance === 'filled')(
              'mdc-card--filled',
              n.appearance === 'filled',
            );
        },
        inputs: { appearance: 'appearance' },
        exportAs: ['matCard'],
        ngContentSelectors: pe,
        decls: 1,
        vars: 0,
        template: function (e, n) {
          e & 1 && (Zv(), Yv(0));
        },
        styles: [
          `.mat-mdc-card {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  border-style: solid;
  border-width: 0;
  background-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-elevated-container-elevation, var(--mat-sys-level1));
}
.mat-mdc-card::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: solid 1px transparent;
  content: "";
  display: block;
  pointer-events: none;
  box-sizing: border-box;
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
}

.mat-mdc-card-outlined {
  background-color: var(--mat-card-outlined-container-color, var(--mat-sys-surface));
  border-radius: var(--mat-card-outlined-container-shape, var(--mat-sys-corner-medium));
  border-width: var(--mat-card-outlined-outline-width, 1px);
  border-color: var(--mat-card-outlined-outline-color, var(--mat-sys-outline-variant));
  box-shadow: var(--mat-card-outlined-container-elevation, var(--mat-sys-level0));
}
.mat-mdc-card-outlined::after {
  border: none;
}

.mat-mdc-card-filled {
  background-color: var(--mat-card-filled-container-color, var(--mat-sys-surface-container-highest));
  border-radius: var(--mat-card-filled-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-filled-container-elevation, var(--mat-sys-level0));
}

.mdc-card__media {
  position: relative;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.mdc-card__media::before {
  display: block;
  content: "";
}
.mdc-card__media:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
.mdc-card__media:last-child {
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

.mat-mdc-card-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  min-height: 52px;
  padding: 8px;
}

.mat-mdc-card-title {
  font-family: var(--mat-card-title-text-font, var(--mat-sys-title-large-font));
  line-height: var(--mat-card-title-text-line-height, var(--mat-sys-title-large-line-height));
  font-size: var(--mat-card-title-text-size, var(--mat-sys-title-large-size));
  letter-spacing: var(--mat-card-title-text-tracking, var(--mat-sys-title-large-tracking));
  font-weight: var(--mat-card-title-text-weight, var(--mat-sys-title-large-weight));
}

.mat-mdc-card-subtitle {
  color: var(--mat-card-subtitle-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-card-subtitle-text-font, var(--mat-sys-title-medium-font));
  line-height: var(--mat-card-subtitle-text-line-height, var(--mat-sys-title-medium-line-height));
  font-size: var(--mat-card-subtitle-text-size, var(--mat-sys-title-medium-size));
  letter-spacing: var(--mat-card-subtitle-text-tracking, var(--mat-sys-title-medium-tracking));
  font-weight: var(--mat-card-subtitle-text-weight, var(--mat-sys-title-medium-weight));
}

.mat-mdc-card-title,
.mat-mdc-card-subtitle {
  display: block;
  margin: 0;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle {
  padding: 16px 16px 0;
}

.mat-mdc-card-header {
  display: flex;
  padding: 16px 16px 0;
}

.mat-mdc-card-content {
  display: block;
  padding: 0 16px;
}
.mat-mdc-card-content:first-child {
  padding-top: 16px;
}
.mat-mdc-card-content:last-child {
  padding-bottom: 16px;
}

.mat-mdc-card-title-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.mat-mdc-card-avatar {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-bottom: 16px;
  object-fit: cover;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title {
  line-height: normal;
}

.mat-mdc-card-sm-image {
  width: 80px;
  height: 80px;
}

.mat-mdc-card-md-image {
  width: 112px;
  height: 112px;
}

.mat-mdc-card-lg-image {
  width: 152px;
  height: 152px;
}

.mat-mdc-card-xl-image {
  width: 240px;
  height: 240px;
}

.mat-mdc-card-subtitle ~ .mat-mdc-card-title,
.mat-mdc-card-title ~ .mat-mdc-card-subtitle,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-title-group .mat-mdc-card-title,
.mat-mdc-card-title-group .mat-mdc-card-subtitle {
  padding-top: 0;
}

.mat-mdc-card-content > :last-child:not(.mat-mdc-card-footer) {
  margin-bottom: 0;
}

.mat-mdc-card-actions-align-end {
  justify-content: flex-end;
}
`,
        ],
        encapsulation: 2,
      });
    }
    return i;
  })(),
  ri = (() => {
    class i {
      static ɵfac = function (e) {
        return new (e || i)();
      };
      static ɵdir = Mv({
        type: i,
        selectors: [['mat-card-title'], ['', 'mat-card-title', ''], ['', 'matCardTitle', '']],
        hostAttrs: [1, 'mat-mdc-card-title'],
      });
    }
    return i;
  })();
var li = (() => {
  class i {
    static ɵfac = function (e) {
      return new (e || i)();
    };
    static ɵdir = Mv({
      type: i,
      selectors: [['mat-card-content']],
      hostAttrs: [1, 'mat-mdc-card-content'],
    });
  }
  return i;
})();
var di = (() => {
  class i {
    static ɵfac = function (e) {
      return new (e || i)();
    };
    static ɵcmp = Tv({
      type: i,
      selectors: [['mat-card-header']],
      hostAttrs: [1, 'mat-mdc-card-header'],
      ngContentSelectors: _e,
      decls: 4,
      vars: 0,
      consts: [[1, 'mat-mdc-card-header-text']],
      template: function (e, n) {
        e & 1 && (Zv(ue), Yv(0), ja(1, 'div', 0), Yv(2, 1), Va(), Yv(3, 2));
      },
      encapsulation: 2,
    });
  }
  return i;
})();
var si = (() => {
  class i {
    static ɵfac = function (e) {
      return new (e || i)();
    };
    static ɵmod = Cv({ type: i });
    static ɵinj = Bc({ imports: [Xt$1] });
  }
  return i;
})();
var ct = class {
    _box;
    _destroyed = new J();
    _resizeSubject = new J();
    _resizeObserver;
    _elementObservables = new Map();
    constructor(l) {
      ((this._box = l),
        typeof ResizeObserver < 'u' &&
          (this._resizeObserver = new ResizeObserver((t) => this._resizeSubject.next(t))));
    }
    observe(l) {
      return (
        this._elementObservables.has(l) ||
          this._elementObservables.set(
            l,
            new x((t) => {
              let e = this._resizeSubject.subscribe(t);
              return (
                this._resizeObserver?.observe(l, { box: this._box }),
                () => {
                  (this._resizeObserver?.unobserve(l),
                    e.unsubscribe(),
                    this._elementObservables.delete(l));
                }
              );
            }).pipe(
              Dn((t) => t.some((e) => e.target === l)),
              Qp({ bufferSize: 1, refCount: true }),
              Jp(this._destroyed),
            ),
          ),
        this._elementObservables.get(l)
      );
    }
    destroy() {
      (this._destroyed.next(),
        this._destroyed.complete(),
        this._resizeSubject.complete(),
        this._elementObservables.clear());
    }
  },
  qt = (() => {
    class i {
      _cleanupErrorListener;
      _observers = new Map();
      _ngZone = E(De$1);
      constructor() {}
      ngOnDestroy() {
        for (let [, t] of this._observers) t.destroy();
        (this._observers.clear(), this._cleanupErrorListener?.());
      }
      observe(t, e) {
        let n = e?.box || 'content-box';
        return (
          this._observers.has(n) || this._observers.set(n, new ct(n)),
          this._observers.get(n).observe(t)
        );
      }
      static ɵfac = function (e) {
        return new (e || i)();
      };
      static ɵprov = Kn({ token: i, factory: i.ɵfac });
    }
    return i;
  })();
var be = ['notch'],
  xe = ['*'],
  Qt = ['iconPrefixContainer'],
  Gt = ['textPrefixContainer'],
  Ut = ['iconSuffixContainer'],
  Wt = ['textSuffixContainer'],
  ve = ['textField'],
  ye = [
    '*',
    [['mat-label']],
    [
      ['', 'matPrefix', ''],
      ['', 'matIconPrefix', ''],
    ],
    [['', 'matTextPrefix', '']],
    [['', 'matTextSuffix', '']],
    [
      ['', 'matSuffix', ''],
      ['', 'matIconSuffix', ''],
    ],
    [['mat-error'], ['', 'matError', '']],
    [['mat-hint', 3, 'align', 'end']],
    [['mat-hint', 'align', 'end']],
  ],
  we = [
    '*',
    'mat-label',
    '[matPrefix], [matIconPrefix]',
    '[matTextPrefix]',
    '[matTextSuffix]',
    '[matSuffix], [matIconSuffix]',
    'mat-error, [matError]',
    "mat-hint:not([align='end'])",
    "mat-hint[align='end']",
  ];
function ke(i, l) {
  i & 1 && pf(0, 'span', 21);
}
function Ce(i, l) {
  if ((i & 1 && (Lo(0, 'label', 20), Yv(1, 1), $v(2, ke, 1, 0, 'span', 21), Fa()), i & 2)) {
    let t = zv(2);
    (ff('floating', t._shouldLabelFloat())('monitorResize', t._hasOutline())('id', t._labelId),
      df('for', t._control.disableAutomaticLabeling ? null : t._control.id),
      Cm(2),
      Uv(!t.hideRequiredMarker && t._control.required ? 2 : -1));
  }
}
function Me(i, l) {
  if ((i & 1 && $v(0, Ce, 3, 5, 'label', 20), i & 2)) {
    let t = zv();
    Uv(t._hasFloatingLabel() ? 0 : -1);
  }
}
function Fe(i, l) {
  i & 1 && pf(0, 'div', 7);
}
function Se(i, l) {}
function Le(i, l) {
  if ((i & 1 && af(0, Se, 0, 0, 'ng-template', 13), i & 2)) {
    zv(2);
    let t = tE(1);
    ff('ngTemplateOutlet', t);
  }
}
function De(i, l) {
  if ((i & 1 && (Lo(0, 'div', 9), $v(1, Le, 1, 1, null, 13), Fa()), i & 2)) {
    let t = zv();
    (ff('matFormFieldNotchedOutlineOpen', t._shouldLabelFloat()),
      Cm(),
      Uv(t._forceDisplayInfixLabel() ? -1 : 1));
  }
}
function Ee(i, l) {
  i & 1 && (Lo(0, 'div', 10, 2), Yv(2, 2), Fa());
}
function Te(i, l) {
  i & 1 && (Lo(0, 'div', 11, 3), Yv(2, 3), Fa());
}
function Ae(i, l) {}
function Ie(i, l) {
  if ((i & 1 && af(0, Ae, 0, 0, 'ng-template', 13), i & 2)) {
    zv();
    let t = tE(1);
    ff('ngTemplateOutlet', t);
  }
}
function ze(i, l) {
  i & 1 && (Lo(0, 'div', 14, 4), Yv(2, 4), Fa());
}
function Re(i, l) {
  i & 1 && (Lo(0, 'div', 15, 5), Yv(2, 5), Fa());
}
function Oe(i, l) {
  i & 1 && pf(0, 'div', 16);
}
function Pe(i, l) {
  i & 1 && (Lo(0, 'div', 18), Yv(1, 6), Fa());
}
function Be(i, l) {
  if ((i & 1 && (Lo(0, 'mat-hint', 22), CE(1), Fa()), i & 2)) {
    let t = zv(2);
    (ff('id', t._hintLabelId), Cm(), Af(t.hintLabel));
  }
}
function Ne(i, l) {
  if (
    (i & 1 &&
      (Lo(0, 'div', 19),
      $v(1, Be, 2, 2, 'mat-hint', 22),
      Yv(2, 7),
      pf(3, 'div', 23),
      Yv(4, 8),
      Fa()),
    i & 2)
  ) {
    let t = zv();
    (Cm(), Uv(t.hintLabel ? 1 : -1));
  }
}
var mt = (() => {
    class i {
      static ɵfac = function (e) {
        return new (e || i)();
      };
      static ɵdir = Mv({ type: i, selectors: [['mat-label']] });
    }
    return i;
  })(),
  te = new N('MatError'),
  He = (() => {
    class i {
      id = E(So).getId('mat-mdc-error-');
      static ɵfac = function (e) {
        return new (e || i)();
      };
      static ɵdir = Mv({
        type: i,
        selectors: [['mat-error'], ['', 'matError', '']],
        hostAttrs: [1, 'mat-mdc-form-field-error', 'mat-mdc-form-field-bottom-align'],
        hostVars: 1,
        hostBindings: function (e, n) {
          e & 2 && mf('id', n.id);
        },
        inputs: { id: 'id' },
        features: [RE([{ provide: te, useExisting: i }])],
      });
    }
    return i;
  })(),
  ft = (() => {
    class i {
      align = 'start';
      id = E(So).getId('mat-mdc-hint-');
      static ɵfac = function (e) {
        return new (e || i)();
      };
      static ɵdir = Mv({
        type: i,
        selectors: [['mat-hint']],
        hostAttrs: [1, 'mat-mdc-form-field-hint', 'mat-mdc-form-field-bottom-align'],
        hostVars: 4,
        hostBindings: function (e, n) {
          e & 2 &&
            (mf('id', n.id),
            df('align', null),
            _f('mat-mdc-form-field-hint-end', n.align === 'end'));
        },
        inputs: { align: 'align', id: 'id' },
      });
    }
    return i;
  })(),
  je = new N('MatPrefix');
var Ve = new N('MatSuffix');
var ee = new N('FloatingLabelParent'),
  Zt = (() => {
    class i {
      _elementRef = E(Jn);
      get floating() {
        return this._floating;
      }
      set floating(t) {
        ((this._floating = t), this.monitorResize && this._handleResize());
      }
      _floating = false;
      get monitorResize() {
        return this._monitorResize;
      }
      set monitorResize(t) {
        ((this._monitorResize = t),
          this._monitorResize ? this._subscribeToResize() : this._resizeSubscription.unsubscribe());
      }
      _monitorResize = false;
      _resizeObserver = E(qt);
      _ngZone = E(De$1);
      _parent = E(ee);
      _resizeSubscription = new Q();
      ngOnDestroy() {
        this._resizeSubscription.unsubscribe();
      }
      getWidth() {
        return qe(this._elementRef.nativeElement);
      }
      get element() {
        return this._elementRef.nativeElement;
      }
      _handleResize() {
        setTimeout(() => this._parent._handleLabelResized());
      }
      _subscribeToResize() {
        (this._resizeSubscription.unsubscribe(),
          this._ngZone.runOutsideAngular(() => {
            this._resizeSubscription = this._resizeObserver
              .observe(this._elementRef.nativeElement, { box: 'border-box' })
              .subscribe(() => this._handleResize());
          }));
      }
      static ɵfac = function (e) {
        return new (e || i)();
      };
      static ɵdir = Mv({
        type: i,
        selectors: [['label', 'matFormFieldFloatingLabel', '']],
        hostAttrs: [1, 'mdc-floating-label', 'mat-mdc-floating-label'],
        hostVars: 2,
        hostBindings: function (e, n) {
          e & 2 && _f('mdc-floating-label--float-above', n.floating);
        },
        inputs: { floating: 'floating', monitorResize: 'monitorResize' },
      });
    }
    return i;
  })();
function qe(i) {
  let l = i;
  if (l.offsetParent !== null) return l.scrollWidth;
  let t = l.cloneNode(true);
  (t.style.setProperty('position', 'absolute'),
    t.style.setProperty('transform', 'translate(-9999px, -9999px)'),
    document.documentElement.appendChild(t));
  let e = t.scrollWidth;
  return (t.remove(), e);
}
var Xt = 'mdc-line-ripple--active',
  tt = 'mdc-line-ripple--deactivating',
  $t = (() => {
    class i {
      _elementRef = E(Jn);
      _cleanupTransitionEnd;
      constructor() {
        let t = E(De$1),
          e = E(Sy);
        t.runOutsideAngular(() => {
          this._cleanupTransitionEnd = e.listen(
            this._elementRef.nativeElement,
            'transitionend',
            this._handleTransitionEnd,
          );
        });
      }
      activate() {
        let t = this._elementRef.nativeElement.classList;
        (t.remove(tt), t.add(Xt));
      }
      deactivate() {
        this._elementRef.nativeElement.classList.add(tt);
      }
      _handleTransitionEnd = (t) => {
        let e = this._elementRef.nativeElement.classList,
          n = e.contains(tt);
        t.propertyName === 'opacity' && n && e.remove(Xt, tt);
      };
      ngOnDestroy() {
        this._cleanupTransitionEnd();
      }
      static ɵfac = function (e) {
        return new (e || i)();
      };
      static ɵdir = Mv({
        type: i,
        selectors: [['div', 'matFormFieldLineRipple', '']],
        hostAttrs: [1, 'mdc-line-ripple'],
      });
    }
    return i;
  })(),
  Yt = (() => {
    class i {
      _elementRef = E(Jn);
      _ngZone = E(De$1);
      open = false;
      _notch;
      ngAfterViewInit() {
        let t = this._elementRef.nativeElement,
          e = t.querySelector('.mdc-floating-label');
        e
          ? (t.classList.add('mdc-notched-outline--upgraded'),
            typeof requestAnimationFrame == 'function' &&
              ((e.style.transitionDuration = '0s'),
              this._ngZone.runOutsideAngular(() => {
                requestAnimationFrame(() => (e.style.transitionDuration = ''));
              })))
          : t.classList.add('mdc-notched-outline--no-label');
      }
      _setNotchWidth(t) {
        let e = this._notch.nativeElement;
        !this.open || !t
          ? (e.style.width = '')
          : (e.style.width = `calc(${t}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`);
      }
      _setMaxWidth(t) {
        this._notch.nativeElement.style.setProperty(
          '--mat-form-field-notch-max-width',
          `calc(100% - ${t}px)`,
        );
      }
      static ɵfac = function (e) {
        return new (e || i)();
      };
      static ɵcmp = Tv({
        type: i,
        selectors: [['div', 'matFormFieldNotchedOutline', '']],
        viewQuery: function (e, n) {
          if ((e & 1 && Df(be, 5), e & 2)) {
            let a;
            Jv((a = Xv())) && (n._notch = a.first);
          }
        },
        hostAttrs: [1, 'mdc-notched-outline'],
        hostVars: 2,
        hostBindings: function (e, n) {
          e & 2 && _f('mdc-notched-outline--notched', n.open);
        },
        inputs: { open: [0, 'matFormFieldNotchedOutlineOpen', 'open'] },
        ngContentSelectors: xe,
        decls: 5,
        vars: 0,
        consts: [
          ['notch', ''],
          [1, 'mat-mdc-notch-piece', 'mdc-notched-outline__leading'],
          [1, 'mat-mdc-notch-piece', 'mdc-notched-outline__notch'],
          [1, 'mat-mdc-notch-piece', 'mdc-notched-outline__trailing'],
        ],
        template: function (e, n) {
          e & 1 && (Zv(), hf(0, 'div', 1), ja(1, 'div', 2, 0), Yv(3), Va(), hf(4, 'div', 3));
        },
        encapsulation: 2,
      });
    }
    return i;
  })(),
  ht = (() => {
    class i {
      value = null;
      stateChanges;
      id;
      placeholder;
      ngControl = null;
      focused = false;
      empty = false;
      shouldLabelFloat = false;
      required = false;
      disabled = false;
      errorState = false;
      controlType;
      autofilled;
      userAriaDescribedBy;
      disableAutomaticLabeling;
      describedByIds;
      static ɵfac = function (e) {
        return new (e || i)();
      };
      static ɵdir = Mv({ type: i });
    }
    return i;
  })();
var pt = new N('MatFormField'),
  Qe = new N('MAT_FORM_FIELD_DEFAULT_OPTIONS'),
  Kt = 'fill',
  Ge = 'auto',
  Jt = 'fixed',
  Ue = 'translateY(-50%)',
  ie = (() => {
    class i {
      _elementRef = E(Jn);
      _changeDetectorRef = E(dO);
      _platform = E(Ae$1);
      _idGenerator = E(So);
      _ngZone = E(De$1);
      _defaults = E(Qe, { optional: true });
      _currentDirection;
      _textField;
      _iconPrefixContainer;
      _textPrefixContainer;
      _iconSuffixContainer;
      _textSuffixContainer;
      _floatingLabel;
      _notchedOutline;
      _lineRipple;
      _iconPrefixContainerSignal = cO('iconPrefixContainer');
      _textPrefixContainerSignal = cO('textPrefixContainer');
      _iconSuffixContainerSignal = cO('iconSuffixContainer');
      _textSuffixContainerSignal = cO('textSuffixContainer');
      _prefixSuffixContainers = ot(() =>
        [
          this._iconPrefixContainerSignal(),
          this._textPrefixContainerSignal(),
          this._iconSuffixContainerSignal(),
          this._textSuffixContainerSignal(),
        ]
          .map((t) => t?.nativeElement)
          .filter((t) => t !== void 0),
      );
      _formFieldControl;
      _prefixChildren;
      _suffixChildren;
      _errorChildren;
      _hintChildren;
      _labelChild = lO(mt);
      get hideRequiredMarker() {
        return this._hideRequiredMarker;
      }
      set hideRequiredMarker(t) {
        this._hideRequiredMarker = c0(t);
      }
      _hideRequiredMarker = false;
      color = 'primary';
      get floatLabel() {
        return this._floatLabel || this._defaults?.floatLabel || Ge;
      }
      set floatLabel(t) {
        t !== this._floatLabel && ((this._floatLabel = t), this._changeDetectorRef.markForCheck());
      }
      _floatLabel;
      get appearance() {
        return this._appearanceSignal();
      }
      set appearance(t) {
        let e = t || this._defaults?.appearance || Kt;
        this._appearanceSignal.set(e);
      }
      _appearanceSignal = _e$1(Kt);
      get subscriptSizing() {
        return this._subscriptSizing || this._defaults?.subscriptSizing || Jt;
      }
      set subscriptSizing(t) {
        this._subscriptSizing = t || this._defaults?.subscriptSizing || Jt;
      }
      _subscriptSizing = null;
      get hintLabel() {
        return this._hintLabel;
      }
      set hintLabel(t) {
        ((this._hintLabel = t), this._processHints());
      }
      _hintLabel = '';
      _hasIconPrefix = false;
      _hasTextPrefix = false;
      _hasIconSuffix = false;
      _hasTextSuffix = false;
      _labelId = this._idGenerator.getId('mat-mdc-form-field-label-');
      _hintLabelId = this._idGenerator.getId('mat-mdc-hint-');
      _describedByIds;
      get _control() {
        return this._explicitFormFieldControl || this._formFieldControl;
      }
      set _control(t) {
        this._explicitFormFieldControl = t;
      }
      _destroyed = new J();
      _isFocused = null;
      _explicitFormFieldControl;
      _previousControl = null;
      _previousControlValidatorFn = null;
      _stateChanges;
      _valueChanges;
      _describedByChanges;
      _outlineLabelOffsetResizeObserver = null;
      _animationsDisabled = en();
      constructor() {
        let t = this._defaults,
          e = E(Mf);
        (t &&
          (t.appearance && (this.appearance = t.appearance),
          (this._hideRequiredMarker = !!t?.hideRequiredMarker),
          t.color && (this.color = t.color)),
          ws(() => (this._currentDirection = e.valueSignal())),
          this._syncOutlineLabelOffset());
      }
      ngAfterViewInit() {
        (this._updateFocusState(),
          this._animationsDisabled ||
            this._ngZone.runOutsideAngular(() => {
              setTimeout(() => {
                this._elementRef.nativeElement.classList.add('mat-form-field-animations-enabled');
              }, 300);
            }),
          this._changeDetectorRef.detectChanges());
      }
      ngAfterContentInit() {
        (this._assertFormFieldControl(),
          this._initializeSubscript(),
          this._initializePrefixAndSuffix());
      }
      ngAfterContentChecked() {
        (this._assertFormFieldControl(),
          this._control !== this._previousControl &&
            (this._initializeControl(this._previousControl),
            this._control.ngControl &&
              this._control.ngControl.control &&
              (this._previousControlValidatorFn = this._control.ngControl.control.validator),
            (this._previousControl = this._control)),
          this._control.ngControl &&
            this._control.ngControl.control &&
            this._control.ngControl.control.validator !== this._previousControlValidatorFn &&
            this._changeDetectorRef.markForCheck());
      }
      ngOnDestroy() {
        (this._outlineLabelOffsetResizeObserver?.disconnect(),
          this._stateChanges?.unsubscribe(),
          this._valueChanges?.unsubscribe(),
          this._describedByChanges?.unsubscribe(),
          this._destroyed.next(),
          this._destroyed.complete());
      }
      getLabelId = ot(() => (this._hasFloatingLabel() ? this._labelId : null));
      getConnectedOverlayOrigin() {
        return this._textField || this._elementRef;
      }
      _animateAndLockLabel() {
        this._hasFloatingLabel() && (this.floatLabel = 'always');
      }
      _initializeControl(t) {
        let e = this._control,
          n = 'mat-mdc-form-field-type-';
        (t && this._elementRef.nativeElement.classList.remove(n + t.controlType),
          e.controlType && this._elementRef.nativeElement.classList.add(n + e.controlType),
          this._stateChanges?.unsubscribe(),
          (this._stateChanges = e.stateChanges.subscribe(() => {
            (this._updateFocusState(), this._changeDetectorRef.markForCheck());
          })),
          this._describedByChanges?.unsubscribe(),
          (this._describedByChanges = e.stateChanges
            .pipe(
              Yp([void 0, void 0]),
              pt$1(() => [e.errorState, e.userAriaDescribedBy]),
              zp(),
              Dn(([[a, r], [x, H]]) => a !== x || r !== H),
            )
            .subscribe(() => this._syncDescribedByIds())),
          this._valueChanges?.unsubscribe(),
          e.ngControl &&
            e.ngControl.valueChanges &&
            (this._valueChanges = e.ngControl.valueChanges
              .pipe(Jp(this._destroyed))
              .subscribe(() => this._changeDetectorRef.markForCheck())));
      }
      _checkPrefixAndSuffixTypes() {
        ((this._hasIconPrefix = !!this._prefixChildren.find((t) => !t._isText)),
          (this._hasTextPrefix = !!this._prefixChildren.find((t) => t._isText)),
          (this._hasIconSuffix = !!this._suffixChildren.find((t) => !t._isText)),
          (this._hasTextSuffix = !!this._suffixChildren.find((t) => t._isText)));
      }
      _initializePrefixAndSuffix() {
        (this._checkPrefixAndSuffixTypes(),
          Vp(this._prefixChildren.changes, this._suffixChildren.changes).subscribe(() => {
            (this._checkPrefixAndSuffixTypes(), this._changeDetectorRef.markForCheck());
          }));
      }
      _initializeSubscript() {
        (this._hintChildren.changes.subscribe(() => {
          (this._processHints(), this._changeDetectorRef.markForCheck());
        }),
          this._errorChildren.changes.subscribe(() => {
            (this._syncDescribedByIds(), this._changeDetectorRef.markForCheck());
          }),
          this._validateHints(),
          this._syncDescribedByIds());
      }
      _assertFormFieldControl() {
        this._control;
      }
      _updateFocusState() {
        let t = this._control.focused;
        (t && !this._isFocused
          ? ((this._isFocused = true), this._lineRipple?.activate())
          : !t &&
            (this._isFocused || this._isFocused === null) &&
            ((this._isFocused = false), this._lineRipple?.deactivate()),
          this._elementRef.nativeElement.classList.toggle('mat-focused', t),
          this._textField?.nativeElement.classList.toggle('mdc-text-field--focused', t));
      }
      _syncOutlineLabelOffset() {
        gO({
          earlyRead: () => {
            if (this._appearanceSignal() !== 'outline')
              return (this._outlineLabelOffsetResizeObserver?.disconnect(), null);
            if (globalThis.ResizeObserver) {
              this._outlineLabelOffsetResizeObserver ||= new globalThis.ResizeObserver(() => {
                this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset());
              });
              for (let t of this._prefixSuffixContainers())
                this._outlineLabelOffsetResizeObserver.observe(t, { box: 'border-box' });
            }
            return this._getOutlinedLabelOffset();
          },
          write: (t) => this._writeOutlinedLabelStyles(t()),
        });
      }
      _shouldAlwaysFloat() {
        return this.floatLabel === 'always';
      }
      _hasOutline() {
        return this.appearance === 'outline';
      }
      _forceDisplayInfixLabel() {
        return (
          !this._platform.isBrowser && this._prefixChildren.length && !this._shouldLabelFloat()
        );
      }
      _hasFloatingLabel = ot(() => !!this._labelChild());
      _shouldLabelFloat() {
        return this._hasFloatingLabel()
          ? this._control.shouldLabelFloat || this._shouldAlwaysFloat()
          : false;
      }
      _shouldForward(t) {
        let e = this._control ? this._control.ngControl : null;
        return e && e[t];
      }
      _getSubscriptMessageType() {
        return this._errorChildren && this._errorChildren.length > 0 && this._control.errorState
          ? 'error'
          : 'hint';
      }
      _handleLabelResized() {
        this._refreshOutlineNotchWidth();
      }
      _refreshOutlineNotchWidth() {
        !this._hasOutline() || !this._floatingLabel || !this._shouldLabelFloat()
          ? this._notchedOutline?._setNotchWidth(0)
          : this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth());
      }
      _processHints() {
        (this._validateHints(), this._syncDescribedByIds());
      }
      _validateHints() {
        this._hintChildren;
      }
      _syncDescribedByIds() {
        if (this._control) {
          let t = [];
          if (
            (this._control.userAriaDescribedBy &&
              typeof this._control.userAriaDescribedBy == 'string' &&
              t.push(...this._control.userAriaDescribedBy.split(' ')),
            this._getSubscriptMessageType() === 'hint')
          ) {
            let a = this._hintChildren ? this._hintChildren.find((x) => x.align === 'start') : null,
              r = this._hintChildren ? this._hintChildren.find((x) => x.align === 'end') : null;
            (a ? t.push(a.id) : this._hintLabel && t.push(this._hintLabelId), r && t.push(r.id));
          } else this._errorChildren && t.push(...this._errorChildren.map((a) => a.id));
          let e = this._control.describedByIds,
            n;
          if (e) {
            let a = this._describedByIds || t;
            n = t.concat(e.filter((r) => r && !a.includes(r)));
          } else n = t;
          (this._control.setDescribedByIds(n), (this._describedByIds = t));
        }
      }
      _getOutlinedLabelOffset() {
        if (!this._hasOutline() || !this._floatingLabel) return null;
        if (!this._iconPrefixContainer && !this._textPrefixContainer) return ['', null];
        if (!this._isAttachedToDom()) return null;
        let t = this._iconPrefixContainer?.nativeElement,
          e = this._textPrefixContainer?.nativeElement,
          n = this._iconSuffixContainer?.nativeElement,
          a = this._textSuffixContainer?.nativeElement,
          r = t?.getBoundingClientRect().width ?? 0,
          x = e?.getBoundingClientRect().width ?? 0,
          H = n?.getBoundingClientRect().width ?? 0,
          A = a?.getBoundingClientRect().width ?? 0,
          se = this._currentDirection === 'rtl' ? '-1' : '1',
          ce = `${r + x}px`,
          me = `calc(${se} * (${ce} + var(--mat-mdc-form-field-label-offset-x, 0px)))`,
          fe = `var(--mat-mdc-form-field-label-transform, ${Ue} translateX(${me}))`,
          he = r + x + H + A;
        return [fe, he];
      }
      _writeOutlinedLabelStyles(t) {
        if (t !== null) {
          let [e, n] = t;
          (this._floatingLabel && (this._floatingLabel.element.style.transform = e),
            n !== null && this._notchedOutline?._setMaxWidth(n));
        }
      }
      _isAttachedToDom() {
        let t = this._elementRef.nativeElement;
        if (t.getRootNode) {
          let e = t.getRootNode();
          return e && e !== t;
        }
        return document.documentElement.contains(t);
      }
      static ɵfac = function (e) {
        return new (e || i)();
      };
      static ɵcmp = Tv({
        type: i,
        selectors: [['mat-form-field']],
        contentQueries: function (e, n, a) {
          if (
            (e & 1 &&
              (Tf(a, n._labelChild, mt, 5), If(a, ht, 5)(a, je, 5)(a, Ve, 5)(a, te, 5)(a, ft, 5)),
            e & 2)
          ) {
            eE();
            let r;
            (Jv((r = Xv())) && (n._formFieldControl = r.first),
              Jv((r = Xv())) && (n._prefixChildren = r),
              Jv((r = Xv())) && (n._suffixChildren = r),
              Jv((r = Xv())) && (n._errorChildren = r),
              Jv((r = Xv())) && (n._hintChildren = r));
          }
        },
        viewQuery: function (e, n) {
          if (
            (e & 1 &&
              (wf(n._iconPrefixContainerSignal, Qt, 5)(n._textPrefixContainerSignal, Gt, 5)(
                n._iconSuffixContainerSignal,
                Ut,
                5,
              )(n._textSuffixContainerSignal, Wt, 5),
              Df(ve, 5)(Qt, 5)(Gt, 5)(Ut, 5)(Wt, 5)(Zt, 5)(Yt, 5)($t, 5)),
            e & 2)
          ) {
            eE(4);
            let a;
            (Jv((a = Xv())) && (n._textField = a.first),
              Jv((a = Xv())) && (n._iconPrefixContainer = a.first),
              Jv((a = Xv())) && (n._textPrefixContainer = a.first),
              Jv((a = Xv())) && (n._iconSuffixContainer = a.first),
              Jv((a = Xv())) && (n._textSuffixContainer = a.first),
              Jv((a = Xv())) && (n._floatingLabel = a.first),
              Jv((a = Xv())) && (n._notchedOutline = a.first),
              Jv((a = Xv())) && (n._lineRipple = a.first));
          }
        },
        hostAttrs: [1, 'mat-mdc-form-field'],
        hostVars: 38,
        hostBindings: function (e, n) {
          e & 2 &&
            _f('mat-mdc-form-field-label-always-float', n._shouldAlwaysFloat())(
              'mat-mdc-form-field-has-icon-prefix',
              n._hasIconPrefix,
            )('mat-mdc-form-field-has-icon-suffix', n._hasIconSuffix)(
              'mat-form-field-invalid',
              n._control.errorState,
            )('mat-form-field-disabled', n._control.disabled)(
              'mat-form-field-autofilled',
              n._control.autofilled,
            )('mat-form-field-appearance-fill', n.appearance == 'fill')(
              'mat-form-field-appearance-outline',
              n.appearance == 'outline',
            )('mat-form-field-hide-placeholder', n._hasFloatingLabel() && !n._shouldLabelFloat())(
              'mat-primary',
              n.color !== 'accent' && n.color !== 'warn',
            )('mat-accent', n.color === 'accent')('mat-warn', n.color === 'warn')(
              'ng-untouched',
              n._shouldForward('untouched'),
            )('ng-touched', n._shouldForward('touched'))(
              'ng-pristine',
              n._shouldForward('pristine'),
            )('ng-dirty', n._shouldForward('dirty'))('ng-valid', n._shouldForward('valid'))(
              'ng-invalid',
              n._shouldForward('invalid'),
            )('ng-pending', n._shouldForward('pending'));
        },
        inputs: {
          hideRequiredMarker: 'hideRequiredMarker',
          color: 'color',
          floatLabel: 'floatLabel',
          appearance: 'appearance',
          subscriptSizing: 'subscriptSizing',
          hintLabel: 'hintLabel',
        },
        exportAs: ['matFormField'],
        features: [
          RE([
            { provide: pt, useExisting: i },
            { provide: ee, useExisting: i },
          ]),
        ],
        ngContentSelectors: we,
        decls: 18,
        vars: 21,
        consts: [
          ['labelTemplate', ''],
          ['textField', ''],
          ['iconPrefixContainer', ''],
          ['textPrefixContainer', ''],
          ['textSuffixContainer', ''],
          ['iconSuffixContainer', ''],
          [1, 'mat-mdc-text-field-wrapper', 'mdc-text-field', 3, 'click'],
          [1, 'mat-mdc-form-field-focus-overlay'],
          [1, 'mat-mdc-form-field-flex'],
          ['matFormFieldNotchedOutline', '', 3, 'matFormFieldNotchedOutlineOpen'],
          [1, 'mat-mdc-form-field-icon-prefix'],
          [1, 'mat-mdc-form-field-text-prefix'],
          [1, 'mat-mdc-form-field-infix'],
          [3, 'ngTemplateOutlet'],
          [1, 'mat-mdc-form-field-text-suffix'],
          [1, 'mat-mdc-form-field-icon-suffix'],
          ['matFormFieldLineRipple', ''],
          [
            'aria-atomic',
            'true',
            'aria-live',
            'polite',
            1,
            'mat-mdc-form-field-subscript-wrapper',
            'mat-mdc-form-field-bottom-align',
          ],
          [1, 'mat-mdc-form-field-error-wrapper'],
          [1, 'mat-mdc-form-field-hint-wrapper'],
          ['matFormFieldFloatingLabel', '', 3, 'floating', 'monitorResize', 'id'],
          [
            'aria-hidden',
            'true',
            1,
            'mat-mdc-form-field-required-marker',
            'mdc-floating-label--required',
          ],
          [3, 'id'],
          [1, 'mat-mdc-form-field-hint-spacer'],
        ],
        template: function (e, n) {
          if (
            (e & 1 &&
              (Zv(ye),
              af(0, Me, 1, 1, 'ng-template', null, 0, OE),
              Lo(2, 'div', 6, 1),
              vf('click', function (r) {
                return n._control.onContainerClick(r);
              }),
              $v(4, Fe, 1, 0, 'div', 7),
              Lo(5, 'div', 8),
              $v(6, De, 2, 2, 'div', 9),
              $v(7, Ee, 3, 0, 'div', 10),
              $v(8, Te, 3, 0, 'div', 11),
              Lo(9, 'div', 12),
              $v(10, Ie, 1, 1, null, 13),
              Yv(11),
              Fa(),
              $v(12, ze, 3, 0, 'div', 14),
              $v(13, Re, 3, 0, 'div', 15),
              Fa(),
              $v(14, Oe, 1, 0, 'div', 16),
              Fa(),
              Lo(15, 'div', 17),
              $v(16, Pe, 2, 0, 'div', 18)(17, Ne, 5, 1, 'div', 19),
              Fa()),
            e & 2)
          ) {
            let a;
            (Cm(2),
              _f('mdc-text-field--filled', !n._hasOutline())(
                'mdc-text-field--outlined',
                n._hasOutline(),
              )('mdc-text-field--no-label', !n._hasFloatingLabel())(
                'mdc-text-field--disabled',
                n._control.disabled,
              )('mdc-text-field--invalid', n._control.errorState),
              Cm(2),
              Uv(!n._hasOutline() && !n._control.disabled ? 4 : -1),
              Cm(2),
              Uv(n._hasOutline() ? 6 : -1),
              Cm(),
              Uv(n._hasIconPrefix ? 7 : -1),
              Cm(),
              Uv(n._hasTextPrefix ? 8 : -1),
              Cm(2),
              Uv(!n._hasOutline() || n._forceDisplayInfixLabel() ? 10 : -1),
              Cm(2),
              Uv(n._hasTextSuffix ? 12 : -1),
              Cm(),
              Uv(n._hasIconSuffix ? 13 : -1),
              Cm(),
              Uv(n._hasOutline() ? -1 : 14),
              Cm(),
              _f('mat-mdc-form-field-subscript-dynamic-size', n.subscriptSizing === 'dynamic'));
            let r = n._getSubscriptMessageType();
            (Cm(), Uv((a = r) === 'error' ? 16 : a === 'hint' ? 17 : -1));
          }
        },
        dependencies: [Zt, Yt, Zu, $t, ft],
        styles: [
          `.mdc-text-field {
  display: inline-flex;
  align-items: baseline;
  padding: 0 16px;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  will-change: opacity, transform, color;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.mdc-text-field__input {
  width: 100%;
  min-width: 0;
  border: none;
  border-radius: 0;
  background: none;
  padding: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  height: 28px;
}
.mdc-text-field__input::-webkit-calendar-picker-indicator, .mdc-text-field__input::-webkit-search-cancel-button {
  display: none;
}
.mdc-text-field__input::-ms-clear {
  display: none;
}
.mdc-text-field__input:focus {
  outline: none;
}
.mdc-text-field__input:invalid {
  box-shadow: none;
}
.mdc-text-field__input::placeholder {
  opacity: 0;
}
.mdc-text-field__input::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field__input::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field__input:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mdc-text-field--focused .mdc-text-field__input::placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  opacity: 1;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--outlined .mdc-text-field__input, .mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input {
  height: 100%;
}
.mdc-text-field--outlined .mdc-text-field__input {
  display: flex;
  border: none !important;
  background-color: transparent;
}
.mdc-text-field--disabled .mdc-text-field__input {
  pointer-events: auto;
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--mat-form-field-filled-input-text-color, var(--mat-sys-on-surface));
  caret-color: var(--mat-form-field-filled-caret-color, var(--mat-sys-primary));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--mat-form-field-outlined-input-text-color, var(--mat-sys-on-surface));
  caret-color: var(--mat-form-field-outlined-caret-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--mat-form-field-filled-error-caret-color, var(--mat-sys-error));
}
.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--mat-form-field-outlined-error-caret-color, var(--mat-sys-error));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--mat-form-field-filled-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--mat-form-field-outlined-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-text-field__input {
    background-color: Window;
  }
}

.mdc-text-field--filled {
  height: 56px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-top-left-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));
  border-top-right-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) {
  background-color: var(--mat-form-field-filled-container-color, var(--mat-sys-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled {
  background-color: var(--mat-form-field-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 4%, transparent));
}

.mdc-text-field--outlined {
  height: 56px;
  overflow: visible;
  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);
}
[dir=rtl] .mdc-text-field--outlined {
  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);
  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
}

.mdc-floating-label {
  position: absolute;
  left: 0;
  transform-origin: left top;
  line-height: 1.15rem;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: text;
  overflow: hidden;
  will-change: transform;
}
[dir=rtl] .mdc-floating-label {
  right: 0;
  left: auto;
  transform-origin: right top;
  text-align: right;
}
.mdc-text-field .mdc-floating-label {
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
.mdc-notched-outline .mdc-floating-label {
  display: inline-block;
  position: relative;
  max-width: 100%;
}
.mdc-text-field--outlined .mdc-floating-label {
  left: 4px;
  right: auto;
}
[dir=rtl] .mdc-text-field--outlined .mdc-floating-label {
  left: auto;
  right: 4px;
}
.mdc-text-field--filled .mdc-floating-label {
  left: 16px;
  right: auto;
}
[dir=rtl] .mdc-text-field--filled .mdc-floating-label {
  left: auto;
  right: 16px;
}
.mdc-text-field--disabled .mdc-floating-label {
  cursor: default;
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-floating-label {
    z-index: 1;
  }
}
.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label {
  display: none;
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--mat-form-field-filled-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-filled-focus-label-text-color, var(--mat-sys-primary));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--mat-form-field-filled-hover-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label {
  color: var(--mat-form-field-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--mat-form-field-filled-error-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-filled-error-focus-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--mat-form-field-filled-error-hover-label-text-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--filled .mdc-floating-label {
  font-family: var(--mat-form-field-filled-label-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-form-field-filled-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-form-field-filled-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-form-field-filled-label-text-tracking, var(--mat-sys-body-large-tracking));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--mat-form-field-outlined-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-outlined-focus-label-text-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--mat-form-field-outlined-hover-label-text-color, var(--mat-sys-on-surface));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label {
  color: var(--mat-form-field-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-focus-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-hover-label-text-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--outlined .mdc-floating-label {
  font-family: var(--mat-form-field-outlined-label-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-form-field-outlined-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-form-field-outlined-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-form-field-outlined-label-text-tracking, var(--mat-sys-body-large-tracking));
}

.mdc-floating-label--float-above {
  cursor: auto;
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--filled .mdc-floating-label--float-above {
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--outlined .mdc-floating-label--float-above {
  transform: translateY(-37.25px) scale(1);
  font-size: 0.75rem;
}
.mdc-notched-outline .mdc-floating-label--float-above {
  text-overflow: clip;
}
.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: 133.3333333333%;
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  transform: translateY(-34.75px) scale(0.75);
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: 1rem;
}

.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 1px;
  margin-right: 0;
  content: "*";
}
[dir=rtl] .mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 0;
  margin-right: 1px;
}

.mdc-notched-outline {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 100%;
  text-align: left;
  pointer-events: none;
}
[dir=rtl] .mdc-notched-outline {
  text-align: right;
}
.mdc-text-field--outlined .mdc-notched-outline {
  z-index: 1;
}

.mat-mdc-notch-piece {
  box-sizing: border-box;
  height: 100%;
  pointer-events: none;
  border: none;
  border-top: 1px solid;
  border-bottom: 1px solid;
}
.mdc-text-field--focused .mat-mdc-notch-piece {
  border-width: 2px;
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-outline-color, var(--mat-sys-outline));
  border-width: var(--mat-form-field-outlined-outline-width, 1px);
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-hover-outline-color, var(--mat-sys-on-surface));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-focus-outline-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-outline-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-notched-outline .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-hover-outline-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-focus-outline-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mat-mdc-notch-piece {
  border-width: var(--mat-form-field-outlined-focus-outline-width, 2px);
}

.mdc-notched-outline__leading {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading {
  width: max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
}
[dir=rtl] .mdc-notched-outline__leading {
  border-left: none;
  border-right: 1px solid;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}

.mdc-notched-outline__trailing {
  flex-grow: 1;
  border-left: none;
  border-right: 1px solid;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}
[dir=rtl] .mdc-notched-outline__trailing {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}

.mdc-notched-outline__notch {
  flex: 0 0 auto;
  width: auto;
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch {
  max-width: min(var(--mat-form-field-notch-max-width, 100%), calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  max-width: min(100%, calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 1px;
}
.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 2px;
}
.mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 0;
  padding-right: 8px;
  border-top: none;
}
[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 8px;
  padding-right: 0;
}
.mdc-notched-outline--no-label .mdc-notched-outline__notch {
  display: none;
}

.mdc-line-ripple::before, .mdc-line-ripple::after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom-style: solid;
  content: "";
}
.mdc-line-ripple::before {
  z-index: 1;
  border-bottom-width: var(--mat-form-field-filled-active-indicator-height, 1px);
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-active-indicator-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-hover-active-indicator-color, var(--mat-sys-on-surface));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-disabled-active-indicator-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-error-active-indicator-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-error-hover-active-indicator-color, var(--mat-sys-on-error-container));
}
.mdc-line-ripple::after {
  transform: scaleX(0);
  opacity: 0;
  z-index: 2;
}
.mdc-text-field--filled .mdc-line-ripple::after {
  border-bottom-width: var(--mat-form-field-filled-focus-active-indicator-height, 2px);
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--mat-form-field-filled-focus-active-indicator-color, var(--mat-sys-primary));
}
.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--mat-form-field-filled-error-focus-active-indicator-color, var(--mat-sys-error));
}

.mdc-line-ripple--active::after {
  transform: scaleX(1);
  opacity: 1;
}

.mdc-line-ripple--deactivating::after {
  opacity: 0;
}

.mdc-text-field--disabled {
  pointer-events: none;
}

.mat-mdc-form-field-textarea-control {
  vertical-align: middle;
  resize: vertical;
  box-sizing: border-box;
  height: auto;
  margin: 0;
  padding: 0;
  border: none;
  overflow: auto;
}

.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font: inherit;
  letter-spacing: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  border: none;
}

.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  line-height: normal;
  pointer-events: all;
  will-change: auto;
}

.mat-mdc-form-field:not(.mat-form-field-disabled) .mat-mdc-floating-label.mdc-floating-label {
  cursor: inherit;
}

.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,
.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control {
  height: auto;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color] {
  height: 23px;
}

.mat-mdc-text-field-wrapper {
  height: auto;
  flex: auto;
  will-change: auto;
}

.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-left: 0;
  --mat-mdc-form-field-label-offset-x: -16px;
}

.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

[dir=rtl] .mat-mdc-text-field-wrapper {
  padding-left: 16px;
  padding-right: 16px;
}
[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-left: 0;
}
[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

.mat-form-field-disabled .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
  opacity: 1;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label {
  left: auto;
  right: auto;
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input {
  display: inline-block;
}

.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch {
  padding-top: 0;
}

.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: 1px solid transparent;
}

[dir=rtl] .mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: none;
  border-right: 1px solid transparent;
}

.mat-mdc-form-field-infix {
  min-height: var(--mat-form-field-container-height, 56px);
  padding-top: var(--mat-form-field-filled-with-label-container-padding-top, 24px);
  padding-bottom: var(--mat-form-field-filled-with-label-container-padding-bottom, 8px);
}
.mdc-text-field--outlined .mat-mdc-form-field-infix, .mdc-text-field--no-label .mat-mdc-form-field-infix {
  padding-top: var(--mat-form-field-container-vertical-padding, 16px);
  padding-bottom: var(--mat-form-field-container-vertical-padding, 16px);
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label {
  top: calc(var(--mat-form-field-container-height, 56px) / 2);
}

.mdc-text-field--filled .mat-mdc-floating-label {
  display: var(--mat-form-field-filled-label-display, block);
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  --mat-mdc-form-field-label-transform: translateY(calc(calc(6.75px + var(--mat-form-field-container-height, 56px) / 2) * -1))
    scale(var(--mat-mdc-form-field-floating-label-scale, 0.75));
  transform: var(--mat-mdc-form-field-label-transform);
}

@keyframes _mat-form-field-subscript-animation {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.mat-mdc-form-field-subscript-wrapper {
  box-sizing: border-box;
  width: 100%;
  position: relative;
}

.mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-error-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 16px;
  opacity: 1;
  transform: translateY(0);
  animation: _mat-form-field-subscript-animation 0ms cubic-bezier(0.55, 0, 0.55, 0.2);
}

.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper {
  position: static;
}

.mat-mdc-form-field-bottom-align::before {
  content: "";
  display: inline-block;
  height: 16px;
}

.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before {
  content: unset;
}

.mat-mdc-form-field-hint-end {
  order: 1;
}

.mat-mdc-form-field-hint-wrapper {
  display: flex;
}

.mat-mdc-form-field-hint-spacer {
  flex: 1 0 1em;
}

.mat-mdc-form-field-error {
  display: block;
  color: var(--mat-form-field-error-text-color, var(--mat-sys-error));
}

.mat-mdc-form-field-subscript-wrapper,
.mat-mdc-form-field-bottom-align::before {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--mat-form-field-subscript-text-font, var(--mat-sys-body-small-font));
  line-height: var(--mat-form-field-subscript-text-line-height, var(--mat-sys-body-small-line-height));
  font-size: var(--mat-form-field-subscript-text-size, var(--mat-sys-body-small-size));
  letter-spacing: var(--mat-form-field-subscript-text-tracking, var(--mat-sys-body-small-tracking));
  font-weight: var(--mat-form-field-subscript-text-weight, var(--mat-sys-body-small-weight));
}

.mat-mdc-form-field-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  opacity: 0;
  pointer-events: none;
  background-color: var(--mat-form-field-state-layer-color, var(--mat-sys-on-surface));
}
.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay {
  opacity: var(--mat-form-field-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay {
  opacity: var(--mat-form-field-focus-state-layer-opacity, 0);
}

select.mat-mdc-form-field-input-control {
  -moz-appearance: none;
  -webkit-appearance: none;
  background-color: transparent;
  display: inline-flex;
  box-sizing: border-box;
}
select.mat-mdc-form-field-input-control:not(:disabled) {
  cursor: pointer;
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option {
  color: var(--mat-form-field-select-option-text-color, var(--mat-sys-neutral10));
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled {
  color: var(--mat-form-field-select-disabled-option-text-color, color-mix(in srgb, var(--mat-sys-neutral10) 38%, transparent));
}

.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  content: "";
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -2.5px;
  pointer-events: none;
  color: var(--mat-form-field-enabled-select-arrow-color, var(--mat-sys-on-surface-variant));
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  right: auto;
  left: 0;
}
.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after {
  color: var(--mat-form-field-focus-select-arrow-color, var(--mat-sys-primary));
}
.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after {
  color: var(--mat-form-field-disabled-select-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 15px;
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 0;
  padding-left: 15px;
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill .mat-mdc-text-field-wrapper {
    outline: solid 1px;
  }
}
@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper {
    outline-color: GrayText;
  }
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper {
    outline: dashed 3px;
  }
}

@media (forced-colors: active) {
  .mat-mdc-form-field.mat-focused .mdc-notched-outline {
    border: dashed 3px;
  }
}

.mat-mdc-form-field-input-control[type=date], .mat-mdc-form-field-input-control[type=datetime], .mat-mdc-form-field-input-control[type=datetime-local], .mat-mdc-form-field-input-control[type=month], .mat-mdc-form-field-input-control[type=week], .mat-mdc-form-field-input-control[type=time] {
  line-height: 1;
}
.mat-mdc-form-field-input-control::-webkit-datetime-edit {
  line-height: 1;
  padding: 0;
  margin-bottom: -2px;
}

.mat-mdc-form-field {
  --mat-mdc-form-field-floating-label-scale: 0.75;
  display: inline-flex;
  flex-direction: column;
  min-width: 0;
  text-align: left;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--mat-form-field-container-text-font, var(--mat-sys-body-large-font));
  line-height: var(--mat-form-field-container-text-line-height, var(--mat-sys-body-large-line-height));
  font-size: var(--mat-form-field-container-text-size, var(--mat-sys-body-large-size));
  letter-spacing: var(--mat-form-field-container-text-tracking, var(--mat-sys-body-large-tracking));
  font-weight: var(--mat-form-field-container-text-weight, var(--mat-sys-body-large-weight));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above {
  font-size: calc(var(--mat-form-field-outlined-label-text-populated-size) * var(--mat-mdc-form-field-floating-label-scale));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: var(--mat-form-field-outlined-label-text-populated-size);
}
[dir=rtl] .mat-mdc-form-field {
  text-align: right;
}

.mat-mdc-form-field-flex {
  display: inline-flex;
  align-items: baseline;
  box-sizing: border-box;
  width: 100%;
}

.mat-mdc-text-field-wrapper {
  width: 100%;
  z-index: 0;
}

.mat-mdc-form-field-icon-prefix,
.mat-mdc-form-field-icon-suffix {
  align-self: center;
  line-height: 0;
  pointer-events: auto;
  position: relative;
  z-index: 1;
}
.mat-mdc-form-field-icon-prefix > .mat-icon,
.mat-mdc-form-field-icon-suffix > .mat-icon {
  padding: 0 12px;
  box-sizing: content-box;
}

.mat-mdc-form-field-icon-prefix {
  color: var(--mat-form-field-leading-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-prefix {
  color: var(--mat-form-field-disabled-leading-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-trailing-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-disabled-trailing-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-invalid .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-trailing-icon-color, var(--mat-sys-error));
}
.mat-form-field-invalid:not(.mat-focused):not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-hover-trailing-icon-color, var(--mat-sys-on-error-container));
}
.mat-form-field-invalid.mat-focused .mat-mdc-text-field-wrapper .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-focus-trailing-icon-color, var(--mat-sys-error));
}

.mat-mdc-form-field-icon-prefix,
[dir=rtl] .mat-mdc-form-field-icon-suffix {
  padding: 0 4px 0 0;
}

.mat-mdc-form-field-icon-suffix,
[dir=rtl] .mat-mdc-form-field-icon-prefix {
  padding: 0 0 0 4px;
}

.mat-mdc-form-field-subscript-wrapper .mat-icon,
.mat-mdc-form-field label .mat-icon {
  width: 1em;
  height: 1em;
  font-size: inherit;
}

.mat-mdc-form-field-infix {
  flex: auto;
  min-width: 0;
  width: 180px;
  position: relative;
  box-sizing: border-box;
}
.mat-mdc-form-field-infix:has(textarea[cols]) {
  width: auto;
}

.mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: -1px;
  -webkit-clip-path: inset(-9em -999em -9em 1px);
  clip-path: inset(-9em -999em -9em 1px);
}
[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: 0;
  margin-right: -1px;
  -webkit-clip-path: inset(-9em 1px -9em -999em);
  clip-path: inset(-9em 1px -9em -999em);
}

.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-floating-label {
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input {
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-moz-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-webkit-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input:-ms-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before {
  transition-duration: 75ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-line-ripple::after {
  transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-error-wrapper {
  animation-duration: 300ms;
}

.mdc-notched-outline .mdc-floating-label {
  max-width: calc(100% + 1px);
}

.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: calc(133.3333333333% + 1px);
}
`,
        ],
        encapsulation: 2,
      });
    }
    return i;
  })();
var ut = (() => {
  class i {
    static ɵfac = function (e) {
      return new (e || i)();
    };
    static ɵmod = Cv({ type: i });
    static ɵinj = Bc({ imports: [Lw, ie, Xt$1] });
  }
  return i;
})();
var We = (() => {
    class i {
      static ɵfac = function (e) {
        return new (e || i)();
      };
      static ɵcmp = Tv({
        type: i,
        selectors: [['ng-component']],
        hostAttrs: ['cdk-text-field-style-loader', ''],
        decls: 0,
        vars: 0,
        template: function (e, n) {},
        styles: [
          `textarea.cdk-textarea-autosize {
  resize: none;
}

textarea.cdk-textarea-autosize-measuring {
  padding: 2px 0 !important;
  box-sizing: content-box !important;
  height: auto !important;
  overflow: hidden !important;
}

textarea.cdk-textarea-autosize-measuring-firefox {
  padding: 2px 0 !important;
  box-sizing: content-box !important;
  height: 0 !important;
}

@keyframes cdk-text-field-autofill-start { /*!*/ }
@keyframes cdk-text-field-autofill-end { /*!*/ }
.cdk-text-field-autofill-monitored:-webkit-autofill {
  animation: cdk-text-field-autofill-start 0s 1ms;
}

.cdk-text-field-autofill-monitored:not(:-webkit-autofill) {
  animation: cdk-text-field-autofill-end 0s 1ms;
}
`,
        ],
        encapsulation: 2,
      });
    }
    return i;
  })(),
  Ze = { passive: true },
  ne = (() => {
    class i {
      _platform = E(Ae$1);
      _ngZone = E(De$1);
      _renderer = E(zn).createRenderer(null, null);
      _styleLoader = E(Xn);
      _monitoredElements = new Map();
      monitor(t) {
        if (!this._platform.isBrowser) return dt;
        this._styleLoader.load(We);
        let e = at(t),
          n = this._monitoredElements.get(e);
        if (n) return n.subject;
        let a = new J(),
          r = 'cdk-text-field-autofilled',
          x = (A) => {
            A.animationName === 'cdk-text-field-autofill-start' && !e.classList.contains(r)
              ? (e.classList.add(r),
                this._ngZone.run(() => a.next({ target: A.target, isAutofilled: true })))
              : A.animationName === 'cdk-text-field-autofill-end' &&
                e.classList.contains(r) &&
                (e.classList.remove(r),
                this._ngZone.run(() => a.next({ target: A.target, isAutofilled: false })));
          },
          H = this._ngZone.runOutsideAngular(
            () => (
              e.classList.add('cdk-text-field-autofill-monitored'),
              this._renderer.listen(e, 'animationstart', x, Ze)
            ),
          );
        return (this._monitoredElements.set(e, { subject: a, unlisten: H }), a);
      }
      stopMonitoring(t) {
        let e = at(t),
          n = this._monitoredElements.get(e);
        n &&
          (n.unlisten(),
          n.subject.complete(),
          e.classList.remove('cdk-text-field-autofill-monitored'),
          e.classList.remove('cdk-text-field-autofilled'),
          this._monitoredElements.delete(e));
      }
      ngOnDestroy() {
        this._monitoredElements.forEach((t, e) => this.stopMonitoring(e));
      }
      static ɵfac = function (e) {
        return new (e || i)();
      };
      static ɵprov = Kn({ token: i, factory: i.ɵfac });
    }
    return i;
  })();
var ae = (() => {
  class i {
    static ɵfac = function (e) {
      return new (e || i)();
    };
    static ɵmod = Cv({ type: i });
    static ɵinj = Bc({});
  }
  return i;
})();
var oe = new N('MAT_INPUT_VALUE_ACCESSOR');
var re = (() => {
  class i {
    isErrorState(t, e) {
      return !!(t && t.invalid && (t.touched || (e && e.submitted)));
    }
    static ɵfac = function (e) {
      return new (e || i)();
    };
    static ɵprov = Kn({ token: i, factory: i.ɵfac });
  }
  return i;
})();
var et = class {
  _defaultMatcher;
  ngControl;
  _parentFormGroup;
  _parentForm;
  _stateChanges;
  errorState = false;
  matcher;
  constructor(l, t, e, n, a) {
    ((this._defaultMatcher = l),
      (this.ngControl = t),
      (this._parentFormGroup = e),
      (this._parentForm = n),
      (this._stateChanges = a));
  }
  updateErrorState() {
    let l = this.errorState,
      t = this._parentFormGroup || this._parentForm,
      e = this.matcher || this._defaultMatcher,
      n = this.ngControl ? this.ngControl.control : null,
      a = e?.isErrorState(n, t) ?? false;
    a !== l && ((this.errorState = a), this._stateChanges.next());
  }
};
var Xe = ['button', 'checkbox', 'file', 'hidden', 'image', 'radio', 'range', 'reset', 'submit'],
  $e = new N('MAT_INPUT_CONFIG'),
  Cn = (() => {
    class i {
      _elementRef = E(Jn);
      _platform = E(Ae$1);
      ngControl = E(g, { optional: true, self: true });
      _autofillMonitor = E(ne);
      _ngZone = E(De$1);
      _formField = E(pt, { optional: true });
      _renderer = E(Sy);
      _uid = E(So).getId('mat-input-');
      _previousNativeValue;
      _inputValueAccessor;
      _signalBasedValueAccessor;
      _previousPlaceholder = null;
      _errorStateTracker;
      _config = E($e, { optional: true });
      _cleanupIosKeyup;
      _cleanupWebkitWheel;
      _isServer = false;
      _isNativeSelect = false;
      _isTextarea = false;
      _isInFormField = false;
      focused = false;
      stateChanges = new J();
      controlType = 'mat-input';
      autofilled = false;
      get disabled() {
        return this._disabled;
      }
      set disabled(t) {
        ((this._disabled = c0(t)),
          this.focused && ((this.focused = false), this.stateChanges.next()));
      }
      _disabled = false;
      get id() {
        return this._id;
      }
      set id(t) {
        this._id = t || this._uid;
      }
      _id;
      placeholder;
      name;
      get required() {
        return this._required ?? this.ngControl?.control?.hasValidator(ce.required) ?? false;
      }
      set required(t) {
        this._required = c0(t);
      }
      _required;
      get type() {
        return this._type;
      }
      set type(t) {
        ((this._type = t || 'text'),
          this._validateType(),
          !this._isTextarea &&
            Jw().has(this._type) &&
            (this._elementRef.nativeElement.type = this._type));
      }
      _type = 'text';
      get errorStateMatcher() {
        return this._errorStateTracker.matcher;
      }
      set errorStateMatcher(t) {
        this._errorStateTracker.matcher = t;
      }
      userAriaDescribedBy;
      get value() {
        return this._signalBasedValueAccessor
          ? this._signalBasedValueAccessor.value()
          : this._inputValueAccessor.value;
      }
      set value(t) {
        t !== this.value &&
          (this._signalBasedValueAccessor
            ? this._signalBasedValueAccessor.value.set(t)
            : (this._inputValueAccessor.value = t),
          this.stateChanges.next());
      }
      get readonly() {
        return this._readonly;
      }
      set readonly(t) {
        this._readonly = c0(t);
      }
      _readonly = false;
      disabledInteractive;
      get errorState() {
        return this._errorStateTracker.errorState;
      }
      set errorState(t) {
        this._errorStateTracker.errorState = t;
      }
      _neverEmptyInputTypes = [
        'date',
        'datetime',
        'datetime-local',
        'month',
        'time',
        'week',
      ].filter((t) => Jw().has(t));
      constructor() {
        let t = E(qt$1, { optional: true }),
          e = E(Jt$1, { optional: true }),
          n = E(re),
          a = E(oe, { optional: true, self: true }),
          r = this._elementRef.nativeElement,
          x = r.nodeName.toLowerCase();
        (a
          ? Vn(a.value)
            ? (this._signalBasedValueAccessor = a)
            : (this._inputValueAccessor = a)
          : (this._inputValueAccessor = r),
          (this._previousNativeValue = this.value),
          (this.id = this.id),
          this._platform.IOS &&
            this._ngZone.runOutsideAngular(() => {
              this._cleanupIosKeyup = this._renderer.listen(r, 'keyup', this._iOSKeyupListener);
            }),
          (this._errorStateTracker = new et(n, this.ngControl, e, t, this.stateChanges)),
          (this._isServer = !this._platform.isBrowser),
          (this._isNativeSelect = x === 'select'),
          (this._isTextarea = x === 'textarea'),
          (this._isInFormField = !!this._formField),
          (this.disabledInteractive = this._config?.disabledInteractive || false),
          this._isNativeSelect &&
            (this.controlType = r.multiple ? 'mat-native-select-multiple' : 'mat-native-select'),
          this._signalBasedValueAccessor &&
            ws(() => {
              (this._signalBasedValueAccessor.value(), this.stateChanges.next());
            }));
      }
      ngAfterViewInit() {
        this._platform.isBrowser &&
          this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe((t) => {
            ((this.autofilled = t.isAutofilled), this.stateChanges.next());
          });
      }
      ngOnChanges() {
        this.stateChanges.next();
      }
      ngOnDestroy() {
        (this.stateChanges.complete(),
          this._platform.isBrowser &&
            this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement),
          this._cleanupIosKeyup?.(),
          this._cleanupWebkitWheel?.());
      }
      ngDoCheck() {
        (this.ngControl &&
          (this.updateErrorState(),
          this.ngControl.disabled !== null &&
            this.ngControl.disabled !== this.disabled &&
            ((this.disabled = this.ngControl.disabled), this.stateChanges.next())),
          this._dirtyCheckNativeValue(),
          this._dirtyCheckPlaceholder());
      }
      focus(t) {
        this._elementRef.nativeElement.focus(t);
      }
      updateErrorState() {
        this._errorStateTracker.updateErrorState();
      }
      _focusChanged(t) {
        if (t !== this.focused) {
          if (!this._isNativeSelect && t && this.disabled && this.disabledInteractive) {
            let e = this._elementRef.nativeElement;
            e.type === 'number'
              ? ((e.type = 'text'), e.setSelectionRange(0, 0), (e.type = 'number'))
              : e.setSelectionRange(0, 0);
          }
          ((this.focused = t), this.stateChanges.next());
        }
      }
      _onInput() {}
      _dirtyCheckNativeValue() {
        let t = this._elementRef.nativeElement.value;
        this._previousNativeValue !== t &&
          ((this._previousNativeValue = t), this.stateChanges.next());
      }
      _dirtyCheckPlaceholder() {
        let t = this._getPlaceholder();
        if (t !== this._previousPlaceholder) {
          let e = this._elementRef.nativeElement;
          ((this._previousPlaceholder = t),
            t ? e.setAttribute('placeholder', t) : e.removeAttribute('placeholder'));
        }
      }
      _getPlaceholder() {
        return this.placeholder || null;
      }
      _validateType() {
        Xe.indexOf(this._type) > -1;
      }
      _isNeverEmpty() {
        return this._neverEmptyInputTypes.indexOf(this._type) > -1;
      }
      _isBadInput() {
        let t = this._elementRef.nativeElement.validity;
        return t && t.badInput;
      }
      get empty() {
        return (
          !this._isNeverEmpty() &&
          !this._elementRef.nativeElement.value &&
          !this._isBadInput() &&
          !this.autofilled
        );
      }
      get shouldLabelFloat() {
        if (this._isNativeSelect) {
          let t = this._elementRef.nativeElement,
            e = t.options[0];
          return (
            this.focused || t.multiple || !this.empty || !!(t.selectedIndex > -1 && e && e.label)
          );
        } else return (this.focused && !this.disabled) || !this.empty;
      }
      get describedByIds() {
        return this._elementRef.nativeElement.getAttribute('aria-describedby')?.split(' ') || [];
      }
      setDescribedByIds(t) {
        let e = this._elementRef.nativeElement;
        t.length
          ? e.setAttribute('aria-describedby', t.join(' '))
          : e.removeAttribute('aria-describedby');
      }
      onContainerClick() {
        this.focused || this.focus();
      }
      _isInlineSelect() {
        let t = this._elementRef.nativeElement;
        return this._isNativeSelect && (t.multiple || t.size > 1);
      }
      _iOSKeyupListener = (t) => {
        let e = t.target;
        !e.value &&
          e.selectionStart === 0 &&
          e.selectionEnd === 0 &&
          (e.setSelectionRange(1, 1), e.setSelectionRange(0, 0));
      };
      _getReadonlyAttribute() {
        return this._isNativeSelect
          ? null
          : this.readonly || (this.disabled && this.disabledInteractive)
            ? 'true'
            : null;
      }
      static ɵfac = function (e) {
        return new (e || i)();
      };
      static ɵdir = Mv({
        type: i,
        selectors: [
          ['input', 'matInput', ''],
          ['textarea', 'matInput', ''],
          ['select', 'matNativeControl', ''],
          ['input', 'matNativeControl', ''],
          ['textarea', 'matNativeControl', ''],
        ],
        hostAttrs: [1, 'mat-mdc-input-element'],
        hostVars: 21,
        hostBindings: function (e, n) {
          (e & 1 &&
            vf('focus', function () {
              return n._focusChanged(true);
            })('blur', function () {
              return n._focusChanged(false);
            })('input', function () {
              return n._onInput();
            }),
            e & 2 &&
              (mf('id', n.id)('disabled', n.disabled && !n.disabledInteractive)(
                'required',
                n.required,
              ),
              df('name', n.name || null)('readonly', n._getReadonlyAttribute())(
                'aria-disabled',
                n.disabled && n.disabledInteractive ? 'true' : null,
              )('aria-invalid', n.empty && n.required ? null : n.errorState)(
                'aria-required',
                n.required,
              )('id', n.id),
              _f('mat-input-server', n._isServer)(
                'mat-mdc-form-field-textarea-control',
                n._isInFormField && n._isTextarea,
              )('mat-mdc-form-field-input-control', n._isInFormField)(
                'mat-mdc-input-disabled-interactive',
                n.disabledInteractive,
              )('mdc-text-field__input', n._isInFormField)(
                'mat-mdc-native-select-inline',
                n._isInlineSelect(),
              )));
        },
        inputs: {
          disabled: 'disabled',
          id: 'id',
          placeholder: 'placeholder',
          name: 'name',
          required: 'required',
          type: 'type',
          errorStateMatcher: 'errorStateMatcher',
          userAriaDescribedBy: [0, 'aria-describedby', 'userAriaDescribedBy'],
          value: 'value',
          readonly: 'readonly',
          disabledInteractive: [2, 'disabledInteractive', 'disabledInteractive', pO],
        },
        exportAs: ['matInput'],
        features: [RE([{ provide: ht, useExisting: i }]), eg],
      });
    }
    return i;
  })(),
  Mn = (() => {
    class i {
      static ɵfac = function (e) {
        return new (e || i)();
      };
      static ɵmod = Cv({ type: i });
      static ɵinj = Bc({ imports: [ut, ut, ae, Xt$1] });
    }
    return i;
  })();
var le = (() => {
  class i {
    static ɵfac = function (e) {
      return new (e || i)();
    };
    static ɵmod = Cv({ type: i });
    static ɵinj = Bc({ imports: [Xt$1] });
  }
  return i;
})();
var de = (() => {
  class i {
    static ɵfac = function (e) {
      return new (e || i)();
    };
    static ɵmod = Cv({ type: i });
    static ɵinj = Bc({ imports: [Xt$1] });
  }
  return i;
})();
var jn = (() => {
  class i {
    static ɵfac = function (e) {
      return new (e || i)();
    };
    static ɵmod = Cv({ type: i });
    static ɵinj = Bc({ imports: [Lw, Pl, de, Xt$1, le] });
  }
  return i;
})();
export {
  Cn as C,
  He as H,
  Mn as M,
  le as a,
  di as d,
  ie as i,
  jn as j,
  li as l,
  mt as m,
  oi as o,
  ri as r,
  si as s,
  ut as u,
};

import { A as An, y as yn, Z as Zt, O as On, a as Ae, b as ge } from './chunk-DuM-lQYB.js';
import {
  E,
  _ as _i,
  ax as aO,
  T as Tv,
  J as J0,
  K as K0,
  r as rw,
  L as Lo,
  C as CE,
  F as Fa,
  p as pf,
  v as vf,
  b as Cm,
  f as ff,
  ay as sm,
  d as Cv,
  B as Bc,
  al as Pl,
  X as Xt,
  s as sl,
  a as _e,
  I as ws,
  az as jE,
  aA as Rf,
  R as Ry,
  A as Af,
  aB as kf,
  P as Py,
  t as ot,
  j as ja,
  V as Va,
  $ as $v,
  H as Ha,
  U as Uv,
  i as dO,
  h as Jn,
  aC as _o,
  l as So,
  y as en,
  aD as xe,
  aq as Xn,
  aE as kl,
  N,
  aF as qf,
  aG as w0,
  aj as pO,
  Z as Zv,
  Y as Yv,
  ao as tE,
  ak as df,
  e as _f,
  a8 as Df,
  aa as Jv,
  ab as Xv,
  aH as Gu,
  aI as ee,
  G as Mf,
  aJ as Uw,
  M as Mv,
  a6 as RE,
  ad as If,
  z as zv,
  aK as Vr,
  aL as NE,
  aM as am,
} from './main-5CP2EVYS.js';
var k = class i {
  client = E(Gu);
  logger = E(sl);
  supabase = this.client.getSupabaseClient();
  language = _e('');
  accent = _e('');
  sentenceId = _e('');
  presignedUrlCache = new Map();
  bucketName = 'repeat-with-me-audio';
  sentencesCache = new Map();
  getSentences(a, e, n) {
    if (!a || !e || !n) return Promise.reject([]);
    let t = `${a.toLowerCase()}/${e.toLowerCase()}`;
    if ((this.logger.debug('data.service.ts getSentences | key:', t), this.sentencesCache.has(t)))
      return (
        this.logger.debug('data.service.ts getSentences | sentencesCache Hit!'),
        this.sentencesCache.get(t)
      );
    let o = this.fetchSentences(a, e);
    return (this.sentencesCache.set(t, o), o.catch(() => this.sentencesCache.delete(t)), o);
  }
  async fetchSentences(a, e) {
    this.logger.debug(`data.service.ts fetchSentences | ${a} ${e}`);
    let { data: n, error: t } = await this.supabase
      .from('sentences')
      .select('text, ipa, pinyin, sentence_id, language!inner(language), accent!inner(accent)')
      .eq('language.language', a)
      .eq('accent.accent', e);
    if (t)
      throw (this.logger.error('data.service.ts sentences | Supabase query failed:', t.message), t);
    return n.map((o) => ({
      text: o.text,
      ipa: o.ipa,
      pinyin: o.pinyin,
      sentenceId: o.sentence_id,
    }));
  }
  getPresignedUrl(a, e, n) {
    if (!a || !e || !n) return Promise.reject('No key provided');
    let t = `${a.toLowerCase()}/${e.toLowerCase()}/sentence_${n}.wav`;
    if (
      (this.logger.debug('data.service.ts getPresignedUrl | key:', t),
      this.presignedUrlCache.has(t))
    )
      return (
        this.logger.debug('data.service.ts getPresignedUrl | presignedUrlCache Hit!'),
        this.presignedUrlCache.get(t)
      );
    let o = this.fetchAudio(t);
    return (this.presignedUrlCache.set(t, o), o.catch(() => this.presignedUrlCache.delete(t)), o);
  }
  async fetchAudio(a) {
    this.logger.debug('data.service.ts fetchAudio | key:', a);
    let { data: e, error: n } = await this.supabase.storage
      .from(this.bucketName)
      .createSignedUrl(a, 3600);
    if (n) throw (this.logger.error('data.service.ts fetchAudio | Error:', n.message), n);
    return e.signedUrl;
  }
  static ɵfac = function (e) {
    return new (e || i)();
  };
  static ɵprov = ee({ token: i, factory: i.ɵfac, providedIn: 'root' });
};
var je = ['button'],
  ze = ['*'];
function qe(i, a) {
  if ((i & 1 && (Lo(0, 'div', 2), pf(1, 'mat-pseudo-checkbox', 6), Fa()), i & 2)) {
    let e = zv();
    (Cm(), ff('disabled', e.disabled));
  }
}
var Ne = new N('MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS', {
    providedIn: 'root',
    factory: () => ({
      hideSingleSelectionIndicator: false,
      hideMultipleSelectionIndicator: false,
      disabledInteractive: false,
    }),
  }),
  Pe = new N('MatButtonToggleGroup'),
  We = { provide: ge, useExisting: Vr(() => $), multi: true },
  R = class {
    source;
    value;
    constructor(a, e) {
      ((this.source = a), (this.value = e));
    }
  },
  $ = (() => {
    class i {
      _changeDetector = E(dO);
      _dir = E(Mf, { optional: true });
      _multiple = false;
      _disabled = false;
      _disabledInteractive = false;
      _selectionModel;
      _rawValue;
      _controlValueAccessorChangeFn = () => {};
      _onTouched = () => {};
      _buttonToggles;
      appearance;
      get name() {
        return this._name;
      }
      set name(e) {
        ((this._name = e), this._markButtonsForCheck());
      }
      _name = E(So).getId('mat-button-toggle-group-');
      vertical = false;
      get value() {
        let e = this._selectionModel ? this._selectionModel.selected : [];
        return this.multiple ? e.map((n) => n.value) : e[0] ? e[0].value : void 0;
      }
      set value(e) {
        (this._setSelectionByValue(e), this.valueChange.emit(this.value));
      }
      valueChange = new xe();
      get selected() {
        let e = this._selectionModel ? this._selectionModel.selected : [];
        return this.multiple ? e : e[0] || null;
      }
      get multiple() {
        return this._multiple;
      }
      set multiple(e) {
        ((this._multiple = e), this._markButtonsForCheck());
      }
      get disabled() {
        return this._disabled;
      }
      set disabled(e) {
        ((this._disabled = e), this._markButtonsForCheck());
      }
      get disabledInteractive() {
        return this._disabledInteractive;
      }
      set disabledInteractive(e) {
        ((this._disabledInteractive = e), this._markButtonsForCheck());
      }
      get dir() {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
      }
      change = new xe();
      get hideSingleSelectionIndicator() {
        return this._hideSingleSelectionIndicator;
      }
      set hideSingleSelectionIndicator(e) {
        ((this._hideSingleSelectionIndicator = e), this._markButtonsForCheck());
      }
      _hideSingleSelectionIndicator;
      get hideMultipleSelectionIndicator() {
        return this._hideMultipleSelectionIndicator;
      }
      set hideMultipleSelectionIndicator(e) {
        ((this._hideMultipleSelectionIndicator = e), this._markButtonsForCheck());
      }
      _hideMultipleSelectionIndicator;
      constructor() {
        let e = E(Ne, { optional: true });
        ((this.appearance = e && e.appearance ? e.appearance : 'standard'),
          (this._hideSingleSelectionIndicator = e?.hideSingleSelectionIndicator ?? false),
          (this._hideMultipleSelectionIndicator = e?.hideMultipleSelectionIndicator ?? false));
      }
      ngOnInit() {
        this._selectionModel = new Ae(this.multiple, void 0, false);
      }
      ngAfterContentInit() {
        (this._selectionModel.select(...this._buttonToggles.filter((e) => e.checked)),
          this.multiple || this._initializeTabIndex());
      }
      writeValue(e) {
        ((this.value = e), this._changeDetector.markForCheck());
      }
      registerOnChange(e) {
        this._controlValueAccessorChangeFn = e;
      }
      registerOnTouched(e) {
        this._onTouched = e;
      }
      setDisabledState(e) {
        this.disabled = e;
      }
      _keydown(e) {
        if (this.multiple || this.disabled || Uw(e)) return;
        let t = e.target.id,
          o = this._buttonToggles.toArray().findIndex((S) => S.buttonId === t),
          g = null;
        switch (e.keyCode) {
          case 32:
          case 13:
            g = this._buttonToggles.get(o) || null;
            break;
          case 38:
            g = this._getNextButton(o, -1);
            break;
          case 37:
            g = this._getNextButton(o, this.dir === 'ltr' ? -1 : 1);
            break;
          case 40:
            g = this._getNextButton(o, 1);
            break;
          case 39:
            g = this._getNextButton(o, this.dir === 'ltr' ? 1 : -1);
            break;
          default:
            return;
        }
        g && (e.preventDefault(), g._onButtonClick(), g.focus());
      }
      _emitChangeEvent(e) {
        let n = new R(e, this.value);
        ((this._rawValue = n.value),
          this._controlValueAccessorChangeFn(n.value),
          this.change.emit(n));
      }
      _syncButtonToggle(e, n, t = false, o = false) {
        (!this.multiple && this.selected && !e.checked && (this.selected.checked = false),
          this._selectionModel
            ? n
              ? this._selectionModel.select(e)
              : this._selectionModel.deselect(e)
            : (o = true),
          o
            ? Promise.resolve().then(() => this._updateModelValue(e, t))
            : this._updateModelValue(e, t));
      }
      _isSelected(e) {
        return this._selectionModel && this._selectionModel.isSelected(e);
      }
      _isPrechecked(e) {
        return typeof this._rawValue > 'u'
          ? false
          : this.multiple && Array.isArray(this._rawValue)
            ? this._rawValue.some((n) => e.value != null && n === e.value)
            : e.value === this._rawValue;
      }
      _initializeTabIndex() {
        if (
          (this._buttonToggles.forEach((e) => {
            e.tabIndex = -1;
          }),
          this.selected)
        )
          this.selected.tabIndex = 0;
        else
          for (let e = 0; e < this._buttonToggles.length; e++) {
            let n = this._buttonToggles.get(e);
            if (!n.disabled) {
              n.tabIndex = 0;
              break;
            }
          }
      }
      _getNextButton(e, n) {
        let t = this._buttonToggles;
        for (let o = 1; o <= t.length; o++) {
          let g = (e + n * o + t.length) % t.length,
            S = t.get(g);
          if (S && !S.disabled) return S;
        }
        return null;
      }
      _setSelectionByValue(e) {
        if (((this._rawValue = e), !this._buttonToggles)) return;
        let n = this._buttonToggles.toArray();
        if (
          (this.multiple && e
            ? (this._clearSelection(), e.forEach((t) => this._selectValue(t, n)))
            : (this._clearSelection(), this._selectValue(e, n)),
          !this.multiple && n.every((t) => t.tabIndex === -1))
        ) {
          for (let t of n)
            if (!t.disabled) {
              t.tabIndex = 0;
              break;
            }
        }
      }
      _clearSelection() {
        (this._selectionModel.clear(),
          this._buttonToggles.forEach((e) => {
            ((e.checked = false), this.multiple || (e.tabIndex = -1));
          }));
      }
      _selectValue(e, n) {
        for (let t of n)
          if (t.value === e) {
            ((t.checked = true), this._selectionModel.select(t), this.multiple || (t.tabIndex = 0));
            break;
          }
      }
      _updateModelValue(e, n) {
        (n && this._emitChangeEvent(e), this.valueChange.emit(this.value));
      }
      _markButtonsForCheck() {
        this._buttonToggles?.forEach((e) => e._markForCheck());
      }
      static ɵfac = function (n) {
        return new (n || i)();
      };
      static ɵdir = Mv({
        type: i,
        selectors: [['mat-button-toggle-group']],
        contentQueries: function (n, t, o) {
          if ((n & 1 && If(o, O, 5), n & 2)) {
            let g;
            Jv((g = Xv())) && (t._buttonToggles = g);
          }
        },
        hostAttrs: [1, 'mat-button-toggle-group'],
        hostVars: 6,
        hostBindings: function (n, t) {
          (n & 1 &&
            vf('keydown', function (g) {
              return t._keydown(g);
            }),
            n & 2 &&
              (df('role', t.multiple ? 'group' : 'radiogroup')('aria-disabled', t.disabled),
              _f('mat-button-toggle-vertical', t.vertical)(
                'mat-button-toggle-group-appearance-standard',
                t.appearance === 'standard',
              )));
        },
        inputs: {
          appearance: 'appearance',
          name: 'name',
          vertical: [2, 'vertical', 'vertical', pO],
          value: 'value',
          multiple: [2, 'multiple', 'multiple', pO],
          disabled: [2, 'disabled', 'disabled', pO],
          disabledInteractive: [2, 'disabledInteractive', 'disabledInteractive', pO],
          hideSingleSelectionIndicator: [
            2,
            'hideSingleSelectionIndicator',
            'hideSingleSelectionIndicator',
            pO,
          ],
          hideMultipleSelectionIndicator: [
            2,
            'hideMultipleSelectionIndicator',
            'hideMultipleSelectionIndicator',
            pO,
          ],
        },
        outputs: { valueChange: 'valueChange', change: 'change' },
        exportAs: ['matButtonToggleGroup'],
        features: [RE([We, { provide: Pe, useExisting: i }])],
      });
    }
    return i;
  })(),
  O = (() => {
    class i {
      _changeDetectorRef = E(dO);
      _elementRef = E(Jn);
      _focusMonitor = E(_o);
      _idGenerator = E(So);
      _animationDisabled = en();
      _checked = false;
      ariaLabel;
      ariaLabelledby = null;
      _buttonElement;
      buttonToggleGroup;
      get buttonId() {
        return `${this.id}-button`;
      }
      id;
      name;
      value;
      get tabIndex() {
        return this._tabIndex();
      }
      set tabIndex(e) {
        this._tabIndex.set(e);
      }
      _tabIndex;
      disableRipple = false;
      get appearance() {
        return this.buttonToggleGroup ? this.buttonToggleGroup.appearance : this._appearance;
      }
      set appearance(e) {
        this._appearance = e;
      }
      _appearance;
      get checked() {
        return this.buttonToggleGroup ? this.buttonToggleGroup._isSelected(this) : this._checked;
      }
      set checked(e) {
        e !== this._checked &&
          ((this._checked = e),
          this.buttonToggleGroup && this.buttonToggleGroup._syncButtonToggle(this, this._checked),
          this._changeDetectorRef.markForCheck());
      }
      get disabled() {
        return this._disabled || (this.buttonToggleGroup && this.buttonToggleGroup.disabled);
      }
      set disabled(e) {
        this._disabled = e;
      }
      _disabled = false;
      get disabledInteractive() {
        return (
          this._disabledInteractive ||
          (this.buttonToggleGroup !== null && this.buttonToggleGroup.disabledInteractive)
        );
      }
      set disabledInteractive(e) {
        this._disabledInteractive = e;
      }
      _disabledInteractive;
      change = new xe();
      constructor() {
        E(Xn).load(kl);
        let e = E(Pe, { optional: true }),
          n = E(new qf('tabindex'), { optional: true }) || '',
          t = E(Ne, { optional: true });
        ((this._tabIndex = _e(parseInt(n) || 0)),
          (this.buttonToggleGroup = e),
          (this._appearance = t && t.appearance ? t.appearance : 'standard'),
          (this._disabledInteractive = t?.disabledInteractive ?? false));
      }
      ngOnInit() {
        let e = this.buttonToggleGroup;
        ((this.id = this.id || this._idGenerator.getId('mat-button-toggle-')),
          e &&
            (e._isPrechecked(this)
              ? (this.checked = true)
              : e._isSelected(this) !== this._checked && e._syncButtonToggle(this, this._checked)));
      }
      ngAfterViewInit() {
        (this._animationDisabled ||
          this._elementRef.nativeElement.classList.add('mat-button-toggle-animations-enabled'),
          this._focusMonitor.monitor(this._elementRef, true));
      }
      ngOnDestroy() {
        let e = this.buttonToggleGroup;
        (this._focusMonitor.stopMonitoring(this._elementRef),
          e && e._isSelected(this) && e._syncButtonToggle(this, false, false, true));
      }
      focus(e) {
        this._buttonElement.nativeElement.focus(e);
      }
      _onButtonClick() {
        if (this.disabled) return;
        let e = this.isSingleSelector() ? true : !this._checked;
        if (
          (e !== this._checked &&
            ((this._checked = e),
            this.buttonToggleGroup &&
              (this.buttonToggleGroup._syncButtonToggle(this, this._checked, true),
              this.buttonToggleGroup._onTouched())),
          this.isSingleSelector())
        ) {
          let n = this.buttonToggleGroup._buttonToggles.find((t) => t.tabIndex === 0);
          (n && (n.tabIndex = -1), (this.tabIndex = 0));
        }
        this.change.emit(new R(this, this.value));
      }
      _markForCheck() {
        this._changeDetectorRef.markForCheck();
      }
      _getButtonName() {
        return this.isSingleSelector() ? this.buttonToggleGroup.name : this.name || null;
      }
      isSingleSelector() {
        return this.buttonToggleGroup && !this.buttonToggleGroup.multiple;
      }
      static ɵfac = function (n) {
        return new (n || i)();
      };
      static ɵcmp = Tv({
        type: i,
        selectors: [['mat-button-toggle']],
        viewQuery: function (n, t) {
          if ((n & 1 && Df(je, 5), n & 2)) {
            let o;
            Jv((o = Xv())) && (t._buttonElement = o.first);
          }
        },
        hostAttrs: ['role', 'presentation', 1, 'mat-button-toggle'],
        hostVars: 14,
        hostBindings: function (n, t) {
          (n & 1 &&
            vf('focus', function () {
              return t.focus();
            }),
            n & 2 &&
              (df('aria-label', null)('aria-labelledby', null)('id', t.id)('name', null),
              _f('mat-button-toggle-standalone', !t.buttonToggleGroup)(
                'mat-button-toggle-checked',
                t.checked,
              )('mat-button-toggle-disabled', t.disabled)(
                'mat-button-toggle-disabled-interactive',
                t.disabledInteractive,
              )('mat-button-toggle-appearance-standard', t.appearance === 'standard')));
        },
        inputs: {
          ariaLabel: [0, 'aria-label', 'ariaLabel'],
          ariaLabelledby: [0, 'aria-labelledby', 'ariaLabelledby'],
          id: 'id',
          name: 'name',
          value: 'value',
          tabIndex: 'tabIndex',
          disableRipple: [2, 'disableRipple', 'disableRipple', pO],
          appearance: 'appearance',
          checked: [2, 'checked', 'checked', pO],
          disabled: [2, 'disabled', 'disabled', pO],
          disabledInteractive: [2, 'disabledInteractive', 'disabledInteractive', pO],
        },
        outputs: { change: 'change' },
        exportAs: ['matButtonToggle'],
        ngContentSelectors: ze,
        decls: 7,
        vars: 13,
        consts: [
          ['button', ''],
          [
            'type',
            'button',
            1,
            'mat-button-toggle-button',
            'mat-focus-indicator',
            3,
            'click',
            'id',
            'disabled',
          ],
          [1, 'mat-button-toggle-checkbox-wrapper'],
          [1, 'mat-button-toggle-label-content'],
          [1, 'mat-button-toggle-focus-overlay'],
          [
            'matRipple',
            '',
            1,
            'mat-button-toggle-ripple',
            3,
            'matRippleTrigger',
            'matRippleDisabled',
          ],
          ['state', 'checked', 'aria-hidden', 'true', 'appearance', 'minimal', 3, 'disabled'],
        ],
        template: function (n, t) {
          if (
            (n & 1 &&
              (Zv(),
              Lo(0, 'button', 1, 0),
              vf('click', function () {
                return t._onButtonClick();
              }),
              $v(2, qe, 2, 1, 'div', 2),
              Lo(3, 'span', 3),
              Yv(4),
              Fa()(),
              pf(5, 'span', 4)(6, 'span', 5)),
            n & 2)
          ) {
            let o = tE(1);
            (ff('id', t.buttonId)('disabled', (t.disabled && !t.disabledInteractive) || null),
              df('role', t.isSingleSelector() ? 'radio' : 'button')(
                'tabindex',
                t.disabled && !t.disabledInteractive ? -1 : t.tabIndex,
              )('aria-pressed', t.isSingleSelector() ? null : t.checked)(
                'aria-checked',
                t.isSingleSelector() ? t.checked : null,
              )('name', t._getButtonName())('aria-label', t.ariaLabel)(
                'aria-labelledby',
                t.ariaLabelledby,
              )('aria-disabled', t.disabled && t.disabledInteractive ? 'true' : null),
              Cm(2),
              Uv(
                t.buttonToggleGroup &&
                  ((!t.buttonToggleGroup.multiple &&
                    !t.buttonToggleGroup.hideSingleSelectionIndicator) ||
                    (t.buttonToggleGroup.multiple &&
                      !t.buttonToggleGroup.hideMultipleSelectionIndicator))
                  ? 2
                  : -1,
              ),
              Cm(4),
              ff('matRippleTrigger', o)('matRippleDisabled', t.disableRipple || t.disabled));
          }
        },
        dependencies: [w0, On],
        styles: [
          `.mat-button-toggle-standalone,
.mat-button-toggle-group {
  position: relative;
  display: inline-flex;
  flex-direction: row;
  white-space: nowrap;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
  border-radius: var(--mat-button-toggle-legacy-shape);
  transform: translateZ(0);
}
.mat-button-toggle-standalone:not([class*=mat-elevation-z]),
.mat-button-toggle-group:not([class*=mat-elevation-z]) {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
@media (forced-colors: active) {
  .mat-button-toggle-standalone,
  .mat-button-toggle-group {
    outline: solid 1px;
  }
}

.mat-button-toggle-standalone.mat-button-toggle-appearance-standard,
.mat-button-toggle-group-appearance-standard {
  border-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
.mat-button-toggle-standalone.mat-button-toggle-appearance-standard .mat-pseudo-checkbox,
.mat-button-toggle-group-appearance-standard .mat-pseudo-checkbox {
  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-button-toggle-selected-state-text-color, var(--mat-sys-on-secondary-container));
}
.mat-button-toggle-standalone.mat-button-toggle-appearance-standard:not([class*=mat-elevation-z]),
.mat-button-toggle-group-appearance-standard:not([class*=mat-elevation-z]) {
  box-shadow: none;
}
@media (forced-colors: active) {
  .mat-button-toggle-standalone.mat-button-toggle-appearance-standard,
  .mat-button-toggle-group-appearance-standard {
    outline: 0;
  }
}

.mat-button-toggle-vertical {
  flex-direction: column;
}
.mat-button-toggle-vertical .mat-button-toggle-label-content {
  display: block;
}

.mat-button-toggle {
  white-space: nowrap;
  position: relative;
  color: var(--mat-button-toggle-legacy-text-color);
  font-family: var(--mat-button-toggle-legacy-label-text-font);
  font-size: var(--mat-button-toggle-legacy-label-text-size);
  line-height: var(--mat-button-toggle-legacy-label-text-line-height);
  font-weight: var(--mat-button-toggle-legacy-label-text-weight);
  letter-spacing: var(--mat-button-toggle-legacy-label-text-tracking);
  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-button-toggle-legacy-selected-state-text-color);
}
.mat-button-toggle.cdk-keyboard-focused .mat-button-toggle-focus-overlay {
  opacity: var(--mat-button-toggle-legacy-focus-state-layer-opacity);
}
.mat-button-toggle .mat-icon svg {
  vertical-align: top;
}

.mat-button-toggle-checkbox-wrapper {
  display: inline-block;
  justify-content: flex-start;
  align-items: center;
  width: 0;
  height: 18px;
  line-height: 18px;
  overflow: hidden;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translate3d(0, -50%, 0);
}
[dir=rtl] .mat-button-toggle-checkbox-wrapper {
  left: auto;
  right: 16px;
}
.mat-button-toggle-appearance-standard .mat-button-toggle-checkbox-wrapper {
  left: 12px;
}
[dir=rtl] .mat-button-toggle-appearance-standard .mat-button-toggle-checkbox-wrapper {
  left: auto;
  right: 12px;
}
.mat-button-toggle-checked .mat-button-toggle-checkbox-wrapper {
  width: 18px;
}
.mat-button-toggle-animations-enabled .mat-button-toggle-checkbox-wrapper {
  transition: width 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-button-toggle-vertical .mat-button-toggle-checkbox-wrapper {
  transition: none;
}

.mat-button-toggle-checked {
  color: var(--mat-button-toggle-legacy-selected-state-text-color);
  background-color: var(--mat-button-toggle-legacy-selected-state-background-color);
}

.mat-button-toggle-disabled {
  pointer-events: none;
  color: var(--mat-button-toggle-legacy-disabled-state-text-color);
  background-color: var(--mat-button-toggle-legacy-disabled-state-background-color);
  --mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color: var(--mat-button-toggle-legacy-disabled-state-text-color);
}
.mat-button-toggle-disabled.mat-button-toggle-checked {
  background-color: var(--mat-button-toggle-legacy-disabled-selected-state-background-color);
}

.mat-button-toggle-disabled-interactive {
  pointer-events: auto;
}

.mat-button-toggle-appearance-standard {
  color: var(--mat-button-toggle-text-color, var(--mat-sys-on-surface));
  background-color: var(--mat-button-toggle-background-color, transparent);
  font-family: var(--mat-button-toggle-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-toggle-label-text-size, var(--mat-sys-label-large-size));
  line-height: var(--mat-button-toggle-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-weight: var(--mat-button-toggle-label-text-weight, var(--mat-sys-label-large-weight));
  letter-spacing: var(--mat-button-toggle-label-text-tracking, var(--mat-sys-label-large-tracking));
}
.mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
[dir=rtl] .mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: none;
  border-right: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: none;
  border-right: none;
  border-top: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-checked {
  color: var(--mat-button-toggle-selected-state-text-color, var(--mat-sys-on-secondary-container));
  background-color: var(--mat-button-toggle-selected-state-background-color, var(--mat-sys-secondary-container));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled {
  color: var(--mat-button-toggle-disabled-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-toggle-disabled-state-background-color, transparent);
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled .mat-pseudo-checkbox {
  --mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color: var(--mat-button-toggle-disabled-selected-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled.mat-button-toggle-checked {
  color: var(--mat-button-toggle-disabled-selected-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-toggle-disabled-selected-state-background-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay {
  background-color: var(--mat-button-toggle-state-layer-color, var(--mat-sys-on-surface));
}
.mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay {
  opacity: var(--mat-button-toggle-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-button-toggle-appearance-standard.cdk-keyboard-focused .mat-button-toggle-focus-overlay {
  opacity: var(--mat-button-toggle-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
@media (hover: none) {
  .mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay {
    display: none;
  }
}

.mat-button-toggle-label-content {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  padding: 0 16px;
  line-height: var(--mat-button-toggle-legacy-height);
  position: relative;
}
.mat-button-toggle-appearance-standard .mat-button-toggle-label-content {
  padding: 0 12px;
  line-height: var(--mat-button-toggle-height, 40px);
}

.mat-button-toggle-label-content > * {
  vertical-align: middle;
}

.mat-button-toggle-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  background-color: var(--mat-button-toggle-legacy-state-layer-color);
}

@media (forced-colors: active) {
  .mat-button-toggle-checked .mat-button-toggle-focus-overlay {
    border-bottom: solid 500px;
    opacity: 0.5;
    height: 0;
  }
  .mat-button-toggle-checked:hover .mat-button-toggle-focus-overlay {
    opacity: 0.6;
  }
  .mat-button-toggle-checked.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay {
    border-bottom: solid 500px;
  }
}
.mat-button-toggle .mat-button-toggle-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}

.mat-button-toggle-button {
  border: 0;
  background: none;
  color: inherit;
  padding: 0;
  margin: 0;
  font: inherit;
  outline: none;
  width: 100%;
  cursor: pointer;
}
.mat-button-toggle-animations-enabled .mat-button-toggle-button {
  transition: padding 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-button-toggle-vertical .mat-button-toggle-button {
  transition: none;
}
.mat-button-toggle-disabled .mat-button-toggle-button {
  cursor: default;
}
.mat-button-toggle-button::-moz-focus-inner {
  border: 0;
}
.mat-button-toggle-checked .mat-button-toggle-button:has(.mat-button-toggle-checkbox-wrapper) {
  padding-left: 30px;
}
[dir=rtl] .mat-button-toggle-checked .mat-button-toggle-button:has(.mat-button-toggle-checkbox-wrapper) {
  padding-left: 0;
  padding-right: 30px;
}

.mat-button-toggle-standalone.mat-button-toggle-appearance-standard {
  --mat-focus-indicator-border-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}

.mat-button-toggle-group-appearance-standard:not(.mat-button-toggle-vertical) .mat-button-toggle:last-of-type .mat-button-toggle-button::before {
  border-top-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-bottom-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}
.mat-button-toggle-group-appearance-standard:not(.mat-button-toggle-vertical) .mat-button-toggle:first-of-type .mat-button-toggle-button::before {
  border-top-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-bottom-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}

.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle:last-of-type .mat-button-toggle-button::before {
  border-bottom-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-bottom-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}
.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle:first-of-type .mat-button-toggle-button::before {
  border-top-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-top-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}
`,
        ],
        encapsulation: 2,
      });
    }
    return i;
  })(),
  F = (() => {
    class i {
      static ɵfac = function (n) {
        return new (n || i)();
      };
      static ɵmod = Cv({ type: i });
      static ɵinj = Bc({ imports: [Pl, O, Xt] });
    }
    return i;
  })();
var L = class i {
  language = aO.required();
  accent = aO.required();
  sentenceId = aO.required();
  dataService = E(k);
  logger = E(sl);
  isPlaying = _e(false);
  audio = new Audio();
  playbackSpeed = '100';
  constructor() {
    ws(() => {
      this.sentenceId();
      this.stopAudio();
    });
  }
  audioResource = jE({
    params: () => ({ lang: this.language(), acc: this.accent(), id: this.sentenceId() }),
    loader: async ({ params: a }) => {
      if (!a.lang || !a.acc || !a.id) return;
      let e = await this.dataService.getPresignedUrl(a.lang, a.acc, a.id);
      return new Audio(e);
    },
  });
  handleAudioEnded = () => {
    (this.logger.debug('audio-player.ts handleAudioEnded'),
      this.isPlaying.set(false),
      this.playAudio());
  };
  playAudio() {
    (this.logger.debug('audio-player.ts playAudio'),
      this.isPlaying() ||
        ((this.audio = this.audioResource.value() || new Audio('')),
        (this.audio.onended = this.handleAudioEnded),
        this.audio.load(),
        (this.audio.playbackRate = parseInt(this.playbackSpeed, 10) / 100),
        this.audio.play(),
        this.isPlaying.set(true)));
  }
  pauseAudio() {
    (this.logger.debug('audio-player.ts pauseAudio'),
      this.audio.pause(),
      this.isPlaying.set(false));
  }
  stopAudio() {
    (this.logger.debug('audio-player.ts stopAudio'),
      this.audio.pause(),
      (this.audio.currentTime = 0),
      this.isPlaying.set(false));
  }
  onSpaceBar() {
    this.isPlaying() ? this.pauseAudio() : this.playAudio();
  }
  static ɵfac = function (e) {
    return new (e || i)();
  };
  static ɵcmp = Tv({
    type: i,
    selectors: [['app-audio-player']],
    hostBindings: function (e, n) {
      e & 1 &&
        vf(
          'keydown.space',
          function () {
            return n.onSpaceBar();
          },
          am,
        );
    },
    inputs: { language: [1, 'language'], accent: [1, 'accent'], sentenceId: [1, 'sentenceId'] },
    decls: 19,
    vars: 2,
    consts: [
      ['mat-raised-button', '', 3, 'click'],
      ['name', 'playBackSpeed', 'aria-label', 'Play Back Speed', 3, 'ngModelChange', 'ngModel'],
      ['value', '25'],
      ['value', '50'],
      ['value', '75'],
      ['value', '90'],
      ['value', '100'],
      ['value', '110'],
    ],
    template: function (e, n) {
      (e & 1 &&
        (Lo(0, 'button', 0),
        vf('click', function () {
          return n.playAudio();
        }),
        CE(1, 'Play Audio'),
        Fa(),
        Lo(2, 'button', 0),
        vf('click', function () {
          return n.stopAudio();
        }),
        CE(3, 'Stop Audio'),
        Fa(),
        Lo(4, 'p'),
        CE(5),
        Fa(),
        Lo(6, 'mat-button-toggle-group', 1),
        Rf('ngModelChange', function (o) {
          return (NE(n.playbackSpeed, o) || (n.playbackSpeed = o), o);
        }),
        Lo(7, 'mat-button-toggle', 2),
        CE(8, '25%'),
        Fa(),
        Lo(9, 'mat-button-toggle', 3),
        CE(10, '50%'),
        Fa(),
        Lo(11, 'mat-button-toggle', 4),
        CE(12, '75%'),
        Fa(),
        Lo(13, 'mat-button-toggle', 5),
        CE(14, '90%'),
        Fa(),
        Lo(15, 'mat-button-toggle', 6),
        CE(16, '100%'),
        Fa(),
        Lo(17, 'mat-button-toggle', 7),
        CE(18, '110%'),
        Fa()(),
        Ry()),
        e & 2 && (Cm(5), Af(n.isPlaying()), Cm(), kf('ngModel', n.playbackSpeed), Py()));
    },
    dependencies: [J0, K0, rw, F, $, O, An, yn, Zt],
    encapsulation: 2,
  });
};
function Ke(i, a) {
  if ((i & 1 && (ja(0, 'p'), CE(1), Va()), i & 2)) {
    let e = zv();
    (Cm(), Ha('pinyin: ', e.pinyin()));
  }
}
var V = class i {
  dataService = E(k);
  logger = E(sl);
  language = aO.required();
  accent = aO.required();
  sentenceId = aO.required();
  sentencesResource = jE({
    params: () => ({ lang: this.language(), acc: this.accent(), id: this.sentenceId() }),
    loader: async ({ params: a }) => {
      if (!(!a.lang || !a.acc || !a.id))
        return await this.dataService.getSentences(a.lang, a.acc, a.id);
    },
  });
  sentence = ot(() =>
    this.sentencesResource.hasValue()
      ? this.sentencesResource.value().find((e) => String(e.sentenceId) === this.sentenceId())
      : {},
  );
  text = ot(() => this.sentence()?.text);
  ipa = ot(() => this.sentence()?.ipa);
  pinyin = ot(() => this.sentence()?.pinyin);
  hasPinyin = ot(() => this.pinyin.length > 1);
  static ɵfac = function (e) {
    return new (e || i)();
  };
  static ɵcmp = Tv({
    type: i,
    selectors: [['app-sentence-text']],
    inputs: { language: [1, 'language'], accent: [1, 'accent'], sentenceId: [1, 'sentenceId'] },
    decls: 7,
    vars: 3,
    template: function (e, n) {
      (e & 1 &&
        (ja(0, 'p'),
        CE(1, 'sentence-text works!'),
        Va(),
        ja(2, 'p'),
        CE(3),
        Va(),
        ja(4, 'p'),
        CE(5),
        Va(),
        $v(6, Ke, 2, 1, 'p')),
        e & 2 &&
          (Cm(3),
          Ha('text: ', n.text()),
          Cm(2),
          Ha('ipa: ', n.ipa()),
          Cm(),
          Uv(n.hasPinyin() ? 6 : -1)));
    },
    encapsulation: 2,
  });
};
var Re = class i {
  router = E(_i);
  language = aO.required();
  accent = aO.required();
  sentenceId = aO.required();
  maxSentenceId = 20;
  previousSentence() {
    Number(this.sentenceId()) > 1 &&
      (this.router.navigate([this.language(), this.accent(), Number(this.sentenceId()) - 1]),
      this.router.navigate([this.language(), this.accent(), Number(this.sentenceId()) - 1]));
  }
  nextSentence() {
    Number(this.sentenceId()) < this.maxSentenceId &&
      this.router.navigate([this.language(), this.accent(), Number(this.sentenceId()) + 1]);
  }
  disablePreviousButton() {
    return Number(this.sentenceId()) === 1;
  }
  disableNextButton() {
    return Number(this.sentenceId()) === this.maxSentenceId;
  }
  static ɵfac = function (e) {
    return new (e || i)();
  };
  static ɵcmp = Tv({
    type: i,
    selectors: [['app-chorus-dashboard']],
    hostBindings: function (e, n) {
      e & 1 &&
        vf(
          'keydown.arrowleft',
          function () {
            return n.previousSentence();
          },
          sm,
        )(
          'keydown.arrowright',
          function () {
            return n.nextSentence();
          },
          sm,
        );
    },
    inputs: { language: [1, 'language'], accent: [1, 'accent'], sentenceId: [1, 'sentenceId'] },
    decls: 8,
    vars: 8,
    consts: [
      [3, 'language', 'accent', 'sentenceId'],
      ['mat-raised-button', '', 3, 'click', 'disabled'],
    ],
    template: function (e, n) {
      (e & 1 &&
        (Lo(0, 'p'),
        CE(1, 'chorus-dashboard works!'),
        Fa(),
        pf(2, 'app-sentence-text', 0),
        Lo(3, 'button', 1),
        vf('click', function () {
          return n.previousSentence();
        }),
        CE(
          4,
          ` Previous Sentence
`,
        ),
        Fa(),
        Lo(5, 'button', 1),
        vf('click', function () {
          return n.nextSentence();
        }),
        CE(
          6,
          ` Next Sentence
`,
        ),
        Fa(),
        pf(7, 'app-audio-player', 0)),
        e & 2 &&
          (Cm(2),
          ff('language', n.language())('accent', n.accent())('sentenceId', n.sentenceId()),
          Cm(),
          ff('disabled', n.disablePreviousButton()),
          Cm(2),
          ff('disabled', n.disableNextButton()),
          Cm(2),
          ff('language', n.language())('accent', n.accent())('sentenceId', n.sentenceId())));
    },
    dependencies: [J0, K0, rw, F, L, V],
    encapsulation: 2,
  });
};
export { Re as ChorusDashboard };

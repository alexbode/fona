import {w,H as fa,e as je$1,a5 as bP,a6 as qI,a7 as MP,I as Io,a8 as tu,j,c as cE,s as it,J as n,a9 as Fo,K as Mo,Y as Yo,$ as $f,Z as Zf,o as oc,M as MI,X as FI,R as RE,L as LE,n as ny,a as Bf,l as lc,a0 as VI,aa as cp,ab as ep,b as OE,F as FE,O as OI,ac as tp,u as RI,v as st,Q as ct,N as gt,ad as jm,ae as Kf,af as rI,A as Ae$1,ag as vn,U as UE,C as YE,ah as uE,ai as sl,aj as ys,ak as Vf,al as SP,am as rr,an as Mr,ao as je$2,ap as we$1,aq as ke,ar as ce,as as Ks,at as _,au as gp,av as yf,aw as AP,ax as JE,ay as XE,az as oI,aA as Hf,aB as Yf,aC as tI,aD as nI,P as PE,aE as Vm,a1 as Al,a2 as kl}from'./main-NJVGHQQX.js';import {z}from'./chunk-D3dHQ2B3.js';var Te=(()=>{class o{static \u0275fac=function(t){return new(t||o)};static \u0275mod=uE({type:o});static \u0275inj=sl({imports:[ys]})}return o})();var Me=(()=>{class o{_animationsDisabled=we$1();state="unchecked";disabled=false;appearance="full";static \u0275fac=function(t){return new(t||o)};static \u0275cmp=cE({type:o,selectors:[["mat-pseudo-checkbox"]],hostAttrs:[1,"mat-pseudo-checkbox"],hostVars:12,hostBindings:function(t,a){t&2&&tp("mat-pseudo-checkbox-indeterminate",a.state==="indeterminate")("mat-pseudo-checkbox-checked",a.state==="checked")("mat-pseudo-checkbox-disabled",a.disabled)("mat-pseudo-checkbox-minimal",a.appearance==="minimal")("mat-pseudo-checkbox-full",a.appearance==="full")("_mat-animation-noopable",a._animationsDisabled);},inputs:{state:"state",disabled:"disabled",appearance:"appearance"},decls:0,vars:0,template:function(t,a){},styles:[`.mat-pseudo-checkbox {
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 0.1), background-color 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox::after {
  position: absolute;
  opacity: 0;
  content: "";
  border-bottom: 2px solid currentColor;
  transition: opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-pseudo-checkbox._mat-animation-noopable::after {
  transition: none;
}

.mat-pseudo-checkbox-disabled {
  cursor: default;
}

.mat-pseudo-checkbox-indeterminate::after {
  left: 1px;
  opacity: 1;
  border-radius: 2px;
}

.mat-pseudo-checkbox-checked::after {
  left: 1px;
  border-left: 2px solid currentColor;
  transform: rotate(-45deg);
  opacity: 1;
  box-sizing: content-box;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  color: var(--mat-pseudo-checkbox-minimal-selected-checkmark-color, var(--mat-sys-primary));
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-pseudo-checkbox-full {
  border-color: var(--mat-pseudo-checkbox-full-unselected-icon-color, var(--mat-sys-on-surface-variant));
  border-width: 2px;
  border-style: solid;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-disabled {
  border-color: var(--mat-pseudo-checkbox-full-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate {
  background-color: var(--mat-pseudo-checkbox-full-selected-icon-color, var(--mat-sys-primary));
  border-color: transparent;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  color: var(--mat-pseudo-checkbox-full-selected-checkmark-color, var(--mat-sys-on-primary));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {
  background-color: var(--mat-pseudo-checkbox-full-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--mat-pseudo-checkbox-full-disabled-selected-checkmark-color, var(--mat-sys-surface));
}

.mat-pseudo-checkbox {
  width: 18px;
  height: 18px;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after {
  width: 14px;
  height: 6px;
  transform-origin: center;
  top: -4.2426406871px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  top: 8px;
  width: 16px;
}

.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after {
  width: 10px;
  height: 4px;
  transform-origin: center;
  top: -2.8284271247px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  top: 6px;
  width: 12px;
}
`],encapsulation:2})}return o})();var Ae=["button"],Ne=["*"];function Be(o,n){if(o&1&&(Yo(0,"div",2),$f(1,"mat-pseudo-checkbox",6),oc()),o&2){let e=YE();ny(),Bf("disabled",e.disabled);}}var Fe=new _("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS",{providedIn:"root",factory:()=>({hideSingleSelectionIndicator:false,hideMultipleSelectionIndicator:false,disabledInteractive:false})}),Oe=new _("MatButtonToggleGroup");var U=class{source;value;constructor(n,e){this.source=n,this.value=e;}};var Le=(()=>{class o{_changeDetectorRef=w(SP);_elementRef=w(rr);_focusMonitor=w(Mr);_idGenerator=w(je$2);_animationDisabled=we$1();_checked=false;ariaLabel;ariaLabelledby=null;_buttonElement;buttonToggleGroup;get buttonId(){return `${this.id}-button`}id;name;value;get tabIndex(){return this._tabIndex()}set tabIndex(e){this._tabIndex.set(e);}_tabIndex;disableRipple=false;get appearance(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance}set appearance(e){this._appearance=e;}_appearance;get checked(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked}set checked(e){e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck());}get disabled(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled}set disabled(e){this._disabled=e;}_disabled=false;get disabledInteractive(){return this._disabledInteractive||this.buttonToggleGroup!==null&&this.buttonToggleGroup.disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e;}_disabledInteractive;change=new ke;constructor(){w(ce).load(Ks);let e=w(Oe,{optional:true}),t=w(new gp("tabindex"),{optional:true})||"",a=w(Fe,{optional:true});this._tabIndex=Io(parseInt(t)||0),this.buttonToggleGroup=e,this._appearance=a&&a.appearance?a.appearance:"standard",this._disabledInteractive=a?.disabledInteractive??false;}ngOnInit(){let e=this.buttonToggleGroup;this.id=this.id||this._idGenerator.getId("mat-button-toggle-"),e&&(e._isPrechecked(this)?this.checked=true:e._isSelected(this)!==this._checked&&e._syncButtonToggle(this,this._checked));}ngAfterViewInit(){this._animationDisabled||this._elementRef.nativeElement.classList.add("mat-button-toggle-animations-enabled"),this._focusMonitor.monitor(this._elementRef,true);}ngOnDestroy(){let e=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),e&&e._isSelected(this)&&e._syncButtonToggle(this,false,false,true);}focus(e){this._buttonElement.nativeElement.focus(e);}_onButtonClick(){if(this.disabled)return;let e=this.isSingleSelector()?true:!this._checked;if(e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,true),this.buttonToggleGroup._onTouched())),this.isSingleSelector()){let t=this.buttonToggleGroup._buttonToggles.find(a=>a.tabIndex===0);t&&(t.tabIndex=-1),this.tabIndex=0;}this.change.emit(new U(this,this.value));}_markForCheck(){this._changeDetectorRef.markForCheck();}_getButtonName(){return this.isSingleSelector()?this.buttonToggleGroup.name:this.name||null}isSingleSelector(){return this.buttonToggleGroup&&!this.buttonToggleGroup.multiple}static \u0275fac=function(t){return new(t||o)};static \u0275cmp=cE({type:o,selectors:[["mat-button-toggle"]],viewQuery:function(t,a){if(t&1&&Yf(Ae,5),t&2){let g;tI(g=nI())&&(a._buttonElement=g.first);}},hostAttrs:["role","presentation",1,"mat-button-toggle"],hostVars:14,hostBindings:function(t,a){t&1&&Zf("focus",function(){return a.focus()}),t&2&&(Hf("aria-label",null)("aria-labelledby",null)("id",a.id)("name",null),tp("mat-button-toggle-standalone",!a.buttonToggleGroup)("mat-button-toggle-checked",a.checked)("mat-button-toggle-disabled",a.disabled)("mat-button-toggle-disabled-interactive",a.disabledInteractive)("mat-button-toggle-appearance-standard",a.appearance==="standard"));},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],id:"id",name:"name",value:"value",tabIndex:"tabIndex",disableRipple:[2,"disableRipple","disableRipple",AP],appearance:"appearance",checked:[2,"checked","checked",AP],disabled:[2,"disabled","disabled",AP],disabledInteractive:[2,"disabledInteractive","disabledInteractive",AP]},outputs:{change:"change"},exportAs:["matButtonToggle"],ngContentSelectors:Ne,decls:7,vars:13,consts:[["button",""],["type","button",1,"mat-button-toggle-button","mat-focus-indicator",3,"click","id","disabled"],[1,"mat-button-toggle-checkbox-wrapper"],[1,"mat-button-toggle-label-content"],[1,"mat-button-toggle-focus-overlay"],["matRipple","",1,"mat-button-toggle-ripple",3,"matRippleTrigger","matRippleDisabled"],["state","checked","aria-hidden","true","appearance","minimal",3,"disabled"]],template:function(t,a){if(t&1&&(JE(),Yo(0,"button",1,0),Zf("click",function(){return a._onButtonClick()}),RE(2,Be,2,1,"div",2),Yo(3,"span",3),XE(4),oc()(),$f(5,"span",4)(6,"span",5)),t&2){let g=oI(1);Bf("id",a.buttonId)("disabled",a.disabled&&!a.disabledInteractive||null),Hf("role",a.isSingleSelector()?"radio":"button")("tabindex",a.disabled&&!a.disabledInteractive?-1:a.tabIndex)("aria-pressed",a.isSingleSelector()?null:a.checked)("aria-checked",a.isSingleSelector()?a.checked:null)("name",a._getButtonName())("aria-label",a.ariaLabel)("aria-labelledby",a.ariaLabelledby)("aria-disabled",a.disabled&&a.disabledInteractive?"true":null),ny(2),OE(a.buttonToggleGroup&&(!a.buttonToggleGroup.multiple&&!a.buttonToggleGroup.hideSingleSelectionIndicator||a.buttonToggleGroup.multiple&&!a.buttonToggleGroup.hideMultipleSelectionIndicator)?2:-1),ny(4),Bf("matRippleTrigger",g)("matRippleDisabled",a.disableRipple||a.disabled);}},dependencies:[yf,Me],styles:[`.mat-button-toggle-standalone,
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
`],encapsulation:2})}return o})(),we=(()=>{class o{static \u0275fac=function(t){return new(t||o)};static \u0275mod=uE({type:o});static \u0275inj=sl({imports:[Vf,Le,ys]})}return o})();var Ee=(()=>{class o{static \u0275fac=function(t){return new(t||o)};static \u0275mod=uE({type:o});static \u0275inj=sl({imports:[ys]})}return o})();var M=class o{language=bP.required();accent=bP.required();sentenceIndex=bP.required();dataService=w(fa);logger=w(Ae$1);isPlaying=Io(false);audio=new Audio;playbackSpeed="100";constructor(){tu(()=>{this.sentenceIndex();this.audioResource(),this.stopAudio();});}ngOnDestroy(){this.audio.pause(),this.stopAudio();}config=qI(()=>{let n=this.language(),e=this.accent();return this.dataService.getCourseConfig(n,e)()});sentenceId=qI(()=>{let n=this.config();return !n.value||n.isLoading||n.error?null:n.value.chorus.sentences[parseInt(this.sentenceIndex(),10)-1]});audioResource=qI(()=>{let n=this.sentenceId();return n?this.dataService.getAudio(n)():{value:null,isLoading:true,error:null}});handleAudioEnded=()=>{this.logger.debug("audio-player.ts handleAudioEnded"),this.isPlaying.set(false),this.incrementCounter(),this.playAudio();};playAudio(){this.logger.debug("audio-player.ts playAudio");let n=this.audioResource();if(n.isLoading||!n.value){this.logger.debug("Audio is not ready to play yet.");return}this.isPlaying()||(this.audio=new Audio(n.value),this.audio.currentTime=0,this.audio.onended=this.handleAudioEnded,this.audio.playbackRate=parseInt(this.playbackSpeed,10)/100,this.audio.play().then(()=>{this.isPlaying.set(true);}).catch(e=>{this.logger.error("Failed to play audio:",e),this.isPlaying.set(false);}));}pauseAudio(){this.logger.debug("audio-player.ts pauseAudio"),this.audio.pause(),this.isPlaying.set(false);}stopAudio(){this.logger.debug("audio-player.ts stopAudio"),this.audio.pause(),this.audio.currentTime=0,this.isPlaying.set(false);}incrementCounter(){let n=this.sentenceId();n&&this.dataService.incrementSentenceCount(n);}onSpaceBar(){this.isPlaying()?this.pauseAudio():this.playAudio();}static \u0275fac=function(e){return new(e||o)};static \u0275cmp=cE({type:o,selectors:[["app-audio-player"]],hostBindings:function(e,t){e&1&&Zf("keydown.space",function(){return t.onSpaceBar()},Vm);},inputs:{language:[1,"language"],accent:[1,"accent"],sentenceIndex:[1,"sentenceIndex"]},decls:0,vars:0,template:function(e,t){},dependencies:[Te,we,vn,Ee],encapsulation:2})};var Ge=()=>[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],ze=()=>[24,48,32,16,56,40,24,48,32,16,56,40,24,48,32,16,56,40,24,48];function je(o,n){o&1&&(Yo(0,"div",13),$f(1,"div",29)(2,"div",30),oc());}function He(o,n){if(o&1&&(Yo(0,"div",36)(1,"p",37)(2,"span",38),MI(3,"pronunciation: "),oc(),MI(4),oc()()),o&2){let e=YE(2);ny(4),lc(" ",e.sentencePinyin()," ");}}function Xe(o,n){if(o&1){let e=UE();Yo(0,"p",31),MI(1),oc(),Yo(2,"div",32)(3,"p",33),MI(4),oc(),Yo(5,"button",34),Zf("click",function(){Al(e);let a=YE();return kl(a.onIpa())}),$f(6,"ng-icon",35),MI(7," IPA "),oc()(),RE(8,He,5,1,"div",36);}if(o&2){let e=YE();ny(),lc(" ",e.sentenceText()," "),ny(3),lc(" ",e.sentenceIpa()," "),ny(4),OE(e.hasPinyin()?8:-1);}}function We(o,n){if(o&1&&$f(0,"div",39),o&2){let e=n.$index,t=YE();ep("height",t.isPlaying()?OI(6,ze)[e]:12,"px")("animation-delay",e*40,"ms"),tp("animating",t.isPlaying());}}function Ue(o,n){o&1&&(Yo(0,"span",22),MI(1," ... "),oc());}function $e(o,n){if(o&1&&(Yo(0,"span",23),MI(1),FI(2,"number"),oc()),o&2){let e=YE();ny(),lc(" ",VI(2,1,e.allTimeReps())," ");}}function qe(o,n){if(o&1){let e=UE();Yo(0,"button",28),Zf("click",function(){Al(e);let a=YE();return kl(a.previousSentence())}),MI(1," \u2190 Prev phrase "),oc();}}var De=class o{dataService=w(fa);router=w(je$1);language=bP.required();accent=bP.required();sentenceIndex=bP.required();languagesState=this.dataService.getLanguageList();languageObj=qI(()=>{let n=this.languagesState().value;if(!n)return null;let e=this.language()?.toLowerCase();return n.find(t=>t.name.toLowerCase()===e)||null});accentObj=qI(()=>{let n=this.languageObj();if(!n)return null;let e=this.accent()?.toLowerCase();return n.accents.find(t=>t.name.toLowerCase()===e)||null});audioPlayer=MP(M);isPlaying=qI(()=>this.audioPlayer()?.isPlaying()??false);sessionCount=Io(0);cumulativeReps=Io(0);trackedSentenceId=-1;constructor(){let e=this.router.getCurrentNavigation()?.extras.state;this.cumulativeReps.set(e?.cumulativeReps??0),tu(()=>{let t=this.sentenceCount().value,a=this.sentenceCount().isLoading,g=this.sentenceId();a||t===null||t===void 0||!g||(this.trackedSentenceId!==g?(this.sessionCount.set(0),this.trackedSentenceId=g):this.sessionCount.update(Pe=>Pe+1));});}config=qI(()=>{let n=this.language(),e=this.accent();return this.dataService.getCourseConfig(n,e)()});sentenceId=qI(()=>{let n=this.config();return !n.value||n.isLoading||n.error?null:n.value.chorus.sentences[parseInt(this.sentenceIndex(),10)-1]});numSentences=qI(()=>{let n=this.config().value;return n!=null?n.chorus.sentences.length:0});sentence=qI(()=>{let n=this.sentenceId();return n?this.dataService.getSentence(n)():{value:null,isLoading:true,error:null}});sentenceText=qI(()=>this.sentence().value?.text??"");sentenceIpa=qI(()=>this.sentence().value?.ipa??"");sentencePinyin=qI(()=>this.sentence().value?.pinyin??"");hasPinyin=qI(()=>!!this.sentencePinyin());allTimeRepsState=this.dataService.getTotalSentenceCount();allTimeReps=qI(()=>this.allTimeRepsState().value??0);previousSentence(){this.audioPlayer()?.stopAudio(),Number(this.sentenceIndex())>1&&this.router.navigate(j.getChorusDashboardRoute(this.language(),this.accent(),Number(this.sentenceIndex())-1),{state:{cumulativeReps:this.cumulativeReps()}});}nextSentence(){this.audioPlayer()?.stopAudio();let n=this.cumulativeReps()+this.sessionCount();Number(this.sentenceIndex())<this.numSentences()&&this.router.navigate(j.getChorusDashboardRoute(this.language(),this.accent(),Number(this.sentenceIndex())+1),{state:{cumulativeReps:n}});}disablePreviousButton(){return Number(this.sentenceIndex())===1}disableNextButton(){return Number(this.sentenceIndex())===this.numSentences()}sentenceCount=qI(()=>{let n=this.sentenceId();return n?this.dataService.getSentenceCount(n)():{value:null,isLoading:false,error:null}});handlePlay(){let n=this.audioPlayer();n&&(n.isPlaying()?n.stopAudio():n.playAudio());}handleNext(){this.audioPlayer()?.stopAudio();let n=this.cumulativeReps()+this.sessionCount();Number(this.sentenceIndex())<this.numSentences()?this.router.navigate(j.getChorusDashboardRoute(this.language(),this.accent(),Number(this.sentenceIndex())+1),{state:{cumulativeReps:n}}):this.router.navigate(j.getSummaryRoute(this.language(),this.accent()),{state:{mode:"chorusing",reps:n,total:this.numSentences(),accent:this.accentObj()?.nativeName||this.accent()}});}onIpa(){this.audioPlayer()?.stopAudio(),this.router.navigate(j.getIpaRoute());}onBack(){this.audioPlayer()?.stopAudio(),this.router.navigate(j.getModeSelectionRoute(this.language(),this.accent()));}Number=Number;static \u0275fac=function(e){return new(e||o)};static \u0275cmp=cE({type:o,selectors:[["app-chorus-dashboard"]],viewQuery:function(e,t){e&1&&Kf(t.audioPlayer,M,5),e&2&&rI();},hostBindings:function(e,t){e&1&&Zf("keydown.arrowleft",function(){return t.previousSentence()},jm)("keydown.arrowright",function(){return t.nextSentence()},jm);},inputs:{language:[1,"language"],accent:[1,"accent"],sentenceIndex:[1,"sentenceIndex"]},features:[RI([st({lucideChevronLeft:gt,lucideBookOpen:ct})])],decls:42,vars:21,consts:[[1,"flex","flex-col","flex-1","h-full","bg-background","select-none"],[1,"hidden",3,"language","accent","sentenceIndex"],[1,"flex","items-center","gap-3","px-5","py-4","shrink-0"],["aria-label","Back",1,"flex","items-center","justify-center","p-1","rounded-full","hover:bg-secondary","cursor-pointer",3,"click"],["hlm","","name","lucideChevronLeft","size","20px",1,"text-foreground"],[1,"text-sm","font-medium","text-muted-foreground",2,"font-family","'Inter', sans-serif"],[1,"px-5","pb-4","shrink-0"],[1,"flex","items-center","justify-between","mb-2"],[1,"text-muted-foreground","text-xs",2,"font-family","'Inter', sans-serif"],[1,"h-[2px]","bg-secondary","rounded-full","overflow-hidden"],[1,"h-full","bg-primary","rounded-full","transition-all","duration-500"],[1,"flex-1","flex","flex-col","px-5","pb-8","gap-5","overflow-y-auto"],[1,"bg-card","border","border-border","rounded","p-5","space-y-3"],[1,"animate-pulse","space-y-3"],[1,"bg-card","border","border-border","rounded","p-5","flex","flex-col","justify-center","items-center","h-28"],[1,"flex","items-center","justify-center","gap-1.5","h-16","w-full"],[1,"waveform-bar","w-1.5","bg-primary/40","rounded-full","transition-all",3,"animating","height","animation-delay"],[1,"bg-card","border","border-border","rounded","py-5","px-5","flex","items-center","justify-between"],[1,"flex","flex-col","items-center","flex-1"],[1,"flex","items-center","justify-center","min-w-[40px]","h-10","px-3","rounded-full","border","border-brand/20","text-brand","bg-brand/10","font-bold","text-lg"],[1,"text-muted-foreground","text-xs","mt-1",2,"font-family","'Inter', sans-serif"],[1,"w-px","h-16","bg-border","mx-4","shrink-0"],[1,"text-4xl","font-bold","leading-none","animate-pulse","text-muted-foreground",2,"font-family","'Plus Jakarta Sans', sans-serif"],[1,"text-4xl","font-bold","leading-none","text-muted-foreground",2,"font-family","'Plus Jakarta Sans', sans-serif"],[1,"text-muted-foreground","text-xs","tracking-widest","uppercase","mt-1",2,"font-family","'Inter', sans-serif"],[1,"w-full","py-4","rounded","font-semibold","text-base","cursor-pointer","flex","items-center","justify-center","gap-2","text-white",2,"font-family","'Plus Jakarta Sans', sans-serif",3,"click"],[1,"flex","gap-3"],[1,"flex-1","py-4","rounded","font-semibold","text-sm","border","border-border","text-muted-foreground","hover:text-foreground","hover:border-foreground/20","cursor-pointer",2,"font-family","'Inter', sans-serif"],[1,"flex-1","py-4","rounded","font-semibold","text-sm","border","border-border","text-muted-foreground","hover:text-foreground","hover:border-foreground/20","cursor-pointer",2,"font-family","'Inter', sans-serif",3,"click"],[1,"h-6","bg-muted","rounded","w-3/4"],[1,"h-4","bg-muted","rounded","w-1/2"],[1,"text-foreground","text-xl","font-semibold","leading-snug",2,"font-family","'Plus Jakarta Sans', sans-serif"],[1,"flex","items-center","justify-between","gap-3"],[1,"text-muted-foreground","text-sm","flex-1","font-mono",2,"font-family","'Inter', sans-serif"],[1,"flex","items-center","gap-1","px-2.5","py-1","rounded","border","border-brand/20","text-brand","bg-brand/5","text-xs","shrink-0","hover:border-brand/40","cursor-pointer",2,"font-family","'Inter', sans-serif",3,"click"],["hlm","","name","lucideBookOpen","size","11px"],[1,"border-t","border-border","pt-3"],[1,"text-xs","text-muted-foreground",2,"font-family","'Inter', sans-serif"],[1,"text-primary",2,"font-family","'Inter', sans-serif"],[1,"waveform-bar","w-1.5","bg-primary/40","rounded-full","transition-all"]],template:function(e,t){e&1&&(Yo(0,"div",0),$f(1,"app-audio-player",1),Yo(2,"header",2)(3,"button",3),Zf("click",function(){return t.onBack()}),$f(4,"ng-icon",4),oc(),Yo(5,"span",5),MI(6),FI(7,"titlecase"),oc()(),Yo(8,"div",6)(9,"div",7)(10,"span",8),MI(11),oc(),Yo(12,"span",8),MI(13," phrase "),oc()(),Yo(14,"div",9),$f(15,"div",10),oc()(),Yo(16,"div",11)(17,"div",12),RE(18,je,3,0,"div",13)(19,Xe,9,3),oc(),Yo(20,"div",14)(21,"div",15),LE(22,We,1,7,"div",16,PE),oc()(),Yo(24,"div",17)(25,"div",18)(26,"div",19),MI(27),oc(),Yo(28,"div",20),MI(29," this session "),oc()(),$f(30,"div",21),Yo(31,"div",18),RE(32,Ue,2,0,"span",22)(33,$e,3,3,"span",23),Yo(34,"div",24),MI(35," all time "),oc()()(),Yo(36,"button",25),Zf("click",function(){return t.handlePlay()}),MI(37),oc(),Yo(38,"div",26),RE(39,qe,2,0,"button",27),Yo(40,"button",28),Zf("click",function(){return t.handleNext()}),MI(41),oc()()()()),e&2&&(ny(),Bf("language",t.language())("accent",t.accent())("sentenceIndex",t.sentenceIndex()),ny(5),lc(" Chorusing \xB7 ",VI(7,18,t.accentObj()?.nativeName)," "),ny(5),cp(" ",t.sentenceIndex()," / ",t.numSentences()," "),ny(4),ep("width",t.Number(t.sentenceIndex())/t.numSentences()*100,"%"),ny(3),OE(t.sentence().isLoading?18:19),ny(4),FE(OI(20,Ge)),ny(5),lc(" ",t.sessionCount()," "),ny(5),OE(t.allTimeRepsState().isLoading?32:33),ny(4),tp("bg-brand-hover",t.isPlaying())("bg-brand",!t.isPlaying()),ny(),lc(" ",t.isPlaying()?"\u{1F50A} Listening \u2014 speak along!":"\u25B6 Play & Chorus"," "),ny(2),OE(t.Number(t.sentenceIndex())>1?39:-1),ny(2),lc(" ",t.Number(t.sentenceIndex())<t.numSentences()?"Next phrase \u2192":"Finish session \u2192"," "));},dependencies:[M,it,n,z,Fo,Mo],styles:["@keyframes _ngcontent-%COMP%_bounce-wave{0%,to{transform:scaleY(.25);background-color:#4badc866}50%{transform:scaleY(1);background-color:#4badc8d9}}.waveform-bar[_ngcontent-%COMP%]{transform-origin:center;will-change:transform,background-color}.waveform-bar.animating[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_bounce-wave .8s ease-in-out infinite}"]})};export{De as ChorusDashboard};
import {z}from'./chunk-DD9yn1jN.js';import {f,x,b,g,v,y}from'./chunk-67tfNVR8.js';import {P,w as w$1,N as ma,j as je$1,F as CP,aa as UI,af as bP,I as Io,ag as eu,a as aE,C,m as it,U as n,ah as Oo,V as To,Y as Yo,B as Bf,c as bI,o as oc,a4 as LI,k as kE,d as PE,Q as Qf,t as ty,H as Hf,s as sp,a5 as jI,ad as ap,ai as Xf,e as RE,L as LE,R as RI,l as lc,ae as ep,y as kI,D as st,$ as ct,X as gt,aj as Fm,ak as Yf,al as nI,A as Ae$1,am as yn,a3 as $E,Z as ZE,an as lE,ao as sl,ap as ws,aq as Vf,ar as NP,as as rr,at as Br,au as je$2,av as we,aw as ke,ax as ce,ay as Gs,az as _,aA as hp,aB as yf,aC as xP,K as KE,J as JE,aD as rI,aE as Vf$1,aF as Zf,aG as eI,aH as tI,O as OE,aI as jm,a6 as Al,a7 as kl}from'./main-YR7SJ4TL.js';var Ae=(()=>{class o{static \u0275fac=function(t){return new(t||o)};static \u0275mod=lE({type:o});static \u0275inj=sl({imports:[ws]})}return o})();var Ne=(()=>{class o{_animationsDisabled=we();state="unchecked";disabled=false;appearance="full";static \u0275fac=function(t){return new(t||o)};static \u0275cmp=aE({type:o,selectors:[["mat-pseudo-checkbox"]],hostAttrs:[1,"mat-pseudo-checkbox"],hostVars:12,hostBindings:function(t,n){t&2&&ep("mat-pseudo-checkbox-indeterminate",n.state==="indeterminate")("mat-pseudo-checkbox-checked",n.state==="checked")("mat-pseudo-checkbox-disabled",n.disabled)("mat-pseudo-checkbox-minimal",n.appearance==="minimal")("mat-pseudo-checkbox-full",n.appearance==="full")("_mat-animation-noopable",n._animationsDisabled);},inputs:{state:"state",disabled:"disabled",appearance:"appearance"},decls:0,vars:0,template:function(t,n){},styles:[`.mat-pseudo-checkbox {
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
`],encapsulation:2})}return o})();var ze=["button"],He=["*"];function je(o,a){if(o&1&&(Yo(0,"div",2),Bf(1,"mat-pseudo-checkbox",6),oc()),o&2){let e=ZE();ty(),Hf("disabled",e.disabled);}}var Xe=new _("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS",{providedIn:"root",factory:()=>({hideSingleSelectionIndicator:false,hideMultipleSelectionIndicator:false,disabledInteractive:false})}),We=new _("MatButtonToggleGroup");var U=class{source;value;constructor(a,e){this.source=a,this.value=e;}};var Ue=(()=>{class o{_changeDetectorRef=w$1(NP);_elementRef=w$1(rr);_focusMonitor=w$1(Br);_idGenerator=w$1(je$2);_animationDisabled=we();_checked=false;ariaLabel;ariaLabelledby=null;_buttonElement;buttonToggleGroup;get buttonId(){return `${this.id}-button`}id;name;value;get tabIndex(){return this._tabIndex()}set tabIndex(e){this._tabIndex.set(e);}_tabIndex;disableRipple=false;get appearance(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance}set appearance(e){this._appearance=e;}_appearance;get checked(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked}set checked(e){e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck());}get disabled(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled}set disabled(e){this._disabled=e;}_disabled=false;get disabledInteractive(){return this._disabledInteractive||this.buttonToggleGroup!==null&&this.buttonToggleGroup.disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e;}_disabledInteractive;change=new ke;constructor(){w$1(ce).load(Gs);let e=w$1(We,{optional:true}),t=w$1(new hp("tabindex"),{optional:true})||"",n=w$1(Xe,{optional:true});this._tabIndex=Io(parseInt(t)||0),this.buttonToggleGroup=e,this._appearance=n&&n.appearance?n.appearance:"standard",this._disabledInteractive=n?.disabledInteractive??false;}ngOnInit(){let e=this.buttonToggleGroup;this.id=this.id||this._idGenerator.getId("mat-button-toggle-"),e&&(e._isPrechecked(this)?this.checked=true:e._isSelected(this)!==this._checked&&e._syncButtonToggle(this,this._checked));}ngAfterViewInit(){this._animationDisabled||this._elementRef.nativeElement.classList.add("mat-button-toggle-animations-enabled"),this._focusMonitor.monitor(this._elementRef,true);}ngOnDestroy(){let e=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),e&&e._isSelected(this)&&e._syncButtonToggle(this,false,false,true);}focus(e){this._buttonElement.nativeElement.focus(e);}_onButtonClick(){if(this.disabled)return;let e=this.isSingleSelector()?true:!this._checked;if(e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,true),this.buttonToggleGroup._onTouched())),this.isSingleSelector()){let t=this.buttonToggleGroup._buttonToggles.find(n=>n.tabIndex===0);t&&(t.tabIndex=-1),this.tabIndex=0;}this.change.emit(new U(this,this.value));}_markForCheck(){this._changeDetectorRef.markForCheck();}_getButtonName(){return this.isSingleSelector()?this.buttonToggleGroup.name:this.name||null}isSingleSelector(){return this.buttonToggleGroup&&!this.buttonToggleGroup.multiple}static \u0275fac=function(t){return new(t||o)};static \u0275cmp=aE({type:o,selectors:[["mat-button-toggle"]],viewQuery:function(t,n){if(t&1&&Zf(ze,5),t&2){let u;eI(u=tI())&&(n._buttonElement=u.first);}},hostAttrs:["role","presentation",1,"mat-button-toggle"],hostVars:14,hostBindings:function(t,n){t&1&&Qf("focus",function(){return n.focus()}),t&2&&(Vf$1("aria-label",null)("aria-labelledby",null)("id",n.id)("name",null),ep("mat-button-toggle-standalone",!n.buttonToggleGroup)("mat-button-toggle-checked",n.checked)("mat-button-toggle-disabled",n.disabled)("mat-button-toggle-disabled-interactive",n.disabledInteractive)("mat-button-toggle-appearance-standard",n.appearance==="standard"));},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],id:"id",name:"name",value:"value",tabIndex:"tabIndex",disableRipple:[2,"disableRipple","disableRipple",xP],appearance:"appearance",checked:[2,"checked","checked",xP],disabled:[2,"disabled","disabled",xP],disabledInteractive:[2,"disabledInteractive","disabledInteractive",xP]},outputs:{change:"change"},exportAs:["matButtonToggle"],ngContentSelectors:He,decls:7,vars:13,consts:[["button",""],["type","button",1,"mat-button-toggle-button","mat-focus-indicator",3,"click","id","disabled"],[1,"mat-button-toggle-checkbox-wrapper"],[1,"mat-button-toggle-label-content"],[1,"mat-button-toggle-focus-overlay"],["matRipple","",1,"mat-button-toggle-ripple",3,"matRippleTrigger","matRippleDisabled"],["state","checked","aria-hidden","true","appearance","minimal",3,"disabled"]],template:function(t,n){if(t&1&&(KE(),Yo(0,"button",1,0),Qf("click",function(){return n._onButtonClick()}),kE(2,je,2,1,"div",2),Yo(3,"span",3),JE(4),oc()(),Bf(5,"span",4)(6,"span",5)),t&2){let u=rI(1);Hf("id",n.buttonId)("disabled",n.disabled&&!n.disabledInteractive||null),Vf$1("role",n.isSingleSelector()?"radio":"button")("tabindex",n.disabled&&!n.disabledInteractive?-1:n.tabIndex)("aria-pressed",n.isSingleSelector()?null:n.checked)("aria-checked",n.isSingleSelector()?n.checked:null)("name",n._getButtonName())("aria-label",n.ariaLabel)("aria-labelledby",n.ariaLabelledby)("aria-disabled",n.disabled&&n.disabledInteractive?"true":null),ty(2),RE(n.buttonToggleGroup&&(!n.buttonToggleGroup.multiple&&!n.buttonToggleGroup.hideSingleSelectionIndicator||n.buttonToggleGroup.multiple&&!n.buttonToggleGroup.hideMultipleSelectionIndicator)?2:-1),ty(4),Hf("matRippleTrigger",u)("matRippleDisabled",n.disableRipple||n.disabled);}},dependencies:[yf,Ne],styles:[`.mat-button-toggle-standalone,
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
`],encapsulation:2})}return o})(),Fe=(()=>{class o{static \u0275fac=function(t){return new(t||o)};static \u0275mod=lE({type:o});static \u0275inj=sl({imports:[Vf,Ue,ws]})}return o})();var Oe=(()=>{class o{static \u0275fac=function(t){return new(t||o)};static \u0275mod=lE({type:o});static \u0275inj=sl({imports:[ws]})}return o})();var w=class o{language=CP.required();accent=CP.required();sentenceIndex=CP.required();playbackSpeed=CP("100");dataService=w$1(ma);logger=w$1(Ae$1);isPlaying=Io(false);audio=new Audio;constructor(){eu(()=>{this.sentenceIndex();this.audioResource(),this.stopAudio();}),eu(()=>{let a=this.playbackSpeed();this.audio&&(this.audio.playbackRate=parseInt(a,10)/100);});}ngOnDestroy(){this.audio.pause(),this.stopAudio();}config=UI(()=>{let a=this.language(),e=this.accent();return this.dataService.getCourseConfig(a,e)()});sentenceId=UI(()=>this.dataService.getChorusSessionState()().sentencesInSession[parseInt(this.sentenceIndex(),10)-1]);audioResource=UI(()=>{let a=this.sentenceId();return a?this.dataService.getAudio(a)():{value:null,isLoading:true,error:null}});handleAudioEnded=()=>{this.logger.debug("audio-player.ts handleAudioEnded"),this.isPlaying.set(false),this.incrementCounter(),this.playAudio();};playAudio(){this.logger.debug("audio-player.ts playAudio");let a=this.audioResource();if(a.isLoading||!a.value){this.logger.debug("Audio is not ready to play yet.");return}this.isPlaying()||(this.audio=new Audio(a.value),this.audio.currentTime=0,this.audio.onended=this.handleAudioEnded,this.audio.playbackRate=parseInt(this.playbackSpeed(),10)/100,this.audio.play().then(()=>{this.isPlaying.set(true);}).catch(e=>{this.logger.error("Failed to play audio:",e),this.isPlaying.set(false);}));}pauseAudio(){this.logger.debug("audio-player.ts pauseAudio"),this.audio.pause(),this.isPlaying.set(false);}stopAudio(){this.logger.debug("audio-player.ts stopAudio"),this.audio.pause(),this.audio.currentTime=0,this.isPlaying.set(false);}incrementCounter(){let a=this.sentenceId();a&&this.dataService.incrementSentenceCount(a,true);}onSpaceBar(){this.isPlaying()?this.pauseAudio():this.playAudio();}static \u0275fac=function(e){return new(e||o)};static \u0275cmp=aE({type:o,selectors:[["app-audio-player"]],hostBindings:function(e,t){e&1&&Qf("keydown.space",function(){return t.onSpaceBar()},jm);},inputs:{language:[1,"language"],accent:[1,"accent"],sentenceIndex:[1,"sentenceIndex"],playbackSpeed:[1,"playbackSpeed"]},decls:0,vars:0,template:function(e,t){},dependencies:[Ae,Fe,yn,Oe],encapsulation:2})};var qe=()=>["25","50","75","90","100","110"];function Qe(o,a){o&1&&(Yo(0,"div",15),Bf(1,"div",33)(2,"div",34),oc());}function Ze(o,a){if(o&1&&(Yo(0,"div",40)(1,"p",41)(2,"span",42),bI(3,"pronunciation: "),oc(),bI(4),oc()()),o&2){let e=ZE(2);ty(4),lc(" ",e.sentencePinyin()," ");}}function Je(o,a){if(o&1){let e=$E();Yo(0,"p",35),bI(1),oc(),Yo(2,"div",36)(3,"p",37),bI(4),oc(),Yo(5,"button",38),Qf("click",function(){Al(e);let n=ZE();return kl(n.onIpa())}),Bf(6,"ng-icon",39),bI(7," IPA "),oc()(),kE(8,Ze,5,1,"div",40);}if(o&2){let e=ZE();ty(),lc(" ",e.sentenceText()," "),ty(3),lc(" ",e.sentenceIpa()," "),ty(4),RE(e.hasPinyin()?8:-1);}}function Ye(o,a){if(o&1){let e=$E();Yo(0,"button",43),Qf("click",function(){let n=Al(e).$implicit,u=ZE();return kl(u.setSpeed(n))}),bI(1),oc();}if(o&2){let e=a.$implicit,t=ZE();ep("bg-background",t.playbackSpeed()===e)("text-foreground",t.playbackSpeed()===e)("text-muted-foreground",t.playbackSpeed()!==e)("shadow-sm",t.playbackSpeed()===e),ty(),lc(" ",e,"% ");}}function Ke(o,a){o&1&&(Yo(0,"span",26),bI(1," ... "),oc());}function et(o,a){if(o&1&&(Yo(0,"span",27),bI(1),LI(2,"number"),oc()),o&2){let e=ZE();ty(),lc(" ",jI(2,1,e.allTimeReps())," ");}}function tt(o,a){if(o&1){let e=$E();Yo(0,"button",32),Qf("click",function(){Al(e);let n=ZE();return kl(n.previousSentence())}),bI(1," \u2190 Prev phrase "),oc();}}var Le=class o{AppRoutesHelper=P;dataService=w$1(ma);router=w$1(je$1);language=CP.required();accent=CP.required();sentenceIndex=CP.required();languagesState=this.dataService.getLanguageList();languageObj=UI(()=>{let a=this.languagesState().value;if(!a)return null;let e=this.language()?.toLowerCase();return a.find(t=>t.name.toLowerCase()===e)||null});accentObj=UI(()=>{let a=this.languageObj();if(!a)return null;let e=this.accent()?.toLowerCase();return a.accents.find(t=>t.name.toLowerCase()===e)||null});audioPlayer=bP(w);isPlaying=UI(()=>this.audioPlayer()?.isPlaying()??false);playbackSpeed=Io("100");setSpeed(a){this.playbackSpeed.set(a);}sessionCount=Io(0);cumulativeReps=Io(0);trackedSentenceId=-1;constructor(){let e=this.router.getCurrentNavigation()?.extras.state;this.cumulativeReps.set(e?.cumulativeReps??0),eu(()=>{let t=this.sentenceCount().value,n=this.sentenceCount().isLoading,u=this.sentenceId();n||t===null||t===void 0||!u||(this.trackedSentenceId!==u?(this.sessionCount.set(0),this.trackedSentenceId=u):this.sessionCount.update(Ve=>Ve+1));});}config=UI(()=>{let a=this.language(),e=this.accent();return this.dataService.getCourseConfig(a,e)()});sentenceId=UI(()=>this.dataService.getChorusSessionState()().sentencesInSession[parseInt(this.sentenceIndex(),10)-1]);numSentences=10;sentence=UI(()=>{let a=this.sentenceId();return a?this.dataService.getSentence(a)():{value:null,isLoading:true,error:null}});sentenceText=UI(()=>this.sentence().value?.text??"");sentenceIpa=UI(()=>this.sentence().value?.ipa??"");sentencePinyin=UI(()=>this.sentence().value?.pinyin??"");hasPinyin=UI(()=>!!this.sentencePinyin());allTimeRepsState=this.dataService.getTotalSentenceCount();allTimeReps=UI(()=>this.allTimeRepsState().value??0);previousSentence(){this.audioPlayer()?.stopAudio(),Number(this.sentenceIndex())>1&&this.router.navigate(P.getChorusDashboardRoute(this.language(),this.accent(),Number(this.sentenceIndex())-1),{state:{cumulativeReps:this.cumulativeReps()}});}nextSentence(){this.audioPlayer()?.stopAudio();let a=this.cumulativeReps()+this.sessionCount();Number(this.sentenceIndex())<this.numSentences&&this.router.navigate(P.getChorusDashboardRoute(this.language(),this.accent(),Number(this.sentenceIndex())+1),{state:{cumulativeReps:a}});}disablePreviousButton(){return Number(this.sentenceIndex())===1}disableNextButton(){return Number(this.sentenceIndex())===this.numSentences}sentenceCount=UI(()=>{let a=this.sentenceId();return a?this.dataService.getSentenceCount(a)():{value:null,isLoading:false,error:null}});handlePlay(){let a=this.audioPlayer();a&&(a.isPlaying()?a.stopAudio():a.playAudio());}handleNext(){this.audioPlayer()?.stopAudio();let a=this.cumulativeReps()+this.sessionCount();Number(this.sentenceIndex())<this.numSentences?this.router.navigate(P.getChorusDashboardRoute(this.language(),this.accent(),Number(this.sentenceIndex())+1),{state:{cumulativeReps:a}}):this.router.navigate(P.getSummaryRoute(this.language(),this.accent()),{state:{mode:"chorusing",reps:a,total:this.numSentences,accent:this.accentObj()?.nativeName||this.accent()}});}onIpa(){this.audioPlayer()?.stopAudio(),this.router.navigate(P.getIpaRoute());}onBack(){this.audioPlayer()?.stopAudio(),this.router.navigate(P.getModeSelectionRoute(this.language(),this.accent()));}Number=Number;static \u0275fac=function(e){return new(e||o)};static \u0275cmp=aE({type:o,selectors:[["app-chorus-dashboard"]],viewQuery:function(e,t){e&1&&Yf(t.audioPlayer,w,5),e&2&&nI();},hostBindings:function(e,t){e&1&&Qf("keydown.arrowleft",function(){return t.previousSentence()},Fm)("keydown.arrowright",function(){return t.nextSentence()},Fm);},inputs:{language:[1,"language"],accent:[1,"accent"],sentenceIndex:[1,"sentenceIndex"]},features:[kI([st({lucideChevronLeft:gt,lucideBookOpen:ct})])],decls:58,vars:26,consts:[[1,"flex","flex-col","flex-1","h-full","bg-background","select-none"],[1,"hidden",3,"language","accent","sentenceIndex","playbackSpeed"],["hlmBreadcrumb","",1,"px-5","py-4","shrink-0"],["hlmBreadcrumbList",""],["hlmBreadcrumbItem",""],["hlmBreadcrumbLink","",3,"link"],["hlmBreadcrumbSeparator",""],["hlmBreadcrumbPage",""],[1,"px-5","pb-4","shrink-0"],[1,"flex","items-center","justify-between","mb-2"],[1,"text-muted-foreground","text-xs",2,"font-family","'Inter', sans-serif"],[1,"h-[2px]","bg-secondary","rounded-full","overflow-hidden"],[1,"h-full","bg-primary","rounded-full","transition-all","duration-500"],[1,"flex-1","flex","flex-col","px-5","pb-8","gap-5","overflow-y-auto"],[1,"bg-card","border","border-border","rounded","p-5","space-y-3"],[1,"animate-pulse","space-y-3"],[1,"bg-card","border","border-border","rounded","p-5","flex","flex-col","gap-3","justify-center","h-28"],[1,"flex","items-center","justify-between"],[1,"text-xs","font-medium","text-muted-foreground",2,"font-family","'Inter', sans-serif"],[1,"flex","items-center","justify-center","p-1","bg-secondary","rounded-lg","border","border-border"],["type","button",1,"flex-1","py-1.5","text-xs","font-semibold","rounded","transition-all","cursor-pointer","text-center",2,"font-family","'Plus Jakarta Sans', sans-serif",3,"bg-background","text-foreground","text-muted-foreground","shadow-sm"],[1,"bg-card","border","border-border","rounded","py-5","px-5","flex","items-center","justify-between"],[1,"flex","flex-col","items-center","flex-1"],[1,"flex","items-center","justify-center","min-w-[40px]","h-10","px-3","rounded-full","border","border-brand/20","text-brand","bg-brand/10","font-bold","text-lg"],[1,"text-muted-foreground","text-xs","mt-1",2,"font-family","'Inter', sans-serif"],[1,"w-px","h-16","bg-border","mx-4","shrink-0"],[1,"text-4xl","font-bold","leading-none","animate-pulse","text-muted-foreground",2,"font-family","'Plus Jakarta Sans', sans-serif"],[1,"text-4xl","font-bold","leading-none","text-muted-foreground",2,"font-family","'Plus Jakarta Sans', sans-serif"],[1,"text-muted-foreground","text-xs","tracking-widest","uppercase","mt-1",2,"font-family","'Inter', sans-serif"],["appButton","","size","none",1,"w-full","py-4","rounded","text-base","cursor-pointer","gap-2","text-white",2,"font-family","'Plus Jakarta Sans', sans-serif",3,"click"],[1,"flex","gap-3"],["appButton","","variant","secondary","size","none",1,"flex-1","py-4","rounded","text-sm","cursor-pointer",2,"font-family","'Inter', sans-serif"],["appButton","","variant","secondary","size","none",1,"flex-1","py-4","rounded","text-sm","cursor-pointer",2,"font-family","'Inter', sans-serif",3,"click"],[1,"h-6","bg-muted","rounded","w-3/4"],[1,"h-4","bg-muted","rounded","w-1/2"],[1,"text-foreground","text-2xl","lg:text-3xl","font-semibold","leading-normal","font-jakarta"],[1,"flex","items-center","justify-between","gap-3"],[1,"text-muted-foreground","text-base","lg:text-lg","flex-1","font-mono"],[1,"flex","items-center","gap-1","px-2.5","py-1","rounded","border","border-brand/20","text-brand","bg-brand/5","text-xs","shrink-0","hover:border-brand/40","cursor-pointer",3,"click"],["hlm","","name","lucideBookOpen","size","11px"],[1,"border-t","border-border","pt-3"],[1,"text-xs","text-muted-foreground",2,"font-family","'Inter', sans-serif"],[1,"text-primary",2,"font-family","'Inter', sans-serif"],["type","button",1,"flex-1","py-1.5","text-xs","font-semibold","rounded","transition-all","cursor-pointer","text-center",2,"font-family","'Plus Jakarta Sans', sans-serif",3,"click"]],template:function(e,t){e&1&&(Yo(0,"div",0),Bf(1,"app-audio-player",1),Yo(2,"nav",2)(3,"ol",3)(4,"li",4)(5,"a",5),bI(6,"Languages"),oc()(),Bf(7,"li",6),Yo(8,"li",4)(9,"a",5),bI(10),LI(11,"titlecase"),oc()(),Bf(12,"li",6),Yo(13,"li",4)(14,"a",5),bI(15),LI(16,"titlecase"),oc()(),Bf(17,"li",6),Yo(18,"li",4)(19,"span",7),bI(20,"Chorusing"),oc()()()(),Yo(21,"div",8)(22,"div",9)(23,"span",10),bI(24),oc(),Yo(25,"span",10),bI(26," phrase "),oc()(),Yo(27,"div",11),Bf(28,"div",12),oc()(),Yo(29,"div",13)(30,"div",14),kE(31,Qe,3,0,"div",15)(32,Je,9,3),oc(),Yo(33,"div",16)(34,"div",17)(35,"span",18),bI(36," Playback Speed "),oc()(),Yo(37,"div",19),PE(38,Ye,2,9,"button",20,OE),oc()(),Yo(40,"div",21)(41,"div",22)(42,"div",23),bI(43),oc(),Yo(44,"div",24),bI(45," repititions "),oc()(),Bf(46,"div",25),Yo(47,"div",22),kE(48,Ke,2,0,"span",26)(49,et,3,3,"span",27),Yo(50,"div",28),bI(51," all time "),oc()()(),Yo(52,"button",29),Qf("click",function(){return t.handlePlay()}),bI(53),oc(),Yo(54,"div",30),kE(55,tt,2,0,"button",31),Yo(56,"button",32),Qf("click",function(){return t.handleNext()}),bI(57),oc()()()()),e&2&&(ty(),Hf("language",t.language())("accent",t.accent())("sentenceIndex",t.sentenceIndex())("playbackSpeed",t.playbackSpeed()),ty(4),Hf("link",t.AppRoutesHelper.getLanguagesRoute()),ty(4),Hf("link",t.AppRoutesHelper.getAccentsRoute(t.language().toLowerCase())),ty(),sp(jI(11,21,t.languageObj()?.nativeName)),ty(4),Hf("link",t.AppRoutesHelper.getModeSelectionRoute(t.language().toLowerCase(),t.accent().toLowerCase())),ty(),sp(jI(16,23,t.accentObj()?.nativeName)),ty(9),ap(" ",t.sentenceIndex()," / ",t.numSentences," "),ty(4),Xf("width",t.Number(t.sentenceIndex())/t.numSentences*100,"%"),ty(3),RE(t.sentence().isLoading?31:32),ty(7),LE(RI(25,qe)),ty(5),lc(" ",t.sessionCount()," "),ty(5),RE(t.allTimeRepsState().isLoading?48:49),ty(4),ep("bg-brand-hover",t.isPlaying()),ty(),lc(" ",t.isPlaying()?"\u{1F50A} Listening \u2014 speak along!":"\u25B6 Play & Chorus"," "),ty(2),RE(t.Number(t.sentenceIndex())>1?55:-1),ty(2),lc(" ",t.Number(t.sentenceIndex())<t.numSentences?"Next phrase \u2192":"Finish session \u2192"," "));},dependencies:[w,C,it,n,z,f,x,b,g,v,y,Oo,To],styles:["@keyframes _ngcontent-%COMP%_bounce-wave{0%,to{transform:scaleY(.25);background-color:#4badc866}50%{transform:scaleY(1);background-color:#4badc8d9}}.waveform-bar[_ngcontent-%COMP%]{transform-origin:center;will-change:transform,background-color}.waveform-bar.animating[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_bounce-wave .8s ease-in-out infinite}"]})};export{Le as ChorusDashboard};
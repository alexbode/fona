import {w,N as xa,e as je$1,G as CP,a9 as UI,aa as bP,I as Io,ab as eu,j,a as aE,C,v as vv,S as n,ac as Fo,U as Mo,Y as Yo,B as Bf,Q as Qf,o as oc,c as bI,a3 as LI,k as kE,P as PE,t as ty,H as Hf,l as lc,a4 as jI,ad as ap,ae as Xf,d as RE,L as LE,R as RI,af as ep,z as kI,A as wv,X as fv,V as yv,ag as Fm,ah as Yf,ai as nI,g as Et,aj as vn,a2 as $E,Z as ZE,ak as lE,al as sl,am as Ai,an as l1,ao as NP,ap as rr,aq as $o,ar as It,as as xt,at as ke,au as ct,av as rs,aw as _,ax as hp,ay as Fd,az as xP,K as KE,J as JE,aA as rI,aB as Vf,aC as Zf,aD as eI,aE as tI,O as OE,aF as jm,a5 as Al,a6 as kl}from'./main-VF5BOYUG.js';import {z}from'./chunk-B6Lsotty.js';var Me=(()=>{class o{static \u0275fac=function(t){return new(t||o)};static \u0275mod=lE({type:o});static \u0275inj=sl({imports:[Ai]})}return o})();var we=(()=>{class o{_animationsDisabled=xt();state="unchecked";disabled=false;appearance="full";static \u0275fac=function(t){return new(t||o)};static \u0275cmp=aE({type:o,selectors:[["mat-pseudo-checkbox"]],hostAttrs:[1,"mat-pseudo-checkbox"],hostVars:12,hostBindings:function(t,n){t&2&&ep("mat-pseudo-checkbox-indeterminate",n.state==="indeterminate")("mat-pseudo-checkbox-checked",n.state==="checked")("mat-pseudo-checkbox-disabled",n.disabled)("mat-pseudo-checkbox-minimal",n.appearance==="minimal")("mat-pseudo-checkbox-full",n.appearance==="full")("_mat-animation-noopable",n._animationsDisabled);},inputs:{state:"state",disabled:"disabled",appearance:"appearance"},decls:0,vars:0,template:function(t,n){},styles:[`.mat-pseudo-checkbox {
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
`],encapsulation:2})}return o})();var Ne=["button"],Be=["*"];function Fe(o,a){if(o&1&&(Yo(0,"div",2),Bf(1,"mat-pseudo-checkbox",6),oc()),o&2){let e=ZE();ty(),Hf("disabled",e.disabled);}}var Oe=new _("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS",{providedIn:"root",factory:()=>({hideSingleSelectionIndicator:false,hideMultipleSelectionIndicator:false,disabledInteractive:false})}),Ve=new _("MatButtonToggleGroup");var W=class{source;value;constructor(a,e){this.source=a,this.value=e;}};var Le=(()=>{class o{_changeDetectorRef=w(NP);_elementRef=w(rr);_focusMonitor=w($o);_idGenerator=w(It);_animationDisabled=xt();_checked=false;ariaLabel;ariaLabelledby=null;_buttonElement;buttonToggleGroup;get buttonId(){return `${this.id}-button`}id;name;value;get tabIndex(){return this._tabIndex()}set tabIndex(e){this._tabIndex.set(e);}_tabIndex;disableRipple=false;get appearance(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance}set appearance(e){this._appearance=e;}_appearance;get checked(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked}set checked(e){e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck());}get disabled(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled}set disabled(e){this._disabled=e;}_disabled=false;get disabledInteractive(){return this._disabledInteractive||this.buttonToggleGroup!==null&&this.buttonToggleGroup.disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e;}_disabledInteractive;change=new ke;constructor(){w(ct).load(rs);let e=w(Ve,{optional:true}),t=w(new hp("tabindex"),{optional:true})||"",n=w(Oe,{optional:true});this._tabIndex=Io(parseInt(t)||0),this.buttonToggleGroup=e,this._appearance=n&&n.appearance?n.appearance:"standard",this._disabledInteractive=n?.disabledInteractive??false;}ngOnInit(){let e=this.buttonToggleGroup;this.id=this.id||this._idGenerator.getId("mat-button-toggle-"),e&&(e._isPrechecked(this)?this.checked=true:e._isSelected(this)!==this._checked&&e._syncButtonToggle(this,this._checked));}ngAfterViewInit(){this._animationDisabled||this._elementRef.nativeElement.classList.add("mat-button-toggle-animations-enabled"),this._focusMonitor.monitor(this._elementRef,true);}ngOnDestroy(){let e=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),e&&e._isSelected(this)&&e._syncButtonToggle(this,false,false,true);}focus(e){this._buttonElement.nativeElement.focus(e);}_onButtonClick(){if(this.disabled)return;let e=this.isSingleSelector()?true:!this._checked;if(e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,true),this.buttonToggleGroup._onTouched())),this.isSingleSelector()){let t=this.buttonToggleGroup._buttonToggles.find(n=>n.tabIndex===0);t&&(t.tabIndex=-1),this.tabIndex=0;}this.change.emit(new W(this,this.value));}_markForCheck(){this._changeDetectorRef.markForCheck();}_getButtonName(){return this.isSingleSelector()?this.buttonToggleGroup.name:this.name||null}isSingleSelector(){return this.buttonToggleGroup&&!this.buttonToggleGroup.multiple}static \u0275fac=function(t){return new(t||o)};static \u0275cmp=aE({type:o,selectors:[["mat-button-toggle"]],viewQuery:function(t,n){if(t&1&&Zf(Ne,5),t&2){let m;eI(m=tI())&&(n._buttonElement=m.first);}},hostAttrs:["role","presentation",1,"mat-button-toggle"],hostVars:14,hostBindings:function(t,n){t&1&&Qf("focus",function(){return n.focus()}),t&2&&(Vf("aria-label",null)("aria-labelledby",null)("id",n.id)("name",null),ep("mat-button-toggle-standalone",!n.buttonToggleGroup)("mat-button-toggle-checked",n.checked)("mat-button-toggle-disabled",n.disabled)("mat-button-toggle-disabled-interactive",n.disabledInteractive)("mat-button-toggle-appearance-standard",n.appearance==="standard"));},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],id:"id",name:"name",value:"value",tabIndex:"tabIndex",disableRipple:[2,"disableRipple","disableRipple",xP],appearance:"appearance",checked:[2,"checked","checked",xP],disabled:[2,"disabled","disabled",xP],disabledInteractive:[2,"disabledInteractive","disabledInteractive",xP]},outputs:{change:"change"},exportAs:["matButtonToggle"],ngContentSelectors:Be,decls:7,vars:13,consts:[["button",""],["type","button",1,"mat-button-toggle-button","mat-focus-indicator",3,"click","id","disabled"],[1,"mat-button-toggle-checkbox-wrapper"],[1,"mat-button-toggle-label-content"],[1,"mat-button-toggle-focus-overlay"],["matRipple","",1,"mat-button-toggle-ripple",3,"matRippleTrigger","matRippleDisabled"],["state","checked","aria-hidden","true","appearance","minimal",3,"disabled"]],template:function(t,n){if(t&1&&(KE(),Yo(0,"button",1,0),Qf("click",function(){return n._onButtonClick()}),kE(2,Fe,2,1,"div",2),Yo(3,"span",3),JE(4),oc()(),Bf(5,"span",4)(6,"span",5)),t&2){let m=rI(1);Hf("id",n.buttonId)("disabled",n.disabled&&!n.disabledInteractive||null),Vf("role",n.isSingleSelector()?"radio":"button")("tabindex",n.disabled&&!n.disabledInteractive?-1:n.tabIndex)("aria-pressed",n.isSingleSelector()?null:n.checked)("aria-checked",n.isSingleSelector()?n.checked:null)("name",n._getButtonName())("aria-label",n.ariaLabel)("aria-labelledby",n.ariaLabelledby)("aria-disabled",n.disabled&&n.disabledInteractive?"true":null),ty(2),RE(n.buttonToggleGroup&&(!n.buttonToggleGroup.multiple&&!n.buttonToggleGroup.hideSingleSelectionIndicator||n.buttonToggleGroup.multiple&&!n.buttonToggleGroup.hideMultipleSelectionIndicator)?2:-1),ty(4),Hf("matRippleTrigger",m)("matRippleDisabled",n.disableRipple||n.disabled);}},dependencies:[Fd,we],styles:[`.mat-button-toggle-standalone,
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
`],encapsulation:2})}return o})(),Ee=(()=>{class o{static \u0275fac=function(t){return new(t||o)};static \u0275mod=lE({type:o});static \u0275inj=sl({imports:[l1,Le,Ai]})}return o})();var De=(()=>{class o{static \u0275fac=function(t){return new(t||o)};static \u0275mod=lE({type:o});static \u0275inj=sl({imports:[Ai]})}return o})();var M=class o{language=CP.required();accent=CP.required();sentenceIndex=CP.required();playbackSpeed=CP("100");dataService=w(xa);logger=w(Et);isPlaying=Io(false);audio=new Audio;constructor(){eu(()=>{this.sentenceIndex();this.audioResource(),this.stopAudio();}),eu(()=>{let a=this.playbackSpeed();this.audio&&(this.audio.playbackRate=parseInt(a,10)/100);});}ngOnDestroy(){this.audio.pause(),this.stopAudio();}config=UI(()=>{let a=this.language(),e=this.accent();return this.dataService.getCourseConfig(a,e)()});sentenceId=UI(()=>this.dataService.getChorusSessionState()().sentencesInSession[parseInt(this.sentenceIndex(),10)-1]);audioResource=UI(()=>{let a=this.sentenceId();return a?this.dataService.getAudio(a)():{value:null,isLoading:true,error:null}});handleAudioEnded=()=>{this.logger.debug("audio-player.ts handleAudioEnded"),this.isPlaying.set(false),this.incrementCounter(),this.playAudio();};playAudio(){this.logger.debug("audio-player.ts playAudio");let a=this.audioResource();if(a.isLoading||!a.value){this.logger.debug("Audio is not ready to play yet.");return}this.isPlaying()||(this.audio=new Audio(a.value),this.audio.currentTime=0,this.audio.onended=this.handleAudioEnded,this.audio.playbackRate=parseInt(this.playbackSpeed(),10)/100,this.audio.play().then(()=>{this.isPlaying.set(true);}).catch(e=>{this.logger.error("Failed to play audio:",e),this.isPlaying.set(false);}));}pauseAudio(){this.logger.debug("audio-player.ts pauseAudio"),this.audio.pause(),this.isPlaying.set(false);}stopAudio(){this.logger.debug("audio-player.ts stopAudio"),this.audio.pause(),this.audio.currentTime=0,this.isPlaying.set(false);}incrementCounter(){let a=this.sentenceId();a&&this.dataService.incrementSentenceCount(a,true);}onSpaceBar(){this.isPlaying()?this.pauseAudio():this.playAudio();}static \u0275fac=function(e){return new(e||o)};static \u0275cmp=aE({type:o,selectors:[["app-audio-player"]],hostBindings:function(e,t){e&1&&Qf("keydown.space",function(){return t.onSpaceBar()},jm);},inputs:{language:[1,"language"],accent:[1,"accent"],sentenceIndex:[1,"sentenceIndex"],playbackSpeed:[1,"playbackSpeed"]},decls:0,vars:0,template:function(e,t){},dependencies:[Me,Ee,vn,De],encapsulation:2})};var ze=()=>["25","50","75","90","100","110"];function je(o,a){o&1&&(Yo(0,"div",13),Bf(1,"div",31)(2,"div",32),oc());}function He(o,a){if(o&1&&(Yo(0,"div",38)(1,"p",39)(2,"span",40),bI(3,"pronunciation: "),oc(),bI(4),oc()()),o&2){let e=ZE(2);ty(4),lc(" ",e.sentencePinyin()," ");}}function Xe(o,a){if(o&1){let e=$E();Yo(0,"p",33),bI(1),oc(),Yo(2,"div",34)(3,"p",35),bI(4),oc(),Yo(5,"button",36),Qf("click",function(){Al(e);let n=ZE();return kl(n.onIpa())}),Bf(6,"ng-icon",37),bI(7," IPA "),oc()(),kE(8,He,5,1,"div",38);}if(o&2){let e=ZE();ty(),lc(" ",e.sentenceText()," "),ty(3),lc(" ",e.sentenceIpa()," "),ty(4),RE(e.hasPinyin()?8:-1);}}function We(o,a){if(o&1){let e=$E();Yo(0,"button",41),Qf("click",function(){let n=Al(e).$implicit,m=ZE();return kl(m.setSpeed(n))}),bI(1),oc();}if(o&2){let e=a.$implicit,t=ZE();ep("bg-background",t.playbackSpeed()===e)("text-foreground",t.playbackSpeed()===e)("text-muted-foreground",t.playbackSpeed()!==e)("shadow-sm",t.playbackSpeed()===e),ty(),lc(" ",e,"% ");}}function Ue(o,a){o&1&&(Yo(0,"span",24),bI(1," ... "),oc());}function $e(o,a){if(o&1&&(Yo(0,"span",25),bI(1),LI(2,"number"),oc()),o&2){let e=ZE();ty(),lc(" ",jI(2,1,e.allTimeReps())," ");}}function qe(o,a){if(o&1){let e=$E();Yo(0,"button",30),Qf("click",function(){Al(e);let n=ZE();return kl(n.previousSentence())}),bI(1," \u2190 Prev phrase "),oc();}}var Pe=class o{dataService=w(xa);router=w(je$1);language=CP.required();accent=CP.required();sentenceIndex=CP.required();languagesState=this.dataService.getLanguageList();languageObj=UI(()=>{let a=this.languagesState().value;if(!a)return null;let e=this.language()?.toLowerCase();return a.find(t=>t.name.toLowerCase()===e)||null});accentObj=UI(()=>{let a=this.languageObj();if(!a)return null;let e=this.accent()?.toLowerCase();return a.accents.find(t=>t.name.toLowerCase()===e)||null});audioPlayer=bP(M);isPlaying=UI(()=>this.audioPlayer()?.isPlaying()??false);playbackSpeed=Io("100");setSpeed(a){this.playbackSpeed.set(a);}sessionCount=Io(0);cumulativeReps=Io(0);trackedSentenceId=-1;constructor(){let e=this.router.getCurrentNavigation()?.extras.state;this.cumulativeReps.set(e?.cumulativeReps??0),eu(()=>{let t=this.sentenceCount().value,n=this.sentenceCount().isLoading,m=this.sentenceId();n||t===null||t===void 0||!m||(this.trackedSentenceId!==m?(this.sessionCount.set(0),this.trackedSentenceId=m):this.sessionCount.update(Re=>Re+1));});}config=UI(()=>{let a=this.language(),e=this.accent();return this.dataService.getCourseConfig(a,e)()});sentenceId=UI(()=>this.dataService.getChorusSessionState()().sentencesInSession[parseInt(this.sentenceIndex(),10)-1]);numSentences=10;sentence=UI(()=>{let a=this.sentenceId();return a?this.dataService.getSentence(a)():{value:null,isLoading:true,error:null}});sentenceText=UI(()=>this.sentence().value?.text??"");sentenceIpa=UI(()=>this.sentence().value?.ipa??"");sentencePinyin=UI(()=>this.sentence().value?.pinyin??"");hasPinyin=UI(()=>!!this.sentencePinyin());allTimeRepsState=this.dataService.getTotalSentenceCount();allTimeReps=UI(()=>this.allTimeRepsState().value??0);previousSentence(){this.audioPlayer()?.stopAudio(),Number(this.sentenceIndex())>1&&this.router.navigate(j.getChorusDashboardRoute(this.language(),this.accent(),Number(this.sentenceIndex())-1),{state:{cumulativeReps:this.cumulativeReps()}});}nextSentence(){this.audioPlayer()?.stopAudio();let a=this.cumulativeReps()+this.sessionCount();Number(this.sentenceIndex())<this.numSentences&&this.router.navigate(j.getChorusDashboardRoute(this.language(),this.accent(),Number(this.sentenceIndex())+1),{state:{cumulativeReps:a}});}disablePreviousButton(){return Number(this.sentenceIndex())===1}disableNextButton(){return Number(this.sentenceIndex())===this.numSentences}sentenceCount=UI(()=>{let a=this.sentenceId();return a?this.dataService.getSentenceCount(a)():{value:null,isLoading:false,error:null}});handlePlay(){let a=this.audioPlayer();a&&(a.isPlaying()?a.stopAudio():a.playAudio());}handleNext(){this.audioPlayer()?.stopAudio();let a=this.cumulativeReps()+this.sessionCount();Number(this.sentenceIndex())<this.numSentences?this.router.navigate(j.getChorusDashboardRoute(this.language(),this.accent(),Number(this.sentenceIndex())+1),{state:{cumulativeReps:a}}):this.router.navigate(j.getSummaryRoute(this.language(),this.accent()),{state:{mode:"chorusing",reps:a,total:this.numSentences,accent:this.accentObj()?.nativeName||this.accent()}});}onIpa(){this.audioPlayer()?.stopAudio(),this.router.navigate(j.getIpaRoute());}onBack(){this.audioPlayer()?.stopAudio(),this.router.navigate(j.getModeSelectionRoute(this.language(),this.accent()));}Number=Number;static \u0275fac=function(e){return new(e||o)};static \u0275cmp=aE({type:o,selectors:[["app-chorus-dashboard"]],viewQuery:function(e,t){e&1&&Yf(t.audioPlayer,M,5),e&2&&nI();},hostBindings:function(e,t){e&1&&Qf("keydown.arrowleft",function(){return t.previousSentence()},Fm)("keydown.arrowright",function(){return t.nextSentence()},Fm);},inputs:{language:[1,"language"],accent:[1,"accent"],sentenceIndex:[1,"sentenceIndex"]},features:[kI([wv({lucideChevronLeft:yv,lucideBookOpen:fv})])],decls:45,vars:20,consts:[[1,"flex","flex-col","flex-1","h-full","bg-background","select-none"],[1,"hidden",3,"language","accent","sentenceIndex","playbackSpeed"],[1,"flex","items-center","gap-3","px-5","py-4","shrink-0"],["aria-label","Back",1,"flex","items-center","justify-center","p-1","rounded-full","hover:bg-secondary","cursor-pointer",3,"click"],["hlm","","name","lucideChevronLeft","size","20px",1,"text-foreground"],[1,"text-sm","font-medium","text-muted-foreground",2,"font-family","'Inter', sans-serif"],[1,"px-5","pb-4","shrink-0"],[1,"flex","items-center","justify-between","mb-2"],[1,"text-muted-foreground","text-xs",2,"font-family","'Inter', sans-serif"],[1,"h-[2px]","bg-secondary","rounded-full","overflow-hidden"],[1,"h-full","bg-primary","rounded-full","transition-all","duration-500"],[1,"flex-1","flex","flex-col","px-5","pb-8","gap-5","overflow-y-auto"],[1,"bg-card","border","border-border","rounded","p-5","space-y-3"],[1,"animate-pulse","space-y-3"],[1,"bg-card","border","border-border","rounded","p-5","flex","flex-col","gap-3","justify-center","h-28"],[1,"flex","items-center","justify-between"],[1,"text-xs","font-medium","text-muted-foreground",2,"font-family","'Inter', sans-serif"],[1,"flex","items-center","justify-center","p-1","bg-secondary","rounded-lg","border","border-border"],["type","button",1,"flex-1","py-1.5","text-xs","font-semibold","rounded","transition-all","cursor-pointer","text-center",2,"font-family","'Plus Jakarta Sans', sans-serif",3,"bg-background","text-foreground","text-muted-foreground","shadow-sm"],[1,"bg-card","border","border-border","rounded","py-5","px-5","flex","items-center","justify-between"],[1,"flex","flex-col","items-center","flex-1"],[1,"flex","items-center","justify-center","min-w-[40px]","h-10","px-3","rounded-full","border","border-brand/20","text-brand","bg-brand/10","font-bold","text-lg"],[1,"text-muted-foreground","text-xs","mt-1",2,"font-family","'Inter', sans-serif"],[1,"w-px","h-16","bg-border","mx-4","shrink-0"],[1,"text-4xl","font-bold","leading-none","animate-pulse","text-muted-foreground",2,"font-family","'Plus Jakarta Sans', sans-serif"],[1,"text-4xl","font-bold","leading-none","text-muted-foreground",2,"font-family","'Plus Jakarta Sans', sans-serif"],[1,"text-muted-foreground","text-xs","tracking-widest","uppercase","mt-1",2,"font-family","'Inter', sans-serif"],["appButton","","size","none",1,"w-full","py-4","rounded","text-base","cursor-pointer","gap-2","text-white",2,"font-family","'Plus Jakarta Sans', sans-serif",3,"click"],[1,"flex","gap-3"],["appButton","","variant","secondary","size","none",1,"flex-1","py-4","rounded","text-sm","cursor-pointer",2,"font-family","'Inter', sans-serif"],["appButton","","variant","secondary","size","none",1,"flex-1","py-4","rounded","text-sm","cursor-pointer",2,"font-family","'Inter', sans-serif",3,"click"],[1,"h-6","bg-muted","rounded","w-3/4"],[1,"h-4","bg-muted","rounded","w-1/2"],[1,"text-foreground","text-xl","font-semibold","leading-snug",2,"font-family","'Plus Jakarta Sans', sans-serif"],[1,"flex","items-center","justify-between","gap-3"],[1,"text-muted-foreground","text-sm","flex-1","font-mono",2,"font-family","'Inter', sans-serif"],[1,"flex","items-center","gap-1","px-2.5","py-1","rounded","border","border-brand/20","text-brand","bg-brand/5","text-xs","shrink-0","hover:border-brand/40","cursor-pointer",2,"font-family","'Inter', sans-serif",3,"click"],["hlm","","name","lucideBookOpen","size","11px"],[1,"border-t","border-border","pt-3"],[1,"text-xs","text-muted-foreground",2,"font-family","'Inter', sans-serif"],[1,"text-primary",2,"font-family","'Inter', sans-serif"],["type","button",1,"flex-1","py-1.5","text-xs","font-semibold","rounded","transition-all","cursor-pointer","text-center",2,"font-family","'Plus Jakarta Sans', sans-serif",3,"click"]],template:function(e,t){e&1&&(Yo(0,"div",0),Bf(1,"app-audio-player",1),Yo(2,"header",2)(3,"button",3),Qf("click",function(){return t.onBack()}),Bf(4,"ng-icon",4),oc(),Yo(5,"span",5),bI(6),LI(7,"titlecase"),oc()(),Yo(8,"div",6)(9,"div",7)(10,"span",8),bI(11),oc(),Yo(12,"span",8),bI(13," phrase "),oc()(),Yo(14,"div",9),Bf(15,"div",10),oc()(),Yo(16,"div",11)(17,"div",12),kE(18,je,3,0,"div",13)(19,Xe,9,3),oc(),Yo(20,"div",14)(21,"div",15)(22,"span",16),bI(23," Playback Speed "),oc()(),Yo(24,"div",17),PE(25,We,2,9,"button",18,OE),oc()(),Yo(27,"div",19)(28,"div",20)(29,"div",21),bI(30),oc(),Yo(31,"div",22),bI(32," this session "),oc()(),Bf(33,"div",23),Yo(34,"div",20),kE(35,Ue,2,0,"span",24)(36,$e,3,3,"span",25),Yo(37,"div",26),bI(38," all time "),oc()()(),Yo(39,"button",27),Qf("click",function(){return t.handlePlay()}),bI(40),oc(),Yo(41,"div",28),kE(42,qe,2,0,"button",29),Yo(43,"button",30),Qf("click",function(){return t.handleNext()}),bI(44),oc()()()()),e&2&&(ty(),Hf("language",t.language())("accent",t.accent())("sentenceIndex",t.sentenceIndex())("playbackSpeed",t.playbackSpeed()),ty(5),lc(" Chorusing \xB7 ",jI(7,17,t.accentObj()?.name)," "),ty(5),ap(" ",t.sentenceIndex()," / ",t.numSentences," "),ty(4),Xf("width",t.Number(t.sentenceIndex())/t.numSentences*100,"%"),ty(3),RE(t.sentence().isLoading?18:19),ty(7),LE(RI(19,ze)),ty(5),lc(" ",t.sessionCount()," "),ty(5),RE(t.allTimeRepsState().isLoading?35:36),ty(4),ep("bg-brand-hover",t.isPlaying()),ty(),lc(" ",t.isPlaying()?"\u{1F50A} Listening \u2014 speak along!":"\u25B6 Play & Chorus"," "),ty(2),RE(t.Number(t.sentenceIndex())>1?42:-1),ty(2),lc(" ",t.Number(t.sentenceIndex())<t.numSentences?"Next phrase \u2192":"Finish session \u2192"," "));},dependencies:[M,C,vv,n,z,Fo,Mo],styles:["@keyframes _ngcontent-%COMP%_bounce-wave{0%,to{transform:scaleY(.25);background-color:#4badc866}50%{transform:scaleY(1);background-color:#4badc8d9}}.waveform-bar[_ngcontent-%COMP%]{transform-origin:center;will-change:transform,background-color}.waveform-bar.animating[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_bounce-wave .8s ease-in-out infinite}"]})};export{Pe as ChorusDashboard};
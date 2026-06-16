import {u as ue,g as ge,d as di,l as li,m as mi,k as ke}from'./chunk-CaxRUpb9.js';import {g,c as we$1,aI as yo,y as yt,a0 as Qr,U as nl,o as oe,p as pw,aJ as Za,N as Nl,d as ds,s as sg,Q as Qu,a as kw,w as wI,r as fg,u as uE,i as ig,O as Ow,t as tl,aK as GD,A as Cs,D as Lr,aL as Ps,T as Tn,b as pa,e as Fn,aM as vn,aN as WD,S as Sg,W as Ww,H as rC,G as ot,aO as jr,M as Me$1,Z as ve,aP as lt,aC as le,aQ as Ts,K as _,aR as Ns,aS as vh,au as Hg,a9 as Zw,ac as Yw,aA as eI,av as Ts$1,ad as Eg,ag as hg,ai as Kw,aj as Xw,aT as $w,aU as nf,aV as rf}from'./main-NYRR7DW6.js';import {C}from'./chunk-CENiQ9A6.js';import {z,F,k,T}from'./chunk-BXCgci5S.js';import {d}from'./chunk-BKdkoFr-.js';var Te=["button"],we=["*"];function Be(a,t){if(a&1&&(ds(0,"div",2),sg(1,"mat-pseudo-checkbox",6),Qu()),a&2){let e=Ww();uE(),ig("disabled",e.disabled);}}var De=new _("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS",{providedIn:"root",factory:()=>({hideSingleSelectionIndicator:false,hideMultipleSelectionIndicator:false,disabledInteractive:false})}),Ee=new _("MatButtonToggleGroup");var $=class{source;value;constructor(t,e){this.source=t,this.value=e;}};var Ae=(()=>{class a{_changeDetectorRef=g(rC);_elementRef=g(ot);_focusMonitor=g(jr);_idGenerator=g(Me$1);_animationDisabled=ve();_checked=false;ariaLabel;ariaLabelledby=null;_buttonElement;buttonToggleGroup;get buttonId(){return `${this.id}-button`}id;name;value;get tabIndex(){return this._tabIndex()}set tabIndex(e){this._tabIndex.set(e);}_tabIndex;disableRipple=false;get appearance(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance}set appearance(e){this._appearance=e;}_appearance;get checked(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked}set checked(e){e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck());}get disabled(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled}set disabled(e){this._disabled=e;}_disabled=false;get disabledInteractive(){return this._disabledInteractive||this.buttonToggleGroup!==null&&this.buttonToggleGroup.disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e;}_disabledInteractive;change=new lt;constructor(){g(le).load(Ts);let e=g(Ee,{optional:true}),n=g(new Ns("tabindex"),{optional:true})||"",r=g(De,{optional:true});this._tabIndex=yt(parseInt(n)||0),this.buttonToggleGroup=e,this._appearance=r&&r.appearance?r.appearance:"standard",this._disabledInteractive=r?.disabledInteractive??false;}ngOnInit(){let e=this.buttonToggleGroup;this.id=this.id||this._idGenerator.getId("mat-button-toggle-"),e&&(e._isPrechecked(this)?this.checked=true:e._isSelected(this)!==this._checked&&e._syncButtonToggle(this,this._checked));}ngAfterViewInit(){this._animationDisabled||this._elementRef.nativeElement.classList.add("mat-button-toggle-animations-enabled"),this._focusMonitor.monitor(this._elementRef,true);}ngOnDestroy(){let e=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),e&&e._isSelected(this)&&e._syncButtonToggle(this,false,false,true);}focus(e){this._buttonElement.nativeElement.focus(e);}_onButtonClick(){if(this.disabled)return;let e=this.isSingleSelector()?true:!this._checked;if(e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,true),this.buttonToggleGroup._onTouched())),this.isSingleSelector()){let n=this.buttonToggleGroup._buttonToggles.find(r=>r.tabIndex===0);n&&(n.tabIndex=-1),this.tabIndex=0;}this.change.emit(new $(this,this.value));}_markForCheck(){this._changeDetectorRef.markForCheck();}_getButtonName(){return this.isSingleSelector()?this.buttonToggleGroup.name:this.name||null}isSingleSelector(){return this.buttonToggleGroup&&!this.buttonToggleGroup.multiple}static \u0275fac=function(n){return new(n||a)};static \u0275cmp=pw({type:a,selectors:[["mat-button-toggle"]],viewQuery:function(n,r){if(n&1&&hg(Te,5),n&2){let v;Kw(v=Xw())&&(r._buttonElement=v.first);}},hostAttrs:["role","presentation",1,"mat-button-toggle"],hostVars:14,hostBindings:function(n,r){n&1&&fg("focus",function(){return r.focus()}),n&2&&(Ts$1("aria-label",null)("aria-labelledby",null)("id",r.id)("name",null),Eg("mat-button-toggle-standalone",!r.buttonToggleGroup)("mat-button-toggle-checked",r.checked)("mat-button-toggle-disabled",r.disabled)("mat-button-toggle-disabled-interactive",r.disabledInteractive)("mat-button-toggle-appearance-standard",r.appearance==="standard"));},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],id:"id",name:"name",value:"value",tabIndex:"tabIndex",disableRipple:[2,"disableRipple","disableRipple",Hg],appearance:"appearance",checked:[2,"checked","checked",Hg],disabled:[2,"disabled","disabled",Hg],disabledInteractive:[2,"disabledInteractive","disabledInteractive",Hg]},outputs:{change:"change"},exportAs:["matButtonToggle"],ngContentSelectors:we,decls:7,vars:13,consts:[["button",""],["type","button",1,"mat-button-toggle-button","mat-focus-indicator",3,"click","id","disabled"],[1,"mat-button-toggle-checkbox-wrapper"],[1,"mat-button-toggle-label-content"],[1,"mat-button-toggle-focus-overlay"],["matRipple","",1,"mat-button-toggle-ripple",3,"matRippleTrigger","matRippleDisabled"],["state","checked","aria-hidden","true","appearance","minimal",3,"disabled"]],template:function(n,r){if(n&1&&(Zw(),ds(0,"button",1,0),fg("click",function(){return r._onButtonClick()}),kw(2,Be,2,1,"div",2),ds(3,"span",3),Yw(4),Qu()(),sg(5,"span",4)(6,"span",5)),n&2){let v=eI(1);ig("id",r.buttonId)("disabled",r.disabled&&!r.disabledInteractive||null),Ts$1("role",r.isSingleSelector()?"radio":"button")("tabindex",r.disabled&&!r.disabledInteractive?-1:r.tabIndex)("aria-pressed",r.isSingleSelector()?null:r.checked)("aria-checked",r.isSingleSelector()?r.checked:null)("name",r._getButtonName())("aria-label",r.ariaLabel)("aria-labelledby",r.ariaLabelledby)("aria-disabled",r.disabled&&r.disabledInteractive?"true":null),uE(2),Ow(r.buttonToggleGroup&&(!r.buttonToggleGroup.multiple&&!r.buttonToggleGroup.hideSingleSelectionIndicator||r.buttonToggleGroup.multiple&&!r.buttonToggleGroup.hideMultipleSelectionIndicator)?2:-1),uE(4),ig("matRippleTrigger",v)("matRippleDisabled",r.disableRipple||r.disabled);}},dependencies:[vh,ke],styles:[`.mat-button-toggle-standalone,
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
`],encapsulation:2})}return a})(),O=(()=>{class a{static \u0275fac=function(n){return new(n||a)};static \u0275mod=Cs({type:a});static \u0275inj=Lr({imports:[Ps,Ae,Tn]})}return a})();var Se=(()=>{class a{static \u0275fac=function(n){return new(n||a)};static \u0275mod=Cs({type:a});static \u0275inj=Lr({imports:[Tn]})}return a})();function Ge(a,t){if(a&1){let e=$w();ds(0,"button",2),fg("click",function(){nf(e);let r=Ww();return rf(r.playAudio())}),ds(1,"mat-icon"),wI(2,"play_arrow"),Qu(),wI(3," Play "),Qu();}if(a&2){let e=Ww();ig("disabled",!e.auth.isLoggedIn());}}function Ve(a,t){if(a&1){let e=$w();ds(0,"button",3),fg("click",function(){nf(e);let r=Ww();return rf(r.stopAudio())}),ds(1,"mat-icon"),wI(2,"stop"),Qu(),wI(3," Stop "),Qu();}if(a&2){let e=Ww();ig("disabled",!e.auth.isLoggedIn());}}var G=class a{language=yo.required();accent=yo.required();sentenceIndex=yo.required();auth=g(pa);dataService=g(C);logger=g(Fn);isPlaying=yt(false);audio=new Audio;playbackSpeed="100";constructor(){Qr(()=>{this.sentenceIndex();this.audioResource(),this.stopAudio();});}config=nl(()=>{let t=this.language(),e=this.accent();return this.dataService.getCourseConfig(t,e)()});sentenceId=nl(()=>{let t=this.config();return !t.value||t.isLoading||t.error?null:t.value.chorus.sentences[parseInt(this.sentenceIndex(),10)-1]});audioResource=nl(()=>{let t=this.sentenceId();return t?this.dataService.getAudio(t)():{value:null,isLoading:true,error:null}});handleAudioEnded=()=>{this.logger.debug("audio-player.ts handleAudioEnded"),this.isPlaying.set(false),this.incrementCounter(),this.playAudio();};playAudio(){this.logger.debug("audio-player.ts playAudio");let t=this.audioResource();if(t.isLoading||!t.value){this.logger.debug("Audio is not ready to play yet.");return}this.isPlaying()||(this.audio=new Audio(t.value),this.audio.currentTime=0,this.audio.onended=this.handleAudioEnded,this.audio.playbackRate=parseInt(this.playbackSpeed,10)/100,this.audio.play().then(()=>{this.isPlaying.set(true);}).catch(e=>{this.logger.error("Failed to play audio:",e),this.isPlaying.set(false);}));}pauseAudio(){this.logger.debug("audio-player.ts pauseAudio"),this.audio.pause(),this.isPlaying.set(false);}stopAudio(){this.logger.debug("audio-player.ts stopAudio"),this.audio.pause(),this.audio.currentTime=0,this.isPlaying.set(false);}incrementCounter(){let t=this.sentenceId();t&&this.dataService.incrementSentenceCount(t);}onSpaceBar(){this.isPlaying()?this.pauseAudio():this.playAudio();}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=pw({type:a,selectors:[["app-audio-player"]],hostBindings:function(e,n){e&1&&fg("keydown.space",function(){return n.onSpaceBar()},WD);},inputs:{language:[1,"language"],accent:[1,"accent"],sentenceIndex:[1,"sentenceIndex"]},decls:2,vars:1,consts:[["hlmBtn","","appButton","",1,"audio-icon",3,"disabled"],["hlmBtn","","appButton","",3,"disabled"],["hlmBtn","","appButton","",1,"audio-icon",3,"click","disabled"],["hlmBtn","","appButton","",3,"click","disabled"]],template:function(e,n){e&1&&kw(0,Ge,4,1,"button",0)(1,Ve,4,1,"button",1),e&2&&Ow(n.isPlaying()?1:0);},dependencies:[ue,ge,O,vn,Se,d,Nl],encapsulation:2})};function Le(a,t){if(a&1&&(ds(0,"mat-list-item",3),wI(1),Qu()),a&2){let e=Ww();uE(),Sg(e.pinyin());}}var V=class a{dataService=g(C);logger=g(Fn);language=yo.required();accent=yo.required();sentenceIndex=yo.required();config=nl(()=>{let t=this.language(),e=this.accent();return this.dataService.getCourseConfig(t,e)()});sentence=nl(()=>{let t=this.config(),e=parseInt(this.sentenceIndex(),10);return t.isLoading||!t.value?{value:null,isLoading:t.isLoading,error:t.error}:this.dataService.getSentence(t.value.chorus.sentences[e-1])()});text=nl(()=>this.sentence().value?.text);ipa=nl(()=>this.sentence().value?.ipa);pinyin=nl(()=>this.sentence().value?.pinyin);hasPinyin=nl(()=>this.pinyin!==null&&this.pinyin!==void 0);static \u0275fac=function(e){return new(e||a)};static \u0275cmp=pw({type:a,selectors:[["app-sentence-text"]],inputs:{language:[1,"language"],accent:[1,"accent"],sentenceIndex:[1,"sentenceIndex"]},decls:6,vars:3,consts:[[1,"mat-list"],["role","listitem",1,"main-text"],["role","listitem",1,"ipa-text"],["role","listitem",1,"other-text"]],template:function(e,n){e&1&&(ds(0,"mat-list",0)(1,"mat-list-item",1),wI(2),Qu(),ds(3,"mat-list-item",2),wI(4),Qu(),kw(5,Le,2,1,"mat-list-item",3),Qu()),e&2&&(uE(2),Sg(n.text()),uE(2),Sg(n.ipa()),uE(),Ow(n.hasPinyin()?5:-1));},dependencies:[di,li,mi],styles:[".main-text[_ngcontent-%COMP%]{font-size:1.5rem}.ipa-text[_ngcontent-%COMP%]{font-size:1.2rem}.mat-list[_ngcontent-%COMP%]{width:100}"]})};var Ie=(()=>{class a{static \u0275fac=function(n){return new(n||a)};static \u0275mod=Cs({type:a});static \u0275inj=Lr({imports:[Tn]})}return a})();function ze(a,t){a&1&&(ds(0,"p"),wI(1,"ChorusCount: -"),Qu());}function Fe(a,t){if(a&1&&(ds(0,"p"),wI(1),Qu()),a&2){let e=Ww();uE(),tl("ChorusCount: ",e.sentenceCount().value);}}function Xe(a,t){a&1&&(ds(0,"p"),wI(1,"ChorusCount: ?"),Qu());}var Me=class a{dataService=g(C);router=g(we$1);language=yo.required();accent=yo.required();sentenceIndex=yo.required();sessionCount=yt(0);trackedSentenceId=-1;constructor(){Qr(()=>{let t=this.sentenceCount().value,e=this.sentenceCount().isLoading,n=this.sentenceId();e||t===null||t===void 0||!n||(this.trackedSentenceId!==n?(this.sessionCount.set(0),this.trackedSentenceId=n):this.sessionCount.update(r=>r+1));});}config=nl(()=>{let t=this.language(),e=this.accent();return this.dataService.getCourseConfig(t,e)()});sentenceId=nl(()=>{let t=this.config();return !t.value||t.isLoading||t.error?null:t.value.chorus.sentences[parseInt(this.sentenceIndex(),10)-1]});numSentences=nl(()=>{let t=this.config().value;return t!=null?t.chorus.sentences.length:0});previousSentence(){Number(this.sentenceIndex())>1&&this.router.navigate(oe.getChorusDashboardRoute(this.language(),this.accent(),Number(this.sentenceIndex())-1));}nextSentence(){Number(this.sentenceIndex())<this.numSentences()&&this.router.navigate(oe.getChorusDashboardRoute(this.language(),this.accent(),Number(this.sentenceIndex())+1));}disablePreviousButton(){return Number(this.sentenceIndex())===1}disableNextButton(){return Number(this.sentenceIndex())===this.numSentences()}sentenceCount=nl(()=>{let t=this.sentenceId();return t?this.dataService.getSentenceCount(t)():{value:null,isLoading:false,error:null}});resetSessionCount(){this.sessionCount.set(0);}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=pw({type:a,selectors:[["app-chorus-dashboard"]],hostBindings:function(e,n){e&1&&fg("keydown.arrowleft",function(){return n.previousSentence()},GD)("keydown.arrowright",function(){return n.nextSentence()},GD);},inputs:{language:[1,"language"],accent:[1,"accent"],sentenceIndex:[1,"sentenceIndex"]},decls:25,vars:10,consts:[[1,"card-container","bg-red-400"],[3,"language","accent","sentenceIndex"],[1,"chorus-count-row"],[1,"chorus-count-col"],["hlmBtn","","appButton","",3,"click"],["hlmBtn","","appButton","",3,"click","disabled"]],template:function(e,n){e&1&&(ds(0,"div",0)(1,"mat-card")(2,"mat-card-header"),sg(3,"app-sentence-text",1),Qu(),ds(4,"mat-card-content")(5,"div",2)(6,"div",3),kw(7,ze,2,0,"p")(8,Fe,2,1,"p")(9,Xe,2,0,"p"),ds(10,"p"),wI(11),Qu()(),ds(12,"button",4),fg("click",function(){return n.resetSessionCount()}),wI(13," Refresh "),ds(14,"mat-icon"),wI(15,"refresh"),Qu()()(),sg(16,"app-audio-player",1),ds(17,"button",5),fg("click",function(){return n.previousSentence()}),ds(18,"mat-icon"),wI(19,"skip_previous"),Qu(),wI(20," Prev Sentence "),Qu(),ds(21,"button",5),fg("click",function(){return n.nextSentence()}),wI(22," Next Sentence "),ds(23,"mat-icon"),wI(24,"skip_next"),Qu()()()()()),e&2&&(uE(3),ig("language",n.language())("accent",n.accent())("sentenceIndex",n.sentenceIndex()),uE(4),Ow(n.sentenceCount().isLoading?7:n.sentenceCount().value!==null?8:n.sentenceCount().error?9:-1),uE(4),tl("SessionCount: ",n.sessionCount()),uE(5),ig("language",n.language())("accent",n.accent())("sentenceIndex",n.sentenceIndex()),uE(),ig("disabled",n.disablePreviousButton()),uE(4),ig("disabled",n.disableNextButton()));},dependencies:[Za,ue,ge,O,G,V,z,F,k,T,Ie,Nl,d],styles:[".card-container[_ngcontent-%COMP%]{max-width:100%;display:flex;justify-content:center;align-items:center}.chorus-count-col[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center}.chorus-count-row[_ngcontent-%COMP%]{display:flex;flex-direction:row}"]})};export{Me as ChorusDashboard};
import {o as on,Z as Zn,Q as Qn,X as Xn,h as hn}from'./chunk-xfaf2mPZ.js';import {g,C as Ce$1,av as LF,L as Le$1,H as Oa,aw,u as Et,z as zE,a as fa,ax as hh,y as yt,w as wt,P as Pi,p as ph,i as iu,d as dI,Z as ZI,v as vh,k as kv,f as fh,b as fI,e as cu,ay as mv,Y as Yi,h as hr,az as ms,m as gn,V as Vo,E as En,x as xh,c as yI,q as Pw,n as zn,aA as vr,D as De$1,F as be,aB as ze$1,ak as Ae,aC as us,aD as zh,aE as Ru,au as HF,T as DI,X as EI,ai as bI,ao as dh,a0 as _h,a3 as Ih,a5 as wI,a6 as CI,aF as hI,a9 as w,aG as td,aH as nd,aI as yv}from'./main-AD2XSD5W.js';import {p}from'./chunk-Ct761QFw.js';import {z,F as F$1,k,T}from'./chunk-Cm_lggXL.js';var Ce=["button"],Te=["*"];function we(a,t){if(a&1&&(Pi(0,"div",2),ph(1,"mat-pseudo-checkbox",6),iu()),a&2){let e=yI();kv(),fh("disabled",e.disabled);}}var Be=new w("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS",{providedIn:"root",factory:()=>({hideSingleSelectionIndicator:false,hideMultipleSelectionIndicator:false,disabledInteractive:false})}),Ee=new w("MatButtonToggleGroup");var $=class{source;value;constructor(t,e){this.source=t,this.value=e;}};var De=(()=>{class a{_changeDetectorRef=g(Pw);_elementRef=g(zn);_focusMonitor=g(vr);_idGenerator=g(De$1);_animationDisabled=be();_checked=false;ariaLabel;ariaLabelledby=null;_buttonElement;buttonToggleGroup;get buttonId(){return `${this.id}-button`}id;name;value;get tabIndex(){return this._tabIndex()}set tabIndex(e){this._tabIndex.set(e);}_tabIndex;disableRipple=false;get appearance(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance}set appearance(e){this._appearance=e;}_appearance;get checked(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked}set checked(e){e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck());}get disabled(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled}set disabled(e){this._disabled=e;}_disabled=false;get disabledInteractive(){return this._disabledInteractive||this.buttonToggleGroup!==null&&this.buttonToggleGroup.disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e;}_disabledInteractive;change=new ze$1;constructor(){g(Ae).load(us);let e=g(Ee,{optional:true}),n=g(new zh("tabindex"),{optional:true})||"",r=g(Be,{optional:true});this._tabIndex=Le$1(parseInt(n)||0),this.buttonToggleGroup=e,this._appearance=r&&r.appearance?r.appearance:"standard",this._disabledInteractive=r?.disabledInteractive??false;}ngOnInit(){let e=this.buttonToggleGroup;this.id=this.id||this._idGenerator.getId("mat-button-toggle-"),e&&(e._isPrechecked(this)?this.checked=true:e._isSelected(this)!==this._checked&&e._syncButtonToggle(this,this._checked));}ngAfterViewInit(){this._animationDisabled||this._elementRef.nativeElement.classList.add("mat-button-toggle-animations-enabled"),this._focusMonitor.monitor(this._elementRef,true);}ngOnDestroy(){let e=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),e&&e._isSelected(this)&&e._syncButtonToggle(this,false,false,true);}focus(e){this._buttonElement.nativeElement.focus(e);}_onButtonClick(){if(this.disabled)return;let e=this.isSingleSelector()?true:!this._checked;if(e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,true),this.buttonToggleGroup._onTouched())),this.isSingleSelector()){let n=this.buttonToggleGroup._buttonToggles.find(r=>r.tabIndex===0);n&&(n.tabIndex=-1),this.tabIndex=0;}this.change.emit(new $(this,this.value));}_markForCheck(){this._changeDetectorRef.markForCheck();}_getButtonName(){return this.isSingleSelector()?this.buttonToggleGroup.name:this.name||null}isSingleSelector(){return this.buttonToggleGroup&&!this.buttonToggleGroup.multiple}static \u0275fac=function(n){return new(n||a)};static \u0275cmp=zE({type:a,selectors:[["mat-button-toggle"]],viewQuery:function(n,r){if(n&1&&Ih(Ce,5),n&2){let y;wI(y=CI())&&(r._buttonElement=y.first);}},hostAttrs:["role","presentation",1,"mat-button-toggle"],hostVars:14,hostBindings:function(n,r){n&1&&vh("focus",function(){return r.focus()}),n&2&&(dh("aria-label",null)("aria-labelledby",null)("id",r.id)("name",null),_h("mat-button-toggle-standalone",!r.buttonToggleGroup)("mat-button-toggle-checked",r.checked)("mat-button-toggle-disabled",r.disabled)("mat-button-toggle-disabled-interactive",r.disabledInteractive)("mat-button-toggle-appearance-standard",r.appearance==="standard"));},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],id:"id",name:"name",value:"value",tabIndex:"tabIndex",disableRipple:[2,"disableRipple","disableRipple",HF],appearance:"appearance",checked:[2,"checked","checked",HF],disabled:[2,"disabled","disabled",HF],disabledInteractive:[2,"disabledInteractive","disabledInteractive",HF]},outputs:{change:"change"},exportAs:["matButtonToggle"],ngContentSelectors:Te,decls:7,vars:13,consts:[["button",""],["type","button",1,"mat-button-toggle-button","mat-focus-indicator",3,"click","id","disabled"],[1,"mat-button-toggle-checkbox-wrapper"],[1,"mat-button-toggle-label-content"],[1,"mat-button-toggle-focus-overlay"],["matRipple","",1,"mat-button-toggle-ripple",3,"matRippleTrigger","matRippleDisabled"],["state","checked","aria-hidden","true","appearance","minimal",3,"disabled"]],template:function(n,r){if(n&1&&(DI(),Pi(0,"button",1,0),vh("click",function(){return r._onButtonClick()}),dI(2,we,2,1,"div",2),Pi(3,"span",3),EI(4),iu()(),ph(5,"span",4)(6,"span",5)),n&2){let y=bI(1);fh("id",r.buttonId)("disabled",r.disabled&&!r.disabledInteractive||null),dh("role",r.isSingleSelector()?"radio":"button")("tabindex",r.disabled&&!r.disabledInteractive?-1:r.tabIndex)("aria-pressed",r.isSingleSelector()?null:r.checked)("aria-checked",r.isSingleSelector()?r.checked:null)("name",r._getButtonName())("aria-label",r.ariaLabel)("aria-labelledby",r.ariaLabelledby)("aria-disabled",r.disabled&&r.disabledInteractive?"true":null),kv(2),fI(r.buttonToggleGroup&&(!r.buttonToggleGroup.multiple&&!r.buttonToggleGroup.hideSingleSelectionIndicator||r.buttonToggleGroup.multiple&&!r.buttonToggleGroup.hideMultipleSelectionIndicator)?2:-1),kv(4),fh("matRippleTrigger",y)("matRippleDisabled",r.disableRipple||r.disabled);}},dependencies:[Ru,hn],styles:[`.mat-button-toggle-standalone,
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
`],encapsulation:2})}return a})(),G=(()=>{class a{static \u0275fac=function(n){return new(n||a)};static \u0275mod=Yi({type:a});static \u0275inj=hr({imports:[ms,De,gn]})}return a})();var xe=(()=>{class a{static \u0275fac=function(n){return new(n||a)};static \u0275mod=Yi({type:a});static \u0275inj=hr({imports:[gn]})}return a})();function Oe(a,t){if(a&1){let e=hI();Pi(0,"button",2),vh("click",function(){td(e);let r=yI();return nd(r.playAudio())}),Pi(1,"mat-icon"),ZI(2,"play_arrow"),iu(),ZI(3," Play "),iu();}if(a&2){let e=yI();fh("disabled",!e.auth.isLoggedIn());}}function Ge(a,t){if(a&1){let e=hI();Pi(0,"button",3),vh("click",function(){td(e);let r=yI();return nd(r.stopAudio())}),Pi(1,"mat-icon"),ZI(2,"stop"),iu(),ZI(3," Stop "),iu();}if(a&2){let e=yI();fh("disabled",!e.auth.isLoggedIn());}}var V=class a{language=LF.required();accent=LF.required();sentenceIndex=LF.required();auth=g(Vo);dataService=g(p);logger=g(En);isPlaying=Le$1(false);audio=new Audio;playbackSpeed="100";constructor(){Oa(()=>{this.sentenceIndex();this.stopAudio();});}configResource=aw({params:()=>({language:this.language(),accent:this.accent()}),loader:async({params:t})=>{if(!(!t.language||!t.accent))return await this.dataService.getCourseConfig(t.language,t.accent)}});sentenceId=Et(()=>{let t=this.configResource.value();if(t)return t.chorus.sentences[parseInt(this.sentenceIndex(),10)-1]});audioResource=aw({params:()=>({id:this.sentenceId()}),loader:async({params:t})=>{if(!t.id)return;this.logger.debug("audio-player.ts audioResource | params:",t);let e=await this.dataService.getPresignedUrl(t.id);return new Audio(e)}});handleAudioEnded=()=>{this.logger.debug("audio-player.ts handleAudioEnded"),this.isPlaying.set(false),this.incrementCounter(),this.playAudio();};playAudio(){this.logger.debug("audio-player.ts playAudio"),this.isPlaying()||(this.audio=this.audioResource.value()||new Audio(""),this.audio.ended&&(this.audio.currentTime=0),this.audio.onended=this.handleAudioEnded,this.audio.playbackRate=parseInt(this.playbackSpeed,10)/100,this.audio.play(),this.isPlaying.set(true));}pauseAudio(){this.logger.debug("audio-player.ts pauseAudio"),this.audio.pause(),this.isPlaying.set(false);}stopAudio(){this.logger.debug("audio-player.ts stopAudio"),this.audio.pause(),this.audio.currentTime=0,this.isPlaying.set(false);}incrementCounter(){let t=this.sentenceId();t&&this.dataService.incrementSentenceCount(t);}onSpaceBar(){this.isPlaying()?this.pauseAudio():this.playAudio();}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=zE({type:a,selectors:[["app-audio-player"]],hostBindings:function(e,n){e&1&&vh("keydown.space",function(){return n.onSpaceBar()},yv);},inputs:{language:[1,"language"],accent:[1,"accent"],sentenceIndex:[1,"sentenceIndex"]},decls:2,vars:1,consts:[["matFab","","extended","",1,"audio-icon",3,"disabled"],["matFab","","extended","",3,"disabled"],["matFab","","extended","",1,"audio-icon",3,"click","disabled"],["matFab","","extended","",3,"click","disabled"]],template:function(e,n){e&1&&dI(0,Oe,4,1,"button",0)(1,Ge,4,1,"button",1),e&2&&fI(n.isPlaying()?1:0);},dependencies:[fa,hh,yt,wt,G,on,xe],encapsulation:2})};function Ve(a,t){if(a&1&&(Pi(0,"mat-list-item",3),ZI(1),iu()),a&2){let e=yI();kv(),xh(e.pinyin());}}var F=class a{dataService=g(p);logger=g(En);language=LF.required();accent=LF.required();sentenceIndex=LF.required();configResource=aw({params:()=>({language:this.language(),accent:this.accent()}),loader:async({params:t})=>{if(!(!t.language||!t.accent))return await this.dataService.getCourseConfig(t.language,t.accent)}});sentenceId=Et(()=>{let t=this.configResource.value();if(t)return t.chorus.sentences[parseInt(this.sentenceIndex(),10)-1]});sentenceResource=aw({params:()=>({id:this.sentenceId()}),loader:async({params:t})=>{if(t.id)return await this.dataService.getSentence(t.id)}});text=Et(()=>this.sentenceResource.value()?.text);ipa=Et(()=>this.sentenceResource.value()?.ipa);pinyin=Et(()=>this.sentenceResource.value()?.pinyin);hasPinyin=Et(()=>this.pinyin!==null&&this.pinyin!==void 0);static \u0275fac=function(e){return new(e||a)};static \u0275cmp=zE({type:a,selectors:[["app-sentence-text"]],inputs:{language:[1,"language"],accent:[1,"accent"],sentenceIndex:[1,"sentenceIndex"]},decls:6,vars:3,consts:[[1,"mat-list"],["role","listitem",1,"main-text"],["role","listitem",1,"ipa-text"],["role","listitem",1,"other-text"]],template:function(e,n){e&1&&(Pi(0,"mat-list",0)(1,"mat-list-item",1),ZI(2),iu(),Pi(3,"mat-list-item",2),ZI(4),iu(),dI(5,Ve,2,1,"mat-list-item",3),iu()),e&2&&(kv(2),xh(n.text()),kv(2),xh(n.ipa()),kv(),fI(n.hasPinyin()?5:-1));},dependencies:[Zn,Qn,Xn],styles:[".main-text[_ngcontent-%COMP%]{font-size:1.5rem}.ipa-text[_ngcontent-%COMP%]{font-size:1.2rem}.mat-list[_ngcontent-%COMP%]{width:100}"]})};var Me=(()=>{class a{static \u0275fac=function(n){return new(n||a)};static \u0275mod=Yi({type:a});static \u0275inj=hr({imports:[gn]})}return a})();function Fe(a,t){a&1&&(Pi(0,"p"),ZI(1,"ChorusCount: -"),iu());}function ze(a,t){if(a&1&&(Pi(0,"p"),ZI(1),iu()),a&2){let e=yI();kv(),cu("ChorusCount: ",e.sentenceCountResource.value());}}function Le(a,t){a&1&&(Pi(0,"p"),ZI(1,"ChorusCount: ?"),iu());}var Ie=class a{dataService=g(p);router=g(Ce$1);language=LF.required();accent=LF.required();sentenceIndex=LF.required();sessionCount=Le$1(0);trackedSentenceId=-1;constructor(){Oa(()=>{let t=this.sentenceCountResource.value(),e=this.sentenceCountResource.isLoading(),n=this.sentenceId();e||t===null||t===void 0||!n||(this.trackedSentenceId!==n?(this.sessionCount.set(0),this.trackedSentenceId=n):this.sessionCount.update(r=>r+1));});}configResource=aw({params:()=>({language:this.language(),accent:this.accent()}),loader:async({params:t})=>{if(!(!t.language||!t.accent))return await this.dataService.getCourseConfig(t.language,t.accent)}});sentenceId=Et(()=>{let t=this.configResource.value();if(t)return t.chorus.sentences[parseInt(this.sentenceIndex(),10)-1]});numSentences=Et(()=>{let t=this.configResource.value();return t?t.chorus.sentences.length:0});previousSentence(){Number(this.sentenceIndex())>1&&(this.router.navigate([this.language(),this.accent(),Number(this.sentenceIndex())-1]),this.router.navigate([this.language(),this.accent(),Number(this.sentenceIndex())-1]));}nextSentence(){Number(this.sentenceIndex())<this.numSentences()&&this.router.navigate([this.language(),this.accent(),Number(this.sentenceIndex())+1]);}disablePreviousButton(){return Number(this.sentenceIndex())===1}disableNextButton(){return Number(this.sentenceIndex())===this.numSentences()}sentenceCountResource=aw({params:()=>({id:this.sentenceId(),_refresh:this.dataService.sentenceCountUpdateTrigger()}),loader:async({params:t})=>t.id?await this.dataService.getSentenceCount(t.id):null});resetSessionCount(){this.sessionCount.set(0);}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=zE({type:a,selectors:[["app-chorus-dashboard"]],hostBindings:function(e,n){e&1&&vh("keydown.arrowleft",function(){return n.previousSentence()},mv)("keydown.arrowright",function(){return n.nextSentence()},mv);},inputs:{language:[1,"language"],accent:[1,"accent"],sentenceIndex:[1,"sentenceIndex"]},decls:25,vars:10,consts:[[1,"card-container"],[3,"language","accent","sentenceIndex"],[1,"chorus-count-row"],[1,"chorus-count-col"],["matFab","","extended","",3,"click"],["matFab","","extended","",3,"click","disabled"]],template:function(e,n){e&1&&(Pi(0,"div",0)(1,"mat-card")(2,"mat-card-header"),ph(3,"app-sentence-text",1),iu(),Pi(4,"mat-card-content")(5,"div",2)(6,"div",3),dI(7,Fe,2,0,"p")(8,ze,2,1,"p")(9,Le,2,0,"p"),Pi(10,"p"),ZI(11),iu()(),Pi(12,"button",4),vh("click",function(){return n.resetSessionCount()}),ZI(13," Refresh "),Pi(14,"mat-icon"),ZI(15,"refresh"),iu()()(),ph(16,"app-audio-player",1),Pi(17,"button",5),vh("click",function(){return n.previousSentence()}),Pi(18,"mat-icon"),ZI(19,"skip_previous"),iu(),ZI(20," Prev Sentence "),iu(),Pi(21,"button",5),vh("click",function(){return n.nextSentence()}),ZI(22," Next Sentence "),Pi(23,"mat-icon"),ZI(24,"skip_next"),iu()()()()()),e&2&&(kv(3),fh("language",n.language())("accent",n.accent())("sentenceIndex",n.sentenceIndex()),kv(4),fI(n.sentenceCountResource.isLoading()?7:n.sentenceCountResource.hasValue()?8:n.sentenceCountResource.error()?9:-1),kv(4),cu("SessionCount: ",n.sessionCount()),kv(5),fh("language",n.language())("accent",n.accent())("sentenceIndex",n.sentenceIndex()),kv(),fh("disabled",n.disablePreviousButton()),kv(4),fh("disabled",n.disableNextButton()));},dependencies:[fa,hh,yt,wt,G,V,F,z,F$1,k,T,Me],styles:[".card-container[_ngcontent-%COMP%]{max-width:100%;display:flex;justify-content:center;align-items:center}.chorus-count-col[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center}.chorus-count-row[_ngcontent-%COMP%]{display:flex;flex-direction:row}"]})};export{Ie as ChorusDashboard};
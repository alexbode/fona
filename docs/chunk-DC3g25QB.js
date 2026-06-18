import {F as Fe$1,M as Me}from'./chunk-B2CUutuX.js';import {D,aJ as pa,J as Je,aY as eL,O as nD,M as tL,T as To,a0 as uu,q,I as IE,aK as wt,aL as k,aZ as us,aM as ss,X as Xo,Y as Yf,r as rp,f as fc,j as jI,aU as ZI,b as qE,Q as QE,m as my,Z as Zf,y as yc,aV as KI,a_ as vp,a$ as up,c as GE,a as ZE,G as GI,ac as dp,ad as qI,aN as ct,aP as Vt,aO as zt,b0 as Jm,ae as ap,ag as gI,A as Ae$1,b1 as vn,aT as tI,s as cI,w as wE,u as ml,av as Yf$1,x as ws,E as iL,C as sr,b2 as jr,H as je$1,W as we$1,b3 as Fe$2,aB as ce,b4 as Ys,N,b5 as bp,b6 as Rf,at as aL,a9 as uI,ab as dI,aF as mI,au as Qf,af as ip,ah as pI,ai as hI,z as zE,b7 as Xm,aW as Bl,aX as $l}from'./main-5RFBPUMP.js';import {z}from'./chunk-RESu_WvF.js';var Ee=["button"],Ae=["*"];function Re(r,t){if(r&1&&(Xo(0,"div",2),Yf(1,"mat-pseudo-checkbox",6),fc()),r&2){let e=cI();my(),Zf("disabled",e.disabled);}}var Ne=new N("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS",{providedIn:"root",factory:()=>({hideSingleSelectionIndicator:false,hideMultipleSelectionIndicator:false,disabledInteractive:false})}),Oe=new N("MatButtonToggleGroup");var X=class{source;value;constructor(t,e){this.source=t,this.value=e;}};var Ge=(()=>{class r{_changeDetectorRef=D(iL);_elementRef=D(sr);_focusMonitor=D(jr);_idGenerator=D(je$1);_animationDisabled=we$1();_checked=false;ariaLabel;ariaLabelledby=null;_buttonElement;buttonToggleGroup;get buttonId(){return `${this.id}-button`}id;name;value;get tabIndex(){return this._tabIndex()}set tabIndex(e){this._tabIndex.set(e);}_tabIndex;disableRipple=false;get appearance(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance}set appearance(e){this._appearance=e;}_appearance;get checked(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked}set checked(e){e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck());}get disabled(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled}set disabled(e){this._disabled=e;}_disabled=false;get disabledInteractive(){return this._disabledInteractive||this.buttonToggleGroup!==null&&this.buttonToggleGroup.disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e;}_disabledInteractive;change=new Fe$2;constructor(){D(ce).load(Ys);let e=D(Oe,{optional:true}),n=D(new bp("tabindex"),{optional:true})||"",a=D(Ne,{optional:true});this._tabIndex=To(parseInt(n)||0),this.buttonToggleGroup=e,this._appearance=a&&a.appearance?a.appearance:"standard",this._disabledInteractive=a?.disabledInteractive??false;}ngOnInit(){let e=this.buttonToggleGroup;this.id=this.id||this._idGenerator.getId("mat-button-toggle-"),e&&(e._isPrechecked(this)?this.checked=true:e._isSelected(this)!==this._checked&&e._syncButtonToggle(this,this._checked));}ngAfterViewInit(){this._animationDisabled||this._elementRef.nativeElement.classList.add("mat-button-toggle-animations-enabled"),this._focusMonitor.monitor(this._elementRef,true);}ngOnDestroy(){let e=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),e&&e._isSelected(this)&&e._syncButtonToggle(this,false,false,true);}focus(e){this._buttonElement.nativeElement.focus(e);}_onButtonClick(){if(this.disabled)return;let e=this.isSingleSelector()?true:!this._checked;if(e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,true),this.buttonToggleGroup._onTouched())),this.isSingleSelector()){let n=this.buttonToggleGroup._buttonToggles.find(a=>a.tabIndex===0);n&&(n.tabIndex=-1),this.tabIndex=0;}this.change.emit(new X(this,this.value));}_markForCheck(){this._changeDetectorRef.markForCheck();}_getButtonName(){return this.isSingleSelector()?this.buttonToggleGroup.name:this.name||null}isSingleSelector(){return this.buttonToggleGroup&&!this.buttonToggleGroup.multiple}static \u0275fac=function(n){return new(n||r)};static \u0275cmp=IE({type:r,selectors:[["mat-button-toggle"]],viewQuery:function(n,a){if(n&1&&ip(Ee,5),n&2){let m;pI(m=hI())&&(a._buttonElement=m.first);}},hostAttrs:["role","presentation",1,"mat-button-toggle"],hostVars:14,hostBindings:function(n,a){n&1&&rp("focus",function(){return a.focus()}),n&2&&(Qf("aria-label",null)("aria-labelledby",null)("id",a.id)("name",null),dp("mat-button-toggle-standalone",!a.buttonToggleGroup)("mat-button-toggle-checked",a.checked)("mat-button-toggle-disabled",a.disabled)("mat-button-toggle-disabled-interactive",a.disabledInteractive)("mat-button-toggle-appearance-standard",a.appearance==="standard"));},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],id:"id",name:"name",value:"value",tabIndex:"tabIndex",disableRipple:[2,"disableRipple","disableRipple",aL],appearance:"appearance",checked:[2,"checked","checked",aL],disabled:[2,"disabled","disabled",aL],disabledInteractive:[2,"disabledInteractive","disabledInteractive",aL]},outputs:{change:"change"},exportAs:["matButtonToggle"],ngContentSelectors:Ae,decls:7,vars:13,consts:[["button",""],["type","button",1,"mat-button-toggle-button","mat-focus-indicator",3,"click","id","disabled"],[1,"mat-button-toggle-checkbox-wrapper"],[1,"mat-button-toggle-label-content"],[1,"mat-button-toggle-focus-overlay"],["matRipple","",1,"mat-button-toggle-ripple",3,"matRippleTrigger","matRippleDisabled"],["state","checked","aria-hidden","true","appearance","minimal",3,"disabled"]],template:function(n,a){if(n&1&&(uI(),Xo(0,"button",1,0),rp("click",function(){return a._onButtonClick()}),qE(2,Re,2,1,"div",2),Xo(3,"span",3),dI(4),fc()(),Yf(5,"span",4)(6,"span",5)),n&2){let m=mI(1);Zf("id",a.buttonId)("disabled",a.disabled&&!a.disabledInteractive||null),Qf("role",a.isSingleSelector()?"radio":"button")("tabindex",a.disabled&&!a.disabledInteractive?-1:a.tabIndex)("aria-pressed",a.isSingleSelector()?null:a.checked)("aria-checked",a.isSingleSelector()?a.checked:null)("name",a._getButtonName())("aria-label",a.ariaLabel)("aria-labelledby",a.ariaLabelledby)("aria-disabled",a.disabled&&a.disabledInteractive?"true":null),my(2),GE(a.buttonToggleGroup&&(!a.buttonToggleGroup.multiple&&!a.buttonToggleGroup.hideSingleSelectionIndicator||a.buttonToggleGroup.multiple&&!a.buttonToggleGroup.hideMultipleSelectionIndicator)?2:-1),my(4),Zf("matRippleTrigger",m)("matRippleDisabled",a.disableRipple||a.disabled);}},dependencies:[Rf,Me],styles:[`.mat-button-toggle-standalone,
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
`],encapsulation:2})}return r})(),we=(()=>{class r{static \u0275fac=function(n){return new(n||r)};static \u0275mod=wE({type:r});static \u0275inj=ml({imports:[Yf$1,Ge,ws]})}return r})();var De=(()=>{class r{static \u0275fac=function(n){return new(n||r)};static \u0275mod=wE({type:r});static \u0275inj=ml({imports:[ws]})}return r})();var I=class r{language=eL.required();accent=eL.required();sentenceIndex=eL.required();dataService=D(pa);logger=D(Ae$1);isPlaying=To(false);audio=new Audio;playbackSpeed="100";constructor(){uu(()=>{this.sentenceIndex();this.audioResource(),this.stopAudio();});}ngOnDestroy(){this.audio.pause(),this.stopAudio();}config=nD(()=>{let t=this.language(),e=this.accent();return this.dataService.getCourseConfig(t,e)()});sentenceId=nD(()=>{let t=this.config();return !t.value||t.isLoading||t.error?null:t.value.chorus.sentences[parseInt(this.sentenceIndex(),10)-1]});audioResource=nD(()=>{let t=this.sentenceId();return t?this.dataService.getAudio(t)():{value:null,isLoading:true,error:null}});handleAudioEnded=()=>{this.logger.debug("audio-player.ts handleAudioEnded"),this.isPlaying.set(false),this.incrementCounter(),this.playAudio();};playAudio(){this.logger.debug("audio-player.ts playAudio");let t=this.audioResource();if(t.isLoading||!t.value){this.logger.debug("Audio is not ready to play yet.");return}this.isPlaying()||(this.audio=new Audio(t.value),this.audio.currentTime=0,this.audio.onended=this.handleAudioEnded,this.audio.playbackRate=parseInt(this.playbackSpeed,10)/100,this.audio.play().then(()=>{this.isPlaying.set(true);}).catch(e=>{this.logger.error("Failed to play audio:",e),this.isPlaying.set(false);}));}pauseAudio(){this.logger.debug("audio-player.ts pauseAudio"),this.audio.pause(),this.isPlaying.set(false);}stopAudio(){this.logger.debug("audio-player.ts stopAudio"),this.audio.pause(),this.audio.currentTime=0,this.isPlaying.set(false);}incrementCounter(){let t=this.sentenceId();t&&this.dataService.incrementSentenceCount(t);}onSpaceBar(){this.isPlaying()?this.pauseAudio():this.playAudio();}static \u0275fac=function(e){return new(e||r)};static \u0275cmp=IE({type:r,selectors:[["app-audio-player"]],hostBindings:function(e,n){e&1&&rp("keydown.space",function(){return n.onSpaceBar()},Xm);},inputs:{language:[1,"language"],accent:[1,"accent"],sentenceIndex:[1,"sentenceIndex"]},decls:0,vars:0,template:function(e,n){},dependencies:[Fe$1,we,vn,De],encapsulation:2})};var Ve=()=>[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],Fe=()=>[24,48,32,16,56,40,24,48,32,16,56,40,24,48,32,16,56,40,24,48];function ze(r,t){r&1&&(Xo(0,"div",13),Yf(1,"div",29)(2,"div",30),fc());}function Xe(r,t){if(r&1&&(Xo(0,"div",36)(1,"p",37)(2,"span",38),jI(3,"pronunciation: "),fc(),jI(4),fc()()),r&2){let e=cI(2);my(4),yc(" ",e.sentencePinyin()," ");}}function je(r,t){if(r&1){let e=tI();Xo(0,"p",31),jI(1),fc(),Xo(2,"div",32)(3,"p",33),jI(4),fc(),Xo(5,"button",34),rp("click",function(){Bl(e);let a=cI();return $l(a.onIpa())}),Yf(6,"ng-icon",35),jI(7," IPA "),fc()(),qE(8,Xe,5,1,"div",36);}if(r&2){let e=cI();my(),yc(" ",e.sentenceText()," "),my(3),yc(" ",e.sentenceIpa()," "),my(4),GE(e.hasPinyin()?8:-1);}}function He(r,t){if(r&1&&Yf(0,"div",39),r&2){let e=t.$index,n=cI();up("height",n.isPlaying()?GI(6,Fe)[e]:12,"px")("animation-delay",e*40,"ms"),dp("animating",n.isPlaying());}}function Ue(r,t){r&1&&(Xo(0,"span",22),jI(1," ... "),fc());}function qe(r,t){if(r&1&&(Xo(0,"span",23),jI(1),ZI(2,"number"),fc()),r&2){let e=cI();my(),yc(" ",KI(2,1,e.allTimeReps())," ");}}function Qe(r,t){if(r&1){let e=tI();Xo(0,"button",28),rp("click",function(){Bl(e);let a=cI();return $l(a.previousSentence())}),jI(1," \u2190 Prev phrase "),fc();}}var Be=class r{dataService=D(pa);router=D(Je);language=eL.required();accent=eL.required();sentenceIndex=eL.required();languagesState=this.dataService.getLanguageList();languageObj=nD(()=>{let t=this.languagesState().value;if(!t)return null;let e=this.language()?.toLowerCase();return t.find(n=>n.name.toLowerCase()===e)||null});accentObj=nD(()=>{let t=this.languageObj();if(!t)return null;let e=this.accent()?.toLowerCase();return t.accents.find(n=>n.name.toLowerCase()===e)||null});audioPlayer=tL(I);isPlaying=nD(()=>this.audioPlayer()?.isPlaying()??false);sessionCount=To(0);cumulativeReps=To(0);trackedSentenceId=-1;constructor(){let e=this.router.getCurrentNavigation()?.extras.state;this.cumulativeReps.set(e?.cumulativeReps??0),uu(()=>{let n=this.sentenceCount().value,a=this.sentenceCount().isLoading,m=this.sentenceId();a||n===null||n===void 0||!m||(this.trackedSentenceId!==m?(this.sessionCount.set(0),this.trackedSentenceId=m):this.sessionCount.update(Pe=>Pe+1));});}config=nD(()=>{let t=this.language(),e=this.accent();return this.dataService.getCourseConfig(t,e)()});sentenceId=nD(()=>{let t=this.config();return !t.value||t.isLoading||t.error?null:t.value.chorus.sentences[parseInt(this.sentenceIndex(),10)-1]});numSentences=nD(()=>{let t=this.config().value;return t!=null?t.chorus.sentences.length:0});sentence=nD(()=>{let t=this.sentenceId();return t?this.dataService.getSentence(t)():{value:null,isLoading:true,error:null}});sentenceText=nD(()=>this.sentence().value?.text??"");sentenceIpa=nD(()=>this.sentence().value?.ipa??"");sentencePinyin=nD(()=>this.sentence().value?.pinyin??"");hasPinyin=nD(()=>!!this.sentencePinyin());allTimeRepsState=this.dataService.getTotalSentenceCount();allTimeReps=nD(()=>this.allTimeRepsState().value??0);previousSentence(){this.audioPlayer()?.stopAudio(),Number(this.sentenceIndex())>1&&this.router.navigate(q.getChorusDashboardRoute(this.language(),this.accent(),Number(this.sentenceIndex())-1),{state:{cumulativeReps:this.cumulativeReps()}});}nextSentence(){this.audioPlayer()?.stopAudio();let t=this.cumulativeReps()+this.sessionCount();Number(this.sentenceIndex())<this.numSentences()&&this.router.navigate(q.getChorusDashboardRoute(this.language(),this.accent(),Number(this.sentenceIndex())+1),{state:{cumulativeReps:t}});}disablePreviousButton(){return Number(this.sentenceIndex())===1}disableNextButton(){return Number(this.sentenceIndex())===this.numSentences()}sentenceCount=nD(()=>{let t=this.sentenceId();return t?this.dataService.getSentenceCount(t)():{value:null,isLoading:false,error:null}});handlePlay(){let t=this.audioPlayer();t&&(t.isPlaying()?t.stopAudio():t.playAudio());}handleNext(){this.audioPlayer()?.stopAudio();let t=this.cumulativeReps()+this.sessionCount();Number(this.sentenceIndex())<this.numSentences()?this.router.navigate(q.getChorusDashboardRoute(this.language(),this.accent(),Number(this.sentenceIndex())+1),{state:{cumulativeReps:t}}):this.router.navigate(q.getSummaryRoute(this.language(),this.accent()),{state:{mode:"chorusing",reps:t,total:this.numSentences(),accent:this.accentObj()?.nativeName||this.accent()}});}onIpa(){this.audioPlayer()?.stopAudio(),this.router.navigate(q.getIpaRoute());}onBack(){this.audioPlayer()?.stopAudio(),this.router.navigate(q.getModeSelectionRoute(this.language(),this.accent()));}Number=Number;static \u0275fac=function(e){return new(e||r)};static \u0275cmp=IE({type:r,selectors:[["app-chorus-dashboard"]],viewQuery:function(e,n){e&1&&ap(n.audioPlayer,I,5),e&2&&gI();},hostBindings:function(e,n){e&1&&rp("keydown.arrowleft",function(){return n.previousSentence()},Jm)("keydown.arrowright",function(){return n.nextSentence()},Jm);},inputs:{language:[1,"language"],accent:[1,"accent"],sentenceIndex:[1,"sentenceIndex"]},features:[qI([ct({lucideChevronLeft:zt,lucideBookOpen:Vt})])],decls:42,vars:21,consts:[[1,"flex","flex-col","flex-1","h-full","bg-background","select-none"],[1,"hidden",3,"language","accent","sentenceIndex"],[1,"flex","items-center","gap-3","px-5","py-4","shrink-0"],["aria-label","Back",1,"flex","items-center","justify-center","p-1","rounded-full","hover:bg-secondary","cursor-pointer",3,"click"],["hlm","","name","lucideChevronLeft","size","20px",1,"text-foreground"],[1,"text-sm","font-medium","text-muted-foreground",2,"font-family","'Inter', sans-serif"],[1,"px-5","pb-4","shrink-0"],[1,"flex","items-center","justify-between","mb-2"],[1,"text-muted-foreground","text-xs",2,"font-family","'Inter', sans-serif"],[1,"h-[2px]","bg-secondary","rounded-full","overflow-hidden"],[1,"h-full","bg-primary","rounded-full","transition-all","duration-500"],[1,"flex-1","flex","flex-col","px-5","pb-8","gap-5","overflow-y-auto"],[1,"bg-card","border","border-border","rounded","p-5","space-y-3"],[1,"animate-pulse","space-y-3"],[1,"bg-card","border","border-border","rounded","p-5","flex","flex-col","justify-center","items-center","h-28"],[1,"flex","items-center","justify-center","gap-1.5","h-16","w-full"],[1,"waveform-bar","w-1.5","bg-primary/40","rounded-full","transition-all",3,"animating","height","animation-delay"],[1,"bg-card","border","border-border","rounded","py-5","px-5","flex","items-center","justify-between"],[1,"flex","flex-col","items-center","flex-1"],[1,"flex","items-center","justify-center","min-w-[40px]","h-10","px-3","rounded-full","border","border-brand/20","text-brand","bg-brand/10","font-bold","text-lg"],[1,"text-muted-foreground","text-xs","mt-1",2,"font-family","'Inter', sans-serif"],[1,"w-px","h-16","bg-border","mx-4","shrink-0"],[1,"text-4xl","font-bold","leading-none","animate-pulse","text-muted-foreground",2,"font-family","'Plus Jakarta Sans', sans-serif"],[1,"text-4xl","font-bold","leading-none","text-muted-foreground",2,"font-family","'Plus Jakarta Sans', sans-serif"],[1,"text-muted-foreground","text-xs","tracking-widest","uppercase","mt-1",2,"font-family","'Inter', sans-serif"],[1,"w-full","py-4","rounded","font-semibold","text-base","cursor-pointer","flex","items-center","justify-center","gap-2","text-white",2,"font-family","'Plus Jakarta Sans', sans-serif",3,"click"],[1,"flex","gap-3"],[1,"flex-1","py-4","rounded","font-semibold","text-sm","border","border-border","text-muted-foreground","hover:text-foreground","hover:border-foreground/20","cursor-pointer",2,"font-family","'Inter', sans-serif"],[1,"flex-1","py-4","rounded","font-semibold","text-sm","border","border-border","text-muted-foreground","hover:text-foreground","hover:border-foreground/20","cursor-pointer",2,"font-family","'Inter', sans-serif",3,"click"],[1,"h-6","bg-muted","rounded","w-3/4"],[1,"h-4","bg-muted","rounded","w-1/2"],[1,"text-foreground","text-xl","font-semibold","leading-snug",2,"font-family","'Plus Jakarta Sans', sans-serif"],[1,"flex","items-center","justify-between","gap-3"],[1,"text-muted-foreground","text-sm","flex-1","font-mono",2,"font-family","'Inter', sans-serif"],[1,"flex","items-center","gap-1","px-2.5","py-1","rounded","border","border-brand/20","text-brand","bg-brand/5","text-xs","shrink-0","hover:border-brand/40","cursor-pointer",2,"font-family","'Inter', sans-serif",3,"click"],["hlm","","name","lucideBookOpen","size","11px"],[1,"border-t","border-border","pt-3"],[1,"text-xs","text-muted-foreground",2,"font-family","'Inter', sans-serif"],[1,"text-primary",2,"font-family","'Inter', sans-serif"],[1,"waveform-bar","w-1.5","bg-primary/40","rounded-full","transition-all"]],template:function(e,n){e&1&&(Xo(0,"div",0),Yf(1,"app-audio-player",1),Xo(2,"header",2)(3,"button",3),rp("click",function(){return n.onBack()}),Yf(4,"ng-icon",4),fc(),Xo(5,"span",5),jI(6),ZI(7,"titlecase"),fc()(),Xo(8,"div",6)(9,"div",7)(10,"span",8),jI(11),fc(),Xo(12,"span",8),jI(13," phrase "),fc()(),Xo(14,"div",9),Yf(15,"div",10),fc()(),Xo(16,"div",11)(17,"div",12),qE(18,ze,3,0,"div",13)(19,je,9,3),fc(),Xo(20,"div",14)(21,"div",15),QE(22,He,1,7,"div",16,zE),fc()(),Xo(24,"div",17)(25,"div",18)(26,"div",19),jI(27),fc(),Xo(28,"div",20),jI(29," this session "),fc()(),Yf(30,"div",21),Xo(31,"div",18),qE(32,Ue,2,0,"span",22)(33,qe,3,3,"span",23),Xo(34,"div",24),jI(35," all time "),fc()()(),Xo(36,"button",25),rp("click",function(){return n.handlePlay()}),jI(37),fc(),Xo(38,"div",26),qE(39,Qe,2,0,"button",27),Xo(40,"button",28),rp("click",function(){return n.handleNext()}),jI(41),fc()()()()),e&2&&(my(),Zf("language",n.language())("accent",n.accent())("sentenceIndex",n.sentenceIndex()),my(5),yc(" Chorusing \xB7 ",KI(7,18,n.accentObj()?.nativeName)," "),my(5),vp(" ",n.sentenceIndex()," / ",n.numSentences()," "),my(4),up("width",n.Number(n.sentenceIndex())/n.numSentences()*100,"%"),my(3),GE(n.sentence().isLoading?18:19),my(4),ZE(GI(20,Ve)),my(5),yc(" ",n.sessionCount()," "),my(5),GE(n.allTimeRepsState().isLoading?32:33),my(4),dp("bg-brand-hover",n.isPlaying())("bg-brand",!n.isPlaying()),my(),yc(" ",n.isPlaying()?"\u{1F50A} Listening \u2014 speak along!":"\u25B6 Play & Chorus"," "),my(2),GE(n.Number(n.sentenceIndex())>1?39:-1),my(2),yc(" ",n.Number(n.sentenceIndex())<n.numSentences()?"Next phrase \u2192":"Finish session \u2192"," "));},dependencies:[I,wt,k,z,us,ss],styles:["@keyframes _ngcontent-%COMP%_bounce-wave{0%,to{transform:scaleY(.25);background-color:#4badc866}50%{transform:scaleY(1);background-color:#4badc8d9}}.waveform-bar[_ngcontent-%COMP%]{transform-origin:center;will-change:transform,background-color}.waveform-bar.animating[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_bounce-wave .8s ease-in-out infinite}"]})};export{Be as ChorusDashboard};
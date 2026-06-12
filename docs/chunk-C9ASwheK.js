import {I as In,m as mn,g as gr,c as hr,p as pr,M as Mn,a as kn$1,C as Cn,D as Dn}from'./chunk-CFiHuDsc.js';import {E,R as Rn,aw as CP,x as xe,a2 as Us,ax as BI,S as it,y as yE,ay as Xs,m as ms,a as sh,az as re,q as M,O as NP,v as ar,aA as ua,U as Ut,a0 as rt,aB as Oe,al as wt,aC as Tu,aD as _p,aE as ZE,ar as xP,F as ZE$1,J as Jo,b as np,B as BE,H as YE,o as oc,K as Kf,au as tI,Y as Yf,Z as Zf,d as cy,$ as $E,u as lp,I as op,L as JE,X as XE,ag as EE,ah as ll,aF as Iu,aj as kn,f as fm,aG as LS,k as kT,T as TT,C as CI,h as hp,j as ac,aH as Wm,z as zE,aI as WE,aJ as Ll,aK as Fl,aL as qm}from'./main-FSYXUP7V.js';var C=class{capacity;ttlSeconds;cache;DEFAULT_MAX_CACHE_SIZE=1e3;constructor(t=this.DEFAULT_MAX_CACHE_SIZE,e=1/0){this.capacity=t,this.ttlSeconds=e,this.cache=new Map;}get(t){if(!this.cache.has(t))return null;let e=this.cache.get(t);return e.expiry<Date.now()?(this.cache.delete(t),null):(this.cache.delete(t),this.cache.set(t,e),e.value)}put(t,e){this.cache.has(t)&&this.cache.delete(t);let n=this.ttlSeconds===1/0?1/0:Date.now()+this.ttlSeconds*1e3;if(this.cache.set(t,{value:e,expiry:n}),this.cache.size>this.capacity){let r=this.cache.keys().next().value;this.cache.delete(r);}}has(t){return this.cache.has(t)?this.cache.get(t).expiry<Date.now()?(this.cache.delete(t),false):true:false}delete(t){this.cache.delete(t);}};var x=class a{supabase=E(Xs).getSupabaseClient();logger=E(ms);auth=E(sh);presignedUrlCacheSize=1e3;presignedUrlTtlSeconds=3600;presignedUrlCache=new C(this.presignedUrlCacheSize,this.presignedUrlTtlSeconds);sentencesCache=new C;sentenceCountCache=new C;sentenceCountUpdateTrigger=xe(0);courseConfigCache=new C;async getCourseConfig(t,e){let n=`${t.toLowerCase()}/${e.toLowerCase()}`;if(this.logger.debug("data.service.ts getCourseConfig | key:",n),this.courseConfigCache.has(n))return this.logger.debug("data.service.ts getCourseConfig | cache: hit"),this.courseConfigCache.get(n);let r=this.fetchCourse(t,e);return this.courseConfigCache.put(n,r),r}async fetchCourse(t,e){let{data:n,error:r}=await this.supabase.from("course").select("config, language!inner(language), accent!inner(accent)").eq("language.language",t.toLowerCase()).eq("accent.accent",e.toLowerCase()).single();if(r)throw this.logger.error("data.service.ts fetchCourse | error:",r),r;return n.config}getSentence(t){if(!t)return Promise.reject([]);let e=String(t);this.logger.debug("data.service.ts getSentences | key:",e);let n=this.sentencesCache.get(e);if(n)return this.logger.debug("data.service.ts getSentences | cache:","hit"),n;let r=this.fetchSentence(t);return this.sentencesCache.put(e,r),r.catch(()=>this.sentencesCache.delete(e)),r}async fetchSentence(t){this.logger.debug("data.service.ts fetchSentence | sentenceId:",t);let{data:e,error:n}=await this.supabase.from("sentence").select("text, ipa, pinyin").eq("id",t).single();if(n)throw this.logger.error("data.service.ts fetchSentence | error:",n),n;return {text:e.text,ipa:e.ipa,pinyin:e.pinyin}}getPresignedUrl(t){if(!t)return Promise.reject("");let e=String(t);this.logger.debug("data.service.ts getPresignedUrl | key:",e);let n=this.presignedUrlCache.get(e);if(n)return this.logger.debug("data.service.ts getPresignedUrl | cache:","hit"),n;let r=this.fetchAudio(t);return this.presignedUrlCache.put(e,r),r.catch(()=>this.presignedUrlCache.delete(e)),r}async fetchAudio(t){this.logger.debug("data.service.ts fetchAudio | sentenceId:",t);let{data:e,error:n}=await this.supabase.storage.from("audio").createSignedUrl(`${t}.wav`,this.presignedUrlTtlSeconds+100);if(n)throw this.logger.error("data.service.ts fetchAudio | error:",n),n;return e.signedUrl}async getSentenceCount(t){let e=String(t);this.logger.debug("data.service.ts getSentenceCount | key:",e);let n=this.sentenceCountCache.get(e);if(n)return this.logger.debug("data.service.ts getSentenceCount | cache:","hit"),n;let{data:r,error:d}=await this.supabase.from("sentence_listen_count").select("count").eq("sentence_id",t).eq("user_id",this.auth.userId()).maybeSingle();if(d)throw this.logger.error("data.service.ts getSentenceCount | error:",d,r),d;let Y=Promise.resolve(r?.count??0);return this.sentenceCountCache.put(e,Y),Y}async incrementSentenceCount(t){let e=String(t);this.logger.debug("data.service.ts incrementSentenceCount | key:",e);let n=await this.getSentenceCount(t)??0;this.sentenceCountCache.put(e,Promise.resolve(n+1)),this.sentenceCountUpdateTrigger.update(d=>d+1);let{error:r}=await this.supabase.rpc("increment_sentence_count",{p_sentence_id:t});r&&(this.logger.error("data.service.ts incrementSentenceCount | error:",r),this.sentenceCountCache.put(e,Promise.resolve(n)),this.sentenceCountUpdateTrigger.update(d=>d+1));}static \u0275fac=function(e){return new(e||a)};static \u0275prov=re({token:a,factory:a.\u0275fac,providedIn:"root"})};var De=["button"],Pe=["*"];function Ae(a,t){if(a&1&&(Jo(0,"div",2),Kf(1,"mat-pseudo-checkbox",6),oc()),a&2){let e=zE();cy(),Yf("disabled",e.disabled);}}var Be=new M("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS",{providedIn:"root",factory:()=>({hideSingleSelectionIndicator:false,hideMultipleSelectionIndicator:false,disabledInteractive:false})}),Re=new M("MatButtonToggleGroup");var J=class{source;value;constructor(t,e){this.source=t,this.value=e;}};var Ne=(()=>{class a{_changeDetectorRef=E(NP);_elementRef=E(ar);_focusMonitor=E(ua);_idGenerator=E(Ut);_animationDisabled=rt();_checked=false;ariaLabel;ariaLabelledby=null;_buttonElement;buttonToggleGroup;get buttonId(){return `${this.id}-button`}id;name;value;get tabIndex(){return this._tabIndex()}set tabIndex(e){this._tabIndex.set(e);}_tabIndex;disableRipple=false;get appearance(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance}set appearance(e){this._appearance=e;}_appearance;get checked(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked}set checked(e){e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck());}get disabled(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled}set disabled(e){this._disabled=e;}_disabled=false;get disabledInteractive(){return this._disabledInteractive||this.buttonToggleGroup!==null&&this.buttonToggleGroup.disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e;}_disabledInteractive;change=new Oe;constructor(){E(wt).load(Tu);let e=E(Re,{optional:true}),n=E(new _p("tabindex"),{optional:true})||"",r=E(Be,{optional:true});this._tabIndex=xe(parseInt(n)||0),this.buttonToggleGroup=e,this._appearance=r&&r.appearance?r.appearance:"standard",this._disabledInteractive=r?.disabledInteractive??false;}ngOnInit(){let e=this.buttonToggleGroup;this.id=this.id||this._idGenerator.getId("mat-button-toggle-"),e&&(e._isPrechecked(this)?this.checked=true:e._isSelected(this)!==this._checked&&e._syncButtonToggle(this,this._checked));}ngAfterViewInit(){this._animationDisabled||this._elementRef.nativeElement.classList.add("mat-button-toggle-animations-enabled"),this._focusMonitor.monitor(this._elementRef,true);}ngOnDestroy(){let e=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),e&&e._isSelected(this)&&e._syncButtonToggle(this,false,false,true);}focus(e){this._buttonElement.nativeElement.focus(e);}_onButtonClick(){if(this.disabled)return;let e=this.isSingleSelector()?true:!this._checked;if(e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,true),this.buttonToggleGroup._onTouched())),this.isSingleSelector()){let n=this.buttonToggleGroup._buttonToggles.find(r=>r.tabIndex===0);n&&(n.tabIndex=-1),this.tabIndex=0;}this.change.emit(new J(this,this.value));}_markForCheck(){this._changeDetectorRef.markForCheck();}_getButtonName(){return this.isSingleSelector()?this.buttonToggleGroup.name:this.name||null}isSingleSelector(){return this.buttonToggleGroup&&!this.buttonToggleGroup.multiple}static \u0275fac=function(n){return new(n||a)};static \u0275cmp=yE({type:a,selectors:[["mat-button-toggle"]],viewQuery:function(n,r){if(n&1&&op(De,5),n&2){let d;JE(d=XE())&&(r._buttonElement=d.first);}},hostAttrs:["role","presentation",1,"mat-button-toggle"],hostVars:14,hostBindings:function(n,r){n&1&&np("focus",function(){return r.focus()}),n&2&&(Zf("aria-label",null)("aria-labelledby",null)("id",r.id)("name",null),lp("mat-button-toggle-standalone",!r.buttonToggleGroup)("mat-button-toggle-checked",r.checked)("mat-button-toggle-disabled",r.disabled)("mat-button-toggle-disabled-interactive",r.disabledInteractive)("mat-button-toggle-appearance-standard",r.appearance==="standard"));},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],id:"id",name:"name",value:"value",tabIndex:"tabIndex",disableRipple:[2,"disableRipple","disableRipple",xP],appearance:"appearance",checked:[2,"checked","checked",xP],disabled:[2,"disabled","disabled",xP],disabledInteractive:[2,"disabledInteractive","disabledInteractive",xP]},outputs:{change:"change"},exportAs:["matButtonToggle"],ngContentSelectors:Pe,decls:7,vars:13,consts:[["button",""],["type","button",1,"mat-button-toggle-button","mat-focus-indicator",3,"click","id","disabled"],[1,"mat-button-toggle-checkbox-wrapper"],[1,"mat-button-toggle-label-content"],[1,"mat-button-toggle-focus-overlay"],["matRipple","",1,"mat-button-toggle-ripple",3,"matRippleTrigger","matRippleDisabled"],["state","checked","aria-hidden","true","appearance","minimal",3,"disabled"]],template:function(n,r){if(n&1&&(ZE$1(),Jo(0,"button",1,0),np("click",function(){return r._onButtonClick()}),BE(2,Ae,2,1,"div",2),Jo(3,"span",3),YE(4),oc()(),Kf(5,"span",4)(6,"span",5)),n&2){let d=tI(1);Yf("id",r.buttonId)("disabled",r.disabled&&!r.disabledInteractive||null),Zf("role",r.isSingleSelector()?"radio":"button")("tabindex",r.disabled&&!r.disabledInteractive?-1:r.tabIndex)("aria-pressed",r.isSingleSelector()?null:r.checked)("aria-checked",r.isSingleSelector()?r.checked:null)("name",r._getButtonName())("aria-label",r.ariaLabel)("aria-labelledby",r.ariaLabelledby)("aria-disabled",r.disabled&&r.disabledInteractive?"true":null),cy(2),$E(r.buttonToggleGroup&&(!r.buttonToggleGroup.multiple&&!r.buttonToggleGroup.hideSingleSelectionIndicator||r.buttonToggleGroup.multiple&&!r.buttonToggleGroup.hideMultipleSelectionIndicator)?2:-1),cy(4),Yf("matRippleTrigger",d)("matRippleDisabled",r.disableRipple||r.disabled);}},dependencies:[ZE,In],styles:[`.mat-button-toggle-standalone,
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
`],encapsulation:2})}return a})(),F=(()=>{class a{static \u0275fac=function(n){return new(n||a)};static \u0275mod=EE({type:a});static \u0275inj=ll({imports:[Iu,Ne,kn]})}return a})();var we=(()=>{class a{static \u0275fac=function(n){return new(n||a)};static \u0275mod=EE({type:a});static \u0275inj=ll({imports:[kn]})}return a})();function ze(a,t){if(a&1){let e=WE();Jo(0,"button",2),np("click",function(){Ll(e);let r=zE();return Fl(r.playAudio())}),Jo(1,"mat-icon"),CI(2,"play_arrow"),oc(),CI(3," Play "),oc();}if(a&2){let e=zE();Yf("disabled",!e.auth.isLoggedIn());}}function Le(a,t){if(a&1){let e=WE();Jo(0,"button",3),np("click",function(){Ll(e);let r=zE();return Fl(r.stopAudio())}),Jo(1,"mat-icon"),CI(2,"stop"),oc(),CI(3," Stop "),oc();}if(a&2){let e=zE();Yf("disabled",!e.auth.isLoggedIn());}}var z=class a{language=CP.required();accent=CP.required();sentenceIndex=CP.required();auth=E(sh);dataService=E(x);logger=E(ms);isPlaying=xe(false);audio=new Audio;playbackSpeed="100";constructor(){Us(()=>{this.sentenceIndex();this.stopAudio();});}configResource=BI({params:()=>({language:this.language(),accent:this.accent()}),loader:async({params:t})=>{if(!(!t.language||!t.accent))return await this.dataService.getCourseConfig(t.language,t.accent)}});sentenceId=it(()=>{let t=this.configResource.value();if(t)return t.chorus.sentences[parseInt(this.sentenceIndex(),10)-1]});audioResource=BI({params:()=>({id:this.sentenceId()}),loader:async({params:t})=>{if(!t.id)return;this.logger.debug("audio-player.ts audioResource | params:",t);let e=await this.dataService.getPresignedUrl(t.id);return new Audio(e)}});handleAudioEnded=()=>{this.logger.debug("audio-player.ts handleAudioEnded"),this.isPlaying.set(false),this.incrementCounter(),this.playAudio();};playAudio(){this.logger.debug("audio-player.ts playAudio"),this.isPlaying()||(this.audio=this.audioResource.value()||new Audio(""),this.audio.ended&&(this.audio.currentTime=0),this.audio.onended=this.handleAudioEnded,this.audio.playbackRate=parseInt(this.playbackSpeed,10)/100,this.audio.play(),this.isPlaying.set(true));}pauseAudio(){this.logger.debug("audio-player.ts pauseAudio"),this.audio.pause(),this.isPlaying.set(false);}stopAudio(){this.logger.debug("audio-player.ts stopAudio"),this.audio.pause(),this.audio.currentTime=0,this.isPlaying.set(false);}incrementCounter(){let t=this.sentenceId();t&&this.dataService.incrementSentenceCount(t);}onSpaceBar(){this.isPlaying()?this.pauseAudio():this.playAudio();}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=yE({type:a,selectors:[["app-audio-player"]],hostBindings:function(e,n){e&1&&np("keydown.space",function(){return n.onSpaceBar()},qm);},inputs:{language:[1,"language"],accent:[1,"accent"],sentenceIndex:[1,"sentenceIndex"]},decls:2,vars:1,consts:[["matFab","","extended","",1,"audio-icon",3,"disabled"],["matFab","","extended","",3,"disabled"],["matFab","","extended","",1,"audio-icon",3,"click","disabled"],["matFab","","extended","",3,"click","disabled"]],template:function(e,n){e&1&&BE(0,ze,4,1,"button",0)(1,Le,4,1,"button",1),e&2&&$E(n.isPlaying()?1:0);},dependencies:[fm,LS,kT,TT,F,mn,we],encapsulation:2})};function Ue(a,t){if(a&1&&(Jo(0,"mat-list-item",3),CI(1),oc()),a&2){let e=zE();cy(),hp(e.pinyin());}}var L=class a{dataService=E(x);logger=E(ms);language=CP.required();accent=CP.required();sentenceIndex=CP.required();configResource=BI({params:()=>({language:this.language(),accent:this.accent()}),loader:async({params:t})=>{if(!(!t.language||!t.accent))return await this.dataService.getCourseConfig(t.language,t.accent)}});sentenceId=it(()=>{let t=this.configResource.value();if(t)return t.chorus.sentences[parseInt(this.sentenceIndex(),10)-1]});sentenceResource=BI({params:()=>({id:this.sentenceId()}),loader:async({params:t})=>{if(t.id)return await this.dataService.getSentence(t.id)}});text=it(()=>this.sentenceResource.value()?.text);ipa=it(()=>this.sentenceResource.value()?.ipa);pinyin=it(()=>this.sentenceResource.value()?.pinyin);hasPinyin=it(()=>this.pinyin!==null&&this.pinyin!==void 0);static \u0275fac=function(e){return new(e||a)};static \u0275cmp=yE({type:a,selectors:[["app-sentence-text"]],inputs:{language:[1,"language"],accent:[1,"accent"],sentenceIndex:[1,"sentenceIndex"]},decls:6,vars:3,consts:[[1,"mat-list"],["role","listitem",1,"main-text"],["role","listitem",1,"ipa-text"],["role","listitem",1,"other-text"]],template:function(e,n){e&1&&(Jo(0,"mat-list",0)(1,"mat-list-item",1),CI(2),oc(),Jo(3,"mat-list-item",2),CI(4),oc(),BE(5,Ue,2,1,"mat-list-item",3),oc()),e&2&&(cy(2),hp(n.text()),cy(2),hp(n.ipa()),cy(),$E(n.hasPinyin()?5:-1));},dependencies:[gr,hr,pr],styles:[".main-text[_ngcontent-%COMP%]{font-size:1.5rem}.ipa-text[_ngcontent-%COMP%]{font-size:1.2rem}.mat-list[_ngcontent-%COMP%]{width:100}"]})};var Te=(()=>{class a{static \u0275fac=function(n){return new(n||a)};static \u0275mod=EE({type:a});static \u0275inj=ll({imports:[kn]})}return a})();function Xe(a,t){a&1&&(Jo(0,"p"),CI(1,"ChorusCount: -"),oc());}function je(a,t){if(a&1&&(Jo(0,"p"),CI(1),oc()),a&2){let e=zE();cy(),ac("ChorusCount: ",e.sentenceCountResource.value());}}function He(a,t){a&1&&(Jo(0,"p"),CI(1,"ChorusCount: ?"),oc());}var Ee=class a{dataService=E(x);router=E(Rn);language=CP.required();accent=CP.required();sentenceIndex=CP.required();sessionCount=xe(0);trackedSentenceId=-1;constructor(){Us(()=>{let t=this.sentenceCountResource.value(),e=this.sentenceCountResource.isLoading(),n=this.sentenceId();e||t===null||t===void 0||!n||(this.trackedSentenceId!==n?(this.sessionCount.set(0),this.trackedSentenceId=n):this.sessionCount.update(r=>r+1));});}configResource=BI({params:()=>({language:this.language(),accent:this.accent()}),loader:async({params:t})=>{if(!(!t.language||!t.accent))return await this.dataService.getCourseConfig(t.language,t.accent)}});sentenceId=it(()=>{let t=this.configResource.value();if(t)return t.chorus.sentences[parseInt(this.sentenceIndex(),10)-1]});numSentences=it(()=>{let t=this.configResource.value();return t?t.chorus.sentences.length:0});previousSentence(){Number(this.sentenceIndex())>1&&(this.router.navigate([this.language(),this.accent(),Number(this.sentenceIndex())-1]),this.router.navigate([this.language(),this.accent(),Number(this.sentenceIndex())-1]));}nextSentence(){Number(this.sentenceIndex())<this.numSentences()&&this.router.navigate([this.language(),this.accent(),Number(this.sentenceIndex())+1]);}disablePreviousButton(){return Number(this.sentenceIndex())===1}disableNextButton(){return Number(this.sentenceIndex())===this.numSentences()}sentenceCountResource=BI({params:()=>({id:this.sentenceId(),_refresh:this.dataService.sentenceCountUpdateTrigger()}),loader:async({params:t})=>t.id?await this.dataService.getSentenceCount(t.id):null});resetSessionCount(){this.sessionCount.set(0);}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=yE({type:a,selectors:[["app-chorus-dashboard"]],hostBindings:function(e,n){e&1&&np("keydown.arrowleft",function(){return n.previousSentence()},Wm)("keydown.arrowright",function(){return n.nextSentence()},Wm);},inputs:{language:[1,"language"],accent:[1,"accent"],sentenceIndex:[1,"sentenceIndex"]},decls:25,vars:10,consts:[[1,"card-container"],[3,"language","accent","sentenceIndex"],[1,"chorus-count-row"],[1,"chorus-count-col"],["matFab","","extended","",3,"click"],["matFab","","extended","",3,"click","disabled"]],template:function(e,n){e&1&&(Jo(0,"div",0)(1,"mat-card")(2,"mat-card-header"),Kf(3,"app-sentence-text",1),oc(),Jo(4,"mat-card-content")(5,"div",2)(6,"div",3),BE(7,Xe,2,0,"p")(8,je,2,1,"p")(9,He,2,0,"p"),Jo(10,"p"),CI(11),oc()(),Jo(12,"button",4),np("click",function(){return n.resetSessionCount()}),CI(13," Refresh "),Jo(14,"mat-icon"),CI(15,"refresh"),oc()()(),Kf(16,"app-audio-player",1),Jo(17,"button",5),np("click",function(){return n.previousSentence()}),Jo(18,"mat-icon"),CI(19,"skip_previous"),oc(),CI(20," Prev Sentence "),oc(),Jo(21,"button",5),np("click",function(){return n.nextSentence()}),CI(22," Next Sentence "),Jo(23,"mat-icon"),CI(24,"skip_next"),oc()()()()()),e&2&&(cy(3),Yf("language",n.language())("accent",n.accent())("sentenceIndex",n.sentenceIndex()),cy(4),$E(n.sentenceCountResource.isLoading()?7:n.sentenceCountResource.hasValue()?8:n.sentenceCountResource.error()?9:-1),cy(4),ac("SessionCount: ",n.sessionCount()),cy(5),Yf("language",n.language())("accent",n.accent())("sentenceIndex",n.sentenceIndex()),cy(),Yf("disabled",n.disablePreviousButton()),cy(4),Yf("disabled",n.disableNextButton()));},dependencies:[fm,LS,kT,TT,F,z,L,Mn,kn$1,Cn,Dn,Te],styles:[".card-container[_ngcontent-%COMP%]{max-width:100%;display:flex;justify-content:center;align-items:center}.chorus-count-col[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center}.chorus-count-row[_ngcontent-%COMP%]{display:flex;flex-direction:row}"]})};export{Ee as ChorusDashboard};
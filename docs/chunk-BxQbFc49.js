import {I as In,m as mn,g as gr,c as hr,p as pr,M as Mn,a as kn$1,C as Cn,D as Dn}from'./chunk-C5gk7mw9.js';import {E,R as Rn,aw as qO,M as Me,a2 as xs,ax as rI,j as jv,ay as Xs,m as ms,s as sh,az as ee$1,g as N,O as ZO,v as nr,aA as ua,h as Ut,a0 as rt,aB as Ae$1,al as wt,aC as Tu,aD as Jf,aE as ZE,ar as KO,A as fE,U as Uo,a as Nf,o as oE,F as pE,W as Wa,b as Tf,au as vE,w as wf,p as Df,P as Pm,i as iE,r as Pf,I as xf,J as gE,L as mE,ag as Hv,ah as Zc,aF as Iu,aj as kn,f as fm,aG as LS,k as kT,T as TT,V as ot,B as BE,H as Hf,z as za,aH as ym,u as uE,aI as aE,aJ as wl,aK as Tl,aL as vm}from'./main-TYNO3BMR.js';var C=class{capacity;ttlSeconds;cache;DEFAULT_MAX_CACHE_SIZE=1e3;constructor(t=this.DEFAULT_MAX_CACHE_SIZE,e=1/0){this.capacity=t,this.ttlSeconds=e,this.cache=new Map;}get(t){if(!this.cache.has(t))return null;let e=this.cache.get(t);return e.expiry<Date.now()?(this.cache.delete(t),null):(this.cache.delete(t),this.cache.set(t,e),e.value)}put(t,e){this.cache.has(t)&&this.cache.delete(t);let r=this.ttlSeconds===1/0?1/0:Date.now()+this.ttlSeconds*1e3;if(this.cache.set(t,{value:e,expiry:r}),this.cache.size>this.capacity){let n=this.cache.keys().next().value;this.cache.delete(n);}}has(t){return this.cache.has(t)?this.cache.get(t).expiry<Date.now()?(this.cache.delete(t),false):true:false}delete(t){this.cache.delete(t);}};var y=class a{supabase=E(Xs).getSupabaseClient();logger=E(ms);auth=E(sh);bucketName="repeat-with-me-audio";presignedUrlCacheSize=1e3;presignedUrlTtlSeconds=3600;presignedUrlCache=new C(this.presignedUrlCacheSize,this.presignedUrlTtlSeconds);sentencesCache=new C;sentenceCountCache=new C;sentenceCountUpdateTrigger=Me(0);courseConfigCache=new C;async getCourseConfig(t,e){let r=`${t.toLowerCase()}/${e.toLowerCase()}`;if(this.logger.debug("data.service.ts getCourseConfig | key:",r),this.courseConfigCache.has(r))return this.logger.debug("data.service.ts getCourseConfig | cache: hit"),this.courseConfigCache.get(r);let n=this.fetchCourse(t,e);return this.courseConfigCache.put(r,n),n}async fetchCourse(t,e){let{data:r,error:n}=await this.supabase.from("course").select("config, language!inner(language), accent!inner(accent)").eq("language.language",t).eq("accent.accent",e).single();if(n)throw this.logger.error("data.service.ts fetchCourse | error:",n),n;return r.config}getSentences(t,e){if(!t||!e)return Promise.reject([]);let r=`${t.toLowerCase()}/${e.toLowerCase()}`;this.logger.debug("data.service.ts getSentences | key:",r);let n=this.sentencesCache.get(r);if(n)return this.logger.debug("data.service.ts getSentences | cache:","hit"),n;let s=this.fetchSentences(t,e);return this.sentencesCache.put(r,s),s.catch(()=>this.sentencesCache.delete(r)),s}async fetchSentences(t,e){this.logger.debug("data.service.ts fetchSentences | language, accent:",t,e);let{data:r,error:n}=await this.supabase.from("sentence").select("text, ipa, pinyin, sentence_id, language!inner(language), accent!inner(accent)").eq("language.language",t).eq("accent.accent",e);if(n)throw this.logger.error("data.service.ts fetchSentences | error:",n),n;return r.map(s=>({text:s.text,ipa:s.ipa,pinyin:s.pinyin,sentenceId:s.sentence_id}))}getPresignedUrl(t,e,r){if(!t||!e||!r)return Promise.reject("");let n=`${t.toLowerCase()}/${e.toLowerCase()}/sentence_${r}.wav`;this.logger.debug("data.service.ts getPresignedUrl | key:",n);let s=this.presignedUrlCache.get(n);if(s)return this.logger.debug("data.service.ts getPresignedUrl | cache:","hit"),s;let b=this.fetchAudio(n);return this.presignedUrlCache.put(n,b),b.catch(()=>this.presignedUrlCache.delete(n)),b}async fetchAudio(t){this.logger.debug("data.service.ts fetchAudio | key:",t);let{data:e,error:r}=await this.supabase.storage.from(this.bucketName).createSignedUrl(t,this.presignedUrlTtlSeconds+100);if(r)throw this.logger.error("data.service.ts fetchAudio | error:",r),r;return e.signedUrl}async getSentenceCount(t,e,r){let n=`${t.toLowerCase()}/${e.toLowerCase()}/${r}`;this.logger.debug("data.service.ts getSentenceCount | key:",n);let s=this.sentenceCountCache.get(n);if(s)return this.logger.debug("data.service.ts getSentenceCount | cache:","hit"),s;let{data:b,error:x}=await this.supabase.from("chorus_counts").select("count, language!inner(language), accent!inner(accent)").eq("language.language",t.toLowerCase()).eq("accent.accent",e.toLowerCase()).eq("sentence_id",r).eq("user_id",this.auth.userId()).maybeSingle();if(x)throw this.logger.error("data.service.ts getSentenceCount | error:",x,b),x;let te=Promise.resolve(b?.count??0);return this.sentenceCountCache.put(n,te),te}async incrementSentenceCount(t,e,r){let n=`${t.toLowerCase()}/${e.toLowerCase()}/${r}`;this.logger.debug("data.service.ts incrementSentenceCount | key:",n);let s=await this.getSentenceCount(t,e,r)??0;this.sentenceCountCache.put(n,Promise.resolve(s+1)),this.sentenceCountUpdateTrigger.update(x=>x+1);let{error:b}=await this.supabase.rpc("increment_rep",{p_user_id:this.auth.userId(),p_language:t,p_accent:e,p_sentence:parseInt(String(r),10)});b&&(this.logger.error("data.service.ts incrementSentenceCount | error:",b),this.sentenceCountCache.put(n,Promise.resolve(s)),this.sentenceCountUpdateTrigger.update(x=>x+1));}static \u0275fac=function(e){return new(e||a)};static \u0275prov=ee$1({token:a,factory:a.\u0275fac,providedIn:"root"})};var De=["button"],Be=["*"];function Re(a,t){if(a&1&&(Uo(0,"div",2),Tf(1,"mat-pseudo-checkbox",6),Wa()),a&2){let e=uE();Pm(),wf("disabled",e.disabled);}}var Ne=new N("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS",{providedIn:"root",factory:()=>({hideSingleSelectionIndicator:false,hideMultipleSelectionIndicator:false,disabledInteractive:false})}),Oe=new N("MatButtonToggleGroup");var ee=class{source;value;constructor(t,e){this.source=t,this.value=e;}};var Ve=(()=>{class a{_changeDetectorRef=E(ZO);_elementRef=E(nr);_focusMonitor=E(ua);_idGenerator=E(Ut);_animationDisabled=rt();_checked=false;ariaLabel;ariaLabelledby=null;_buttonElement;buttonToggleGroup;get buttonId(){return `${this.id}-button`}id;name;value;get tabIndex(){return this._tabIndex()}set tabIndex(e){this._tabIndex.set(e);}_tabIndex;disableRipple=false;get appearance(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance}set appearance(e){this._appearance=e;}_appearance;get checked(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked}set checked(e){e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck());}get disabled(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled}set disabled(e){this._disabled=e;}_disabled=false;get disabledInteractive(){return this._disabledInteractive||this.buttonToggleGroup!==null&&this.buttonToggleGroup.disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e;}_disabledInteractive;change=new Ae$1;constructor(){E(wt).load(Tu);let e=E(Oe,{optional:true}),r=E(new Jf("tabindex"),{optional:true})||"",n=E(Ne,{optional:true});this._tabIndex=Me(parseInt(r)||0),this.buttonToggleGroup=e,this._appearance=n&&n.appearance?n.appearance:"standard",this._disabledInteractive=n?.disabledInteractive??false;}ngOnInit(){let e=this.buttonToggleGroup;this.id=this.id||this._idGenerator.getId("mat-button-toggle-"),e&&(e._isPrechecked(this)?this.checked=true:e._isSelected(this)!==this._checked&&e._syncButtonToggle(this,this._checked));}ngAfterViewInit(){this._animationDisabled||this._elementRef.nativeElement.classList.add("mat-button-toggle-animations-enabled"),this._focusMonitor.monitor(this._elementRef,true);}ngOnDestroy(){let e=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),e&&e._isSelected(this)&&e._syncButtonToggle(this,false,false,true);}focus(e){this._buttonElement.nativeElement.focus(e);}_onButtonClick(){if(this.disabled)return;let e=this.isSingleSelector()?true:!this._checked;if(e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,true),this.buttonToggleGroup._onTouched())),this.isSingleSelector()){let r=this.buttonToggleGroup._buttonToggles.find(n=>n.tabIndex===0);r&&(r.tabIndex=-1),this.tabIndex=0;}this.change.emit(new ee(this,this.value));}_markForCheck(){this._changeDetectorRef.markForCheck();}_getButtonName(){return this.isSingleSelector()?this.buttonToggleGroup.name:this.name||null}isSingleSelector(){return this.buttonToggleGroup&&!this.buttonToggleGroup.multiple}static \u0275fac=function(r){return new(r||a)};static \u0275cmp=jv({type:a,selectors:[["mat-button-toggle"]],viewQuery:function(r,n){if(r&1&&xf(De,5),r&2){let s;gE(s=mE())&&(n._buttonElement=s.first);}},hostAttrs:["role","presentation",1,"mat-button-toggle"],hostVars:14,hostBindings:function(r,n){r&1&&Nf("focus",function(){return n.focus()}),r&2&&(Df("aria-label",null)("aria-labelledby",null)("id",n.id)("name",null),Pf("mat-button-toggle-standalone",!n.buttonToggleGroup)("mat-button-toggle-checked",n.checked)("mat-button-toggle-disabled",n.disabled)("mat-button-toggle-disabled-interactive",n.disabledInteractive)("mat-button-toggle-appearance-standard",n.appearance==="standard"));},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],id:"id",name:"name",value:"value",tabIndex:"tabIndex",disableRipple:[2,"disableRipple","disableRipple",KO],appearance:"appearance",checked:[2,"checked","checked",KO],disabled:[2,"disabled","disabled",KO],disabledInteractive:[2,"disabledInteractive","disabledInteractive",KO]},outputs:{change:"change"},exportAs:["matButtonToggle"],ngContentSelectors:Be,decls:7,vars:13,consts:[["button",""],["type","button",1,"mat-button-toggle-button","mat-focus-indicator",3,"click","id","disabled"],[1,"mat-button-toggle-checkbox-wrapper"],[1,"mat-button-toggle-label-content"],[1,"mat-button-toggle-focus-overlay"],["matRipple","",1,"mat-button-toggle-ripple",3,"matRippleTrigger","matRippleDisabled"],["state","checked","aria-hidden","true","appearance","minimal",3,"disabled"]],template:function(r,n){if(r&1&&(fE(),Uo(0,"button",1,0),Nf("click",function(){return n._onButtonClick()}),oE(2,Re,2,1,"div",2),Uo(3,"span",3),pE(4),Wa()(),Tf(5,"span",4)(6,"span",5)),r&2){let s=vE(1);wf("id",n.buttonId)("disabled",n.disabled&&!n.disabledInteractive||null),Df("role",n.isSingleSelector()?"radio":"button")("tabindex",n.disabled&&!n.disabledInteractive?-1:n.tabIndex)("aria-pressed",n.isSingleSelector()?null:n.checked)("aria-checked",n.isSingleSelector()?n.checked:null)("name",n._getButtonName())("aria-label",n.ariaLabel)("aria-labelledby",n.ariaLabelledby)("aria-disabled",n.disabled&&n.disabledInteractive?"true":null),Pm(2),iE(n.buttonToggleGroup&&(!n.buttonToggleGroup.multiple&&!n.buttonToggleGroup.hideSingleSelectionIndicator||n.buttonToggleGroup.multiple&&!n.buttonToggleGroup.hideMultipleSelectionIndicator)?2:-1),Pm(4),wf("matRippleTrigger",s)("matRippleDisabled",n.disableRipple||n.disabled);}},dependencies:[ZE,In],styles:[`.mat-button-toggle-standalone,
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
`],encapsulation:2})}return a})(),z=(()=>{class a{static \u0275fac=function(r){return new(r||a)};static \u0275mod=Hv({type:a});static \u0275inj=Zc({imports:[Iu,Ve,kn]})}return a})();var Ie=(()=>{class a{static \u0275fac=function(r){return new(r||a)};static \u0275mod=Hv({type:a});static \u0275inj=Zc({imports:[kn]})}return a})();function Ue(a,t){if(a&1){let e=aE();Uo(0,"button",2),Nf("click",function(){wl(e);let n=uE();return Tl(n.playAudio())}),Uo(1,"mat-icon"),BE(2,"play_arrow"),Wa(),BE(3," Play "),Wa();}if(a&2){let e=uE();wf("disabled",!e.auth.isLoggedIn());}}function Xe(a,t){if(a&1){let e=aE();Uo(0,"button",3),Nf("click",function(){wl(e);let n=uE();return Tl(n.stopAudio())}),Uo(1,"mat-icon"),BE(2,"stop"),Wa(),BE(3," Stop "),Wa();}if(a&2){let e=uE();wf("disabled",!e.auth.isLoggedIn());}}var U=class a{language=qO.required();accent=qO.required();sentenceIndex=qO.required();auth=E(sh);dataService=E(y);logger=E(ms);isPlaying=Me(false);audio=new Audio;playbackSpeed="100";constructor(){xs(()=>{this.sentenceIndex();this.stopAudio();});}audioResource=rI({params:()=>({lang:this.language(),acc:this.accent(),id:this.sentenceIndex()}),loader:async({params:t})=>{if(!t.lang||!t.acc||!t.id)return;this.logger.debug("audio-player.ts audioResource | params:",t);let e=await this.dataService.getPresignedUrl(t.lang,t.acc,t.id);return new Audio(e)}});handleAudioEnded=()=>{this.logger.debug("audio-player.ts handleAudioEnded"),this.isPlaying.set(false),this.incrementCounter(),this.playAudio();};playAudio(){this.logger.debug("audio-player.ts playAudio"),this.isPlaying()||(this.audio=this.audioResource.value()||new Audio(""),this.audio.ended&&(this.audio.currentTime=0),this.audio.onended=this.handleAudioEnded,this.audio.playbackRate=parseInt(this.playbackSpeed,10)/100,this.audio.play(),this.isPlaying.set(true));}pauseAudio(){this.logger.debug("audio-player.ts pauseAudio"),this.audio.pause(),this.isPlaying.set(false);}stopAudio(){this.logger.debug("audio-player.ts stopAudio"),this.audio.pause(),this.audio.currentTime=0,this.isPlaying.set(false);}incrementCounter(){this.dataService.incrementSentenceCount(this.language(),this.accent(),this.sentenceIndex());}onSpaceBar(){this.isPlaying()?this.pauseAudio():this.playAudio();}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=jv({type:a,selectors:[["app-audio-player"]],hostBindings:function(e,r){e&1&&Nf("keydown.space",function(){return r.onSpaceBar()},vm);},inputs:{language:[1,"language"],accent:[1,"accent"],sentenceIndex:[1,"sentenceIndex"]},decls:2,vars:1,consts:[["matFab","","extended","",1,"audio-icon",3,"disabled"],["matFab","","extended","",3,"disabled"],["matFab","","extended","",1,"audio-icon",3,"click","disabled"],["matFab","","extended","",3,"click","disabled"]],template:function(e,r){e&1&&oE(0,Ue,4,1,"button",0)(1,Xe,4,1,"button",1),e&2&&iE(r.isPlaying()?1:0);},dependencies:[fm,LS,kT,TT,z,mn,Ie],encapsulation:2})};function je(a,t){if(a&1&&(Uo(0,"mat-list-item",3),BE(1),Wa()),a&2){let e=uE();Pm(),Hf(e.pinyin());}}var X=class a{dataService=E(y);logger=E(ms);language=qO.required();accent=qO.required();sentenceIndex=qO.required();sentencesResource=rI({params:()=>({lang:this.language(),acc:this.accent()}),loader:async({params:t})=>{if(!(!t.lang||!t.acc))return await this.dataService.getSentences(t.lang,t.acc)}});sentence=ot(()=>this.sentencesResource.hasValue()?this.sentencesResource.value().find(e=>String(e.sentenceId)===this.sentenceIndex()):{});text=ot(()=>this.sentence()?.text);ipa=ot(()=>this.sentence()?.ipa);pinyin=ot(()=>this.sentence()?.pinyin);hasPinyin=ot(()=>this.pinyin!==null);static \u0275fac=function(e){return new(e||a)};static \u0275cmp=jv({type:a,selectors:[["app-sentence-text"]],inputs:{language:[1,"language"],accent:[1,"accent"],sentenceIndex:[1,"sentenceIndex"]},decls:6,vars:3,consts:[[1,"mat-list"],["role","listitem",1,"main-text"],["role","listitem",1,"ipa-text"],["role","listitem",1,"other-text"]],template:function(e,r){e&1&&(Uo(0,"mat-list",0)(1,"mat-list-item",1),BE(2),Wa(),Uo(3,"mat-list-item",2),BE(4),Wa(),oE(5,je,2,1,"mat-list-item",3),Wa()),e&2&&(Pm(2),Hf(r.text()),Pm(2),Hf(r.ipa()),Pm(),iE(r.hasPinyin()?5:-1));},dependencies:[gr,hr,pr],styles:[".main-text[_ngcontent-%COMP%]{font-size:1.5rem}.ipa-text[_ngcontent-%COMP%]{font-size:1.2rem}.mat-list[_ngcontent-%COMP%]{width:100}"]})};var Pe=(()=>{class a{static \u0275fac=function(r){return new(r||a)};static \u0275mod=Hv({type:a});static \u0275inj=Zc({imports:[kn]})}return a})();function He(a,t){a&1&&(Uo(0,"p"),BE(1,"ChorusCount: -"),Wa());}function We(a,t){if(a&1&&(Uo(0,"p"),BE(1),Wa()),a&2){let e=uE();Pm(),za("ChorusCount: ",e.chorusCountResource.value());}}function qe(a,t){a&1&&(Uo(0,"p"),BE(1,"ChorusCount: ?"),Wa());}var Ae=class a{dataService=E(y);router=E(Rn);language=qO.required();accent=qO.required();sentenceIndex=qO.required();maxSentenceId=20;sessionCount=Me(0);initialChange=true;constructor(){xs(()=>{this.sentenceIndex();this.sessionCount.set(0),this.initialChange=true;}),xs(()=>{this.chorusCountResource.value()&&(this.initialChange||this.sessionCount.update(e=>e+1),this.initialChange=false);});}previousSentence(){Number(this.sentenceIndex())>1&&(this.router.navigate([this.language(),this.accent(),Number(this.sentenceIndex())-1]),this.router.navigate([this.language(),this.accent(),Number(this.sentenceIndex())-1]));}nextSentence(){Number(this.sentenceIndex())<this.maxSentenceId&&this.router.navigate([this.language(),this.accent(),Number(this.sentenceIndex())+1]);}disablePreviousButton(){return Number(this.sentenceIndex())===1}disableNextButton(){return Number(this.sentenceIndex())===this.maxSentenceId}chorusCountResource=rI({params:()=>({lang:this.language(),acc:this.accent(),id:this.sentenceIndex(),_refresh:this.dataService.sentenceCountUpdateTrigger()}),loader:async({params:t})=>!t.lang||!t.acc||!t.id?null:await this.dataService.getSentenceCount(t.lang,t.acc,t.id)});resetSessionCount(){this.sessionCount.set(0);}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=jv({type:a,selectors:[["app-chorus-dashboard"]],hostBindings:function(e,r){e&1&&Nf("keydown.arrowleft",function(){return r.previousSentence()},ym)("keydown.arrowright",function(){return r.nextSentence()},ym);},inputs:{language:[1,"language"],accent:[1,"accent"],sentenceIndex:[1,"sentenceIndex"]},decls:25,vars:10,consts:[[1,"card-container"],[3,"language","accent","sentenceIndex"],[1,"chorus-count-row"],[1,"chorus-count-col"],["matFab","","extended","",3,"click"],["matFab","","extended","",3,"click","disabled"]],template:function(e,r){e&1&&(Uo(0,"div",0)(1,"mat-card")(2,"mat-card-header"),Tf(3,"app-sentence-text",1),Wa(),Uo(4,"mat-card-content")(5,"div",2)(6,"div",3),oE(7,He,2,0,"p")(8,We,2,1,"p")(9,qe,2,0,"p"),Uo(10,"p"),BE(11),Wa()(),Uo(12,"button",4),Nf("click",function(){return r.resetSessionCount()}),BE(13," Refresh "),Uo(14,"mat-icon"),BE(15,"refresh"),Wa()()(),Uo(16,"button",5),Nf("click",function(){return r.previousSentence()}),Uo(17,"mat-icon"),BE(18,"skip_previous"),Wa(),BE(19," Prev Sentence "),Wa(),Uo(20,"button",5),Nf("click",function(){return r.nextSentence()}),BE(21," Next Sentence "),Uo(22,"mat-icon"),BE(23,"skip_next"),Wa()(),Tf(24,"app-audio-player",1),Wa()()()),e&2&&(Pm(3),wf("language",r.language())("accent",r.accent())("sentenceIndex",r.sentenceIndex()),Pm(4),iE(r.chorusCountResource.isLoading()?7:r.chorusCountResource.hasValue()?8:r.chorusCountResource.error()?9:-1),Pm(4),za("SessionCount: ",r.sessionCount()),Pm(5),wf("disabled",r.disablePreviousButton()),Pm(4),wf("disabled",r.disableNextButton()),Pm(4),wf("language",r.language())("accent",r.accent())("sentenceIndex",r.sentenceIndex()));},dependencies:[fm,LS,kT,TT,z,U,X,Mn,kn$1,Cn,Dn,Pe],styles:[".card-container[_ngcontent-%COMP%]{max-width:100%;display:flex;justify-content:center;align-items:center}.chorus-count-col[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center}.chorus-count-row[_ngcontent-%COMP%]{display:flex;flex-direction:row}"]})};export{Ae as ChorusDashboard};
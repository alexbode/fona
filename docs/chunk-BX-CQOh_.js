import {$ as $n,b as En,L as Ln,B as Bn,U as Un,H as Hn}from'./chunk-DIYJdCSW.js';import {E,d as dn,ax as UO,ay as eI,P as Pv,az as vs,L as Li,x as xu,_ as _e,aA as ee$1,m as N,M as zO,y as tr,aB as oa,p as la,a0 as In,aC as xe,al as Mr,aD as nd,aE as Jf,aF as VD,ar as ZO,A as lE,U as Uo,N as Nf,t as tE,F as uE,c as Ua,T as Tf,av as gE,w as wf,u as Df,e as Pm,n as nE,v as Pf,I as xf,J as fE,K as pE,ag as Fv,ah as Qc,as as id,aj as Tn,a2 as Ss,D as DC,aG as SC,b as DS,S as SS,V as ot,W as Wa,j as jE,q as qa,H as Hf,aH as ym,f as aE,aI as oE,g as Ga,aJ as Dl,aK as wl,aL as vm}from'./main-JY7GKVLV.js';var I=class{capacity;cache;DEFAULT_MAX_CACHE_SIZE=1e3;constructor(n=this.DEFAULT_MAX_CACHE_SIZE){this.capacity=n,this.cache=new Map;}get(n){if(!this.cache.has(n))return null;let e=this.cache.get(n);return this.cache.delete(n),this.cache.set(n,e),e}put(n,e){if(this.cache.has(n)&&this.cache.delete(n),this.cache.set(n,e),this.cache.size>this.capacity){let r=this.cache.keys().next().value;this.cache.delete(r);}}has(n){return this.cache.has(n)}delete(n){this.cache.delete(n);}};var _=class a{supabase=E(vs).getSupabaseClient();logger=E(Li);auth=E(xu);bucketName="repeat-with-me-audio";presignedUrlCache=new I;sentencesCache=new I;sentenceCountCache=new I;sentenceCountUpdateTrigger=_e(0);getSentences(n,e,r){if(!n||!e||!r)return Promise.reject([]);let t=`${n.toLowerCase()}/${e.toLowerCase()}`;if(this.logger.debug("data.service.ts getSentences | key:",t),this.sentencesCache.has(t))return this.logger.debug("data.service.ts getSentences | cache:","hit"),this.sentencesCache.get(t);let i=this.fetchSentences(n,e);return this.sentencesCache.put(t,i),i.catch(()=>this.sentencesCache.delete(t)),i}async fetchSentences(n,e){this.logger.debug("data.service.ts fetchSentences | language, accent:",n,e);let{data:r,error:t}=await this.supabase.from("sentences").select("text, ipa, pinyin, sentence_id, language!inner(language), accent!inner(accent)").eq("language.language",n).eq("accent.accent",e);if(t)throw this.logger.error("data.service.ts fetchSentences | error:",t),t;return r.map(i=>({text:i.text,ipa:i.ipa,pinyin:i.pinyin,sentenceId:i.sentence_id}))}getPresignedUrl(n,e,r){if(!n||!e||!r)return Promise.reject("");let t=`${n.toLowerCase()}/${e.toLowerCase()}/sentence_${r}.wav`;if(this.logger.debug("data.service.ts getPresignedUrl | key:",t),this.presignedUrlCache.has(t))return this.logger.debug("data.service.ts getPresignedUrl | cache:","hit"),this.presignedUrlCache.get(t);let i=this.fetchAudio(t);return this.presignedUrlCache.put(t,i),i.catch(()=>this.presignedUrlCache.delete(t)),i}async fetchAudio(n){this.logger.debug("data.service.ts fetchAudio | key:",n);let{data:e,error:r}=await this.supabase.storage.from(this.bucketName).createSignedUrl(n,3600);if(r)throw this.logger.error("data.service.ts fetchAudio | error:",r),r;return e.signedUrl}async getSentenceCount(n,e,r){let t=`${n.toLowerCase()}/${e.toLowerCase()}/${r}`;if(this.logger.debug("data.service.ts getSentenceCount | key:",t),this.sentenceCountCache.has(t))return this.logger.debug("data.service.ts getSentenceCount | cache:","hit"),this.sentenceCountCache.get(t);let{data:i,error:y}=await this.supabase.from("chorus_counts").select("count, language!inner(language), accent!inner(accent)").eq("language.language",n.toLowerCase()).eq("accent.accent",e.toLowerCase()).eq("sentence_id",r).eq("user_id",this.auth.userId()).maybeSingle();if(y)throw this.logger.error("data.service.ts getSentenceCount | error:",y,i),y;return this.sentenceCountCache.put(t,Promise.resolve(i?.count??0)),this.sentenceCountCache.get(t)}async incrementSentenceCount(n,e,r){let t=`${n.toLowerCase()}/${e.toLowerCase()}/${r}`;this.logger.debug("data.service.ts incrementSentenceCount | key:",t);let i=await this.getSentenceCount(n,e,r)??0;this.sentenceCountCache.put(t,Promise.resolve(i+1)),this.sentenceCountUpdateTrigger.update(Ee=>Ee+1);let{error:y}=await this.supabase.rpc("increment_rep",{p_user_id:this.auth.currentUser()?.id,p_language:n,p_accent:e,p_sentence:parseInt(String(r),10)});y&&(this.logger.error("data.service.ts incrementSentenceCount | error:",y),this.sentenceCountCache.put(t,Promise.resolve(i)));}static \u0275fac=function(e){return new(e||a)};static \u0275prov=ee$1({token:a,factory:a.\u0275fac,providedIn:"root"})};var Ae=["button"],Be=["*"];function Pe(a,n){if(a&1&&(Uo(0,"div",2),Tf(1,"mat-pseudo-checkbox",6),Ua()),a&2){let e=aE();Pm(),wf("disabled",e.disabled);}}var De=new N("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS",{providedIn:"root",factory:()=>({hideSingleSelectionIndicator:false,hideMultipleSelectionIndicator:false,disabledInteractive:false})}),Re=new N("MatButtonToggleGroup");var ee=class{source;value;constructor(n,e){this.source=n,this.value=e;}};var Ne=(()=>{class a{_changeDetectorRef=E(zO);_elementRef=E(tr);_focusMonitor=E(oa);_idGenerator=E(la);_animationDisabled=In();_checked=false;ariaLabel;ariaLabelledby=null;_buttonElement;buttonToggleGroup;get buttonId(){return `${this.id}-button`}id;name;value;get tabIndex(){return this._tabIndex()}set tabIndex(e){this._tabIndex.set(e);}_tabIndex;disableRipple=false;get appearance(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance}set appearance(e){this._appearance=e;}_appearance;get checked(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked}set checked(e){e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck());}get disabled(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled}set disabled(e){this._disabled=e;}_disabled=false;get disabledInteractive(){return this._disabledInteractive||this.buttonToggleGroup!==null&&this.buttonToggleGroup.disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e;}_disabledInteractive;change=new xe;constructor(){E(Mr).load(nd);let e=E(Re,{optional:true}),r=E(new Jf("tabindex"),{optional:true})||"",t=E(De,{optional:true});this._tabIndex=_e(parseInt(r)||0),this.buttonToggleGroup=e,this._appearance=t&&t.appearance?t.appearance:"standard",this._disabledInteractive=t?.disabledInteractive??false;}ngOnInit(){let e=this.buttonToggleGroup;this.id=this.id||this._idGenerator.getId("mat-button-toggle-"),e&&(e._isPrechecked(this)?this.checked=true:e._isSelected(this)!==this._checked&&e._syncButtonToggle(this,this._checked));}ngAfterViewInit(){this._animationDisabled||this._elementRef.nativeElement.classList.add("mat-button-toggle-animations-enabled"),this._focusMonitor.monitor(this._elementRef,true);}ngOnDestroy(){let e=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),e&&e._isSelected(this)&&e._syncButtonToggle(this,false,false,true);}focus(e){this._buttonElement.nativeElement.focus(e);}_onButtonClick(){if(this.disabled)return;let e=this.isSingleSelector()?true:!this._checked;if(e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,true),this.buttonToggleGroup._onTouched())),this.isSingleSelector()){let r=this.buttonToggleGroup._buttonToggles.find(t=>t.tabIndex===0);r&&(r.tabIndex=-1),this.tabIndex=0;}this.change.emit(new ee(this,this.value));}_markForCheck(){this._changeDetectorRef.markForCheck();}_getButtonName(){return this.isSingleSelector()?this.buttonToggleGroup.name:this.name||null}isSingleSelector(){return this.buttonToggleGroup&&!this.buttonToggleGroup.multiple}static \u0275fac=function(r){return new(r||a)};static \u0275cmp=Pv({type:a,selectors:[["mat-button-toggle"]],viewQuery:function(r,t){if(r&1&&xf(Ae,5),r&2){let i;fE(i=pE())&&(t._buttonElement=i.first);}},hostAttrs:["role","presentation",1,"mat-button-toggle"],hostVars:14,hostBindings:function(r,t){r&1&&Nf("focus",function(){return t.focus()}),r&2&&(Df("aria-label",null)("aria-labelledby",null)("id",t.id)("name",null),Pf("mat-button-toggle-standalone",!t.buttonToggleGroup)("mat-button-toggle-checked",t.checked)("mat-button-toggle-disabled",t.disabled)("mat-button-toggle-disabled-interactive",t.disabledInteractive)("mat-button-toggle-appearance-standard",t.appearance==="standard"));},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],id:"id",name:"name",value:"value",tabIndex:"tabIndex",disableRipple:[2,"disableRipple","disableRipple",ZO],appearance:"appearance",checked:[2,"checked","checked",ZO],disabled:[2,"disabled","disabled",ZO],disabledInteractive:[2,"disabledInteractive","disabledInteractive",ZO]},outputs:{change:"change"},exportAs:["matButtonToggle"],ngContentSelectors:Be,decls:7,vars:13,consts:[["button",""],["type","button",1,"mat-button-toggle-button","mat-focus-indicator",3,"click","id","disabled"],[1,"mat-button-toggle-checkbox-wrapper"],[1,"mat-button-toggle-label-content"],[1,"mat-button-toggle-focus-overlay"],["matRipple","",1,"mat-button-toggle-ripple",3,"matRippleTrigger","matRippleDisabled"],["state","checked","aria-hidden","true","appearance","minimal",3,"disabled"]],template:function(r,t){if(r&1&&(lE(),Uo(0,"button",1,0),Nf("click",function(){return t._onButtonClick()}),tE(2,Pe,2,1,"div",2),Uo(3,"span",3),uE(4),Ua()(),Tf(5,"span",4)(6,"span",5)),r&2){let i=gE(1);wf("id",t.buttonId)("disabled",t.disabled&&!t.disabledInteractive||null),Df("role",t.isSingleSelector()?"radio":"button")("tabindex",t.disabled&&!t.disabledInteractive?-1:t.tabIndex)("aria-pressed",t.isSingleSelector()?null:t.checked)("aria-checked",t.isSingleSelector()?t.checked:null)("name",t._getButtonName())("aria-label",t.ariaLabel)("aria-labelledby",t.ariaLabelledby)("aria-disabled",t.disabled&&t.disabledInteractive?"true":null),Pm(2),nE(t.buttonToggleGroup&&(!t.buttonToggleGroup.multiple&&!t.buttonToggleGroup.hideSingleSelectionIndicator||t.buttonToggleGroup.multiple&&!t.buttonToggleGroup.hideMultipleSelectionIndicator)?2:-1),Pm(4),wf("matRippleTrigger",i)("matRippleDisabled",t.disableRipple||t.disabled);}},dependencies:[VD,$n],styles:[`.mat-button-toggle-standalone,
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
`],encapsulation:2})}return a})(),z=(()=>{class a{static \u0275fac=function(r){return new(r||a)};static \u0275mod=Fv({type:a});static \u0275inj=Qc({imports:[id,Ne,Tn]})}return a})();var we=(()=>{class a{static \u0275fac=function(r){return new(r||a)};static \u0275mod=Fv({type:a});static \u0275inj=Qc({imports:[Tn]})}return a})();function Le(a,n){if(a&1){let e=oE();Uo(0,"button",2),Nf("click",function(){Dl(e);let t=aE();return wl(t.playAudio())}),Uo(1,"mat-icon"),jE(2,"play_arrow"),Ua(),jE(3," Play "),Ua();}if(a&2){let e=aE();wf("disabled",!e.auth.isLoggedIn());}}function ze(a,n){if(a&1){let e=oE();Uo(0,"button",3),Nf("click",function(){Dl(e);let t=aE();return wl(t.stopAudio())}),Uo(1,"mat-icon"),jE(2,"stop"),Ua(),jE(3," Stop "),Ua();}if(a&2){let e=aE();wf("disabled",!e.auth.isLoggedIn());}}var U=class a{language=UO.required();accent=UO.required();sentenceId=UO.required();auth=E(xu);dataService=E(_);logger=E(Li);isPlaying=_e(false);audio=new Audio;playbackSpeed="100";constructor(){Ss(()=>{this.sentenceId();this.stopAudio();});}audioResource=eI({params:()=>({lang:this.language(),acc:this.accent(),id:this.sentenceId()}),loader:async({params:n})=>{if(!n.lang||!n.acc||!n.id)return;let e=await this.dataService.getPresignedUrl(n.lang,n.acc,n.id);return new Audio(e)}});handleAudioEnded=()=>{this.logger.debug("audio-player.ts handleAudioEnded"),this.isPlaying.set(false),this.incrementCounter(),this.playAudio();};playAudio(){this.logger.debug("audio-player.ts playAudio"),this.isPlaying()||(this.audio=this.audioResource.value()||new Audio(""),this.audio.onended=this.handleAudioEnded,this.audio.load(),this.audio.playbackRate=parseInt(this.playbackSpeed,10)/100,this.audio.play(),this.isPlaying.set(true));}pauseAudio(){this.logger.debug("audio-player.ts pauseAudio"),this.audio.pause(),this.isPlaying.set(false);}stopAudio(){this.logger.debug("audio-player.ts stopAudio"),this.audio.pause(),this.audio.currentTime=0,this.isPlaying.set(false);}incrementCounter(){this.dataService.incrementSentenceCount(this.language(),this.accent(),this.sentenceId());}onSpaceBar(){this.isPlaying()?this.pauseAudio():this.playAudio();}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=Pv({type:a,selectors:[["app-audio-player"]],hostBindings:function(e,r){e&1&&Nf("keydown.space",function(){return r.onSpaceBar()},vm);},inputs:{language:[1,"language"],accent:[1,"accent"],sentenceId:[1,"sentenceId"]},decls:2,vars:1,consts:[["matFab","","extended","",1,"audio-icon",3,"disabled"],["matFab","","extended","",3,"disabled"],["matFab","","extended","",1,"audio-icon",3,"click","disabled"],["matFab","","extended","",3,"click","disabled"]],template:function(e,r){e&1&&tE(0,Le,4,1,"button",0)(1,ze,4,1,"button",1),e&2&&nE(r.isPlaying()?1:0);},dependencies:[DC,SC,DS,SS,z,En,we],encapsulation:2})};function Ue(a,n){if(a&1&&(Wa(0,"p",2),jE(1),qa()),a&2){let e=aE();Pm(),Ga("pinyin: ",e.pinyin());}}var X=class a{dataService=E(_);logger=E(Li);language=UO.required();accent=UO.required();sentenceId=UO.required();sentencesResource=eI({params:()=>({lang:this.language(),acc:this.accent(),id:this.sentenceId()}),loader:async({params:n})=>{if(!(!n.lang||!n.acc||!n.id))return await this.dataService.getSentences(n.lang,n.acc,n.id)}});sentence=ot(()=>this.sentencesResource.hasValue()?this.sentencesResource.value().find(e=>String(e.sentenceId)===this.sentenceId()):{});text=ot(()=>this.sentence()?.text);ipa=ot(()=>this.sentence()?.ipa);pinyin=ot(()=>this.sentence()?.pinyin);hasPinyin=ot(()=>this.pinyin.length>1);static \u0275fac=function(e){return new(e||a)};static \u0275cmp=Pv({type:a,selectors:[["app-sentence-text"]],inputs:{language:[1,"language"],accent:[1,"accent"],sentenceId:[1,"sentenceId"]},decls:5,vars:3,consts:[[1,"main-text"],[1,"ipa-text"],[1,"other-text"]],template:function(e,r){e&1&&(Wa(0,"p",0),jE(1),qa(),Wa(2,"p",1),jE(3),qa(),tE(4,Ue,2,1,"p",2)),e&2&&(Pm(),Hf(r.text()),Pm(2),Hf(r.ipa()),Pm(),nE(r.hasPinyin()?4:-1));},styles:[".main-text[_ngcontent-%COMP%]{font-size:1.5rem}.ipa-text[_ngcontent-%COMP%]{font-size:1.2rem}"]})};var Te=(()=>{class a{static \u0275fac=function(r){return new(r||a)};static \u0275mod=Fv({type:a});static \u0275inj=Qc({imports:[Tn]})}return a})();function Xe(a,n){a&1&&(Uo(0,"p"),jE(1,"ChorusCount: -"),Ua());}function He(a,n){if(a&1&&(Uo(0,"p"),jE(1),Ua()),a&2){let e=aE();Pm(),Ga("ChorusCount: ",e.chorusCountResource.value());}}function We(a,n){a&1&&(Uo(0,"p"),jE(1,"ChorusCount: ?"),Ua());}var Ie=class a{dataService=E(_);router=E(dn);language=UO.required();accent=UO.required();sentenceId=UO.required();maxSentenceId=20;previousSentence(){Number(this.sentenceId())>1&&(this.router.navigate([this.language(),this.accent(),Number(this.sentenceId())-1]),this.router.navigate([this.language(),this.accent(),Number(this.sentenceId())-1]));}nextSentence(){Number(this.sentenceId())<this.maxSentenceId&&this.router.navigate([this.language(),this.accent(),Number(this.sentenceId())+1]);}disablePreviousButton(){return Number(this.sentenceId())===1}disableNextButton(){return Number(this.sentenceId())===this.maxSentenceId}chorusCountResource=eI({params:()=>({lang:this.language(),acc:this.accent(),id:this.sentenceId(),_refresh:this.dataService.sentenceCountUpdateTrigger()}),loader:async({params:n})=>!n.lang||!n.acc||!n.id?null:await this.dataService.getSentenceCount(n.lang,n.acc,n.id)});static \u0275fac=function(e){return new(e||a)};static \u0275cmp=Pv({type:a,selectors:[["app-chorus-dashboard"]],hostBindings:function(e,r){e&1&&Nf("keydown.arrowleft",function(){return r.previousSentence()},ym)("keydown.arrowright",function(){return r.nextSentence()},ym);},inputs:{language:[1,"language"],accent:[1,"accent"],sentenceId:[1,"sentenceId"]},decls:17,vars:11,consts:[[1,"card-container"],[3,"language","accent","sentenceId"],["matFab","","extended","",3,"click","disabled"]],template:function(e,r){e&1&&(Uo(0,"div",0)(1,"mat-card")(2,"mat-card-header"),Tf(3,"app-sentence-text",1),Ua(),Uo(4,"mat-card-content"),tE(5,Xe,2,0,"p"),tE(6,He,2,1,"p"),tE(7,We,2,0,"p"),Uo(8,"button",2),Nf("click",function(){return r.previousSentence()}),Uo(9,"mat-icon"),jE(10,"skip_previous"),Ua(),jE(11," Prev Sentence "),Ua(),Tf(12,"app-audio-player",1),Uo(13,"button",2),Nf("click",function(){return r.nextSentence()}),jE(14," Next Sentence "),Uo(15,"mat-icon"),jE(16,"skip_next"),Ua()()()()()),e&2&&(Pm(3),wf("language",r.language())("accent",r.accent())("sentenceId",r.sentenceId()),Pm(2),nE(r.chorusCountResource.isLoading()?5:-1),Pm(),nE(r.chorusCountResource.hasValue()?6:-1),Pm(),nE(r.chorusCountResource.error()?7:-1),Pm(),wf("disabled",r.disablePreviousButton()),Pm(4),wf("language",r.language())("accent",r.accent())("sentenceId",r.sentenceId()),Pm(),wf("disabled",r.disableNextButton()));},dependencies:[DC,SC,DS,SS,z,U,X,Ln,Bn,Un,Hn,Te],styles:[".card-container[_ngcontent-%COMP%]{max-width:100%;display:flex;justify-content:center;align-items:center}"]})};export{Ie as ChorusDashboard};
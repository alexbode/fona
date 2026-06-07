import {a as xe,C as Ce,b as ni,N as Nn,x as xn,J as Jt,X as Xn$1,W as Wn}from'./chunk-DoPV5hGp.js';import {E,u as un,ax as yO,P as it$1,R as Rv,ay as fs,x as xi,I as Iu,_ as _e,az as ee,N,aA as Br,F as DO,a1 as Jm,s as sa,aB as Ae,aC as tD,l as jv,ar as wO,U as UE,C as Cf,m as yf,n as Rf,af as _f,z as lE,A as uE,p as Xn,aD as na,a0 as An,al as xr,aE as Qu,aF as Xf,aG as UD,r as sE,j as jo,X as Xv,w as aE,V as Va,c as Ef,av as fE,v as vf,d as Om,e as eE,M as Mf,ag as Pv,ah as Uc,as as td,aj as Tn,D as De,q as Vy,aH as sg,aI as CO,H as Ha,t as If,B as Ba,aJ as kf,aK as wE,a2 as bs,aL as KE,b as bT,aM as vT,a as _S,y as yS,aN as Bf,O as OE,W as Wy,aO as Hf,G as Gy,$ as $a,aP as mm,i as oE,aQ as nE,aR as ml,aS as yl,aT as jE,aU as ym}from'./main-PBIAUHOY.js';var C=class a{supabase=E(fs).getSupabaseClient();logger=E(xi);auth=E(Iu);bucketName="repeat-with-me-audio";presignedUrlCache=new Map;sentencesCache=new Map;sentenceCountCache=new Map;getSentences(r,e,n){if(!r||!e||!n)return Promise.reject([]);let t=`${r.toLowerCase()}/${e.toLowerCase()}`;if(this.logger.debug("data.service.ts getSentences | key:",t),this.sentencesCache.has(t))return this.logger.debug("data.service.ts getSentences | sentencesCache Hit!"),this.sentencesCache.get(t);let o=this.fetchSentences(r,e);return this.sentencesCache.set(t,o),o.catch(()=>this.sentencesCache.delete(t)),o}async fetchSentences(r,e){this.logger.debug(`data.service.ts fetchSentences | ${r} ${e}`);let{data:n,error:t}=await this.supabase.from("sentences").select("text, ipa, pinyin, sentence_id, language!inner(language), accent!inner(accent)").eq("language.language",r).eq("accent.accent",e);if(t)throw this.logger.error("data.service.ts sentences | Supabase query failed:",t.message),t;return n.map(o=>({text:o.text,ipa:o.ipa,pinyin:o.pinyin,sentenceId:o.sentence_id}))}getPresignedUrl(r,e,n){if(!r||!e||!n)return Promise.reject("No key provided");let t=`${r.toLowerCase()}/${e.toLowerCase()}/sentence_${n}.wav`;if(this.logger.debug("data.service.ts getPresignedUrl | key:",t),this.presignedUrlCache.has(t))return this.logger.debug("data.service.ts getPresignedUrl | presignedUrlCache Hit!"),this.presignedUrlCache.get(t);let o=this.fetchAudio(t);return this.presignedUrlCache.set(t,o),o.catch(()=>this.presignedUrlCache.delete(t)),o}async fetchAudio(r){this.logger.debug("data.service.ts fetchAudio | key:",r);let{data:e,error:n}=await this.supabase.storage.from(this.bucketName).createSignedUrl(r,3600);if(n)throw this.logger.error("data.service.ts fetchAudio | Error:",n.message),n;return e.signedUrl}getSentenceCount(r,e,n){if(!r||!e||!n)return _e(null);let t=`${r.toLowerCase()}/${e.toLowerCase()}/${n}`;return this.logger.debug("data.service.ts getSentenceCount | key:",t),this.sentenceCountCache.has(t)?(this.logger.debug("data.service.ts getSentenceCount | Cache Hit!"),this.sentenceCountCache.get(t)):(this.sentenceCountCache.set(t,_e(null)),this.fetchSentenceCount(r,e,n).then(o=>{this.sentenceCountCache.get(t).update(d=>d??0+o);}),this.logger.debug("dataservice.ts getSentenceCount  Fetch count | ",this.sentenceCountCache.get(t)),this.sentenceCountCache.get(t))}async fetchSentenceCount(r,e,n){let{data:t,error:o}=await this.supabase.from("chorus_counts").select("count, language!inner(language), accent!inner(accent)").eq("language.language",r.toLowerCase()).eq("accent.accent",e.toLowerCase()).eq("sentence_id",n).eq("user_id",this.auth.userId()).single();return o?(this.logger.error("data.service.ts fetchSentenceCount | Error loading initial chorus counts:",o,t),0):(this.logger.debug("data.service.ts fetchSentenceCount | data.count",t.count),t.count??0)}async incrementSentenceCount(r,e,n){this.logger.debug("data.service.ts incrementSentenceCount"),this.getSentenceCount(r,e,n).update(I=>(I??0)+1);let{data:o,error:d}=await this.supabase.rpc("increment_rep",{p_user_id:this.auth.currentUser()?.id,p_language:r,p_accent:e,p_sentence:parseInt(String(n),10)});d&&this.logger.error("data.service.ts incrmentSentenceCount | Error calling function increment_rep:",d);}static \u0275fac=function(e){return new(e||a)};static \u0275prov=ee({token:a,factory:a.\u0275fac,providedIn:"root"})};var ot=["button"],it=["*"];function st(a,r){if(a&1&&(jo(0,"div",2),Ef(1,"mat-pseudo-checkbox",6),Va()),a&2){let e=oE();Om(),vf("disabled",e.disabled);}}var je=new N("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS",{providedIn:"root",factory:()=>({hideSingleSelectionIndicator:false,hideMultipleSelectionIndicator:false,disabledInteractive:false})}),We=new N("MatButtonToggleGroup"),lt={provide:Ce,useExisting:Br(()=>ie),multi:true},j=class{source;value;constructor(r,e){this.source=r,this.value=e;}},ie=(()=>{class a{_changeDetector=E(DO);_dir=E(Jm,{optional:true});_multiple=false;_disabled=false;_disabledInteractive=false;_selectionModel;_rawValue;_controlValueAccessorChangeFn=()=>{};_onTouched=()=>{};_buttonToggles;appearance;get name(){return this._name}set name(e){this._name=e,this._markButtonsForCheck();}_name=E(sa).getId("mat-button-toggle-group-");vertical=false;get value(){let e=this._selectionModel?this._selectionModel.selected:[];return this.multiple?e.map(n=>n.value):e[0]?e[0].value:void 0}set value(e){this._setSelectionByValue(e),this.valueChange.emit(this.value);}valueChange=new Ae;get selected(){let e=this._selectionModel?this._selectionModel.selected:[];return this.multiple?e:e[0]||null}get multiple(){return this._multiple}set multiple(e){this._multiple=e,this._markButtonsForCheck();}get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._markButtonsForCheck();}get disabledInteractive(){return this._disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e,this._markButtonsForCheck();}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}change=new Ae;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._markButtonsForCheck();}_hideSingleSelectionIndicator;get hideMultipleSelectionIndicator(){return this._hideMultipleSelectionIndicator}set hideMultipleSelectionIndicator(e){this._hideMultipleSelectionIndicator=e,this._markButtonsForCheck();}_hideMultipleSelectionIndicator;constructor(){let e=E(je,{optional:true});this.appearance=e&&e.appearance?e.appearance:"standard",this._hideSingleSelectionIndicator=e?.hideSingleSelectionIndicator??false,this._hideMultipleSelectionIndicator=e?.hideMultipleSelectionIndicator??false;}ngOnInit(){this._selectionModel=new xe(this.multiple,void 0,false);}ngAfterContentInit(){this._selectionModel.select(...this._buttonToggles.filter(e=>e.checked)),this.multiple||this._initializeTabIndex();}writeValue(e){this.value=e,this._changeDetector.markForCheck();}registerOnChange(e){this._controlValueAccessorChangeFn=e;}registerOnTouched(e){this._onTouched=e;}setDisabledState(e){this.disabled=e;}_keydown(e){if(this.multiple||this.disabled||tD(e))return;let t=e.target.id,o=this._buttonToggles.toArray().findIndex(I=>I.buttonId===t),d=null;switch(e.keyCode){case 32:case 13:d=this._buttonToggles.get(o)||null;break;case 38:d=this._getNextButton(o,-1);break;case 37:d=this._getNextButton(o,this.dir==="ltr"?-1:1);break;case 40:d=this._getNextButton(o,1);break;case 39:d=this._getNextButton(o,this.dir==="ltr"?1:-1);break;default:return}d&&(e.preventDefault(),d._onButtonClick(),d.focus());}_emitChangeEvent(e){let n=new j(e,this.value);this._rawValue=n.value,this._controlValueAccessorChangeFn(n.value),this.change.emit(n);}_syncButtonToggle(e,n,t=false,o=false){!this.multiple&&this.selected&&!e.checked&&(this.selected.checked=false),this._selectionModel?n?this._selectionModel.select(e):this._selectionModel.deselect(e):o=true,o?Promise.resolve().then(()=>this._updateModelValue(e,t)):this._updateModelValue(e,t);}_isSelected(e){return this._selectionModel&&this._selectionModel.isSelected(e)}_isPrechecked(e){return typeof this._rawValue>"u"?false:this.multiple&&Array.isArray(this._rawValue)?this._rawValue.some(n=>e.value!=null&&n===e.value):e.value===this._rawValue}_initializeTabIndex(){if(this._buttonToggles.forEach(e=>{e.tabIndex=-1;}),this.selected)this.selected.tabIndex=0;else for(let e=0;e<this._buttonToggles.length;e++){let n=this._buttonToggles.get(e);if(!n.disabled){n.tabIndex=0;break}}}_getNextButton(e,n){let t=this._buttonToggles;for(let o=1;o<=t.length;o++){let d=(e+n*o+t.length)%t.length,I=t.get(d);if(I&&!I.disabled)return I}return null}_setSelectionByValue(e){if(this._rawValue=e,!this._buttonToggles)return;let n=this._buttonToggles.toArray();if(this.multiple&&e?(this._clearSelection(),e.forEach(t=>this._selectValue(t,n))):(this._clearSelection(),this._selectValue(e,n)),!this.multiple&&n.every(t=>t.tabIndex===-1)){for(let t of n)if(!t.disabled){t.tabIndex=0;break}}}_clearSelection(){this._selectionModel.clear(),this._buttonToggles.forEach(e=>{e.checked=false,this.multiple||(e.tabIndex=-1);});}_selectValue(e,n){for(let t of n)if(t.value===e){t.checked=true,this._selectionModel.select(t),this.multiple||(t.tabIndex=0);break}}_updateModelValue(e,n){n&&this._emitChangeEvent(e),this.valueChange.emit(this.value);}_markButtonsForCheck(){this._buttonToggles?.forEach(e=>e._markForCheck());}static \u0275fac=function(n){return new(n||a)};static \u0275dir=jv({type:a,selectors:[["mat-button-toggle-group"]],contentQueries:function(n,t,o){if(n&1&&_f(o,W,5),n&2){let d;lE(d=uE())&&(t._buttonToggles=d);}},hostAttrs:[1,"mat-button-toggle-group"],hostVars:6,hostBindings:function(n,t){n&1&&Cf("keydown",function(d){return t._keydown(d)}),n&2&&(yf("role",t.multiple?"group":"radiogroup")("aria-disabled",t.disabled),Rf("mat-button-toggle-vertical",t.vertical)("mat-button-toggle-group-appearance-standard",t.appearance==="standard"));},inputs:{appearance:"appearance",name:"name",vertical:[2,"vertical","vertical",wO],value:"value",multiple:[2,"multiple","multiple",wO],disabled:[2,"disabled","disabled",wO],disabledInteractive:[2,"disabledInteractive","disabledInteractive",wO],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",wO],hideMultipleSelectionIndicator:[2,"hideMultipleSelectionIndicator","hideMultipleSelectionIndicator",wO]},outputs:{valueChange:"valueChange",change:"change"},exportAs:["matButtonToggleGroup"],features:[UE([lt,{provide:We,useExisting:a}])]})}return a})(),W=(()=>{class a{_changeDetectorRef=E(DO);_elementRef=E(Xn);_focusMonitor=E(na);_idGenerator=E(sa);_animationDisabled=An();_checked=false;ariaLabel;ariaLabelledby=null;_buttonElement;buttonToggleGroup;get buttonId(){return `${this.id}-button`}id;name;value;get tabIndex(){return this._tabIndex()}set tabIndex(e){this._tabIndex.set(e);}_tabIndex;disableRipple=false;get appearance(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance}set appearance(e){this._appearance=e;}_appearance;get checked(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked}set checked(e){e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck());}get disabled(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled}set disabled(e){this._disabled=e;}_disabled=false;get disabledInteractive(){return this._disabledInteractive||this.buttonToggleGroup!==null&&this.buttonToggleGroup.disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e;}_disabledInteractive;change=new Ae;constructor(){E(xr).load(Qu);let e=E(We,{optional:true}),n=E(new Xf("tabindex"),{optional:true})||"",t=E(je,{optional:true});this._tabIndex=_e(parseInt(n)||0),this.buttonToggleGroup=e,this._appearance=t&&t.appearance?t.appearance:"standard",this._disabledInteractive=t?.disabledInteractive??false;}ngOnInit(){let e=this.buttonToggleGroup;this.id=this.id||this._idGenerator.getId("mat-button-toggle-"),e&&(e._isPrechecked(this)?this.checked=true:e._isSelected(this)!==this._checked&&e._syncButtonToggle(this,this._checked));}ngAfterViewInit(){this._animationDisabled||this._elementRef.nativeElement.classList.add("mat-button-toggle-animations-enabled"),this._focusMonitor.monitor(this._elementRef,true);}ngOnDestroy(){let e=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),e&&e._isSelected(this)&&e._syncButtonToggle(this,false,false,true);}focus(e){this._buttonElement.nativeElement.focus(e);}_onButtonClick(){if(this.disabled)return;let e=this.isSingleSelector()?true:!this._checked;if(e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,true),this.buttonToggleGroup._onTouched())),this.isSingleSelector()){let n=this.buttonToggleGroup._buttonToggles.find(t=>t.tabIndex===0);n&&(n.tabIndex=-1),this.tabIndex=0;}this.change.emit(new j(this,this.value));}_markForCheck(){this._changeDetectorRef.markForCheck();}_getButtonName(){return this.isSingleSelector()?this.buttonToggleGroup.name:this.name||null}isSingleSelector(){return this.buttonToggleGroup&&!this.buttonToggleGroup.multiple}static \u0275fac=function(n){return new(n||a)};static \u0275cmp=Rv({type:a,selectors:[["mat-button-toggle"]],viewQuery:function(n,t){if(n&1&&Mf(ot,5),n&2){let o;lE(o=uE())&&(t._buttonElement=o.first);}},hostAttrs:["role","presentation",1,"mat-button-toggle"],hostVars:14,hostBindings:function(n,t){n&1&&Cf("focus",function(){return t.focus()}),n&2&&(yf("aria-label",null)("aria-labelledby",null)("id",t.id)("name",null),Rf("mat-button-toggle-standalone",!t.buttonToggleGroup)("mat-button-toggle-checked",t.checked)("mat-button-toggle-disabled",t.disabled)("mat-button-toggle-disabled-interactive",t.disabledInteractive)("mat-button-toggle-appearance-standard",t.appearance==="standard"));},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],id:"id",name:"name",value:"value",tabIndex:"tabIndex",disableRipple:[2,"disableRipple","disableRipple",wO],appearance:"appearance",checked:[2,"checked","checked",wO],disabled:[2,"disabled","disabled",wO],disabledInteractive:[2,"disabledInteractive","disabledInteractive",wO]},outputs:{change:"change"},exportAs:["matButtonToggle"],ngContentSelectors:it,decls:7,vars:13,consts:[["button",""],["type","button",1,"mat-button-toggle-button","mat-focus-indicator",3,"click","id","disabled"],[1,"mat-button-toggle-checkbox-wrapper"],[1,"mat-button-toggle-label-content"],[1,"mat-button-toggle-focus-overlay"],["matRipple","",1,"mat-button-toggle-ripple",3,"matRippleTrigger","matRippleDisabled"],["state","checked","aria-hidden","true","appearance","minimal",3,"disabled"]],template:function(n,t){if(n&1&&(sE(),jo(0,"button",1,0),Cf("click",function(){return t._onButtonClick()}),Xv(2,st,2,1,"div",2),jo(3,"span",3),aE(4),Va()(),Ef(5,"span",4)(6,"span",5)),n&2){let o=fE(1);vf("id",t.buttonId)("disabled",t.disabled&&!t.disabledInteractive||null),yf("role",t.isSingleSelector()?"radio":"button")("tabindex",t.disabled&&!t.disabledInteractive?-1:t.tabIndex)("aria-pressed",t.isSingleSelector()?null:t.checked)("aria-checked",t.isSingleSelector()?t.checked:null)("name",t._getButtonName())("aria-label",t.ariaLabel)("aria-labelledby",t.ariaLabelledby)("aria-disabled",t.disabled&&t.disabledInteractive?"true":null),Om(2),eE(t.buttonToggleGroup&&(!t.buttonToggleGroup.multiple&&!t.buttonToggleGroup.hideSingleSelectionIndicator||t.buttonToggleGroup.multiple&&!t.buttonToggleGroup.hideMultipleSelectionIndicator)?2:-1),Om(4),vf("matRippleTrigger",o)("matRippleDisabled",t.disableRipple||t.disabled);}},dependencies:[UD,ni],styles:[`.mat-button-toggle-standalone,
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
`],encapsulation:2})}return a})(),$=(()=>{class a{static \u0275fac=function(n){return new(n||a)};static \u0275mod=Pv({type:a});static \u0275inj=Uc({imports:[td,W,Tn]})}return a})();function dt(a,r){a&1&&If(0,"div",2);}var gt=new N("MAT_PROGRESS_BAR_DEFAULT_OPTIONS");var Qe=(()=>{class a{_elementRef=E(Xn);_ngZone=E(De);_changeDetectorRef=E(DO);_renderer=E(Vy);_cleanupTransitionEnd;constructor(){let e=sg(),n=E(gt,{optional:true});this._isNoopAnimation=e==="di-disabled",e==="reduced-motion"&&this._elementRef.nativeElement.classList.add("mat-progress-bar-reduced-motion"),n&&(n.color&&(this.color=this._defaultColor=n.color),this.mode=n.mode||this.mode);}_isNoopAnimation;get color(){return this._color||this._defaultColor}set color(e){this._color=e;}_color;_defaultColor="primary";get value(){return this._value}set value(e){this._value=$e(e||0),this._changeDetectorRef.markForCheck();}_value=0;get bufferValue(){return this._bufferValue||0}set bufferValue(e){this._bufferValue=$e(e||0),this._changeDetectorRef.markForCheck();}_bufferValue=0;animationEnd=new Ae;get mode(){return this._mode}set mode(e){this._mode=e,this._changeDetectorRef.markForCheck();}_mode="determinate";ngAfterViewInit(){this._ngZone.runOutsideAngular(()=>{this._cleanupTransitionEnd=this._renderer.listen(this._elementRef.nativeElement,"transitionend",this._transitionendHandler);});}ngOnDestroy(){this._cleanupTransitionEnd?.();}_getPrimaryBarTransform(){return `scaleX(${this._isIndeterminate()?1:this.value/100})`}_getBufferBarFlexBasis(){return `${this.mode==="buffer"?this.bufferValue:100}%`}_isIndeterminate(){return this.mode==="indeterminate"||this.mode==="query"}_transitionendHandler=e=>{this.animationEnd.observers.length===0||!e.target||!e.target.classList.contains("mdc-linear-progress__primary-bar")||(this.mode==="determinate"||this.mode==="buffer")&&this._ngZone.run(()=>this.animationEnd.next({value:this.value}));};static \u0275fac=function(n){return new(n||a)};static \u0275cmp=Rv({type:a,selectors:[["mat-progress-bar"]],hostAttrs:["role","progressbar","aria-valuemin","0","aria-valuemax","100","tabindex","-1",1,"mat-mdc-progress-bar","mdc-linear-progress"],hostVars:10,hostBindings:function(n,t){n&2&&(yf("aria-valuenow",t._isIndeterminate()?null:t.value)("mode",t.mode),wE("mat-"+t.color),Rf("_mat-animation-noopable",t._isNoopAnimation)("mdc-linear-progress--animation-ready",!t._isNoopAnimation)("mdc-linear-progress--indeterminate",t._isIndeterminate()));},inputs:{color:"color",value:[2,"value","value",CO],bufferValue:[2,"bufferValue","bufferValue",CO],mode:"mode"},outputs:{animationEnd:"animationEnd"},exportAs:["matProgressBar"],decls:7,vars:5,consts:[["aria-hidden","true",1,"mdc-linear-progress__buffer"],[1,"mdc-linear-progress__buffer-bar"],[1,"mdc-linear-progress__buffer-dots"],["aria-hidden","true",1,"mdc-linear-progress__bar","mdc-linear-progress__primary-bar"],[1,"mdc-linear-progress__bar-inner"],["aria-hidden","true",1,"mdc-linear-progress__bar","mdc-linear-progress__secondary-bar"]],template:function(n,t){n&1&&(Ha(0,"div",0),If(1,"div",1),Xv(2,dt,1,0,"div",2),Ba(),Ha(3,"div",3),If(4,"span",4),Ba(),Ha(5,"div",5),If(6,"span",4),Ba()),n&2&&(Om(),kf("flex-basis",t._getBufferBarFlexBasis()),Om(),eE(t.mode==="buffer"?2:-1),Om(),kf("transform",t._getPrimaryBarTransform()));},styles:[`.mat-mdc-progress-bar {
  --mat-progress-bar-animation-multiplier: 1;
  display: block;
  text-align: start;
}
.mat-mdc-progress-bar[mode=query] {
  transform: scaleX(-1);
}
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-dots,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__secondary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__bar-inner.mdc-linear-progress__bar-inner {
  animation: none;
}
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-bar {
  transition: transform 1ms;
}

.mat-progress-bar-reduced-motion {
  --mat-progress-bar-animation-multiplier: 2;
}

.mdc-linear-progress {
  position: relative;
  width: 100%;
  transform: translateZ(0);
  outline: 1px solid transparent;
  overflow-x: hidden;
  transition: opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  height: max(var(--mat-progress-bar-track-height, 4px), var(--mat-progress-bar-active-indicator-height, 4px));
}
@media (forced-colors: active) {
  .mdc-linear-progress {
    outline-color: CanvasText;
  }
}

.mdc-linear-progress__bar {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  width: 100%;
  animation: none;
  transform-origin: top left;
  transition: transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  height: var(--mat-progress-bar-active-indicator-height, 4px);
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__bar {
  transition: none;
}
[dir=rtl] .mdc-linear-progress__bar {
  right: 0;
  transform-origin: center right;
}

.mdc-linear-progress__bar-inner {
  display: inline-block;
  position: absolute;
  width: 100%;
  animation: none;
  border-top-style: solid;
  border-color: var(--mat-progress-bar-active-indicator-color, var(--mat-sys-primary));
  border-top-width: var(--mat-progress-bar-active-indicator-height, 4px);
}

.mdc-linear-progress__buffer {
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  width: 100%;
  overflow: hidden;
  height: var(--mat-progress-bar-track-height, 4px);
  border-radius: var(--mat-progress-bar-track-shape, var(--mat-sys-corner-none));
}

.mdc-linear-progress__buffer-dots {
  background-image: radial-gradient(circle, var(--mat-progress-bar-track-color, var(--mat-sys-surface-variant)) calc(var(--mat-progress-bar-track-height, 4px) / 2), transparent 0);
  background-repeat: repeat-x;
  background-size: calc(calc(var(--mat-progress-bar-track-height, 4px) / 2) * 5);
  background-position: left;
  flex: auto;
  transform: rotate(180deg);
  animation: mdc-linear-progress-buffering calc(250ms * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
@media (forced-colors: active) {
  .mdc-linear-progress__buffer-dots {
    background-color: ButtonBorder;
  }
}
[dir=rtl] .mdc-linear-progress__buffer-dots {
  animation: mdc-linear-progress-buffering-reverse calc(250ms * var(--mat-progress-bar-animation-multiplier)) infinite linear;
  transform: rotate(0);
}

.mdc-linear-progress__buffer-bar {
  flex: 0 1 100%;
  transition: flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  background-color: var(--mat-progress-bar-track-color, var(--mat-sys-surface-variant));
}

.mdc-linear-progress__primary-bar {
  transform: scaleX(0);
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar {
  left: -145.166611%;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar {
  animation: mdc-linear-progress-primary-indeterminate-translate calc(2s * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar > .mdc-linear-progress__bar-inner {
  animation: mdc-linear-progress-primary-indeterminate-scale calc(2s * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar {
  animation-name: mdc-linear-progress-primary-indeterminate-translate-reverse;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar {
  right: -145.166611%;
  left: auto;
}

.mdc-linear-progress__secondary-bar {
  display: none;
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar {
  left: -54.888891%;
  display: block;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar {
  animation: mdc-linear-progress-secondary-indeterminate-translate calc(2s * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar > .mdc-linear-progress__bar-inner {
  animation: mdc-linear-progress-secondary-indeterminate-scale calc(2s * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar {
  animation-name: mdc-linear-progress-secondary-indeterminate-translate-reverse;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar {
  right: -54.888891%;
  left: auto;
}

@keyframes mdc-linear-progress-buffering {
  from {
    transform: rotate(180deg) translateX(calc(var(--mat-progress-bar-track-height, 4px) * -2.5));
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-translate {
  0% {
    transform: translateX(0);
  }
  20% {
    animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
    transform: translateX(0);
  }
  59.15% {
    animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
    transform: translateX(83.67142%);
  }
  100% {
    transform: translateX(200.611057%);
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-scale {
  0% {
    transform: scaleX(0.08);
  }
  36.65% {
    animation-timing-function: cubic-bezier(0.334731, 0.12482, 0.785844, 1);
    transform: scaleX(0.08);
  }
  69.15% {
    animation-timing-function: cubic-bezier(0.06, 0.11, 0.6, 1);
    transform: scaleX(0.661479);
  }
  100% {
    transform: scaleX(0.08);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-translate {
  0% {
    animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
    transform: translateX(0);
  }
  25% {
    animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
    transform: translateX(37.651913%);
  }
  48.35% {
    animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
    transform: translateX(84.386165%);
  }
  100% {
    transform: translateX(160.277782%);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-scale {
  0% {
    animation-timing-function: cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);
    transform: scaleX(0.08);
  }
  19.15% {
    animation-timing-function: cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);
    transform: scaleX(0.457104);
  }
  44.15% {
    animation-timing-function: cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);
    transform: scaleX(0.72796);
  }
  100% {
    transform: scaleX(0.08);
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse {
  0% {
    transform: translateX(0);
  }
  20% {
    animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
    transform: translateX(0);
  }
  59.15% {
    animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
    transform: translateX(-83.67142%);
  }
  100% {
    transform: translateX(-200.611057%);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse {
  0% {
    animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
    transform: translateX(0);
  }
  25% {
    animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
    transform: translateX(-37.651913%);
  }
  48.35% {
    animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
    transform: translateX(-84.386165%);
  }
  100% {
    transform: translateX(-160.277782%);
  }
}
@keyframes mdc-linear-progress-buffering-reverse {
  from {
    transform: translateX(-10px);
  }
}
`],encapsulation:2})}return a})();function $e(a,r=0,e=100){return Math.max(r,Math.min(e,a))}var Ze=(()=>{class a{static \u0275fac=function(n){return new(n||a)};static \u0275mod=Pv({type:a});static \u0275inj=Uc({imports:[Tn]})}return a})();function bt(a,r){a&1&&Ef(0,"mat-progress-bar",0);}function ht(a,r){if(a&1){let e=nE();jo(0,"button",10),Cf("click",function(){ml(e);let t=oE();return yl(t.playAudio())}),jo(1,"mat-icon"),OE(2,"play_arrow"),Va(),OE(3," Play "),Va();}if(a&2){let e=oE();vf("disabled",!e.auth.isLoggedIn());}}function ft(a,r){if(a&1){let e=nE();jo(0,"button",11),Cf("click",function(){ml(e);let t=oE();return yl(t.stopAudio())}),jo(1,"mat-icon"),OE(2,"stop"),Va(),OE(3," Stop "),Va();}if(a&2){let e=oE();vf("disabled",!e.auth.isLoggedIn());}}var Q=class a{language=yO.required();accent=yO.required();sentenceId=yO.required();auth=E(Iu);dataService=E(C);logger=E(xi);isPlaying=_e(false);audio=new Audio;playbackSpeed="100";constructor(){bs(()=>{this.sentenceId();this.stopAudio();});}audioResource=KE({params:()=>({lang:this.language(),acc:this.accent(),id:this.sentenceId()}),loader:async({params:r})=>{if(!r.lang||!r.acc||!r.id)return;let e=await this.dataService.getPresignedUrl(r.lang,r.acc,r.id);return new Audio(e)}});handleAudioEnded=()=>{this.logger.debug("audio-player.ts handleAudioEnded"),this.isPlaying.set(false),this.incrementCounter(),this.playAudio();};playAudio(){this.logger.debug("audio-player.ts playAudio"),this.isPlaying()||(this.audio=this.audioResource.value()||new Audio(""),this.audio.onended=this.handleAudioEnded,this.audio.load(),this.audio.playbackRate=parseInt(this.playbackSpeed,10)/100,this.audio.play(),this.isPlaying.set(true));}pauseAudio(){this.logger.debug("audio-player.ts pauseAudio"),this.audio.pause(),this.isPlaying.set(false);}stopAudio(){this.logger.debug("audio-player.ts stopAudio"),this.audio.pause(),this.audio.currentTime=0,this.isPlaying.set(false);}incrementCounter(){this.dataService.incrementSentenceCount(this.language(),this.accent(),this.sentenceId());}onSpaceBar(){this.isPlaying()?this.pauseAudio():this.playAudio();}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=Rv({type:a,selectors:[["app-audio-player"]],hostBindings:function(e,n){e&1&&Cf("keydown.space",function(){return n.onSpaceBar()},ym);},inputs:{language:[1,"language"],accent:[1,"accent"],sentenceId:[1,"sentenceId"]},decls:16,vars:3,consts:[["mode","indeterminate"],["matFab","","extended","",1,"audio-icon",3,"disabled"],["matFab","","extended","",3,"disabled"],["name","playBackSpeed","aria-label","Play Back Speed",3,"ngModelChange","ngModel"],["value","25"],["value","50"],["value","75"],["value","90"],["value","100"],["value","110"],["matFab","","extended","",1,"audio-icon",3,"click","disabled"],["matFab","","extended","",3,"click","disabled"]],template:function(e,n){e&1&&(Xv(0,bt,1,0,"mat-progress-bar",0),Xv(1,ht,4,1,"button",1)(2,ft,4,1,"button",2),jo(3,"mat-button-toggle-group",3),Bf("ngModelChange",function(o){return jE(n.playbackSpeed,o)||(n.playbackSpeed=o),o}),jo(4,"mat-button-toggle",4),OE(5,"25%"),Va(),jo(6,"mat-button-toggle",5),OE(7,"50%"),Va(),jo(8,"mat-button-toggle",6),OE(9,"75%"),Va(),jo(10,"mat-button-toggle",7),OE(11,"90%"),Va(),jo(12,"mat-button-toggle",8),OE(13,"100%"),Va(),jo(14,"mat-button-toggle",9),OE(15,"110%"),Va()(),Wy()),e&2&&(eE(n.isPlaying()?0:-1),Om(),eE(n.isPlaying()?2:1),Om(2),Hf("ngModel",n.playbackSpeed),Gy());},dependencies:[bT,vT,_S,yS,$,ie,W,Nn,xn,Jt,Ze,Qe],encapsulation:2})};function _t(a,r){if(a&1&&(Ha(0,"p"),OE(1),Ba()),a&2){let e=oE();Om(),$a("pinyin: ",e.pinyin());}}var Z=class a{dataService=E(C);logger=E(xi);language=yO.required();accent=yO.required();sentenceId=yO.required();sentencesResource=KE({params:()=>({lang:this.language(),acc:this.accent(),id:this.sentenceId()}),loader:async({params:r})=>{if(!(!r.lang||!r.acc||!r.id))return await this.dataService.getSentences(r.lang,r.acc,r.id)}});sentence=it$1(()=>this.sentencesResource.hasValue()?this.sentencesResource.value().find(e=>String(e.sentenceId)===this.sentenceId()):{});text=it$1(()=>this.sentence()?.text);ipa=it$1(()=>this.sentence()?.ipa);pinyin=it$1(()=>this.sentence()?.pinyin);hasPinyin=it$1(()=>this.pinyin.length>1);static \u0275fac=function(e){return new(e||a)};static \u0275cmp=Rv({type:a,selectors:[["app-sentence-text"]],inputs:{language:[1,"language"],accent:[1,"accent"],sentenceId:[1,"sentenceId"]},decls:5,vars:3,template:function(e,n){e&1&&(Ha(0,"p"),OE(1),Ba(),Ha(2,"p"),OE(3),Ba(),Xv(4,_t,2,1,"p")),e&2&&(Om(),$a("text: ",n.text()),Om(2),$a("ipa: ",n.ipa()),Om(),eE(n.hasPinyin()?4:-1));},encapsulation:2})};var Je=class a{dataService=E(C);router=E(un);language=yO.required();accent=yO.required();sentenceId=yO.required();maxSentenceId=20;previousSentence(){Number(this.sentenceId())>1&&(this.router.navigate([this.language(),this.accent(),Number(this.sentenceId())-1]),this.router.navigate([this.language(),this.accent(),Number(this.sentenceId())-1]));}nextSentence(){Number(this.sentenceId())<this.maxSentenceId&&this.router.navigate([this.language(),this.accent(),Number(this.sentenceId())+1]);}disablePreviousButton(){return Number(this.sentenceId())===1}disableNextButton(){return Number(this.sentenceId())===this.maxSentenceId}chorusCount=it$1(()=>this.dataService.getSentenceCount(this.language(),this.accent(),this.sentenceId())());static \u0275fac=function(e){return new(e||a)};static \u0275cmp=Rv({type:a,selectors:[["app-chorus-dashboard"]],hostBindings:function(e,n){e&1&&Cf("keydown.arrowleft",function(){return n.previousSentence()},mm)("keydown.arrowright",function(){return n.nextSentence()},mm);},inputs:{language:[1,"language"],accent:[1,"accent"],sentenceId:[1,"sentenceId"]},decls:14,vars:9,consts:[[1,"card-container"],[3,"language","accent","sentenceId"],["matFab","","extended","",3,"click","disabled"]],template:function(e,n){e&1&&(jo(0,"mat-card",0),Ef(1,"app-sentence-text",1),jo(2,"p"),OE(3),Va(),jo(4,"div")(5,"button",2),Cf("click",function(){return n.previousSentence()}),jo(6,"mat-icon"),OE(7,"skip_previous"),Va(),OE(8," Prev Sentence "),Va(),jo(9,"button",2),Cf("click",function(){return n.nextSentence()}),OE(10," Next Sentence "),jo(11,"mat-icon"),OE(12,"skip_next"),Va()()(),Ef(13,"app-audio-player",1),Va()),e&2&&(Om(),vf("language",n.language())("accent",n.accent())("sentenceId",n.sentenceId()),Om(2),$a("ChorusCount: ",n.chorusCount()??"-"),Om(2),vf("disabled",n.disablePreviousButton()),Om(4),vf("disabled",n.disableNextButton()),Om(4),vf("language",n.language())("accent",n.accent())("sentenceId",n.sentenceId()));},dependencies:[bT,vT,_S,yS,$,Q,Z,Xn$1,Wn],encapsulation:2})};export{Je as ChorusDashboard};
import {aM as V,aN as j,i as er,aO as re,_ as _e,V as ot$1,Z as J$1,aC as xe,aP as qp,a4 as Ge$1,aQ as Va,aR as Ee,aS as ei,z as By,y as tr,k as Hv,aT as Mg,aU as gf,m as N,aV as Gr,r as GE,N as Nf,aq as lg,ar as ZO,u as Df,v as Pf,aW as de$1,aX as $v,ag as Fv,ah as Qc,E as E$1,P as Pv,A as lE,F as uE,W as Wa,q as qa,aj as Tn,a0 as In,aY as Ve,aZ as je$1,M as zO,B,a2 as Ss,a_ as b}from'./main-ONDAHG34.js';var qe=(()=>{class n{_renderer;_elementRef;onChange=e=>{};onTouched=()=>{};constructor(e,i){this._renderer=e,this._elementRef=i;}setProperty(e,i){this._renderer.setProperty(this._elementRef.nativeElement,e,i);}registerOnTouched(e){this.onTouched=e;}registerOnChange(e){this.onChange=e;}setDisabledState(e){this.setProperty("disabled",e);}static \u0275fac=function(i){return new(i||n)(ei(By),ei(tr))};static \u0275dir=Hv({type:n})}return n})(),ft=(()=>{class n extends qe{static \u0275fac=(()=>{let e;return function(r){return (e||(e=Mg(n)))(r||n)}})();static \u0275dir=Hv({type:n,features:[gf]})}return n})(),$e=new N("");var pt={provide:$e,useExisting:Gr(()=>ze),multi:true};function gt(){let n=Ve()?Ve().getUserAgent():"";return /android (\d+)/.test(n.toLowerCase())}var vt=new N(""),ze=(()=>{class n extends qe{_compositionMode;_composing=false;constructor(e,i,r){super(e,i),this._compositionMode=r,this._compositionMode==null&&(this._compositionMode=!gt());}writeValue(e){let i=e??"";this.setProperty("value",i);}_handleInput(e){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(e);}_compositionStart(){this._composing=true;}_compositionEnd(e){this._composing=false,this._compositionMode&&this.onChange(e);}static \u0275fac=function(i){return new(i||n)(ei(By),ei(tr),ei(vt,8))};static \u0275dir=Hv({type:n,selectors:[["input","formControlName","",3,"type","checkbox",3,"ngNoCva",""],["textarea","formControlName","",3,"ngNoCva",""],["input","formControl","",3,"type","checkbox",3,"ngNoCva",""],["textarea","formControl","",3,"ngNoCva",""],["input","ngModel","",3,"type","checkbox",3,"ngNoCva",""],["textarea","ngModel","",3,"ngNoCva",""],["","ngDefaultControl",""]],hostBindings:function(i,r){i&1&&Nf("input",function(a){return r._handleInput(a.target.value)})("blur",function(){return r.onTouched()})("compositionstart",function(){return r._compositionStart()})("compositionend",function(a){return r._compositionEnd(a.target.value)});},standalone:false,features:[GE([pt]),gf]})}return n})();function ue(n){return n==null||he(n)===0}function he(n){return n==null?null:Array.isArray(n)||typeof n=="string"?n.length:n instanceof Set?n.size:null}var Q=new N(""),me=new N(""),yt=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,se=class{static min(t){return _t(t)}static max(t){return Ct(t)}static required(t){return Xe(t)}static requiredTrue(t){return bt(t)}static email(t){return Vt(t)}static minLength(t){return Dt(t)}static maxLength(t){return Mt(t)}static pattern(t){return At(t)}static nullValidator(t){return q()}static compose(t){return et(t)}static composeAsync(t){return tt(t)}};function _t(n){return t=>{if(t.value==null||n==null)return null;let e=parseFloat(t.value);return !isNaN(e)&&e<n?{min:{min:n,actual:t.value}}:null}}function Ct(n){return t=>{if(t.value==null||n==null)return null;let e=parseFloat(t.value);return !isNaN(e)&&e>n?{max:{max:n,actual:t.value}}:null}}function Xe(n){return ue(n.value)?{required:true}:null}function bt(n){return n.value===true?null:{required:true}}function Vt(n){return ue(n.value)||yt.test(n.value)?null:{email:true}}function Dt(n){return t=>{let e=t.value?.length??he(t.value);return e===null||e===0?null:e<n?{minlength:{requiredLength:n,actualLength:e}}:null}}function Mt(n){return t=>{let e=t.value?.length??he(t.value);return e!==null&&e>n?{maxlength:{requiredLength:n,actualLength:e}}:null}}function At(n){if(!n)return q;let t,e;return typeof n=="string"?(e="",n.charAt(0)!=="^"&&(e+="^"),e+=n,n.charAt(n.length-1)!=="$"&&(e+="$"),t=new RegExp(e)):(e=n.toString(),t=n),i=>{if(ue(i.value))return null;let r=i.value;return t.test(r)?null:{pattern:{requiredPattern:e,actualValue:r}}}}function q(n){return null}function Ze(n){return n!=null}function Ye(n){return Va(n)?Ee(n):n}function Ke(n){let t={};return n.forEach(e=>{t=e!=null?j(j({},t),e):t;}),Object.keys(t).length===0?null:t}function Je(n,t){return t.map(e=>e(n))}function wt(n){return !n.validate}function Qe(n){return n.map(t=>wt(t)?t:e=>t.validate(e))}function et(n){if(!n)return null;let t=n.filter(Ze);return t.length==0?null:function(e){return Ke(Je(e,t))}}function fe(n){return n!=null?et(Qe(n)):null}function tt(n){if(!n)return null;let t=n.filter(Ze);return t.length==0?null:function(e){let i=Je(e,t).map(Ye);return qp(i).pipe(Ge$1(Ke))}}function pe(n){return n!=null?tt(Qe(n)):null}function Te(n,t){return n===null?[t]:Array.isArray(n)?[...n,t]:[n,t]}function nt(n){return n._rawValidators}function it(n){return n._rawAsyncValidators}function ae(n){return n?Array.isArray(n)?n:[n]:[]}function $(n,t){return Array.isArray(n)?n.includes(t):n===t}function je(n,t){let e=ae(t);return ae(n).forEach(r=>{$(e,r)||e.push(r);}),e}function Be(n,t){return ae(t).filter(e=>!$(n,e))}var z=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(t){this._rawValidators=t||[],this._composedValidatorFn=fe(this._rawValidators);}_setAsyncValidators(t){this._rawAsyncValidators=t||[],this._composedAsyncValidatorFn=pe(this._rawAsyncValidators);}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(t){this._onDestroyCallbacks.push(t);}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(t=>t()),this._onDestroyCallbacks=[];}reset(t=void 0){this.control?.reset(t);}hasError(t,e){return this.control?this.control.hasError(t,e):false}getError(t,e){return this.control?this.control.getError(t,e):null}},f=class extends z{name;get formDirective(){return null}get path(){return null}};var k="VALID",L="INVALID",A="PENDING",S="DISABLED",p=class{},X=class extends p{value;source;constructor(t,e){super(),this.value=t,this.source=e;}},R=class extends p{pristine;source;constructor(t,e){super(),this.pristine=t,this.source=e;}},P=class extends p{touched;source;constructor(t,e){super(),this.touched=t,this.source=e;}},w=class extends p{status;source;constructor(t,e){super(),this.status=t,this.source=e;}},Z=class extends p{source;constructor(t){super(),this.source=t;}},_=class extends p{source;constructor(t){super(),this.source=t;}};function ge(n){return (ee(n)?n.validators:n)||null}function xt(n){return Array.isArray(n)?fe(n):n||null}function ve(n,t){return (ee(t)?t.asyncValidators:n)||null}function Et(n){return Array.isArray(n)?pe(n):n||null}function ee(n){return n!=null&&!Array.isArray(n)&&typeof n=="object"}function rt(n,t,e){let i=n.controls;if(!(t?Object.keys(i):i).length)throw new b(1e3,"");if(!i[e])throw new b(1001,"")}function ot(n,t,e){n._forEachChild((i,r)=>{if(e[r]===void 0)throw new b(-1002,"")});}var x=class{_pendingDirty=false;_hasOwnPendingAsyncValidator=null;_pendingTouched=false;_onCollectionChange=()=>{};_updateOn;_hasRequired=_e(false);_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(t,e){this._assignValidators(t),this._assignAsyncValidators(e);}get validator(){return this._composedValidatorFn}set validator(t){this._rawValidators=this._composedValidatorFn=t,this._updateHasRequiredValidator();}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(t){this._rawAsyncValidators=this._composedAsyncValidatorFn=t;}get parent(){return this._parent}get status(){return re(this.statusReactive)}set status(t){re(()=>this.statusReactive.set(t));}_status=ot$1(()=>this.statusReactive());statusReactive=_e(void 0);get valid(){return this.status===k}get invalid(){return this.status===L}get pending(){return this.status===A}get disabled(){return this.status===S}get enabled(){return this.status!==S}errors;get pristine(){return re(this.pristineReactive)}set pristine(t){re(()=>this.pristineReactive.set(t));}_pristine=ot$1(()=>this.pristineReactive());pristineReactive=_e(true);get dirty(){return !this.pristine}get touched(){return re(this.touchedReactive)}set touched(t){re(()=>this.touchedReactive.set(t));}_touched=ot$1(()=>this.touchedReactive());touchedReactive=_e(false);get untouched(){return !this.touched}_events=new J$1;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(t){this._assignValidators(t);}setAsyncValidators(t){this._assignAsyncValidators(t);}addValidators(t){this.setValidators(je(t,this._rawValidators));}addAsyncValidators(t){this.setAsyncValidators(je(t,this._rawAsyncValidators));}removeValidators(t){this.setValidators(Be(t,this._rawValidators));}removeAsyncValidators(t){this.setAsyncValidators(Be(t,this._rawAsyncValidators));}hasValidator(t){return $(this._rawValidators,t)}hasAsyncValidator(t){return $(this._rawAsyncValidators,t)}clearValidators(){this.validator=null;}clearAsyncValidators(){this.asyncValidator=null;}markAsTouched(t={}){let e=this.touched===false;this.touched=true;let i=t.sourceControl??this;t.onlySelf||this._parent?.markAsTouched(V(j({},t),{sourceControl:i})),e&&t.emitEvent!==false&&this._events.next(new P(true,i));}markAllAsDirty(t={}){this.markAsDirty({onlySelf:true,emitEvent:t.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsDirty(t));}markAllAsTouched(t={}){this.markAsTouched({onlySelf:true,emitEvent:t.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsTouched(t));}markAsUntouched(t={}){let e=this.touched===true;this.touched=false,this._pendingTouched=false;let i=t.sourceControl??this;this._forEachChild(r=>{r.markAsUntouched({onlySelf:true,emitEvent:t.emitEvent,sourceControl:i});}),t.onlySelf||this._parent?._updateTouched(t,i),e&&t.emitEvent!==false&&this._events.next(new P(false,i));}markAsDirty(t={}){let e=this.pristine===true;this.pristine=false;let i=t.sourceControl??this;t.onlySelf||this._parent?.markAsDirty(V(j({},t),{sourceControl:i})),e&&t.emitEvent!==false&&this._events.next(new R(false,i));}markAsPristine(t={}){let e=this.pristine===false;this.pristine=true,this._pendingDirty=false;let i=t.sourceControl??this;this._forEachChild(r=>{r.markAsPristine({onlySelf:true,emitEvent:t.emitEvent});}),t.onlySelf||this._parent?._updatePristine(t,i),e&&t.emitEvent!==false&&this._events.next(new R(true,i));}markAsPending(t={}){this.status=A;let e=t.sourceControl??this;t.emitEvent!==false&&(this._events.next(new w(this.status,e)),this.statusChanges.emit(this.status)),t.onlySelf||this._parent?.markAsPending(V(j({},t),{sourceControl:e}));}disable(t={}){let e=this._parentMarkedDirty(t.onlySelf);this.status=S,this.errors=null,this._forEachChild(r=>{r.disable(V(j({},t),{onlySelf:true}));}),this._updateValue();let i=t.sourceControl??this;t.emitEvent!==false&&(this._events.next(new X(this.value,i)),this._events.next(new w(this.status,i)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(V(j({},t),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(r=>r(true));}enable(t={}){let e=this._parentMarkedDirty(t.onlySelf);this.status=k,this._forEachChild(i=>{i.enable(V(j({},t),{onlySelf:true}));}),this.updateValueAndValidity({onlySelf:true,emitEvent:t.emitEvent}),this._updateAncestors(V(j({},t),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(i=>i(false));}_updateAncestors(t,e){t.onlySelf||(this._parent?.updateValueAndValidity(t),t.skipPristineCheck||this._parent?._updatePristine({},e),this._parent?._updateTouched({},e));}setParent(t){this._parent=t;}getRawValue(){return this.value}updateValueAndValidity(t={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let i=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===k||this.status===A)&&this._runAsyncValidator(i,t.emitEvent);}let e=t.sourceControl??this;t.emitEvent!==false&&(this._events.next(new X(this.value,e)),this._events.next(new w(this.status,e)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),t.onlySelf||this._parent?.updateValueAndValidity(V(j({},t),{sourceControl:e}));}_updateTreeValidity(t={emitEvent:true}){this._forEachChild(e=>e._updateTreeValidity(t)),this.updateValueAndValidity({onlySelf:true,emitEvent:t.emitEvent});}_setInitialStatus(){this.status=this._allControlsDisabled()?S:k;}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(t,e){if(this.asyncValidator){this.status=A,this._hasOwnPendingAsyncValidator={emitEvent:e!==false,shouldHaveEmitted:t!==false};let i=Ye(this.asyncValidator(this));this._asyncValidationSubscription=i.subscribe(r=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(r,{emitEvent:e,shouldHaveEmitted:t});});}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let t=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??false;return this._hasOwnPendingAsyncValidator=null,t}return  false}setErrors(t,e={}){this.errors=t,this._updateControlsErrors(e.emitEvent!==false,this,e.shouldHaveEmitted);}get(t){let e=t;return e==null||(Array.isArray(e)||(e=e.split(".")),e.length===0)?null:e.reduce((i,r)=>i&&i._find(r),this)}getError(t,e){let i=e?this.get(e):this;return i?.errors?i.errors[t]:null}hasError(t,e){return !!this.getError(t,e)}get root(){let t=this;for(;t._parent;)t=t._parent;return t}_updateControlsErrors(t,e,i){this.status=this._calculateStatus(),t&&this.statusChanges.emit(this.status),(t||i)&&this._events.next(new w(this.status,e)),this._parent&&this._parent._updateControlsErrors(t,e,i);}_initObservables(){this.valueChanges=new xe,this.statusChanges=new xe;}_calculateStatus(){return this._allControlsDisabled()?S:this.errors?L:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(A)?A:this._anyControlsHaveStatus(L)?L:k}_anyControlsHaveStatus(t){return this._anyControls(e=>e.status===t)}_anyControlsDirty(){return this._anyControls(t=>t.dirty)}_anyControlsTouched(){return this._anyControls(t=>t.touched)}_updatePristine(t,e){let i=!this._anyControlsDirty(),r=this.pristine!==i;this.pristine=i,t.onlySelf||this._parent?._updatePristine(t,e),r&&this._events.next(new R(this.pristine,e));}_updateTouched(t={},e){this.touched=this._anyControlsTouched(),this._events.next(new P(this.touched,e)),t.onlySelf||this._parent?._updateTouched(t,e);}_onDisabledChange=[];_registerOnCollectionChange(t){this._onCollectionChange=t;}_setUpdateStrategy(t){ee(t)&&t.updateOn!=null&&(this._updateOn=t.updateOn);}_parentMarkedDirty(t){return !t&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(t){return null}_assignValidators(t){this._rawValidators=Array.isArray(t)?t.slice():t,this._composedValidatorFn=xt(this._rawValidators),this._updateHasRequiredValidator();}_assignAsyncValidators(t){this._rawAsyncValidators=Array.isArray(t)?t.slice():t,this._composedAsyncValidatorFn=Et(this._rawAsyncValidators);}_updateHasRequiredValidator(){re(()=>this._hasRequired.set(this.hasValidator(se.required)));}};function Ft(n){return n.tagName==="INPUT"||n.tagName==="SELECT"||n.tagName==="TEXTAREA"}function It(n,t,e,i){switch(e){case "name":n.setAttribute(t,e,i);break;case "disabled":case "readonly":case "required":i?n.setAttribute(t,e,""):n.removeAttribute(t,e);break;case "max":case "min":case "minLength":case "maxLength":i!==void 0?n.setAttribute(t,e,i.toString()):n.removeAttribute(t,e);break}}var le=class{kind;context;control;message;constructor({kind:t,context:e,control:i}){this.kind=t,this.context=e,this.control=i;}};var Nt=(()=>{class n{_validator=q;_onChange;_enabled;ngOnChanges(e){if(this.inputName in e){let i=this.normalizeInput(e[this.inputName].currentValue);this._enabled=this.enabled(i),this._validator=this._enabled?this.createValidator(i):q,this._onChange?.();}}validate(e){return this._validator(e)}registerOnValidatorChange(e){this._onChange=e;}enabled(e){return e!=null}static \u0275fac=function(i){return new(i||n)};static \u0275dir=Hv({type:n,features:[lg]})}return n})();var kt={provide:Q,useExisting:Gr(()=>st),multi:true};var st=(()=>{class n extends Nt{required;inputName="required";normalizeInput=ZO;createValidator=e=>Xe;enabled(e){return e}static \u0275fac=(()=>{let e;return function(r){return (e||(e=Mg(n)))(r||n)}})();static \u0275dir=Hv({type:n,selectors:[["","required","","formControlName","",3,"type","checkbox"],["","required","","formControl","",3,"type","checkbox"],["","required","","ngModel","",3,"type","checkbox"]],hostVars:1,hostBindings:function(i,r){i&2&&Df("required",r._enabled?"":null);},inputs:{required:"required"},standalone:false,features:[GE([kt]),gf]})}return n})();var St=new N(""),te=new N("",{factory:()=>ne}),ne="always";function Ot(n,t){return [...t.path,n]}function Rt(n,t,e=ne){ye(n,t),t.valueAccessor.writeValue(n.value),(n.disabled||e==="always")&&t.valueAccessor.setDisabledState?.(n.disabled),Tt(n,t),Bt(n,t),jt(n,t),Pt(n,t);}function Ge(n,t,e=true){let i=()=>{};t?.valueAccessor?.registerOnChange(i),t?.valueAccessor?.registerOnTouched(i),K(n,t),n&&(t._invokeOnDestroyCallbacks(),n._registerOnCollectionChange(()=>{}));}function Y(n,t){n.forEach(e=>{e.registerOnValidatorChange&&e.registerOnValidatorChange(t);});}function Pt(n,t){if(t.valueAccessor.setDisabledState){let e=i=>{t.valueAccessor.setDisabledState(i);};n.registerOnDisabledChange(e),t._registerOnDestroy(()=>{n._unregisterOnDisabledChange(e);});}}function ye(n,t){let e=nt(n);t.validator!==null?n.setValidators(Te(e,t.validator)):typeof e=="function"&&n.setValidators([e]);let i=it(n);t.asyncValidator!==null?n.setAsyncValidators(Te(i,t.asyncValidator)):typeof i=="function"&&n.setAsyncValidators([i]);let r=()=>n.updateValueAndValidity();Y(t._rawValidators,r),Y(t._rawAsyncValidators,r);}function K(n,t){let e=false;if(n!==null){if(t.validator!==null){let r=nt(n);if(Array.isArray(r)&&r.length>0){let o=r.filter(a=>a!==t.validator);o.length!==r.length&&(e=true,n.setValidators(o));}}if(t.asyncValidator!==null){let r=it(n);if(Array.isArray(r)&&r.length>0){let o=r.filter(a=>a!==t.asyncValidator);o.length!==r.length&&(e=true,n.setAsyncValidators(o));}}}let i=()=>{};return Y(t._rawValidators,i),Y(t._rawAsyncValidators,i),e}function Tt(n,t){t.valueAccessor.registerOnChange(e=>{n._pendingValue=e,n._pendingChange=true,n._pendingDirty=true,n.updateOn==="change"&&at(n,t);});}function jt(n,t){t.valueAccessor.registerOnTouched(()=>{n._pendingTouched=true,n.updateOn==="blur"&&n._pendingChange&&at(n,t),n.updateOn!=="submit"&&n.markAsTouched();});}function at(n,t){n._pendingDirty&&n.markAsDirty(),n.setValue(n._pendingValue,{emitModelToViewChange:false}),t.viewToModelUpdate(n._pendingValue),n._pendingChange=false;}function Bt(n,t){let e=(i,r)=>{t.valueAccessor.writeValue(i),r&&t.viewToModelUpdate(i);};n.registerOnChange(e),t._registerOnDestroy(()=>{n._unregisterOnChange(e);});}function lt(n,t){ye(n,t);}function Gt(n,t){return K(n,t)}function Ut(n,t){if(!n.hasOwnProperty("model"))return  false;let e=n.model;return e.isFirstChange()?true:!Object.is(t,e.currentValue)}function Ht(n){return Object.getPrototypeOf(n.constructor)===ft}function dt(n,t){n._syncPendingControls(),t.forEach(e=>{let i=e.control;i.updateOn==="submit"&&i._pendingChange&&(e.viewToModelUpdate(i._pendingValue),i._pendingChange=false);});}function Lt(n,t){if(!t)return null;let e,i,r;return t.forEach(o=>{o.constructor===ze?e=o:Ht(o)?i=o:r=o;}),r||i||e||null}function Wt(n,t){let e=n.indexOf(t);e>-1&&n.splice(e,1);}var qt={provide:St,useFactory:()=>{let n=E$1(E,{self:true});return {setParseErrors:t=>{n.setParseErrorSource(t);},set onReset(t){n.onReset=t;}}}},E=class extends z{_parent=null;name=null;valueAccessor=null;isCustomControlBased=false;userOnReset;resetSubscription;set onReset(t){this.userOnReset=t,this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.control&&(this.resetSubscription=this.control.events.subscribe(e=>{e instanceof _&&this.control&&this.userOnReset?.(this.control.value);}),this.subscription?.add(this.resetSubscription));}isNativeFormElement=false;rawValueAccessors;_selectedValueAccessor=null;get selectedValueAccessor(){return this._selectedValueAccessor??=Lt(this,this.rawValueAccessors)}parseErrorsValidator=null;renderer;injector;requiredValidatorViaDi;subscription;customControlBindings=null;constructor(t,e,i){super(),this.injector=t,this.renderer=e,this.rawValueAccessors=i,this.injector?.get(je$1)?.onDestroy(()=>{this.removeParseErrorsValidator(this.control),this.subscription?.unsubscribe();});}setupCustomControl(){this.subscription?.unsubscribe();let t=this.injector?.get(zO);if(!this.control||!t)return;let e=t.markForCheck.bind(t);this.subscription=new B,this.subscription.add(this.control.valueChanges.subscribe(e)),this.subscription.add(this.control.statusChanges.subscribe(e)),this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.userOnReset&&(this.resetSubscription=this.control.events.subscribe(i=>{i instanceof _&&this.control&&this.userOnReset?.(this.control.value);}),this.subscription.add(this.resetSubscription)),this.parseErrorsValidator&&this.control.addValidators(this.parseErrorsValidator);}ngControlCreate(t){!t.nativeElement.hasAttribute?.("ngNoCva")&&(this.rawValueAccessors&&this.rawValueAccessors.length>0||this.valueAccessor!==null)||!t.customControl||(this.isCustomControlBased=true,t.listenToCustomControlModel(r=>{this.control?.setValue(r,{emitModelToViewChange:false}),this.control?.markAsDirty(),this.viewToModelUpdate(r);}),t.listenToCustomControlOutput("touch",()=>{this.control?.markAsTouched();}),this.customControlBindings={},this.isNativeFormElement=Ft(t.nativeElement),this.requiredValidatorViaDi=this._rawValidators.find(r=>r instanceof st));}ngControlUpdate(t,e){if(!this.isCustomControlBased)return;let i=this.control,r=this.customControlBindings;Object.is(r.value,i.value)||(r.value=i.value,t.setCustomControlModelInput(i.value)),this.bindControlProperty(t,r,"touched",i.touched),this.bindControlProperty(t,r,"dirty",i.dirty),this.bindControlProperty(t,r,"valid",i.valid),this.bindControlProperty(t,r,"invalid",i.invalid),this.bindControlProperty(t,r,"pending",i.pending),this.bindControlProperty(t,r,"disabled",i.disabled),this.shouldBindRequired&&this.bindControlProperty(t,r,"required",this.isRequired);let o=i.errors;if(r.errors!==o){r.errors=o;let a=this._convertErrors(o);t.setInputOnDirectives("errors",a);}}get isRequired(){return (this.requiredValidatorViaDi?._enabled||this.control?._hasRequired())??false}get shouldBindRequired(){return  true}bindControlProperty(t,e,i,r){if(e[i]===r)return;e[i]=r;let o=t.setInputOnDirectives(i,r);this.isNativeFormElement&&!o&&(i==="disabled"||i==="required")&&this.renderer&&It(this.renderer,t.nativeElement,i,r);}_convertErrors(t){if(t===null)return [];let e=this.control;return Object.entries(t).map(([i,r])=>new le({context:r,kind:i,control:e}))}setParseErrorSource(t){if(t===void 0)return;let e=null,i=ot$1(()=>{let r=t();return r.length===0?null:r.reduce((o,a)=>(o[a.kind]=a,o),{})});this.parseErrorsValidator=(()=>e).bind(this),Ss(()=>{e=i(),this.control?.updateValueAndValidity({emitEvent:false});},{injector:this.injector});}removeParseErrorsValidator(t){this.parseErrorsValidator&&(t?.removeValidators(this.parseErrorsValidator),t?.updateValueAndValidity({emitEvent:false}));}},J=class{_cd;constructor(t){this._cd=t;}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return !!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return !!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return !!this._cd?.control?.invalid}get isPending(){return !!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}};var Dn=(()=>{class n extends J{constructor(e){super(e);}static \u0275fac=function(i){return new(i||n)(ei(E,2))};static \u0275dir=Hv({type:n,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(i,r){i&2&&Pf("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending);},standalone:false,features:[gf]})}return n})(),Mn=(()=>{class n extends J{constructor(e){super(e);}static \u0275fac=function(i){return new(i||n)(ei(f,10))};static \u0275dir=Hv({type:n,selectors:[["","formGroupName",""],["","formArrayName",""],["","ngModelGroup",""],["","formGroup",""],["","formArray",""],["form",3,"ngNoForm",""],["","ngForm",""]],hostVars:16,hostBindings:function(i,r){i&2&&Pf("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending)("ng-submitted",r.isSubmitted);},standalone:false,features:[gf]})}return n})(),F=class extends x{constructor(t,e,i){super(ge(e),ve(i,e)),this.controls=t,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:true,emitEvent:!!this.asyncValidator});}controls;registerControl(t,e){return this.controls[t]?this.controls[t]:(this.controls[t]=e,e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange),e)}addControl(t,e,i={}){this.registerControl(t,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange();}removeControl(t,e={}){this.controls[t]&&this.controls[t]._registerOnCollectionChange(()=>{}),delete this.controls[t],this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange();}setControl(t,e,i={}){this.controls[t]&&this.controls[t]._registerOnCollectionChange(()=>{}),delete this.controls[t],e&&this.registerControl(t,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange();}contains(t){return this.controls.hasOwnProperty(t)&&this.controls[t].enabled}setValue(t,e={}){re(()=>{ot(this,true,t),Object.keys(t).forEach(i=>{rt(this,true,i),this.controls[i].setValue(t[i],{onlySelf:true,emitEvent:e.emitEvent});}),this.updateValueAndValidity(e);});}patchValue(t,e={}){t!=null&&(Object.keys(t).forEach(i=>{let r=this.controls[i];r&&r.patchValue(t[i],{onlySelf:true,emitEvent:e.emitEvent});}),this.updateValueAndValidity(e));}reset(t={},e={}){this._forEachChild((i,r)=>{i.reset(t?t[r]:null,V(j({},e),{onlySelf:true}));}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==false&&this._events.next(new _(this));}getRawValue(){return this._reduceChildren({},(t,e,i)=>(t[i]=e.getRawValue(),t))}_syncPendingControls(){let t=this._reduceChildren(false,(e,i)=>i._syncPendingControls()?true:e);return t&&this.updateValueAndValidity({onlySelf:true}),t}_forEachChild(t){Object.keys(this.controls).forEach(e=>{let i=this.controls[e];i&&t(i,e);});}_setUpControls(){this._forEachChild(t=>{t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange);});}_updateValue(){this.value=this._reduceValue();}_anyControls(t){for(let[e,i]of Object.entries(this.controls))if(this.contains(e)&&t(i))return  true;return  false}_reduceValue(){let t={};return this._reduceChildren(t,(e,i,r)=>((i.enabled||this.disabled)&&(e[r]=i.value),e))}_reduceChildren(t,e){let i=t;return this._forEachChild((r,o)=>{i=e(i,r,o);}),i}_allControlsDisabled(){for(let t of Object.keys(this.controls))if(this.controls[t].enabled)return  false;return Object.keys(this.controls).length>0||this.disabled}_find(t){return this.controls.hasOwnProperty(t)?this.controls[t]:null}};var de=class extends F{};var $t={provide:f,useExisting:Gr(()=>zt)},O=Promise.resolve(),zt=(()=>{class n extends f{callSetDisabledState;get submitted(){return re(this.submittedReactive)}_submitted=ot$1(()=>this.submittedReactive());submittedReactive=_e(false);_directives=new Set;form;ngSubmit=new xe;options;constructor(e,i,r){super(),this.callSetDisabledState=r,this.form=new F({},fe(e),pe(i));}ngAfterViewInit(){this._setUpdateStrategy();}get formDirective(){return this}get control(){return this.form}get path(){return []}get controls(){return this.form.controls}addControl(e){O.then(()=>{let i=this._findContainer(e.path);e.control=i.registerControl(e.name,e.control),e._setupWithForm(this.callSetDisabledState),e.control.updateValueAndValidity({emitEvent:false}),this._directives.add(e);});}getControl(e){return this.form.get(e.path)}removeControl(e){O.then(()=>{this._findContainer(e.path)?.removeControl(e.name),this._directives.delete(e);});}addFormGroup(e){O.then(()=>{let i=this._findContainer(e.path),r=new F({});lt(r,e),i.registerControl(e.name,r),r.updateValueAndValidity({emitEvent:false});});}removeFormGroup(e){O.then(()=>{this._findContainer(e.path)?.removeControl?.(e.name);});}getFormGroup(e){return this.form.get(e.path)}updateModel(e,i){O.then(()=>{this.form.get(e.path).setValue(i);});}setValue(e){this.control.setValue(e);}onSubmit(e){return this.submittedReactive.set(true),dt(this.form,this._directives),this.ngSubmit.emit(e),this.form._events.next(new Z(this.control)),e?.target?.method==="dialog"}onReset(){this.resetForm();}resetForm(e=void 0){this.form.reset(e),this.submittedReactive.set(false);}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn);}_findContainer(e){return e.pop(),e.length?this.form.get(e):this.form}static \u0275fac=function(i){return new(i||n)(ei(Q,10),ei(me,10),ei(te,8))};static \u0275dir=Hv({type:n,selectors:[["form",3,"ngNoForm","",3,"formGroup","",3,"formArray",""],["ng-form"],["","ngForm",""]],hostBindings:function(i,r){i&1&&Nf("submit",function(a){return r.onSubmit(a)})("reset",function(){return r.onReset()});},inputs:{options:[0,"ngFormOptions","options"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:false,features:[GE([$t]),gf]})}return n})();function Ue(n,t){let e=n.indexOf(t);e>-1&&n.splice(e,1);}function He(n){return typeof n=="object"&&n!==null&&Object.keys(n).length===2&&"value"in n&&"disabled"in n}var W=class extends x{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=false;constructor(t=null,e,i){super(ge(e),ve(i,e)),this._applyFormState(t),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:true,emitEvent:!!this.asyncValidator}),ee(e)&&(e.nonNullable||e.initialValueIsDefault)&&(He(t)?this.defaultValue=t.value:this.defaultValue=t);}setValue(t,e={}){re(()=>{this.value=this._pendingValue=t,this._onChange.length&&e.emitModelToViewChange!==false&&this._onChange.forEach(i=>i(this.value,e.emitViewToModelChange!==false)),this.updateValueAndValidity(e);});}patchValue(t,e={}){this.setValue(t,e);}reset(t=this.defaultValue,e={}){this._applyFormState(t),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),e.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=false,e?.emitEvent!==false&&this._events.next(new _(this));}_updateValue(){}_anyControls(t){return  false}_allControlsDisabled(){return this.disabled}registerOnChange(t){this._onChange.push(t);}_unregisterOnChange(t){Ue(this._onChange,t);}registerOnDisabledChange(t){this._onDisabledChange.push(t);}_unregisterOnDisabledChange(t){Ue(this._onDisabledChange,t);}_forEachChild(t){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:true,emitModelToViewChange:false}),true):false}_applyFormState(t){He(t)?(this.value=this._pendingValue=t.value,t.disabled?this.disable({onlySelf:true,emitEvent:false}):this.enable({onlySelf:true,emitEvent:false})):this.value=this._pendingValue=t;}};var Xt=n=>n instanceof W;var wn=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275dir=Hv({type:n,selectors:[["form",3,"ngNoForm","",3,"ngNativeValidate",""]],hostAttrs:["novalidate",""],standalone:false})}return n})();var ce=class extends x{constructor(t,e,i){super(ge(e),ve(i,e)),this.controls=t,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:true,emitEvent:!!this.asyncValidator});}controls;at(t){return this.controls[this._adjustIndex(t)]}push(t,e={}){Array.isArray(t)?t.forEach(i=>{this.controls.push(i),this._registerControl(i);}):(this.controls.push(t),this._registerControl(t)),this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange();}insert(t,e,i={}){this.controls.splice(t,0,e),this._registerControl(e),this.updateValueAndValidity({emitEvent:i.emitEvent});}removeAt(t,e={}){let i=this._adjustIndex(t);i<0&&(i=0),this.controls[i]&&this.controls[i]._registerOnCollectionChange(()=>{}),this.controls.splice(i,1),this.updateValueAndValidity({emitEvent:e.emitEvent});}setControl(t,e,i={}){let r=this._adjustIndex(t);r<0&&(r=0),this.controls[r]&&this.controls[r]._registerOnCollectionChange(()=>{}),this.controls.splice(r,1),e&&(this.controls.splice(r,0,e),this._registerControl(e)),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange();}get length(){return this.controls.length}setValue(t,e={}){re(()=>{ot(this,false,t),t.forEach((i,r)=>{rt(this,false,r),this.at(r).setValue(i,{onlySelf:true,emitEvent:e.emitEvent});}),this.updateValueAndValidity(e);});}patchValue(t,e={}){t!=null&&(t.forEach((i,r)=>{this.at(r)&&this.at(r).patchValue(i,{onlySelf:true,emitEvent:e.emitEvent});}),this.updateValueAndValidity(e));}reset(t=[],e={}){this._forEachChild((i,r)=>{i.reset(t[r],V(j({},e),{onlySelf:true}));}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==false&&this._events.next(new _(this));}getRawValue(){return this.controls.map(t=>t.getRawValue())}clear(t={}){this.controls.length<1||(this._forEachChild(e=>e._registerOnCollectionChange(()=>{})),this.controls.splice(0),this.updateValueAndValidity({emitEvent:t.emitEvent}));}_adjustIndex(t){return t<0?t+this.length:t}_syncPendingControls(){let t=this.controls.reduce((e,i)=>i._syncPendingControls()?true:e,false);return t&&this.updateValueAndValidity({onlySelf:true}),t}_forEachChild(t){this.controls.forEach((e,i)=>{t(e,i);});}_updateValue(){this.value=this.controls.filter(t=>t.enabled||this.disabled).map(t=>t.value);}_anyControls(t){return this.controls.some(e=>e.enabled&&t(e))}_setUpControls(){this._forEachChild(t=>this._registerControl(t));}_allControlsDisabled(){for(let t of this.controls)if(t.enabled)return  false;return this.controls.length>0||this.disabled}_registerControl(t){t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange);}_find(t){return this.at(t)??null}};var Zt=(()=>{class n extends f{callSetDisabledState;get submitted(){return re(this._submittedReactive)}set submitted(e){this._submittedReactive.set(e);}_submitted=ot$1(()=>this._submittedReactive());_submittedReactive=_e(false);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];constructor(e,i,r){super(),this.callSetDisabledState=r,this._setValidators(e),this._setAsyncValidators(i);}ngOnChanges(e){this.onChanges(e);}ngOnDestroy(){this.onDestroy();}onChanges(e){this._checkFormPresent(),e.hasOwnProperty("form")&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form);}onDestroy(){this.form&&(K(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}));}get formDirective(){return this}get path(){return []}addControl(e){let i=this.form.get(e.path);return e._setupWithForm(i,this.callSetDisabledState),i.updateValueAndValidity({emitEvent:false}),this.directives.push(e),i}getControl(e){return this.form.get(e.path)}removeControl(e){Ge(e.control||null,e,false),Wt(this.directives,e);}addFormGroup(e){this._setUpFormContainer(e);}removeFormGroup(e){this._cleanUpFormContainer(e);}getFormGroup(e){return this.form.get(e.path)}getFormArray(e){return this.form.get(e.path)}addFormArray(e){this._setUpFormContainer(e);}removeFormArray(e){this._cleanUpFormContainer(e);}updateModel(e,i){this.form.get(e.path).setValue(i);}onReset(){this.resetForm();}resetForm(e=void 0,i={}){this.form.reset(e,i),this._submittedReactive.set(false);}onSubmit(e){return this.submitted=true,dt(this.form,this.directives),this.ngSubmit.emit(e),this.form._events.next(new Z(this.control)),e?.target?.method==="dialog"}_updateDomValue(){this.directives.forEach(e=>{let i=e.control,r=this.form.get(e.path);i!==r&&(Ge(i||null,e),Xt(r)&&e._setupWithForm(r,this.callSetDisabledState));}),this.form._updateTreeValidity({emitEvent:false});}_setUpFormContainer(e){let i=this.form.get(e.path);lt(i,e),i.updateValueAndValidity({emitEvent:false});}_cleanUpFormContainer(e){let i=this.form?.get(e.path);i&&Gt(i,e)&&i.updateValueAndValidity({emitEvent:false});}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm?._registerOnCollectionChange(()=>{});}_updateValidators(){ye(this.form,this),this._oldForm&&K(this._oldForm,this);}_checkFormPresent(){this.form;}static \u0275fac=function(i){return new(i||n)(ei(Q,10),ei(me,10),ei(te,8))};static \u0275dir=Hv({type:n,features:[gf,lg]})}return n})();var ct=new N("");var Yt={provide:E,useExisting:Gr(()=>Kt)},Kt=(()=>{class n extends E{_ngModelWarningConfig;_added=false;viewModel;control;name=null;set isDisabled(e){}model;update=new xe;static _ngModelWarningSentOnce=false;_ngModelWarningSent=false;constructor(e,i,r,o,a,ht,mt){super(mt,ht,o),this._ngModelWarningConfig=a,this._parent=e,this._setValidators(i),this._setAsyncValidators(r);}_setupWithForm(e,i){this.control=e,this.isCustomControlBased?this.setupCustomControl():(this.valueAccessor??=this.selectedValueAccessor,Rt(e,this,i));}ngOnChanges(e){this._added||this._setUpControl(),Ut(e,this.viewModel)&&(this.viewModel=this.model,this.formDirective.updateModel(this,this.model));}ngOnDestroy(){this.formDirective?.removeControl(this);}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e);}get path(){return Ot(this.name==null?this.name:this.name.toString(),this._parent)}get formDirective(){return this._parent?this._parent.formDirective:null}_setUpControl(){this.control=this.formDirective.addControl(this),this._added=true;}\u0275ngControlCreate(e){super.ngControlCreate(e);}\u0275ngControlUpdate(e){this.isCustomControlBased&&(this._added||this._setUpControl(),super.ngControlUpdate(e,true));}static \u0275fac=function(i){return new(i||n)(ei(f,13),ei(Q,10),ei(me,10),ei($e,10),ei(ct,8),ei(By,8),ei(de$1,8))};static \u0275dir=Hv({type:n,selectors:[["","formControlName",""]],inputs:{name:[0,"formControlName","name"],isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"]},outputs:{update:"ngModelChange"},standalone:false,features:[GE([Yt,qt]),gf,lg,$v(null)]})}return n})();var Jt={provide:f,useExisting:Gr(()=>Qt)},Qt=(()=>{class n extends Zt{form=null;ngSubmit=new xe;get control(){return this.form}static \u0275fac=(()=>{let e;return function(r){return (e||(e=Mg(n)))(r||n)}})();static \u0275dir=Hv({type:n,selectors:[["","formGroup",""]],hostBindings:function(i,r){i&1&&Nf("submit",function(a){return r.onSubmit(a)})("reset",function(){return r.onReset()});},inputs:{form:[0,"formGroup","form"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:false,features:[GE([Jt]),gf]})}return n})();var ut=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=Fv({type:n});static \u0275inj=Qc({})}return n})();function Le(n){return !!n&&(n.asyncValidators!==void 0||n.validators!==void 0||n.updateOn!==void 0)}var xn=(()=>{class n{useNonNullable=false;get nonNullable(){let e=new n;return e.useNonNullable=true,e}group(e,i=null){let r=this._reduceControls(e),o={};return Le(i)?o=i:i!==null&&(o.validators=i.validator,o.asyncValidators=i.asyncValidator),new F(r,o)}record(e,i=null){let r=this._reduceControls(e);return new de(r,i)}control(e,i,r){let o={};return this.useNonNullable?(Le(i)?o=i:(o.validators=i,o.asyncValidators=r),new W(e,V(j({},o),{nonNullable:true}))):new W(e,i,r)}array(e,i,r){let o=e.map(a=>this._createControl(a));return new ce(o,i,r)}_reduceControls(e){let i={};return Object.keys(e).forEach(r=>{i[r]=this._createControl(e[r]);}),i}_createControl(e){if(e instanceof W)return e;if(e instanceof x)return e;if(Array.isArray(e)){let i=e[0],r=e.length>1?e[1]:null,o=e.length>2?e[2]:null;return this.control(i,r,o)}else return this.control(e)}static \u0275fac=function(i){return new(i||n)};static \u0275prov=er({token:n,factory:n.\u0275fac})}return n})();var En=(()=>{class n{static withConfig(e){return {ngModule:n,providers:[{provide:te,useValue:e.callSetDisabledState??ne}]}}static \u0275fac=function(i){return new(i||n)};static \u0275mod=Fv({type:n});static \u0275inj=Qc({imports:[ut]})}return n})(),Fn=(()=>{class n{static withConfig(e){return {ngModule:n,providers:[{provide:ct,useValue:e.warnOnNgModelWithFormControl??"always"},{provide:te,useValue:e.callSetDisabledState??ne}]}}static \u0275fac=function(i){return new(i||n)};static \u0275mod=Fv({type:n});static \u0275inj=Qc({imports:[ut]})}return n})();var en=["*"];var tn=[[["","mat-card-avatar",""],["","matCardAvatar",""]],[["mat-card-title"],["mat-card-subtitle"],["","mat-card-title",""],["","mat-card-subtitle",""],["","matCardTitle",""],["","matCardSubtitle",""]],"*"],nn=["[mat-card-avatar], [matCardAvatar]",`mat-card-title, mat-card-subtitle,
      [mat-card-title], [mat-card-subtitle],
      [matCardTitle], [matCardSubtitle]`,"*"],rn=new N("MAT_CARD_CONFIG"),Bn=(()=>{class n{appearance;constructor(){let e=E$1(rn,{optional:true});this.appearance=e?.appearance||"raised";}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=Pv({type:n,selectors:[["mat-card"]],hostAttrs:[1,"mat-mdc-card","mdc-card"],hostVars:8,hostBindings:function(i,r){i&2&&Pf("mat-mdc-card-outlined",r.appearance==="outlined")("mdc-card--outlined",r.appearance==="outlined")("mat-mdc-card-filled",r.appearance==="filled")("mdc-card--filled",r.appearance==="filled");},inputs:{appearance:"appearance"},exportAs:["matCard"],ngContentSelectors:en,decls:1,vars:0,template:function(i,r){i&1&&(lE(),uE(0));},styles:[`.mat-mdc-card {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  border-style: solid;
  border-width: 0;
  background-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-elevated-container-elevation, var(--mat-sys-level1));
}
.mat-mdc-card::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: solid 1px transparent;
  content: "";
  display: block;
  pointer-events: none;
  box-sizing: border-box;
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
}

.mat-mdc-card-outlined {
  background-color: var(--mat-card-outlined-container-color, var(--mat-sys-surface));
  border-radius: var(--mat-card-outlined-container-shape, var(--mat-sys-corner-medium));
  border-width: var(--mat-card-outlined-outline-width, 1px);
  border-color: var(--mat-card-outlined-outline-color, var(--mat-sys-outline-variant));
  box-shadow: var(--mat-card-outlined-container-elevation, var(--mat-sys-level0));
}
.mat-mdc-card-outlined::after {
  border: none;
}

.mat-mdc-card-filled {
  background-color: var(--mat-card-filled-container-color, var(--mat-sys-surface-container-highest));
  border-radius: var(--mat-card-filled-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-filled-container-elevation, var(--mat-sys-level0));
}

.mdc-card__media {
  position: relative;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.mdc-card__media::before {
  display: block;
  content: "";
}
.mdc-card__media:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
.mdc-card__media:last-child {
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

.mat-mdc-card-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  min-height: 52px;
  padding: 8px;
}

.mat-mdc-card-title {
  font-family: var(--mat-card-title-text-font, var(--mat-sys-title-large-font));
  line-height: var(--mat-card-title-text-line-height, var(--mat-sys-title-large-line-height));
  font-size: var(--mat-card-title-text-size, var(--mat-sys-title-large-size));
  letter-spacing: var(--mat-card-title-text-tracking, var(--mat-sys-title-large-tracking));
  font-weight: var(--mat-card-title-text-weight, var(--mat-sys-title-large-weight));
}

.mat-mdc-card-subtitle {
  color: var(--mat-card-subtitle-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-card-subtitle-text-font, var(--mat-sys-title-medium-font));
  line-height: var(--mat-card-subtitle-text-line-height, var(--mat-sys-title-medium-line-height));
  font-size: var(--mat-card-subtitle-text-size, var(--mat-sys-title-medium-size));
  letter-spacing: var(--mat-card-subtitle-text-tracking, var(--mat-sys-title-medium-tracking));
  font-weight: var(--mat-card-subtitle-text-weight, var(--mat-sys-title-medium-weight));
}

.mat-mdc-card-title,
.mat-mdc-card-subtitle {
  display: block;
  margin: 0;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle {
  padding: 16px 16px 0;
}

.mat-mdc-card-header {
  display: flex;
  padding: 16px 16px 0;
}

.mat-mdc-card-content {
  display: block;
  padding: 0 16px;
}
.mat-mdc-card-content:first-child {
  padding-top: 16px;
}
.mat-mdc-card-content:last-child {
  padding-bottom: 16px;
}

.mat-mdc-card-title-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.mat-mdc-card-avatar {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-bottom: 16px;
  object-fit: cover;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title {
  line-height: normal;
}

.mat-mdc-card-sm-image {
  width: 80px;
  height: 80px;
}

.mat-mdc-card-md-image {
  width: 112px;
  height: 112px;
}

.mat-mdc-card-lg-image {
  width: 152px;
  height: 152px;
}

.mat-mdc-card-xl-image {
  width: 240px;
  height: 240px;
}

.mat-mdc-card-subtitle ~ .mat-mdc-card-title,
.mat-mdc-card-title ~ .mat-mdc-card-subtitle,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-title-group .mat-mdc-card-title,
.mat-mdc-card-title-group .mat-mdc-card-subtitle {
  padding-top: 0;
}

.mat-mdc-card-content > :last-child:not(.mat-mdc-card-footer) {
  margin-bottom: 0;
}

.mat-mdc-card-actions-align-end {
  justify-content: flex-end;
}
`],encapsulation:2})}return n})(),Gn=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275dir=Hv({type:n,selectors:[["mat-card-title"],["","mat-card-title",""],["","matCardTitle",""]],hostAttrs:[1,"mat-mdc-card-title"]})}return n})();var Un=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275dir=Hv({type:n,selectors:[["mat-card-content"]],hostAttrs:[1,"mat-mdc-card-content"]})}return n})();var Hn=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275cmp=Pv({type:n,selectors:[["mat-card-header"]],hostAttrs:[1,"mat-mdc-card-header"],ngContentSelectors:nn,decls:4,vars:0,consts:[[1,"mat-mdc-card-header-text"]],template:function(i,r){i&1&&(lE(tn),uE(0),Wa(1,"div",0),uE(2,1),qa(),uE(3,2));},encapsulation:2})}return n})();var Ln=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=Fv({type:n});static \u0275inj=Qc({imports:[Tn]})}return n})();var $n=(()=>{class n{_animationsDisabled=In();state="unchecked";disabled=false;appearance="full";static \u0275fac=function(i){return new(i||n)};static \u0275cmp=Pv({type:n,selectors:[["mat-pseudo-checkbox"]],hostAttrs:[1,"mat-pseudo-checkbox"],hostVars:12,hostBindings:function(i,r){i&2&&Pf("mat-pseudo-checkbox-indeterminate",r.state==="indeterminate")("mat-pseudo-checkbox-checked",r.state==="checked")("mat-pseudo-checkbox-disabled",r.disabled)("mat-pseudo-checkbox-minimal",r.appearance==="minimal")("mat-pseudo-checkbox-full",r.appearance==="full")("_mat-animation-noopable",r._animationsDisabled);},inputs:{state:"state",disabled:"disabled",appearance:"appearance"},decls:0,vars:0,template:function(i,r){},styles:[`.mat-pseudo-checkbox {
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
`],encapsulation:2})}return n})();export{$n as $,Bn as B,Dn as D,E,Fn as F,Gn as G,Hn as H,Kt as K,Ln as L,Mn as M,Qt as Q,Un as U,zt as a,En as b,se as s,wn as w,xn as x,ze as z};
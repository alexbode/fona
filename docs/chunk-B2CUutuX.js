import {w as wE,u as ml,x as ws,D,C as sr,N,b8 as He,aw as q$1,b5 as bp,b9 as Fi,I as IE,at as aL,a9 as uI,ab as dI,au as Qf,ba as MI,ac as dp,bb as ri,bc as va,bd as oh,be as Hh,a2 as Ye,bf as ih,bg as cl,bh as yh,bi as Ah,bj as Vi,bk as Te,bl as Js,bm as ea,bn as Un,bo as re$1,W as we}from'./main-5RFBPUMP.js';function q(i){return Error(`Unable to find icon with the name "${i}"`)}function Z(){return Error("Could not find HttpClient for use with Angular Material icons. Please add provideHttpClient() to your providers.")}function Y(i){return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${i}".`)}function J(i){return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${i}".`)}var a=class{url;svgText;options;svgElement=null;constructor(l,e,t){this.url=l,this.svgText=e,this.options=t;}},Q=(()=>{class i{_httpClient;_sanitizer;_errorHandler;_document;_svgIconConfigs=new Map;_iconSetConfigs=new Map;_cachedIconsByUrl=new Map;_inProgressUrlFetches=new Map;_fontCssClassesByAlias=new Map;_resolvers=[];_defaultFontSetClass=["material-icons","mat-ligature-font"];constructor(e,t,n,o){this._httpClient=e,this._sanitizer=t,this._errorHandler=o,this._document=n;}addSvgIcon(e,t,n){return this.addSvgIconInNamespace("",e,t,n)}addSvgIconLiteral(e,t,n){return this.addSvgIconLiteralInNamespace("",e,t,n)}addSvgIconInNamespace(e,t,n,o){return this._addSvgIconConfig(e,t,new a(n,null,o))}addSvgIconResolver(e){return this._resolvers.push(e),this}addSvgIconLiteralInNamespace(e,t,n,o){let r=this._sanitizer.sanitize(ri.HTML,n);if(!r)throw J(n);let s=va(r);return this._addSvgIconConfig(e,t,new a("",s,o))}addSvgIconSet(e,t){return this.addSvgIconSetInNamespace("",e,t)}addSvgIconSetLiteral(e,t){return this.addSvgIconSetLiteralInNamespace("",e,t)}addSvgIconSetInNamespace(e,t,n){return this._addSvgIconSetConfig(e,new a(t,null,n))}addSvgIconSetLiteralInNamespace(e,t,n){let o=this._sanitizer.sanitize(ri.HTML,t);if(!o)throw J(t);let r=va(o);return this._addSvgIconSetConfig(e,new a("",r,n))}registerFontClassAlias(e,t=e){return this._fontCssClassesByAlias.set(e,t),this}classNameForFontAlias(e){return this._fontCssClassesByAlias.get(e)||e}setDefaultFontSetClass(...e){return this._defaultFontSetClass=e,this}getDefaultFontSetClass(){return this._defaultFontSetClass}getSvgIconFromUrl(e){let t=this._sanitizer.sanitize(ri.RESOURCE_URL,e);if(!t)throw Y(e);let n=this._cachedIconsByUrl.get(t);return n?oh(k(n)):this._loadSvgIconFromConfig(new a(e,null)).pipe(Hh(o=>this._cachedIconsByUrl.set(t,o)),Ye(o=>k(o)))}getNamedSvgIcon(e,t=""){let n=K(t,e),o=this._svgIconConfigs.get(n);if(o)return this._getSvgFromConfig(o);if(o=this._getIconConfigFromResolvers(t,e),o)return this._svgIconConfigs.set(n,o),this._getSvgFromConfig(o);let r=this._iconSetConfigs.get(t);return r?this._getSvgFromIconSetConfigs(e,r):ih(q(n))}ngOnDestroy(){this._resolvers=[],this._svgIconConfigs.clear(),this._iconSetConfigs.clear(),this._cachedIconsByUrl.clear();}_getSvgFromConfig(e){return e.svgText?oh(k(this._svgElementFromConfig(e))):this._loadSvgIconFromConfig(e).pipe(Ye(t=>k(t)))}_getSvgFromIconSetConfigs(e,t){let n=this._extractIconWithNameFromAnySet(e,t);if(n)return oh(n);let o=t.filter(r=>!r.svgText).map(r=>this._loadSvgIconSetFromConfig(r).pipe(cl(s=>{let m=`Loading icon set URL: ${this._sanitizer.sanitize(ri.RESOURCE_URL,r.url)} failed: ${s.message}`;return this._errorHandler.handleError(new Error(m)),oh(null)})));return yh(o).pipe(Ye(()=>{let r=this._extractIconWithNameFromAnySet(e,t);if(!r)throw q(e);return r}))}_extractIconWithNameFromAnySet(e,t){for(let n=t.length-1;n>=0;n--){let o=t[n];if(o.svgText&&o.svgText.toString().indexOf(e)>-1){let r=this._svgElementFromConfig(o),s=this._extractSvgIconFromSet(r,e,o.options);if(s)return s}}return null}_loadSvgIconFromConfig(e){return this._fetchIcon(e).pipe(Hh(t=>e.svgText=t),Ye(()=>this._svgElementFromConfig(e)))}_loadSvgIconSetFromConfig(e){return e.svgText?oh(null):this._fetchIcon(e).pipe(Hh(t=>e.svgText=t))}_extractSvgIconFromSet(e,t,n){let o=e.querySelector(`[id="${t}"]`);if(!o)return null;let r=o.cloneNode(true);if(r.removeAttribute("id"),r.nodeName.toLowerCase()==="svg")return this._setSvgAttributes(r,n);if(r.nodeName.toLowerCase()==="symbol")return this._setSvgAttributes(this._toSvgElement(r),n);let s=this._svgElementFromString(va("<svg></svg>"));return s.appendChild(r),this._setSvgAttributes(s,n)}_svgElementFromString(e){let t=this._document.createElement("DIV");t.innerHTML=e;let n=t.querySelector("svg");if(!n)throw Error("<svg> tag not found");return n}_toSvgElement(e){let t=this._svgElementFromString(va("<svg></svg>")),n=e.attributes;for(let o=0;o<n.length;o++){let{name:r,value:s}=n[o];r!=="id"&&t.setAttribute(r,s);}for(let o=0;o<e.childNodes.length;o++)e.childNodes[o].nodeType===this._document.ELEMENT_NODE&&t.appendChild(e.childNodes[o].cloneNode(true));return t}_setSvgAttributes(e,t){return e.setAttribute("fit",""),e.setAttribute("height","100%"),e.setAttribute("width","100%"),e.setAttribute("preserveAspectRatio","xMidYMid meet"),e.setAttribute("focusable","false"),t&&t.viewBox&&e.setAttribute("viewBox",t.viewBox),e}_fetchIcon(e){let{url:t,options:n}=e,o=n?.withCredentials??false;if(!this._httpClient)throw Z();if(t==null)throw Error(`Cannot fetch icon from URL "${t}".`);let r=this._sanitizer.sanitize(ri.RESOURCE_URL,t);if(!r)throw Y(t);let s=this._inProgressUrlFetches.get(r);if(s)return s;let d=this._httpClient.get(r,{responseType:"text",withCredentials:o}).pipe(Ye(m=>va(m)),Ah(()=>this._inProgressUrlFetches.delete(r)),Vi());return this._inProgressUrlFetches.set(r,d),d}_addSvgIconConfig(e,t,n){return this._svgIconConfigs.set(K(e,t),n),this}_addSvgIconSetConfig(e,t){let n=this._iconSetConfigs.get(e);return n?n.push(t):this._iconSetConfigs.set(e,[t]),this}_svgElementFromConfig(e){if(!e.svgElement){let t=this._svgElementFromString(e.svgText);this._setSvgAttributes(t,e.options),e.svgElement=t;}return e.svgElement}_getIconConfigFromResolvers(e,t){for(let n=0;n<this._resolvers.length;n++){let o=this._resolvers[n](t,e);if(o)return ee(o)?new a(o.url,null,o.options):new a(o,null)}}static \u0275fac=function(t){return new(t||i)(Te(Js,8),Te(ea),Te(Un,8),Te(He))};static \u0275prov=re$1({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();function k(i){return i.cloneNode(true)}function K(i,l){return i+":"+l}function ee(i){return !!(i.url&&i.options)}var te=["*"],ne=new N("MAT_ICON_DEFAULT_OPTIONS"),oe=new N("mat-icon-location",{providedIn:"root",factory:()=>{let i=D(Un),l=i?i.location:null;return {getPathname:()=>l?l.pathname+l.search:""}}}),X=["clip-path","color-profile","src","cursor","fill","filter","marker","marker-start","marker-mid","marker-end","mask","stroke"],re=X.map(i=>`[${i}]`).join(", "),ie=/^url\(['"]?#(.*?)['"]?\)$/,Ee=(()=>{class i{_elementRef=D(sr);_iconRegistry=D(Q);_location=D(oe);_errorHandler=D(He);_defaultColor;get color(){return this._color||this._defaultColor}set color(e){this._color=e;}_color;inline=false;get svgIcon(){return this._svgIcon}set svgIcon(e){e!==this._svgIcon&&(e?this._updateSvgIcon(e):this._svgIcon&&this._clearSvgElement(),this._svgIcon=e);}_svgIcon;get fontSet(){return this._fontSet}set fontSet(e){let t=this._cleanupFontValue(e);t!==this._fontSet&&(this._fontSet=t,this._updateFontIconClasses());}_fontSet;get fontIcon(){return this._fontIcon}set fontIcon(e){let t=this._cleanupFontValue(e);t!==this._fontIcon&&(this._fontIcon=t,this._updateFontIconClasses());}_fontIcon;_previousFontSetClass=[];_previousFontIconClass;_svgName=null;_svgNamespace=null;_previousPath;_elementsWithExternalReferences;_currentIconFetch=q$1.EMPTY;constructor(){let e=D(new bp("aria-hidden"),{optional:true}),t=D(ne,{optional:true});t&&(t.color&&(this.color=this._defaultColor=t.color),t.fontSet&&(this.fontSet=t.fontSet)),e||this._elementRef.nativeElement.setAttribute("aria-hidden","true");}_splitIconName(e){if(!e)return ["",""];let t=e.split(":");switch(t.length){case 1:return ["",t[0]];case 2:return t;default:throw Error(`Invalid icon name: "${e}"`)}}ngOnInit(){this._updateFontIconClasses();}ngAfterViewChecked(){let e=this._elementsWithExternalReferences;if(e&&e.size){let t=this._location.getPathname();t!==this._previousPath&&(this._previousPath=t,this._prependPathToReferences(t));}}ngOnDestroy(){this._currentIconFetch.unsubscribe(),this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();}_usingFontIcon(){return !this.svgIcon}_setSvgElement(e){this._clearSvgElement();let t=this._location.getPathname();this._previousPath=t,this._cacheChildrenWithExternalReferences(e),this._prependPathToReferences(t),this._elementRef.nativeElement.appendChild(e);}_clearSvgElement(){let e=this._elementRef.nativeElement,t=e.childNodes.length;for(this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();t--;){let n=e.childNodes[t];(n.nodeType!==1||n.nodeName.toLowerCase()==="svg")&&n.remove();}}_updateFontIconClasses(){if(!this._usingFontIcon())return;let e=this._elementRef.nativeElement,t=(this.fontSet?this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/):this._iconRegistry.getDefaultFontSetClass()).filter(n=>n.length>0);this._previousFontSetClass.forEach(n=>e.classList.remove(n)),t.forEach(n=>e.classList.add(n)),this._previousFontSetClass=t,this.fontIcon!==this._previousFontIconClass&&!t.includes("mat-ligature-font")&&(this._previousFontIconClass&&e.classList.remove(this._previousFontIconClass),this.fontIcon&&e.classList.add(this.fontIcon),this._previousFontIconClass=this.fontIcon);}_cleanupFontValue(e){return typeof e=="string"?e.trim().split(" ")[0]:e}_prependPathToReferences(e){let t=this._elementsWithExternalReferences;t&&t.forEach((n,o)=>{n.forEach(r=>{o.setAttribute(r.name,`url('${e}#${r.value}')`);});});}_cacheChildrenWithExternalReferences(e){let t=e.querySelectorAll(re),n=this._elementsWithExternalReferences=this._elementsWithExternalReferences||new Map;for(let o=0;o<t.length;o++)X.forEach(r=>{let s=t[o],d=s.getAttribute(r),m=d?d.match(ie):null;if(m){let _=n.get(s);_||(_=[],n.set(s,_)),_.push({name:r,value:m[1]});}});}_updateSvgIcon(e){if(this._svgNamespace=null,this._svgName=null,this._currentIconFetch.unsubscribe(),e){let[t,n]=this._splitIconName(e);t&&(this._svgNamespace=t),n&&(this._svgName=n),this._currentIconFetch=this._iconRegistry.getNamedSvgIcon(n,t).pipe(Fi(1)).subscribe(o=>this._setSvgElement(o),o=>{let r=`Error retrieving icon ${t}:${n}! ${o.message}`;this._errorHandler.handleError(new Error(r));});}}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=IE({type:i,selectors:[["mat-icon"]],hostAttrs:["role","img",1,"mat-icon","notranslate"],hostVars:10,hostBindings:function(t,n){t&2&&(Qf("data-mat-icon-type",n._usingFontIcon()?"font":"svg")("data-mat-icon-name",n._svgName||n.fontIcon)("data-mat-icon-namespace",n._svgNamespace||n.fontSet)("fontIcon",n._usingFontIcon()?n.fontIcon:null),MI(n.color?"mat-"+n.color:""),dp("mat-icon-inline",n.inline)("mat-icon-no-color",n.color!=="primary"&&n.color!=="accent"&&n.color!=="warn"));},inputs:{color:"color",inline:[2,"inline","inline",aL],svgIcon:"svgIcon",fontSet:"fontSet",fontIcon:"fontIcon"},exportAs:["matIcon"],ngContentSelectors:te,decls:1,vars:0,template:function(t,n){t&1&&(uI(),dI(0));},styles:[`mat-icon, mat-icon.mat-primary, mat-icon.mat-accent, mat-icon.mat-warn {
  color: var(--mat-icon-color, inherit);
}

.mat-icon {
  -webkit-user-select: none;
  user-select: none;
  background-repeat: no-repeat;
  display: inline-block;
  fill: currentColor;
  height: 24px;
  width: 24px;
  overflow: hidden;
}
.mat-icon.mat-icon-inline {
  font-size: inherit;
  height: inherit;
  line-height: inherit;
  width: inherit;
}
.mat-icon.mat-ligature-font[fontIcon]::before {
  content: attr(fontIcon);
}

[dir=rtl] .mat-icon-rtl-mirror {
  transform: scale(-1, 1);
}

.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon {
  display: block;
}
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon {
  margin: auto;
}
`],encapsulation:2})}return i})(),Fe=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=wE({type:i});static \u0275inj=ml({imports:[ws]})}return i})();var Me=(()=>{class i{_animationsDisabled=we();state="unchecked";disabled=false;appearance="full";static \u0275fac=function(t){return new(t||i)};static \u0275cmp=IE({type:i,selectors:[["mat-pseudo-checkbox"]],hostAttrs:[1,"mat-pseudo-checkbox"],hostVars:12,hostBindings:function(t,n){t&2&&dp("mat-pseudo-checkbox-indeterminate",n.state==="indeterminate")("mat-pseudo-checkbox-checked",n.state==="checked")("mat-pseudo-checkbox-disabled",n.disabled)("mat-pseudo-checkbox-minimal",n.appearance==="minimal")("mat-pseudo-checkbox-full",n.appearance==="full")("_mat-animation-noopable",n._animationsDisabled);},inputs:{state:"state",disabled:"disabled",appearance:"appearance"},decls:0,vars:0,template:function(t,n){},styles:[`.mat-pseudo-checkbox {
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
`],encapsulation:2})}return i})();export{Ee as E,Fe as F,Me as M};
"use strict";(self.webpackChunk_teamhanko_docs=self.webpackChunk_teamhanko_docs||[]).push([[691],{3905:(e,n,t)=>{t.d(n,{Zo:()=>m,kt:()=>d});var a=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,a,o=function(e,n){if(null==e)return{};var t,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var s=a.createContext({}),u=function(e){var n=a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},m=function(e){var n=u(e.components);return a.createElement(s.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},c=a.forwardRef((function(e,n){var t=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),c=u(t),d=o,h=c["".concat(s,".").concat(d)]||c[d]||p[d]||r;return t?a.createElement(h,l(l({ref:n},m),{},{components:t})):a.createElement(h,l({ref:n},m))}));function d(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var r=t.length,l=new Array(r);l[0]=c;var i={};for(var s in n)hasOwnProperty.call(n,s)&&(i[s]=n[s]);i.originalType=e,i.mdxType="string"==typeof e?e:o,l[1]=i;for(var u=2;u<r;u++)l[u]=t[u];return a.createElement.apply(null,l)}return a.createElement.apply(null,t)}c.displayName="MDXCreateElement"},5162:(e,n,t)=>{t.d(n,{Z:()=>l});var a=t(7294),o=t(6010);const r="tabItem_Ymn6";function l(e){let{children:n,hidden:t,className:l}=e;return a.createElement("div",{role:"tabpanel",className:(0,o.Z)(r,l),hidden:t},n)}},5488:(e,n,t)=>{t.d(n,{Z:()=>d});var a=t(7462),o=t(7294),r=t(6010),l=t(2389),i=t(7392),s=t(7094),u=t(2466);const m="tabList__CuJ",p="tabItem_LNqP";function c(e){var n,t;const{lazy:l,block:c,defaultValue:d,values:h,groupId:g,className:k}=e,b=o.Children.map(e.children,(e=>{if((0,o.isValidElement)(e)&&"value"in e.props)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),f=null!=h?h:b.map((e=>{let{props:{value:n,label:t,attributes:a}}=e;return{value:n,label:t,attributes:a}})),v=(0,i.l)(f,((e,n)=>e.value===n.value));if(v.length>0)throw new Error('Docusaurus error: Duplicate values "'+v.map((e=>e.value)).join(", ")+'" found in <Tabs>. Every value needs to be unique.');const y=null===d?d:null!=(n=null!=d?d:null==(t=b.find((e=>e.props.default)))?void 0:t.props.value)?n:b[0].props.value;if(null!==y&&!f.some((e=>e.value===y)))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+y+'" but none of its children has the corresponding value. Available values are: '+f.map((e=>e.value)).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");const{tabGroupChoices:N,setTabGroupChoices:w}=(0,s.U)(),[T,C]=(0,o.useState)(y),E=[],{blockElementScrollPositionUntilNextRender:A}=(0,u.o5)();if(null!=g){const e=N[g];null!=e&&e!==T&&f.some((n=>n.value===e))&&C(e)}const O=e=>{const n=e.currentTarget,t=E.indexOf(n),a=f[t].value;a!==T&&(A(n),C(a),null!=g&&w(g,String(a)))},x=e=>{var n;let t=null;switch(e.key){case"ArrowRight":{var a;const n=E.indexOf(e.currentTarget)+1;t=null!=(a=E[n])?a:E[0];break}case"ArrowLeft":{var o;const n=E.indexOf(e.currentTarget)-1;t=null!=(o=E[n])?o:E[E.length-1];break}}null==(n=t)||n.focus()};return o.createElement("div",{className:(0,r.Z)("tabs-container",m)},o.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.Z)("tabs",{"tabs--block":c},k)},f.map((e=>{let{value:n,label:t,attributes:l}=e;return o.createElement("li",(0,a.Z)({role:"tab",tabIndex:T===n?0:-1,"aria-selected":T===n,key:n,ref:e=>E.push(e),onKeyDown:x,onFocus:O,onClick:O},l,{className:(0,r.Z)("tabs__item",p,null==l?void 0:l.className,{"tabs__item--active":T===n})}),null!=t?t:n)}))),l?(0,o.cloneElement)(b.filter((e=>e.props.value===T))[0],{className:"margin-top--md"}):o.createElement("div",{className:"margin-top--md"},b.map(((e,n)=>(0,o.cloneElement)(e,{key:n,hidden:e.props.value!==T})))))}function d(e){const n=(0,l.Z)();return o.createElement(c,(0,a.Z)({key:String(n)},e))}},9169:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>m,contentTitle:()=>s,default:()=>d,frontMatter:()=>i,metadata:()=>u,toc:()=>p});var a=t(7462),o=(t(7294),t(3905)),r=t(5488),l=t(5162);const i={title:"Angular + Hanko",sidebar_label:"Angular",keywords:["angular"],sidebar_custom_props:{docCardIconName:"angular"}},s="Angular",u={unversionedId:"guides/angular",id:"guides/angular",title:"Angular + Hanko",description:"In this guide you will learn how to add authentication to your Angular application using the Hanko custom element.",source:"@site/docs/guides/angular.mdx",sourceDirName:"guides",slug:"/guides/angular",permalink:"/guides/angular",draft:!1,tags:[],version:"current",frontMatter:{title:"Angular + Hanko",sidebar_label:"Angular",keywords:["angular"],sidebar_custom_props:{docCardIconName:"angular"}},sidebar:"docs",previous:{title:"Frontend guides",permalink:"/guides/frontend"},next:{title:"React",permalink:"/guides/react"}},m={},p=[{value:"Install dependencies",id:"install-dependencies",level:2},{value:"Register custom element with Angular",id:"register-custom-element-with-angular",level:2},{value:"Import &amp; use custom element",id:"import--use-custom-element",level:2},{value:"Defining login callbacks",id:"defining-login-callbacks",level:2},{value:"UI customization",id:"ui-customization",level:2},{value:"Backend request authentication",id:"backend-request-authentication",level:2}],c={toc:p};function d(e){let{components:n,...t}=e;return(0,o.kt)("wrapper",(0,a.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"angular"},"Angular"),(0,o.kt)("p",null,"In this guide you will learn how to add authentication to your Angular application using the Hanko custom element."),(0,o.kt)("h2",{id:"install-dependencies"},"Install dependencies"),(0,o.kt)("p",null,"Install the ",(0,o.kt)("inlineCode",{parentName:"p"},"@teamhanko/hanko-elements")," package:"),(0,o.kt)(r.Z,{mdxType:"Tabs"},(0,o.kt)(l.Z,{value:"npm",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"npm install @teamhanko/hanko-elements\n"))),(0,o.kt)(l.Z,{value:"yarn",label:"Yarn",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"yarn add @teamhanko/hanko-elements\n")))),(0,o.kt)("h2",{id:"register-custom-element-with-angular"},"Register custom element with Angular"),(0,o.kt)("p",null,"Angular requires you to explicitly declare that you are using custom elements inside your Angular modules, otherwise\nit will fail during build complaining about unknown elements. To do so, import the\n",(0,o.kt)("a",{parentName:"p",href:"https://angular.io/api/core/CUSTOM_ELEMENTS_SCHEMA"},(0,o.kt)("inlineCode",{parentName:"a"},"CUSTOM_ELEMENTS_SCHEMA")),", and add it to the ",(0,o.kt)("inlineCode",{parentName:"p"},"schemas")," in your\nmodule:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js",metastring:'{1,14} title="app.module.ts" showLineNumbers',"{1,14}":!0,title:'"app.module.ts"',showLineNumbers:!0},"import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';\nimport { BrowserModule } from '@angular/platform-browser';\nimport { AppComponent } from './app.component';\n\n@NgModule({\n  declarations: [\n    AppComponent\n  ],\n  imports: [\n    BrowserModule\n  ],\n  providers: [],\n  bootstrap: [AppComponent],\n  schemas: [CUSTOM_ELEMENTS_SCHEMA]\n})\nexport class AppModule { }\n")),(0,o.kt)("h2",{id:"import--use-custom-element"},"Import & use custom element"),(0,o.kt)("p",null,"Import the ",(0,o.kt)("inlineCode",{parentName:"p"},"register")," function from ",(0,o.kt)("inlineCode",{parentName:"p"},"@teamhanko/hanko-elements/hanko-auth")," in the component where you want to use the\nHanko custom element. Call ",(0,o.kt)("inlineCode",{parentName:"p"},"register")," to register the ",(0,o.kt)("inlineCode",{parentName:"p"},"<hanko-auth>")," element with the browser's\n",(0,o.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/de/docs/Web/API/CustomElementRegistry"},(0,o.kt)("inlineCode",{parentName:"a"},"CustomElementRegistry")),". Then use the\nelement in your component template:"),(0,o.kt)(r.Z,{mdxType:"Tabs"},(0,o.kt)(l.Z,{value:"html",label:"login.component.html",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-html",metastring:'title="login.component.html" showLineNumbers',title:'"login.component.html"',showLineNumbers:!0},'<hanko-auth [api]="hankoApi" [lang]="hankoLang"></hanko-auth>\n'))),(0,o.kt)(l.Z,{value:"ts",label:"login.component.ts",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="login.component.ts" showLineNumbers',title:'"login.component.ts"',showLineNumbers:!0},"import { Component } from '@angular/core';\nimport { environment } from '../../../environments/environment';\nimport { register } from '@teamhanko/hanko-elements/hanko-auth';\n\n@Component({\n  selector: 'app-login',\n  templateUrl: './login.component.html',\n  styleUrls: ['./login.component.css']\n})\nexport class LoginComponent {\n  hankoApi = environment.hankoApi;\n  hankoLang = environment.hankoLang;\n\n  constructor() {\n    // register the component\n    // see: https://github.com/teamhanko/hanko/blob/main/elements/README.md#script\n    register({ shadow: true })\n      .catch((error) => {\n        // handle error\n      });\n  }\n}\n")))),(0,o.kt)("h2",{id:"defining-login-callbacks"},"Defining login callbacks"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"<hanko-auth>")," element dispatches a custom ",(0,o.kt)("inlineCode",{parentName:"p"},"hankoAuthSuccess")," event on successful login. React to this\nevent in order to, for example, redirect your users to protected pages in your application."),(0,o.kt)("p",null,"To do so, you can use Angular's event binding mechanism and supply a callback function that is defined in your component\nclass directly on the ",(0,o.kt)("inlineCode",{parentName:"p"},"<hanko-auth>")," element:"),(0,o.kt)(r.Z,{mdxType:"Tabs"},(0,o.kt)(l.Z,{value:"html",label:"login.component.html",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-html",metastring:'{2} title="login.component.html" showLineNumbers',"{2}":!0,title:'"login.component.html"',showLineNumbers:!0},'<hanko-auth\n  (hankoAuthSuccess)="redirectAfterLogin()"\n  [api]="hankoApi"\n  [lang]="hankoLang">\n</hanko-auth>\n'))),(0,o.kt)(l.Z,{value:"ts",label:"login.component.ts",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js",metastring:'{3,15,24-27} title="login.component.ts" showLineNumbers',"{3,15,24-27}":!0,title:'"login.component.ts"',showLineNumbers:!0},"import { Component } from '@angular/core';\nimport { environment } from '../../../environments/environment';\nimport { Router } from '@angular/router';\nimport { register } from '@teamhanko/hanko-elements/hanko-auth';\n\n@Component({\n  selector: 'app-login',\n  templateUrl: './login.component.html',\n  styleUrls: ['./login.component.css'],\n})\nexport class LoginComponent {\n  hankoApi = environment.hankoApi;\n  hankoLang = environment.hankoLang;\n\n  constructor(private router: Router) {\n    // register the component\n    // see: https://github.com/teamhanko/hanko/blob/main/elements/README.md#script\n    register({ shadow: true })\n      .catch((error) => {\n        // handle error\n      });\n  }\n\n  redirectAfterLogin() {\n    // successfully logged in, redirect to a page in your application\n    this.router.navigate('...');\n  }\n}\n")))),(0,o.kt)("h2",{id:"ui-customization"},"UI customization"),(0,o.kt)("p",null,"The styles of the ",(0,o.kt)("inlineCode",{parentName:"p"},"hanko-auth")," element can be customized using CSS variables and parts. See our guide\non customization ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/teamhanko/hanko/tree/main/elements#ui-customization"},"here"),"."),(0,o.kt)("h2",{id:"backend-request-authentication"},"Backend request authentication"),(0,o.kt)("p",null,"If you want to authenticate requests in your own backend, please view our ",(0,o.kt)("a",{parentName:"p",href:"/guides/backend"},"backend guide"),"."))}d.isMDXComponent=!0}}]);
"use strict";(self.webpackChunkasc_portal=self.webpackChunkasc_portal||[]).push([[218],{8967:function(e,t,r){r.d(t,{r:function(){return u}});var n,a,i=r(2791),o=["title","titleId"];function s(){return s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},s.apply(this,arguments)}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}function c(e,t){var r=e.title,c=e.titleId,u=l(e,o);return i.createElement("svg",s({width:28,height:28,viewBox:"0 0 28 28",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":c},u),r?i.createElement("title",{id:c},r):null,n||(n=i.createElement("circle",{cx:14,cy:14,r:14,fill:"#F0F0F0"})),a||(a=i.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M13.5 14.5V18H14.5V14.5H18V13.5H14.5V10H13.5V13.5H10V14.5H13.5Z",fill:"#BF0C3F"})))}var u=i.forwardRef(c);t.Z=r.p+"static/media/icon_more.30052378d8635eec7ca7d184fa7e58a3.svg"},1277:function(e,t,r){r.d(t,{r:function(){return u}});var n,a,i=r(2791),o=["title","titleId"];function s(){return s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},s.apply(this,arguments)}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}function c(e,t){var r=e.title,c=e.titleId,u=l(e,o);return i.createElement("svg",s({width:18,height:18,viewBox:"0 0 18 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":c},u),r?i.createElement("title",{id:c},r):null,n||(n=i.createElement("circle",{cx:9,cy:9,r:9,fill:"#BB0841"})),a||(a=i.createElement("path",{d:"M12.292 4.24V12.94H9.904L6.424 5.332H6.316V12.94H4.936V4.24H7.336L10.816 11.86H10.912V4.24H12.292Z",fill:"white"})))}var u=i.forwardRef(c);t.Z=r.p+"static/media/icon_new.c93be14f8486a42271202389966a661f.svg"},1790:function(e,t,r){var n=r(1413),a=(r(2791),r(7759)),i=r(184);t.Z=function(e){var t=e.options,r=e.handleChange,o=e.defaultValue,s=e.placeholder,l=e.minHeight,c={control:function(e,t){return(0,n.Z)((0,n.Z)({},e),{},{borderColor:t.isSelected||t.isFocused?"#BB0841":"#D8D8D8",boxShadow:t.isFocused?"0 0 0 2px rgba(255, 0, 0, 0.3)":null,minHeight:"32px",height:l?"32px":null})},option:function(e,t){return(0,n.Z)((0,n.Z)({},e),{},{borderColor:t.isSelected||t.isFocused?"#BB0841":"#D8D8D8",backgroundColor:t.isSelected?"#BB0841":t.isFocused?"#FAF1F4":"white",minHeight:"32px",height:l?"32px":null})}};return(0,i.jsx)(a.ZP,{className:"custom-select",options:t,onChange:r,styles:c,defaultValue:o||null,placeholder:s||null})}},8772:function(e,t,r){r.d(t,{Z:function(){return u}});var n=r(9439),a=r(2791),i=r(7689),o=[{name:"Main",to:"> Support >",path:"react_intranet/"},{name:"ASC Holding Status",to:"> Support > Dashboard >",path:"react_intranet/dashboard/ascholdingstatus"},{name:"Process & FAQ",to:"> Support > Dashboard >",path:"react_intranet/process&support/faq"},{name:"CS Talk",to:"> Support > Board >",path:"react_intranet/board/cstalk"},{name:"FAQ Setting",to:"> Support > Setting & Admin >",path:"react_intranet/setting/faq"}],s=(r(1790),r(5840));var l=r.p+"static/media/icon_home.7bd0665aef435998d5520ed54df43486.svg",c=r(184),u=function(e){var t=e.auth,r=(e.options,e.handleChange,e.searchArea),u=e.onChange,d=e.onClick,m=(0,a.useState)(""),f=(0,n.Z)(m,2),p=f[0],h=f[1],C=(0,i.TH)(),b=(0,a.useState)(""),g=(0,n.Z)(b,2),v=g[0],y=g[1];return(0,a.useEffect)((function(){var e=C.pathname,t=o.find((function(t){return t.path===e}));console.log(e,t),t?(y(t.to),h(t.name)):y("")}),[C]),(0,c.jsxs)("div",{className:"title-wrapper".concat("Main"===p?" title-main-wrapper":r?" title-board-wrapper":""),children:[(0,c.jsx)("div",{className:"title-inner",children:"Main"===p?null:(0,c.jsx)("div",{className:"page-title-area ".concat(r?"":"custom-txt-align"),style:t?null:{textAlign:"center"},children:p})}),(0,c.jsxs)("div",{className:"path-inner".concat(r?" path-column":""),children:[(0,c.jsxs)("div",{className:"page-path-area",children:[(0,c.jsx)("img",{src:l,alt:"home"}),v," ",(0,c.jsx)("p",{className:"bold-title",children:p})]}),t&&r?(0,c.jsx)("div",{className:"title-nav",children:(0,c.jsxs)("div",{className:"custom-flex-item custom-align-item",children:[(0,c.jsx)("p",{children:"\xb7 Search"}),(0,c.jsx)("input",{type:"text",className:"title-nav-input",id:"title-nav-input",onChange:u}),(0,c.jsxs)("button",{className:"title-nav-btn custom-flex-item custom-align-item",onClick:d,children:[" ",(0,c.jsx)(s.r,{})," "]})]})}):null]})]})}},5884:function(e,t,r){r.r(t),r.d(t,{default:function(){return ne}});var n=r(1413),a=r(9439),i=r(2791),o=(r(5013),r(2426)),s=r.n(o),l=r(8772),c=r(7162),u=r(5717),d=(r(3037),r(8688),r(184)),m=i.memo((function(e){var t=e.images,r=e.setting,a=e.setRef,o=e.setIdx,s=(0,n.Z)((0,n.Z)({},r),{},{afterChange:function(e){o&&o(e+1)}}),l=(0,i.useRef)(null);return(0,i.useEffect)((function(){a&&a({slickPrev:function(){l.current.slickPrev()},slickNext:function(){l.current.slickNext()},slickPlay:function(){l.current.slickPlay()},slickPause:function(){l.current.slickPause()},currentSlide:function(){var e;null===(e=l.current)||void 0===e||e.slickCurrentSlide()}})}),[l]),(0,d.jsx)(u.Z,(0,n.Z)((0,n.Z)({},s),{},{ref:l,children:t.map((function(e,t){return(0,d.jsx)("div",{className:"slide-".concat(t+1),children:e},t)}))}))})),f=r(4442),p=r(3880);r(4440);r.p;var h,C,b,g,v,y,j,w,x=["title","titleId"];function N(){return N=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},N.apply(this,arguments)}function I(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}function k(e,t){var r=e.title,n=e.titleId,a=I(e,x);return i.createElement("svg",N({width:45,height:42,viewBox:"0 0 45 42",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":n},a),r?i.createElement("title",{id:n},r):null,h||(h=i.createElement("path",{d:"M36.7314 29.651C36.4508 29.651 36.1744 29.5419 35.9672 29.3324L30.9326 24.2444C30.7297 24.0393 30.6174 23.7644 30.6174 23.472V17.6248C30.6174 15.9229 29.2444 14.5353 27.5604 14.5353H13.3031C12.7072 14.5353 12.2236 14.0466 12.2236 13.4444V5.27128C12.2236 2.3651 14.5639 0 17.4395 0H39.7841C42.6597 0 45 2.3651 45 5.27128V18.0655C45 20.9717 42.6597 23.3368 39.7841 23.3368H37.8152V28.5601C37.8152 29.0008 37.5518 29.3979 37.1502 29.5681C37.0164 29.6248 36.8782 29.651 36.7357 29.651H36.7314ZM32.7763 23.0182L35.652 25.9244V22.2459C35.652 21.6437 36.1356 21.155 36.7314 21.155H39.7798C41.4637 21.155 42.8368 19.7673 42.8368 18.0655V5.27128C42.8368 3.56946 41.4637 2.18182 39.7798 2.18182H17.4352C15.7513 2.18182 14.3782 3.56946 14.3782 5.27128V12.3491H27.5561C30.4318 12.3491 32.772 14.7142 32.772 17.6204V23.0182H32.7763Z",fill:"#3E3A39"})),C||(C=i.createElement("path",{d:"M10.8722 24.2052C10.8722 23.2234 10.0863 22.4336 9.11916 22.4336C8.15197 22.4336 7.36182 23.2278 7.36182 24.2052C7.36182 25.1827 8.14765 25.9769 9.11916 25.9769C10.0907 25.9769 10.8722 25.1827 10.8722 24.2052Z",fill:"#525252"})),b||(b=i.createElement("path",{d:"M10.8722 24.2052C10.8722 23.2234 10.0863 22.4336 9.11916 22.4336C8.15197 22.4336 7.36182 23.2278 7.36182 24.2052C7.36182 25.1827 8.14765 25.9769 9.11916 25.9769C10.0907 25.9769 10.8722 25.1827 10.8722 24.2052Z",fill:"white"})),g||(g=i.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M8.26425 41.9996C8.12608 41.9996 7.98359 41.9734 7.84974 41.9167C7.44819 41.7465 7.1848 41.3494 7.1848 40.9087V35.6854H5.21589C2.34024 35.6854 0 33.3203 0 30.4141V17.6199C0 14.7137 2.34024 12.3486 5.21589 12.3486H27.5604C30.4361 12.3486 32.7763 14.7137 32.7763 17.6199V30.4141C32.7763 33.3203 30.4361 35.6854 27.5604 35.6854H14.9611L9.0285 41.6811C8.82124 41.8905 8.5449 41.9996 8.26425 41.9996ZM2.15889 17.6199C2.15889 15.9181 3.53195 14.5305 5.21589 14.5305V14.5348H27.5561C29.2401 14.5348 30.6131 15.9225 30.6131 17.6243V30.4185C30.6131 32.1203 29.2401 33.5079 27.5561 33.5079H14.5121C14.2228 33.5079 13.9508 33.6214 13.7478 33.8265L9.3437 38.2774V34.5945C9.3437 33.9923 8.8601 33.5036 8.26425 33.5036H5.21589C3.53195 33.5036 2.15889 32.1159 2.15889 30.4141V17.6199Z",fill:"#BF0C3F"})),v||(v=i.createElement("path",{d:"M5.21589 14.5305C3.53195 14.5305 2.15889 15.9181 2.15889 17.6199V30.4141C2.15889 32.1159 3.53195 33.5036 5.21589 33.5036H8.26425C8.8601 33.5036 9.3437 33.9923 9.3437 34.5945V38.2774L13.7478 33.8265C13.9508 33.6214 14.2228 33.5079 14.5121 33.5079H27.5561C29.2401 33.5079 30.6131 32.1203 30.6131 30.4185V17.6243C30.6131 15.9225 29.2401 14.5348 27.5561 14.5348H5.21589V14.5305Z",fill:"#BF0C3F"})),y||(y=i.createElement("path",{d:"M8.096 27.528H6.5V19.62H11.468V20.868H8.096V22.848H11.228V24.072H8.096V27.528Z",fill:"white"})),j||(j=i.createElement("path",{d:"M17.4876 27.528L16.8156 25.476H13.8636L13.2036 27.528H11.5236L14.3676 19.62H16.4676L19.2276 27.528H17.4876ZM15.3156 20.844L14.2836 24.216H16.4076L15.4116 20.844H15.3156Z",fill:"white"})),w||(w=i.createElement("path",{d:"M19.9517 23.556C19.9517 22.18 20.2517 21.16 20.8517 20.496C21.4597 19.832 22.4077 19.5 23.6957 19.5C24.3437 19.5 24.8877 19.596 25.3277 19.788C25.7757 19.972 26.1357 20.244 26.4077 20.604C26.6797 20.956 26.8717 21.388 26.9837 21.9C27.1037 22.412 27.1637 22.988 27.1637 23.628C27.1637 24.436 27.0437 25.104 26.8037 25.632C26.5637 26.152 26.2557 26.564 25.8797 26.868L25.7597 26.964L27.3677 28.416L26.1437 29.256L24.4397 27.54C24.2637 27.58 24.0877 27.608 23.9117 27.624C23.7437 27.648 23.5757 27.66 23.4077 27.66C22.7677 27.66 22.2277 27.568 21.7877 27.384C21.3477 27.192 20.9917 26.92 20.7197 26.568C20.4477 26.208 20.2517 25.776 20.1317 25.272C20.0117 24.768 19.9517 24.196 19.9517 23.556ZM25.5077 23.472C25.5077 23.096 25.4797 22.74 25.4237 22.404C25.3757 22.068 25.2837 21.776 25.1477 21.528C25.0197 21.272 24.8397 21.072 24.6077 20.928C24.3757 20.776 24.0797 20.7 23.7197 20.7C23.3117 20.7 22.9677 20.768 22.6877 20.904C22.4157 21.032 22.1957 21.224 22.0277 21.48C21.8597 21.728 21.7397 22.036 21.6677 22.404C21.6037 22.772 21.5717 23.196 21.5717 23.676C21.5717 24.068 21.5957 24.432 21.6437 24.768C21.6997 25.104 21.7957 25.396 21.9317 25.644C22.0677 25.892 22.2517 26.088 22.4837 26.232C22.7157 26.376 23.0117 26.448 23.3717 26.448C23.7877 26.448 24.1317 26.388 24.4037 26.268C24.6837 26.14 24.9037 25.952 25.0637 25.704C25.2237 25.448 25.3357 25.136 25.3997 24.768C25.4717 24.4 25.5077 23.968 25.5077 23.472Z",fill:"white"})))}var A,S,E,H,_,O,Z=i.forwardRef(k),V=(r.p,["title","titleId"]);function T(){return T=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},T.apply(this,arguments)}function D(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}function L(e,t){var r=e.title,n=e.titleId,a=D(e,V);return i.createElement("svg",T({width:41,height:41,viewBox:"0 0 41 41",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":n},a),r?i.createElement("title",{id:n},r):null,A||(A=i.createElement("path",{d:"M37.6149 34.913C37.021 34.913 36.5413 34.431 36.5413 33.8343V13.2195C36.5413 11.8975 35.4724 10.8234 34.1567 10.8234H9.25048C7.93481 10.8234 6.86584 11.8975 6.86584 13.2195V33.8297C6.86584 34.4264 6.38617 34.9084 5.79229 34.9084C5.19842 34.9084 4.71875 34.4264 4.71875 33.8297V13.2195C4.71875 10.7087 6.75163 8.66602 9.25048 8.66602H34.1613C36.6601 8.66602 38.693 10.7087 38.693 13.2195V33.8297C38.693 34.4264 38.2133 34.9084 37.6194 34.9084",fill:"#494949"})),S||(S=i.createElement("path",{d:"M36.3312 40.9995H7.076C4.50406 40.9995 2.40723 38.8972 2.40723 36.3083V34.0728C2.40723 33.4761 2.8869 32.9941 3.48077 32.9941H39.9264C40.5203 32.9941 41 33.4761 41 34.0728V36.3083C41 38.8972 38.9077 40.9995 36.3312 40.9995ZM4.55888 35.147V36.3083C4.55888 37.7037 5.69181 38.8421 7.08057 38.8421H36.3312C37.72 38.8421 38.8529 37.7037 38.8529 36.3083V35.147H4.55431H4.55888Z",fill:"#494949"})),E||(E=i.createElement("path",{d:"M12.8592 1.0791C6.3677 1.0791 1.10048 6.09623 1.10048 12.2793C1.10048 14.9692 2.09636 17.4387 3.75921 19.3712C3.0694 20.1332 2.18773 20.8263 1.07764 21.2119C1.07764 21.2119 3.27498 24.0395 7.75645 22.3778C9.30053 23.0847 11.0319 23.4841 12.8592 23.4841C19.3553 23.4841 24.6225 18.4669 24.6225 12.2839C24.6225 6.10082 19.3553 1.0791 12.8592 1.0791Z",fill:"#BB0841"})),H||(H=i.createElement("path",{d:"M12.8594 24.5624C11.0687 24.5624 9.3373 24.2181 7.711 23.5341C6.79734 23.8325 5.90653 23.9794 5.05226 23.9794C1.90016 23.9794 0.296693 21.9643 0.228168 21.8771C0.0134596 21.6017 -0.0550645 21.239 0.0454375 20.9085C0.145939 20.5734 0.397195 20.3072 0.72611 20.197C1.28344 20.0043 1.81336 19.6967 2.3113 19.2836C0.831181 17.2318 0.0271644 14.7852 0.0271644 12.2789C0.0271644 5.50829 5.78319 0 12.8594 0C19.9357 0 25.6917 5.50829 25.6917 12.2789C25.6917 19.0495 19.9357 24.5578 12.8594 24.5578M7.75668 21.2941C7.90743 21.2941 8.06276 21.3262 8.20437 21.3905C9.66165 22.0607 11.2286 22.4004 12.8594 22.4004C18.7525 22.4004 23.5492 17.8606 23.5492 12.2789C23.5492 6.69716 18.7525 2.15741 12.8594 2.15741C6.96637 2.15741 2.17425 6.69716 2.17425 12.2789C2.17425 14.6015 3.02395 16.8691 4.5726 18.6685C4.92892 19.0816 4.91978 19.6967 4.55432 20.0961C4.0975 20.6056 3.60412 21.0371 3.08334 21.3905C3.58128 21.6246 4.23454 21.8174 5.05226 21.8174C5.78319 21.8174 6.56436 21.6613 7.38665 21.3584C7.50543 21.3125 7.63334 21.2895 7.75668 21.2895",fill:"#BB0841"})),_||(_=i.createElement("path",{d:"M17.8937 11.2414H7.80694C7.21307 11.2414 6.7334 10.7594 6.7334 10.1627C6.7334 9.56596 7.21307 9.08398 7.80694 9.08398H17.8937C18.4876 9.08398 18.9672 9.56596 18.9672 10.1627C18.9672 10.7594 18.4876 11.2414 17.8937 11.2414Z",fill:"white"})),O||(O=i.createElement("path",{d:"M17.8937 16.9797H7.80694C7.21307 16.9797 6.7334 16.4977 6.7334 15.901C6.7334 15.3042 7.21307 14.8223 7.80694 14.8223H17.8937C18.4876 14.8223 18.9672 15.3042 18.9672 15.901C18.9672 16.4977 18.4876 16.9797 17.8937 16.9797Z",fill:"white"})))}var P=i.forwardRef(L),F=(r.p,r(1277)),M=r(8967);r.p;var B,R=["title","titleId"];function q(){return q=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},q.apply(this,arguments)}function G(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}function Q(e,t){var r=e.title,n=e.titleId,a=G(e,R);return i.createElement("svg",q({width:23,height:13,viewBox:"0 0 23 13",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":n},a),r?i.createElement("title",{id:n},r):null,B||(B=i.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M22.99 11.9551V0H0V12.2884C0.541202 12.4619 1.08798 12.623 1.64 12.7712V1.64H21.34V12.493C21.8958 12.3266 22.4459 12.1472 22.99 11.9551ZM19.7 9.86H3.28V11.5H19.7V9.86ZM19.7 4.93H3.28V6.57H19.7V4.93Z",fill:"white",fillOpacity:.2})))}var Y=i.forwardRef(Q);r.p;var U=r.p+"static/media/banner_1.ecb70e4087470d5595b1e04998eba1f5.svg";var J=r.p+"static/media/banner_2.6ee1cb9dfacfc7a0a8a4c6d3ccb7a784.svg";var $=r.p+"static/media/icon_mainprev.4a0e417a20bc3c078b79b0f3d8cc0c20.svg";var W=r.p+"static/media/icon_mainnext.65af5194fb48d1ce16c90016b81ce057.svg";var z=r.p+"static/media/icon_bannerpause.8a28f5d3cab8b8562f79bf194fefc9b7.svg";var K=r.p+"static/media/icon_bannerplay.a06952d78f04b24cec1a2c2e564b2e09.svg";var X=r.p+"static/media/icon_bannerprev.d4840243909bc64961c22b066f35fceb.svg";var ee=r.p+"static/media/icon_bannernext.779e131b9ec3bffa19244fc1a1fe42b8.svg",te=r(8859),re=r(2903);var ne=function(){var e=[{parentCategoryName:null,subject:" Which reporting convention does LGE use when posting its financial information?",orderNum:2,likeCount:0,categoryName:"Support",categoryId:"1687935618_26f",categoryTree:"Support",createdAt:"2023-06-29T02:31:44.000+00:00",faqId:"1687935618_23f",hits:42,rn:1,subsidiary:"EAI",writerID:"connie_lee",writerName:"connie",top5ListId:"top1"},{parentCategoryName:null,subject:"R007 \u2013 Used Parts Q\u2019ty larger than available",orderNum:2,likeCount:2,categoryName:"Support",categoryId:"1687935618_26f",categoryTree:"Support",createdAt:"2023-06-29T02:31:44.000+00:00",faqId:"1687935618_24f",hits:42,rn:2,subsidiary:"EAI",writerID:"donnie_lee",writerName:"donnie",top5ListId:"top2"},{parentCategoryName:null,subject:"How to deal with the shortage of parts in hollydays.",orderNum:2,likeCount:0,categoryName:"Delivery",categoryId:"1687935618_28f",categoryTree:"Delivery",createdAt:"2023-06-29T02:31:44.000+00:00",faqId:"1687935618_25f",hits:42,rn:3,subsidiary:"EAI",writerID:"donnie_lee",writerName:"donnie",top5ListId:""},{parentCategoryName:null,subject:"How to assume your incentive rates for the last quarter.",orderNum:2,likeCount:1,categoryName:"Finance",categoryId:"1687935618_29f",categoryTree:"Finance",createdAt:"2023-06-29T02:31:44.000+00:00",faqId:"1687935618_26f",hits:42,rn:4,subsidiary:"EAI",writerID:"fonnie_lee",writerName:"fonnie",top5ListId:"top3"},{parentCategoryName:null,subject:"If damage found for new parts",orderNum:2,likeCount:0,categoryName:"Support",categoryId:"1687935618_26f",categoryTree:"Support",createdAt:"2023-06-29T02:31:44.000+00:00",faqId:"1687935618_27f",hits:42,rn:5,subsidiary:"EAI",writerID:"bonnie_lee",writerName:"bonnie",top5ListId:""},{parentCategoryName:null,subject:"Easy way to finish hold status job",orderNum:2,likeCount:0,categoryName:"Process",categoryId:"1687935618_27f",categoryTree:"Process",createdAt:"2023-06-29T02:31:44.000+00:00",faqId:"1687935618_28f",hits:42,rn:6,subsidiary:"EAI",writerID:"donnie_lee",writerName:"donnie",top5ListId:""},{parentCategoryName:"Hold",subject:"Supports for engineers",orderNum:2,likeCount:0,categoryName:"Support",categoryId:"1687935618_26f",categoryTree:"Support",createdAt:"2023-06-29T02:31:44.000+00:00",faqId:"1687935618_29f",hits:42,rn:7,subsidiary:"EAI",writerID:"donnie_lee",writerName:"donnie",top5ListId:"top4"},{parentCategoryName:null,subject:"R007 \u2013 Used Parts Q\u2019ty larger than available",orderNum:2,likeCount:0,categoryName:"Standard",categoryId:"1687935618_35f",categoryTree:"Standard",createdAt:"2023-07-29T02:31:44.000+00:00",faqId:"1687935618_35f",hits:42,rn:8,subsidiary:"EAI",writerID:"donnie_lee",writerName:"donnie",top5ListId:"top5"},{parentCategoryName:null,subject:"Stock options for DN group members.",orderNum:2,likeCount:0,categoryName:"Standard",categoryId:"1687935618_35f",categoryTree:"Standard",createdAt:"2023-07-29T02:31:44.000+00:00",faqId:"1687935618_31f",hits:42,rn:9,subsidiary:"EAI",writerID:"donnie_lee",writerName:"donnie",top5ListId:""},{parentCategoryName:null,subject:"How to handle ETA for the parts",orderNum:2,likeCount:0,categoryName:"Delivery",categoryId:"1687935618_28f",categoryTree:"Delivery",createdAt:"2023-07-30T02:31:44.000+00:00",faqId:"1687935618_32f",hits:42,rn:10,subsidiary:"EAI",writerID:"donnie_lee",writerName:"donnie",top5ListId:""}],t=[{parentCategoryName:null,subject:"Best way to conceive customers",orderNum:2,likeCount:0,createdAt:"2023-06-29T02:31:44.000+00:00",cstalkId:"1687935618_23f",hits:12,rn:1,subsidiary:"EAI",writerID:"Charie",writerName:"Charie",commentCount:0,content:"<div><h1>1. Ask your customer to respond for customers' evaluation link.</p></div>",isPublic:"All",attachments:[]},{parentCategoryName:null,subject:"Benefits for the staff who worked in holidays.",orderNum:2,likeCount:2,createdAt:"2023-06-29T02:31:44.000+00:00",cstalkId:"1687935618_24f",hits:42,rn:2,subsidiary:"EAI",writerID:"New York",writerName:"New York",commentCount:1,content:"<div><h1>1. Ask your customer to respond for customers' evaluation link.</p></div>",isPublic:"All",attachments:[]},{parentCategoryName:null,subject:"Are you sure it's unavailable?",orderNum:2,likeCount:0,createdAt:"2023-06-29T02:31:44.000+00:00",cstalkId:"1687935618_25f",hits:42,rn:3,subsidiary:"EAI",writerID:"Simson",writerName:"Simson",commentCount:0,content:"<div><h1>1. Ask your customer to respond for customers' evaluation link.</p></div>",isPublic:"All",attachments:[]},{parentCategoryName:null,subject:"New option for damaged goods.",orderNum:2,likeCount:1,createdAt:"2023-06-29T02:31:44.000+00:00",cstalkId:"1687935618_26f",hits:42,rn:4,subsidiary:"EAI",writerID:"Anna",writerName:"Anna",commentCount:1,content:"<div><h1>1. Ask your customer to respond for customers' evaluation link.</p></div>",isPublic:"All",attachments:[]},{parentCategoryName:null,subject:"Contorl tower would shut down in holidays.",orderNum:2,likeCount:0,createdAt:"2023-06-29T02:31:44.000+00:00",cstalkId:"1687935618_27f",hits:42,rn:5,subsidiary:"EAI",writerID:"Jennie",writerName:"Jennie",top5ListId:"",commentCount:2,content:"<div><h1>1. Ask your customer to respond for customers' evaluation link.</p></div>",isPublic:"All",attachments:[]},{parentCategoryName:null,subject:"If you can't access your account on mobile.",orderNum:2,likeCount:0,createdAt:"2023-06-29T02:31:44.000+00:00",cstalkId:"1687935618_28f",hits:42,rn:6,subsidiary:"EAI",writerID:"donnie_lee",writerName:"donnie",top5ListId:"",commentCount:3,content:"<div><h1>1. Ask your customer to respond for customers' evaluation link.</p></div>",isPublic:"All",attachments:[]},{parentCategoryName:"Hold",subject:"If you can't get any respond from origin whene there is a shipping issue.",orderNum:2,likeCount:0,createdAt:"2023-06-29T02:31:44.000+00:00",cstalkId:"1687935618_29f",hits:42,rn:7,subsidiary:"EAI",writerID:"donnie_lee",writerName:"donnie",top5ListId:"top4",commentCount:2,content:"<div><h1>1. Ask your customer to respond for customers' evaluation link.</p></div>",isPublic:"All",attachments:[]},{parentCategoryName:null,subject:"Return or discard damaged parts ?",orderNum:2,likeCount:0,createdAt:"2023-07-29T02:31:44.000+00:00",cstalkId:"1687935618_30f",hits:42,rn:8,subsidiary:"EAI",writerID:"donnie_lee",writerName:"donnie",top5ListId:"top5",commentCount:2,content:"<div><h1>1. Ask your customer to respond for customers' evaluation link.</p></div>",isPublic:"All",attachments:[]},{parentCategoryName:null,subject:"Urgent cases handling instrunction.",orderNum:2,likeCount:0,createdAt:"2023-07-29T02:31:44.000+00:00",cstalkId:"1687935618_31f",hits:42,rn:9,subsidiary:"EAI",writerID:"donnie_lee",writerName:"donnie",top5ListId:"",commentCount:1,content:"<div><h1>1. Ask your customer to respond for customers' evaluation link.</p></div>",isPublic:"All",attachments:[]},{parentCategoryName:null,subject:"If customers ask some reward for pendings.",orderNum:2,likeCount:0,categoryName:"Installation",cstalkId:"1687935618_32f",hits:42,rn:10,subsidiary:"EAI",writerID:"donnie_lee",writerName:"donnie",top5ListId:"",commentCount:0,content:"<div><h1>1. Ask your customer to respond for customers' evaluation link.</p></div>",isPublic:"All",attachments:[]}],r=(0,i.useContext)(p.S),n=(0,i.useState)(""),o=(0,a.Z)(n,2),u=(o[0],o[1],(0,i.useState)({isViewer:"SA"!==r.role})),h=(0,a.Z)(u,2),C=h[0];h[1],(0,i.useEffect)((function(){console.log("login user",r),C.isViewer||(alert("No right to Access"),document.location.href="/login")}),[]);var b=(0,i.useState)([(0,d.jsx)("img",{src:U,alt:"banner"}),(0,d.jsx)("img",{src:J,alt:"banner"})]),g=(0,a.Z)(b,2),v=g[0],y=(g[1],(0,i.useState)()),j=(0,a.Z)(y,2),w=j[0],x=j[1],N=(0,i.useState)(!0),I=(0,a.Z)(N,2),k=I[0],A=I[1],S=(0,i.useState)(1),E=(0,a.Z)(S,2),H=E[0],_=E[1],O=function(e){console.log(e),window.location.assign("https://ddonniee.github.io/react_intranet"+e)},V=(0,i.useState)({page:1,type:"N"}),T=(0,a.Z)(V,2),D=(T[0],T[1],(0,i.useState)([])),L=(0,a.Z)(D,2),B=(L[0],L[1],(0,i.useState)({page:1,type:"F"})),R=(0,a.Z)(B,2),q=(R[0],R[1],(0,i.useState)({page:1})),G=(0,a.Z)(q,2),Q=(G[0],G[1],t.map((function(e,t){return(0,d.jsxs)("div",{className:"list-slider",children:[(0,d.jsxs)("div",{className:"top",children:[(0,d.jsxs)("div",{className:"circle",children:[(0,d.jsx)("p",{className:"day",children:s()(e.createdAt).format("DD")}),(0,d.jsx)("p",{className:"month",children:s()(e.createdAt).format("YYYY.MM")}),(0,d.jsx)(Y,{})]}),(0,d.jsx)("div",{className:"mainlist",onClick:function(){return O("/board/cstalk")},children:(0,d.jsx)("p",{className:"bold",children:e.subject.length>80?e.subject.substr(0,80)+"...":e.subject})})]}),(0,d.jsx)("div",{className:"bottom",children:(0,d.jsx)("div",{className:"content",children:(0,d.jsx)("div",{className:"mainlist",onClick:function(){return O("/board/cstalk")},children:(0,d.jsx)("p",{className:"normal",children:"GSFS Information \u2013 LED Arra Rank Collection time of GSFS Information \u2013 LED GSFS Information \u2013 LED Arra Rank Collection time of GSFS Information \u2013 LED GSFS Information \u2013 LED Arra Rank Collection time of GSFS Information \u2013 LED GSFS Information \u2013 LED Arra Rank Collection time of GSFS Information \u2013 LED"})})})})]},e.csTalkId)}))),ne=function(e){e.className,e.style;var t=e.onClick;return(0,d.jsx)("span",{className:"slider-btn-prev",style:{position:"absolute",top:110,left:-40},children:(0,d.jsx)("img",{src:$,alt:"prev",style:{width:"38px",height:"38px"},onClick:t})})},ae=function(e){e.className,e.style;var t=e.onClick;return(0,d.jsx)("div",{className:"slider-btn-next",style:{position:"absolute",top:110,right:-40},children:(0,d.jsx)("img",{src:W,alt:"next",style:{width:"38px",height:"38px"},onClick:t})})},ie={dots:!1,arrow:!0,infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1,autoplay:!0,prevArrow:(0,d.jsx)(ne,{}),nextArrow:(0,d.jsx)(ae,{})},oe=(0,i.useState)(!1),se=(0,a.Z)(oe,2),le=se[0],ce=se[1],ue=(0,i.useState)({alertTxt:"",onConfirm:function(){},isDoubleBtn:!1,btnTxt:"Close",confirmTxt:""}),de=(0,a.Z)(ue,2),me=de[0],fe=de[1];return(0,i.useEffect)((function(){le||fe({alertTxt:"",onConfirm:function(){},isDoubleBtn:!1,btnTxt:"Close",confirmTxt:""})}),[le]),(0,i.useEffect)((function(){""!==me.alertTxt?ce(!0):ce(!1)}),[me]),(0,i.useEffect)((function(){console.log("%$#%$@%",t)}),[t]),(0,d.jsxs)("div",{className:"main-container",children:[(0,d.jsx)(re.Z,{}),(0,d.jsxs)("div",{className:"inner-container",children:[(0,d.jsx)(l.Z,{auth:1,searchArea:!1}),(0,d.jsxs)("div",{className:"banner",children:[(0,d.jsx)(m,{images:v,setting:{dots:!0,arrow:!1,infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1,autoplay:!0},setRef:x,setIdx:_}),(0,d.jsxs)("div",{className:"banner-btn",children:[(0,d.jsxs)("p",{className:"banner-index",children:[(0,d.jsx)("span",{children:"0".concat(H)})," / 0".concat(v.length)]}),(0,d.jsx)("img",{src:X,alt:"prev",onClick:function(){w.slickPrev()}}),k?(0,d.jsx)("img",{src:z,alt:"pause",onClick:function(){w.slickPause(),A(!1)}}):(0,d.jsx)("img",{src:K,alt:"play",onClick:function(){w.slickPlay(),A(!0)}}),(0,d.jsx)("img",{src:ee,alt:"next",onClick:function(){w.slickNext()}})]})]}),(0,d.jsxs)("div",{className:"card",children:[(0,d.jsxs)("div",{className:"card-faq",children:[(0,d.jsxs)("div",{className:"title",children:[(0,d.jsxs)("p",{className:"sub-title",children:[(0,d.jsx)(Z,{})," FAQ"]}),(0,d.jsx)(M.r,{className:"moreicon",onClick:function(){return O("/process&support/faq")}})]}),(0,d.jsx)("div",{className:"list",children:e.length>0&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("div",{className:"mainlist",onClick:function(){return O("/process&support/faq")},children:(0,d.jsxs)("p",{className:"bold",children:[e[0].subject.length>80?e[0].subject.substr(0,80)+"...":e[0].subject,e[0].new?(0,d.jsx)(F.r,{className:"newicon"}):null]})}),(0,d.jsx)("ul",{className:"sublist",children:e.slice(1,e.length).map((function(e,t){if(t<5)return(0,d.jsxs)("li",{onClick:function(){return O("/process&support/faq")},children:[(0,d.jsxs)("span",{className:"qst-no",children:[" Q 0",t+1," "]}),(0,d.jsxs)("p",{children:[" ",e.subject.length>70?e.subject.substr(0,70)+"...":e.subject," "]})]},e.faqId)}))})]})})]}),(0,d.jsxs)("div",{className:"card-cstalk",children:[(0,d.jsxs)("div",{className:"title",children:[(0,d.jsxs)("p",{className:"sub-title",children:[(0,d.jsx)(P,{})," CS Talk"]}),(0,d.jsx)(M.r,{className:"moreicon",onClick:function(){return O("/board/cstalk")}})]}),(0,d.jsx)("div",{className:"list",children:(0,d.jsx)(m,{images:Q,setting:ie})})]})]})]}),le&&(0,d.jsx)(f.Z,{alertTxt:me.alertTxt,onClose:function(){return ce(!1)},onConfirm:me.onConfirm,twoBtn:me.isDoubleBtn,btnTxt:me.btnTxt}),(0,d.jsx)(te.Z,{}),(0,d.jsx)(c.Z,{})]})}}}]);
//# sourceMappingURL=218.d4e26753.chunk.js.map
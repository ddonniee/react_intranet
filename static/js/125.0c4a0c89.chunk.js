(self.webpackChunkasc_portal=self.webpackChunkasc_portal||[]).push([[125],{7501:function(e,t,n){"use strict";n(2791);t.Z=n.p+"static/media/icon_attachment.53522f35c18f2fe84e8d87441f9b1205.svg"},6045:function(e,t,n){"use strict";n(2791);t.Z=n.p+"static/media/icon_close2.18a7ee5e68b27cb1f4fb7f930adfbe96.svg"},4507:function(e,t,n){"use strict";n(2791);t.Z=n.p+"static/media/icon_co_close.e0a854946430f372763476b74426ffe1.svg"},6424:function(e,t,n){"use strict";n(2791);t.Z=n.p+"static/media/icon_co_comment.8d59d253f979da3603368063d8c4a346.svg"},298:function(e,t,n){"use strict";n(2791);t.Z=n.p+"static/media/icon_co_more.4db2803d05ba117721190b1fff6a3cac.svg"},5528:function(e,t,n){"use strict";n(2791);t.Z=n.p+"static/media/icon_download.158a6b470e99465c37af7f11e4290096.svg"},1086:function(e,t,n){"use strict";n(2791);t.Z=n.p+"static/media/icon_screen.57e8416b1a576e1fc4f2f47912d3af73.svg"},9554:function(e,t,n){"use strict";n(2791);var o=n(6584),i=n(2443),a=n.n(i),s=(n(4252),n(184));t.Z=function(e){var t=e.content;return(0,s.jsx)(o.CKEditor,{disabled:!0,editor:a(),data:t})}},4187:function(e,t,n){"use strict";var o,i=n(168),a=(n(2791),n(9256)),s=n(184);t.Z=function(e){var t=e.text,n=e.onClose;return setTimeout((function(){n(!1)}),[3e3]),(0,s.jsx)(r,{children:(0,s.jsx)("div",{className:"modal",children:(0,s.jsx)("div",{className:"timeout-modal",children:(0,s.jsx)("span",{children:t})})})})};var r=a.ZP.div(o||(o=(0,i.Z)(["\n    .timeout-modal {\n        background : black; padding: 10px 15px; border-radius: 10px;\n        span {\n            color: white; font-size: 1.2rem; font-weight: 600;\n        }\n    }\n"])))},2294:function(e,t,n){"use strict";var o=n(3433),i=n(4942),a=n(1413),s=n(9439),r=n(2791),l=n(3880),c=n(3637),d=n(5013),m=n(6045),u=n(1086),h=n(7501),p=n(5528),g=n(298),f=n(4507),x=n(4081),_=n(9985),b=n(8673),T=n(9198),C=n(2426),v=n.n(C),R=n(9554),E=n(4442),S=n(4187),j=n(184);t.Z=function(e){var t=(0,r.useContext)(l.S),n=e.data,C=e.onClose,L=e.onMinimizing,P=e.page;console.log("dddddddddddddddddddddddd",n);var N="".concat(P,"Id"),A=(0,r.useState)(n),D=(0,s.Z)(A,2),w=D[0],I=D[1];(0,r.useEffect)((function(){I(n)}),[n]);var U=(0,r.useState)(1),O=(0,s.Z)(U,2),k=O[0],y=O[1],Z=(0,r.useState)([]),B=(0,s.Z)(Z,2),z=B[0],H=B[1],K=(0,r.useState)(""),W=(0,s.Z)(K,2),F=W[0],M=W[1],V=(0,r.useState)(""),q=(0,s.Z)(V,2),G=q[0],Y=q[1],J=function(){var e=new FormData;e.append(N,w[N]);var t={method:"post",maxBodyLength:1/0,headers:{Authorization:"Bearer "+{NODE_ENV:"production",PUBLIC_URL:".",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FRONT_URL:"https://ddonniee.github.io/react_intranet",REACT_APP_SERVER_URL:"http://localhost:8090",REACT_APP_PUBLIC_URL:"react_intranet"}.REACT_APP_TEMP_JWT_LGEKR},data:e};(0,d.JI)("/".concat(P,"detail"),t).then((function(e){var t=e.data;if(200===t.code){var n=t.result;I(n)}else console.log(t)})).catch((function(e){console.log("error",e)}))},X=function(){var e=new FormData;e.append("page",k),e.append(N,w[N]);var t={method:"post",maxBodyLength:1/0,headers:{Authorization:"Bearer "+{NODE_ENV:"production",PUBLIC_URL:".",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FRONT_URL:"https://ddonniee.github.io/react_intranet",REACT_APP_SERVER_URL:"http://localhost:8090",REACT_APP_PUBLIC_URL:"react_intranet"}.REACT_APP_TEMP_JWT_LGEKR},data:e};(0,d.be)("/".concat(P,"/commentList"),t).then((function(e){var t=e.data;if(console.log("comment : ",e),200===t.code){var n=t.result;n.map((function(e){e.openSubComment=!1,e.isInput=!1})),H(n)}else console.log(t)})).catch((function(e){}))},Q=function(e,t){if(1===e&&""===F)return fe(5),!1;if(2===e&&""===G)return fe(5),!1;var n=new FormData;n.append(N,t),1===e&&n.append("content",F),2===e&&(n.append("commentId",t),n.append("content",G));var o={method:"post",maxBodyLength:1/0,headers:{Authorization:"Bearer "+{NODE_ENV:"production",PUBLIC_URL:".",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FRONT_URL:"https://ddonniee.github.io/react_intranet",REACT_APP_SERVER_URL:"http://localhost:8090",REACT_APP_PUBLIC_URL:"react_intranet"}.REACT_APP_TEMP_JWT_LGEKR},data:n};(0,d.ez)("/".concat(P,"/commentInsert"),o).then((function(t){var n=t.data;200===n.code?(1===e?M(""):Y(""),J(),X()):console.log(n,"comment list")})).catch((function(e){console.log("error",e)}))},$=function(e,t,n){var o=new FormData,s="LIKE"===n?"likeCount":"dislikeCount",r="LIKE"===n?"dislikeCount":"likeCount";o.append(N,t),o.append("reaction",n);var l={method:"post",maxBodyLength:1/0,headers:{Authorization:"Bearer "+{NODE_ENV:"production",PUBLIC_URL:".",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FRONT_URL:"https://ddonniee.github.io/react_intranet",REACT_APP_SERVER_URL:"http://localhost:8090",REACT_APP_PUBLIC_URL:"react_intranet"}.REACT_APP_TEMP_JWT_LGEKR},data:o};console.log(Object.fromEntries(o)),(0,d.ez)("/".concat(P,"/reaction"),l).then((function(e){var t=e.data;if(200===t.code){var o,l=t.result;console.log(l),I((0,a.Z)((0,a.Z)({},w),{},(o={reactionState:w.reactionState===n?"NONE":n},(0,i.Z)(o,s,w.reactionState===n?w[s]-1:w[s]+1),(0,i.Z)(o,r,"NONE"!==w.reactionState&&w.reactionState!==n?w[r]-1:w[r]),o)))}else console.log(t)})).catch((function(e){console.log("error",e)}))},ee=(0,r.useState)(!1),te=(0,s.Z)(ee,2),ne=te[0],oe=te[1],ie=(0,r.useState)({alertTxt:"",onConfirm:function(){},isDoubleBtn:!1,btnTxt:"Close",confirmTxt:""}),ae=(0,s.Z)(ie,2),se=ae[0],re=ae[1],le=(0,r.useState)(!1),ce=(0,s.Z)(le,2),de=ce[0],me=ce[1],ue=(0,r.useState)(""),he=(0,s.Z)(ue,2),pe=he[0],ge=he[1];(0,r.useEffect)((function(){""!==pe&&me(!0)}),[pe]),(0,r.useEffect)((function(){de||ge("")}),[de]);var fe=function(e){re((0,a.Z)((0,a.Z)({},se),{},{alertTxt:"Are you sure to delete comment?",onConfirm:function(){!function(e){var t=new FormData;t.append("commentId",e);var n={method:"post",maxBodyLength:1/0,headers:{Authorization:"Bearer "+{NODE_ENV:"production",PUBLIC_URL:".",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FRONT_URL:"https://ddonniee.github.io/react_intranet",REACT_APP_SERVER_URL:"http://localhost:8090",REACT_APP_PUBLIC_URL:"react_intranet"}.REACT_APP_TEMP_JWT_LGEKR},data:t};(0,d.ez)("".concat(P,"/commentDelete"),n).then((function(t){var n=t.data;200===n.code?(re((0,a.Z)((0,a.Z)({},se),{},{alertTxt:"You've deleted comment.",isDoubleBtn:!1,btnTxt:"Close"})),J(w[e]),X()):console.log(n,"resData")})).catch((function(e){console.log("error",e)}))}(e),oe(!1)},isDoubleBtn:!0,btnTxt:"Confirm",confirmTxt:"Deleted comment."}))},xe=(0,r.useState)([]),_e=(0,s.Z)(xe,2),be=_e[0];return _e[1],(0,r.useEffect)((function(){ne||re({alertTxt:"",onConfirm:function(){},isDoubleBtn:!1,btnTxt:"Close",confirmTxt:""})}),[ne]),(0,r.useEffect)((function(){""!==se.alertTxt?oe(!0):oe(!1)}),[se]),(0,r.useEffect)((function(){X()}),[]),console.log("detail",w),(0,j.jsxs)("div",{className:"modal",children:[(0,j.jsxs)("div",{className:"maximal-content",children:[(0,j.jsxs)("div",{className:"board-view-top",children:[(0,j.jsxs)("div",{className:"board-btn-area custom-flex-item custom-align-item custom-justify-between",children:[(0,j.jsxs)("button",{className:"board-minimize-btn",onClick:L,children:[(0,j.jsx)("img",(0,i.Z)({className:"cursor-btn",src:u.Z,alt:"minimize-btn"},"className","screen-icon"))," Exit Full Screen"]}),(0,j.jsx)("img",{className:"cursor-btn",src:m.Z,alt:"minimize-btn",onClick:C})]}),(0,j.jsx)("p",{className:"board-title",children:w.subject}),(0,j.jsxs)("p",{className:"board-title-detail",children:[(0,j.jsx)("span",{children:"Category"})," : ",w.categoryTree," \xa0",(0,j.jsx)("span",{children:"Writer"})," : ",w.writerName," \xa0",(0,j.jsx)("span",{children:"Date"})," : ",v()(null===w||void 0===w?void 0:w.createdAt).format("'DD.MM.YY")]}),(0,j.jsx)("div",{className:"board-title-attach",children:(0,j.jsx)("span",{className:"custom-flex-item custom-align-item",children:(0,j.jsx)("div",{className:"custom-flex-item custom-align-item custom-flex-wrap",children:0!==be.length&&be.map((function(e,t){return(0,j.jsxs)("span",{className:"board-attach-box",onClick:function(){return ge("no download path.")},children:[(0,j.jsx)("img",{src:h.Z,alt:"attachment",className:"attach-icon"}),(0,j.jsx)("p",{children:"".concat(e.fileName," ").concat(null!==e&&void 0!==e&&e.fileSize?"(".concat((0,d.hy)(e.fileSize),")"):"")}),(0,j.jsxs)("span",{className:"board-attach-down",onClick:function(){return(0,d.Ve)(e.uploadPath)},children:[" ",(0,j.jsx)("img",{src:p.Z,alt:"attachment-download"})," "]})]},(0,d.zs)(t))}))})})})]}),(0,j.jsx)("div",{className:"content-middle",children:(0,j.jsx)(R.Z,{content:w.content})}),(0,j.jsxs)("div",{className:"content-bottom",children:[(0,j.jsxs)("div",{className:"user-action custom-flex-item ",children:[(0,j.jsxs)("span",{className:"faq-like custom-flex-item cursor-btn",onClick:function(e){return $(0,w[N],"LIKE")},children:[(0,j.jsx)("img",{src:"LIKE"===w.reactionState?_.Z:x.Z,alt:"btn_like"}),(0,j.jsx)("p",{children:w.likeCount})]}),(0,j.jsx)("span",{children:"|"}),(0,j.jsxs)("span",{className:"faq-dislike custom-flex-item cursor-btn",onClick:function(e){return $(0,w[N],"DISLIKE")},children:[" ",(0,j.jsx)("img",{src:"DISLIKE"===w.reactionState?T.Z:b.Z,alt:"btn_dislike"}),(0,j.jsx)("p",{children:w.dislikeCount})]})]}),(0,j.jsxs)("div",{className:"faq-comment-list",children:[(0,j.jsxs)("div",{className:"faq-comment-wrapper",style:{padding:"0"},children:[(0,j.jsx)("span",{children:"Comments"}),(0,j.jsxs)("span",{className:"comment-cnt-title",children:["total ",(0,j.jsx)("p",{className:"custom-stress-txt comment-cnt",children:w.commentCount})]}),(0,j.jsxs)("div",{className:"custom-justify-between",children:[(0,j.jsxs)("div",{className:"comment-input",style:{width:"94%"},children:[(0,j.jsxs)("span",{children:["Writer : ",t.name]}),(0,j.jsx)("textarea",{value:F,onChange:function(e){return M(e.target.value)}})]}),(0,j.jsx)("button",{onClick:function(){return Q(1,w[N])},children:"Write"})]})]}),(0,j.jsx)("ul",{children:0!==z.length&&z.map((function(e,n){var i,a;return(0,j.jsxs)("li",{children:[(0,j.jsxs)("div",{className:"comment-top custom-flex-item custom-justify-between",children:[(0,j.jsxs)("div",{children:[(0,j.jsx)("span",{children:e.writerName}),(0,j.jsx)("span",{children:v()(e.createdAt).format("MM.DD.YY HH:mm:ss")})]}),(0,j.jsxs)("span",{className:"custom-flex-item",children:[e.writerID===t.id&&(0,j.jsx)("p",{className:"cursor-btn",onClick:function(){return fe(e.commentId)},children:"Delete"}),(0,j.jsx)("p",{className:"cursor-btn",onClick:function(){!function(e){console.log("openCommentInput");for(var t=(0,o.Z)(z),n=0;n<t.length;n++)t[n].isInput=!1;t[e].isInput=!t[e].isInput,H(t)}(n),Y("")},children:"Answer"})]})]}),(0,j.jsxs)("div",{className:"comment-middle",children:[null===(i=e.content)||void 0===i?void 0:i.slice(0,250),(null===(a=e.content)||void 0===a?void 0:a.length)>130&&(0,j.jsx)("span",{className:"custom-stress-txt",children:"...More"})]}),(0,j.jsxs)("div",{className:e.openSubComment?"comment-bottom":"comment-bottom ",children:[0!==e.subComment.length&&(0,j.jsxs)("div",{className:"custom-flex-item cursor-btn",onClick:function(t){return function(e,t,n){var i=(0,o.Z)(z);i[t].openSubComment=!i[t].openSubComment,H(i)}(0,n,e.csTalkId)},children:[(0,j.jsx)("img",{src:Comment,alt:"under-comment"}),(0,j.jsx)("span",{children:"Comment"}),(0,j.jsxs)("span",{className:"custom-stress-txt",children:["( ",e.subComment.length," ) "]}),(0,j.jsx)("img",{src:e.openSubComment?f.Z:g.Z,alt:"under-comment",className:"toggle-sub-btn"})]}),e.openSubComment?(0,j.jsx)("div",{children:(0,j.jsx)("ul",{className:"submment-wrapper",children:e.subComment.map((function(e,n){var o,i;return(0,j.jsxs)("li",{children:[(0,j.jsxs)("div",{className:"comment-top custom-flex-item custom-justify-between",children:[(0,j.jsxs)("div",{children:[(0,j.jsx)("span",{children:e.writerName}),(0,j.jsx)("span",{children:v()(e.createdAt).format("MM.DD.YY")})]}),(0,j.jsx)("span",{className:"custom-flex-item cursor-btn",children:e.writerID===t.id&&(0,j.jsx)("p",{onClick:function(){return fe(4,e.commentId)},children:"Delete"})})]}),(0,j.jsxs)("div",{className:"comment-middle",children:[null===(o=e.content)||void 0===o?void 0:o.slice(0,250),(null===(i=e.content)||void 0===i?void 0:i.length)>250&&(0,j.jsx)("span",{className:"custom-stress-txt",children:"...More"})]})]},(0,d.zs)(n))}))})}):null,e.isInput&&(0,j.jsx)("div",{className:"cstalk-comment-wrapper sub-comment-wrapper",children:(0,j.jsxs)("div",{className:"custom-justify-between",children:[(0,j.jsxs)("div",{className:"comment-input",style:{width:"94%"},children:[(0,j.jsxs)("span",{children:["Writer : ",t.name]}),(0,j.jsx)("textarea",{defaultValue:G,onBlur:function(e){return Y(e.target.value)},id:"sub-".concat(e.commentId,"-").concat(n)})]}),(0,j.jsx)("button",{onClick:function(){return Q(2,e.commentId)},children:"Write"})]})})]})]},(0,d.zs)(n))}))}),0!==z.length&&(0,j.jsx)(c.Z,{activePage:k,itemsCountPerPage:5,totalItemsCount:w?w.commentCount:0,pageRangeDisplayed:5,prevPageText:"\u2039",nextPageText:"\u203a",onChange:function(e){return function(e,t){y(e)}(e)}})]})]})]}),ne&&(0,j.jsx)(E.Z,{alertTxt:se.alertTxt,onClose:function(){return oe(!1)},onConfirm:se.onConfirm,twoBtn:se.isDoubleBtn,btnTxt:se.btnTxt}),de&&(0,j.jsx)(S.Z,{text:pe,onClose:function(){return me(!1)}})]})}},4252:function(){!function(e){var t=e.ko=e.ko||{};t.dictionary=Object.assign(t.dictionary||{},{"%0 of %1":"%0 / %1","Align cell text to the bottom":"\uc140 \ud14d\uc2a4\ud2b8\ub97c \uc544\ub798\ub85c \uc815\ub82c","Align cell text to the center":"\uc140 \ud14d\uc2a4\ud2b8\ub97c \uac00\ub85c \uac00\uc6b4\ub370\ub85c \uc815\ub82c","Align cell text to the left":"\uc140 \ud14d\uc2a4\ud2b8\ub97c \uc67c\ucabd\uc73c\ub85c \uc815\ub82c","Align cell text to the middle":"\uc140 \ud14d\uc2a4\ud2b8\ub97c \uc138\ub85c \uac00\uc6b4\ub370\ub85c \uc815\ub82c","Align cell text to the right":"\uc140 \ud14d\uc2a4\ud2b8\ub97c \uc624\ub978\ucabd\uc73c\ub85c \uc815\ub82c","Align cell text to the top":"\uc140 \ud14d\uc2a4\ud2b8\ub97c \uc704\ub85c \uc815\ub82c","Align table to the left":"\ud14c\uc774\ube14\uc744 \uc67c\ucabd\uc73c\ub85c \uc815\ub82c","Align table to the right":"\ud14c\uc774\ube14\uc744 \uc624\ub978\ucabd\uc73c\ub85c \uc815\ub82c",Alignment:"\uc815\ub82c",Aquamarine:"\uc5f0\ud55c \uccad\ub85d\uc0c9",Background:"\ubc30\uacbd\uc0c9",Black:"\uac80\uc740\uc0c9","Block quote":"\uc778\uc6a9 \ub2e8\ub77d",Blue:"\ud30c\ub791\uc0c9",Bold:"\uad75\uac8c",Border:"\ud14c\ub450\ub9ac","Break text":"\ud14d\uc2a4\ud2b8 \ubd84\ub9ac","Bulleted List":"\ubd88\ub9bf \ubaa9\ub85d","Bulleted list styles toolbar":"\uae00\uba38\ub9ac \uae30\ud638 \ubaa9\ub85d \uc2a4\ud0c0\uc77c \ub3c4\uad6c \ubaa8\uc74c",Cancel:"\ucde8\uc18c","Cannot determine a category for the uploaded file.":"\uc5c5\ub85c\ub4dc\ub41c \ud30c\uc77c\uc758 \uce74\ud14c\uace0\ub9ac\ub97c \ud655\uc778\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.","Cannot upload file:":"\ud30c\uc77c \uc5c5\ub85c\ub4dc\ud560 \uc218 \uc5c6\uc74c: ","Caption for image: %0":"\uc774\ubbf8\uc9c0\uc6a9 \ucea1\uc158: %0","Caption for the image":"\uc774\ubbf8\uc9c0\uc6a9 \ucea1\uc158","Cell properties":"\uc140 \uc18d\uc131","Center table":"\ud14c\uc774\ube14\uc744 \uac00\uc6b4\ub370\ub85c \uc815\ub82c","Centered image":"\uac00\uc6b4\ub370 \uc815\ub82c","Change image text alternative":"\ub300\uccb4 \ubb38\uad6c \ubcc0\uacbd","Choose heading":"\uc81c\ubaa9 \uc120\ud0dd",Circle:"\ud770 \uc6d0\ud615",Code:"\ucf54\ub4dc",Color:"\uc0c9","Color picker":"\uc0c9\uc0c1 \uc120\ud0dd\uae30",Column:"\uc5f4","Could not insert image at the current position.":"\ud604\uc7ac \uc704\uce58\uc5d0 \uc0ac\uc9c4\uc744 \uc0bd\uc785\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.","Could not obtain resized image URL.":"\ud06c\uae30\uac00 \uc870\uc808\ub41c \uc0ac\uc9c4\uc758 URL\uc744 \uac00\uc838\uc624\uc9c0 \ubabb\ud588\uc2b5\ub2c8\ub2e4.",Dashed:"\ud30c\uc120",Decimal:"\uc2ed\uc9c4\uc218","Decimal with leading zero":"\uc55e\uc5d0 0\uc774 \ubd99\ub294 \uc2ed\uc9c4\uc218","Decrease indent":"\ub4e4\uc5ec\uc4f0\uae30 \uc904\uc774\uae30","Delete column":"\uc5f4 \uc0ad\uc81c","Delete row":"\ud589 \uc0ad\uc81c","Dim grey":"\uc9c4\ud55c \ud68c\uc0c9",Dimensions:"\ud06c\uae30",Disc:"\uac80\uc740 \uc6d0\ud615",Dotted:"\uc810\uc120",Double:"\uc774\uc911\uc120",Downloadable:"\ub2e4\uc6b4\ub85c\ub4dc \uac00\ub2a5","Dropdown toolbar":"\ub4dc\ub86d\ub2e4\uc6b4 \ud234\ubc14","Edit block":"\ud3b8\uc9d1 \uc601\uc5ed","Edit link":"\ub9c1\ud06c \ud3b8\uc9d1","Editor block content toolbar":"\ud3b8\uc9d1\uae30 \uc601\uc5ed \ub0b4\uc6a9 \ud234\ubc14","Editor contextual toolbar":"\ud3b8\uc9d1\uae30 \ubb38\ub9e5 \ud234\ubc14","Editor editing area: %0":"\ud3b8\uc9d1\uae30 \ud3b8\uc9d1 \uc601\uc5ed: %0","Editor toolbar":"\ud3b8\uc9d1\uae30 \ud234\ubc14","Enter image caption":"\uc0ac\uc9c4 \uc124\uba85\uc744 \uc785\ub825\ud558\uc138\uc694","Enter table caption":"\ud14c\uc774\ube14 \ucea1\uc158 \uc785\ub825","Full size image":"\uaf49 \ucc2c \ud06c\uae30",Green:"\ucd08\ub85d\uc0c9",Grey:"\ud68c\uc0c9",Groove:"\uc74c\uac01\uc120","Header column":"\ud5e4\ub354 \uc5f4","Header row":"\ud5e4\ub354 \ud589",Heading:"\uc81c\ubaa9","Heading 1":"\uc81c\ubaa9 1","Heading 2":"\uc81c\ubaa9 2","Heading 3":"\uc81c\ubaa9 3","Heading 4":"\uc81c\ubaa9 4","Heading 5":"\uc81c\ubaa9 5","Heading 6":"\uc81c\ubaa9 6",Height:"\uc138\ub85c",HEX:"","Horizontal text alignment toolbar":"\uac00\ub85c \ud14d\uc2a4\ud2b8 \uc815\ub82c \ub3c4\uad6c \ubaa8\uc74c","Image resize list":"\uc0ac\uc9c4 \ud06c\uae30 \ubaa9\ub85d","Image toolbar":"\uc0ac\uc9c4 \ud234\ubc14","image widget":"\uc0ac\uc9c4 \uc704\uc82f","In line":"\uc904 \uc548\uc5d0","Increase indent":"\ub4e4\uc5ec\uc4f0\uae30 \ub298\ub9ac\uae30",Insert:"\uc0bd\uc785","Insert column left":"\uc67c\ucabd\uc5d0 \uc5f4 \uc0bd\uc785","Insert column right":"\uc624\ub978\ucabd\uc5d0 \uc5f4 \uc0bd\uc785","Insert image":"\uc0ac\uc9c4 \uc0bd\uc785","Insert image or file":"\uc0ac\uc9c4\uc774\ub098 \ud30c\uc77c\uc744 \uc0bd\uc785","Insert image via URL":"URL\ub85c \uc774\ubbf8\uc9c0 \uc0bd\uc785","Insert media":"\ubbf8\ub514\uc5b4 \uc0bd\uc785","Insert paragraph after block":"\ube14\ub85d \ub4a4\uc5d0 \ub2e8\ub77d \uc0bd\uc785","Insert paragraph before block":"\ube14\ub85d \uc55e\uc5d0 \ub2e8\ub77d \uc0bd\uc785","Insert row above":"\uc704\uc5d0 \ud589 \uc0bd\uc785","Insert row below":"\uc544\ub798\uc5d0 \ud589 \uc0bd\uc785","Insert table":"\ud14c\uc774\ube14 \uc0bd\uc785","Inserting image failed":"\uc0ac\uc9c4 \uc0bd\uc785 \uc2e4\ud328",Inset:"\uce21\uba74 \uc74c\uac01\uc120",Italic:"\uae30\uc6b8\uc784\uaf34","Justify cell text":"\uc140 \ud14d\uc2a4\ud2b8\ub97c \uc591\ucabd\uc73c\ub85c \uc815\ub82c","Left aligned image":"\uc67c\ucabd \uc815\ub82c","Light blue":"\uc5f0\ud55c \ud30c\ub791\uc0c9","Light green":"\uc5f0\ud55c \ucd08\ub85d\uc0c9","Light grey":"\ubc1d\uc740 \ud68c\uc0c9",Link:"\ub9c1\ud06c","Link image":"\uc0ac\uc9c4 \ub9c1\ud06c","Link URL":"\ub9c1\ud06c \uc8fc\uc18c","List properties":"\ubaa9\ub85d \uc18d\uc131","Lower-latin":"\uc18c\ubb38\uc790 \uc54c\ud30c\ubcb3","Lower\u2013roman":"\uc18c\ubb38\uc790 \ub85c\ub9c8\uc790","Media toolbar":"\ubbf8\ub514\uc5b4 \ud234\ubc14","Media URL":"\ubbf8\ub514\uc5b4 URL","media widget":"\ubbf8\ub514\uc5b4 \uc704\uc82f","Merge cell down":"\uc544\ub798 \uc140\uacfc \ubcd1\ud569","Merge cell left":"\uc67c\ucabd \uc140\uacfc \ubcd1\ud569","Merge cell right":"\uc624\ub978\ucabd \uc140\uacfc \ubcd1\ud569","Merge cell up":"\uc704 \uc140\uacfc \ubcd1\ud569","Merge cells":"\uc140 \ubcd1\ud569",Next:"\ub2e4\uc74c",None:"\uc120 \uc5c6\uc74c","Numbered List":"\ubc88\ud638 \ubaa9\ub85d","Numbered list styles toolbar":"\ubc88\ud638 \ubaa9\ub85d \uc2a4\ud0c0\uc77c \ub3c4\uad6c \ubaa8\uc74c","Open file manager":"\ud30c\uc77c \uad00\ub9ac\uc790 \uc5f4\uae30","Open in a new tab":"\uc0c8 \ud0ed\uc5d0\uc11c \uc5f4\uae30","Open link in new tab":"\uc0c8 \ud0ed\uc5d0\uc11c \ub9c1\ud06c \uc5f4\uae30","Open media in new tab":"\uc0c8 \ud0ed\uc5d0\uc11c \ubbf8\ub514\uc5b4 \uc5f4\uae30",Orange:"\uc8fc\ud669\uc0c9",Original:"\uc6d0\ubcf8",Outset:"\uce21\uba74 \uc591\uac01\uc120",Padding:"\uc5ec\ubc31",Paragraph:"\ubb38\ub2e8","Paste the media URL in the input.":"\ubbf8\ub514\uc5b4 URL\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694.","Press Enter to type after or press Shift + Enter to type before the widget":"\uc5d4\ud130\ub97c \ub20c\ub7ec\uc11c \uc704\uc82f \ub4a4\uc5d0 \uc785\ub825\ud558\uac70\ub098 \uc2dc\ud504\ud2b8 + \uc5d4\ud130\ub97c \ub20c\ub7ec\uc11c \uc704\uc82f \uc55e\uc5d0 \uc785\ub825\ud558\uc138\uc694",Previous:"\uc774\uc804",Purple:"\ubcf4\ub77c\uc0c9",Red:"\ube68\uac04\uc0c9",Redo:"\ub2e4\uc2dc \uc2e4\ud589","Remove color":"\uc0c9\uae54 \uc81c\uac70","Resize image":"\uc0ac\uc9c4 \ud06c\uae30 \uc870\uc808","Resize image to %0":"\uc0ac\uc9c4\uc758 \ud06c\uae30\ub97c %0\uc73c\ub85c \uc870\uc808","Resize image to the original size":"\uc0ac\uc9c4\uc744 \uc6d0\ub798 \ud06c\uae30\ub85c \ub3cc\ub824\ub193\uae30","Restore default":"\uae30\ubcf8\uac12 \ubcf5\uc6d0","Reversed order":"\uc5ed\uc21c","Rich Text Editor":"\uc11c\uc2dd \uc788\ub294 \ud14d\uc2a4\ud2b8 \ud3b8\uc9d1\uae30",Ridge:"\uc591\uac01\uc120","Right aligned image":"\uc624\ub978\ucabd \uc815\ub82c",Row:"\ud589",Save:"\uc800\uc7a5","Select all":"\uc804\uccb4 \uc120\ud0dd","Select column":"\uc5f4 \uc120\ud0dd","Select row":"\ud589 \uc120\ud0dd","Selecting resized image failed":"\ud06c\uae30\uac00 \uc870\uc808\ub41c \uc774\ubbf8\uc9c0 \uc120\ud0dd \uc2e4\ud328","Show more items":"\ub354\ubcf4\uae30","Side image":"\ubcf8\ubb38 \uc606\uc5d0 \ubc30\uce58",Solid:"\uc2e4\uc120","Split cell horizontally":"\uac00\ub85c\ub85c \uc140 \ubd84\ud560","Split cell vertically":"\uc138\ub85c\ub85c \uc140 \ubd84\ud560",Square:"\uac80\uc740 \uc0ac\uac01\ud615","Start at":"\uc2dc\uc791 \ubc88\ud638","Start index must be greater than 0.":"\uc2dc\uc791 \ubc88\ud638\ub294 0\ubcf4\ub2e4 \ucee4\uc57c \ud569\ub2c8\ub2e4.",Strikethrough:"\ucde8\uc18c\uc120",Style:"\uc2a4\ud0c0\uc77c",Subscript:"\uc544\ub798 \ucca8\uc790",Superscript:"\uc704 \ucca8\uc790","Table alignment toolbar":"\ud45c \uc815\ub82c \ub3c4\uad6c \ubaa8\uc74c","Table cell text alignment":"\ud45c \uc140 \ud14d\uc2a4\ud2b8 \uc815\ub82c","Table properties":"\ud45c \uc18d\uc131","Table toolbar":"\ud45c \ub3c4\uad6c \ubaa8\uc74c","Text alternative":"\ub300\uccb4 \ubb38\uad6c",'The color is invalid. Try "#FF0000" or "rgb(255,0,0)" or "red".':'\uc720\ud6a8\ud558\uc9c0 \uc54a\uc740 \uc0c9\uc785\ub2c8\ub2e4. "#FF0000"\uc774\ub098 "rgb(255,0,0)", \ub610\ub294 "red"\ub97c \uc785\ub825\ud574 \ubcf4\uc138\uc694.',"The URL must not be empty.":"URL\uc774 \ube44\uc5b4\uc788\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.",'The value is invalid. Try "10px" or "2em" or simply "2".':'\uc720\ud6a8\ud558\uc9c0 \uc54a\uc740 \uac12\uc785\ub2c8\ub2e4. "10px"\ub098 "2em" \ub610\ub294 \uadf8\ub0e5 "2"\ub97c \uc785\ub825\ud574 \ubcf4\uc138\uc694.',"This link has no URL":"\uc774 \uc8fc\uc18c\uc5d0\ub294 URL\uc774 \uc5c6\uc2b5\ub2c8\ub2e4.","This media URL is not supported.":"\uc774 \ubbf8\ub514\uc5b4 URL\uc740 \uc9c0\uc6d0\ub418\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.","Tip: Paste the URL into the content to embed faster.":"\ud301: URL\uc744 \ubd99\uc5ec\ub123\uc73c\uba74 \ub354 \ube68\ub9ac \uc0bd\uc785\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.","To-do List":"\ud655\uc778 \ubaa9\ub85d","Toggle caption off":"\ucea1\uc158 \uc9c0\uc6b0\uae30","Toggle caption on":"\ucea1\uc158 \ub123\uae30","Toggle the circle list style":"\uac80\uc740 \uc6d0\ud615 \ubaa9\ub85d \uc2a4\ud0c0\uc77c \uc804\ud658","Toggle the decimal list style":"\uc2ed\uc9c4\uc218 \ubaa9\ub85d \uc2a4\ud0c0\uc77c \uc804\ud658","Toggle the decimal with leading zero list style":"\uc55e\uc5d0 0\uc774 \ubd99\ub294 \uc2ed\uc9c4\uc218 \ubaa9\ub85d \uc2a4\ud0c0\uc77c \uc804\ud658","Toggle the disc list style":"\ud770 \uc6d0\ud615 \ubaa9\ub85d \uc2a4\ud0c0\uc77c \uc804\ud658","Toggle the lower\u2013latin list style":"\uc18c\ubb38\uc790 \uc54c\ud30c\ubcb3 \ubaa9\ub85d \uc2a4\ud0c0\uc77c \uc804\ud658","Toggle the lower\u2013roman list style":"\uc18c\ubb38\uc790 \ub85c\ub9c8\uc790 \ubaa9\ub85d \uc2a4\ud0c0\uc77c \uc804\ud658","Toggle the square list style":"\uac80\uc740 \uc0ac\uac01\ud615 \ubaa9\ub85d \uc2a4\ud0c0\uc77c \uc804\ud658","Toggle the upper\u2013latin list style":"\ub300\ubb38\uc790 \uc54c\ud30c\ubcb3 \ubaa9\ub85d \uc2a4\ud0c0\uc77c \uc804\ud658","Toggle the upper\u2013roman list style":"\ub300\ubb38\uc790 \ub85c\ub9c8\uc790 \ubaa9\ub85d \uc2a4\ud0c0\uc77c \uc804\ud658",Turquoise:"\uccad\ub85d\uc0c9","Type or paste your content here.":"\uc5ec\uae30\uc5d0 \ub0b4\uc6a9\uc744 \uc785\ub825\ud558\uac70\ub098 \ubd99\uc5ec\ub123\uc73c\uc138\uc694.","Type your title":"\uc81c\ubaa9\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694",Underline:"\ubc11\uc904",Undo:"\uc2e4\ud589 \ucde8\uc18c",Unlink:"\ub9c1\ud06c \uc0ad\uc81c",Update:"\uc5c5\ub370\uc774\ud2b8","Update image URL":"\uc774\ubbf8\uc9c0 URL \uc5c5\ub370\uc774\ud2b8","Upload failed":"\uc5c5\ub85c\ub4dc \uc2e4\ud328","Upload in progress":"\uc5c5\ub85c\ub4dc \uc9c4\ud589 \uc911","Upper-latin":"\ub300\ubb38\uc790 \uc54c\ud30c\ubcb3","Upper-roman":"\ub300\ubb38\uc790 \ub85c\ub9c8\uc790","Vertical text alignment toolbar":"\uc138\ub85c \ud14d\uc2a4\ud2b8 \uc815\ub82c \ub3c4\uad6c \ubaa8\uc74c",White:"\ud770\uc0c9","Widget toolbar":"\uc704\uc82f \ud234\ubc14",Width:"\uac00\ub85c","Wrap text":"\ud14d\uc2a4\ud2b8 \uc904 \ubc14\uafc8",Yellow:"\ub178\ub791\uc0c9"}),t.getPluralForm=function(e){return 0}}(window.CKEDITOR_TRANSLATIONS||(window.CKEDITOR_TRANSLATIONS={}))}}]);
//# sourceMappingURL=125.0c4a0c89.chunk.js.map
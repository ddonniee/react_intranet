"use strict";(self.webpackChunkasc_portal=self.webpackChunkasc_portal||[]).push([[718],{9957:function(e,t,n){n.d(t,{Z:function(){return r}});var s,c=n(168),i=(n(2791),n.p+"static/media/Spin-1s-200px.3602f97a167e27c619b1.gif"),a=n(9256),o=n(184),r=function(){return(0,o.jsx)(l,{children:(0,o.jsx)("div",{className:"loading-wrapper custom-align-item custom-flex-item custom-justify-center",children:(0,o.jsx)("img",{src:i,alt:"loading"})})})},l=a.zo.div(s||(s=(0,c.Z)(["\n    .loading-wrapper {\n        height : 100%;\n        img {\n            width : 30px; height : 30px;\n        }\n    }\n"])))},8287:function(e,t,n){n.r(t);var s,c=n(168),i=n(3433),a=n(4942),o=n(1413),r=n(9439),l=n(2791),u=n(9256),m=n(3880),d=n(3637),f=n(8772),h=n(4187),x=n(9554),p=n(4442),j=(n(7162),n(9957)),g=n(5013),v=n(2294),N=(n(3958),n(1277)),Z=n(7501),C=n(5528),b=n(4081),I=n(9985),q=n(8673),w=n(9198),S=n(6424),y=n(298),k=n(4507),T=n(6045),D=n(1086),E=n(2426),Y=n.n(E),M=n(184);t.default=function(){var e=(0,l.useContext)(m.S),t=Y()().subtract(24,"hours").format("YYYY-MM-DD HH:mm:ss"),n=(0,l.useState)(1),s=(0,r.Z)(n,2),c=s[0],u=s[1],E=(0,l.useState)(16),L=(0,r.Z)(E,1)[0],z=function(e,t){1===t?u(e):ze(e)},P=(0,l.useState)(0),B=(0,r.Z)(P,2),F=B[0],H=B[1],J=(0,l.useState)([]),_=(0,r.Z)(J,2),K=_[0],O=_[1],W=(0,l.useState)([]),R=(0,r.Z)(W,2),G=R[0],Q=(R[1],(0,l.useState)(!1)),V=(0,r.Z)(Q,2),U=V[0],X=V[1],$=(0,l.useState)({attachments:"",reactionState:"",subject:"",dislikeCount:0,likeCount:0,content:"",subsidiary:"",writerName:"",commentCount:0,hits:0,createdAt:"",faqId:"",categoryId:"",writerID:""}),ee=(0,r.Z)($,2),te=ee[0],ne=ee[1],se=(0,l.useState)(!1),ce=(0,r.Z)(se,2),ie=ce[0],ae=ce[1],oe=function(){ne({attachments:"",reactionState:"",subject:"",dislikeCount:0,likeCount:0,content:"",subsidiary:"",writerName:"",commentCount:0,hits:16,createdAt:"",faqId:"",categoryId:"",writerID:""})},re=(0,l.useState)({categoryId:"",subsidiary:"",search:"",type:"F",page:c,tab:""}),le=(0,r.Z)(re,2),ue=le[0],me=le[1],de={method:"GET",maxBodyLength:1/0,headers:{},data:null},fe=function(e,t,n){var s=new FormData,c="LIKE"===n?"likeCount":"dislikeCount",i="LIKE"===n?"dislikeCount":"likeCount";s.append("faqId",t),s.append("reaction",n),de.data=s,(0,g.JI)("/faqData",de).then((function(e){var t=e.data;if(t){var s;t.result;ne((0,o.Z)((0,o.Z)({},te),{},(s={reactionState:te.reactionState===n?"NONE":n},(0,a.Z)(s,c,te.reactionState===n?te[c]-1:te[c]+1),(0,a.Z)(s,i,"NONE"!==te.reactionState&&te.reactionState!==n?te[i]-1:te[i]),s)))}else console.log(t)})).catch((function(e){console.log("error",e)}))},he=function(e,t){console.log("handleCLick",t.faqId),ke(t.faqId)},xe=(0,l.useState)(!1),pe=(0,r.Z)(xe,2),je=pe[0],ge=pe[1],ve=(0,l.useState)({alertTxt:"",onConfirm:function(){},isDoubleBtn:!1,btnTxt:"Close",confirmTxt:""}),Ne=(0,r.Z)(ve,2),Ze=Ne[0],Ce=Ne[1],be=function(e,t){"del-comment"===e?Ce((0,o.Z)((0,o.Z)({},Ze),{},{alertTxt:"Are you sure to delete comment?",onConfirm:function(){Xe(t),ge(!1)},isDoubleBtn:!0,btnTxt:"Confirm",confirmTxt:"Deleted comment."})):"no-input"===e&&Ce((0,o.Z)((0,o.Z)({},Ze),{},{alertTxt:"Any content input",onConfirm:function(){return ge(!1)},isDoubleBtn:!1,btnTxt:"Close"}))},Ie=(0,l.useState)(!1),qe=(0,r.Z)(Ie,2),we=qe[0],Se=qe[1],ye=function(){if(Se(!0),""!==ue.search){oe();var e=K.filter((function(e){var t=ue.search.toLowerCase();if(e.subject.toLowerCase().includes(t))return e}));return console.log(e),O(e),!1}(0,g.JI)("/faqData").then((function(e){if(e){if(""!==ue.categoryId){var t=e.filter((function(e){return e.categoryId===ue.categoryId}));O(t)}else O(e);Se(!1)}else Ce((0,o.Z)((0,o.Z)({},Ze),{},{alertTxt:"Client Error"})),Se(!1)})).catch((function(e){console.log("error",e),Ce((0,o.Z)((0,o.Z)({},Ze),{},{alertTxt:"Server Error"}))}))},ke=function(e){(new FormData).append("faqId",e),console.log(K),(0,g.JI)("/faqDetail").then((function(t){for(var n=0;n<t.length;n++)e===t[n].faqId&&(console.log(t,e),ne(t[n]))})).catch((function(e){console.log("error",e)}))},Te=(0,l.useState)([]),De=(0,r.Z)(Te,2),Ee=De[0],Ye=De[1],Me=(0,l.useState)(1),Ae=(0,r.Z)(Me,2),Le=Ae[0],ze=Ae[1],Pe=(0,l.useState)([]),Be=(0,r.Z)(Pe,2),Fe=Be[0],He=Be[1],Je=(0,l.useState)(""),_e=(0,r.Z)(Je,2),Ke=_e[0],Oe=_e[1],We=(0,l.useState)(""),Re=(0,r.Z)(We,2),Ge=Re[0],Qe=Re[1],Ve=function(){var e=new FormData;if(e.append("page",Le),e.append("faqId",te.faqId),""===te.faqId)return!1;(0,g.JI)("/faqComment").then((function(e){if(e){for(var t=[],n=0;n<e.length;n++)if(e[n].faqId===te.faqId){t=e[n].commentList;break}t&&(t.map((function(e){e.openSubComment=!1,e.isInput=!1})),He(t))}else Ce((0,o.Z)((0,o.Z)({},Ze),{},{alertTxt:"Client Error"}))})).catch((function(e){console.log(e),Ce((0,o.Z)((0,o.Z)({},Ze),{},{alertTxt:"Server Error"}))}))},Ue=function(t,n){if("upper"===t&&""===Ke)return be("no-input"),!1;if("lower"===t&&""===Ge)return be("no-input"),!1;var s={};s.faqId=n,"upper"===t&&(s.commentList=[{commentId:"new_comment_id",writerID:e.id,writerName:e.name,createdAt:Y()().format("YYYY.MM.DD HH:mm:ss"),content:Ke,subComment:[]}]),"lower"===t&&(s.commentId=n,s.content=Ge),console.log(s);var c={method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)};(0,g.JI)("/faqComment",c).then((function(e){e?("upper"===t?Oe(""):Qe(""),ke(n),Ve()):Ce((0,o.Z)((0,o.Z)({},Ze),{},{alertTxt:"Client Error"}))})).catch((function(e){console.log("error",e),Ce((0,o.Z)((0,o.Z)({},Ze),{},{alertTxt:"Server Error"}))}))},Xe=function(e){var t=new FormData;t.append("commentId",e),de.data=t},$e=(0,l.useState)(!1),et=(0,r.Z)($e,2),tt=et[0],nt=et[1];(0,l.useEffect)((function(){me((0,o.Z)((0,o.Z)({},ue),{},{page:c}))}),[c]);var st=(0,l.useState)(!1),ct=(0,r.Z)(st,2),it=ct[0],at=ct[1],ot=(0,l.useState)(!1),rt=(0,r.Z)(ot,2),lt=rt[0],ut=rt[1],mt=(0,l.useState)([]),dt=(0,r.Z)(mt,2),ft=dt[0],ht=dt[1];(0,l.useEffect)((function(){if(ht([]),""!==te.attachments&&void 0!==te.attachments){var e=JSON.parse(te.attachments);if(null!==e){var t=(0,i.Z)(e);ht(t)}}if(te){Ve(),at(!0),ze(1);var n=setTimeout((function(){at(!1)}),500);return function(){return clearTimeout(n)}}}),[te.faqId]),(0,l.useEffect)((function(){ut(!0);var e=setTimeout((function(){ut(!1)}),500);return function(){return clearTimeout(e)}}),[Le]),(0,l.useEffect)((function(){(0,g.JI)("/faqCategory").then((function(e){e?Ye(e):Ce((0,o.Z)((0,o.Z)({},Ze),{},{alertTxt:"Client Error"}))})).catch((function(e){console.log("error",e),Ce((0,o.Z)((0,o.Z)({},Ze),{},{alertTxt:"Server Error"}))}))}),[]),(0,l.useEffect)((function(){ye()}),[ue.page,ue.categoryId]),(0,l.useEffect)((function(){if(0===K.length)H(0);else{var e=F;1===c&&(e=0,K.map((function(t){t.rn>e&&(e=t.rn),H(e)})))}}),[K]),(0,l.useEffect)((function(){te&&Ve()}),[Le]),(0,l.useEffect)((function(){je||Ce({alertTxt:"",onConfirm:function(){},isDoubleBtn:!1,btnTxt:"Close",confirmTxt:""})}),[je]),(0,l.useEffect)((function(){""!==Ze.alertTxt?ge(!0):ge(!1)}),[Ze]);var xt=(0,l.useState)(!1),pt=(0,r.Z)(xt,2),jt=pt[0],gt=pt[1],vt=(0,l.useState)(""),Nt=(0,r.Z)(vt,2),Zt=Nt[0],Ct=Nt[1];return(0,l.useEffect)((function(){""!==Zt&&gt(!0)}),[Zt]),(0,l.useEffect)((function(){jt||Ct("")}),[jt]),(0,l.useEffect)((function(){""===te.faqId?ae(!1):""===te.faqId||U||ae(!0)}),[te.faqId]),(0,l.useEffect)((function(){var e=document.querySelector("html");console.log(e),e.style.overflow=tt?"hidden":""}),[tt]),(0,M.jsx)(M.Fragment,{children:(0,M.jsxs)(A,{detail:null===te||void 0===te?void 0:te.faqId,openright:ie,children:[(0,M.jsxs)("div",{className:"inner-container",children:[(0,M.jsx)(f.Z,{searchArea:!0,auth:!0,onChange:function(e){return me((0,o.Z)((0,o.Z)({},ue),{},{search:e.target.value}))},onClick:ye}),(0,M.jsxs)("div",{className:"faq-nav",children:[(0,M.jsx)("div",{className:"faq-lists-wrapper",children:(0,M.jsx)("ul",{className:"faq-lists custom-justify-between",children:G&&G.length>0&&G.map((function(e,t){return(0,M.jsxs)("li",{onClick:function(t){return he(0,e),nt(!0),X(!0)},children:[(0,M.jsxs)("div",{className:"faq-top",children:[(0,M.jsx)("p",{className:"faq-number",style:0!==e.num?{marginRight:"10px"}:null,children:0!==e.num&&"Q.".concat(String(t+1).padStart(3,"0"))}),(0,M.jsx)("p",{className:"faq-title",children:"[".concat(e.categoryName,"]")})]}),(0,M.jsx)("div",{className:"faq-summary",children:e.subject.slice(0,70)})]},(0,g.zs)(t))}))})}),(0,M.jsx)("div",{className:"faq-category",children:(0,M.jsx)("ul",{className:"faq-category-lists custom-justify-center",children:null===Ee||void 0===Ee?void 0:Ee.map((function(e,t){return(0,M.jsxs)("li",{className:"scroll-lists cursor-btn ".concat(ue.categoryId===e.categoryId?"hover-selected":""),onClick:function(t){return n=e,ie&&oe(),void(ue.categoryId===n.categoryId?me((0,o.Z)((0,o.Z)({},ue),{},{categoryId:"",search:""})):me((0,o.Z)((0,o.Z)({},ue),{},{categoryId:n.categoryId})));var n},children:[(0,M.jsx)("div",{className:"faq-img-wrapper",children:(0,M.jsx)("img",{src:e.categoryIconPath,alt:"category-icon"})}),(0,M.jsx)("p",{children:e.categoryNm})]},(0,g.zs)(t+1))}))})})]}),(0,M.jsxs)("div",{className:"faq-contents",children:[(0,M.jsxs)("div",{className:"faq-left",children:[(0,M.jsxs)("div",{children:[(0,M.jsxs)("ul",{className:"board-table custom-align-item custom-flex-item custom-sticky-area",children:[(0,M.jsx)("li",{className:"col-1",children:"No."}),(0,M.jsx)("li",{className:"col-2 ".concat(ie&&"custom-hide-item"),children:"Category"}),(0,M.jsx)("li",{className:"col-3",children:"Title"}),(0,M.jsx)("li",{className:"col-4 ".concat(ie&&"custom-hide-item"),children:"Writer"}),(0,M.jsx)("li",{className:"col-5 ".concat(ie&&"custom-hide-item"),children:"Recommand"}),(0,M.jsx)("li",{className:"col-6",children:"Count"}),(0,M.jsx)("li",{className:"col-7",children:"Date"})]}),K&&K.length>0&&K.map((function(e,n){var s,c,i,a,o;return(0,M.jsxs)("div",{className:"board-list custom-flex-item custom-align-item cursor-btn",onClick:function(t){return he(0,e)},children:[(0,M.jsx)("ul",{className:"col-1",children:(0,M.jsx)("li",{id:"list-item-".concat(n+1),children:(0,M.jsx)("span",{children:String(e.rn).padStart(3,"0")})})}),(0,M.jsx)("ul",{className:"col-2 ".concat(ie&&"custom-hide-item"),children:(0,M.jsx)("li",{id:"list-item-".concat(n+1),children:(0,M.jsxs)("span",{children:[null===(s=e.categoryTree)||void 0===s?void 0:s.slice(0,15)," ",(null===e||void 0===e||null===(c=e.categoryTree)||void 0===c?void 0:c.length)>10&&"...."]})})}),(0,M.jsx)("ul",{className:"col-3",children:(0,M.jsxs)("li",{id:"list-item-".concat(n+1),children:[(0,M.jsxs)("span",{className:"board-max-length",children:[ie?null===e||void 0===e?void 0:e.subject.slice(0,60):null===e||void 0===e?void 0:e.subject.slice(0,82),ie?(null===(a=e.subject)||void 0===a?void 0:a.length)>60&&"...":(null===(i=e.subject)||void 0===i?void 0:i.length)>82&&"..."]}),(0,M.jsx)("img",{src:Y()(null===e||void 0===e?void 0:e.createdAt).format("YYYY-MM-DD HH:mm:ss")>t?N.Z:null})]})}),(0,M.jsx)("ul",{className:"col-4 ".concat(ie&&"custom-hide-item"),children:(0,M.jsx)("li",{id:"list-item-".concat(n+1),children:(0,M.jsxs)("span",{children:[null===e||void 0===e||null===(o=e.writerName)||void 0===o?void 0:o.slice(0,10),(null===e||void 0===e?void 0:e.writerName.length)>=10&&"..."]})})}),(0,M.jsx)("ul",{className:"col-5 ".concat(ie&&"custom-hide-item"),children:(0,M.jsxs)("li",{id:"list-item-".concat(n+1),children:[(0,M.jsx)("img",{src:b.Z,alt:"like-img"}),(0,M.jsx)("span",{children:null===e||void 0===e?void 0:e.likeCount})]})}),(0,M.jsx)("ul",{className:"col-6",children:(0,M.jsx)("li",{id:"list-item-".concat(n+1),children:(0,M.jsx)("span",{children:null===e||void 0===e?void 0:e.hits})})}),(0,M.jsx)("ul",{className:"col-7",children:(0,M.jsx)("li",{id:"list-item-".concat(n+1),children:(0,M.jsx)("span",{children:Y()(null===e||void 0===e?void 0:e.createdAt).format("MM.DD.YY")})})})]},(0,g.zs)(n))}))]}),K&&(0,M.jsx)(d.Z,{activePage:c,itemsCountPerPage:L,totalItemsCount:F,pageRangeDisplayed:5,prevPageText:"\u2039",nextPageText:"\u203a",onChange:function(e){return z(e,1)}})]}),""===te.faqId||U?null:(0,M.jsx)("div",{className:"editor-wrapper",children:(0,M.jsxs)("div",{className:"faq-right ".concat(it?"loadingOpacity":""),children:[(0,M.jsxs)("div",{className:"faq-right-top",children:[(0,M.jsxs)("div",{className:"custom-flex-item custom-justify-between",children:[(0,M.jsxs)("button",{className:"maximizing-btn",onClick:function(){nt(!0)},children:[(0,M.jsx)("img",{src:D.Z,alt:"minimize-btn"})," Full Screen"]}),(0,M.jsx)("img",{className:"cursor-btn",src:T.Z,alt:"close-btn",onClick:oe})]}),(0,M.jsx)("p",{children:te.subject}),0!==ft.length&&ft.map((function(e,t){return(0,M.jsxs)("div",{className:"custom-flex-item",children:[(0,M.jsx)("img",{src:Z.Z,alt:"attachment"}),(0,M.jsx)("span",{children:"Attachment"}),(0,M.jsxs)("span",{className:"custom-flex-item faq-attach-down",children:[(0,M.jsx)("span",{children:"(".concat(t+1,")")}),(0,M.jsx)("p",{className:"custom-hyphen custom-self-align ",children:"-"}),(0,M.jsxs)("span",{className:"faq-attach custom-flex-item cursor-btn",onClick:function(){return Ct("no download path.")},children:[(0,M.jsx)("p",{children:e.fileName}),(0,M.jsx)("img",{src:C.Z,alt:"download_attachment"})]})]})]},(0,g.zs)(t))}))]}),(0,M.jsx)("div",{className:"faq-right-middle",children:(0,M.jsx)(x.Z,{content:te.content},te.faqId)}),(0,M.jsxs)("div",{className:"faq-right-bottom",children:[(0,M.jsxs)("div",{className:"user-action custom-flex-item ",children:[(0,M.jsxs)("span",{className:"faq-like custom-flex-item cursor-btn",onClick:function(e){return fe(0,te.faqId,"LIKE")},children:[(0,M.jsx)("img",{src:"LIKE"===te.reactionState?I.Z:b.Z,alt:"btn_like"}),(0,M.jsx)("p",{children:te.likeCount})]}),(0,M.jsx)("span",{children:"|"}),(0,M.jsxs)("span",{className:"faq-dislike custom-flex-item cursor-btn",onClick:function(e){return fe(0,te.faqId,"DISLIKE")},children:[(0,M.jsx)("img",{src:"DISLIKE"===te.reactionState?w.Z:q.Z,alt:"btn_dislike"}),(0,M.jsx)("p",{children:te.dislikeCount})]})]}),(0,M.jsxs)("div",{className:"faq-comment-wrapper",children:[(0,M.jsx)("span",{children:"Comments"}),(0,M.jsxs)("span",{className:"comment-cnt-title",children:["total ",(0,M.jsx)("p",{className:"custom-stress-txt comment-cnt",children:te.commentCount})]}),(0,M.jsxs)("div",{className:"custom-justify-between",children:[(0,M.jsxs)("div",{className:"comment-input",children:[(0,M.jsxs)("span",{children:["Writer : ",e.name]}),(0,M.jsx)("textarea",{value:Ke,onChange:function(e){return Oe(e.target.value)}})]}),(0,M.jsx)("button",{onClick:function(){return Ue("upper",te.faqId)},children:"Write"})]})]}),(0,M.jsxs)("div",{className:"faq-comment-list ".concat(lt?"halfOpacity":""),children:[(0,M.jsx)("ul",{children:Fe.map((function(t,n){var s,c;return(0,M.jsxs)("li",{children:[(0,M.jsxs)("div",{className:"comment-top custom-flex-item custom-justify-between",children:[(0,M.jsxs)("div",{children:[(0,M.jsx)("span",{children:t.writerName}),(0,M.jsx)("span",{children:Y()(t.createdAt).format("MM.DD.YY HH:mm:ss")})]}),(0,M.jsxs)("span",{className:"custom-flex-item",children:[t.writerID===e.id&&(0,M.jsx)("p",{className:"cursor-btn",onClick:function(){return be("del-comment",t.commentId)},children:"Delete"}),(0,M.jsx)("p",{className:"cursor-btn",onClick:function(){!function(e){console.log("openCommentInput");for(var t=(0,i.Z)(Fe),n=0;n<t.length;n++)t[n].isInput=!1;t[e].isInput=!t[e].isInput,He(t)}(n),Qe("")},children:"Answer"})]})]}),(0,M.jsxs)("div",{className:"comment-middle",children:[null===(s=t.content)||void 0===s?void 0:s.slice(0,250),(null===(c=t.content)||void 0===c?void 0:c.length)>130&&(0,M.jsx)("span",{className:"custom-stress-txt",children:"...More"})]}),(0,M.jsxs)("div",{className:t.openSubComment?"comment-bottom":"comment-bottom ",children:[0!==t.subComment.length&&(0,M.jsxs)("div",{className:"custom-flex-item cursor-btn",onClick:function(e){return function(e,t,n){var s=(0,i.Z)(Fe);s[t].openSubComment=!s[t].openSubComment,He(s)}(0,n,t.csTalkId)},children:[(0,M.jsx)("img",{src:S.Z,alt:"under-comment"}),(0,M.jsx)("span",{children:"Comment"}),(0,M.jsxs)("span",{className:"custom-stress-txt",children:["( ",t.subComment.length," ) "]}),(0,M.jsx)("img",{src:t.openSubComment?k.Z:y.Z,alt:"under-comment",className:"toggle-sub-btn"})]}),t.openSubComment?(0,M.jsx)("div",{children:(0,M.jsx)("ul",{className:"submment-wrapper",children:t.subComment.map((function(t,n){var s,c;return(0,M.jsxs)("li",{children:[(0,M.jsxs)("div",{className:"comment-top custom-flex-item custom-justify-between",children:[(0,M.jsxs)("div",{children:[(0,M.jsx)("span",{children:t.writerName}),(0,M.jsx)("span",{children:Y()(t.createdAt).format("MM.DD.YY")})]}),(0,M.jsx)("span",{className:"custom-flex-item cursor-btn",children:t.writerID===e.id&&(0,M.jsx)("p",{onClick:function(){return be("del-comment",t.commentId)},children:"Delete"})})]}),(0,M.jsxs)("div",{className:"comment-middle",children:[null===(s=t.content)||void 0===s?void 0:s.slice(0,250),(null===(c=t.content)||void 0===c?void 0:c.length)>250&&(0,M.jsx)("span",{className:"custom-stress-txt",children:"...More"})]})]},(0,g.zs)(n))}))})}):null,t.isInput&&(0,M.jsx)("div",{className:"cstalk-comment-wrapper sub-comment-wrapper",children:(0,M.jsxs)("div",{className:"custom-justify-between",children:[(0,M.jsxs)("div",{className:"comment-input",children:[(0,M.jsxs)("span",{children:["Writer : ",e.name]}),(0,M.jsx)("textarea",{defaultValue:Ge,onBlur:function(e){return Qe(e.target.value)},id:"sub-".concat(t.commentId,"-").concat(n)})]}),(0,M.jsx)("button",{onClick:function(){return Ue("lower",t.commentId)},children:"Write"})]})})]})]},(0,g.zs)(n))}))}),0!==Fe.length&&(0,M.jsx)(d.Z,{activePage:Le,itemsCountPerPage:5,totalItemsCount:te?te.commentCount:0,pageRangeDisplayed:5,prevPageText:"\u2039",nextPageText:"\u203a",onChange:function(e){return z(e,2)}})]})]})]})})]}),je&&(0,M.jsx)(p.Z,{alertTxt:Ze.alertTxt,onClose:function(){return ge(!1)},onConfirm:Ze.onConfirm,twoBtn:Ze.isDoubleBtn,btnTxt:Ze.btnTxt})]}),tt&&(0,M.jsx)(v.Z,{data:te,onClose:function(){nt(!1),oe(),X(!1)},onMinimizing:function(){return U?(nt(!1),X(!0)):nt(!1)},page:"faq"}),jt&&(0,M.jsx)(h.Z,{text:Zt,onClose:function(){return gt(!1)}}),we&&(0,M.jsx)(j.Z,{})]})})};var A=u.zo.div(s||(s=(0,c.Z)(["\n    #list-item-"," {\n        background : #FAF1F4; color : #BB0841; \n    }\n    .faq-left {\n        width: ",";\n    }\n   \n    .col-1 {\n        width: ",";\n    }\n    .col-2 {\n        width: 10%;\n    }\n    .col-3 {\n        width :",";\n    }\n    .col-4 {\n        width: 10%;\n    }\n    .col-5 {\n        width: 10%;\n    }\n    .col-6 {\n        width: ",";\n    }\n    .col-7 {\n        width: ",";\n    }\n    .board-list {\n        padding : ","\n      \n    }\n"])),(function(e){return e.detail}),(function(e){return e.openright?"49%":"100%"}),(function(e){return e.openright?"10%":"5%"}),(function(e){return e.openright?"60%":"50%"}),(function(e){return e.openright?"15%":"5%"}),(function(e){return e.openright?"15%":"10%"}),(function(e){return e.openright?"17px 30px;":"10px 30px;"}))}}]);
//# sourceMappingURL=718.7ab772b1.chunk.js.map
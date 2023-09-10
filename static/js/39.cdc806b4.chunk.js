"use strict";(self.webpackChunkasc_portal=self.webpackChunkasc_portal||[]).push([[39],{7039:function(t,e,n){n.r(e);var o,s=n(168),a=n(3433),l=n(1413),c=n(9439),i=n(2791),r=n(9256),d=n(2426),u=n.n(d),m=n(3637),h=(n(2903),n(8772)),x=(n(1790),n(9554)),f=n(2294),T=n(9173),p=(n(7162),n(4442)),v=n(5013),_=(n(5840),n(1277)),C=n(7501),E=n(5528),b=n(4081),j=n(9985),g=n(6424),S=n(298),k=n(4507),P=n(6045),N=n(1086),R=n(3880),D=n(184);e.default=function(){var t=(0,i.useContext)(R.S),e=u()().subtract(24,"hours").format("YYYY-MM-DD HH:mm:ss"),n=(0,i.useState)({isViewer:!1,isWriter:!1}),o=(0,c.Z)(n,2),s=o[0],r=o[1],d=(0,i.useState)(1),A=(0,c.Z)(d,2),I=A[0],w=A[1],L=(0,i.useState)(16),O=(0,c.Z)(L,1)[0],B=(0,i.useState)([{value:"",label:"All"},{value:"LGEAI",label:"LGEAI"},{value:"LGECI",label:"LGECI"},{value:"LGEES",label:"LGEES"},{value:"LGEJP",label:"LGEJP"},{value:"LGEKR",label:"LGEKR"},{value:"LGEMC",label:"LGEMC"}]),W=(0,c.Z)(B,2),y=W[0],K=(W[1],(0,i.useState)(!1)),F=(0,c.Z)(K,2),U=F[0],H=F[1],M=(0,i.useState)(!1),z=(0,c.Z)(M,2),Y=z[0],V=z[1];(0,i.useEffect)((function(){jt((0,l.Z)((0,l.Z)({},bt),{},{page:I}))}),[I]);var G=(0,i.useState)([]),J=(0,c.Z)(G,2),q=J[0],Q=J[1],X=(0,i.useState)({title:"",content:"",isPublic:null,attachments:null,csTalkId:""}),$=(0,c.Z)(X,2),tt=$[0],et=$[1],nt=(0,i.useState)({attachments:"",subject:"",branch:"",center:"",commentCount:0,content:"",createdAt:"",csTalkId:"",hits:0,isPublic:null,likeCount:0,parentCsId:"",subsidiary:"",writerID:"",reactionState:"",writerName:""}),ot=(0,c.Z)(nt,2),st=ot[0],at=ot[1];(0,i.useEffect)((function(){console.log(t);t.role;r((0,l.Z)((0,l.Z)({},s),{},{isViewer:!0,isWriter:!0}))}),[st.csTalkId]);var lt=(0,i.useState)(!1),ct=(0,c.Z)(lt,2),it=ct[0],rt=ct[1],dt=function(t){Dt(!0);var e=new FormData;e.append("csTalkId",t),console.log(Object.fromEntries(e));(0,v.JI)("/cstalkDetail").then((function(t){t?console.log(t,"detail"):vt((0,l.Z)((0,l.Z)({},pt),{},{alertTxt:"Client Error"})),Dt(!1)})).catch((function(t){console.log("error",t),Dt(!1),vt((0,l.Z)((0,l.Z)({},pt),{},{alertTxt:"Server Error"}))}))},ut=(0,i.useState)(!1),mt=(0,c.Z)(ut,2),ht=mt[0],xt=mt[1],ft=(0,i.useState)({alertTxt:"",onConfirm:function(){},isDoubleBtn:!1,btnTxt:"Close",confirmTxt:""}),Tt=(0,c.Z)(ft,2),pt=Tt[0],vt=Tt[1],_t=function(t,e){console.log(e,'"btn-row"'),console.log("onConfirmHandler",Y),1===t||7===t?vt((0,l.Z)((0,l.Z)({},pt),{},{alertTxt:" Click confirm to leave write mode.",onConfirm:function(){V(!1),zt(!1),xt(!1),et({title:"",content:"",isPublic:null,attachments:"",csTalkId:""}),Ft(),7===t&&V(!1),1===t&&dt(e)},isDoubleBtn:!0,btnTxt:"Confirm",confirmTxt:""})):2===t?vt((0,l.Z)((0,l.Z)({},pt),{},{alertTxt:"Are you sure to oepn this post to public?",onConfirm:function(){oe(),xt(!1),Ft()},isDoubleBtn:!0,btnTxt:"Confirm",confirmTxt:"You've allowed all to show this post."})):3===t?vt((0,l.Z)((0,l.Z)({},pt),{},{alertTxt:"Are you sure to delete post?",onConfirm:function(){ne(),xt(!1),Ft(),Zt()},isDoubleBtn:!0,btnTxt:"Confirm",confirmTxt:"Deleted post."})):4===t?vt((0,l.Z)((0,l.Z)({},pt),{},{alertTxt:"Are you sure to delete comment?",onConfirm:function(){ee(e),xt(!1)},isDoubleBtn:!0,btnTxt:"Confirm",confirmTxt:"Deleted comment."})):5===t?vt((0,l.Z)((0,l.Z)({},pt),{},{alertTxt:"Any content input",onConfirm:function(){return xt(!1)},isDoubleBtn:!1,btnTxt:"Close"})):6===t&&vt((0,l.Z)((0,l.Z)({},pt),{},{alertTxt:"Success",onConfirm:function(){xt(!1),Ft()},isDoubleBtn:!1,btnTxt:"Close"}))};(0,i.useEffect)((function(){ht||vt({alertTxt:"",onConfirm:function(){},isDoubleBtn:!1,btnTxt:"Close",confirmTxt:""})}),[ht]),(0,i.useEffect)((function(){""!==pt.alertTxt?xt(!0):xt(!1)}),[pt]);var Ct=(0,i.useState)({page:1,subsidiary:"",view:"",search:""}),Et=(0,c.Z)(Ct,2),bt=Et[0],jt=Et[1],gt=(0,i.useState)(0),St=(0,c.Z)(gt,2),kt=St[0],Pt=St[1],Nt=(0,i.useState)(!1),Rt=(0,c.Z)(Nt,2),Dt=(Rt[0],Rt[1]),Zt=function(){Dt(!0);var t=new FormData;for(var e in bt)bt.hasOwnProperty(e)&&t.append(e,bt[e]);(0,v.JI)("/cstalkData").then((function(t){t?Q(t):(console.log(t),vt((0,l.Z)((0,l.Z)({},pt),{},{alertTxt:"Client Error"})))})).catch((function(t){console.log("error",t),vt((0,l.Z)((0,l.Z)({},pt),{},{alertTxt:"Server Error"}))}))},At=(0,i.useState)(1),It=(0,c.Z)(At,2),wt=It[0],Lt=It[1],Ot=(0,i.useState)([]),Bt=(0,c.Z)(Ot,2),Wt=Bt[0],yt=Bt[1],Kt=function(){var t=new FormData;t.append("page",wt),t.append("csTalkId",st.csTalkId);var e={method:"post",maxBodyLength:1/0,headers:{Authorization:"Bearer "+{NODE_ENV:"production",PUBLIC_URL:"/react_intranet",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FRONT_URL:"http://localhost:3000",REACT_APP_SERVER_URL:"http://localhost:8090"}.REACT_APP_TEMP_JWT_LGEKR},data:t};(0,v.ez)("/csTalk/commentList",e).then((function(t){var e=t.data;if(200===e.code){var n=e.result;n.map((function(t){t.openSubComment=!1,t.isInput=!1})),yt(n),console.log("comment",n)}else console.log(e)})).catch((function(t){console.log("error",t)}))},Ft=function(){Zt(),at({attachments:"",subject:"",branch:"",center:"",commentCount:0,content:"",createdAt:"",csTalkId:"",hits:0,isPublic:null,likeCount:0,parentCsId:"",subsidiary:"",writerID:"",reactionState:"",writerName:""}),V(!1),zt(!1)},Ut=(0,i.useState)(!1),Ht=(0,c.Z)(Ut,2),Mt=Ht[0],zt=Ht[1],Yt=(0,i.useState)(""),Vt=(0,c.Z)(Yt,2),Gt=Vt[0],Jt=Vt[1],qt=(0,i.useState)(""),Qt=(0,c.Z)(qt,2),Xt=Qt[0],$t=Qt[1],te=function(t,e){if(console.log("onAddComment",t,e),1===t&&""===Gt)return _t(5),!1;if(2===t&&""===Xt)return _t(5),!1;var n=new FormData;n.append("csTalkId",st.csTalkId),1===t&&n.append("content",Gt),2===t&&(n.append("commentId",e),n.append("content",Xt));var o={method:"post",maxBodyLength:1/0,headers:{Authorization:"Bearer "+{NODE_ENV:"production",PUBLIC_URL:"/react_intranet",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FRONT_URL:"http://localhost:3000",REACT_APP_SERVER_URL:"http://localhost:8090"}.REACT_APP_TEMP_JWT_LGEKR},data:n};(0,v.ez)("/csTalk/commentInsert",o).then((function(e){var n=e.data;200===n.code?1===t?Jt(""):$t(""):console.log(n,"comment list")})).catch((function(t){console.log("error",t)}))};(0,i.useEffect)((function(){st&&""===Gt&&(Zt(),dt(st.csTalkIdid),at((0,l.Z)((0,l.Z)({},st),{},{commentCount:st.commentCount+1})),Kt())}),[Gt]),(0,i.useEffect)((function(){console.log("content",tt)}),[tt]);var ee=function(t){var e=new FormData;e.append("commentId",t);var n={method:"post",maxBodyLength:1/0,headers:{Authorization:"Bearer "+{NODE_ENV:"production",PUBLIC_URL:"/react_intranet",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FRONT_URL:"http://localhost:3000",REACT_APP_SERVER_URL:"http://localhost:8090"}.REACT_APP_TEMP_JWT_LGEKR},data:e};(0,v.ez)("/csTalk/commentDelete",n).then((function(e){var n=e.data;200===n.code?(vt((0,l.Z)((0,l.Z)({},pt),{},{alertTxt:"You've deleted comment.",isDoubleBtn:!1,btnTxt:"Close"})),dt(t),Kt(),Zt()):console.log(n,"resData")})).catch((function(t){console.log("error",t)}))},ne=function(){var t=new FormData;t.append("csTalkId",st.csTalkId),console.log(Object.fromEntries(t),"on delete post");var e={method:"post",maxBodyLength:1/0,headers:{Authorization:"Bearer "+{NODE_ENV:"production",PUBLIC_URL:"/react_intranet",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FRONT_URL:"http://localhost:3000",REACT_APP_SERVER_URL:"http://localhost:8090"}.REACT_APP_TEMP_JWT_LGEKR},data:t};(0,v.ez)("/csTalk/delete",e).then((function(t){var e=t.data;200===e.code?(vt((0,l.Z)((0,l.Z)({},pt),{},{alertTxt:"You've Deleted post.",isDoubleBtn:!1,btnTxt:"Close"})),Pt(kt-1),Zt()):console.log(e)})).catch((function(t){console.log("error",t)}))},oe=function(){var t=new FormData,e=st.csTalkId;t.append("csTalkId",e);var n={method:"post",maxBodyLength:1/0,headers:{Authorization:"Bearer "+{NODE_ENV:"production",PUBLIC_URL:"/react_intranet",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FRONT_URL:"http://localhost:3000",REACT_APP_SERVER_URL:"http://localhost:8090"}.REACT_APP_TEMP_JWT_LGEKR},data:t};(0,v.ez)("/csTalk/public",n).then((function(t){var n=t.data;200===n.code?(vt((0,l.Z)((0,l.Z)({},pt),{},{alertTxt:"You've changed open status for this post to all.",isDoubleBtn:!1,btnTxt:"Close"})),dt(e)):console.log(n)})).catch((function(t){console.log("error",t)}))};(0,i.useLayoutEffect)((function(){Zt()}),[bt.page]),(0,i.useEffect)((function(){if(0===q.length)Pt(0);else{var t=kt;1===bt.page&&(t=0,console.log("ms",t),q.map((function(e){e.rn>t&&(console.log(e.rn),t=e.rn),Pt(t)})))}}),[q]);var se=(0,i.useState)([]),ae=(0,c.Z)(se,2),le=ae[0],ce=ae[1],ie=(0,i.useState)(!1),re=(0,c.Z)(ie,2),de=re[0],ue=(re[1],(0,i.useState)(!1)),me=(0,c.Z)(ue,2),he=(me[0],me[1]);return(0,i.useEffect)((function(){var t;console.log("file",null===(t=le[0])||void 0===t?void 0:t.fileName)}),[le]),(0,i.useEffect)((function(){Kt(),he(!0);var t=setTimeout((function(){he(!1)}),500);return function(){return clearTimeout(t)}}),[wt]),(0,i.useEffect)((function(){""!==st.csTalkId||Y||Mt?rt(!0):rt(!1)}),[st.csTalkId,Y,Mt]),(0,i.useEffect)((function(){console.log("selected item---\x3e",st)}),[st]),(0,i.useEffect)((function(){Y&&at({attachments:"",subject:"",branch:"",center:"",commentCount:0,content:"",createdAt:"",csTalkId:"",hits:0,isPublic:null,likeCount:0,parentCsId:"",subsidiary:"",writerID:"",reactionState:"",writerName:""})}),[Y]),(0,D.jsx)(Z,{openright:it,iswrite:Y||Mt,children:(0,D.jsx)("div",{className:"notice-container cstalk-container",children:(0,D.jsxs)("div",{className:"inner-container",children:[(0,D.jsx)(h.Z,{searchArea:!0,auth:s.isWriter,options:y,handleChange:function(t,e){console.log("handleSelectBox",t,e);var n=t.value;jt((0,l.Z)((0,l.Z)({},bt),{},{view:n}))},onChange:function(t){return jt((0,l.Z)((0,l.Z)({},bt),{},{search:t.target.value}))},onClick:Zt}),(0,D.jsxs)("div",{children:[(0,D.jsxs)("div",{className:"cstalk-contents ",children:[(0,D.jsxs)("div",{className:"cstalk-left",children:[(0,D.jsxs)("div",{className:"cstalk-count",children:["Total ",(0,D.jsx)("span",{className:"custom-stress-txt",children:kt})]}),(0,D.jsxs)("div",{className:"board-menu",children:[(0,D.jsx)("span",{className:"col-1",style:null!==st&&void 0!==st&&st.csTalkId?{width:"10%"}:null,children:"No."}),(0,D.jsx)("span",{className:"col-3",children:"Title"}),(0,D.jsx)("span",{className:"col-4 ".concat(it?"custom-hide-item":""),children:"Writer"}),(0,D.jsx)("span",{className:"col-5 ".concat(it?"custom-hide-item":""),children:"Recommand"}),(0,D.jsx)("span",{className:"col-6",style:null!==st&&void 0!==st&&st.csTalkId?{width:"15%"}:null,children:"Count"}),(0,D.jsx)("span",{className:"col-7",style:null!==st&&void 0!==st&&st.csTalkId?{width:"15%"}:null,children:"Date"})]}),(0,D.jsx)("div",{children:0!==q.length?q.length>0&&q.map((function(t,n){var o,s,a;return console.log(t.cstalkId),(0,D.jsxs)("div",{className:"board-list custom-flex-item custom-align-item cursor-btn ".concat(st.cstalkId===t.cstalkId?"hover-selected":""),onClick:function(e){return function(t,e){if(console.log("handle clikc edf smflknsdklf",e),ce([]),(Y||Mt)&&(""!==tt.title||""!==tt.content))return _t(1,e),!1;Y?V(!1):zt(!1),at(e)}(0,t)},children:[(0,D.jsx)("ul",{className:"col-1",style:null!==st&&void 0!==st&&st.cstalkId?{width:"10%"}:null,children:(0,D.jsx)("li",{id:"list-item-".concat(n+1),children:(0,D.jsx)("span",{children:String(16*(I-1)+(n+1)).padStart(3,"0")})})}),(0,D.jsx)("ul",{className:"col-3",children:(0,D.jsxs)("li",{id:"list-item-".concat(n+1),children:[(0,D.jsxs)("span",{className:"board-max-length",children:[it?null===t||void 0===t?void 0:t.subject.slice(0,60):null===t||void 0===t?void 0:t.subject.slice(0,82),it?(null===(s=t.subject)||void 0===s?void 0:s.length)>60&&"...":(null===(o=t.subject)||void 0===o?void 0:o.length)>82&&"..."]}),(0,D.jsx)("img",{src:u()(null===t||void 0===t?void 0:t.createdAt).format("YYYY-MM-DD HH:mm:ss")>e?_.Z:null}),0!==t.commentCount&&(0,D.jsx)("span",{className:"custom-stress-txt",children:"(".concat(t.commentCount,")")})]})}),(0,D.jsx)("ul",{className:"col-4 ".concat(it&&"custom-hide-item"),children:(0,D.jsx)("li",{id:"list-item-".concat(n+1),children:(0,D.jsxs)("span",{children:[null===t||void 0===t||null===(a=t.writerName)||void 0===a?void 0:a.slice(0,10),(null===t||void 0===t?void 0:t.writerName.length)>=10&&"..."]})})}),(0,D.jsx)("ul",{className:"col-5 ".concat(it&&"custom-hide-item"),children:(0,D.jsxs)("li",{id:"list-item-".concat(n+1),children:[(0,D.jsx)("img",{src:b.Z,alt:"like-img"}),(0,D.jsx)("span",{children:null===t||void 0===t?void 0:t.likeCount})]})}),(0,D.jsx)("ul",{className:"col-6",style:null!==st&&void 0!==st&&st.csTalkId?{width:"15%"}:null,children:(0,D.jsx)("li",{id:"list-item-".concat(n+1),children:(0,D.jsx)("span",{children:null===t||void 0===t?void 0:t.hits})})}),(0,D.jsx)("ul",{className:"col-7",style:null!==st&&void 0!==st&&st.csTalkId?{width:"15%"}:null,children:(0,D.jsx)("li",{id:"list-item-".concat(n+1),children:(0,D.jsx)("span",{children:u()(null===t||void 0===t?void 0:t.createdAt).format("MM.DD.YY")})})})]},(0,v.zs)(n))})):(0,D.jsx)("div",{className:"no-data",children:"no data"})}),q&&(0,D.jsx)(m.Z,{activePage:I,itemsCountPerPage:O,totalItemsCount:kt,pageRangeDisplayed:5,prevPageText:"\u2039",nextPageText:"\u203a",onChange:function(t){w(t),console.log("page ----\x3e",t)},hideFirstLastPages:!0}),(0,D.jsx)("div",{className:"write-btn",onClick:function(){return Y?Mt?_t(7,st.csTalkId):Y?_t(1):null:V(!0)},children:(0,D.jsx)("span",{children:"Write"})})]}),Y?(0,D.jsx)("div",{className:"editor-wrapper",children:(0,D.jsx)(T.Z,{data:tt,isWriter:Y,setData:et,onSave:function(){if(console.log(tt,"111111111111111111111111111111111111"),""===tt.title||""===tt.content||null===tt.isPublic)return vt((0,l.Z)((0,l.Z)({},pt),{},{alertTxt:"Please fill out all the information.",isDoubleBtn:!1,btnTxt:"Close",confirmTxt:""})),!1;if(Y){var t=new FormData;for(var e in tt)tt.hasOwnProperty(e)&&t.append(e,tt[e]);var n={method:"post",maxBodyLength:1/0,headers:{Authorization:"Bearer "+{NODE_ENV:"production",PUBLIC_URL:"/react_intranet",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FRONT_URL:"http://localhost:3000",REACT_APP_SERVER_URL:"http://localhost:8090"}.REACT_APP_TEMP_JWT_LGEKR},data:t};(0,v.ez)("/csTalk/insert",n).then((function(t){200===t.data.code?(vt((0,l.Z)((0,l.Z)({},pt),{},{alertTxt:"You've inserted new post.",isDoubleBtn:!1,btnTxt:"Close",confirmTxt:""})),V(!1),et({title:st.subject,content:st.content,isPublic:st.isPublic,attachments:st.attachments,csTalkId:st.csTalkId}),Zt(),Ft()):console.log(t,"else")})).catch((function(t){console.log("error",t)}))}},onClose:function(){return""!==tt.title||""!==tt.content?_t(1):(V(!1),rt(!1))},range:!0})}):Y||""===st.csTalkId||Mt?Mt?(0,D.jsx)(T.Z,{data:tt,setData:et,range:!0,onSave:function(){if(""===tt.title||""===tt.content||null===tt.isPublic)return vt((0,l.Z)((0,l.Z)({},pt),{},{alertTxt:"Please fill out all the information.",isDoubleBtn:!1,btnTxt:"Close"})),!1;if(Mt){console.log("content : ",tt);var t=new FormData;for(var e in tt)tt.hasOwnProperty(e)&&t.append(e,tt[e]);var n={method:"post",maxBodyLength:1/0,headers:{Authorization:"Bearer "+{NODE_ENV:"production",PUBLIC_URL:"/react_intranet",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FRONT_URL:"http://localhost:3000",REACT_APP_SERVER_URL:"http://localhost:8090"}.REACT_APP_TEMP_JWT_LGEKR},data:t};(0,v.ez)("/csTalk/update",n).then((function(t){var e=t.data;200===e.code?(vt((0,l.Z)((0,l.Z)({},pt),{},{alertTxt:"You've modified your post.",isDoubleBtn:!1,btnTxt:"Close"})),zt(!1),et({title:st.subject,content:st.content,isPublic:st.isPublic,attachments:st.attachments,csTalkId:st.csTalkId}),Zt(),dt(tt.csTalkId)):console.log(e,"resData")})).catch((function(t){console.log("error",t)}))}},onClose:function(){return""!==tt.title||""!==tt.content?_t(1):zt(!1)},onDelete:function(){return _t(3)}},st.csTalkId):null:(0,D.jsxs)("div",{className:"cstalk-right custom-flex-item ".concat(de?"loadingOpacity":""),children:[(0,D.jsxs)("div",{className:"board-view-top",children:[(0,D.jsxs)("div",{className:"board-btn-area custom-flex-item custom-align-item custom-justify-between",children:[(0,D.jsxs)("button",{className:"board-minimize-btn",onClick:function(){H(!0)},children:[(0,D.jsx)("img",{src:N.Z,alt:"minimize-btn",className:"screen-icon"})," Full Screen"]}),(0,D.jsx)("img",{src:P.Z,alt:"close-btn",onClick:Ft})]}),(0,D.jsx)("p",{className:"board-title",children:st.subject}),(0,D.jsxs)("p",{className:"board-title-detail",children:[(0,D.jsx)("span",{children:"Writer"})," : ",st.writerName," \xa0",(0,D.jsx)("span",{children:"Date"})," : ",u()(st.createdAt).format("'DD.MM.YY")]}),(0,D.jsx)("div",{className:"board-title-attach",children:(0,D.jsx)("span",{className:"custom-flex-item custom-align-item",children:(0,D.jsx)("div",{className:"custom-flex-item custom-align-item custom-flex-wrap",children:0!==le.length&&le.map((function(t,e){return(0,D.jsxs)("span",{className:"board-attach-box",onClick:function(){return(0,v.Ve)(t.uploadPath)},children:[(0,D.jsx)("img",{src:C.Z,alt:"attachment",className:"attach-icon"}),(0,D.jsx)("p",{children:"".concat(t.fileName," ").concat(null!==t&&void 0!==t&&t.fileSize?"(".concat((0,v.hy)(t.fileSize),")"):"")}),(0,D.jsxs)("span",{className:"board-attach-down",onClick:function(){return(0,v.Ve)(t.uploadPath)},children:[(0,D.jsx)("img",{src:E.Z,alt:"attachment-download"})," "]})]},(0,v.zs)(e))}))})})})]}),(0,D.jsxs)("div",{className:"board-view-middle",children:[(0,D.jsxs)("div",{className:"cstalk-right-middle",children:[(0,D.jsxs)("div",{className:"ck-viewer",children:[" ",(0,D.jsx)(x.Z,{content:st.content})]}),(0,D.jsxs)("div",{className:"setting-viewer custom-flex-item",children:[st.writerID===t.id&&(0,D.jsx)("div",{style:{marginRight:"auto"},children:(0,D.jsx)("button",{onClick:function(){return _t(3)},className:"custom-flex-item custom-align-item ",children:"Delete"})}),1!==st.isPublic&&"LGEKR"===t.subsidiary&&(0,D.jsx)("div",{children:(0,D.jsx)("button",{className:"custom-flex-item custom-align-item",onClick:function(){return _t(2)},children:"Allow Views"})}),st.writerID===t.id&&(0,D.jsx)("div",{children:(0,D.jsx)("button",{className:"custom-flex-item custom-align-item",onClick:function(){et((0,l.Z)((0,l.Z)({},tt),{},{title:st.subject,content:st.content,isPublic:st.isPublic,attachments:st.attachments,csTalkId:st.csTalkId})),zt(!0)},children:"Modify"})}),st.writerID!==t.id&&(0,D.jsx)("div",{children:(0,D.jsx)("button",{className:"custom-flex-item custom-align-item",onClick:function(){et((0,l.Z)((0,l.Z)({},tt),{},{csTalkId:st.csTalkId})),V(!0)},children:"Answer"})})]})]}),(0,D.jsxs)("div",{className:"cstalk-right-bottom",children:[(0,D.jsx)("div",{className:"user-action custom-flex-item ",children:(0,D.jsxs)("span",{className:"cstalk-like custom-flex-item ",onClick:function(t){return function(t,e){var n=new FormData;n.append("csTalkId",e);var o={method:"post",maxBodyLength:1/0,headers:{Authorization:"Bearer "+{NODE_ENV:"production",PUBLIC_URL:"/react_intranet",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_FRONT_URL:"http://localhost:3000",REACT_APP_SERVER_URL:"http://localhost:8090"}.REACT_APP_TEMP_JWT_LGEKR},data:n};(0,v.ez)("/csTalk/reaction",o).then((function(t){var e=t.data;200===e.code?(e.result,at((0,l.Z)((0,l.Z)({},st),{},{reactionState:"LIKE"===st.reactionState?"NONE":"LIKE",likeCount:"LIKE"===st.reactionState?st.likeCount-1:st.likeCount+1}))):console.log(e)})).catch((function(t){console.log("error",t)}))}(0,st.csTalkId)},children:[(0,D.jsx)("img",{src:"NONE"!==st.reactionState?j.Z:b.Z,alt:"btn_like",className:"cursor-btn"}),(0,D.jsx)("p",{children:st.likeCount})]})}),(0,D.jsxs)("div",{className:"cstalk-comment-wrapper",children:[(0,D.jsx)("span",{children:"Comments"}),(0,D.jsxs)("span",{className:"comment-cnt-title",children:["total ",(0,D.jsx)("p",{className:"custom-stress-txt comment-cnt",children:null===st||void 0===st?void 0:st.commentCount})]}),(0,D.jsxs)("div",{className:"custom-justify-between",children:[(0,D.jsxs)("div",{className:"comment-input",children:[(0,D.jsxs)("span",{children:["Writer : ",t.name]}),(0,D.jsx)("textarea",{value:Gt,onChange:function(t){return Jt(t.target.value)}})]}),(0,D.jsx)("button",{onClick:function(){return te(1)},children:"Write"})]})]}),(0,D.jsxs)("div",{className:"cstalk-comment-list",children:[(0,D.jsx)("ul",{children:null===Wt||void 0===Wt?void 0:Wt.map((function(e,n){var o,s;return(0,D.jsxs)("li",{children:[(0,D.jsxs)("div",{className:"comment-top custom-flex-item custom-justify-between",children:[(0,D.jsxs)("div",{children:[(0,D.jsx)("span",{children:e.writerName}),(0,D.jsx)("span",{children:u()(e.createdAt).format("MM.DD.YY")})]}),(0,D.jsxs)("span",{className:"custom-flex-item",children:[e.writerID===t.id&&(0,D.jsx)("p",{className:"cursor-btn comment-btn",onClick:function(){return _t(4,e.commentId)},children:"Delete"}),(0,D.jsx)("p",{className:"cursor-btn comment-btn",onClick:function(){!function(t){console.log("openCommentInput");for(var e=(0,a.Z)(Wt),n=0;n<e.length;n++)e[n].isInput=!1;e[t].isInput=!e[t].isInput,yt(e)}(n),$t("")},children:"Answer"})]})]}),(0,D.jsxs)("div",{className:"comment-middle",children:[null===(o=e.content)||void 0===o?void 0:o.slice(0,250),(null===(s=e.content)||void 0===s?void 0:s.length)>250&&(0,D.jsx)("span",{className:"custom-stress-txt",children:"...More"})]}),(0,D.jsxs)("div",{className:e.openSubComment?"comment-bottom":"comment-bottom ",children:[0!==e.subComment.length&&(0,D.jsxs)("div",{className:"custom-flex-item cursor-btn",onClick:function(t){return function(t,e,n){var o=(0,a.Z)(Wt);o[e].openSubComment=!o[e].openSubComment,yt(o)}(0,n,e.csTalkId)},children:[(0,D.jsx)("img",{src:g.Z,alt:"under-comment"}),(0,D.jsx)("span",{children:"Comment"}),(0,D.jsxs)("span",{className:"custom-stress-txt",children:["( ",e.subComment.length," ) "]}),(0,D.jsx)("img",{src:e.openSubComment?k.Z:S.Z,alt:"under-comment",className:"toggle-sub-btn"})]}),e.openSubComment?(0,D.jsx)("div",{children:(0,D.jsx)("ul",{className:"submment-wrapper",children:e.subComment.map((function(e,n){var o,s;return(0,D.jsxs)("li",{children:[(0,D.jsxs)("div",{className:"comment-top custom-flex-item custom-justify-between",children:[(0,D.jsxs)("div",{children:[(0,D.jsx)("span",{children:e.writerName}),(0,D.jsx)("span",{children:u()(e.createdAt).format("YYYY-MM-DD")})]}),(0,D.jsx)("span",{className:"custom-flex-item cursor-btn",children:e.writerID===t.id&&(0,D.jsx)("p",{onClick:function(){return _t(4,e.commentId)},children:"Delete"})})]}),(0,D.jsxs)("div",{className:"comment-middle",children:[null===(o=e.content)||void 0===o?void 0:o.slice(0,250),(null===(s=e.content)||void 0===s?void 0:s.length)>250&&(0,D.jsx)("span",{className:"custom-stress-txt",children:"...More"})]})]})}))})}):null,e.isInput&&(0,D.jsx)("div",{className:"cstalk-comment-wrapper sub-comment-wrapper",children:(0,D.jsxs)("div",{className:"custom-justify-between",children:[(0,D.jsxs)("div",{className:"comment-input",children:[(0,D.jsxs)("span",{children:["Writer : ",t.name]}),(0,D.jsx)("textarea",{defaultValue:Xt,onBlur:function(t){return $t(t.target.value)},id:"sub-".concat(e.commentId,"-").concat(n)})]}),(0,D.jsx)("button",{onClick:function(){return te(2,e.commentId)},children:"Write"})]})})]})]},(0,v.zs)(n))}))}),0!==Wt.length&&(0,D.jsx)(m.Z,{activePage:wt,itemsCountPerPage:5,totalItemsCount:st?st.commentCount:0,pageRangeDisplayed:5,prevPageText:"\u2039",nextPageText:"\u203a",onChange:function(t){Lt(t),console.log("page ----\x3e",t)},hideFirstLastPages:!0})]})]})]})]})]}),U&&(0,D.jsx)(f.Z,{data:st,onClose:function(){return H(!1),Ft()},onMinimizing:function(){return H(!1)}}),ht&&(0,D.jsx)(p.Z,{alertTxt:pt.alertTxt,onClose:function(){return xt(!1)},onConfirm:pt.onConfirm,twoBtn:pt.isDoubleBtn,btnTxt:pt.btnTxt})]})]})})})};var Z=r.zo.div(o||(o=(0,s.Z)(["\n    .cstalk-left {\n        width: "," !important; \n    }\n    .cstalk-left .cstalk-custom-board li {\n        padding : ","\n    }\n\n    .board-list {\n        padding : ","\n     \n    }\n    .cstalk-contents{\n        .editor-border {\n            overflow: ","\n        }\n        .cstalk-editor {\n          overflow: auto;\n        max-height: 812px;\n        }\n    \n        .cstalk-editor::-webkit-scrollbar {\n            width: 8px;\n          }\n          \n          .cstalk-editor::-webkit-scrollbar-thumb {\n            background-color: #888;\n            border-radius: 4px;\n          }\n          \n          .cstalk-editor::-webkit-scrollbar-track {\n            background-color: #f1f1f1;\n          }  \n          \n    }\n"])),(function(t){return t.openright?"49%":"100%"}),(function(t){return t.openright?"10px 0px;":"17px 0px"}),(function(t){return t.openright,"10px 0px;"}),(function(t){return t.iswrite?"auto":"hidden !important;"}))}}]);
//# sourceMappingURL=39.cdc806b4.chunk.js.map
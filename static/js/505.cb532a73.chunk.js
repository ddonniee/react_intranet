"use strict";(self.webpackChunkasc_portal=self.webpackChunkasc_portal||[]).push([[505],{1790:function(e,t,n){var a=n(1413),i=(n(2791),n(7759)),o=n(184);t.Z=function(e){var t=e.options,n=e.handleChange,s=e.defaultValue,l=e.placeholder,r=e.minHeight,c={control:function(e,t){return(0,a.Z)((0,a.Z)({},e),{},{borderColor:t.isSelected||t.isFocused?"#BB0841":"#D8D8D8",boxShadow:t.isFocused?"0 0 0 2px rgba(255, 0, 0, 0.3)":null,minHeight:"32px",height:r?"32px":null})},option:function(e,t){return(0,a.Z)((0,a.Z)({},e),{},{borderColor:t.isSelected||t.isFocused?"#BB0841":"#D8D8D8",backgroundColor:t.isSelected?"#BB0841":t.isFocused?"#FAF1F4":"white",minHeight:"32px",height:r?"32px":null})}};return(0,o.jsx)(i.ZP,{className:"custom-select",options:t,onChange:n,styles:c,defaultValue:s||null,placeholder:l||null})}},8772:function(e,t,n){n.d(t,{Z:function(){return u}});var a=n(9439),i=n(2791),o=n(7689),s=[{name:"Main",to:"> Support >",path:"/"},{name:"ASC Holding Status",to:"> Support > Dashboard >",path:"/dashboard/ascholdingstatus"},{name:"Process & FAQ",to:"> Support > Dashboard >",path:"/process&support/faq"},{name:"CS Talk",to:"> Support > Board >",path:"/board/cstalk"},{name:"FAQ Setting",to:"> Support > Setting & Admin >",path:"/setting/faq"}],l=(n(1790),n(5840));var r=n.p+"static/media/icon_home.7bd0665aef435998d5520ed54df43486.svg",c=n(184),u=function(e){var t=e.auth,n=(e.options,e.handleChange,e.searchArea),u=e.onChange,d=e.onClick,f=(0,i.useState)(""),p=(0,a.Z)(f,2),h=p[0],m=p[1],g=(0,o.TH)(),x=(0,i.useState)(""),v=(0,a.Z)(x,2),b=v[0],C=v[1];return(0,i.useEffect)((function(){var e=g.pathname,t=s.find((function(t){return t.path===e}));t?(C(t.to),m(t.name)):C("")}),[g]),(0,c.jsxs)("div",{className:"title-wrapper".concat("Main"===h?" title-main-wrapper":n?" title-board-wrapper":""),children:[(0,c.jsx)("div",{className:"title-inner",children:"Main"===h?null:(0,c.jsx)("div",{className:"page-title-area ".concat(n?"":"custom-txt-align"),style:t?null:{textAlign:"center"},children:h})}),(0,c.jsxs)("div",{className:"path-inner".concat(n?" path-column":""),children:[(0,c.jsxs)("div",{className:"page-path-area",children:[(0,c.jsx)("img",{src:r,alt:"home"}),b," ",(0,c.jsx)("p",{className:"bold-title",children:h})]}),t&&n?(0,c.jsx)("div",{className:"title-nav",children:(0,c.jsxs)("div",{className:"custom-flex-item custom-align-item",children:[(0,c.jsx)("p",{children:"\xb7 Search"}),(0,c.jsx)("input",{type:"text",className:"title-nav-input",id:"title-nav-input",onChange:u}),(0,c.jsxs)("button",{className:"title-nav-btn custom-flex-item custom-align-item",onClick:d,children:[" ",(0,c.jsx)(l.r,{})," "]})]})}):null]})]})}},505:function(e,t,n){n.r(t),n.d(t,{default:function(){return p}});var a=n(1413),i=n(9439),o=n(2791),s=n(5013),l=n(4005),r=n(3637),c=(n(8890),n(4440),n(5724),n(2166),n(5822),n(184)),u=function(e){var t=e.data,n=e.column,s=e.paging,u=e.checkbox,d=e.checkedItems,f=e.changeValue,p=e.isModify,h=e.multiple,m=(0,o.useRef)(),g=(0,o.useState)(),x=(0,i.Z)(g,2),v=x[0],b=x[1],C=(0,o.useState)(n),S=(0,i.Z)(C,2),Z=S[0],j=S[1],N=(0,o.useState)(h),D=(0,i.Z)(N,2),T=D[0],w=(D[1],(0,o.useState)(1)),k=(0,i.Z)(w,2),E=k[0],F=k[1],P=(0,o.useState)(10),B=(0,i.Z)(P,1)[0],y=(0,o.useState)(u),z=(0,i.Z)(y,2),A=(z[0],z[1]),R=(0,o.useState)([]),H=(0,i.Z)(R,2);H[0],H[1];(0,o.useLayoutEffect)((function(){b(t),j(n),j(p?function(e){return e.map((function(e){return(0,a.Z)((0,a.Z)({},e),{},{editable:!0})}))}:function(e){return e.map((function(e){return(0,a.Z)((0,a.Z)({},e),{},{editable:!1})}))})}),[t,p]),(0,o.useEffect)((function(){b(t);var e=n.map((function(e){return(0,a.Z)((0,a.Z)({},e),{},{editable:!!e.editable})}));j(e)}),[t,n]);var V=(0,o.useCallback)((function(e){b(t),j(n),m.current.api.sizeColumnsToFit()}),[]),M=(0,o.useMemo)((function(){return{editable:!1,sortable:!0,flex:1}}));(0,o.useEffect)((function(){return q(),window.addEventListener("resize",q),function(){window.removeEventListener("resize",q)}}),[]);var q=function(){var e=44*((null===t||void 0===t?void 0:t.length)+1),n=document.querySelector(".ag-theme-alpine");n&&(n.style.height="".concat(e,"px"))},I=(0,o.useCallback)((function(e){var t=e.api.getSelectedNodes().map((function(e){return e.data}));d(t)}),[d]);return(0,o.useEffect)((function(){u?A(!0):u||A(!1)}),[]),(0,c.jsx)("div",{children:t&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{className:"ag-theme-alpine",children:(0,c.jsx)(l.s,{ref:m,rowData:v,columnDefs:Z,defaultColDef:M,animateRows:!0,rowSelection:T?"multiple":"single",onCellClicked:function(e){var n=e.data;d&&d(n),t&&f(t)},pagination:!!s,paginationPageSize:10,suppressPaginationPanel:!0,suppressScrollOnNewData:!0,suppressRowClickSelection:!0,suppressRowTransform:!0,suppressClickEdit:!1,onGridReady:V,onSelectionChanged:I,suppressCellFocus:!p,onCellValueChanged:function(e){e.data;console.log(e,"ehandleCellValueChanged")}})}),s?(0,c.jsx)(r.Z,{activePage:E,itemsCountPerPage:B,totalItemsCount:null===t||void 0===t?void 0:t.length,pageRangeDisplayed:5,prevPageText:"\u2039",nextPageText:"\u203a",onChange:function(e){F(e),console.log("page ----\x3e",e),m.current.api.paginationGoToPage(e)}}):null]})})},d=n(8772),f=n(4442);var p=function(){var e=(0,o.useState)([{headerName:"No",field:"no",resizable:!1,maxWidth:50},{headerName:"Hold Reason",field:"reason",resizable:!1,minWidth:300},{headerName:"Division",field:"division",resizable:!1},{headerName:"Responsibility to",field:"staff",resizable:!1},{headerName:"Due date",field:"dueDate",resizable:!1},{headerName:"Pending date",field:"pendingDate",resizable:!1}]),t=(0,i.Z)(e,2),n=t[0],l=(t[1],(0,o.useState)(!1)),r=(0,i.Z)(l,2),p=(r[0],r[1]),h=(0,o.useState)([]),m=(0,i.Z)(h,2),g=m[0],x=m[1],v=(0,o.useState)(!1),b=(0,i.Z)(v,2),C=b[0],S=b[1],Z=(0,o.useState)({alertTxt:"",onConfirm:function(){},isDoubleBtn:!1,btnTxt:"Close",confirmTxt:""}),j=(0,i.Z)(Z,2),N=j[0],D=j[1];return(0,o.useEffect)((function(){C||D({alertTxt:"",onConfirm:function(){},isDoubleBtn:!1,btnTxt:"Close",confirmTxt:""})}),[C]),(0,o.useEffect)((function(){""!==N.alertTxt?S(!0):S(!1)}),[N]),(0,o.useEffect)((function(){p(!0),(0,s.JI)("/ascData").then((function(e){console.log(e),e?x(e):(console.log(e),D((0,a.Z)((0,a.Z)({},N),{},{alertTxt:"Client Error"}))),p(!1)})).catch((function(e){console.log("error",e),D((0,a.Z)((0,a.Z)({},N),{},{alertTxt:"Server Error"})),p(!1)}))}),[]),(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)("div",{className:"inner-container",children:[(0,c.jsx)(d.Z,{auth:1,searchArea:!1}),(0,c.jsx)("div",{className:"user-content",children:0!==g.length&&(0,c.jsx)("div",{className:"grid",children:(0,c.jsx)(u,{data:g,column:n,paging:!1,changeValue:x})})}),C&&(0,c.jsx)(f.Z,{alertTxt:N.alertTxt,onClose:function(){return S(!1)},onConfirm:N.onConfirm,twoBtn:N.isDoubleBtn,btnTxt:N.btnTxt})]})})}}}]);
//# sourceMappingURL=505.cb532a73.chunk.js.map
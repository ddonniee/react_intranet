"use strict";(self.webpackChunkasc_portal=self.webpackChunkasc_portal||[]).push([[505],{1790:function(e,a,n){var t=n(1413),s=(n(2791),n(7759)),i=n(184);a.Z=function(e){var a=e.options,n=e.handleChange,o=e.defaultValue,l=e.placeholder,r=e.minHeight,c={control:function(e,a){return(0,t.Z)((0,t.Z)({},e),{},{borderColor:a.isSelected||a.isFocused?"#BB0841":"#D8D8D8",boxShadow:a.isFocused?"0 0 0 2px rgba(255, 0, 0, 0.3)":null,minHeight:"32px",height:r?"32px":null})},option:function(e,a){return(0,t.Z)((0,t.Z)({},e),{},{borderColor:a.isSelected||a.isFocused?"#BB0841":"#D8D8D8",backgroundColor:a.isSelected?"#BB0841":a.isFocused?"#FAF1F4":"white",minHeight:"32px",height:r?"32px":null})}};return(0,i.jsx)(s.ZP,{className:"custom-select",options:a,onChange:n,styles:c,defaultValue:o||null,placeholder:l||null})}},8772:function(e,a,n){n.d(a,{Z:function(){return d}});var t=n(9439),s=n(2791),i=n(7689),o=[{name:"Main",to:"> Support >",path:"/"},{name:"ASC Holding Status",to:"> Support > Dashboard >",path:"/dashboard/ascholdingstatus"},{name:"Process & FAQ",to:"> Support > Dashboard >",path:"/process&support/faq"},{name:"CS Talk",to:"> Support > Board >",path:"/board/cstalk"},{name:"FAQ Setting",to:"> Support > Setting & Admin >",path:"/setting/faq"}],l=(n(1790),n(5840));var r=n.p+"static/media/icon_home.7bd0665aef435998d5520ed54df43486.svg",c=n(184),d=function(e){var a=e.auth,n=(e.options,e.handleChange,e.searchArea),d=e.onChange,u=e.onClick,f=(0,s.useState)(""),p=(0,t.Z)(f,2),m=p[0],h=p[1],g=(0,i.TH)(),v=(0,s.useState)(""),x=(0,t.Z)(v,2),D=x[0],S=x[1];return(0,s.useEffect)((function(){var e=g.pathname,a=o.find((function(a){return a.path===e}));a?(S(a.to),h(a.name)):S("")}),[g]),(0,c.jsxs)("div",{className:"title-wrapper".concat("Main"===m?" title-main-wrapper":n?" title-board-wrapper":""),children:[(0,c.jsx)("div",{className:"title-inner",children:"Main"===m?null:(0,c.jsx)("div",{className:"page-title-area ".concat(n?"":"custom-txt-align"),style:a?null:{textAlign:"center"},children:m})}),(0,c.jsxs)("div",{className:"path-inner".concat(n?" path-column":""),children:[(0,c.jsxs)("div",{className:"page-path-area",children:[(0,c.jsx)("img",{src:r,alt:"home"}),D," ",(0,c.jsx)("p",{className:"bold-title",children:m})]}),a&&n?(0,c.jsx)("div",{className:"title-nav",children:(0,c.jsxs)("div",{className:"custom-flex-item custom-align-item",children:[(0,c.jsx)("p",{children:"\xb7 Search"}),(0,c.jsx)("input",{type:"text",className:"title-nav-input",id:"title-nav-input",onChange:d}),(0,c.jsxs)("button",{className:"title-nav-btn custom-flex-item custom-align-item",onClick:u,children:[" ",(0,c.jsx)(l.r,{})," "]})]})}):null]})]})}},505:function(e,a,n){n.r(a),n.d(a,{default:function(){return h}});var t=n(9439),s=n(2791),i=(n(5013),n(1413)),o=n(4005),l=n(3637),r=(n(8890),n(4440),n(5724),n(2166),n(5822),n(184)),c=function(e){var a=e.data,n=e.column,c=e.paging,d=e.checkbox,u=e.checkedItems,f=e.changeValue,p=e.isModify,m=e.multiple,h=(0,s.useRef)(),g=(0,s.useState)(),v=(0,t.Z)(g,2),x=v[0],D=v[1],S=(0,s.useState)(n),b=(0,t.Z)(S,2),C=b[0],j=b[1],Z=(0,s.useState)(m),y=(0,t.Z)(Z,2),N=y[0],k=(y[1],(0,s.useState)(1)),w=(0,t.Z)(k,2),T=w[0],P=w[1],F=(0,s.useState)(10),I=(0,t.Z)(F,1)[0],E=(0,s.useState)(d),z=(0,t.Z)(E,2),B=(z[0],z[1]),M=(0,s.useState)([]),A=(0,t.Z)(M,2);A[0],A[1];(0,s.useLayoutEffect)((function(){D(a),j(n),j(p?function(e){return e.map((function(e){return(0,i.Z)((0,i.Z)({},e),{},{editable:!0})}))}:function(e){return e.map((function(e){return(0,i.Z)((0,i.Z)({},e),{},{editable:!1})}))})}),[a,p]),(0,s.useEffect)((function(){D(a);var e=n.map((function(e){return(0,i.Z)((0,i.Z)({},e),{},{editable:!!e.editable})}));j(e)}),[a,n]);var R=(0,s.useCallback)((function(e){D(a),j(n),h.current.api.sizeColumnsToFit()}),[]),H=(0,s.useMemo)((function(){return{editable:!1,sortable:!0,flex:1}}));(0,s.useEffect)((function(){return V(),window.addEventListener("resize",V),function(){window.removeEventListener("resize",V)}}),[]);var V=function(){var e=44*((null===a||void 0===a?void 0:a.length)+1),n=document.querySelector(".ag-theme-alpine");n&&(n.style.height="".concat(e,"px"))},L=(0,s.useCallback)((function(e){var a=e.api.getSelectedNodes().map((function(e){return e.data}));u(a)}),[u]);return(0,s.useEffect)((function(){d?B(!0):d||B(!1)}),[]),(0,r.jsx)("div",{children:a&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"ag-theme-alpine",children:(0,r.jsx)(o.s,{ref:h,rowData:x,columnDefs:C,defaultColDef:H,animateRows:!0,rowSelection:N?"multiple":"single",onCellClicked:function(e){var n=e.data;u&&u(n),a&&f(a)},pagination:!!c,paginationPageSize:10,suppressPaginationPanel:!0,suppressScrollOnNewData:!0,suppressRowClickSelection:!0,suppressRowTransform:!0,suppressClickEdit:!1,onGridReady:R,onSelectionChanged:L,suppressCellFocus:!p,onCellValueChanged:function(e){e.data;console.log(e,"ehandleCellValueChanged")}})}),c?(0,r.jsx)(l.Z,{activePage:T,itemsCountPerPage:I,totalItemsCount:null===a||void 0===a?void 0:a.length,pageRangeDisplayed:5,prevPageText:"\u2039",nextPageText:"\u203a",onChange:function(e){P(e),console.log("page ----\x3e",e),h.current.api.paginationGoToPage(e)}}):null]})})},d=n(8772),u=n(4442),f=n(2903),p=n(7162),m=n(8859);var h=function(){var e=(0,s.useState)([{headerName:"No",field:"no",resizable:!1,maxWidth:50},{headerName:"Hold Reason",field:"reason",resizable:!1,minWidth:300},{headerName:"Division",field:"division",resizable:!1},{headerName:"Responsibility to",field:"staff",resizable:!1},{headerName:"Due date",field:"dueDate",resizable:!1},{headerName:"Pending date",field:"pendingDate",resizable:!1}]),a=(0,t.Z)(e,2),n=a[0],i=(a[1],(0,s.useState)(!1)),o=(0,t.Z)(i,2),l=(o[0],o[1]),h=(0,s.useState)([]),g=(0,t.Z)(h,2),v=g[0],x=g[1],D=(0,s.useState)(!1),S=(0,t.Z)(D,2),b=S[0],C=S[1],j=(0,s.useState)({alertTxt:"",onConfirm:function(){},isDoubleBtn:!1,btnTxt:"Close",confirmTxt:""}),Z=(0,t.Z)(j,2),y=Z[0],N=Z[1];return(0,s.useEffect)((function(){b||N({alertTxt:"",onConfirm:function(){},isDoubleBtn:!1,btnTxt:"Close",confirmTxt:""})}),[b]),(0,s.useEffect)((function(){""!==y.alertTxt?C(!0):C(!1)}),[y]),(0,s.useEffect)((function(){l(!0),x([{ascId:"asc-1",no:1,reason:"Pending Delivery Parts.",division:"Supply",staff:"Charsons",dueDate:"2023-07-11",pendingDate:"2 monthes"},{ascId:"asc-2",no:2,reason:"Shortage of supply",division:"Supply",staff:"whole team",dueDate:"2023-07-11",pendingDate:"1 day"},{ascId:"asc-3",no:3,reason:"No staff",division:"Personal",staff:"Simson",dueDate:"2023-08-28",pendingDate:"2 weeks"},{ascId:"asc-4",no:4,reason:"Customer keeps making complains.",division:"Customer Service",staff:"Derik",dueDate:"2023-08-11",pendingDate:"1 month"},{ascId:"asc-5",no:5,reason:"Sugar Free meal for staff",division:"Meal",staff:"Milly",dueDate:"2023-08-28",pendingDate:"1 month"},{ascId:"asc-6",no:6,reason:"Missing Close job on system",division:"Operation",staff:"Chilly",dueDate:"2023-09-01",pendingDate:"1 week"},{ascId:"asc-7",no:7,reason:"Need confirmation before staring a job",division:"Development",staff:"Elizabath",dueDate:"2023-08-28",pendingDate:"2 weeks"},{ascId:"asc-8",no:8,reason:"System Error",division:"System",staff:"Eric",dueDate:"2023-09-06",pendingDate:"1 ayd"},{ascId:"asc-9",no:9,reason:"Pending to pay costs.",division:"Finance",staff:"Lee",dueDate:"2023-09-04",pendingDate:"2 day"},{ascId:"asc-10",no:10,reason:"Possible to chage due date",division:"Sales",staff:"Sara",dueDate:"2023-09-02",pendingDate:"4 days"},{ascId:"asc-11",no:11,reason:"Shortage of supply",division:"Supply",staff:"Nilson",dueDate:"2023-08-11",pendingDate:"1 month"},{ascId:"asc-12",no:12,reason:"Sugar Free meal for staff",division:"Meal",staff:"Milly",dueDate:"2023-08-28",pendingDate:"1 month"},{ascId:"asc-13",no:13,reason:"Missing Close job on system",division:"Operation",staff:"Chilly",dueDate:"2023-09-01",pendingDate:"1 week"},{ascId:"asc-14",no:14,reason:"Need confirmation before staring a job",division:"Development",staff:"Elizabath",dueDate:"2023-08-28",pendingDate:"2 weeks"}]),l(!1)}),[]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(f.Z,{}),(0,r.jsxs)("div",{className:"inner-container",children:[(0,r.jsx)(d.Z,{auth:1,searchArea:!1}),(0,r.jsx)("div",{className:"user-content",children:0!==v.length&&(0,r.jsx)("div",{className:"grid",children:(0,r.jsx)(c,{data:v,column:n,paging:!1,changeValue:x})})}),b&&(0,r.jsx)(u.Z,{alertTxt:y.alertTxt,onClose:function(){return C(!1)},onConfirm:y.onConfirm,twoBtn:y.isDoubleBtn,btnTxt:y.btnTxt}),(0,r.jsx)(m.Z,{}),(0,r.jsx)(p.Z,{})]})]})}}}]);
//# sourceMappingURL=505.17c15b7a.chunk.js.map
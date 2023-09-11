import React from "react";

// import componenets
const Main = React.lazy(() => import('./views/Home/Main'))
// Login
const Login = React.lazy(()=>import('./views/Login/Login'))
// Dashboard
const AscHoldingStatus =  React.lazy(()=>import('./views/Dashboard/AscHoldingStatus'))
// Process & Support
const Faq = React.lazy(() => import('./views/Process&Support/Faq'))
// Board
const CStalk = React.lazy(() => import('./views/Board/CStalk'))
// Setting & Management
const FaqSetting =  React.lazy(()=>import('./views/Setting&Management/FaqSetting'))
/**
 * 컴포넌트명 : routes.js
 * 컴포넌트기능 : 라우팅
 * 작성자 : 이은정
 * 작성일 : 2023.07.15
 */
const routes = [
    { path:'/', exact: true, name:'Main', element: Main}, 
    // Login
    { path:'/login', name:'Login', element: Login},
    // Dashboard
    { path:'/dashboard/ascholdingstatus', name:'AscHoldingStatus' , element: AscHoldingStatus},
    // Process Support
    { path:'/process&support/faq', name:'Faq' , element: Faq},
    // Board
    { path:'/board/cstalk', name:'CStalk' , element: CStalk},
    // Setting & Management
    { path:'/setting/faq', name:'FaqSetting' , element: FaqSetting},
]
export default routes

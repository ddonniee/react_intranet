import React from "react";

// import componenets
const Main = React.lazy(() => import('./views/Main'))
const Dashboard = React.lazy(() => import('./views/Dashboard'))
const Faq = React.lazy(() => import('./views/Faq'))

/**
 * 컴포넌트명 : routes.js
 * 컴포넌트기능 : 라우팅
 * 작성자 : 이은정
 * 작성일 : 2023.05.18
 */
const routes = [
    { path:'/', exact: true, name:'main', element: Main},
    { path:'/dashboard', name:'Dashboard' , element: Dashboard},
    { path:'/faq', name:'Faq' , element: Faq},
]
export default routes
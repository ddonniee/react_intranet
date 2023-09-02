import React from "react";

// import componenets
const Main = React.lazy(() => import('./views/Home/Main'))
// Login
const Login = React.lazy(()=>import('./views/Login/Login'))
// Dashboard
const KpiPerformance =  React.lazy(()=>import('./views/Dashboard/KpiPerformance'))
const Evaluation =  React.lazy(()=>import('./views/Dashboard/Evaluation'))
const TrainingStatus =  React.lazy(()=>import('./views/Dashboard/TrainingStatus'))
const IndividualTraining =  React.lazy(()=>import('./views/Dashboard/IndividualTraining'))
const Wip =  React.lazy(()=>import('./views/Dashboard/Wip'))
const AscHoldingStatus =  React.lazy(()=>import('./views/Dashboard/AscHoldingStatus'))
const PartsDeliveryTime =  React.lazy(()=>import('./views/Dashboard/PartsDeilveryTime'))
// Process & Support
const Faq = React.lazy(() => import('./views/Process&Support/Faq'))
const Raq =  React.lazy(()=>import('./views/Process&Support/Raq'))
// Board
const Notice =  React.lazy(()=> import('./views/Board/Notice'))
const CStalk = React.lazy(() => import('./views/Board/CStalk'))
// Setting & Management
const KpiPerformanceSetting =  React.lazy(()=>import('./views/Setting&Management/KpiPerformanceSetting'))
const EvaluationSetting =  React.lazy(()=>import('./views/Setting&Management/EvaluationSetting'))
const FaqSetting =  React.lazy(()=>import('./views/Setting&Management/FaqSetting'))
const NoticeSetting = React.lazy(()=>import('./views/Setting&Management/NoticeSetting'))
const StatisticsSetting = React.lazy(()=>import('./views/Setting&Management/StatisticsSetting'))
const UserManagement = React.lazy(() => import('./views/Setting&Management/UserManagement'))
const CommonCodeManagement =  React.lazy(()=>import('./views/Setting&Management/CommonCodeMangement'))

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
    { path:'/dashboard/kpiperformance',  name:'KpiPerformance', element: KpiPerformance},
    { path:'/dashboard/evaluation', name:'Evaluation' , element: Evaluation},
    { path:'/dashboard/trainingstatus', name:'TrainingStatue' , element: TrainingStatus},
    { path:'/dashboard/individualtraining', name:'IndividualTraining' , element: IndividualTraining},
    { path:'/dashboard/wip', name:'Wip' , element: Wip},
    { path:'/dashboard/ascholdingstatus', name:'AscHoldingStatus' , element: AscHoldingStatus},
    { path:'/dashboard/partsdeliverytime', name:'PartsDeliveryTime' , element: PartsDeliveryTime},
    // Process Support
    { path:'/process&support/faq', name:'Faq' , element: Faq},
    { path:'/process&support/raq', name:'Raq' , element: Raq},
    // Board
    { path:'/board/notice', name:'Notice' , element: Notice},
    { path:'/board/cstalk', name:'CStalk' , element: CStalk},
    // Setting & Management
    { path:'/setting/kpiperformance', name:'KpiPerformanceSetting' , element: KpiPerformanceSetting},
    { path:'/setting/evaluation', name:'EvaluationSetting' , element: EvaluationSetting},
    { path:'/setting/faq', name:'FaqSetting' , element: FaqSetting},
    { path:'/setting/notice', name:'NoticeSetting' , element: NoticeSetting},
    { path:'/setting/statistics', name:'StatisticsSetting' , element: StatisticsSetting},
    { path:'/setting/userManagement', name:'UserManagement' , element: UserManagement},
    { path:'/setting/commonCodeManagement', name:'CommonCodeManagement' , element: CommonCodeManagement},
]
export default routes

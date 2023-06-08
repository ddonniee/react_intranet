import React from "react";

// import componenets
const Main = React.lazy(() => import('./views/Home/Main'))
// Board
const CStalk = React.lazy(() => import('./views/Board/CStalk'))
const Notice =  React.lazy(()=> import('./views/Board/Notice'))
// Dashboard
const AscHoldingStatus =  React.lazy(()=>import('./views/Dashboard/AscHoldingStatus'))
const Evaluation =  React.lazy(()=>import('./views/Dashboard/Evaluation'))
const IndividualTraining =  React.lazy(()=>import('./views/Dashboard/IndividualTraining'))
const KpiPerformance =  React.lazy(()=>import('./views/Dashboard/KpiPerformance'))
const PartsDeliveryTime =  React.lazy(()=>import('./views/Dashboard/PartsDeilveryTime'))
const TrainingStatue =  React.lazy(()=>import('./views/Dashboard/TrainingStatus'))
const Wip =  React.lazy(()=>import('./views/Dashboard/Wip'))
// Process & Support
const Faq = React.lazy(() => import('./views/Process&Support/Faq'))
const Raq =  React.lazy(()=>import('./views/Process&Support/Raq'))
// Setting & Management
const EvaluationSetting =  React.lazy(()=>import('./views/Setting&Management/EvaluationSetting'))
const FaqSetting =  React.lazy(()=>import('./views/Setting&Management/FaqSetting'))
const KpiTargetSetting =  React.lazy(()=>import('./views/Setting&Management/KpiTargetSetting'))
const NoticeSetting = React.lazy(()=>import('./views/Setting&Management/NoticeSetting'))
const StatisticsSetting = React.lazy(()=>import('./views/Setting&Management/StatisticsSetting'))

/**
 * 컴포넌트명 : routes.js
 * 컴포넌트기능 : 라우팅
 * 작성자 : 이은정
 * 작성일 : 2023.05.18
 */
const routes = [
    { path:'/', exact: true, name:'Main', element: Main}, 
    { path:'/dashboard/kpiperformance',  name:'KpiPerformance', element: KpiPerformance},
    { path:'/board/cstalk', name:'CStalk' , element: CStalk},
    { path:'/board/notice', name:'Notice' , element: Notice},
    { path:'/dashboard/ascholdingstatus', name:'AscHoldingStatus' , element: AscHoldingStatus},
    { path:'/dashboard/evaluation', name:'Evaluation' , element: Evaluation},
    { path:'/dashboard/individualtraining', name:'IndividualTraining' , element: IndividualTraining},
    { path:'/dashboard/partsdeliverytime', name:'PartsDeliveryTime' , element: PartsDeliveryTime},
    { path:'/dashboard/trainingstatus', name:'TrainingStatue' , element: TrainingStatue},
    { path:'/dashboard/wip', name:'Wip' , element: Wip},
    { path:'/process&support/faq', name:'Faq' , element: Faq},
    { path:'/process&support/raq', name:'Raq' , element: Raq},
    { path:'/setting/evaluation', name:'EvaluationSetting' , element: EvaluationSetting},
    { path:'/setting/faq', name:'FaqSetting' , element: FaqSetting},
    { path:'/setting/kpitarget', name:'KpiTargetSetting' , element: KpiTargetSetting},
    { path:'/setting/notice', name:'NoticeSetting' , element: NoticeSetting},
    { path:'/setting/statistics', name:'StatisticsSetting' , element: StatisticsSetting},
]
export default routes

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
    { path:'/cstalk', name:'CStalk' , element: CStalk},
    { path:'/notice', name:'Notice' , element: Notice},
    { path:'/ascholdingstatus', name:'AscHoldingStatus' , element: AscHoldingStatus},
    { path:'/evaluation', name:'Evaluation' , element: Evaluation},
    { path:'/individualtraining', name:'IndividualTraining' , element: IndividualTraining},
    { path:'/kpiperformance', name:'KpiPerformance', element: KpiPerformance},
    { path:'/partsdeliverytime', name:'PartsDeliveryTime' , element: PartsDeliveryTime},
    { path:'/trainingstatus', name:'TrainingStatue' , element: TrainingStatue},
    { path:'/wip', name:'Wip' , element: Wip},
    { path:'/faq', name:'Faq' , element: Faq},
    { path:'/raq', name:'Raq' , element: Raq},
    { path:'/evaluationsetting', name:'EvaluationSetting' , element: EvaluationSetting},
    { path:'/faqsetting', name:'FaqSetting' , element: FaqSetting},
    { path:'/kpitargetsetting', name:'KpiTargetSetting' , element: KpiTargetSetting},
    { path:'/noticesetting', name:'NoticeSetting' , element: NoticeSetting},
    { path:'/statisticssetting', name:'StatisticsSetting' , element: StatisticsSetting},
]
export default routes
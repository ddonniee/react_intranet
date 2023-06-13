import { useState, useEffect } from 'react';
import LineChart from "../../components/Chart";
import AgGrid from "../../components/AgGrid";

import Header from "../../components/Header"
import Top from "../../components/Top"
import Zendesk from "../../components/Zendesk"

function KpiPerformance() {

    return (
       <>
       <Header />
        <div className="inner-container">
            {/** auth 권한체크로 수정 필요 */}
            <Top auth={1} searchArea={false}/>
            <Zendesk />
        </div>
        </>
    )
}

export default KpiPerformance
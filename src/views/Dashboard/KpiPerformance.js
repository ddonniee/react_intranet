import { useState, useEffect } from 'react';
import LineChart from "../../components/Chart";
import AgGrid from "../../components/AgGrid";
import Header from '../../components/Header';
import Top from '../../components/Top';

import '../../scss/style.scss';

function KpiPerformance() {

    return (
        <div className="kpi-container">
            <Header />
            <div className='inner-container'>
                <Top auth={false} />
                <div className='kpi-nav'>
                    
                </div>
            </div>
        </div>
    )
}

export default KpiPerformance
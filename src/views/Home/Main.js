import { useState, useEffect } from 'react';
import LineChart from "../../components/Chart";
import AgGrid from "../../components/AgGrid";
import { axiosInstance } from "../../components/Common";

import '../../scss/common.scss';
import { ReactComponent as KpiIcon } from '../../assets/svgs/icon_kpi.svg';

function Main() {

    const [rowData, setRowData] = useState([]); // 테이블 데이터 설정
    const [column, setColumn] = useState([ // 컬럼 값 설정
        {
            headerName: 'KPI',
        },
        {
            headerName: '2022',
            children: [
                {
                    field : '2022',
                    resizable: false,
                    headerClass: '2022',
                },
                {
                    field : '01-02',
                    resizable: false,
                    headerClass: '2022',
                }
            ]
        },
        {
            headerName: '2023',
            children: [
                {
                    field : 'Target',
                    resizable: false,
                    headerClass: '2023',
                },
                {
                    field : '01-02',
                    resizable: false,
                    headerClass: '2023',
                },
                {
                    field : 'Ach(%)',
                    resizable: false,
                    headerClass: '2023',
                }
            ]
        },
        {
            field: `YOY\n(year)`,
            resizable: false,
        }
    ]);

    // Example load data from server
    // useEffect(() => {
    //     axiosInstance.get('/example-assets/row-data.json')
    //     .then(res => {
    //     setRowData(res?.data);
    //     setColumn(Object.keys(res?.data[0]));
    //     // let key = Object.keys(res?.data[0]);
    //     // console.log('key --->', key)
    //     })
    //     .catch(e => {
    //     console.log(e);
    //     })
    // }, []);

    const data = [
        
    ]

    return (
        <div className="main-container">
            <div className="inner-container">
                <div className="nav">
                    <p>{`Home > Support > Main`}</p>
                </div>
                <div className="value">
                    <div className="chart">
                        <LineChart />
                    </div>
                    <div className="table">
                        <p className="sub-title"><KpiIcon />KPI Performance</p>
                        <div className='grid'>
                            <AgGrid data={rowData} column={column} paging={false} />
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-1"></div>
                    <div className="card-2"></div>
                    <div className="card-3"></div>
                </div>
            </div>
        </div>
    )
}

export default Main;
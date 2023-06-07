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
            field: 'KPI',
            resizable: false,
            spanHeaderHeight: true,
            pinned: 'left',
            width: 256,
            // suppressAutoSize: true
        },
        {
            headerName: '2022',
            children: [
                {
                    field : '2022',
                    resizable: false,
                    headerClass: '2022',
                    width: 100
                },
                {
                    field : '01-02',
                    resizable: false,
                    headerClass: '2022',
                    width: 100
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
                    width: 100
                },
                {
                    field : '01-02',
                    resizable: false,
                    headerClass: '2023',
                    width: 100
                },
                {
                    field : 'Ach(%)',
                    resizable: false,
                    headerClass: '2023',
                    width: 100
                }
            ]
        },
        {
            field: `YOY (year)`,
            resizable: false,
            spanHeaderHeight: true,
            wrapHeaderText: true,
            width: 100
        },
        {
            field: `YOY (Acc. Mon)`,
            resizable: false,
            spanHeaderHeight: true,
            wrapHeaderText: true,
            width: 100
        },
        {
            headerName: 'Last 3 Months',
            children: [
                {
                    field : '202212',
                    resizable: false,
                    headerClass: 'Last 3 Months',
                    width: 100
                },
                {
                    field : '202301',
                    resizable: false,
                    headerClass: 'Last 3 Months',
                    width: 100
                },
                {
                    field : '202302',
                    resizable: false,
                    headerClass: 'Last 3 Months',
                    width: 100
                }
            ]
        },
        {
            headerName: 'Last 3 Weeks',
            children: [
                {
                    field : 'W04',
                    resizable: false,
                    headerClass: 'Last 3 Weeks',
                    width: 100
                },
                {
                    field : 'W05',
                    resizable: false,
                    headerClass: 'Last 3 Weeks',
                    width: 100
                },
                {
                    field : 'W06',
                    resizable: false,
                    headerClass: 'Last 3 Weeks',
                    width: 100
                }
            ]
        },
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
        {
            KPI: 'Volume(C)',
            '2022': '100.1', 
            '01-02': '100.1',
            Target: '100.1',
            'Ach(%)': '100.1',
            'YOY (year)': '100.1',
            'YOY (Acc. Mon)': '100.1',
            '202212': '100.1',
            '202301': '100.1',
            '202302': '100.1',
            W04: '100.1',
            W05: '100.1',
            W06: '100.1',
        },
        {
            KPI: 'Reclaim (%)',
            '2022': '100.1', 
            '01-02': '100.1',
            Target: '100.1',
            'Ach(%)': '100.1',
            'YOY (year)': '100.1',
            'YOY (Acc. Mon)': '100.1',
            '202212': '100.1',
            '202301': '100.1',
            '202302': '100.1',
            W04: '100.1',
            W05: '100.1',
            W06: '100.1',
        },
        {
            KPI: 'RTAT (D)',
            '2022': '100.1', 
            '01-02': '100.1',
            Target: '100.1',
            'Ach(%)': '100.1',
            'YOY (year)': '100.1',
            'YOY (Acc. Mon)': '100.1',
            '202212': '100.1',
            '202301': '100.1',
            '202302': '100.1',
            W04: '100.1',
            W05: '100.1',
            W06: '100.1',
        },
        {
            KPI: 'Repair NPS (P)',
            '2022': '100.1', 
            '01-02': '100.1',
            Target: '100.1',
            'Ach(%)': '100.1',
            'YOY (year)': '100.1',
            'YOY (Acc. Mon)': '100.1',
            '202212': '100.1',
            '202301': '100.1',
            '202302': '100.1',
            W04: '100.1',
            W05: '100.1',
            W06: '100.1',
        },
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
                        <p><KpiIcon />KPI Performance</p>
                        <div className='grid'>
                            <AgGrid data={data} column={column} paging={false} />
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-1">
                        <div className='title'>
                            <p>Notice</p>
                        </div>
                    </div>
                    <div className="card-2"></div>
                    <div className="card-3"></div>
                </div>
            </div>
        </div>
    )
}

export default Main;
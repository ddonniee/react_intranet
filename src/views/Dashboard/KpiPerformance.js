import { useState, useEffect } from 'react';
import Header from "../../components/Header"
import Top from "../../components/Top"
import Zendesk from "../../components/Zendesk"
import Tab from '../../components/Tab';

import LineChart from "../../components/Chart";
import AgGrid from "../../components/AgGrid";
import SelectBox from '../../components/SelectBox';

import '../../scss/style.scss';
import { ReactComponent as SearchIcon } from '../../assets/svgs/icon_search.svg';
import { ReactComponent as IntersectIcon } from '../../assets/svgs/icon_intersect2.svg';
import { ReactComponent as ExcelIcon } from '../../assets/svgs/icon_excel.svg';

function KpiPerformance() {

    const [rowData, setRowData] = useState([ // 테이블 데이터 설정
        {
            center: 'Total',
            kpi: 'Volume(C)',
            '2022': '100.1', 
            '01-02': '100.1',
            target: '100.1',
            ach: '100.1',
            yoyYear: '100.1',
            yoyMon: '100.1',
            '202212': '100.1',
            '202301': '100.1',
            '202302': '100.1',
            thisMonth: '100.1',
            w04: '100.1',
            w05: '100.1',
            w06: '100.1',
            thisWeek: '100.1'
        },
        {
            // center: 'Total',
            kpi: 'Reclaim (%)',
            '2022': '100.1', 
            '01-02': '100.1',
            target: '100.1',
            ach: '100.1',
            yoyYear: '100.1',
            yoyMon: '100.1',
            '202212': '100.1',
            '202301': '100.1',
            '202302': '100.1',
            thisMonth: '100.1',
            w04: '100.1',
            w05: '100.1',
            w06: '100.1',
            thisWeek: '100.1'
        },
        {
            // center: 'Total',
            kpi: 'RTAT (D)',
            '2022': '100.1', 
            '01-02': '100.1',
            target: '100.1',
            ach: '100.1',
            yoyYear: '100.1',
            yoyMon: '100.1',
            '202212': '100.1',
            '202301': '100.1',
            '202302': '100.1',
            thisMonth: '100.1',
            w04: '100.1',
            w05: '100.1',
            w06: '100.1',
            thisWeek: '100.1'
        },
        {
            // center: 'Total',
            kpi: 'Repair NPS (P)',
            '2022': '100.1', 
            '01-02': '100.1',
            target: '100.1',
            ach: '100.1',
            yoyYear: '100.1',
            yoyMon: '100.1',
            '202212': '100.1',
            '202301': '100.1',
            '202302': '100.1',
            thisMonth: '100.1',
            w04: '100.1',
            w05: '100.1',
            w06: '100.1',
            thisWeek: '100.1'
        },
        {
            center: 'ASC #1',
            kpi: 'Volume(C)',
            '2022': '100.1', 
            '01-02': '100.1',
            target: '100.1',
            ach: '100.1',
            yoyYear: '100.1',
            yoyMon: '100.1',
            '202212': '100.1',
            '202301': '100.1',
            '202302': '100.1',
            thisMonth: '100.1',
            w04: '100.1',
            w05: '100.1',
            w06: '100.1',
            thisWeek: '100.1'
        },
        {
            // center: 'ASC #1',
            kpi: 'Reclaim (%)',
            '2022': '100.1', 
            '01-02': '100.1',
            target: '100.1',
            ach: '100.1',
            yoyYear: '100.1',
            yoyMon: '100.1',
            '202212': '100.1',
            '202301': '100.1',
            '202302': '100.1',
            thisMonth: '100.1',
            w04: '100.1',
            w05: '100.1',
            w06: '100.1',
            thisWeek: '100.1'
        },
        {
            // center: 'ASC #1',
            kpi: 'RTAT (D)',
            '2022': '100.1', 
            '01-02': '100.1',
            target: '100.1',
            ach: '100.1',
            yoyYear: '100.1',
            yoyMon: '100.1',
            '202212': '100.1',
            '202301': '100.1',
            '202302': '100.1',
            thisMonth: '100.1',
            w04: '100.1',
            w05: '100.1',
            w06: '100.1',
            thisWeek: '100.1'
        },
        {
            // center: 'ASC #1',
            kpi: 'Repair NPS (P)',
            '2022': '100.1', 
            '01-02': '100.1',
            target: '100.1',
            ach: '100.1',
            yoyYear: '100.1',
            yoyMon: '100.1',
            '202212': '100.1',
            '202301': '100.1',
            '202302': '100.1',
            thisMonth: '100.1',
            w04: '100.1',
            w05: '100.1',
            w06: '100.1',
            thisWeek: '100.1'
        },
        {
            center: 'ASC #2',
            kpi: 'Volume(C)',
            '2022': '100.1', 
            '01-02': '100.1',
            target: '100.1',
            ach: '100.1',
            yoyYear: '100.1',
            yoyMon: '100.1',
            '202212': '100.1',
            '202301': '100.1',
            '202302': '100.1',
            thisMonth: '100.1',
            w04: '100.1',
            w05: '100.1',
            w06: '100.1',
            thisWeek: '100.1'
        },
        {
            // center: 'ASC #1',
            kpi: 'Reclaim (%)',
            '2022': '100.1', 
            '01-02': '100.1',
            target: '100.1',
            ach: '100.1',
            yoyYear: '100.1',
            yoyMon: '100.1',
            '202212': '100.1',
            '202301': '100.1',
            '202302': '100.1',
            thisMonth: '100.1',
            w04: '100.1',
            w05: '100.1',
            w06: '100.1',
            thisWeek: '100.1'
        },
        {
            // center: 'ASC #1',
            kpi: 'RTAT (D)',
            '2022': '100.1', 
            '01-02': '100.1',
            target: '100.1',
            ach: '100.1',
            yoyYear: '100.1',
            yoyMon: '100.1',
            '202212': '100.1',
            '202301': '100.1',
            '202302': '100.1',
            thisMonth: '100.1',
            w04: '100.1',
            w05: '100.1',
            w06: '100.1',
            thisWeek: '100.1'
        },
        {
            // center: 'ASC #1',
            kpi: 'Repair NPS (P)',
            '2022': '100.1', 
            '01-02': '100.1',
            target: '100.1',
            ach: '100.1',
            yoyYear: '100.1',
            yoyMon: '100.1',
            '202212': '100.1',
            '202301': '100.1',
            '202302': '100.1',
            thisMonth: '100.1',
            w04: '100.1',
            w05: '100.1',
            w06: '100.1',
            thisWeek: '100.1'
        },
    ]);

    const rowSpan = (params) => {
        let center = params.data ? params.data.center : undefined;
        // console.log('center --->', center)
        if (center === 'Total' || center === 'ASC #1' || center === 'ASC #2') {
          return 4;
        } else {
          return 1;
        }
    };

    const [column, setColumn] = useState([ // 컬럼 값 설정
        {
            headerName: '',
            field: 'center',
            spanHeaderHeight: true,
            pinned: 'left',
            width: 60,
            rowSpan: rowSpan,
            cellClassRules: {
                'cell-span': " value==='Total' || value==='ASC #1' || value==='ASC #2' ",
            },
        },
        { 
            headerName: 'KPI',
            field: 'kpi',
            resizable: false,
            spanHeaderHeight: true,
            pinned: 'left',
            width: 140,
            // suppressAutoSize: true
        },
        {
            headerName: '2022',
            children: [
                {
                    headerName: '∑ 2022',
                    field : '2022',
                    resizable: false,
                    headerClass: '2022',
                    width: 100
                },
                {
                    headerName: '01-02',
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
                    headerName: 'Target',
                    field : 'target',
                    resizable: false,
                    headerClass: '2023',
                    width: 100
                },
                {
                    headerName: '01-02',
                    field : '01-02',
                    resizable: false,
                    headerClass: '2023',
                    width: 100
                },
                {
                    headerName: 'Ach.(%)',
                    field : 'ach',
                    resizable: false,
                    headerClass: '2023',
                    width: 100
                }
            ]
        },
        {
            headerName: `YOY \n(year)`,
            field: 'yoyYear',
            resizable: false,
            spanHeaderHeight: true,
            wrapHeaderText: true,
            width: 100
        },
        {
            headerName: `YOY \n(Acc. Mon)`,
            field: 'yoyMon',
            resizable: false,
            spanHeaderHeight: true,
            wrapHeaderText: true,
            width: 100
        },
        {
            headerName: 'Last 3 Months',
            children: [
                {
                    headerName: '2022 Nov',
                    field : '202212',
                    resizable: false,
                    headerClass: 'Last 3 Months',
                    width: 100
                },
                {
                    headerName: '2022 Dec',
                    field : '202301',
                    resizable: false,
                    headerClass: 'Last 3 Months',
                    width: 100
                },
                {
                    headerName: '2023 Jan',
                    field : '202302',
                    resizable: false,
                    headerClass: 'Last 3 Months',
                    width: 100
                }
            ]
        },
        { 
            headerName: 'This Month',
            field: 'thisMonth',
            resizable: false,
            spanHeaderHeight: true,
            wrapHeaderText: true,
        },
        {
            headerName: 'Last 3 Weeks',
            children: [
                {
                    headerName: 'W03',
                    field : 'w04',
                    resizable: false,
                    headerClass: 'Last 3 Weeks',
                    width: 100
                },
                {
                    headerName: 'W04',
                    field : 'w05',
                    resizable: false,
                    headerClass: 'Last 3 Weeks',
                    width: 100
                },
                {
                    headerName: 'W05',
                    field : 'w06',
                    resizable: false,
                    headerClass: 'Last 3 Weeks',
                    width: 100
                }
            ]
        },
        { 
            headerName: 'This Week',
            field: 'thisWeek',
            resizable: false,
            spanHeaderHeight: true,
            wrapHeaderText: true,
        },
    ]);

    const subOptions = [
        { value: 'LGEAI', label: 'LGEAI' },
        { value: 'LGEAI2', label: 'LGEAI2' },
    ]

    const centerOptions = [
        { value: 'ASC', label: 'ASC' },
        { value: 'ASC2', label: 'ASC2' },
    ]

    const branchOptions = [
        { value: 'NW', label: 'NW' },
        { value: 'NW2', label: 'NW2' },
    ]

    const divOptions = [
        { value: 'ASC', label: 'ASC' },
        { value: 'ASC2', label: 'ASC2' },
    ]

    const prodOptions = [
        { value: 'NW', label: 'NW' },
        { value: 'NW2', label: 'NW2' },
    ]

    const handleSelectBox = (event,params) => {
        const { data } = params.node;
        const { checked } = event.target;

        if (checked) {
            setRowData([...rowData, data]);
          } else {
            setRowData(rowData.filter(item => item !== data));
          }
    }

    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    const renderTabs = () => {
        return tabData.map((tab, index) => (
        <div
            key={index}
            className={`tab ${index === activeTab ? 'active' : ''}`}
            onClick={() => handleTabClick(index)}
        >
            {tab.title}
        </div>
        ));
    };

    const renderContent = () => {
        return tabData[activeTab].content;
    };

    const tabData = [
        {
          title: 'Summary',
          content: <>
            <div className="chart"> 
                <LineChart />
            </div>
            <div className="table"> 
                <div className='title'>
                    <button className='excel'>
                        <ExcelIcon />
                        <p>Excel</p>
                    </button>
                </div>
                <div className='grid'>
                    <AgGrid data={rowData} column={column} paging={false} />
                </div>
            </div>
          </>,
        },
        {
          title: 'Detail',
          content: 
            <div className="table"> 
                <div className='title'>
                    <button className='excel'>
                        <ExcelIcon />
                        <p>Excel</p>
                    </button>
                </div>
                <div className='grid'>
                    <AgGrid data={rowData} column={column} paging={false} />
                </div>
            </div>
        }
    ];

    return (
       <div className='kpi-container'>
       <Header />
        <div className="inner-container">
            {/** auth 권한체크로 수정 필요 */}
            <Top auth={1} searchArea={false}/>
            {/** Search Nav */}
            <div className='kpi-nav'>
                <div className='nav-left'>
                    <div className='search'>
                        <SearchIcon />
                        <p>Search</p>
                    </div>
                    <div className='nav-line'></div>
                </div>
                <div className='nav-center'>
                    <div className='nav-box'>
                        <div className='nav-search'>
                            <p>· Subsidiary</p> <SelectBox options={subOptions} onChange={handleSelectBox} />
                        </div>
                        <div className='nav-search'>
                            <p>· Division</p> <SelectBox options={divOptions} onChange={handleSelectBox} />
                        </div>
                    </div>
                    <div className='nav-box'>
                        <div className='nav-search'>
                            <p>· Center</p> <SelectBox options={centerOptions} onChange={handleSelectBox} />
                        </div>
                        <div className='nav-search'>
                            <p>· Product</p> <SelectBox options={prodOptions} onChange={handleSelectBox} />
                        </div>
                    </div>
                    <div className='nav-box'>
                        <div className='nav-search'>
                            <p>· Branch</p> <SelectBox options={branchOptions} onChange={handleSelectBox} />
                        </div>
                        <div className='nav-search' style={{visibility: "hidden"}}>
                            <p>· Branch</p> <SelectBox options={subOptions} />
                        </div>
                    </div>
                </div>
                <div className='nav-right'>
                    <div className='nav-line'></div>
                    <button className='circle'>
                        <p>Inquiry</p>
                        <IntersectIcon />
                    </button>
                </div>
            </div>
            
            {/** Summary */}
            <div className="tab-menu">{ renderTabs() }</div>
            <div className="kpi-value">{ renderContent() }</div>
            <Zendesk />
        </div>
        <Tab />
        </div>
    )
}

export default KpiPerformance
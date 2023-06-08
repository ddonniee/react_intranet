import { useState, useEffect } from 'react';
import LineChart from "../../components/Chart";
import AgGrid from "../../components/AgGrid";
import Header from '../../components/Header';
// import SimpleSlider from '../../components/SimpleSlider';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import '../../scss/style.scss';
import { ReactComponent as HomeIcon } from '../../assets/svgs/icon_home.svg';
import { ReactComponent as KpiIcon } from '../../assets/svgs/icon_kpi.svg';
import { ReactComponent as NoticeIcon } from '../../assets/svgs/icon_notice.svg';
import { ReactComponent as FaqIcon } from '../../assets/svgs/icon_faq.svg';
import { ReactComponent as CsIcon } from '../../assets/svgs/icon_cstalk.svg';
import { ReactComponent as NewIcon } from '../../assets/svgs/icon_new.svg';
import { ReactComponent as MoreIcon } from '../../assets/svgs/icon_more.svg';
import { ReactComponent as ListIcon } from '../../assets/svgs/icon_list.svg';
import { ReactComponent as PrevIcon } from '../../assets/svgs/icon_mainprev.svg';
import { ReactComponent as NextIcon } from '../../assets/svgs/icon_mainnext.svg';
import { ReactComponent as IntersectIcon } from '../../assets/svgs/icon_Intersect.svg';

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
            field: `YOY (Acc Mon)`,
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

    const data = [
        {
            KPI: 'Volume(C)',
            '2022': '100.1', 
            '01-02': '100.1',
            Target: '100.1',
            'Ach(%)': '100.1',
            'YOY (year)': '100.1',
            'YOY (Acc Mon)': '100.1',
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
            'YOY (Acc Mon)': '100.1',
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
            'YOY (Acc Mon)': '100.1',
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
            'YOY (Acc Mon)': '100.1',
            '202212': '100.1',
            '202301': '100.1',
            '202302': '100.1',
            W04: '100.1',
            W05: '100.1',
            W06: '100.1',
        },
    ]

    const Prev = (props) => {
        const { className, style, onClick } = props;
        return (
            <div style={{ position: 'absolute', top: 110, right: 310 }}>
                <PrevIcon style={{width: "38px", height: "38px"}} onClick={onClick}/>
            </div>
        )
    }

    const Next = (props) => {
        const { className, style, onClick } = props;
        return (
            <div style={{ position: 'absolute', top: 110, right: -40 }}>
                <NextIcon style={{width: "38px", height: "38px"}} onClick={onClick}/>
            </div>
        )
    }

    const settings = {
        dots: false,
        arrow: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        prevArrow: <Prev/>,
        nextArrow: <Next/>,
    };   

    return (
        <div className="main-container">
            <Header />
            <div className="inner-container">
                <div className="nav">
                    <p><HomeIcon />&nbsp;{` > Support > Main`}</p>
                </div>
                {/** KPI Performance */}
                <div className="value">
                    <div className="chart"> 
                        <LineChart />
                    </div>
                    <div className="table"> 
                        <div className='title'>
                            <p className='sub-title'><KpiIcon /> KPI Performance</p>
                            <MoreIcon />
                        </div>
                        <div className='grid'>
                            <AgGrid data={data} column={column} paging={false} />
                        </div>
                    </div>
                </div>
                {/** Notice, FAQ, CS Talk */}
                <div className="card">
                    {/** Notice */}
                    <div className="card-notice">
                        <div className='title'>
                            <p className='sub-title'><NoticeIcon /> Notice</p>
                            <MoreIcon />
                        </div>
                        <div className='list'>
                            <div className='left'>
                                <div className='circle'>
                                    <p className='day'>17</p>
                                    <p className='month'>2023.05</p>
                                    <IntersectIcon/>
                                </div>
                            </div>
                            <div className='right'>
                                <div className='mainlist'>
                                    <p className='bold'>Weekly Report of AC AS Back Order a September HE – OK55 Main Defect <NewIcon className='newicon'/></p>
                                    <p className='normal'>GSFS Information – LED Arra Rank Collection time of GSFS Information – LED Arra Rank Collection time of</p>
                                </div>
                                <ul className='sublist'>
                                    {
                                        ['Weekly Report of AS Back Order a September',
                                        'Back Order a September Weekly Report of AC',
                                        'HE - OK55 Main Defect Back Order a September',
                                        'GSFS Information - LED Arra'].map((row, i) => (
                                            <li key={i}>
                                                <p><ListIcon/> {row}</p> <p>2023.1.29</p>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/** FAQ */}
                    <div className="card-faq">
                        <div className='title'>
                            <p className='sub-title'><FaqIcon /> FAQ</p>
                            <MoreIcon />
                        </div>
                        <div className='list'>
                            <div className='mainlist'>
                                <p className='bold'>Weekly Report of AC AS Back Order a September <NewIcon className='newicon'/></p>
                            </div>
                            <ul className='sublist'>
                                {
                                    ['Weekly Report of AS Back Order a September',
                                    'Back Order a September Weekly Report of AC',
                                    'HE - OK55 Main Defect Back Order a September',
                                    'GSFS Information - LED Arra'].map((row, i) => (
                                        <li key={i} style={{padding: "11px 0"}}>
                                            <span className='qst-no'> Q 0{i+1} </span>
                                            <p style={{minWidth: "260px"}}> {row} </p> 
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    {/** CS Talk */}
                    <div className="card-cstalk">
                        <div className='title'>
                            <p className='sub-title'><CsIcon /> CS Talk</p>
                            <MoreIcon />
                        </div>
                        <div className='list'>
                            <Slider {...settings}>
                                {
                                    [17, 18, 19].map((list, i) => (
                                        <div key={i}>
                                        <div className='circle'>
                                            <p className='day'>{list}</p>
                                            <p className='month'>2023.05</p>
                                            <IntersectIcon/>
                                        </div>
                                        <div className='content'>
                                            <div className='mainlist'>
                                                <p className='bold'>Weekly Report of AC AS Back Order a September HE – OK55 Main Defect</p>
                                                <p className='normal'>
                                                    GSFS Information – LED Arra Rank Collection time of GSFS Information – LED
                                                    GSFS Information – LED Arra Rank Collection time of GSFS Information – LED
                                                    GSFS Information – LED Arra Rank Collection time of GSFS Information – LED
                                                </p>
                                            </div>
                                        </div>
                                        </div>
                                    ))
                                }
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;
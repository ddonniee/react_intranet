import { useState, useEffect, useRef } from 'react';
import Header from '../../components/Header';
import Top from '../../components/Top';
import Zendesk from '../../components/Zendesk';

import LineChart from "../../components/Chart";
import AgGrid from "../../components/AgGrid";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import '../../scss/style.scss';
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
import Banner_1 from '../../assets/svgs/banner_1.svg';
import Banner_2 from '../../assets/svgs/banner_2.svg';

function Main() {

    // const [bannerList, setBannerList] = useState([
    //     <img src={Banner_1} alt="banner"/>,
    //     <img src={Banner_2} alt="banner"/> 
    // ]);
    // const sliderRef = useRef(null);

    // const prev = () => {
    //     sliderRef.current.slickPrev();
    // }

    // const next = () => {
    //     sliderRef.current.slickNext();
    // }

    // const play = () => {
    //     sliderRef.current.slickPlay();
    // }

    // const pause = () => {
    //     sliderRef.current.slickPause();
    // }

    // const bannerSettings = {
    //     dots: false,
    //     arrow: false,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     autoplay: true,
    // };   

    const PrevIcon = (props) => {
        const { className, style, onClick } = props;
        return (
            <div style={{ position: 'absolute', top: 110, right: 310 }}>
                <PrevIcon style={{width: "38px", height: "38px"}} onClick={onClick}/>
            </div>
        )
    }

    const NextIcon = (props) => {
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
        prevArrow: <PrevIcon />,
        nextArrow: <NextIcon />,
    };

    return (
        <div className="main-container">
            <Header />
            <div className="inner-container">
                {/** auth 권한체크로 수정 필요 */}
                <Top auth={1} searchArea={false}/>
                {/** Banner */}
                <div className="banner">
                    {/* <Slider {...bannerSettings} ref={sliderRef}>
                        {
                            bannerList.map((list, i) => (
                                <div key={i}> {list} </div>
                            ))
                        }
                    </Slider> */}
                    <div>banner</div>
                </div>
                {/* <div style={{ textAlign: "center" }}>
                    <button className="button" onClick={prev}>
                        Previous
                    </button>
                    <button className="button" onClick={play}>
                        Play
                    </button>
                    <button className="button" onClick={pause}>
                        Pause
                    </button>
                    <button className="button" onClick={next}>
                        Next
                    </button>
                </div> */}

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
                <Zendesk />
            </div>
        </div>
    )
}

export default Main;
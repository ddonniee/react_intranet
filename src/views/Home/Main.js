import { useState, useEffect, useRef } from 'react';
import Header from '../../components/Header';
import Top from '../../components/Top';
import Zendesk from '../../components/Zendesk';

import Carousel from '../../components/Carousel';

import '../../scss/style.scss';
import { ReactComponent as NoticeIcon } from '../../assets/svgs/icon_notice.svg';
import { ReactComponent as FaqIcon } from '../../assets/svgs/icon_faq.svg';
import { ReactComponent as CsIcon } from '../../assets/svgs/icon_cstalk.svg';
import { ReactComponent as NewIcon } from '../../assets/svgs/icon_new.svg';
import { ReactComponent as MoreIcon } from '../../assets/svgs/icon_more.svg';
import { ReactComponent as ListIcon } from '../../assets/svgs/icon_list.svg';
import { ReactComponent as IntersectIcon } from '../../assets/svgs/icon_Intersect.svg';
import Banner_1 from '../../assets/svgs/banner_1.svg';
import Banner_2 from '../../assets/svgs/banner_2.svg';
import Prev from '../../assets/svgs/icon_mainprev.svg';
import Next from '../../assets/svgs/icon_mainnext.svg';
import Pause from '../../assets/svgs/icon_bannerpause.svg';
import Play from '../../assets/svgs/icon_bannerplay.svg';
import B_Prev from '../../assets/svgs/icon_bannerprev.svg';
import B_Next from '../../assets/svgs/icon_bannernext.svg';

function Main() {

    /* 상단 배너 Slider 리스트 */
    const [bannerList, setBannerList] = useState([
        <img src={Banner_1} alt="banner"/>,
        <img src={Banner_2} alt="banner"/> 
    ]);

    const [ref, setRef] = useState();
    const [isPlay, setIsPlay] = useState(true);

    const prev = () => {
        ref.slickPrev();
    }
    const next = () => {
        ref.slickNext();
    }
    const play = () => {
        ref.slickPlay();
        setIsPlay(true)
    }
    const pause = () => {
        ref.slickPause();
        setIsPlay(false)
    }
    const page = () => {
        ref.currentSlide();
    }

    const [currentSlide, setCurrentSlide] = useState(1);

    const bannerSettings = {
        dots: true,
        arrow: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };   

    /* 하단 CS Talk Slider 리스트 */
    const csList = [17, 18, 19].map((list, i) => (
        <div key={i} className='custom-flex-item'>
        <div className='left'>
            <div className='circle'>
                <p className='day'>{list}</p>
                <p className='month'>2023.05</p>
                <IntersectIcon/>
            </div>
        </div>
        <div className='right'>
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
        </div>
    ));

    const PrevIcon = (props) => {
        const { className, style, onClick } = props;
        return (
            <span className='slider-btn-prev' style={{ position: 'absolute', top: 110, right: 310 }}>
                <img src={Prev} alt="prev" style={{width: "38px", height: "38px"}} onClick={onClick}/> 
            </span>
        )
    }

    const NextIcon = (props) => {
        const { className, style, onClick } = props;
        return (
            <div className='slider-btn-next' style={{ position: 'absolute', top: 110, right: -40 }}>
                <img src={Next} alt="next" style={{width: "38px", height: "38px"}} onClick={onClick}/> 
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
                    <Carousel images={bannerList} setting={bannerSettings} setRef={setRef} setIdx={setCurrentSlide} />
                    <div className='banner-btn'>
                        <p className='banner-index'><span>{`0${currentSlide}`}</span>{` / 0${bannerList.length}`}</p>
                        <img src={B_Prev} alt="prev" onClick={prev}/> 
                        {
                            isPlay ? 
                            <img src={Pause} alt="pause" onClick={pause}/> 
                            :
                            <img src={Play} alt="play" onClick={play}/> 
                        }
                        <img src={B_Next} alt="next" onClick={next}/> 
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
                                    <p className='normal'>GSFS Information – LED Arra Rank Collection time of GSFS Information – LED Arra Rank Collection time of LED Arra Rank Collection time of GSFS Information</p>
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
                                        <li key={i}>
                                            <span className='qst-no'> Q 0{i+1} </span>
                                            <p> {row} </p> 
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
                            <Carousel images={csList} setting={settings} />
                        </div>
                    </div>
                </div>
                <Zendesk />
            </div>
        </div>
    )
}

export default Main;
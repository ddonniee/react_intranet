import { useContext, useState, useEffect, useLayoutEffect } from "react"
import { axiosInstance, axiosJsonInstance, axiosInstance2, fetchInstance } from '../../utils/CommonFunction';
import moment from "moment/moment";

import Top from '../../components/Top';
import Tab from '../../components/Tab';
import Carousel from '../../components/Carousel';
import Alert from "../../components/Alert";

import { generateRandomString, downloadAttachment, removeHTMLTags } from "../../utils/CommonFunction"
import { UserContext } from "../../hooks/UserContext";

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

function Main() {

    // 로그인 유저 정보
    const user = useContext(UserContext);
    const [token, setToken] = useState('');
    const [auth, setAuth] = useState({
        isViewer : user.role === 'SA' ? false : true,
    })

    useEffect(() => {
        console.log('login user', user)

        if(!auth.isViewer) {
            alert('No right to Access')
            document.location.href='/login';
        }
    }, [])

    const USER_CORP_CODE = 'LGEAI' // 로그인유저 법인코드
    const USER_CENTER_TYPE = 'ASC' // 로그인유저 센터타입

    const config = { // axios header
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        }
    }

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

    const handleClickLink = (path) => {
        console.log(path)
        window.location.assign(process.env.REACT_APP_FRONT_URL+path)
    }

    /* 하단 Notice 리스트 */
    const [noticeSearchData, setNoticeSearchData] = useState({ // 검색데이터
        page: 1,
        type: 'N',
    });
    const [noticeData, setNoticeData] = useState([]); // notice 목록

    const isWithin7Days = (date) => { // 새 게시글(등록일 기준 7일 이내) 확인
        const baseDate = new Date(moment(date).format('YYYY-MM-DD'));
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - baseDate.getTime();
        const dayDifference = timeDifference / (1000 * 3600 * 24);

        return dayDifference < 7 ? true : false;
    }

    /* 하단 FAQ 리스트 */
    const [faqSearchData, setFaqSearchData] = useState({ // 검색데이터
        page: 1,
        type: 'F',
    });
    const [faqData, setFaqData] = useState([]); // faq 목록
    const getFaqList = () => {
        let sdata = new FormData();
        // for(const key in faqSearchData) {
        //     sdata.append(key, faqSearchData[key])
        // }
        // console.log('search result --->', Object.fromEntries(sdata))

        // FAQ 목록 조회 API
        fetchInstance('/faqData')
        .then(res => {
            console.log('FAQ 목록 ---->', res)
            // 실제 API 통신시 status로 연결 상태 확인
            if(res) {
                setFaqData(res)
            }else {
                setAlertSetting({
                    ...alertSetting,
                    alertTxt : 'Client Error'
                })
            }
        }).catch(error => {
            console.error(error);
            setAlertSetting({
                ...alertSetting,
                alertTxt : 'Server Error'
            })
        });
    }

    /* 하단 CS Talk Slider 리스트 */
    const [csSearchData, setCsSearchData] = useState({ // 검색데이터
        page: 1,
    });
    const [csData, setCsData] = useState([]); // cstalk 목록

    const getCsList = () => {
        let sdata = new FormData();
        // for(const key in csSearchData) {
        //     sdata.append(key, csSearchData[key])
        // }
        // console.log('search result --->', Object.fromEntries(sdata))

        // cstalk 목록 조회 API
        fetchInstance('/cstalkData')
        .then(res => {
            console.log('CS Talk 목록 ---->', res)
            setCsData(res);
            
        }).catch(error => {
            console.error(error);
        });
    }

    const csList = csData.map((list, idx) => (
        <div key={list.csTalkId} className='list-slider'>
        <div className='top'>
            <div className='circle'>
                <p className='day'>{moment(list.createdAt).format('DD')}</p>
                <p className='month'>{moment(list.createdAt).format('YYYY.MM')}</p>
                <IntersectIcon/>
            </div>
            <div className='mainlist' onClick={() => handleClickLink('/board/cstalk')}>
                <p className='bold'>{list.subject.length > 80 ? (list.subject).substr(0, 80) + '...' : list.subject}</p>
            </div>
        </div>
        <div className='bottom'>
            <div className='content'>
                <div className='mainlist' onClick={() => handleClickLink('/board/cstalk')}>
                    <p className='normal'>
                        GSFS Information – LED Arra Rank Collection time of GSFS Information – LED
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

    /** 알림창 ▼ ============================================================= */

    const [alertModal, setAlertModal] = useState(false)
    const [alertSetting, setAlertSetting] = useState({
        alertTxt : '',
        onConfirm : function() {},
        isDoubleBtn : false,
        btnTxt : 'Close',
        confirmTxt : ''
    })
    useEffect(()=>{
        if(!alertModal) {
           setAlertSetting({
            alertTxt : '',
            onConfirm : function() {},
            isDoubleBtn : false,
            btnTxt : 'Close',
            confirmTxt : ''
           })
        }
    },[alertModal])
    
    useEffect(()=>{
        if(alertSetting.alertTxt!==''){
            setAlertModal(true)
        }else {
            setAlertModal(false)
        }
    },[alertSetting])
    /** 알림창 ▲ ============================================================= */

    useLayoutEffect(() => {
        getFaqList();
        getCsList();
    }, []);

    useEffect(() => {        
        console.log('%$#%$@%', csData)
    }, [csData])

    return (
        <div className="main-container">
            <div className="inner-container">
                {/** auth 권한체크로 수정 필요 */}
                <Top auth={1} searchArea={false}/>
                {/** Banner */}
                <div className="banner">
                    {/* <Carousel images={bannerList} setting={bannerSettings} setRef={setRef} setIdx={setCurrentSlide} />
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
                    </div> */}
                </div>

                {/** Notice, FAQ, CS Talk */}
                <div className="card">
                    
                    {/** FAQ */}
                    <div className="card-faq">
                        <div className='title'>
                            <p className='sub-title'><FaqIcon /> FAQ</p>
                            <MoreIcon className="moreicon" onClick={() => handleClickLink('/process&support/faq')} />
                        </div>
                        <div className='list'>
                            {
                                faqData.length > 0 &&
                                <>
                                <div className='mainlist' onClick={() => handleClickLink('/process&support/faq')}>
                                    <p className='bold'>
                                        { faqData[0].subject.length > 80 ? (faqData[0].subject).substr(0, 80) + '...' : faqData[0].subject }
                                        { faqData[0].new ? <NewIcon className='newicon' /> : null }
                                    </p>
                                </div>
                                <ul className='sublist'>
                                    {
                                        faqData.slice(1, faqData.length).map((list, idx) => {
                                            if(idx<5) {
                                                return(
                                                    <li key={list.faqId} onClick={() => handleClickLink('/process&support/faq')}>
                                                <span className='qst-no'> Q 0{idx + 1} </span>
                                                <p> {list.subject.length > 70 ? (list.subject).substr(0, 70) + '...' : list.subject} </p> 
                                            </li>
                                                )
                                            }
                                        }
                                        )
                                    }
                                </ul>
                                </>
                            }

                        </div>
                    </div>
                    {/** CS Talk */}
                    <div className="card-cstalk">
                        <div className='title'>
                            <p className='sub-title'><CsIcon /> CS Talk</p>
                            <MoreIcon className="moreicon" onClick={() => handleClickLink('/board/cstalk')} />
                        </div>
                        <div className='list'>
                            <Carousel images={csList} setting={settings} />
                        </div>
                    </div>
                </div>
            </div>
            <Tab />
            {
                alertModal
                &&
                <Alert alertTxt={alertSetting.alertTxt} onClose={()=>setAlertModal(false)} onConfirm={alertSetting.onConfirm} twoBtn={alertSetting.isDoubleBtn} btnTxt={alertSetting.btnTxt}/>
            }
        </div>
    )
}

export default Main;

// function Main() {
//     return(
//         <div>
//             Main
//         </div>
//     )
// }

// export default Main
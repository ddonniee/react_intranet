import { useContext, useState, useEffect, useLayoutEffect } from "react"
import { styled } from "styled-components"
import { axiosInstance, axiosJsonInstance, axiosInstance2 } from '../../utils/CommonFunction';
import moment from "moment/moment";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; 

import Header from "../../components/Header"
import Top from "../../components/Top"
import Zendesk from "../../components/Zendesk"
import SelectBox from '../../components/SelectBox'
import CustomDatePicker from "../../components/DatePicker"
import Paging from "../../components/Paging";
import Editor from "../../components/Editor";
import Alert from "../../components/Alert"

import { generateRandomString } from "../../utils/CommonFunction"
import { UserContext } from "../../hooks/UserContext";

import '../../scss/style.scss';
import { ReactComponent as SearchIcon } from '../../assets/svgs/icon_seeking.svg';
import { ReactComponent as SpeakerIcon } from '../../assets/svgs/icon_speaker.svg';
import { ReactComponent as NewIcon } from '../../assets/svgs/icon_new.svg';
import { ReactComponent as MoreIcon } from '../../assets/svgs/icon_more.svg';
import { ReactComponent as CalendarIcon } from '../../assets/svgs/icon_calendar.svg';

function NoticeSetting() {

    /**
     * 화면 접근 권한
     * 
     * 본사 staff    (LK)  : 조회만 가능
     * 법인관리자    (SS)  : N/A
     * 법인 admin    (SA)  : 조회 & 작성
     * LGC 관리자    (LD)  : N/A
     * LGC Engineer  (LE)  : N/A
     * ASC 관리자    (AD)  : N/A
     * ASC Engineer  (AE)  : N/A
     */

    // 로그인 유저 정보
    const user = useContext(UserContext);
    const [token, setToken] = useState('LGEKR');
    const [auth, setAuth] = useState({
        isViewer : user.role === 'LK' || user.role === 'SA' ? true : false,
        isWriter : user.role === 'SA' ? true : false,
        isStaff : user.role === 'LK' ? true : false,
    })

    useEffect(() => {
      console.log('login user', user)
      let role = user.role;

      if(!(role === 'LK' || role === 'SA')) { // !isViewer
        alert('No right to Access')
        document.location.href='/login';
      }
    }, [])

    const USER_CORP_CODE = 'LGEAI' // 로그인유저 법인코드
    const USER_CENTER_TYPE = 'ASC' // 로그인유저 센터타입

    const config = { // axios header
        maxBodyLength: Infinity,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
        }
    }

    /* 페이징 영역 ****************************************************************/
    const [pageInfo, setPageInfo] = useState({
        activePage: 1,     // 현재 페이지
        itemsPerPage: 10,  // 페이지 당 아이템 갯수
        totalCount: 0      // 전체 목록 수
    });

    /* 검색 영역 ****************************************************************/
    const [searchData, setSearchData] = useState({ // 검색데이터
        page: 1,
        type: 'S',
    });

    const [subOptions, setSubOptions] = useState([]); // 법인 selectbox 데이터
    const centerOptions = [ // view 조건 selectbox 데이터
        { value: 'ALL', label: 'ALL', group: 'centerType' },
        { value: 'LGC', label: 'LGC', group: 'centerType' },
        { value: 'ASC', label: 'ASC', group: 'centerType' },
    ]

    const handleSelectBox = (e) => {
        console.log('select ---->', e)
        let group = e.group;
        let value = e.value;

        if(group === 'corporationCode') {
            setSearchData({ ...searchData, subsidiary: value })
        } else if(group === 'centerType') {
            setSearchData({ ...searchData, view: value })
        }
    }

    /* 컨텐츠 영역 ****************************************************************/
    const [boardData, setBoardData] = useState([]); // notice 목록
    const [selectedList, setSelctedList] = useState(); // 목록에서 선택한 항목
    const [detail, setDetail] = useState(); // notice 상세
    const [isWrite, setIsWrite] = useState(false); // 새 글 여부
    const [writeData, setWriteData] = useState(); // 새 글 항목
    const [isModify, setIsModify] = useState(); // 수정 여부

    const isWithin7Days = (date) => { // 새 게시글(등록일 기준 7일 이내) 확인
        const baseDate = new Date(moment(date).format('YYYY-MM-DD'));
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - baseDate.getTime();
        const dayDifference = timeDifference / (1000 * 3600 * 24);

        return dayDifference < 7 ? true : false;
    }

    const getList = () => {
        let sdata = new FormData();
        for(const key in searchData) {
            sdata.append(key, searchData[key])
        }
        console.log('search result >>>>>>', Object.fromEntries(sdata))

        // 공지사항 목록 조회 API
        axiosInstance2.post('/notice/list', sdata, config).then(res => {
            const data = res?.data.result;
            console.log('공지사항 목록 ---->', data)
            
            const newArray = data.map((obj, index) => ({
                ...obj,
                new: isWithin7Days(data.createdAt),
            }));
            setBoardData(newArray);

            if (searchData.page == 1) {  // 검색 결과 1페이지 첫번째 항목의 rn 저장 (total)
                setPageInfo({ ...pageInfo, totalCount: data.length > 0 ? data[0]?.rn : 0 });
            }
            
        }).catch(error => {
            console.error(error);
        });
    }

    const getSelectList = () => {
        // 법인목록 조회 API
        axiosInstance.post('/corporation/list').then(res => {
            const data = res?.data.result;
            // console.log('법인 기존 목록 ---->', data)

            const newArray = data.map((obj, index) => ({
                value: obj.corporationCode,
                label: obj.corporationCode,
                group: 'corporationCode'
            }));
            console.log('법인 목록 ---->', newArray)

            setSubOptions(newArray);
            
        }).catch(error => {
            console.error(error);
        });
    }

    const getDetail = () => {
        let sdata = new FormData();
        for(const key in selectedList) {
            sdata.append(key, selectedList[key])
        }
        console.log('search result >>>>>>', Object.fromEntries(sdata))

        // 공지사항 상세 조회 API
        axiosInstance2.post('/notice/detail', sdata, config).then(res => {
            const data = res?.data.result;
            console.log('공지사항 상세 ---->', data)

            if(data.attachments) {
                setDetail({ ...data, fileName: JSON.parse(data.attachments).fileName, uploadPath: JSON.parse(data.attachments).uploadPath });
            } else {
                setDetail(data);
            }
            setIsModify(true);
            
        }).catch(error => {
            console.error(error);
        });
    }

    useLayoutEffect(() => {
        getList();
        getSelectList();
    }, []);

    const submitInput = () => {
        const input = document.getElementById('notice-nav-input').value;
        setSearchData({ ...searchData, search: input });
    }

    useEffect(() => {
        getList();
        // console.log('searchData ---->', searchData)
    }, [searchData]);

    const handleClickRow = (e, item) => {
        console.log('e', e.target.value)
        console.log('item', item)

        if(isWrite || isModify) {
            setAlertTxt("Click confirm to leave write mode.")
            setSelctedList()
            return false;
        }
        setSelctedList({ noticeId: item.noticeId, tableName: item.tableName })
    }

    const handleClickWrite = () => {
        if(isModify) {
            setAlertTxt('Click confirm to leave write mode.')
            return false;
        } else {
            setIsWrite(true); 
            setDetail();
        }
    }

    useEffect(() => {
        selectedList && getDetail();
        console.log('select list ---->', selectedList)
    }, [selectedList])

    const [alertModal, setAlertModal] = useState(false)
    const [alertTxt, setAlertTxt] = useState('')

    const onSaveContent = () => {
        console.log('editor data >>>>>>', writeData)

        if (!writeData?.title || !writeData?.content || !writeData?.view) {
            setAlertTxt('Please fill out all the information.')
            console.log('if')
            return false;

        } else {
            if(isWrite) {
                const formData = new FormData();
                for (let key in writeData) {
                    if (writeData.hasOwnProperty(key)) {
                      formData.append(key, writeData[key]);
                    }
                }

                console.log('save data >>>>>>', Object.fromEntries(formData))
        
                // CS 공지사항 등록 API
                // axiosJsonInstance.post('/notice/csInsert', formData, config).then(res => {
                //     let resData = res.data;

                //     if(resData.code == 200) {
                //         console.log('res', resData)
                //         setAlertTxt("You've inserted new post.")
                //         setIsWrite(false)
                //         setDetail()
                //     } else {
                //         console.log('res', resData.msg);
                //     }
                // }).catch(error => {
                //     console.log('error', error)
                // })  
            }
        }
    }

    useEffect(() => {
        onSaveContent();
    }, [writeData])

    useEffect(()=>{
        if(!alertModal) {
            setAlertTxt('')
        }
    }, [alertModal])

    useEffect(()=>{
        if(alertTxt!==''){
            setAlertModal(true)
        }
    }, [alertTxt])

    return (
        <div className="notice-container">
        <Header />
        <div className="inner-container">
            {/** auth 권한체크로 수정 필요 */}
            <Top auth={1} searchArea={false}/>
            {/** Search Nav */}
            <div className={`notice-nav ${!auth.isStaff && 'notice-nav-lk'}`}>
                { auth.isStaff && // 본사 스태프만 반영
                    <div className="notice-nav-box custom-flex-item custom-align-item">
                        <p>· Subsidiary</p>
                        <SelectBox options={subOptions} handleChange={handleSelectBox} />
                    </div>
                }
                <div className="custom-flex-item custom-align-item">
                    <p>· View</p>
                    <SelectBox options={centerOptions} handleChange={handleSelectBox} />
                </div>
                <div className="custom-flex-item custom-align-item">
                    <p>· Search</p>
                    <input type="text" className="notice-nav-input" id="notice-nav-input"></input>
                    <button className="notice-nav-btn custom-flex-item custom-align-item" onClick={submitInput}> <SearchIcon /> </button>
                </div>
            </div>

            {/** Content Area */}
            <Style selectId={selectedList?.noticeId}>
            <div className="notice-content">
                <div className="notice-left">
                    <div className="notice-count">
                        Total <span>{pageInfo?.totalCount}</span>
                    </div>
                    <ul className="notice-custom-board">
                        {
                            boardData.length > 0 ? (
                                boardData?.map((item, idx) => {
                                    return(
                                        <li className={`notice-list ${item.deleteAt && 'notice-del-list'}`} key={generateRandomString(idx)} 
                                            id={`list${item.deleteAt && '-del'}-item-${item.noticeId}`} onClick={(e) => handleClickRow(e, item)}>
                                            <div className={`title ${item.deleteAt && 'title-del'}`}>
                                                <span className="custom-flex-item custom-align-item">
                                                {/** 게시기간 종료일이 현재 날짜 이전이면 확성기 아이콘 출력 */}
                                                { item.postEndDate && new Date(moment(item.postEndDate).format('YYYY-MM-DD')) > new Date() ? <SpeakerIcon /> : null } 
                                                { item.title.length > 90 ? (item.title).substr(0,90) + '...' : item.title } 
                                                { item.new ? <NewIcon /> : null }
                                                </span>
                                                { item.deleteAt && <span>{moment(item.deleteAt).format('YY.M.DD')}(D)</span> }
                                            </div>
                                            <div className={`etc ${item.deleteAt && 'etc-del'}`}>
                                                <p>{item.writerName}</p> <p>{moment(item.createdAt).format('YY.M.DD')}</p>
                                            </div>
                                        </li>
                                    )
                                })
                            )
                            :
                            <div className="notice-view-none notice-list-none">
                                <p>no data</p>
                            </div>
                        }
                    </ul>
                    {
                        boardData &&
                        <Paging pageInfo={pageInfo} setPageInfo={setPageInfo} searchData={searchData} setSearchData={setSearchData} />
                    }
                    <div className="notice-bottom">
                        <button className="notice-btn-circle" onClick={() => handleClickWrite()}>Write</button>
                    </div>
                </div>
                <div className="notice-right">
                    {
                        isWrite || isModify ?
                        <Editor onClose={isWrite ? setIsWrite : setIsModify} period={true} data={detail} setData={isWrite ? setWriteData : setDetail} />
                        :
                        <div className="notice-view-none">
                            <p>If you select a list, you can see the contents</p>
                        </div>
                    }
                </div>
            </div>
            {
                alertModal
                &&
                <Alert alertTxt={alertTxt} onClose={() => setAlertModal(false)} onConfirm={() => setAlertModal(false)} btnTxt='Close' />
            }
            </Style>

            <Zendesk />
        </div>
        </div>
    )
}

export default NoticeSetting

const Style = styled.div`
    #list-item-${props => props.selectId} {
        background : #FAF1F4;
    }
    #list-item-${props => props.selectId} .title {
        color : #BB0841;
    }
    #list-del-item-${props => props.selectId} {
        background : #F0F0F0;
    }
    #list-del-item-${props => props.selectId} .title-del {
        color : #777;
    }
    #list-del-item-${props => props.selectId} .etc-del {
        color : #777777;
    }
`
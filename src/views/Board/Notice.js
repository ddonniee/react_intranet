import { useContext, useState, useEffect, useLayoutEffect } from "react"
import { styled } from "styled-components"
import { axiosInstance, axiosJsonInstance, axiosInstance2 } from '../../utils/CommonFunction';
import moment from "moment/moment";

import Header from "../../components/Header"
import Top from "../../components/Top"
import Zendesk from "../../components/Zendesk"
import SelectBox from '../../components/SelectBox'
import Viewer from "../../components/Viewer"
import Paging from "../../components/Paging";
import Tab from "../../components/Tab";

import { generateRandomString, downloadAttachment } from "../../utils/CommonFunction"
import { UserContext } from "../../hooks/UserContext";

import '../../scss/style.scss';
import { ReactComponent as SearchIcon } from '../../assets/svgs/icon_seeking.svg';
import { ReactComponent as SpeakerIcon } from '../../assets/svgs/icon_speaker.svg';
import { ReactComponent as NewIcon } from '../../assets/svgs/icon_new.svg';
import { ReactComponent as AttachmentIcon } from '../../assets/svgs/icon_attachment.svg';
import { ReactComponent as DownloadIcon } from '../../assets/svgs/icon_download.svg';

function Notice() {

    /**
     * 화면 접근 권한
     * 
     * 본사 staff    (LK)  : 전체 내용 표시
     * 법인관리자    (SS)  : 소속 법인 내용만 표시
     * 법인 admin    (SA)  : N/A
     * LGC 관리자    (LD)  : LGC 고정
     * LGC Engineer  (LE)  : LGC 고정
     * ASC 관리자    (AD)  : ASC 고정
     * ASC Engineer  (AE)  : ASC 고정
     */

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
        totalCount: 0,     // 전체 목록 수
    });

    /* 검색 영역 ****************************************************************/
    const [searchData, setSearchData] = useState({ // 검색데이터
        page: 1,
        type: 'N',
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
    const [attachments, setAttachments] = useState([]); // 첨부파일 목록

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
        console.log('search result --->', Object.fromEntries(sdata))

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
            // console.log('total ---->', data[0]?.rn)
            
        }).catch(error => {
            console.error(error);
        });
    }

    const getSelectList = () => {
        // 법인목록 조회 API
        const corpForm = new FormData();

        axiosInstance.post('/corporation/list', corpForm, config).then(res => {
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

            setDetail(data);
            if(data.attachments) { // 첨부파일 있을 시 추가
                const files = JSON.parse(data.attachments).map((file, idx) => ({
                    ...file, fileName: file.fileName, uploadPath: file.uploadPath
                }))
                setAttachments(files)
            }
            
        }).catch(error => {
            console.error(error);
        });
    }

    useEffect(() => {
        console.log('notice detail ---->', detail)
        console.log('notice file ---->', attachments)
    }, [detail]);

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
    }, [searchData]);

    const handleClickRow = (e, item) => {
        if(selectedList?.noticeId === null || selectedList?.noticeId !== item.noticeId) {
            setSelctedList({ noticeId: item.noticeId, tableName: item.tableName })
        } else {
            setSelctedList()
        }
    }

    useEffect(() => {
        selectedList && getDetail();
        setAttachments()
    }, [selectedList])

    return (
        <div className="notice-container">
        <Header />
        <div className="inner-container">
            {/** auth 권한체크로 수정 필요 */}
            <Top auth={1} searchArea={false}/>
            {/** Search Nav */}
            <div className="notice-nav">
                <div className="notice-nav-box custom-flex-item custom-align-item">
                    <p>· Subsidiary</p>
                    <SelectBox options={subOptions} handleChange={handleSelectBox} />
                </div>
                {/* <div className="custom-flex-item custom-align-item">
                    <p>· View</p>
                    <SelectBox options={centerOptions} handleChange={handleSelectBox} />
                </div> */}
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
                        {/* Total <span>{boardData.length}</span> */}
                        Total <span>{pageInfo?.totalCount}</span>
                    </div>
                    <ul className="notice-custom-board">
                        {
                            boardData.length > 0 ? (
                                boardData?.map((item, idx) => {
                                    return(
                                        <li className="notice-list" key={generateRandomString(idx)} id={`list-item-${item.noticeId}`} onClick={(e)=>handleClickRow(e, item)}>
                                            <div className="title">
                                                {/** 게시기간 종료일이 현재 날짜 이전이면 확성기 아이콘 출력 */}
                                                {item.postEndDate && new Date(moment(item.postEndDate).format('YYYY-MM-DD')) > new Date() ? <SpeakerIcon /> : null} 
                                                {item.title.length > 90 ? (item.title).substr(0,90) + '...' : item.title} 
                                                {item.new ? <NewIcon /> : null}
                                            </div>
                                            <div className="etc">
                                                <p>{item.writerName}</p> <p>{moment(item.createdAt).format('YY.M.DD')}</p>
                                            </div>
                                        </li>
                                    )
                                })
                            )
                            :
                            <div className="notice-view-none notice-list-none" >
                                <p>no data</p>
                            </div>
                        }
                    </ul>
                    {
                        boardData.length > 0 &&
                        <Paging pageInfo={pageInfo} setPageInfo={setPageInfo} searchData={searchData} setSearchData={setSearchData} />
                    }
                </div>
                <div className="notice-right">
                    {
                        detail ?
                        <>
                        <div className="notice-view-top">
                            <p className="notice-title">{detail?.title}</p>
                            <p className="notice-title-detail">
                                <span>Writer</span> : {detail?.writerName} &nbsp;
                                <span>Date</span> : {moment(detail?.createdAt).format('YY.M.DD')} &nbsp;
                                <span>Type</span> : {detail?.view}
                            </p>
                            <div className="notice-title-attach">
                                <AttachmentIcon /> 
                                <span className="notice-attach">Attachment</span>
                                <span className="custom-flex-item custom-align-item">
                                    <span className="notice-attach-count">{!attachments ? '' : ` (${attachments.length})`}</span>
                                    <p className="custom-hyphen custom-self-align">{!attachments ? '' : '-'}</p>
                                    {
                                        attachments ?
                                        attachments.map((file, idx) => {
                                            return (
                                                <span className="notice-attach-box" key={generateRandomString(idx)}> 
                                                    <p>{file.fileName}</p>
                                                    <span className="notice-attach-down" onClick={() => downloadAttachment(file.uploadPath)}> <DownloadIcon /> </span>
                                                </span>
                                            )
                                        })
                                        : null
                                    }
                                </span>
                            </div>
                        </div>
                        <div className="notice-view-middle"> <Viewer content={detail?.content}/> </div>
                        </>
                        :
                        <div className="notice-view-none">
                            <p>If you select a list, you can see the contents</p>
                        </div>
                    }
                </div>
            </div>
            </Style>

            <Zendesk />
        </div>
        <Tab />
        </div>
    )
}

export default Notice

const Style = styled.div`
    #list-item-${props => props.selectId} {
        background : #FAF1F4;
    }
    #list-item-${props => props.selectId} .title {
        color : #BB0841;
    }
`
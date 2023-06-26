import { useContext, useState, useEffect, useLayoutEffect } from "react"
import { styled } from "styled-components"
import { axiosInstance, axiosJsonInstance, axiosInstance2 } from '../../utils/CommonFunction';

import Header from "../../components/Header"
import Top from "../../components/Top"
import Zendesk from "../../components/Zendesk"
import SelectBox from '../../components/SelectBox'
import Viewer from "../../components/Viewer"
import Pagination from "react-js-pagination"

import { generateRandomString } from "../../utils/CommonFunction"

import '../../scss/style.scss';
import { ReactComponent as SearchIcon } from '../../assets/svgs/icon_seeking.svg';
import { ReactComponent as SpeakerIcon } from '../../assets/svgs/icon_speaker.svg';
import { ReactComponent as NewIcon } from '../../assets/svgs/icon_new.svg';
import { ReactComponent as AttachmentIcon } from '../../assets/svgs/icon_attachment.svg';
import { ReactComponent as DownloadIcon } from '../../assets/svgs/icon_download.svg';
import moment from "moment/moment";

function Notice() {

    // 로그인유저 정보
    // const USER_INFO = sessionStorage.getItem('UserInfo');

    const USER_CORP_CODE = 'LGEAI' // 로그인유저 법인코드
    const USER_CENTER_TYPE = 'ASC' // 로그인유저 센터타입

    /** 페이징 관련 ▼ ============================================================= */
    const [activePage, setActivePage] = useState(1); // 현재 페이지
    const [itemsPerPage] = useState(10); // 페이지당 아이템 갯수

    const setPage = (e) => {
        setActivePage(e);
        console.log('page ---->', e);
    };
    /** 페이징 관련 ▲ ============================================================= */

    /* 검색 영역 ****************************************************************/
    const [searchData, setSearchData] = useState({
        page: 1,
        type: 'N',
    }); // 검색데이터

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

    const [boardData, setBoardData] = useState([]); // notice 목록
    const [detail, setDetail] = useState({}); // notice 상세
    //     title : 'Invest In LG Electronics',
    //     writer : 'Paul_Chapin',
    //     date : 'Paul_Chapin',
    //     type : 'All',
    //     attachment : 'Guide for CB03.pptx (531KB)',
    //     content : 'How',
    //     comments : [
    //         { 
    //         writer : 'writer',
    //         detail : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius enim ac augue tristique, eget suscipit nibh bibendum. Integer convallis sapien id libero maximus, ut ultricies diam faucibus. Donec malesuada iaculis sollicitudin. Nunc nec ultrices leo. Vivamus posuere gravida tellus sed maximus. Proin ac metus varius, aliquam est vel, congue justo. Aliquam id est ac libero fringilla faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed vitae erat mi. In fringilla nulla vel ante vestibulum efficitur. In viverra facilisis fringilla. it'
    //         },
    //         { 
    //         writer : 'writer',
    //         detail : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius enim ac augue tristique, eget suscipit nibh bibendum. Integer convallis sapien id libero maximus, ut ultricies diam faucibus. Donec malesuada iaculis sollicitudin. Nunc nec ultrices leo. Vivamus posuere gravida tellus sed maximus. Proin ac metus varius, aliquam est vel, congue justo. Aliquam id est ac libero fringilla faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed vitae erat mi. In fringilla nulla vel ante vestibulum efficitur. In viverra facilisis fringilla. it'
    //         },
    //         { 
    //         writer : 'writer',
    //         detail : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius enim ac augue tristique, eget suscipit nibh bibendum. Integer convallis sapien id libero maximus, ut ultricies diam faucibus. Donec malesuada iaculis sollicitudin. Nunc nec ultrices leo. Vivamus posuere gravida tellus sed maximus. Proin ac metus varius, aliquam est vel, congue justo. Aliquam id est ac libero fringilla faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed vitae erat mi. In fringilla nulla vel ante vestibulum efficitur. In viverra facilisis fringilla. it'
    //         }
    //     ],
    //     like : 11,
    //     dislike : 7,
    // })

    const [content, setContent] = useState('<h1>How can I invest in LG Electronics? On which exchange is LG Electronics listed and what ard te ticker symbols ?</h1><p>LG Electronics Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius enim ac augue tristique, eget suscipit nibh bibendum. Integer convallis sapien id libero maximus, ut ultricies diam faucibus. Donec malesuada iaculis sollicitudin. Nunc nec ultrices leo. Vivamus posuere gravida tellus sed maximus. Proin ac metus varius, aliquam est vel, congue justo. Aliquam id est ac libero fringilla faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed vitae erat mi. In fringilla nulla vel ante vestibulum efficitur. In viverra facilisis fringilla  Suspendisse cursus ullamcorper justo, at cursus magna efficitur id. Mauris ac malesuada velit. Fusce scelerisque fringilla elit id gravida. Phasellus ut nulla sem. Etiam ac condimentum erat, ac dictum tellus.</p>');

    const [selectedList, setSelctedList] = useState();

    // const handleSelectBox = (event,params) => {
    //     const { data } = params.node;
    //     const { checked } = event.target;

    //     if (checked) {
    //         setBoardData([...boardData, data]);
    //       } else {
    //         setBoardData(boardData.filter(item => item !== data));
    //       }
    // }

    const getList = () => {
        let sdata = new FormData();
        for(const key in searchData) {
            sdata.append(key, searchData[key])
        }
        console.log('search result >>>>>>', Object.fromEntries(sdata))

        // 공지사항 목록 조회 API
        axiosInstance2.post('/notice/list', sdata).then(res => {
            const data = res?.data.result;
            console.log('공지사항 목록 ---->', data)

            setBoardData(data);
            
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

        // 공지사항 목록 조회 API
        axiosInstance2.post('/notice/detail', sdata).then(res => {
            const data = res?.data.result;
            console.log('공지사항 상세 ---->', data)

            setDetail(data);
            
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
        if(selectedList?.noticeId === null || selectedList?.noticeId !== item.noticeId) {
            setSelctedList({ noticeId: item.noticeId, tableName: item.tableName })
        } else {
            setSelctedList()
        }
    }

    useEffect(() => {
        selectedList && getDetail();
        // console.log('select list ---->', selectedList)
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
                        Total <span>{boardData.length}</span>
                    </div>
                    <ul className="notice-custom-board">
                        {
                            boardData?.map((item, idx) => {
                                return(
                                    <li className="notice-list" key={generateRandomString(idx)} id={`list-item-${item.noticeId}`} onClick={(e)=>handleClickRow(e, item)}>
                                        <div className="title">
                                            {item.top ? <SpeakerIcon /> : null} {item.title} {item.top ? <NewIcon /> : null}
                                        </div>
                                        <div className="etc">
                                            <p>{item.writerID}</p> <p>{moment(item.createdAt).format('YY.M.DD')}</p>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    {
                        boardData &&
                        <Pagination 
                            activePage={activePage} // 현재 페이지
                            itemsCountPerPage={itemsPerPage} // 한 페이지 당 보여줄 아이템 수
                            totalItemsCount={boardData?.length} // 총 아이템 수
                            pageRangeDisplayed={5} // paginator의 페이지 범위
                            prevPageText={"‹"} // "이전"을 나타낼 텍스트
                            nextPageText={"›"} // "다음"을 나타낼 텍스트
                            onChange={setPage} // 페이지 변경을 핸들링하는 함수
                        />
                    }
                </div>
                <div className="notice-right">
                    <div className="notice-view-top">
                        <p className="notice-title">{detail.title}</p>
                        <p className="notice-title-detail">
                            <span>Writer</span> : {detail.writer} &nbsp;
                            <span>Date</span> : {detail.date} &nbsp;
                            <span>Type</span> : {detail.type}
                        </p>
                        <div className="notice-title-attach">
                            <AttachmentIcon /> 
                            <span className="notice-attach">Attachment</span>
                            <span className="custom-flex-item">
                                <span className="notice-attach-count">{detail.attachment !== '' && ` (1)`}</span>
                                <p className="custom-hyphen custom-self-align">-</p>
                                <span className="notice-attach-box"> <p>{detail.attachment}</p> <DownloadIcon /> </span>
                            </span>
                        </div>
                    </div>
                    <div className="notice-view-middle"> <Viewer content={content}/> </div>
                </div>
            </div>
            </Style>

            <Zendesk />
        </div>
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
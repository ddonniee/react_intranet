import { useContext, useState, useEffect, useLayoutEffect } from "react"
import { styled } from "styled-components"

import Header from "../../components/Header"
import Top from "../../components/Top"
import Zendesk from "../../components/Zendesk"
import SelectBox from '../../components/SelectBox'
import Viewer from "../../components/Viewer"
import Pagination from "react-js-pagination"

import { axiosInstance2, generateRandomString } from "../../utils/CommonFunction"

// Icons 
import Search from '../../assets/svgs/icon_seeking.svg'
import Order from '../../assets/svgs/icon_truck.svg'
import Man from '../../assets/svgs/icon_man.svg'
import Lupa from '../../assets/svgs/icon_tools.svg'
import Hands from '../../assets/svgs/icon_hands.svg'
import Codes from '../../assets/svgs/icon_codes.svg'
import Timer from '../../assets/svgs/icon_timer.svg'
import Video from '../../assets/svgs/icon_video.svg'
import Talk from '../../assets/svgs/icon_cstalk.svg'
import Polygon from '../../assets/svgs/icon_polygon.svg'
import New from '../../assets/svgs/icon_new.svg'
import Attachment from '../../assets/svgs/icon_attachment.svg';
import Download from '../../assets/svgs/icon_download.svg'
import Like from '../../assets/svgs/icon_like.svg'
import Dislike from '../../assets/svgs/icon_dislike.svg'
import Comment from '../../assets/svgs/icon_co_comment.svg'
import More_comment from '../../assets/svgs/icon_co_more.svg'
import Editor from "../../components/Editor"
import Favorite from "../../components/Favorite"

import {UserContext} from '../../hooks/UserContext'

function CStalk() {

    /**
     * 화면 접근 권한
     * 본사 staff    (LK)  : 전체내용표시
     * 법인관리자    (SS)  : 소속 법인 내용만 표시
     * 법인 admin    (SA)  : none
     * LGC 관리자    (LD)  : 소속 센터 내용만 표시
     * LGC Engineer  (LE)  : 본인 내용만 표시 
     * ASC 관리자    (AD)  : 소속 센터 내용만 표시
     * ASC Engineer  (AE)  : 본인 내용만 표시
     */

    const user = useContext(UserContext);

    const [auth, setAuth] = useState({
      isViewer : false,
      isWriter : false,
    })

    useEffect(()=>{
      console.log(user)
      let role = user.role;
      if(role==='LK') {
        setAuth({
          ...auth,
          isViewer : true
        })
      }else if(role==='SA') {
        setAuth({
          ...auth,
          isViewer : true,
          isWriter : true
        })
      }else {
        alert('No right to Access')
        document.location.href='/login';
      }
    },[])

    /** 페이징 관련 ▼ ============================================================= */
    const [activePage, setActivePage] = useState(1); // 현재 페이지
    const [itemsPerPage] = useState(10); // 페이지당 아이템 갯수

    const [subsidiary, setSubsidiary ] = useState([
        {value:'1',label:'Canada'}, 
        {value:'2',label:'USA'}, 
        {value:'3',label:'Germany'}, 
        {value:'4',label:'Austrailia'}, 
        {value:'5',label:'Mexico'},
        {value:'6',label:'Brazil'},
        {value:'7',label:'Vietnam'},
        {value:'8',label:'Indonesia'}
    ])

    const [favoriteModal, setFavoriteModal] = useState(false);
    /** 모달 외부영역 스크롤 방지 */
    useEffect(() => {
        if (favoriteModal) {
          document.body.style.overflow = 'hidden'; // 스크롤 방지 설정
        } else {
          document.body.style.overflow = ''; // 스크롤 방지 해제
        }
      }, [favoriteModal]);

    const [isWrite, setIsWrite] = useState(false); // 글 작성시 에디터 on, viewer off
    
    const handleSelectSubsidiary = e => {
        console.log('handleSelectSubsidiary')
    }
    const setPage = (e) => {
        setActivePage(e);
        console.log('page ---->', e);
    };
    /** 페이징 관련 ▲ ============================================================= */

    const [boardData, setBoardData] = useState([]);

    const [detail, setDetail] = useState({
        title : 'Invest In LG Electronics',
        attachment : 'Guide for CB03.pptx (531kKB)',
        content : 'How',
        comments : [
           { 
            writer : 'writer',
            time : '23.1.29 16:08',
            detail : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius enim ac augue tristique, eget suscipit nibh bibendum. Integer convallis sapien id libero maximus, ut ultricies diam faucibus. Donec malesuada iaculis sollicitudin. Nunc nec ultrices leo. Vivamus posuere gravida tellus sed maximus. Proin ac metus varius, aliquam est vel, congue justo. Aliquam id est ac libero fringilla faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed vitae erat mi. In fringilla nulla vel ante vestibulum efficitur. In viverra facilisis fringilla. it'
            ,comments : [
                {writer : 'writer',
                time : '23.1.30 16:00',
                detail :' lemememlfkmsdlkf dfjkdsn fjksdn gkjdfng kjdsfnpasf dkmldksfj sdlfad sfaslddfj sdf'}
            ]
            },
             { 
            writer : 'writer',
            time : '23.1.29 16:08',
            detail : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius enim ac augue tristique, eget suscipit nibh bibendum. Integer convallis sapien id libero maximus, ut ultricies diam faucibus. Donec malesuada iaculis sollicitudin. Nunc nec ultrices leo. Vivamus posuere gravida tellus sed maximus. Proin ac metus varius, aliquam est vel, congue justo. Aliquam id est ac libero fringilla faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed vitae erat mi. In fringilla nulla vel ante vestibulum efficitur. In viverra facilisis fringilla. it'
            ,comments : [
                {writer : 'writer',
                time : '23.1.30 16:00',
                detail :' lemememlfkmsdlkf dfjkdsn fjksdn gkjdfng kjdsfnpasf dkmldksfj sdlfad sfaslddfj sdf'}
            ]
            },
             { 
            writer : 'writer',
            time : '23.1.29 16:08',
            detail : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius enim ac augue tristique, eget suscipit nibh bibendum. Integer convallis sapien id libero maximus, ut ultricies diam faucibus. Donec malesuada iaculis sollicitudin. Nunc nec ultrices leo. Vivamus posuere gravida tellus sed maximus. Proin ac metus varius, aliquam est vel, congue justo. Aliquam id est ac libero fringilla faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed vitae erat mi. In fringilla nulla vel ante vestibulum efficitur. In viverra facilisis fringilla. it'
            ,comments : [
            {writer : 'writer',
            time : '23.1.30 16:00',
            detail :' lemememlfkmsdlkf dfjkdsn fjksdn gkjdfng kjdsfnpasf dkmldksfj sdlfad sfaslddfj sdf'}
           ]
            }
        ],
        like : 11,
        dislike : 7,
    })

    const [content, setContent] = useState('<h1>How can I invest in LG Electronifaq? On which exchange is LG Electronifaq listed and what ard te ticker symbols ?</h1><p>LG Electronifaq Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius enim ac augue tristique, eget suscipit nibh bibendum. Integer convallis sapien id libero maximus, ut ultricies diam faucibus. Donec malesuada iaculis sollicitudin. Nunc nec ultrices leo. Vivamus posuere gravida tellus sed maximus. Proin ac metus varius, aliquam est vel, congue justo. Aliquam id est ac libero fringilla faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed vitae erat mi. In fringilla nulla vel ante vestibulum efficitur. In viverra facilisis fringilla  Suspendisse cursus ullamcorper justo, at cursus magna efficitur id. Mauris ac malesuada velit. Fusce scelerisque fringilla elit id gravida. Phasellus ut nulla sem. Etiam ac condimentum erat, ac dictum tellus.</p>');

    const [selectedList, setSelctedList] = useState({
        attachments : '',
        branch : '',
        center : '',
        commentCount : 0,
        content : '',
        createdAt : '',
        csTalkId : '',
        hits : 0,
        isPublic :  false,
        likeCount : 0, 
        parentCsId : '',
        subject : '', 
        subsidiary : '',
        writerID : '',
        writerName : '',
    });


    const subOptions = [
        { value: 'LGEAI', label: 'LGEAI' },
        { value: 'LGEAI2', label: 'LGEAI2' },
    ]

    const centerOptions = [
        { value: '0', label: 'Me' },
        { value: '1', label: 'All' },
        { value: '2', label: 'Center' },
    ]

    const branchOptions = [
        { value: 'NW', label: 'NW' },
        { value: 'NW2', label: 'NW2' },
    ]

    const handleSelectBox = (event,params) => {
        const { data } = params.node;
        const { checked } = event.target;

        if (checked) {
            setBoardData([...boardData, data]);
          } else {
            setBoardData(boardData.filter(item => item !== data));
          }
    }

    const handleClickRow = (e, item) => {
        console.log(item,'id')

        const formData = new FormData();
        formData.append('csTalkId', item);

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            headers: { 
               'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
            },
            data : formData
            };
        axiosInstance2('/csTalk/detail', config)
        .then(function (response){
            let resData = response.data;
            if(resData.code===200) {
                let data = resData.result
                setSelctedList(data)
                console.log(data,'[[[[[')
            }else {
                console.log(resData)
            }
        })
        .catch(function(error) {
            console.log('error',error)
        })

    }
    const handleClickAction = e => {
        console.log('handleClickAction')
    }

    const [reqData, setReqData] = useState(
        {
            page : 1,
            subsidiary:"",
            view: 1,
            search: "",
        }
    )
    const [boardLength, setBoardLength] = useState(0)
    const getList = () =>{ 
        const formData = new FormData();
        
        for (let key in reqData) {
            if (reqData.hasOwnProperty(key)) {
              formData.append(key, reqData[key]);
            }
        }

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            headers: { 
               'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
            },
            data : formData
            };
        axiosInstance2('/csTalk/list', config)
        .then(function (response){
            let resData = response.data;
            if(resData.code===200) {
                let data = resData.result
                setBoardData(data)
               
            }else {
                console.log(resData)
            }
        })
        .catch(function(error) {
            console.log('error',error)
        })
    }
    useLayoutEffect(()=>{
        getList();   
    },[])

    useEffect(()=>{
       if(boardData.length!==0) {
        console.log('== list ==',boardData)
       }
       let max = boardLength;
       boardData.map((item) =>{
        if(item.rn>max) {
            console.log(item.rn)
            max = item.rn;
        }
        setBoardLength(max)
    })
    },[boardData])

    useEffect(()=>{
        console.log(selectedList,'//////////////////////////////')
    },[selectedList])
    return (
        <div className="notice-container faq-container">
        <Header />
        <div className="inner-container">
            {/** auth 권한체크로 수정 필요 */}
            <Top auth={1} searchArea={false}/>
            {/** Search Nav */}
            <div>
            <div className="notice-nav custom-flex-item" style={user.role!=='LK' ? {justifyContent :'flex-start'} : null}>
                 {/* Subsidiary는 본사 staff만 */}
                 {
                    user.role === 'LK'
                    &&
                    <div className="notice-nav-box custom-flex-item custom-align-item">
                        <p>· Subsidiary</p>
                        <SelectBox options={subsidiary} handleChange={handleSelectSubsidiary} />
                    </div>
                }
                
                <div className="custom-flex-item custom-align-item">
                    <p>· View</p>
                    <SelectBox options={centerOptions} handleChange={handleSelectBox} />
                </div>
                <div className="custom-flex-item custom-align-item">
                    <p>· Search</p>
                    <input type="text" className="notice-nav-input"></input>
                    <div className="search-wrapper"><img src={Search} alt='search-btn'/></div>
                </div>
                {/* </div> */}
            </div>

            {/** Content Area */}
            <div className="faq-contents">
                <div className="faq-left">
                <div className="faq-count">
                        Total <span className="custom-stress-txt">{boardLength}</span>
                    </div>

                    <ul className="cstalk-custom-board ">
                        {
                            boardData?.map((item,idx)=>{
                                return(
                                    <li className="custom-justify-between" key={generateRandomString(idx)} id={`list-item-${item.num}`} onClick={(e)=>handleClickRow(e,item.csTalkId)}>
                                        <div className="cstalk-subject custom-flex-item custom-txt-align">
                                            <span>{item.level===2 && `[RE]  `}{item.subject}</span>
                                            <span>Paul_Smith</span>
                                            {/* <span>{item.writerName}</span> */}
                                        </div>
                                        <span>23.11.12</span >
                                        {/* <span>{item.createdAt}</span > */}
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
                    {/* <AgGrid data={boardData} column={column} paging={true} /> */}
                    <div className="write-btn" onClick={()=>setIsWrite(!isWrite)}><span>Write</span></div>
                </div>
                {
                    isWrite
                    ?
                    <Editor />
                    :
                    !isWrite && selectedList.csTalkId!==''
                    ?
                    <div className="catalk-right" >
                    <div className="catalk-right-top">
                        <p>{selectedList.subject}</p>
                        <div className="custom-flex-item selected-info">
                            <span>Writer : {selectedList.writerName}</span>
                            <span>Date : {selectedList.createdAt}</span>
                        </div>
                        <div className="custom-flex-item">
                            <img src={Attachment} alt="attachment"/> 
                            <span>Attachment</span>
                            <span className="custom-flex-item faq-attach-down">
                                <span>{selectedList.attachments!=='' && ` (1)`}</span><p className="custom-hyphen custom-self-align ">-</p><span className="faq-attach custom-flex-item"><p>{detail.attachment}</p><img src={Download} alt='download_attachment'/></span>
                            </span>
                        </div>   
                        <div className="user-action custom-flex-item ">
                            <span className="faq-like custom-flex-item " onClick={handleClickAction}><img src={Like} alt="btn_like"/><p>{detail.dislike}</p></span>   
                            <span >|</span>
                            <span className="faq-dislike custom-flex-item " onClick={handleClickAction}><img src={Dislike} alt='btn_dislike'/><p>{detail.dislike}</p></span> 
                        </div> 
                    </div>
                    <div className="faq-right-middle">
                        <Viewer content={selectedList.content}/>
                        <div className="setting-viewer custom-flex-item">
                            <div><button className="custom-flex-item custom-align-item">Allow Views</button></div>
                            <div><button className="custom-flex-item custom-align-item">Modify</button></div>
                            <div><button className="custom-flex-item custom-align-item">Answer</button></div>
                        </div>
                    </div>
                    <div className="faq-right-bottom">
                        <div className="faq-comment-wrapper">
                            <span>Comments</span>
                            <div>
                                <textarea/>
                                <button>Write</button>
                            </div>
                        </div>
                        <div className="faq-comment-list">
                            <ul>
                                {
                                    detail.comments?.map((comment,idx)=>{
                                        return(
                                            <li key={generateRandomString(idx)}>
                                                <div className="comment-top custom-flex-item custom-justify-between">
                                                    <div>
                                                        <span>{comment.writer}</span>
                                                        <span>{comment.time}</span>
                                                    </div>
                                                    <span className="custom-flex-item">
                                                        <p>Delete</p><p>Answer</p>
                                                    </span>
                                                </div>
                                                <div className="comment-middle">{comment.detail.slice(0,250)}{comment.detail.length>250 && <span className="custom-stress-txt">...More</span>}</div>
                                                <div className="comment-bottom custom-flex-item custom-align-self">
                                                    {comment.comments?.map((c,idx)=>{
                                                        return (
                                                            <>
                                                            <img src={Comment} alt="under-comment" />
                                                            <span>Comment</span>
                                                            <span className="custom-stress-txt">{comment.comments.length}</span>
                                                            <img src={More_comment} alt="under-comment" />
                                                            </>
                                                        )
                                                    })}
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                :
                <div className="faq-right" >
                </div>
                }
                 {/* <button style={{position:'absolute'}} onClick={()=>setFavoriteModal(true)}>test btn</button> */}
            </div>

            <Zendesk />

            {/* test */}
           
            {
                favoriteModal 
                &&
                <Favorite onClose={()=>setFavoriteModal(false)}/>
            }
            </div>
        </div>
        </div>
    )
}

export default CStalk

const Style = styled.div`
    #list-item-${props => props.selectId} {
        background : #FAF1F4;
    }
    #list-item-${props => props.selectId} .title {
        color : #BB0841;
    }
`
import { useContext, useState, useEffect } from "react"
import { styled } from "styled-components"

import Header from "../../components/Header"
import Top from "../../components/Top"
import Zendesk from "../../components/Zendesk"
import SelectBox from '../../components/SelectBox'
import Viewer from "../../components/Viewer"
import Pagination from "react-js-pagination"

import { generateRandomString } from "../../utils/CommonFunction"

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

function CStalk() {

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

    const [isWrite, setIsWrite] = useState(false); // 글 작성시 에디터 on, viewer off
    
    const handleSelectSubsidiary = e => {
        console.log('handleSelectSubsidiary')
    }
    const setPage = (e) => {
        setActivePage(e);
        console.log('page ---->', e);
    };
    /** 페이징 관련 ▲ ============================================================= */

    const [boardData, setBoardData] = useState([
        {
            num : '001',
            title : `R007 - Used Parts Q'ty larger than avaliable`,
            writer : `Paul_Chapin`,
            date : `23.1.29`,
            top : true,
        },
        {
            num : '002',
            title : `What is LG Electronifaq' credit rating?`,
            writer : `Paul_Chapin`,
            date : `23.1.29`,
        },
        {
            num : '003',
            title : `How do I sign up to receive regular Investor Relations (IR) email updates?`,
            writer : `Paul_Chapin`,
            date : `23.1.29`,
        },
        {
            num : '004',
            title : `Which reporting convetion does LGE use when posting its finantial information?`,
            writer : `Paul_Chapin`,
            date : `23.1.29`,
        },
        {
            num : '005',
            title : `I would like to knoe more about LG Elctronifaq: e.g. corporate information, press...`,
            writer : `Paul_Chapin`,
            date : `23.1.29`,
        },
        {
            num : '006',
            title : `I would like to knoe more about LG Elctronifaq: e.g. corporate information, press...`,
            writer : `Paul_Chapin`,
            date : `23.1.29`,
        },
        {
            num : '007',
            title : `R007 - Used Parts Q'ty larger than avaliable`,
            writer : `Paul_Chapin`,
            date : `23.1.29`,
        },
        {
            num : '008',
            title : `How do I sign up to receive regular Investor Relations (IR) email updates?`,
            writer : `Paul_Chapin`,
            date : `23.1.29`,
        },
        {
            num : '009',
            title : `I would like to knoe more about LG Elctronifaq: e.g. corporate information, press...`,
            writer : `Paul_Chapin`,
            date : `23.1.29`,
        },
        {
            num : '010',
            title : `I would like to knoe more about LG Elctronifaq: e.g. corporate information, press...e`,
            writer : `Paul_Chapin`,
            date : `23.1.29`,
        },
    ]);

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

    const [selectedList, setSelctedList] = useState({ num: null, title: '' });


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
        if(selectedList.num === null || selectedList.num !== item.num) {
            setSelctedList(item)
        }else {
            setSelctedList({ num: null, title: '' })
        }
    }
    const handleClickAction = e => {
        console.log('handleClickAction')
    }

    return (
        <div className="notice-container faq-container">
        <Header />
        <div className="inner-container">
            {/** auth 권한체크로 수정 필요 */}
            <Top auth={1} searchArea={false}/>
            {/** Search Nav */}
            <div>
            <div className="notice-nav custom-flex-item">
                {/* <div className="nav-left"> */}
                <div className="notice-nav-box custom-flex-item custom-align-item">
                    <p>· Subsidiary</p>
                    <SelectBox options={subsidiary} handleChange={handleSelectSubsidiary} />
                </div>
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
                        Total <span>{boardData.length}</span>
                    </div>

                    <ul className="faq-custom-board">
                        {
                            boardData?.map((item,idx)=>{
                                return(
                                    <li key={generateRandomString(idx)} id={`list-item-${item.num}`} onClick={(e)=>handleClickRow(e,item)}><span>{item.num}</span><span>{item.title}</span></li>
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
                    <div className="faq-right" >
                    <div className="faq-right-top">
                        <p>{detail.title}</p>
                        <div className="custom-flex-item">
                            <img src={Attachment} alt="attachment"/> 
                            <span>Attachment</span>
                            <span className="custom-flex-item faq-attach-down">
                                <span>{detail.attachment!=='' && ` (1)`}</span><p className="custom-hyphen custom-self-align ">-</p><span className="faq-attach custom-flex-item"><p>{detail.attachment}</p><img src={Download} alt='download_attachment'/></span>
                            </span>
                        </div>   
                        <div className="user-action custom-flex-item ">
                            <span className="faq-like custom-flex-item " onClick={handleClickAction}><img src={Like} alt="btn_like"/><p>{detail.dislike}</p></span>   
                            <span >|</span>
                            <span className="faq-dislike custom-flex-item " onClick={handleClickAction}><img src={Dislike} alt='btn_dislike'/><p>{detail.dislike}</p></span> 
                        </div> 
                    </div>
                    <div className="faq-right-middle"><Viewer content={content}/></div>
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
                                            <li>
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
                }
            </div>

            <Zendesk />
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
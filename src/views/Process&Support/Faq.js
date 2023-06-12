// import { useState } from "react"

// import ExportExcel from "../../utils/ExportExcel"


import { useContext, useState } from "react"
import { TestContext } from "../../hooks/TestContext"

// Components
import Header from "../../components/Header"
import Top from "../../components/Top"
import Zendesk from "../../components/Zendesk"
import AgGrid from "../../components/AgGrid"
import Viewer from "../../components/Viewer"
// Utils
import { generateRandomString } from "../../utils/CommonFunction"

// Icons 
import Order from '../../assets/svgs/icon_truck.svg'
import Docs from '../../assets/svgs/icon_docs.svg'
import Man from '../../assets/svgs/icon_man.svg'
import Lupa from '../../assets/svgs/icon_tools.svg'
import Hands from '../../assets/svgs/icon_hands.svg'
import Codes from '../../assets/svgs/icon_codes.svg'
import Timer from '../../assets/svgs/icon_timer.svg'
import Video from '../../assets/svgs/icon_video.svg'
import Talk from '../../assets/svgs/icon_cstalk.svg'

import New from '../../assets/svgs/icon_new.svg'
import Attachment from '../../assets/svgs/icon_attachment.svg';
import Download from '../../assets/svgs/icon_download.svg'
import Like from '../../assets/svgs/icon_like.svg'
import Dislike from '../../assets/svgs/icon_dislike.svg'


function Faq() {

    let auth = 1;

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

    // const testValue = useContext(TestContext)
    const [faqLists, setFaqLists] = useState([
        {
            num : 0,
            title : '[Installation]',
            content : 'Weekly Report of AX AS Back Order a september HE-OK55',
            link : 'www.naver.com',
            time : '2023-04-12'
        },
        {
            num : 1,
            title : '[Installation]',
            content : 'Weekly Report of AX AS Back Order a september HE-OK55',
            link : 'www.naver.com',
            time : '2023-04-12'
        },
        {
            num : 2,
            title : '[Installation]',
            content : 'Weekly Report of AX AS Back Order a september HE-OK55',
            link : 'www.naver.com',
            time : '2023-06-12'
        },
        {
            num : 3,
            title : '[Installation]',
            content : 'Weekly Report of AX AS Back Order a september HE-OK55',
            link : 'www.naver.com',
            time : '2023-04-12'
        },
        {
            num : 4,
            title : '[Installation]',
            content : 'Weekly Report of AX AS Back Order a september HE-OK55',
            link : 'www.naver.com',
            time : '2023-04-12'
        }
    ])
    const [categoryLists, setCategoryLists] = useState([
        {
            num : 0,
            icon : Order,
            name : 'displacement',
            lowerMenu : [
                {
                    lowerName : 'Hold Codes',
                    path : process.env.REACT_APP_FRONT_URL
                }
            ]
        },
        {
            num : 0,
            icon : Docs,
            name : 'Hold',
            lowerMenu : [
                {
                    lowerName : 'Hold Codes',
                    path : process.env.REACT_APP_FRONT_URL
                }
            ]
        },
        {
            num : 0,
            icon : Man,
            name : 'Installation',
            lowerMenu : [
                {
                    lowerName : 'Hold Codes',
                    path : process.env.REACT_APP_FRONT_URL
                },
                {
                    lowerName : 'Service Order',
                    path : process.env.REACT_APP_FRONT_URL
                },
                {
                    lowerName : 'VIDEO-Status',
                    path : process.env.REACT_APP_FRONT_URL
                },
                {
                    lowerName : 'Support',
                    path : process.env.REACT_APP_FRONT_URL
                }
            ]
        },
        {
            num : 0,
            icon : Lupa,
            name : 'Agreement Process',
            lowerMenu : [
                {
                    lowerName : 'Hold Codes',
                    path : process.env.REACT_APP_FRONT_URL
                }
            ]
        },
        {
            num : 0,
            icon : Hands,
            name : 'Order Status',
            lowerMenu : [
                {
                    lowerName : 'Hold Codes',
                    path : process.env.REACT_APP_FRONT_URL
                }
            ]
        },
        {
            num : 0,
            icon : Codes,
            name : 'Hold Codes',
            lowerMenu : [
                {
                    lowerName : 'Hold Codes',
                    path : process.env.REACT_APP_FRONT_URL
                }
            ]
        },
        {
            num : 0,
            icon : Timer,
            name : 'Service Order',
            lowerMenu : [
                {
                    lowerName : 'Hold Codes',
                    path : process.env.REACT_APP_FRONT_URL
                }
            ]
        },
        {
            num : 0,
            icon : Video,
            name : 'VIDEO - Status',
            lowerMenu : [
                {
                    lowerName : 'Hold Codes',
                    path : process.env.REACT_APP_FRONT_URL
                }
            ]
        },
        {
            num : 0,
            icon : Talk,
            name : 'Support',
            lowerMenu : [
                {
                    lowerName : 'Hold Codes',
                    path : process.env.REACT_APP_FRONT_URL
                }
            ]
        },
    ])
    const [boardData, setBoardData] = useState([

        {
            num : '001',
            title : `R007 - Used Parts Q'ty larger than avaliable`,
        },
        {
            num : '002',
            title : `What is LG Electronics' credit rating?`,
        },
        {
            num : '003',
            title : `How do I sign up to receive regular Investor Relations (IR) email updates?`,
        },
        {
            num : '004',
            title : `Which reporting convetion does LGE use when posting its finantial information?`,
        },
        {
            num : '005',
            title : `I would like to knoe more about LG Elctronics: e.g. corporate information, press...`,
        },
        {
            num : '006',
            title : `I would like to knoe more about LG Elctronics: e.g. corporate information, press...`,
        },
        {
            num : '007',
            title : `R007 - Used Parts Q'ty larger than avaliable`,
        },
        {
            num : '008',
            title : `How do I sign up to receive regular Investor Relations (IR) email updates?`,
        },
        {
            num : '009',
            title : `I would like to knoe more about LG Elctronics: e.g. corporate information, press...`,
        },
        {
            num : '010',
            title : `I would like to knoe more about LG Elctronics: e.g. corporate information, press...e`,
        },
    ])

    const [column, setColumn] = useState([
        { field: 'num' },
        { field: 'title' },
    ])
    const [detail, setDetail] = useState({
        title : 'Invest In LG Electronics',
        attachment : 'Guide for CB03.pptx (531kKB)',
        content : 'How',
        comments : [
           { 
            writer : 'writer',
            detail : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius enim ac augue tristique, eget suscipit nibh bibendum. Integer convallis sapien id libero maximus, ut ultricies diam faucibus. Donec malesuada iaculis sollicitudin. Nunc nec ultrices leo. Vivamus posuere gravida tellus sed maximus. Proin ac metus varius, aliquam est vel, congue justo. Aliquam id est ac libero fringilla faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed vitae erat mi. In fringilla nulla vel ante vestibulum efficitur. In viverra facilisis fringilla. it'
            },
             { 
            writer : 'writer',
            detail : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius enim ac augue tristique, eget suscipit nibh bibendum. Integer convallis sapien id libero maximus, ut ultricies diam faucibus. Donec malesuada iaculis sollicitudin. Nunc nec ultrices leo. Vivamus posuere gravida tellus sed maximus. Proin ac metus varius, aliquam est vel, congue justo. Aliquam id est ac libero fringilla faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed vitae erat mi. In fringilla nulla vel ante vestibulum efficitur. In viverra facilisis fringilla. it'
            },
             { 
            writer : 'writer',
            detail : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius enim ac augue tristique, eget suscipit nibh bibendum. Integer convallis sapien id libero maximus, ut ultricies diam faucibus. Donec malesuada iaculis sollicitudin. Nunc nec ultrices leo. Vivamus posuere gravida tellus sed maximus. Proin ac metus varius, aliquam est vel, congue justo. Aliquam id est ac libero fringilla faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed vitae erat mi. In fringilla nulla vel ante vestibulum efficitur. In viverra facilisis fringilla. it'
            }
        ],
        like : 11,
        dislike : 7,
    })
    const [content, setContent] = useState('<h1>How can I invest in LG Electronics? On which exchange is LG Electronics listed and what ard te ticker symbols ?</h1><p>LG Electronics Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius enim ac augue tristique, eget suscipit nibh bibendum. Integer convallis sapien id libero maximus, ut ultricies diam faucibus. Donec malesuada iaculis sollicitudin. Nunc nec ultrices leo. Vivamus posuere gravida tellus sed maximus. Proin ac metus varius, aliquam est vel, congue justo. Aliquam id est ac libero fringilla faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed vitae erat mi. In fringilla nulla vel ante vestibulum efficitur. In viverra facilisis fringilla  Suspendisse cursus ullamcorper justo, at cursus magna efficitur id. Mauris ac malesuada velit. Fusce scelerisque fringilla elit id gravida. Phasellus ut nulla sem. Etiam ac condimentum erat, ac dictum tellus.</p>');

    const handleClickAction = e => {
        console.log('handleClickAction')
    }
    const handleSelectBox = e => {
        console.log(e)
    }
 

    return (
        <>
        <Header />
        <div className="inner-container">
            <Top auth={ auth=== 1 ? true : false} options={subsidiary} handleChange={handleSelectBox} />
            {/** Top Area */}
            <div className="faq-nav">
                <div className="faq-lists-wrapper">
                    <ul className="faq-lists">
                        {faqLists?.map((list, idx)=>{
                            return (
                                <li key={generateRandomString(idx)}>
                                    <div className="faq-top">
                                        <p className="faq-number" style={list.num !== 0 ? {marginRight:'10px'} : null}>{list.num!==0 && `Q.${list.num}`}</p>
                                        <p className="faq-title">{list.title}</p>
                                    </div>
                                    <div className="faq-summary">{list.content}</div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="faq-category">
                    <ul className="faq-category-lists">
                        {
                            categoryLists?.map((list,idx)=>{
                                return(
                                    <li key={generateRandomString(idx+1)}>
                                        <div className="faq-img-wrapper"><img src={list.icon} /></div>
                                        <p>{list.name}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>

            {/** Content Area */}
            <div className="faq-contents">
                <div className="faq-left">
                    <AgGrid data={boardData} column={column} paging={true} />
                </div>
                <div className="faq-right" >
                    <div className="faq-right-top">
                        <p>{detail.title}</p>
                        <div className="custom-flex-item">
                            <img src={Attachment} alt="attachment"/> 
                            <span>Attachment</span>
                            <span className="custom-flex-item">
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
                                            <li className="custom-flex-item custom-justify-between"><span>{comment.detail.slice(0,100)}</span><span>{comment.writer}</span><span className="custom-flex-item"><p>Edit</p><p>|</p><p>Delete</p></span></li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <Zendesk />
        </div>
        </>
    )
}

// function Faq() {

//     // const [csvData, setCsvData] = useState([]);
//     const [csvData, setCsvData] = useState([{ name: 'John', age: 30, city: 'New York' },
//     { name: 'Jane', age: 25, city: 'San Francisco' },
//     { name: 'Bob', age: 35, city: 'Los Angeles' },])
//     const [filename, setFilename] = useState('test');

//     return (
//         <>
//         {csvData &&<ExportExcel csvData={csvData} filename={filename}/>}
//         </>
//     )
// }
export default Faq

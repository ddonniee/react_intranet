// import { useState } from "react"

// import ExportExcel from "../../utils/ExportExcel"


import { useContext, useEffect, useRef, useState } from "react"
import { styled } from "styled-components";

import { UserContext } from "../../hooks/UserContext"
import Pagination from "react-js-pagination";
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
import Polygon from '../../assets/svgs/icon_polygon.svg'
import Plus from '../../assets/svgs/icon_plus.svg'
import Minus from '../../assets/svgs/icon_minus.svg';
import Download from '../../assets/svgs/icon_download.svg'
import Like from '../../assets/svgs/icon_like.svg'
import Dislike from '../../assets/svgs/icon_dislike.svg'
import Comment from '../../assets/svgs/icon_co_comment.svg'
import More_comment from '../../assets/svgs/icon_co_more.svg'

function FaqSetting() {

    let auth = 1;
    const user = useContext(UserContext)
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

     /** 페이징 관련 ▼ ============================================================= */
     const [activePage, setActivePage] = useState(1); // 현재 페이지
     const [itemsPerPage] = useState(10); // 페이지당 아이템 갯수
 
     const setPage = (e) => {
         setActivePage(e);
         console.log('page ---->', e);
     };
     /** 페이징 관련 ▲ ============================================================= */

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
            ],
            iconModal : false,
        },
        {
            num : 1,
            icon : Docs,
            name : 'Hold',
            lowerMenu : [
                {
                    lowerName : 'Hold Codes',
                    path : process.env.REACT_APP_FRONT_URL
                }
            ],
            iconModal : false,
        },
        {
            num : 2,
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
            ],
            iconModal : false,
        },
        {
            num : 3,
            icon : Lupa,
            name : 'Agreement Process',
            lowerMenu : [
                {
                    lowerName : 'Hold Codes',
                    path : process.env.REACT_APP_FRONT_URL
                }
            ],
            iconModal : false,
        },
        {
            num : 4,
            icon : Hands,
            name : 'Order Status',
            lowerMenu : [
                {
                    lowerName : 'Hold Codes',
                    path : process.env.REACT_APP_FRONT_URL
                }
            ],
            iconModal : false,
        },
        {
            num : 5,
            icon : Codes,
            name : 'Hold Codes',
            lowerMenu : [
                {
                    lowerName : 'Hold Codes',
                    path : process.env.REACT_APP_FRONT_URL
                }
            ],
            iconModal : false,
        },
        {
            num : 6,
            icon : Timer,
            name : 'Service Order',
            lowerMenu : [
                {
                    lowerName : 'Hold Codes',
                    path : process.env.REACT_APP_FRONT_URL
                }
            ],
            iconModal : false,
        },
        {
            num : 7,
            icon : Video,
            name : 'VIDEO - Status',
            lowerMenu : [
                {
                    lowerName : 'Hold Codes',
                    path : process.env.REACT_APP_FRONT_URL
                }
            ],
            iconModal : false,
        },
        {
            num : 8,
            icon : Talk,
            name : 'Support',
            lowerMenu : [
                {
                    lowerName : 'Hold Codes',
                    path : process.env.REACT_APP_FRONT_URL
                }
            ],
            iconModal : false,
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
    const [content, setContent] = useState('<h1>How can I invest in LG Electronics? On which exchange is LG Electronics listed and what ard te ticker symbols ?</h1><p>LG Electronics Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius enim ac augue tristique, eget suscipit nibh bibendum. Integer convallis sapien id libero maximus, ut ultricies diam faucibus. Donec malesuada iaculis sollicitudin. Nunc nec ultrices leo. Vivamus posuere gravida tellus sed maximus. Proin ac metus varius, aliquam est vel, congue justo. Aliquam id est ac libero fringilla faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed vitae erat mi. In fringilla nulla vel ante vestibulum efficitur. In viverra facilisis fringilla  Suspendisse cursus ullamcorper justo, at cursus magna efficitur id. Mauris ac malesuada velit. Fusce scelerisque fringilla elit id gravida. Phasellus ut nulla sem. Etiam ac condimentum erat, ac dictum tellus.</p> <h1>How can I invest in LG Electronics? On which exchange is LG Electronics listed and what ard te ticker symbols ?</h1><p>LG Electronics Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius enim ac augue tristique, eget suscipit nibh bibendum. Integer convallis sapien id libero maximus, ut ultricies diam faucibus. Donec malesuada iaculis sollicitudin. Nunc nec ultrices leo. Vivamus posuere gravida tellus sed maximus. Proin ac metus varius, aliquam est vel, congue justo. Aliquam id est ac libero fringilla faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed vitae erat mi. In fringilla nulla vel ante vestibulum efficitur. In viverra facilisis fringilla  Suspendisse cursus ullamcorper justo, at cursus magna efficitur id. Mauris ac malesuada velit. Fusce scelerisque fringilla elit id gravida. Phasellus ut nulla sem. Etiam ac condimentum erat, ac dictum tellus.</p>');

    const [selectedList, setSelctedList] = useState({num:null, title:''});
    const handleClickAction = e => {
        console.log('handleClickAction')
    }
    const handleSelectBox = e => {
        console.log(e)
    }
    const handleClickRow = (e,item) => {
        if(selectedList.num===null || selectedList.num!==item.num) {
            setSelctedList(item)
        }else {
            setSelctedList({num:null, title:''})
        }
    }

    const iconRef = useRef();
    const [iconList, setIconLiet] = useState(['Hold Codes','Service Order','VIDEO-Status','Support'])

    const IconModal = () =>{
        return (
            <div className='icon-modal' ref={iconRef}>
                <img src={Polygon} alt='polygon' />
                <ul>
                    {
                        iconList?.map((list,idx)=>{
                            return(
                                <li className='custom-hover' id={`icon-list-${idx+1}`} key={generateRandomString(idx+3)}>{list}</li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
    const handleClickIcon = (e,item) => {
        
        setCategoryLists((prevLists) => {
            
            const updatedLists = prevLists.map((list) => {
              if (list.num === item.num) {
                return { ...list, iconModal: item.iconModal ? false : true };
              } else {
                return { ...list, iconModal: false };
              }
            //   return list;
            });
            return updatedLists;
          });
    }
    useEffect(()=>{
        console.log(selectedList)
    },[selectedList])
    
    const handleOutsideClick = (e) => {
        if (iconRef.current && !iconRef.current.contains(e.target)) {
          setCategoryLists((prevLists) => {
            const updatedLists = prevLists.map((list) => ({
              ...list,
              iconModal: false,
            }));
            return updatedLists;
          });
        }
      }; 
        

      useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
          document.removeEventListener("mousedown", handleOutsideClick);
        };
      }, []);

    return (
        <>
        
        <Header />
        <Style selectId={selectedList.num} >
        <div className="inner-container">
            <Top searchArea={true} auth={ auth=== 1 ? true : false} options={subsidiary} handleChange={handleSelectBox} />
            {/** Top Area */}
            <div className="faq-setting">
                <div className="faq-category custom-flex-item custom-justify-between">
                    <ul className="faq-category-lists">
                        {
                            categoryLists?.map((list,idx)=>{
                                return(
                                    <li key={generateRandomString(idx+1)} onClick={(e)=>handleClickIcon(e,list)}>
                                        <div className="faq-img-wrapper"><img src={list.icon} /></div>
                                        <p>{list.name}</p>
                                        {
                                        list.iconModal
                                        &&
                                        <IconModal />
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div></div>
                    <div className="buttons">
                        <button><img src={Minus} alt='icon_less_btn'/></button>
                        <button><img src={Plus} alt='icon_more_btn'/></button>
                    </div>
                </div>
            </div>

            {/** Content Area */}
            <div className="faq-contents">
                
               
               
            </div>

            <Zendesk />
        </div>
        </Style>
        </>
    )
}
export default FaqSetting

const Style = styled.div`
    #list-item-${props=>props.selectId} {
        background : #FAF1F4; color : #BB0841; 
    }
`
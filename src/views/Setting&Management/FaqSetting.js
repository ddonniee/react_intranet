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
import Tab from "../../components/Tab";
import NewFaq from "./NewFormat/NewFaq";
// Utils
import { generateRandomString,axiosInstance2 } from "../../utils/CommonFunction"

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
import New from '../../assets/svgs/icon_new.svg'

import moment from "moment";

function FaqSetting() {

    let auth = 1;
    const user = useContext(UserContext)
    let now = moment().subtract(24,'hours').format('YYYY-MM-DD HH:mm:ss');

    const [subsidiary, setSubsidiary ] = useState([
        {value:'',label:'All'}, 
        {value:'LGEAI',label:'LGEAI'}, 
        {value:'LGECI',label:'LGECI'}, 
        {value:'LGEES',label:'LGEES'}, 
        {value:'LGEJP',label:'LGEJP'}, 
        {value:'LGEKR',label:'LGEKR'},
        {value:'LGEMC',label:'LGEMC'},
    ])
     /** 페이징 관련 ▼ ============================================================= */
     const [activePage, setActivePage] = useState(1); // 현재 페이지
     const [itemsPerPage] = useState(10); // 페이지당 아이템 갯수
 
     const setPage = (e) => {
         setActivePage(e);
         console.log('page ---->', e);
     };
     
    /** 외부클릭처리 ▼ ============================================================= */
    const editorRef = useRef(null);
    const detailRef = useRef(null);
    const categoryRef = useRef(null)
    const tabRef = useRef(null);
    const openRef = useRef(null)
    /** 외부클릭처리 ▲ ============================================================= */

    // const testValue = useContext(TestContext)
    const [faqLists, setFaqLists] = useState([])
    const [categoryLists, setCategoryLists] = useState([])
    const [boardLength, setBoardLength] = useState(0)
    const [boardData, setBoardData] = useState([])

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

    const [selectedList, setSelectedList] = useState({
        attachments: '',
        reactionState: "",
        subject: "",
        dislikeCount: 0,
        likeCount: 0,
        content: '',
        subsidiary:'',
        writerName:'',
        commentCount : 0,
        hits: 16,
        createdAt: '',
        faqId: '',
        categoryId: '',
        writerID: ''
    });

    const [reqData, setReqData] = useState({
        categoryId: '',
        subsidiary: '',
        search : '',
        type : 'F',
    })
    const getList = () =>{

        console.log('검색한다', reqData)

        const formData = new FormData();

        for (let key in reqData) {
            if (reqData.hasOwnProperty(key)) {
              formData.append(key, reqData[key]);
            }
        }
        formData.append('page',activePage)
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            headers: { 
               'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
            },
            data : formData
            };
        axiosInstance2('/faq/list', config)
        .then(function (response){
            let resData = response.data;
            console.log(resData,'dddd')
            if(resData.code===200) {
                let data = resData.result
             
                setBoardData(data.list)
                // setFrequentList(data.top5list)
            }else {
                console.log(resData)
            }
        })
        .catch(function(error) {
            console.log('error',error)
        })
    }
    
    const getCategory = () =>{

     
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            headers: { 
               'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
            },
            };
        axiosInstance2('/faqCa/list', config)
        .then(function (response){
            let resData = response.data;
            if(resData.code===200) {
                let data = resData.result
                console.log('getCategory',resData)
                data.map(d=>{
                    d.iconModal = false
                })
                setCategoryLists(data)
            }else {
                console.log(resData)
            }
        })
        .catch(function(error) {
            console.log('error',error)
        })
    }

    const getDetail = (id) =>{

        const formData = new FormData();

        formData.append('faqId',id)

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            headers: { 
               'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
            },
            data : formData
            };
        axiosInstance2('/faq/detail', config)
        .then(function (response){
            let resData = response.data;
            if(resData.code===200) {
                let data = resData.result
                setSelectedList(data)
            }else {
                console.log(resData)
            }
        })
        .catch(function(error) {
            console.log('error',error)
        })
    }

    const [openSaver, setOpenSaver] = useState(false)
    const addCategory = (num,id) =>{
        console.log('add category',num,id)
        setOpenSaver(true)
    }
    const clearState =()=> {
        setSelectedList({
            attachments: '',
            reactionState: "",
            subject: "",
            dislikeCount: 0,
            likeCount: 0,
            content: '',
            subsidiary:'',
            writerName:'',
            commentCount : 0,
            hits: 16,
            createdAt: '',
            faqId: '',
            categoryId: '',
            writerID: ''
           })
      }
    useEffect(()=>{
        getList()
        getCategory() 
    },[])

    const [categoryIcon, setCategoryIcon] = useState([])
    
    useEffect(()=>{
        if(categoryLists.length !== 0 ) {
            let copy = [...categoryLists]
            copy.map(c=>{
                let jsonString = JSON.parse(c.categoryIcon);
                if(jsonString!==null) {
                    c.fileName = jsonString.fileName
                    c.uploadPath = jsonString.uploadPath
                }
            })
            setCategoryIcon(copy)
        }
    },[categoryLists])

    useEffect(()=>{
        if(boardData.length===0) {
            setBoardLength(0)
       }
       else {
        let max = boardLength;
        if(activePage===1) {
         max = 0
         boardData.map((item) =>{
             if(item.rn>max) {
                 max = item.rn;
             }
             setBoardLength(max)
          })
        }
       }
      
      },[boardData])

      const [subCategory, setSubCategory] = useState(['Hold Codes','Service Order','VIDEO-Status','Support'])
      const [selectedCategory, setSelectedCategory] = useState('');
    const handleClickIcon = (e,item) => {
        console.log('handleClickIcon',item)
        let id = item.categoryId;
        let arr = [];

        categoryLists.map(item=>
            item.parentCategoryId === id 
            &&
            arr.push(item)
            )
        setSubCategory(arr)
    }

    useEffect(()=>{
        setSelectedCategory(subCategory[0])
    },[subCategory])
    const handleClickAction = e => {
        console.log('handleClickAction')
    }
    const handleSelectBox = e => {
        console.log(e)
    }
    const handleClickRow = (e,item) => {
        let id = item.faqId;
        getDetail(id)
    }

    useEffect(()=>{
        getList()
      },[activePage])

    useEffect(()=>{
        if(selectedList.faqId!=='' && openSaver) {
            setOpenSaver(false)
        }
    },[selectedList])
    
    useEffect(()=>{
        if(openSaver && selectedList.faqId !=='') {
            clearState()
        }
    },[openSaver])


    // const handleOutsideClick = (e) => {
    //     e.stopPropagation();
    //     if ((editorRef.current && !editorRef.current.contains(e.target)) && (detailRef.current && !detailRef.current.contains(e.target)) && (categoryRef.current && !categoryRef.current.contains(e.target)) && (tabRef.current && !tabRef.current.contains(e.target)) || (openRef.current && !openRef.current.contains(e.target))) {
    //         clearState()
    //     }
    
    //   }; 
        

    //   useEffect(() => {
    //     document.addEventListener("mousedown", handleOutsideClick);
    //     return () => {
    //       document.removeEventListener("mousedown", handleOutsideClick);
    //     };
    //   }, []);


    return (
        <>
        
        <Header />
        <Style selectId={selectedList.faqId} openRight={(selectedList.faqId!=='' || openSaver)? true : false}>
        <div className="inner-container">
            <Top searchArea={true} auth={ auth=== 1 ? true : false} options={subsidiary} handleChange={handleSelectBox} />
            {/** Top Area */}
            <div className="faq-setting"  ref={categoryRef}>
                <div className="faq-category custom-flex-item custom-justify-between">
                    <ul className="faq-category-lists">
                    {
                    categoryLists?.map((list, idx) => {
                        if (list.parentCategoryId === null) {
                        return (
                            <li key={generateRandomString(idx + 1)} onClick={(e) => handleClickIcon(e, list)} className="cursor-btn">
                            <div className="faq-img-wrapper"><img src={process.env.REACT_APP_DOWN_URL + list.uploadPath} alt='category-icon' /></div>
                            <p>{list.categoryNm}</p> </li>
                        );
                        }
                        return null; // 부모 카테고리가 아닌 경우에는 null을 반환하여 렌더링하지 않음
                    })
                    }

                    </ul>
                    <div></div>
                    <div className="buttons">
                        <button><img src={Minus} alt='icon_less_btn'/></button>
                        <button onClick={()=>{addCategory(1,selectedList.faqId)}}><img src={Plus} alt='icon_more_btn'/></button>
                    </div>
                </div>
            </div>
            <div className="faq-setting-tab custom-flex-item custom-justify-between" ref={tabRef}>
                <div>
                    <ul className="custom-flex-item">
                        {
                            subCategory?.map((item,idx)=>{
                                return(
                                    <li className={`custom-flex-item custom-align-item custom-justify-center cursor-btn ${selectedCategory===item && `red-selected`}`} onClick={()=>setSelectedCategory(item)}>{item}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="buttons">
                    <button><img src={Minus} alt='icon_less_btn' /></button>
                    <button onClick={()=>{addCategory(2,selectedList.faqId)}}><img src={Plus} alt='icon_more_btn'/></button>
                </div>
            </div>
            {/** Content Area */}
            <div className="faq-contents">
                    <div className="faq-left custom-flex-item custom-justify-between" ref={editorRef}>
                    <ul className="faq-custom-board" >
                        {
                            boardData && boardData.length > 0 && boardData.map((item,idx)=>{
                                return(
                                    <li className="cursor-btn" key={generateRandomString(idx)} id={`list-item-${item.faqId}`} onClick={(e)=>handleClickRow(e,item)}>
                                        <span>{String((activePage-1)*10+(idx+1)).padStart(3, '0')}</span><span className="board-max-length">{item.subject?.slice(0,82)}{item.subject?.length > 82 && '...'}</span><img src={moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss') > now ? New : null} /><span>{moment(item.createdAt).format('YY.MM.DD')}</span>
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
                            totalItemsCount={boardLength} // 총 아이템 수
                            pageRangeDisplayed={5} // paginator의 페이지 범위
                            prevPageText={"‹"} // "이전"을 나타낼 텍스트
                            nextPageText={"›"} // "다음"을 나타낼 텍스트
                            onChange={(e)=>setPage(e,1)} // 페이지 변경을 핸들링하는 함수
                        />
                    }
                     <div className="write-btn" onClick={()=>setOpenSaver(true)}><span>Write</span></div>
                    </div>
                    {
                    selectedList.faqId !== '' && !openSaver ?
                    <div className="faq-setting-right" ref={detailRef}>
                        {selectedList.faqId}
                    </div>
                    :
                    selectedList.faqId === '' && openSaver 
                    ?
                    <div className="faq-setting-right" ref={openRef}>
                        <NewFaq onClose={()=>setOpenSaver(false)}/>
                    </div>
                    :
                    null
                    }
                   
            </div>

            <Zendesk />
            <Tab />
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
    .faq-left {
        width: ${props => (props.openRight ? '48%' : '100%')};
    }
    
`
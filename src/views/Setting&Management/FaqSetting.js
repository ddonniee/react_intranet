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
import NewCategory from "./NewFormat/NewCategory";
// Utils
import { generateRandomString,axiosInstance2, axiosInstance } from "../../utils/CommonFunction";
// hooks
import {useHorizontalScroll} from '../../hooks/useSideScroll'
// Icons 
import Plus from '../../assets/svgs/icon_plus.svg'
import Minus from '../../assets/svgs/icon_minus.svg';
import New from '../../assets/svgs/icon_new.svg'
import Like from '../../assets/svgs/icon_like.svg'
import Liked from '../../assets/svgs/icon_liked.svg'
import Dislike from '../../assets/svgs/icon_dislike.svg'
import Disliked from '../../assets/svgs/icon_disliked.svg'

import moment from "moment";
import EditFaq from "./NewFormat/EditFaq";
import Alert from "../../components/Alert";


function FaqSetting() {

    let auth = 1;
    const user = useContext(UserContext)
    let now = moment().subtract(24,'hours').format('YYYY-MM-DD HH:mm:ss');

    const [subsidiary, setSubsidiary ] = useState([
        {value:'LGEAI',label:'LGEAI'}, 
        {value:'LGECI',label:'LGECI'}, 
        {value:'LGEES',label:'LGEES'}, 
        {value:'LGEJP',label:'LGEJP'}, 
        {value:'LGEKR',label:'LGEKR'},
        {value:'LGEMC',label:'LGEMC'},
    ])
     /** 페이징 관련 ▼ ============================================================= */
     const [activePage, setActivePage] = useState(1); // 현재 페이지
     const [itemsPerPage] = useState(16); // 페이지당 아이템 갯수
 
     const setPage = (e) => {
         setActivePage(e);
         console.log('page ---->', e);
     };
     // acios header
     var config = {
        method: 'post',
        maxBodyLength: Infinity,
        headers: { 
           'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
        },
        };

    /** 외부클릭처리 ▼ ============================================================= */
    const editorRef = useRef(null);
    const detailRef = useRef(null);
    const categoryRef = useHorizontalScroll();
    const tabRef = useRef(null);
    const openRef = useRef(null)
    /** 외부클릭처리 ▲ ============================================================= */

    // const testValue = useContext(TestContext)
    const [categoryLists, setCategoryLists] = useState([])
    const [boardLength, setBoardLength] = useState(0)
    const [boardData, setBoardData] = useState([])

    // 글 작성/수정시  state 담기
    const [content, setContent] = useState({
        title : '',
        content : '',
        faqTopId : '',
        attachments : null,
        categoryId : '',
        categoryId : '',
        // subCategory : ''
    });

    // 게시판 글 중 선택된 항목
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
    /** Alert Handler */
    const [alertModal, setAlertModal] = useState(false)
    const [alertSetting, setAlertSetting] = useState({
        alertTxt : '',
        onConfirm : function() {},
        isDoubleBtn : false,
        btnTxt : 'Close',
        confirmTxt : '',
        onClose : () => setAlertModal(false)
    })
    useEffect(()=>{
        if(alertSetting.alertTxt!=='') {
            setAlertModal(true)
        }
    },[alertSetting.alertTxt])
    useEffect(()=>{
        if(!alertModal) {
            setAlertSetting({
                ...alertSetting,
                alertTxt : '',
                onConfirm : function() {},
                isDoubleBtn : false,
                btnTxt : 'Close',
                confirmTxt : '',
                onClose : () => setAlertModal(false)
            })
        }
    },[alertModal])
    // API 요청시 필요한 form 
    const [reqData, setReqData] = useState({
        page : activePage,
        categoryId: '',
        subsidiary: '',
        search : '',
        type : 'S',
    })
    const getList = () =>{

        const formData = new FormData();

        for (let key in reqData) {
            if (reqData.hasOwnProperty(key)) {
              formData.append(key, reqData[key]);
            }
        }
        axiosInstance2.post('/faq/list', formData,config)
        .then(function (response){
            let resData = response.data;
            if(resData.code===200) {
                let data = resData.result
                setBoardData(data.list)
            }else {
                console.log(resData)
            }
        })
        .catch(function(error) {
            console.log('error',error)
        })
    }
    
    const getCategory = () =>{

        axiosInstance('/faqCa/list', config)
        .then(function (response){
            let resData = response.data;
            if(resData.code===200) {
                let data = resData.result
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

    useEffect(()=>{
        console.log('categoryLists : ',categoryLists)
    },[categoryLists])
    
    const getDetail = (id) =>{

        const formData = new FormData();

        formData.append('faqId',id)

        axiosInstance2.post('/faq/detail',formData,config)
        .then(function (res){
            let resData = res.data;
            console.log('detail : ',res)
            if(resData.code===200) {
                let data = resData.result
                setSelectedList(data)
                setContent({
                    ...content,
                    title : data.subject,
                    content : data.content,
                    attachments : data.attachments,
                    categoryId : data.categoryId,
                })
            }else {
                console.log(resData)
            }
        })
        .catch(function(error) {
            console.log('error',error)
        })
    }

    const [openFaqCreator, setOpenFaqCreator] = useState(false)
    const [openCategory, setOpenCategory] = useState(false)
    const [isLower, setIsLower] = useState(false) // false - upper category, true - lower category

   
    const addNewItem = (num,id)=>{
        
        if(num===1) {
            setIsLower(false)
        }
        else if(num===2) {
            setIsLower(true)
        }
        setOpenCategory(true)
        setOpenFaqCreator(false)
        clearState(1)
    }
    const deleteItem = (depth) => {
        
        if(selectedCategory.categoryId==='') {
            return false
        }
        const formData = new FormData();
        if(depth==='category')  {
            formData.append('categoryId',selectedCategory.categoryId)
        }else if(depth==='sub-category') {
            formData.append('categoryId',selectedCategory.categoryId)
        }

        axiosInstance2.post('/faqCa/delete',formData,config)
        .then(function (res){
            let resData = res.data;
            console.log(resData,'dddd')
            if(resData.code===200) {
                getCategory();
            }else {
                console.log(resData)
            }
        })
        .catch(function(error) {
            console.log('error',error)
        })
    }

    const clearState =(num)=> {
        if(num===1) {
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
                hits: 0,
                createdAt: '',
                faqId: '',
                categoryId: '',
                writerID: ''
               })
               getList(); 
        }else if(num===2) {
            setSelectedCategory({
                categoryIconFileNM : '',
                categoryIconId: '' ,
                categoryIconPath: '',
                categoryId: '',
                categoryNm : '', 
                createdAt : '',
                iconModal :  false,
                parentCategoryId : '',
                rn : 0,
                subCategory :  []
            })
        }else if(num===3) {
            setContent({
                title:'',
                content:'',
                attachments: null,
                categoryId: ''
            })
            setOpenFaqCreator(false)
            getList()
        }
        
      }
    useEffect(()=>{
        if(!openCategory) {
            getCategory() 
        }else {
            setOpenFaqCreator(false)
            clearState(1)
        }
    },[openCategory, openFaqCreator])

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

    const [subCategory, setSubCategory] = useState([])
    const [selectedCategory, setSelectedCategory] = useState({
        categoryIconFileNM : '',
        categoryIconId: '' ,
        categoryIconPath: '',
        categoryId: '',
        categoryNm : '', 
        createdAt : '',
        iconModal :  false,
        parentCategoryId : '',
        rn : 0,
        subCategory :  []
    });
    const handleClickIcon = (e, selectedItem) => {
        
        if(selectedTab.categoryId!=='') {
            setSelectedTab({
                categoryIconFileNM : '',
                categoryIconId : '',
                categoryIconPath : '',
                categoryId : '',
                categoryNm : '',
                createdAt : '',
                parentCategoryId : '',
                parentCategoryNm : '',
            })
        }
        
        const subCategories = selectedItem.subCategory;
        setSubCategory(subCategories);
       
        if(selectedCategory.categoryId!==selectedItem.categoryId) {
            setSelectedCategory(selectedItem)
        }else {
            setSelectedCategory({
                categoryIconFileNM : '',
                categoryIconId: '' ,
                categoryIconPath: '',
                categoryId: '',
                categoryNm : '', 
                createdAt : '',
                iconModal :  false,
                parentCategoryId : '',
                rn : 0,
                subCategory :  []
            })
        }
      };

    const [selectedTab, setSelectedTab] = useState({
        categoryIconFileNM : '',
        categoryIconId : '',
        categoryIconPath : '',
        categoryId : '',
        categoryNm : '',
        createdAt : '',
        parentCategoryId : '',
        parentCategoryNm : '',
    })
    const handleClickTab=(item)=>{
        setReqData({...reqData, categoryId:item.categoryId})
        setSelectedTab(item)
    }
    const handleChangeInput=(e)=>{
        console.log('handleChangeInput',e)
    }
    const onConfirmHandler = (num,txt) =>{

        // leave editor 
        if(num===1) {
            setAlertSetting({
                ...alertSetting,
                alertTxt: ' Click confirm to leave write mode.',
                onConfirm : ()=>{ 
                    setAlertModal(false)
                },
                isDoubleBtn : true,
                confirmTxt : "Confirm"
            })
                   
        }
        // open post to public
        else if(num===2) {
            setAlertSetting({
                ...alertSetting,
                alertTxt: 'Are you sure to oepn this post to public?',
                // onConfirm : ()=>{ onChangePublic(); setAlertModal(false); clearState() },
                isDoubleBtn : true,
                btnTxt : 'Confirm',
                confirmTxt : "You've allowed all to show this post."
            })
            
        }
        // delete post
        else if(num===3) {
            setAlertSetting({
                ...alertSetting,
                alertTxt: 'Are you sure to delete post?',
                onConfirm :  ()=>{onDeletePost(); setAlertModal(false); clearState(); getList()},
                isDoubleBtn : true,
                btnTxt : 'Confirm',
                confirmTxt : "Deleted post."
            })
           
        }
        // delete category
        else if(num===4) {
            setAlertSetting({
                ...alertSetting,
                alertTxt : `Are you sure to delete icon for ${selectedCategory.categoryNm}?`,
                onConfirm : ()=>(deleteItem('category'), setAlertModal(false), clearState(2)),
                isDoubleBtn : true,
                btnTxt : 'Delete',
            })
        }
        // no input data when clicked submit
        else if(num===5) {
            setAlertSetting({
                ...alertSetting,
                alertTxt: 'Any content input',
                onConfirm :  ()=>setAlertModal(false),
                isDoubleBtn : false,
                btnTxt : 'Close',
            })
        }
        // success alert 
        else if(num===6) {
            setAlertSetting({
                ...alertSetting,
                alertTxt: 'Success',
                onClose :  ()=>{setAlertModal(false); clearState(1)},
                isDoubleBtn : false,
                btnTxt : 'Close',
            })
        }else if(num===7) {
            setAlertSetting({
                ...alertSetting,
                alertTxt: txt,
                onConfirm :  ()=>{setAlertModal(false);},
                isDoubleBtn : false,
                btnTxt : 'Close',
            })
            clearState(1)
        }else if(num===8) {
            setAlertSetting({
                ...alertSetting,
                alertTxt : `Are you sure to delete icon for ${selectedTab.categoryNm}?`,
                onConfirm : ()=>(deleteItem('sub-category'), setAlertModal(false), clearState(2)),
                isDoubleBtn : true,
                btnTxt : 'Delete',
            })
            clearState(1)
        }
    }

    const onSaveContent = (mode) => {

        if (!content?.title || !content?.content) { // required check
            onConfirmHandler(1)
            return false;

        } else {

            const formData = new FormData();
            const url = mode==='edit' ? '/faq/update' : '/faq/insert'
            for (let key in content) {
                if (content.hasOwnProperty(key)) {
                    formData.append(key, content[key]);
                }
            }
           
            if(mode==='edit') {
                formData.append('faqId',selectedList.faqId)
            }
            // faq 등록/수정faqTopId
            axiosInstance2.post(url, formData,config).then(res => {
                let resData = res.data;
                if(resData.code == 200) {
                    clearState(3)
                } else {
                    onConfirmHandler(7,resData.msg)
                }
            }).catch(error => {
                console.log('error', error)
            })  
        }
    }

    const onDeletePost = () => {

        const formData = new FormData();
        
        formData.append('faqId',selectedList.faqId)
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            headers: { 
               'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
            },
            data : formData
            };
        axiosInstance2('/faq/delete', config)
        .then(function (response){
            let resData = response.data;
            if(resData.code===200) {
                setAlertSetting({
                    ...alertSetting,
                    alertTxt : "You've Deleted post.",
                    isDoubleBtn : false,
                    btnTxt : 'Close',
                })
                setBoardLength(boardLength-1)
                clearState(1)
            }else {
                console.log(resData)
            }
        })
        .catch(function(error) {
            console.log('error',error)
        })
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
      },[reqData])

      useEffect(()=>{
        setReqData({
            ...reqData,
            page:activePage
        })
      },[activePage])
    useEffect(()=>{
        if(selectedList.faqId!=='' && openFaqCreator) {
            setOpenFaqCreator(false)
        }
    },[selectedList])

    const [openRight, setOpenRight] = useState(false);

      useEffect(()=>{
        if(selectedList.faqId!=='' || openCategory || openFaqCreator) {
            setOpenRight(true)
        }else {
            setOpenRight(false)
        }
      },[selectedList.faqId,openCategory,openFaqCreator ])

    
    useEffect(()=>{
        if(openFaqCreator && selectedList.faqId !=='') {
            clearState(1)
        }
    },[openFaqCreator])

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
        <Style selectid={selectedList.faqId} openright={(openRight || openFaqCreator || openCategory )? 1 : 0}>
        <div className="inner-container">
        <Top searchArea={true} auth={ auth=== 1 ? true : false} options={subsidiary} handleChange={handleSelectBox} onChange={(e)=>setReqData({...reqData, search:e.target.value})} onClick={getList}/>
            {/** Top Area */}
            <div className="faq-setting" >
                <div className="faq-category custom-flex-item custom-justify-between">
                    <ul className="faq-category-lists"  ref={categoryRef}>
                    {
                    categoryLists?.map((list, idx) => {
                        if (list.parentCategoryId === null) {
                        return (
                            <li key={generateRandomString(idx + 1)} onClick={(e) => handleClickIcon(e, list)} className={`cursor-btn ${selectedCategory.categoryId===list.categoryId && `hover-selected`}`}>
                            <div className="faq-img-wrapper"><img src={process.env.REACT_APP_DOWN_URL+'/' + list.categoryIconPath} alt='category-icon' /></div>
                            <p>{list.categoryNm}</p> </li>
                        );
                        }
                        return null;
                    })
                    }

                    </ul>
                    <div></div>
                    <div className="buttons">
                        <button className={selectedCategory.categoryId==='' && 'custom-invalid-btn'} onClick={()=>selectedCategory.categoryIconId!==''&&onConfirmHandler(4)}><img src={Minus} alt='icon_less_btn' /></button>
                        <button onClick={()=>{addNewItem(1,selectedList.faqId)}}><img src={Plus} alt='icon_more_btn'/></button>
                    </div>
                </div>
            </div>
            
            {/** Content Area */}
            <div className="faq-contents">
                <div className="faq-left" ref={editorRef}>

                    <div className="faq-setting-tab custom-flex-item custom-justify-between" ref={tabRef}>
                    <div >
                        <ul className="custom-flex-item">
                            {
                                subCategory?.length !== 0 &&  subCategory.map((item,idx)=>{
                                    return(
                                        <li className={`custom-flex-item custom-align-item custom-justify-center cursor-btn ${reqData.categoryId===item.categoryId && `red-selected`}`} onClick={()=>handleClickTab(item)} key={generateRandomString(idx)}>{item.categoryNm}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="buttons">
                        <button className={` ${subCategory.length===0 && 'custom-invalid-btn'}`}><img src={Minus} alt='icon_less_btn' onClick={()=>onConfirmHandler(8)}/></button>
                        <button className={` ${selectedCategory.categoryId==='' && 'custom-invalid-btn'}`} onClick={()=>{addNewItem(2,selectedList.faqId)}}><img src={Plus} alt='icon_more_btn'/></button>
                    </div>
                </div>

                <div className="custom-scroll-area">
                    <ul className="board-table custom-align-item custom-flex-item">
                        <li className="col-1">No.</li>
                        <li className={`col-2 ${openRight && 'custom-hide-item'}`}>Category</li>
                        <li className="col-3">Title</li>
                        <li className={`col-4 ${openRight && 'custom-hide-item'}`}>Writer</li>
                        <li className={`col-5 ${openRight && 'custom-hide-item'}`}>Recommand</li>
                        <li className="col-6">Count</li>
                        <li className="col-7">Date</li>
                    </ul>
                        {
                            boardData && boardData.length > 0 && boardData.map((item,idx)=>{
                                return(
                                   <div className="board-list custom-flex-item custom-align-item cursor-btn" key={generateRandomString(idx)} onClick={(e)=>handleClickRow(e,item)} >
                                        <ul className="col-1">
                                            <li  id={`list-item-${idx+1}`}>
                                                <span>{String((activePage-1)*16+(idx+1)).padStart(3, '0')}</span>
                                            </li>
                                        </ul>
                                        <ul className={`col-2 ${openRight && 'custom-hide-item'}`}>
                                            <li  id={`list-item-${idx+1}`}>
                                                <span>{item.categoryTree?.slice(0,15)} {item?.categoryTree?.length>10 && '....'}</span>
                                            </li>
                                        </ul>
                                        <ul className="col-3" >
                                            <li id={`list-item-${idx+1}`}>
                                                <span className="board-max-length">{!openRight ? item?.subject.slice(0,82) : item?.subject.slice(0,60)}{!openRight ? item.subject?.length > 82 && '...' : item.subject?.length >60 && '...'}</span><img src={moment(item?.createdAt).format('YYYY-MM-DD HH:mm:ss') > now ? New : null} />
                                                 <div className={`small-detail custom-flex-item ${!openRight ? 'custom-hide-item' : ''}`}>
                                                 <span>{item?.writerName}</span>
                                                    <img src={Like} alt="like-img"/><span className="custom-self-align">{item?.likeCount}</span>
                                                 </div>
                                                    
                                            </li>
                                        </ul>
                                        <ul className={`col-4 ${openRight && 'custom-hide-item'}`}>
                                            <li  id={`list-item-${idx+1}`}>
                                                <span>{item?.writerName?.slice(0,10)}{item?.writerName.length >= 10 && '...'}</span>
                                            </li>
                                        </ul>
                                        <ul className={`col-5 ${openRight && 'custom-hide-item'}`}>
                                            <li  id={`list-item-${idx+1}`}>
                                                <img src={Like} alt="like-img"/><span>{item?.likeCount}</span>
                                            </li>
                                        </ul>
                                        <ul className="col-6">
                                            <li  id={`list-item-${idx+1}`}>
                                                <span>{item?.hits}</span>
                                            </li>
                                        </ul>
                                        <ul className="col-7">
                                            <li  id={`list-item-${idx+1}`}>
                                                <span>{moment(item?.createdAt).format('YYYY-MM-DD')}</span>
                                            </li>
                                        </ul>
                                   </div>
                                )
                            })
                        }
                </div>
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
                     <div className="write-btn" onClick={()=>openFaqCreator ? setOpenFaqCreator(false) : setOpenFaqCreator(true)}><span>Write</span></div>
                    </div>
                    {
                    selectedList.faqId !== '' && !openFaqCreator ?
                    <div className="faq-setting-right" ref={detailRef}>
                        <EditFaq data={content} setData={setContent} key={selectedList.faqId} onSave={()=>onSaveContent('edit')} onClose={()=>clearState(1)} onDelete={()=>onConfirmHandler(3)}/>
                    </div>
                    :
                    selectedList.faqId === '' && openFaqCreator 
                    ?
                    <div className="faq-setting-right" ref={openRef}>
                        <NewFaq data={content} setData={setContent} onClose={()=>setOpenFaqCreator(false)} onSave={()=>onSaveContent('save')}/>
                    </div>
                    :
                    openCategory 
                    ?
                    <div className="faq-setting-right" ref={openRef}>
                        <NewCategory item={selectedTab} parentCategory={selectedCategory} data={content} setData={setContent} onSave={()=>console.log('e')} onClose={()=>setOpenCategory(false)} isLower/>
                    </div>
                    :
                    null
                    }
                   
            </div>
            {
                alertModal &&
                <Alert alertTxt={alertSetting.alertTxt} onConfirm={alertSetting.onConfirm} twoBtn={alertSetting.isDoubleBtn} btnTxt={alertSetting.btnTxt} onClose={()=>alertSetting.onClose()} />
            }
            <Zendesk />
            <Tab />
        </div>
        </Style>
        </>
    )
}
export default FaqSetting

const Style = styled.div`
    #list-item-${props=>props.selectid} {
        background : #FAF1F4; color : #BB0841; 
    }
    .faq-left {
        width: ${props => (props.openright ? '49%' : '100%')};
    }
    .col-1 {
        width: 75px;
    }
    .col-2 {
        min-width: 160px;
    }
    .col-3 {
        width: 734px; 
    }
    .col-4 {
        width: 194px;
    }
    .col-5 {
        width: 122px;
    }
    .col-6 {
        width: 115px;
    }
    .col-7 {
        width: 160px;
    }
    .board-list {
        padding : ${props => (props.openright ? '17px 30px;':'10px 30px;')}
        max-height :  ${props => (props.openright ? '64px;':'42px;')}
        height :  ${props => (props.openright ? '64px;':'42px;')}
    }
    
`
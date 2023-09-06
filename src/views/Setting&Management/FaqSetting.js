// import { useState } from "react"

// import ExportExcel from "../../utils/ExportExcel"


import { useContext, useEffect, useRef, useState } from "react"
import { styled } from "styled-components";

import { UserContext } from "../../hooks/UserContext"
import Pagination from "react-js-pagination";
// Components
import Loading from "../../components/Loading"
import Top from "../../components/Top"
import Tab from "../../components/Tab";
import NewFaq from "./NewFormat/NewFaq";
import NewCategory from "./NewFormat/NewCategory";
// Utils
import { generateRandomString,axiosInstance2, axiosInstance, fetchInstance } from "../../utils/CommonFunction";
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
        subCategoryId : ''
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

    const [isFetching, setIsFetching] = useState(false);

    const getList = () =>{
        const formData = new FormData();

        for (let key in reqData) {
            if (reqData.hasOwnProperty(key)) {
              formData.append(key, reqData[key]);
            }
        }
        config.data = formData
        setIsFetching(true)
        fetchInstance('/faqData')
        .then(function (response) {
            if(response) {
                if(reqData.categoryId!=='') {
                    const filteredResponse = response.filter(item => item.categoryId === reqData.categoryId);
                    setBoardData(filteredResponse);
                }else
                setBoardData(response);
               setIsFetching(false)
            }else {
                setIsFetching(false)
                setAlertSetting({
                    ...alertSetting,
                    alertTxt: "Client Error"
                })
            }
       
        })
        .catch(function (error) {
        console.log('error', error);
        }); 
    }
    
    const getCategory = () =>{

        fetchInstance('/faqCategory')
        .then(function (response){
            if(response) {
                setCategoryLists(response)
            }else {
                setAlertSetting({
                    ...alertSetting,
                    alertTxt:'Client Error'
                })
            }
        })
        .catch(function(error) {
            console.log('error',error)
            setAlertSetting({
                ...alertSetting,
                alertTxt:'Server Error'
            })
        })
    }

 
    const getDetail = (id) =>{

        const formData = new FormData();

        formData.append('faqId',id)

        fetchInstance('/faqDetail', config)
        .then(function (response){
            for(let i=0; i<response.length; i++) {
                if(id===response[i].faqId) {
                    console.log(response,id)
                    setSelectedList(response[i])
                    setContent({
                        ...content,
                        title : response[i].subject,
                        content : response[i].content,
                        attachments : response[i].attachments,
                        categoryId : response[i].categoryId,
                    })
                }
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
        clearState('all')
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

    const clearState =(sorting)=> {
        /**
         * sorting : 정렬기준
         * all : 상세보기로 선택된 항목 초기화, 전체 리스트 불러오기
         * category : 선택된 카테고리해제
         * editor : 에디터 작성모드 초기화
         */
        if(sorting==='all') {
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
        }
        else if(sorting==='category') {
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
        }else if(sorting==='editor') {
            setContent({
                title:'',
                content:'',
                attachments: null,
                categoryId: '',
                subCategoryId : ''
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
            clearState('all')
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
        if(openRight) {
            clearState('all')
        }
        if(reqData.categoryId===selectedItem.categoryId) {
            setReqData({
                ...reqData,
                categoryId : '',
                search: ''
            })
        }else {
            setReqData({
                ...reqData,
                categoryId : selectedItem.categoryId
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
    const onConfirmHandler = (sorting,txt) =>{
        /**
         * sorting : 확인이 필요한 모드
         * editor : 에디터창 닫기
         * open : 공개상태 바꾸기 
         * del-post : 글 삭제확인
         * del-category : 카테고리 삭제확인
         * no-input : input data 없음
         */
        if(sorting==='editor') {
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
        else if(sorting==='open') {
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
        else if(sorting==='del-post') {
            setAlertSetting({
                ...alertSetting,
                alertTxt: 'Are you sure to delete post?',
                onConfirm :  ()=>{onDeletePost(); setAlertModal(false); clearState('all'); getList()},
                isDoubleBtn : true,
                btnTxt : 'Confirm',
                confirmTxt : "Deleted post."
            })
           
        }
        // delete category
        else if(sorting==='del-category') {
            setAlertSetting({
                ...alertSetting,
                alertTxt : `Are you sure to delete icon for ${selectedCategory.categoryNm}?`,
                onConfirm : ()=>(deleteItem('category'), setAlertModal(false), clearState('category')),
                isDoubleBtn : true,
                btnTxt : 'Delete',
            })
        }
        // no input data when clicked submit
        // else if(sorting==='no-input') {
        //     setAlertSetting({
        //         ...alertSetting,
        //         alertTxt: 'Any content input',
        //         onConfirm :  ()=>setAlertModal(false),
        //         isDoubleBtn : false,
        //         btnTxt : 'Close',
        //     })
        // }
        // success alert 
        // else if(num===6) {
        //     setAlertSetting({
        //         ...alertSetting,
        //         alertTxt: 'Success',
        //         onClose :  ()=>{setAlertModal(false); clearState('all')},
        //         isDoubleBtn : false,
        //         btnTxt : 'Close',
        //     })
        // }else if(num===7) {
        //     setAlertSetting({
        //         ...alertSetting,
        //         alertTxt: txt,
        //         onConfirm :  ()=>{setAlertModal(false);},
        //         isDoubleBtn : false,
        //         btnTxt : 'Close',
        //     })
        //     clearState('all')
        // }else if(num===8) {
        //     setAlertSetting({
        //         ...alertSetting,
        //         alertTxt : `Are you sure to delete icon for ${selectedTab.categoryNm}?`,
        //         onConfirm : ()=>(deleteItem('sub-category'), setAlertModal(false), clearState('category')),
        //         isDoubleBtn : true,
        //         btnTxt : 'Delete',
        //     })
        //     clearState('all')
        // }
    }

    const onSaveContent = (mode) => {

        if (!content?.title || !content?.content) { // required check
            onConfirmHandler('editor')
            return false;

        } else {

            const formData = new FormData();
            // const url = mode==='edit' ? '/faq/update' : '/faq/insert'
            const url = mode = '/faqData'
            for (let key in content) {
                if (content.hasOwnProperty(key)) {
                    key!=='subCategoryId' && formData.append(key, content[key]);
                }
                formData.append("id",content[key])
            }
        
           console.log(Object.fromEntries(formData))
            if(mode==='edit') {
                formData.append('faqId',selectedList.faqId)
            }
            if(content.subCategoryId !== '') {
                formData.set('categoryId',content.subCategoryId)
            }
            if(content.top5ListId==='') {
                formData.set('faqTopId',null)
            }
            fetchInstance(url,formData).then(response=>{
                console.log(response)
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
                clearState('all')
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
    // page, category클릭시 리스트 재호출
    useEffect(()=>{
        getList()
    },[reqData.page, reqData.categoryId])

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
            clearState('all')
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
        <Style selectid={selectedList.faqId} openright={(openRight || openFaqCreator || openCategory )? 1 : 0}>
        <div className="inner-container">
        <Top searchArea={true} auth={ auth=== 1 ? true : false} options={subsidiary} handleChange={handleSelectBox} onChange={(e)=>setReqData({...reqData, search:e.target.value})} onClick={getList}/>
            {/** Top Area */}
            <div className="faq-setting" >
                <div className="faq-category custom-flex-item custom-justify-between">
                    <ul className="faq-category-lists"  ref={categoryRef}>
                    {
                    categoryLists?.map((list, idx) => {
                        return (
                            <li key={generateRandomString(idx + 1)} onClick={(e) => handleClickIcon(e, list)} className={`cursor-btn ${reqData.categoryId===list.categoryId && `hover-selected`}`}>
                            <div className="faq-img-wrapper"><img src={list.categoryIconPath} alt='category-icon' /></div>
                            <p>{list.categoryNm}</p> </li>
                        );
                    })
                    }

                    </ul>
                    <div></div>
                    <div className="buttons">
                        <button className={selectedCategory.categoryId==='' && 'custom-invalid-btn'} onClick={()=>selectedCategory.categoryIconId!==''&&onConfirmHandler('del-category')}><img src={Minus} alt='icon_less_btn' /></button>
                        <button onClick={()=>{addNewItem(1,selectedList.faqId)}}><img src={Plus} alt='icon_more_btn'/></button>
                    </div>
                </div>
            </div>
            
            {/** Content Area */}
            <div className="faq-contents">
                <div className="faq-left" ref={editorRef}>

                <div>
                    <ul className="board-table custom-align-item custom-flex-item custom-sticky-area">
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
                                                <span>{String(item.rn).padStart(3, '0')}</span>
                                            </li>
                                        </ul>
                                        <ul className={`col-2 ${openRight && 'custom-hide-item'}`}>
                                            <li  id={`list-item-${idx+1}`}>
                                                <span>{item.categoryTree?.slice(0,15)} {item?.categoryTree?.length>10 && '....'}</span>
                                            </li>
                                        </ul>
                                        <ul className="col-3" >
                                            <li id={`list-item-${idx+1}`}>
                                                <span className="board-max-length">
                                                    {!openRight ? item?.subject.slice(0,82) : item?.subject.slice(0,60)}
                                                    {!openRight ? item.subject?.length > 82 && '...' : item.subject?.length >60 && '...'}
                                                </span>
                                                <img src={moment(item?.createdAt).format('YYYY-MM-DD HH:mm:ss') > now ? New : null} />
                                                {
                                                    (item.top5ListId !== null && item.top5ListId !== '')
                                                    &&
                                                    <span className="custom-stress-txt">{item.top5ListId}</span>
                                                }
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
                                                <span>{moment(item?.createdAt).format('MM.DD.YY')}</span>
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
                        <EditFaq data={content} detail={selectedList} setData={setContent} key={selectedList.faqId} onSave={()=>onSaveContent('edit')} onClose={()=>clearState('all')} onDelete={()=>onConfirmHandler('del-post')}/>
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
                        <NewCategory item={selectedTab} parentCategory={selectedCategory} data={content} setData={setContent} onSave={()=>console.log('e')} onClose={()=>(setOpenCategory(false), setIsLower(false))} isLower={isLower}/>
                    </div>
                    :
                    null
                    }
                   
            </div>
            {
                alertModal &&
                <Alert alertTxt={alertSetting.alertTxt} onConfirm={alertSetting.onConfirm} twoBtn={alertSetting.isDoubleBtn} btnTxt={alertSetting.btnTxt} onClose={()=>alertSetting.onClose()} />
            }
            {
                isFetching &&
                <Loading />
            }
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
        width: ${props => (props.openright ? '10%' : '5%')};
    }
    .col-2 {
        width: 10%;
    }
    .col-3 {
        width :${props => (props.openright ? '60%' : '50%')};
    }
    .col-4 {
        width: 10%;
    }
    .col-5 {
        width: 10%;
    }
    .col-6 {
        width: ${props => (props.openright ? '15%' : '5%')};
    }
    .col-7 {
        width: ${props => (props.openright ? '15%' : '10%')};
    }
    .board-list {
        padding : ${props => (props.openright ? '17px 30px;':'10px 30px;')}
        max-height :  ${props => (props.openright ? '64px;':'42px;')}
        height :  ${props => (props.openright ? '64px;':'42px;')}
    }
    
`
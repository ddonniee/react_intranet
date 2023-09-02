import React,{ Fragment, useContext, useEffect, useRef, useState } from "react"
import { styled } from "styled-components";

import { UserContext } from "../../hooks/UserContext"
import Pagination from "react-js-pagination";
// Components
import Header from "../../components/Header"
import Top from "../../components/Top"
import Warning from "../../components/Warning"
import Viewer from "../../components/Viewer"
import Alert from "../../components/Alert";
import Tab from "../../components/Tab";
// Utils
import { generateRandomString,fetchInstance, downloadAttachment,} from "../../utils/CommonFunction"
// hooks
import { useHorizontalScroll } from "../../hooks/useSideScroll";
// View
import MaximalView from "../Common/MaximalView";
// Icons 
import Polygon from '../../assets/svgs/icon_polygon.svg'
import New from '../../assets/svgs/icon_new.svg'
import Attachment from '../../assets/svgs/icon_attachment.svg';
import Download from '../../assets/svgs/icon_download.svg'
import Like from '../../assets/svgs/icon_like.svg'
import Liked from '../../assets/svgs/icon_liked.svg'
import Dislike from '../../assets/svgs/icon_dislike.svg'
import Disliked from '../../assets/svgs/icon_disliked.svg'
import Comment from '../../assets/svgs/icon_co_comment.svg'
import More_comment from '../../assets/svgs/icon_co_more.svg'
import Close_comment from '../../assets/svgs/icon_co_close.svg'
import Close from '../../assets/svgs/icon_close2.svg'
import Maximize from '../../assets/svgs/icon_screen.svg'

import moment from "moment";

function Faq() {

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
    // 하위 tab
    const [faqTab, setFaqTab] = useState([]) 
    const [selectedCategory,setSelectedCategory] = useState()
     /** 페이징 관련 ▼ ============================================================= */
     const [activePage, setActivePage] = useState(1); // 현재 페이지
     const [itemsPerPage] = useState(16); // 페이지당 아이템 갯수
     const setPage = (e,num) => {
        if(num===1) {
            setActivePage(e);
        }else {
            setCommentPage(e)
        }
     };
    /** 페이징 관련 ▲ ============================================================= */

    const [boardLength, setBoardLength] = useState(0)
    const [boardData, setBoardData] = useState([])
    const [frequentList, setFrequentList] = useState([])
    const [isFrequent, setIsFrequent] = useState(false)
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
        hits: 0,
        createdAt: '',
        faqId: '',
        categoryId: '',
        writerID: ''
    })
    const [openRight, setOpenRight] = useState(false);       // 상세페이지, 작성페이지 open 관리 state
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

    /** 공통 요청폼 ▼ ============================================================= */
    const [reqData, setReqData] = useState({
        categoryId: '',
        subsidiary: '',
        search : '',
        type : 'F',
        page : activePage, // page 전달
        tab : '',
    })
    // 공통헤더
    var config = {
        method: 'GET',
        maxBodyLength: Infinity,
        headers: { 
        //    'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
        // 'Content-Type': 'multipart/form-data'
        },
        data : null
    };

    /** 공통 요청폼 ▲ ============================================================= */

    const onClickAction = (e,id,reaction) => {
        const formData = new FormData();

        let yourReaction = reaction==='LIKE' ? 'likeCount' : 'dislikeCount'
        let oppositeReaction = reaction === 'LIKE' ? 'dislikeCount' : 'likeCount'

        formData.append('faqId', id);
        formData.append('reaction',reaction )

        config.data = formData
        fetchInstance('/faqData', config)
        .then(function (response){
            let resData = response.data;
            if(resData) {
                let data = resData.result
                setSelectedList({
                    ...selectedList,
                    reactionState : selectedList.reactionState === reaction ? "NONE" : reaction,
                    [yourReaction] : selectedList.reactionState === reaction ? selectedList[yourReaction]-1
                                   : selectedList[yourReaction]+1 ,
                    [oppositeReaction] : (selectedList.reactionState !== 'NONE' && selectedList.reactionState !== reaction) 
                                        ? selectedList[oppositeReaction]-1 
                                        : selectedList[oppositeReaction]
                                        
                })
            }else {
                console.log(resData)
            }
        })
        .catch(function(error) {
            console.log('error',error)
        })
    }


    const handleSelectBox = e => {
        let value = e.value;
        setReqData({
            ...reqData,
            subsidiary : value
        })
    }

    const handleClickRow = (e,item) => {
        console.log('handleCLick',item.faqId)
        getDetail(item.faqId)
      
    }

    /** 알림창 ▼ ============================================================= */

    const [alertModal, setAlertModal] = useState(false)
    const [alertSetting, setAlertSetting] = useState({
        alertTxt : '',
        onConfirm : function() {},
        isDoubleBtn : false,
        btnTxt : 'Close',
        confirmTxt : ''
    })

    /** 알림창 ▲ ============================================================= */

    const onConfirmHandler = (num,id) =>{

        // leave editor 
        if(num===1 || num===7) {
            setAlertSetting({
                ...alertSetting,
                alertTxt: ' Click confirm to leave write mode.',
                onConfirm : ()=>{ setAlertModal(false)},
                isDoubleBtn : true,
                btnTxt : 'Confirm',
                confirmTxt : ""
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
                // onConfirm :  ()=>{onDeletePost(); setAlertModal(false); clearState(); getList()},
                isDoubleBtn : true,
                btnTxt : 'Confirm',
                confirmTxt : "Deleted post."
            })
           
        }
        // delete comment
        else if(num===4) {
            setAlertSetting({
                ...alertSetting,
                alertTxt: 'Are you sure to delete comment?',
                onConfirm :  ()=>{onDeleteComment(id); setAlertModal(false); },
                isDoubleBtn : true,
                btnTxt : 'Confirm',
                confirmTxt : "Deleted comment."
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
                onConfirm :  ()=>{setAlertModal(false);},
                isDoubleBtn : false,
                btnTxt : 'Close',
            })
        }
    }

    

    const handleClickTab=(item,iconList)=>{
        console.log('handleClickTab',item)
        setReqData({...reqData, categoryId:item.categoryId})
        let copy = [
            {
                categoryId:'',
                categoryNm:'All'
            }
        ];
        copy = copy.concat(item)
        setFaqTab(copy)
    }


    const getList = () =>{


        if(reqData.search!=='') {
            const updatedData = boardData.filter(item => {
                if (item.subject.includes(reqData.search)) {
                  return item
                } 
              });
              console.log(updatedData);
              setBoardData(updatedData)
              
            return false
        }
        fetchInstance('/faqData')
        .then(function (response) {
        if(response) {
            let resData = response.data;
            setBoardData(response);
            if (resData) {
                let data = resData.result;
                setFrequentList(data.top5list);
            } else {
                console.log(resData);
            }
        }else {
            setAlertSetting({
                ...alertSetting,
                alertTxt: "Client Error"
            })
        }
        })
        .catch(function (error) {
            console.log('error', error);
            setAlertSetting({
                ...alertSetting,
                alertTxt: "Server Error"
            })
        }); 
    }

    const getDetail = (id) =>{

        const formData = new FormData();

        formData.append('faqId',id)
        console.log(boardData)
       
        
        fetchInstance('/faqDetail')
        .then(function (response){
            for(let i=0; i<response.length; i++) {
                if(id===response[i].faqId) {
                    console.log(response,id)
                    setSelectedList(response[i])
                }
            }
            // if(resData.code===200) {
            //     let data = resData.result
            //     setSelectedList(data)
            // }else {
            //     console.log(resData)
            // }
        })
        .catch(function(error) {
            console.log('error',error)
        })
    }

    const [categoryLists, setCategoryLists] = useState([])
    const getCategory = () =>{
     
        // fetchInstance('/faqCa/list', config)
        // .then(function (response){
        //     let resData = response.data;
        //     if(resData.code===200) {
        //         let data = resData.result
        //         console.log('getCategory',resData)
        //         data.map(d=>{
        //             d.iconModal = false
        //         })
        //         setCategoryLists(data)
        //     }else {
        //         console.log(resData)
        //     }
        // })
        // .catch(function(error) {
        //     console.log('error',error)
        // })
    }

    console.log(selectedList)

    /** Comment handling */
    const [commentPage, setCommentPage] = useState(1)
    const [commentList, setCommentList] = useState([]);
    const [comment, setComment] = useState('')
    const [subComment, setSubComment] = useState('');

    const getComment =() =>{
        const formData = new FormData();
        
        formData.append('page', commentPage);
        formData.append('faqId', selectedList.faqId);

        // config.data = formData

        if(selectedList.faqId==='') {
            return false
        }
        fetchInstance('/faqComment')
        .then(function (response){
            if(response) {
                let data = [];
                for (let i = 0; i < response.length; i++) {
                    if (response[i].faqId === selectedList.faqId) {
                      data = response[i].commentList;
                      break; 
                    }
                  }
                if(data) {
                    data.map(d=>{
                        d.openSubComment = false
                        d.isInput = false
                    }
                    )
                    setCommentList(data)
                }
            }else {
                setAlertSetting({
                    ...alertSetting,
                    alertTxt: "Client Error"
                   })
            }
        })
        .catch(function(error) {
           console.log(error)
           setAlertSetting({
            ...alertSetting,
            alertTxt: "Server Error"
           })
        })
    }
    const openCommentInput = (idx) =>{
        console.log('openCommentInput')
        let copylist = [...commentList];
        for(let i=0; i<copylist.length; i++) {
            copylist[i].isInput = false;
        }
        copylist[idx].isInput = !copylist[idx].isInput
        setCommentList(copylist)
    }
    const openSubcomment = (e,idx,id) =>{
        let copyList = [...commentList]
        copyList[idx].openSubComment = !copyList[idx].openSubComment
        setCommentList(copyList)
    }
    const onAddComment =(num, id) => {
    // num = 1 댓글, num = 2 대댓글
    if(num===1 && comment==='') {
        onConfirmHandler(5)
        return false
    }
    else if(num===2 &&subComment==='') {
        onConfirmHandler(5)
        return false
    }

    let newObj = {};

    newObj.faqId =id;
    if(num===1) {
        newObj.commentList = [
            {
                commentId: 'new_comment_id', // 새 댓글의 고유 ID
                writerID: user.id,   // 작성자 ID
                writerName: user.name, // 작성자 이름
                createdAt: moment().format('YYYY.MM.DD HH:mm:ss'), // 작성 시간
                content: comment, // 댓글 내용
                subComment: [], 
            }
        ];
    }
    if(num===2) {
        newObj.commentId = id;
        newObj.content = subComment;
    }
    console.log(newObj)
        var config = {
            method: 'post',
            headers: { 
                "Content-Type": "application/json"
                // 'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
            },
            body: JSON.stringify(newObj)
            };

        fetchInstance('/faqComment', config)
        .then(function (response){
            if(response) {
                // onConfirmHandler(6)
                num === 1 ? setComment('') : setSubComment('')
                getDetail(id);
                getComment()
                
            }else {
                console.log(response,'comment list')
            }
        })
        .catch(function(error) {
            console.log('error',error)
        })  
    }
    const onDeleteComment = (id) =>{
        // num = 1 댓글, num = 2 대댓글
        const formData = new FormData();

        formData.append('commentId', id);
        
        config.data=formData
        // fetchInstance('/faq/commentDelete', config)
        // .then(function (response){
        //     let resData = response.data;
        //     if(resData.code===200) {
        //         setAlertSetting({
        //             ...alertSetting,
        //             alertTxt : "You've deleted comment.",
        //             isDoubleBtn : false,
        //             btnTxt : 'Close',
        //         })
        //         getDetail(selectedList.faqId);
        //         getComment()
        //         getList()
        //     }else {
        //         console.log(resData,'resData')
        //     }
        // })
        // .catch(function(error) {
        //     console.log('error',error)
        // })                  
    }
    const [maximizing, setMaxmizing] = useState(false)
    /** Icon list */
    const iconRef = useRef();
    
    const IconModal = ({items, position, onMouseLeave, isSubCategory}) =>{
        let {x, y} = position;
        let  iconList = [];
        if(items?.length!==0) {
            iconList = items;
        }
        x = x - 60

        return (
            <div className='icon-modal' ref={iconRef} style={{top:y, left:x}}>
                <img src={Polygon} alt='polygon' />
                <ul className={!isSubCategory ? 'no-list':''}>
                    {
                        iconList.length!==0
                        ?
                        iconList.map((item,idx)=>{
                            return(
                                <li className='custom-hover' id={`icon-list-${idx+1}`} key={generateRandomString(idx+3)} onClick={()=>handleClickTab(item,iconList)} onMouseLeave={onMouseLeave}>{item.categoryNm}</li>
                            )
                        })
                        :
                        <div className="custom-flex-item custom-align-item custom-justify-center">No subcategory</div>
                    }
                </ul>
            </div>
        )
    }
    
    const [hoveredItemPosition, setHoveredItemPosition] = useState(null);

    const handleMouseEnter = (e,item) => {
        const rect = e.target.getBoundingClientRect();
        console.log(categoryRef.current.getBoundingClientRect())
        setHoveredItemPosition({ x: rect.left });
        setCategoryLists((prevLists) => {
            
            const updatedLists = prevLists.map((list) => {
              if (list.categoryId === item.categoryId) {
                return { ...list, iconModal: true };
              } else {
                return { ...list, iconModal: false };
              }
            });
            return updatedLists;
          });
          
    }

    const handleMouseLeave = (e,item) => {
        if(item?.categoryId===undefined) {
            return false
        }
        setHoveredItemPosition(null);
        setCategoryLists((prevLists) => {
            
           
            const updatedLists = prevLists.map((list) => {
              if (list.categoryId === item.categoryId) {
                return { ...list, iconModal: false };
              } else {
                return { ...list, iconModal: false };
              }
            });
            return updatedLists;
          });
      };

    useEffect(()=>{
        setReqData({
            ...reqData,
            page: activePage
        })
    },[activePage])
    /** mouse scroll */
    const categoryRef = useHorizontalScroll();
    /** detail loading animation */
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingComment, setIsLoadingComment] = useState(false)
    
    const [fileStore, setFileStore] = useState([])

     useEffect(()=>{

        setFileStore([])
        if(selectedList.attachments!=='' && selectedList.attachments!==undefined) {
          
            const jsonString = JSON.parse(selectedList.attachments);
            if(jsonString!==null) {
                let copy = [...jsonString]
                setFileStore(copy)
            }
        }
        if(selectedList) {
            getComment();
            setIsLoading(true)
            setCommentPage(1)
            const timeoutId = setTimeout(() => {
                setIsLoading(false);
              }, 500); // 3초 후에 isVisible 값을 false로 변경
          
              return () => clearTimeout(timeoutId)
        }
    },[selectedList.faqId])

    useEffect(()=>{
        setIsLoadingComment(true)
        const timeoutId = setTimeout(() => {
            setIsLoadingComment(false);
            }, 500); // 3초 후에 isVisible 값을 false로 변경
        
            return () => clearTimeout(timeoutId)
    },[commentPage])
    
    /** click outside */
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
    
    // icon hover 적용

    useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
    };
    }, []);

    useEffect(()=>{
    getCategory()
    },[])

    useEffect(()=>{
    getList()
    },[reqData.page, reqData.categoryId])

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
    
    useEffect(()=>{
    },[boardLength])
    useEffect(()=>{
    if(selectedList) {
        getComment()
    }
    },[commentPage])

     /** 알림창 ▼ ============================================================= */

     useEffect(()=>{
        if(!alertModal) {
           setAlertSetting({
            alertTxt : '',
            onConfirm : function() {},
            isDoubleBtn : false,
            btnTxt : 'Close',
            confirmTxt : ''
           })
        }
    },[alertModal])
    
    useEffect(()=>{
        if(alertSetting.alertTxt!==''){
            setAlertModal(true)
        }else {
            setAlertModal(false)
        }
    },[alertSetting])

    /** 알림창 ▲ ============================================================= */

     /** 경고창 ▼ ============================================================= */
     const [warningModal, setWarningModal] = useState(false)
     const [warningTxt, setWarningTxt] = useState('')

     useEffect(()=>{
         if(warningTxt!=='') {
             setWarningModal(true)
         }
     },[warningTxt])

     useEffect(()=>{
         if(!warningModal) {
             setWarningTxt('')
         }
     },[warningModal])

      /** 경고창 ▲ ============================================================= */

    useEffect(()=>{

    if(selectedList.faqId==='') {
        setOpenRight(false)
    }else if(selectedList.faqId!=='' && !isFrequent){
        setOpenRight(true)
    }
    },[selectedList.faqId])

    const listRef = useRef(null)
    useEffect(()=>{
    const refElement = listRef.current;
    if(refElement) {
        let top = refElement.getBoundingClientRect();
        setHoveredItemPosition({ y : top})
    }
    },[])

    /** 모달창 실행시 외부 스크롤 방지 */

    useEffect(()=>{
        const elem = document.querySelector('html')
        console.log(elem)
        if(maximizing) {
            elem.style.overflow='hidden';
        }else {
            elem.style.overflow='';
        }
    },[])

    return (
        <>
        
       
        <Style detail={selectedList?.faqId} openright={openRight}>
        <div className="inner-container">
            <Top searchArea={true} auth={ auth=== 1 ? true : false} onChange={(e)=>setReqData({...reqData, search:e.target.value})} onClick={getList}/>
            {/** Top Area */}
            <div className="faq-nav">
                <div className="faq-lists-wrapper" ref={listRef}>
                    <ul className="faq-lists custom-justify-between">
                        { frequentList && frequentList.length > 0 && frequentList.map((item, idx)=>{
                            return (
                                <li key={generateRandomString(idx)} onClick={(e)=>(handleClickRow(e,item), setMaxmizing(true), setIsFrequent(true))}>
                                    <div className="faq-top">
                                        <p className="faq-number" style={item.num !== 0 ? {marginRight:'10px'} : null}>{item.num!==0 && `Q.${String(idx+1).padStart(3, '0')}`}</p>
                                        <p className="faq-title">{`[${item.categoryName}]`}</p>
                                    </div>
                                    <div className="faq-summary">{item.subject.slice(0,70)}</div>
                                </li>
                            )
                        })} 
                    </ul>
                </div>
                <div className="faq-category">
                    <ul className="faq-category-lists custom-justify-center" ref={categoryRef}>
                        {
                            categoryLists?.map((item,idx)=>{
                                return(
                                    <li className="scroll-lists" key={generateRandomString(idx+1)} onMouseEnter={(e)=> handleMouseEnter(e,item)}>
                                        <div className="faq-img-wrapper"><img src={process.env.REACT_APP_DOWN_URL+'/'+item.categoryIconPath} alt='category-icon'/></div>
                                        <p>{item.categoryNm}</p>
                                        {/* {
                                        item.iconModal
                                        &&
                                        <IconModal items={item.subCategory}/>
                                        } */}
                                    </li>
                                )
                            })
                        }
                    </ul>
                        {categoryLists?.map(item => {
                            return item.iconModal && <IconModal items={item.subCategory} position={hoveredItemPosition} onMouseLeave={()=>handleMouseLeave(item)} isSubCategory={item.subCategory.length!==0 ? true : false}/>;
                        })}
                </div>
            </div>

            {/** Content Area */}
            <div className="faq-contents">
                <div className="faq-left">

                <div className="faq-setting-tab custom-flex-item custom-justify-between">
                    <div >
                        <ul className="custom-flex-item">
                            {
                                faqTab?.map((item,idx)=>{
                                    return(
                                        <li className={`custom-flex-item custom-align-item custom-justify-center cursor-btn ${item.categoryId===reqData.categoryId  && `red-selected`}`} onClick={()=>setReqData({...reqData, categoryId:item.categoryId})} key={generateRandomString(idx)}>{item.categoryNm}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>

                    <div className="custom-scroll-area">
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
                </div>
                
               {
                (selectedList.faqId!=='' && !isFrequent) ?

                <div className="editor-wrapper">
                <div className={`faq-right ${isLoading ? 'loadingOpacity':''}`} >
                <div className="faq-right-top">
                    {/* <img src={Frame} onClick={()=>{setMaxmizing(true)}} className="maximizing-btn"/> */}
                    <div className="custom-flex-item custom-justify-between">
                        <button className="maximizing-btn" onClick={()=>{setMaxmizing(true)}}>
                        <img src={Maximize} alt="minimize-btn"/> Full Screen
                        </button> 
                        <img className="cursor-btn" src={Close} alt="close-btn" onClick={clearState} />
                    </div>
                    <p>{selectedList.subject}</p>
                    {
                        fileStore.length!==0 &&
                        fileStore.map((file,idx)=>{
                            return(
                                <div className="custom-flex-item" key={generateRandomString(idx)}>
                                    <img src={Attachment} alt="attachment"/> 
                                    <span>Attachment</span>
                                    <span className="custom-flex-item faq-attach-down">
                                        <span >{`(${idx+1})`}</span><p className="custom-hyphen custom-self-align ">-</p><span className="faq-attach custom-flex-item cursor-btn" onClick={()=>setWarningTxt('no download path.')}><p>{file.fileName}</p><img src={Download} alt='download_attachment'/></span>
                                    </span>
                                </div> 
                            )
                        })
                    }  
                    
                </div>
                <div className="faq-right-middle"><Viewer content={selectedList.content} key={selectedList.faqId}/></div>
                <div className="faq-right-bottom">
                    <div className="user-action custom-flex-item ">
                            <span className="faq-like custom-flex-item cursor-btn" onClick={(e)=>onClickAction(e,selectedList.faqId,'LIKE')}><img src={selectedList.reactionState==='LIKE' ? Liked : Like} alt="btn_like"/><p>{selectedList.likeCount}</p></span>   
                            <span >|</span>
                            <span className="faq-dislike custom-flex-item cursor-btn" onClick={(e)=>onClickAction(e,selectedList.faqId,'DISLIKE')}><img src={selectedList.reactionState==='DISLIKE' ? Disliked : Dislike} alt='btn_dislike'/><p>{selectedList.dislikeCount}</p></span> 
                    </div> 
                    <div className="faq-comment-wrapper">
                        <span>Comments</span><span className="comment-cnt-title">total <p className="custom-stress-txt comment-cnt">{selectedList.commentCount}</p></span>
                        <div className="custom-justify-between">
                            <div className="comment-input">
                                <span>Writer : {user.name}</span>
                                <textarea value={comment} onChange={(e)=>setComment(e.target.value)}/>
                            </div>
                            <button onClick={()=>onAddComment(1,selectedList.faqId)}>Write</button>
                        </div>
                    </div>
                    <div className={`faq-comment-list ${isLoadingComment ? 'halfOpacity':''}`}>
                        <ul>
                            {
                                // commentList.length !==0 &&
                                 commentList.map((comment,idx)=>{
                                    return(
                                        <li key={generateRandomString(idx)}>
                                            <div className="comment-top custom-flex-item custom-justify-between">
                                                <div>
                                                    <span>{comment.writerName}</span>
                                                    <span>{moment(comment.createdAt).format('MM.DD.YY HH:mm:ss')}</span>
                                                </div>
                                                <span className="custom-flex-item">
                                                {
                                                            comment.writerID===user.id &&
                                                            <p className="cursor-btn" onClick={()=>onConfirmHandler(4,comment.commentId)}>Delete</p>
                                                        }
                                                         <p className="cursor-btn" onClick={()=>{openCommentInput(idx); setSubComment('')}}>Answer</p>
                                                </span>
                                            </div>
                                            <div className="comment-middle">{comment.content?.slice(0,250)}{comment.content?.length>130 && <span className="custom-stress-txt">...More</span>}</div>
                                            <div className={comment.openSubComment ? "comment-bottom" : "comment-bottom "}>
                                                        

                                                            {
                                                                comment.subComment.length!==0 &&
                                                                <div className="custom-flex-item cursor-btn" onClick={(e)=>openSubcomment(e,idx,comment.csTalkId)}>
                                                                <img src={Comment} alt="under-comment" />
                                                                <span>Comment</span>
                                                                <span className="custom-stress-txt">( {comment.subComment.length} ) </span>
                                                                <img src={comment.openSubComment ? Close_comment : More_comment} alt="under-comment" className="toggle-sub-btn"/>
                                                                </div>
                                                            }
                                                            {
                                                                comment.openSubComment 
                                                                ?
                                                                <div >
                                                                    <ul className="submment-wrapper">
                                                                       {
                                                                         comment.subComment.map((sub,idx)=>{
                                                                            return(
                                                                                <li key={generateRandomString(idx)}>
                                                                                    <div className="comment-top custom-flex-item custom-justify-between">
                                                                                        <div>
                                                                                            <span>{sub.writerName}</span>
                                                                                            <span>{moment(sub.createdAt).format('MM.DD.YY')}</span>
                                                                                        </div>
                                                                                        <span className="custom-flex-item cursor-btn">
                                                                                            {sub.writerID===user.id && <p onClick={()=>onConfirmHandler(4,sub.commentId)}>Delete</p>}
                                                                                            {/* <p>Answer</p> */}
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="comment-middle">{sub.content?.slice(0,250)}{sub.content?.length>250 && <span className="custom-stress-txt">...More</span>}</div>
                                                                                </li>
                                                                            )
                                                                         })
                                                                       }
                                                                    </ul>
                                                                </div>
                                                                :
                                                                null
                                                            }
                                                            {
                                                                comment.isInput &&
                                                                <div className="cstalk-comment-wrapper sub-comment-wrapper">
                                                                <div className="custom-justify-between">
                                                                    <div className="comment-input">
                                                                        <span>Writer : {user.name}</span>
                                                                        {/* <textarea value={subComment} onChange={(e)=>console.log(e.target.value)}/> */}
                                                                        <textarea defaultValue={subComment} onBlur={(e)=>setSubComment(e.target.value)} id={`sub-${comment.commentId}-${idx}`}  />
                                                                    </div>
                                                                    <button onClick={()=>onAddComment(2, comment.commentId)}>Write</button>
                                                                </div>
                                                                </div>
                                                         }
                                                        {/* ) */}
                                                    {/* })} */}
                                                </div>

                                            
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        {
                            commentList.length!==0 &&
                            <Pagination 
                            activePage={commentPage} // 현재 페이지
                            itemsCountPerPage={5} // 한 페이지 당 보여줄 아이템 수
                            totalItemsCount={selectedList ? selectedList.commentCount : 0} // 총 아이템 수
                            pageRangeDisplayed={5} // paginator의 페이지 범위
                            prevPageText={"‹"} // "이전"을 나타낼 텍스트
                            nextPageText={"›"} // "다음"을 나타낼 텍스트
                            onChange={(e)=>setPage(e,2)} // 페이지 변경을 핸들링하는 함수
                            />
                        }
                    </div>
                </div>
               </div>
            </div>
            :
            null
               }
                </div>
                {
                alertModal
                &&
                <Alert alertTxt={alertSetting.alertTxt} onClose={()=>setAlertModal(false)} onConfirm={alertSetting.onConfirm} twoBtn={alertSetting.isDoubleBtn} btnTxt={alertSetting.btnTxt}/>
            }
            </div>
            {
                maximizing 
                &&
                <MaximalView data={selectedList} onClose={()=>{setMaxmizing(false); clearState(); setIsFrequent(false)}} onMinimizing={()=> isFrequent ? (setMaxmizing(false), setIsFrequent(!false)) : setMaxmizing(false)} page='faq'/>
            }
            {
                warningModal &&
                <Warning text={warningTxt} onClose={()=>setWarningModal(false)} />
            }
            <Tab />
        </Style>
        </>
    )
}

export default Faq

const Style = styled.div`
    #list-item-${props=>props.detail} {
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
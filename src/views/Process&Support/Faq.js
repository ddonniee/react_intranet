// import { useState } from "react"

// import ExportExcel from "../../utils/ExportExcel"


import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { styled } from "styled-components";

import { UserContext } from "../../hooks/UserContext"
import Pagination from "react-js-pagination";
// Components
import Header from "../../components/Header"
import Top from "../../components/Top"
import Zendesk from "../../components/Zendesk"
import AgGrid from "../../components/AgGrid"
import Viewer from "../../components/Viewer"
import Alert from "../../components/Alert";
import Tab from "../../components/Tab";
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
import New from '../../assets/svgs/icon_new.svg'
import Attachment from '../../assets/svgs/icon_attachment.svg';
import Download from '../../assets/svgs/icon_download.svg'
import Like from '../../assets/svgs/icon_like.svg'
import Liked from '../../assets/svgs/icon_liked.svg'
import Dislike from '../../assets/svgs/icon_dislike.svg'
import Disliked from '../../assets/svgs/icon_disliked.svg'
import Comment from '../../assets/svgs/icon_co_comment.svg'
import More_comment from '../../assets/svgs/icon_co_more.svg'

import moment from "moment";

function Faq() {

    let auth = 1;
    const user = useContext(UserContext)
    let now = moment().subtract(24,'hours').format('YYYY-MM-DD HH:mm:ss');

   

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
     const [boardLength, setBoardLength] = useState(0)
     const setPage = (e,num) => {
        if(num===1) {
            setActivePage(e);
        }else {
            setCommentPage(e)
        }
     };

     /** 페이징 관련 ▲ ============================================================= */

    // const testValue = useContext(TestContext)
    
    // const [categoryLists, setCategoryLists] = useState([
    //     {
    //         num : 0,
    //         icon : Order,
    //         name : 'displacement',
    //         lowerMenu : [
    //             {
    //                 lowerName : 'Hold Codes',
    //                 path : process.env.REACT_APP_FRONT_URL
    //             }
    //         ],
    //         iconModal : false,
    //     },
    //     {
    //         num : 1,
    //         icon : Docs,
    //         name : 'Hold',
    //         lowerMenu : [
    //             {
    //                 lowerName : 'Hold Codes',
    //                 path : process.env.REACT_APP_FRONT_URL
    //             }
    //         ],
    //         iconModal : false,
    //     },
    //     {
    //         num : 2,
    //         icon : Man,
    //         name : 'Installation',
    //         lowerMenu : [
    //             {
    //                 lowerName : 'Hold Codes',
    //                 path : process.env.REACT_APP_FRONT_URL
    //             },
    //             {
    //                 lowerName : 'Service Order',
    //                 path : process.env.REACT_APP_FRONT_URL
    //             },
    //             {
    //                 lowerName : 'VIDEO-Status',
    //                 path : process.env.REACT_APP_FRONT_URL
    //             },
    //             {
    //                 lowerName : 'Support',
    //                 path : process.env.REACT_APP_FRONT_URL
    //             }
    //         ],
    //         iconModal : false,
    //     },
    //     {
    //         num : 3,
    //         icon : Lupa,
    //         name : 'Agreement Process',
    //         lowerMenu : [
    //             {
    //                 lowerName : 'Hold Codes',
    //                 path : process.env.REACT_APP_FRONT_URL
    //             }
    //         ],
    //         iconModal : false,
    //     },
    //     {
    //         num : 4,
    //         icon : Hands,
    //         name : 'Order Status',
    //         lowerMenu : [
    //             {
    //                 lowerName : 'Hold Codes',
    //                 path : process.env.REACT_APP_FRONT_URL
    //             }
    //         ],
    //         iconModal : false,
    //     },
    //     {
    //         num : 5,
    //         icon : Codes,
    //         name : 'Hold Codes',
    //         lowerMenu : [
    //             {
    //                 lowerName : 'Hold Codes',
    //                 path : process.env.REACT_APP_FRONT_URL
    //             }
    //         ],
    //         iconModal : false,
    //     },
    //     {
    //         num : 6,
    //         icon : Timer,
    //         name : 'Service Order',
    //         lowerMenu : [
    //             {
    //                 lowerName : 'Hold Codes',
    //                 path : process.env.REACT_APP_FRONT_URL
    //             }
    //         ],
    //         iconModal : false,
    //     },
    //     {
    //         num : 7,
    //         icon : Video,
    //         name : 'VIDEO - Status',
    //         lowerMenu : [
    //             {
    //                 lowerName : 'Hold Codes',
    //                 path : process.env.REACT_APP_FRONT_URL
    //             }
    //         ],
    //         iconModal : false,
    //     },
    //     {
    //         num : 8,
    //         icon : Talk,
    //         name : 'Support',
    //         lowerMenu : [
    //             {
    //                 lowerName : 'Hold Codes',
    //                 path : process.env.REACT_APP_FRONT_URL
    //             }
    //         ],
    //         iconModal : false,
    //     },
    // ])
    const [boardData, setBoardData] = useState([])
    const [frequentList, setFrequentList] = useState([])
    const [column, setColumn] = useState([
        { field: 'num' },
        { field: 'title' },
    ])

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
    })

    useEffect(()=>{
        console.log('selectedList.reactionState',selectedList)
    },[selectedList])
    
    const onClickAction = (e,id,reaction) => {
        const formData = new FormData();

        let yourReaction = reaction==='LIKE' ? 'likeCount' : 'dislikeCount'
        let oppositeReaction = reaction === 'LIKE' ? 'dislikeCount' : 'likeCount'

        console.log(id,reaction,yourReaction,oppositeReaction,'!~!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        formData.append('faqId', id);
        formData.append('reaction',reaction )

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            headers: { 
               'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
            },
            data : formData
            };
        axiosInstance2('/faq/reaction', config)
        .then(function (response){
            let resData = response.data;
            if(resData.code===200) {
                let data = resData.result
                console.log(data)
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
        console.log(e)
    }

    const handleClickRow = (e,item) => {
        getDetail(item.faqId)
      
    }

    /** Alert Handler */
    const [alertModal, setAlertModal] = useState(false)
    const [alertSetting, setAlertSetting] = useState({
        alertTxt : '',
        onConfirm : function() {},
        isDoubleBtn : false,
        btnTxt : 'Close',
        confirmTxt : ''
    })

    const onConfirmHandler = (num,id) =>{

        // leave editor 
        if(num===1 || num===7) {
            setAlertSetting({
                ...alertSetting,
                alertTxt: ' Click confirm to leave write mode.',
                onConfirm : ()=>{ 
                    setAlertModal(false)
                    // setContent({
                    //     title : '',
                    //     content : '',
                    //     isPublic : '',
                    //     attachments : '',
                    //     csTalkId : ''
                    // })
                    // clearState()
                    // num===1 && getDetail(id)
                },
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
                // onConfirm :  ()=>{onDeleteComment(id); setAlertModal(false); },
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


    const [reqData, setReqData] = useState({
        categoryId: '',
        subsidiary: '',
        search : '',
        type : 'F',
    })
    const getList = () =>{

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
            if(resData.code===200) {
                let data = resData.result
                setBoardData(data?.list)
                setFrequentList(data?.top5list)
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

    const [categoryLists, setCategoryLists] = useState([])
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

    /** Comment handling */
    const [commentPage, setCommentPage] = useState(1)
    const [commentList, setCommentList] = useState([]);
    const [comment, setComment] = useState('')
    const [subComment, setSubComment] = useState('');

    const getComment =() =>{
        const formData = new FormData();
        
        formData.append('page', commentPage);
        formData.append('faqId', selectedList.faqId);

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            headers: { 
               'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
            },
            data : formData
            };
        axiosInstance2('/faq/commentList', config)
        .then(function (response){
            let resData = response.data;
            
            if(resData.code===200) {
                let data = resData.result
                data.map(d=>{
                    d.openSubComment = false
                    d.isInput = false
                }
                )
                setCommentList(data)
            }else {
                console.log(resData)
            }
        })
        .catch(function(error) {
           
        })
    }
        const onAddComment =(num, id) => {
        // num = 1 댓글, num = 2 대댓글
        if(num===1 && comment==='') {
            // onConfirmHandler(5)
            return false
        }
        // else if(num===2 &&subComment==='') {
        //     // onConfirmHandler(5)
        //     return false
        // }

        const formData = new FormData();

        formData.append('faqId', id);
        if(num===1) {
            formData.append('content', comment);
        }
        if(num===2) {
            formData.append('commentId', id);
            // formData.append('content', subComment);
        }
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                headers: { 
                    'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
                },
                data : formData
                };
            axiosInstance2('/faq/commentInsert', config)
            .then(function (response){
                let resData = response.data;
                if(resData.code===200) {
                    // onConfirmHandler(6)
                    num === 1 ? setComment('') : setSubComment('')
                    getDetail(id);
                    // getComment()
                }else {
                    console.log(resData,'comment list')
                }
            })
            .catch(function(error) {
                console.log('error',error)
            })  
    }

    const iconRef = useRef();
    const [iconList, setIconLiet] = useState(['Hold Codes','Service Order','VIDEO-Status','Support'])

    const IconModal = () =>{
        return (
            <div className='icon-modal' ref={iconRef}>
                <img src={Polygon} alt='polygon' />
                <ul>
                    {
                        iconList?.map((item,idx)=>{
                            return(
                                <li className='custom-hover' id={`icon-list-${idx+1}`} key={generateRandomString(idx+3)}>{item}</li>
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
              if (list.categoryId === item.categoryId) {
                return { ...list, iconModal: item.iconModal ? false : true };
              } else {
                return { ...list, iconModal: false };
              }
            //   return list;
            });
            return updatedLists;
          });
    }

    const [categoryIcon, setCategoryIcon] = useState([])
    useEffect(()=>{
        if(categoryLists?.attachments!=='') {
            const jsonString = JSON.parse(categoryLists.attachments);
            if(jsonString!==null) {
                let copy = [...categoryIcon,jsonString]
                setCategoryIcon(copy)
            }
        }
    },[categoryLists])

    /** loading 시 animation */
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingComment, setIsLoadingComment] = useState(false)

    
     useEffect(()=>{
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
    /** loading 시 animation */

   
    
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

      useEffect(()=>{
        getCategory()
      },[])

      useEffect(()=>{
        getList()
      },[activePage])

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
        if(selectedList) {
            getComment()
        }
      },[commentPage])

    return (
        <>
        
        <Header />
        <Style selectId={selectedList?.num} >
        <div className="inner-container">
            <Top searchArea={true} auth={ auth=== 1 ? true : false} options={subsidiary} handleChange={handleSelectBox} />
            {/** Top Area */}
            <div className="faq-nav">
                <div className="faq-lists-wrapper">
                    <ul className="faq-lists">
                        { frequentList && frequentList.length > 0 && frequentList.map((item, idx)=>{
                            return (
                                <li key={generateRandomString(idx)}>
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
                    <ul className="faq-category-lists">
                        {
                            categoryLists?.map((item,idx)=>{
                                return(
                                    <li key={generateRandomString(idx+1)} onClick={(e)=>handleClickIcon(e,item)}>
                                        <div className="faq-img-wrapper"><img src={item.icon} /></div>
                                        <p>{item.categoryNm}</p>
                                        {
                                        item.iconModal
                                        &&
                                        <IconModal />
                                        }
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
                    <ul className="faq-custom-board">
                        {
                            boardData && boardData.length > 0 && boardData.map((item,idx)=>{
                                return(
                                    <li  key={generateRandomString(idx)} id={`list-item-${idx+1}`} onClick={(e)=>handleClickRow(e,item)}>
                                        <span>{String((activePage-1)*10+(idx+1)).padStart(3, '0')}</span><span>{item.subject}</span><img src={moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss') > now ? New : null} /><span>{moment(item.createdAt).format('YYYY-MM-DD')}</span>
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
                    {/* <AgGrid data={boardData} column={column} paging={true} /> */}
                </div>
                <div className="editor-wrapper">
               {
                selectedList.faqId!=='' ?
                <div className={`faq-right ${isLoading ? 'loadingOpacity':''}`} >
                <div className="faq-right-top">
                    <p>{selectedList.subject}</p>
                    <div className="custom-flex-item">
                        <img src={Attachment} alt="attachment"/> 
                        <span>Attachment</span>
                        <span className="custom-flex-item faq-attach-down">
                            <span>{selectedList.attachments !=='' && ` (1)`}</span><p className="custom-hyphen custom-self-align ">-</p><span className="faq-attach custom-flex-item"><p>{selectedList.attachment}</p><img src={Download} alt='download_attachment'/></span>
                        </span>
                    </div>   
                    <div className="user-action custom-flex-item ">
                        <span className="faq-like custom-flex-item cursor-btn" onClick={(e)=>onClickAction(e,selectedList.faqId,'LIKE')}><img src={selectedList.reactionState==='LIKE' ? Liked : Like} alt="btn_like"/><p>{selectedList.likeCount}</p></span>   
                        <span >|</span>
                        <span className="faq-dislike custom-flex-item cursor-btn" onClick={(e)=>onClickAction(e,selectedList.faqId,'DISLIKE')}><img src={selectedList.reactionState==='DISLIKE' ? Disliked : Dislike} alt='btn_dislike'/><p>{selectedList.dislikeCount}</p></span> 
                    </div> 
                </div>
                <div className="faq-right-middle"><Viewer content={selectedList.content}/></div>
                <div className="faq-right-bottom">
                    <div className="faq-comment-wrapper">
                        <span>Comments</span><span className="comment-cnt-title">total <p className="custom-stress-txt comment-cnt">{selectedList.commentCount}</p></span>
                        <div className="custom-justify-between">
                            <div className="comment-input">
                                <span>Writer : {user.name}</span>
                                <textarea defaultValue={comment} onChange={(e)=>setComment(e.target.value)}/>
                            </div>
                            <button onClick={()=>onAddComment(1,selectedList.faqId)}>Write</button>
                        </div>
                    </div>
                    <div className={`faq-comment-list ${isLoadingComment ? 'halfOpacity':''}`}>
                        <ul>
                            {
                                commentList.length !==0 &&
                                 commentList.map((comment,idx)=>{
                                    return(
                                        <li key={generateRandomString(idx)}>
                                            <div className="comment-top custom-flex-item custom-justify-between">
                                                <div>
                                                    <span>{comment.writerName}</span>
                                                    <span>{moment(comment.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                                                </div>
                                                <span className="custom-flex-item">
                                                    {user.id===comment.writerID && <p>Delete</p>}<p>Answer</p>
                                                </span>
                                            </div>
                                            <div className="comment-middle">{comment.content?.slice(0,250)}{comment.content?.length>130 && <span className="custom-stress-txt">...More</span>}</div>
                                            <div className="comment-bottom custom-flex-item custom-align-self">
                                                {comment.comments?.map((c,idx)=>{
                                                    return (
                                                        <Fragment key={generateRandomString(idx)}>
                                                        <img src={Comment} alt="under-comment" />
                                                        <span>Comment</span>
                                                        <span className="custom-stress-txt">{comment.subComment.length}</span>
                                                        <img src={More_comment} alt="under-comment" />
                                                        </Fragment>
                                                    )
                                                })}
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
            :
            <div className="cstalk-right custom-flex-item custom-align-item custom-justify-center">
                        <p>If you select a list, you can see the contents</p>
                    </div>
               }
                </div>
                {
                alertModal
                &&
                <Alert alertTxt={alertSetting.alertTxt} onClose={()=>setAlertModal(false)} onConfirm={alertSetting.onConfirm} twoBtn={alertSetting.isDoubleBtn} btnTxt={alertSetting.btnTxt}/>
            }
            </div>

            <Zendesk />

            <Tab />
        </div>
        </Style>
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

const Style = styled.div`
    #list-item-${props=>props.selectId} {
        background : #FAF1F4; color : #BB0841; 
    }
`
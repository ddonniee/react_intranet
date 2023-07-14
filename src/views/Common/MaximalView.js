import React, {useState, useEffect, useContext} from "react";
import { UserContext } from "../../hooks/UserContext"
import Pagination from "react-js-pagination";
import { axiosInstance } from "../../utils/CommonFunction";
// svgs
import Close from '../../assets/svgs/icon_close2.svg'
import Minimize from '../../assets/svgs/icon_screen.svg'
import Attachment from '../../assets/svgs/icon_attachment.svg';
import Download from '../../assets/svgs/icon_download.svg'; 
import More_comment from '../../assets/svgs/icon_co_more.svg'
import Close_comment from '../../assets/svgs/icon_co_close.svg'
import Like from '../../assets/svgs/icon_like.svg'
import Liked from '../../assets/svgs/icon_liked.svg'
import Dislike from '../../assets/svgs/icon_dislike.svg'
import Disliked from '../../assets/svgs/icon_disliked.svg'

// utrils
import { downloadAttachment,generateRandomString, convertFileSize, axiosInstance2 } from "../../utils/CommonFunction";
import moment from "moment";
//compomnent
import Viewer from "../../components/Viewer";
import Alert from "../../components/Alert";

function MaximalView(props) {

    const user = useContext(UserContext)

    const { data, onClose, onMinimizing, page} = props;
    console.log('dddddddddddddddddddddddd',data)
    let id =`${page}Id`;
    const [detail, setDetail] = useState(data)

    useEffect(()=>{
        setDetail(data)
    },[data])
    /** Comment handling */
    const [commentPage, setCommentPage] = useState(1)
    const [commentList, setCommentList] = useState([]);
    const [comment, setComment] = useState('')
    const [subComment, setSubComment] = useState('');

    const setPage = (e,num) => {
        setCommentPage(e)

     };

     const getDetail = () =>{

        const formData = new FormData();
       
        formData.append(id,detail[id])

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            headers: { 
               'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
            },
            data : formData
            };
        axiosInstance2(`/${page}/detail`, config)
        .then(function (response){
            let resData = response.data;
            if(resData.code===200) {
                let data = resData.result
                setDetail(data)
            }else {
                console.log(resData)
            }
        })
        .catch(function(error) {
            console.log('error',error)
        })
    }

    const getComment =() =>{
        const formData = new FormData();

        formData.append('page', commentPage);
        formData.append(id,detail[id])

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            headers: { 
               'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
            },
            data : formData
            };
        axiosInstance(`/${page}/commentList`, config)
        .then(function (res){
            let resData = res.data;
            console.log('comment : ',res)
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
    const onAddComment =(num,yourId) => {
        // num = 1 댓글, num = 2 대댓글
        if(num===1 && comment==='') {
            onConfirmHandler(5)
            return false
        }
        else if(num===2 &&subComment==='') {
            onConfirmHandler(5)
            return false
        }
    
        const formData = new FormData();
    
        formData.append(id,yourId)
        if(num===1) {
            formData.append('content', comment);
        }
        if(num===2) {
            formData.append('commentId', yourId);
            formData.append('content', subComment);
        }
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                headers: { 
                    'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
                },
                data : formData
                };
            axiosInstance2(`/${page}/commentInsert`, config)
            .then(function (response){
                let resData = response.data;
                if(resData.code===200) {
                    // onConfirmHandler(6)
                    num === 1 ? setComment('') : setSubComment('')
                    getDetail(yourId);
                    getComment()
                    
                }else {
                    console.log(resData,'comment list')
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
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            headers: { 
                'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
            },
            data : formData
            };
        axiosInstance2(`${page}/commentDelete`, config)
        .then(function (response){
            let resData = response.data;
            if(resData.code===200) {
                setAlertSetting({
                    ...alertSetting,
                    alertTxt : "You've deleted comment.",
                    isDoubleBtn : false,
                    btnTxt : 'Close',
                })
                getDetail(detail[id]);
                getComment()
            }else {
                console.log(resData,'resData')
            }
        })
        .catch(function(error) {
            console.log('error',error)
        })                  
    }

    const onClickAction = (e,yourId,reaction) => {
        const formData = new FormData();

        let yourReaction = reaction==='LIKE' ? 'likeCount' : 'dislikeCount'
        let oppositeReaction = reaction === 'LIKE' ? 'dislikeCount' : 'likeCount'

        formData.append(id, yourId);
        formData.append('reaction',reaction )

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            headers: { 
               'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
            },
            data : formData
            };
        console.log(Object.fromEntries(formData))
        axiosInstance2(`/${page}/reaction`, config)
        .then(function (response){
            let resData = response.data;
            if(resData.code===200) {
                let data = resData.result
                console.log(data)
                setDetail({
                    ...detail,
                    reactionState : detail.reactionState === reaction ? "NONE" : reaction,
                    [yourReaction] : detail.reactionState === reaction ? detail[yourReaction]-1
                                   : detail[yourReaction]+1 ,
                    [oppositeReaction] : (detail.reactionState !== 'NONE' && detail.reactionState !== reaction) 
                                        ? detail[oppositeReaction]-1 
                                        : detail[oppositeReaction]
                                        
                })
            }else {
                console.log(resData)
            }
        })
        .catch(function(error) {
            console.log('error',error)
        })
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
    
    const onConfirmHandler=(id)=>{
            setAlertSetting({
                ...alertSetting,
                alertTxt: 'Are you sure to delete comment?',
                onConfirm :  ()=>{onDeleteComment(id); setAlertModal(false); },
                isDoubleBtn : true,
                btnTxt : 'Confirm',
                confirmTxt : "Deleted comment."
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
    
    const [fileStore, setFileStore] = useState([])

    useEffect(()=>{

    if(detail[id]==='') {
        return 
        }
       setFileStore([])
       if(detail?.attachments!=='') {
         
           const jsonString = JSON.parse(detail.attachments);
           if(jsonString!==null) {
               let copy = [...jsonString]
               setFileStore(copy)
           }
       }
       getComment()
   },[detail])

//    useEffect(()=>{
//         setDetail(data)
//    },[data])

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
       
    useEffect(()=>{
        getComment()
    },[])

    console.log('detail', detail)

    return (
        <div className="modal">
           <div className="maximal-content">
             <div className="board-view-top">
                <div className="board-btn-area custom-flex-item custom-align-item custom-justify-between">
                    <button className="board-minimize-btn" onClick={onMinimizing}>
                        <img src={Minimize} alt="minimize-btn" className="screen-icon"/> Exit Full Screen
                    </button>
                    <img src={Close} alt="minimize-btn" onClick={onClose} />
                </div>
                <p className="board-title">{detail.subject}</p>
                <p className="board-title-detail">
                    <span>Category</span> : {detail.categoryTree} &nbsp;
                    <span>Writer</span> : {detail.writerName} &nbsp;
                    <span>Date</span> : {moment(detail?.createdAt).format(`'DD.MM.YY`)}
                </p>
                <div className="board-title-attach">
                    <span className="custom-flex-item custom-align-item">
                        <div className="custom-flex-item custom-align-item custom-flex-wrap">
                        {
                            fileStore.length!==0 &&
                            fileStore.map((file,idx)=>{
                                return(
                                    <span className="board-attach-box" key={generateRandomString(idx)} onClick={()=>downloadAttachment(file.uploadPath)}> 
                                        <img src={Attachment} alt="attachment" className="attach-icon"/>
                                        <p>{`${file.fileName} ${file?.fileSize ? `(${convertFileSize(file.fileSize)})` : ''}`}</p>
                                        <span className="board-attach-down" onClick={() => downloadAttachment(file.uploadPath)}> <img src={Download} alt="attachment-download"/> </span>
                                    </span>

                                    // <div className="custom-flex-item attach-box" key={generateRandomString(idx)} onClick={()=>downloadAttachment(file.uploadPath)}>
                                    // <img src={Attachment} alt="attachment"/> 
                                    // <span className="custom-flex-item cstalk-attach-down cursor-btn download-file">{`${file.fileName} ${file?.fileSize ? `(${convertFileSize(file.fileSize)})` : ''}`}</span>
                                    // <img src={Download} alt="attachment-download"/>
                                    // </div> 
                                )
                            })
                        }  
                        </div>
                    </span>
                </div>
             </div>
            
             <div className="content-middle">
                <Viewer content={detail.content} />
             </div>
            
             <div className="content-bottom">
             <div className="user-action custom-flex-item ">
                        <span className="faq-like custom-flex-item cursor-btn"  onClick={(e)=>onClickAction(e,detail[id],'LIKE')}><img src={detail.reactionState==='LIKE' ? Liked : Like} alt="btn_like"/><p>{detail.likeCount}</p></span>   
                        <span >|</span>
                        <span className="faq-dislike custom-flex-item cursor-btn" onClick={(e)=>onClickAction(e,detail[id],'DISLIKE')}> <img src={detail.reactionState==='DISLIKE' ? Disliked : Dislike} alt='btn_dislike'/><p>{detail.dislikeCount}</p></span> 
                    </div> 
             <div className='faq-comment-list'>
             <div className="faq-comment-wrapper" style={{padding:'0'}}>
                        <span>Comments</span><span className="comment-cnt-title">total <p className="custom-stress-txt comment-cnt">{detail.commentCount}</p></span>
                        <div className="custom-justify-between">
                            <div className="comment-input" style={{width:'94%'}}>
                                <span>Writer : {user.name}</span>
                                <textarea value={comment} onChange={(e)=>setComment(e.target.value)}/>
                            </div>
                            <button onClick={()=>onAddComment(1,detail[id])}>Write</button>
                        </div>
                    </div>
             <ul>
            {
                commentList.length !==0 &&
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
                                            <p className="cursor-btn" onClick={()=>onConfirmHandler(comment.commentId)}>Delete</p>
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
                                                    <div className="comment-input" style={{width:'94%'}}>
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
                    totalItemsCount={detail ? detail.commentCount : 0} // 총 아이템 수
                    pageRangeDisplayed={5} // paginator의 페이지 범위
                    prevPageText={"‹"} // "이전"을 나타낼 텍스트
                    nextPageText={"›"} // "다음"을 나타낼 텍스트
                    onChange={(e)=>setPage(e,2)} // 페이지 변경을 핸들링하는 함수
                    />
                }
            </div>
             </div>
           </div>

           {
                alertModal
                &&
                <Alert alertTxt={alertSetting.alertTxt} onClose={()=>setAlertModal(false)} onConfirm={alertSetting.onConfirm} twoBtn={alertSetting.isDoubleBtn} btnTxt={alertSetting.btnTxt}/>
            }

        </div>
    )
}
export default MaximalView;

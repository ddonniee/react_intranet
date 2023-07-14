import React, {useState, useEffect} from "react";

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
import { downloadAttachment,generateRandomString, convertFileSize } from "../../utils/CommonFunction";
import moment from "moment";
//compomnent
import Viewer from "../../components/Viewer";

function MaximalView(props) {

    const { data, onClose, onMinimizing} = props;

    console.log('Maximal props :::::: ' ,props)
    const [detail, setDetail] = useState(data)

    const [commentList, setCommentList] = useState([]);
    const [commentPage, setCommentPage] = useState(1)
    const setPage = (e,num) => {
        setCommentPage(e)

     };
    const getComment =() =>{
        const formData = new FormData();
        
        formData.append('page', commentPage);
        formData.append('faqId', detail.faqId);

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            headers: { 
               'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
            },
            data : formData
            };
        axiosInstance('/faq/commentList', config)
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
    const openSubcomment = (e,idx,id) =>{
        let copyList = [...commentList]
        copyList[idx].openSubComment = !copyList[idx].openSubComment
        setCommentList(copyList)
    }
    
    const [fileStore, setFileStore] = useState([])

    useEffect(()=>{

        console.log('use Effect',detail.faqId)
    if(detail?.faqId==='') {
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


    return(
        <div className="modal">
           <div className="maximal-content">
             <div className="content-top">
                <div className="board-btn-area custom-flex-item custom-align-item custom-justify-between">
                    <button className="maximizing-btn" onClick={onMinimizing}>
                    <img src={Minimize} alt="minimize-btn"/> Exit Full Screen
                    </button>
                    <img src={Close} alt="minimize-btn" onClick={onClose} />
                </div>
                <p className="maximal-title">{detail.subject}</p>
                <p className="maximal-title-detail">
                    <span>Category</span> : {detail.categoryTree} &nbsp;
                    <span>Writer</span> : {detail.writerName}
                    <span>Date</span> : {moment(detail?.createdAt).format('YYYY-MM-DD')} &nbsp;
                </p>
                <div className="custom-flex-item custom-align-item custom-flex-wrap">
                {
                    fileStore.length!==0 &&
                    fileStore.map((file,idx)=>{
                        return(
                            <div className="custom-flex-item attach-box" key={generateRandomString(idx)} onClick={()=>downloadAttachment(file.uploadPath)}>
                            <img src={Attachment} alt="attachment"/> 
                            <span className="custom-flex-item cstalk-attach-down cursor-btn download-file">{`${file.fileName} ${file?.fileSize ? `(${convertFileSize(file.fileSize)})` : ''}`}</span>
                            <img src={Download} alt="attachment-download"/>
                        </div> 
                        )
                    })
                }  
                </div>
             </div>
            
             <div className="content-middle">
                <Viewer content={detail.content} />
             </div>
            
             <div className="content-bottom">
             <div className="user-action custom-flex-item ">
                        <span className="faq-like custom-flex-item" ><img src={detail.reactionState==='LIKE' ? Liked : Like} alt="btn_like"/><p>{detail.likeCount}</p></span>   
                        <span >|</span>
                        <span className="faq-dislike custom-flex-item"> <img src={detail.reactionState==='DISLIKE' ? Disliked : Dislike} alt='btn_dislike'/><p>{detail.dislikeCount}</p></span> 
                    </div> 
             <div className='faq-comment-list'>
             <div className="comment-wrapper">
             <span>Comments</span><span className="comment-cnt-title">total <p className="custom-stress-txt comment-cnt">{detail.commentCount}</p></span>
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
                                            <span>{moment(comment.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                                        </div>
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
                                                <li>
                                                    <div className="comment-top custom-flex-item custom-justify-between">
                                                        <div>
                                                            <span>{sub.writerName}</span>
                                                            <span>{moment(sub.createdAt).format('YYYY-MM-DD')}</span>
                                                        </div>
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
        </div>
    )
}
export default MaximalView;

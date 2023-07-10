import React, {useState} from "react";

import Pagination from "react-js-pagination";
import { axiosInstance } from "../../utils/CommonFunction";
import Close from '../../assets/svgs/icon_close2.svg'
import Minimize from '../../assets/svgs/icon_screen.svg'
import moment from "moment";
function MaximalView(props) {

    const { data, onClose, onMinimizing} = props;
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
                console.log(data.subComment,'댓글목ㄹ고')
            }else {
                console.log(resData)
            }
        })
        .catch(function(error) {
           
        })
    }
    
    return(
        <div className="modal">
           <div className="maximal-content">
             <div className="content-top">
             <div className="board-btn-area custom-flex-item custom-align-item custom-justify-between">
                <button className="board-full-btn" onClick={onMinimizing}>
                <img src={Minimize} alt="minimize-btn"/> Exit Full Screen
                </button>
                <img src={Close} alt="minimize-btn" onClick={onClose} />
                </div>
             </div>
            <p>{detail.subject}</p>
            <p className="board-title-detail">
                                <span>Category</span> : {detail?.categoryId} &nbsp;
                                <span>Writer</span> : {detail?.WriterName}
                                <span>Date</span> : {moment(detail?.createdAt).format('YY.M.DD')} &nbsp;
                            </p>
             <div className="content-middle"></div>
             <div className="content-bottom">
                <ul>
                    {
                        commentList!==0 && commentList.map((item,idx)=>{
                            return (
                                <li>{item.subject}</li>
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
    )
}
export default MaximalView;

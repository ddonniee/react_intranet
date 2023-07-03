import { useContext, useState, useEffect, useLayoutEffect } from "react"
import { styled } from "styled-components"

import moment from "moment"
import Header from "../../components/Header"
import Top from "../../components/Top"
import Zendesk from "../../components/Zendesk"
import SelectBox from '../../components/SelectBox'
import Viewer from "../../components/Viewer"
import Pagination from "react-js-pagination"

import { axiosInstance2, generateRandomString } from "../../utils/CommonFunction"

// Icons 
import Search from '../../assets/svgs/icon_seeking.svg'
import New from '../../assets/svgs/icon_new.svg'
import Attachment from '../../assets/svgs/icon_attachment.svg';
import Download from '../../assets/svgs/icon_download.svg'
import Like from '../../assets/svgs/icon_like.svg'
import Liked from '../../assets/svgs/icon_liked.svg'
import Comment from '../../assets/svgs/icon_co_comment.svg'
import More_comment from '../../assets/svgs/icon_co_more.svg'
import Close_comment from '../../assets/svgs/icon_co_close.svg'
import Editor from "../../components/Editor"
import EditorModify from "../../components/EditorModify"

import {UserContext} from '../../hooks/UserContext'
import Tab from "../../components/Tab"
import Alert from "../../components/Alert"

function CStalk() {

    /**
     * 화면 접근 권한
     * 본사 staff    (LK)  : 전체내용표시
     * 법인관리자    (SS)  : 소속 법인 내용만 표시
     * 법인 admin    (SA)  : none
     * LGC 관리자    (LD)  : 소속 센터 내용만 표시
     * LGC Engineer  (LE)  : 본인 내용만 표시 
     * ASC 관리자    (AD)  : 소속 센터 내용만 표시
     * ASC Engineer  (AE)  : 본인 내용만 표시
     */

    const user = useContext(UserContext);
    let now = moment().subtract(24,'hours').format('YYYY-MM-DD HH:mm:ss');

    const [auth, setAuth] = useState({
      isViewer : false,
      isWriter : false,
    })

    // useEffect(()=>{
    //   console.log(user)
    //   let role = user.role;
    //   if(role==='LK') {
    //     setAuth({
    //       ...auth,
    //       isViewer : true
    //     })
    //   }else if(role==='SA') {
    //     setAuth({
    //       ...auth,
    //       isViewer : true,
    //       isWriter : true
    //     })
    //   }else {
    //     alert('No right to Access')
    //     document.location.href='/login';
    //   }
    // },[])

    /** 페이징 관련 ▼ ============================================================= */
    const [activePage, setActivePage] = useState(1); // 현재 페이지
    const [itemsPerPage] = useState(10); // 페이지당 아이템 갯수

    const [subsidiary, setSubsidiary ] = useState([
        {value:'',label:'All'}, 
        {value:'LGEAI',label:'LGEAI'}, 
        {value:'LGECI',label:'LGECI'}, 
        {value:'LGEES',label:'LGEES'}, 
        {value:'LGEJP',label:'LGEJP'}, 
        {value:'LGEKR',label:'LGEKR'},
        {value:'LGEMC',label:'LGEMC'},
    ])


    const [isWrite, setIsWrite] = useState(false); // 글 작성시 에디터 on, viewer off
    
    const handleSelectSubsidiary = e => {
        let value = e.value;
        console.log('value ---->', value);
        setReqData({
            ...reqData,
            subsidiary : value
        })
    }
    const setPage = (e) => {
        setActivePage(e);
        console.log('page ---->', e);
    };
    useEffect(()=>{
        setReqData({
            ...reqData,
            page: activePage
        })
    },[activePage])
    /** 페이징 관련 ▲ ============================================================= */

    const [boardData, setBoardData] = useState([]);

    const [content, setContent] = useState({
        title : '',
        content : '',
        isPublic : '',
        attachments : '',
        csTalkId : ''
    });

    const [selectedList, setSelctedList] = useState({
        attachments : '',
        subject: '',
        branch : '',
        center : '',
        commentCount : 0,
        content : '',
        createdAt : '',
        csTalkId : '',
        hits : 0,
        isPublic :  '',
        likeCount : 0, 
        parentCsId : '',
        subsidiary : '',
        writerID : '',
        reactionState : '',
        writerName : '',
    });

    const centerOptions = [
        { value: '', label: 'All' },
        { value: '0', label: 'Me' },
        { value: '1', label: 'Public' },
        { value: '2', label: 'Center' },
    ]

    const handleSelectBox = (event,params) => {
        console.log('handleSelectBox',event,params)
        const viewer = event.value;

        setReqData({
            ...reqData,
            view : viewer
        })
    }


    const getDetail = (id) =>{
        const formData = new FormData();
        formData.append('csTalkId', id);

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            headers: { 
               'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
            },
            data : formData
            };
        axiosInstance2('/csTalk/detail', config)
        .then(function (response){
            let resData = response.data;
            if(resData.code===200) {
                let data = resData.result
                setSelctedList(data)
                console.log(data,'detail')
            }else {
                console.log(resData)
            }
        })
        .catch(function(error) {
            console.log('error',error)
        })
    }

    const [alertModal, setAlertModal] = useState(false)
    const [alertSetting, setAlertSetting] = useState({
        alertTxt : '',
        onConfirm : function() {},
        isDoubleBtn : false,
        btnTxt : 'Close',
        confirmTxt : ''
    })
    const onConfirmHandler = (num,id) =>{

        console.log(id,'"btn-row"')
        // leave editor 
        if(num===1 || num===7) {
            setAlertSetting({
                ...alertSetting,
                alertTxt: ' Click confirm to leave write mode.',
                onConfirm : ()=>{ 
                    setIsWrite(false)
                    setIsModify(false)
                    setAlertModal(false)
                    setContent({
                        title : '',
                        content : '',
                        isPublic : '',
                        attachments : '',
                        csTalkId : ''
                    })
                    clearState()
                    num===7 && setIsWrite(true)
                    num===1 && getDetail(id)
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
                onConfirm : ()=>{ onChangePublic(); setAlertModal(false); clearState() },
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
                onConfirm :  ()=>{setAlertModal(false); clearState()},
                isDoubleBtn : false,
                btnTxt : 'Close',
            })
        }
    }

    const handleClickRow = (e, item) => {
        setFileStore([])
        if((isWrite || isModify) && (content.title !== '' || content.content !=='')) {
            onConfirmHandler(1,item)
            return false
        }else {
            isWrite ? setIsWrite(false) : setIsModify(false)
            getDetail(item)
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

    const onClickAction = (event,id) => {
        const formData = new FormData();
        formData.append('csTalkId', id);

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            headers: { 
               'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
            },
            data : formData
            };
        axiosInstance2('/csTalk/reaction', config)
        .then(function (response){
            let resData = response.data;
            if(resData.code===200) {
                let data = resData.result
                setSelctedList({
                    ...selectedList,
                    reactionState : selectedList.reactionState==="LIKE"?"NONE":"LIKE",
                    likeCount : selectedList.reactionState==="LIKE" ? selectedList.likeCount-1 : selectedList.likeCount+1
                })
            }else {
                console.log(resData)
            }
        })
        .catch(function(error) {
            console.log('error',error)
        })
        
    }

    const [reqData, setReqData] = useState(
        {
            page : 1,
            subsidiary:"",
            view: '',
            search: "",
        }
    )
    const [boardLength, setBoardLength] = useState(0)

    const getList = () =>{ 
        const formData = new FormData();
        
        for (let key in reqData) {
            if (reqData.hasOwnProperty(key)) {
              formData.append(key, reqData[key]);
            }
        }

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            headers: { 
               'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
            },
            data : formData
            };
        axiosInstance2('/csTalk/list', config)
        .then(function (response){
            let resData = response.data;
            if(resData.code===200) {
                let data = resData.result
                setBoardData(data)
               
            }else {
                console.log(resData)
            }
        })
        .catch(function(error) {
            console.log('error',error)
        })
    }
    const setPages = (e) => {
        setCommentPage(e);
        console.log('page ---->', e);
    };

    const [commentPage, setCommentPage] = useState(1)
    const [commentList, setCommentList] = useState([])

    const getComment = () =>{
        const formData = new FormData();
        
        formData.append('page', commentPage);
        formData.append('csTalkId', selectedList.csTalkId);

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            headers: { 
               'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
            },
            data : formData
            };
        axiosInstance2('/csTalk/commentList', config)
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
                console.log('comment',data)
            }else {
                console.log(resData)
            }
        })
        .catch(function(error) {
            console.log('error',error)
        })
    }
 
    const clearState =()=>{
        getList();
        setSelctedList({
            attachments : '',
            subject: '',
            branch : '',
            center : '',
            commentCount : 0,
            content : '',
            createdAt : '',
            csTalkId : '',
            hits : 0,
            isPublic :  0,
            likeCount : 0, 
            parentCsId : '',
            subsidiary : '',
            writerID : '',
            reactionState : '',
            writerName : '',
        })
        setIsWrite(false)
        setIsModify(false)
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


    const onSaveContent = () =>{

        console.log(content,'111111111111111111111111111111111111')

        if (content.title==='' || content.content==='' || content.isPublic==='') {
            
            setAlertSetting({
                ...alertSetting,
                alertTxt : 'Please fill out all the information.',
                isDoubleBtn : false,
                btnTxt : 'Close',
                confirmTxt : ''
            })

            return false;
        }
        else {
            if(isWrite) {
                const formData = new FormData();
                for (let key in content) {
                    if (content.hasOwnProperty(key)) {
                      formData.append(key, content[key]);
                    }
                }
        
                var config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    headers: { 
                       'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
                    },
                    data : formData
                    };
                axiosInstance2('/csTalk/insert', config)
                .then(function (response){
                    let resData = response.data;
                    if(resData.code===200) {
                       setAlertSetting({
                        ...alertSetting,
                        alertTxt : "You've inserted new post.",
                        isDoubleBtn : false,
                        btnTxt : 'Close',
                        confirmTxt : ''
                    })
                       setIsWrite(false)
                       setContent({})
                       getList();
                       clearState()
                    }else {
                        console.log(response,'else')
                    }
                })
                .catch(function(error) {
                    console.log('error',error)
                })  
            }
        }
    }
    const [isModify, setIsModify] = useState(false)

    const onEditMode = () =>{
        setContent({
            ...content,
            title : selectedList.subject,
            content : selectedList.content,
            isPublic : selectedList.isPublic,
            attachments : selectedList.attachments,
            csTalkId : selectedList.csTalkId,
        })
        setIsModify(true)
    }

    useEffect(()=>{
        console.log('radio button test', content.isPublic)
    },[content])
    const onEditContent = () =>{
        if (content.title==='' || content.content==='' || content.isPublic==='') {
            setAlertSetting({
                ...alertSetting,
                alertTxt : "Please fill out all the information.",
                isDoubleBtn : false,
                btnTxt : 'Close',
            })
            return false;
        }
        else {
            if(isModify) {

                console.log('content : ',content)
                const formData = new FormData();
                for (let key in content) {
                    if (content.hasOwnProperty(key)) {
                      formData.append(key, content[key]);
                    }
                }
        
                var config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    headers: { 
                       'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
                    },
                    data : formData
                    };
                axiosInstance2('/csTalk/update', config)
                .then(function (response){
                    let resData = response.data;
                    if(resData.code===200) {
                       setAlertSetting({
                            ...alertSetting,
                            alertTxt : "You've modified your post.",
                            isDoubleBtn : false,
                            btnTxt : 'Close',
                        })

                       setIsModify(false)
                       setContent({})
                       getList();
                       getDetail(content.csTalkId);
                    }else {
                        console.log(resData,'resData')
                    }
                })
                .catch(function(error) {
                    console.log('error',error)
                })  
            }
        }
    }

    const onAddAnswer = () =>{
        setContent({
            ...content,
            csTalkId : selectedList.csTalkId
        })
        setIsWrite(true)
    }

    const [comment, setComment] = useState('') 
    const [subComment, setSubComment] = useState('')  

    const onAddComment =(num, id) => {
        // num = 1 댓글, num = 2 대댓글
        if(num===1 && comment==='') {
            onConfirmHandler(5)
            return false
        }else if(num===2 &&subComment==='') {
            onConfirmHandler(5)
            return false
        }

        const formData = new FormData();

        formData.append('csTalkId', selectedList.csTalkId);
        if(num===1) {
            formData.append('content', comment);
        }
        if(num===2) {
            formData.append('commentId', id);
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
            axiosInstance2('/csTalk/commentInsert', config)
            .then(function (response){
                console.log('cocococomcmcm',response)
                let resData = response.data;
                if(resData.code===200) {
                    // onConfirmHandler(6)
                    num === 1 ? setComment('') : setSubComment('')
                    getDetail(id);
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
        axiosInstance2('/csTalk/commentDelete', config)
        .then(function (response){
            let resData = response.data;
            if(resData.code===200) {
                setAlertSetting({
                    ...alertSetting,
                    alertTxt : "You've deleted comment.",
                    isDoubleBtn : false,
                    btnTxt : 'Close',
                })
                getDetail(id);
                getComment()
                getList()
            }else {
                console.log(resData,'resData')
            }
        })
        .catch(function(error) {
            console.log('error',error)
        })                  
    }
    const onDeletePost = () => {

       
        const formData = new FormData();
        
        formData.append('csTalkId',selectedList.csTalkId)
        console.log(Object.fromEntries(formData),'on delete post')
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            headers: { 
               'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
            },
            data : formData
            };
        axiosInstance2('/csTalk/delete', config)
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
                getList()
            }else {
                console.log(resData)
            }
        })
        .catch(function(error) {
            console.log('error',error)
        })
    }
    
    const onChangePublic = () =>{
        const formData = new FormData();
        
        let id = selectedList.csTalkId
        formData.append('csTalkId',id)

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            headers: { 
               'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
            },
            data : formData
            };
        axiosInstance2('/csTalk/public', config)
        .then(function (response){
            let resData = response.data;
            if(resData.code===200) {
                setAlertSetting({
                    ...alertSetting,
                    alertTxt : "You've changed open status for this post to all.",
                    isDoubleBtn : false,
                    btnTxt : 'Close',
                })

                getDetail(id)
            }else {
                console.log(resData)
            }
        })
        .catch(function(error) {
            console.log('error',error)
        })
    }

    
    useLayoutEffect(()=>{
        getList();   
    },[reqData.page])

   
    useEffect(()=>{
       if(boardData.length===0) {
            setBoardLength(0)
       }
       else {
        let max = boardLength;
        if(reqData.page===1) {
         max = 0
         console.log('ms',max)
         boardData.map((item) =>{
             if(item.rn>max) {
                 console.log(item.rn)
                 max = item.rn;
             }
             setBoardLength(max)
          })
        }
       }
    },[boardData])

 

    const [fileStore, setFileStore] = useState([])

    const onAttachFiles = (e,idx) => {
        console.log('onAttachFiles')
        console.log(e.target.files)
        let copyFile = [...fileStore]
        if(e.target?.files[0]) {
            let formData = new FormData();
            formData.append('fileName',e.target?.files[0])
            // api 연동..
        }
    }

    /** loading 시 animation */
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingComment, setIsLoadingComment] = useState(false)
    
    useEffect(()=>{
        if(selectedList) {
            setIsLoading(true)
            const timeoutId = setTimeout(() => {
                setIsLoading(false);
              }, 500); // 3초 후에 isVisible 값을 false로 변경
          
              return () => clearTimeout(timeoutId) 
        }
        if(selectedList?.attachments!=='') {
            const jsonString = JSON.parse(selectedList.attachments);
            if(jsonString!==null) {
                let copy = [...fileStore,jsonString]
                setFileStore(copy)
            }
        }
        getComment();
        setComment('');
        setCommentPage(1)
    },[selectedList])

    useEffect(()=>{
        getComment()
    },[commentPage]) 

    useEffect(()=>{
        if(isWrite) {
            setSelctedList({
                attachments : '',
                subject: '',
                branch : '',
                center : '',
                commentCount : 0,
                content : '',
                createdAt : '',
                csTalkId : '',
                hits : 0,
                isPublic :  '',
                likeCount : 0, 
                parentCsId : '',
                subsidiary : '',
                writerID : '',
                reactionState : '',
                writerName : '',
            })
        }
    },[isWrite])
    

    return (
        <div className="notice-container cstalk-container">
        <Header />
        <div className="inner-container">
            {/** auth 권한체크로 수정 필요 */}
            <Top auth={1} searchArea={false}/>
            {/** Search Nav */}
            <div>
            <div className="cstalk-nav custom-flex-item" style={user.role!=='LK' ? {justifyContent :'flex-start'} : null}>
                 {/* Subsidiary는 본사 staff만 */}
                 {
                    user.role === 'LK'
                    &&
                    <div className="cstalk-nav-box custom-flex-item custom-align-item">
                        <p>· Subsidiary</p>
                        <SelectBox options={subsidiary} handleChange={handleSelectSubsidiary} />
                    </div>
                }
{/*                 
                <div className="custom-flex-item custom-align-item">
                    <p>· View</p>
                    <SelectBox options={centerOptions} handleChange={handleSelectBox} defaultValue={centerOptions[0]}/>
                </div> */}
                <div className="custom-flex-item custom-align-item">
                    <p>· Search</p>
                    <input type="text" className="cstalk-nav-input" onChange={(e)=>setReqData({...reqData, search:e.target.value})}></input>
                    <div className="search-wrapper" onClick={getList}><img src={Search} alt='search-btn'/></div>
                </div>
                {/* </div> */}
            </div>

            {/** Content Area */}
            <div className="cstalk-contents">
                <div className="cstalk-left">
                <div className="cstalk-count">
                        Total <span className="custom-stress-txt">{boardLength}</span>
                    </div>

                    <ul className="cstalk-custom-board ">
                        {
                            boardData?.map((item,idx)=>{
                                return(
                                    <li key={generateRandomString(idx)} id={`list-item-${item.csTalkId}`} onClick={(e)=>handleClickRow(e,item.csTalkId)} className={selectedList?.csTalkId === item.csTalkId ? 'selected-row cursor-btn':'cursor-btn'}>
                                        <div className="cstalk-subject custom-flex-item custom-txt-align">
                                            <span className="custom-flex-item">{item.level===2 && `[RE]  `}{item.subject}<span className="custom-stress-txt">{item.commentCount!==0 && `( ${item.commentCount} )`}</span><img src={moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss') > now ? New : null} /></span>
                                            {/* <span>{item.writerName}</span> */}
                                        </div>
                                        <div className="etc">
                                                <p>{item.writerID}</p> <p>{moment(item.createdAt).format('YY.M.DD')}</p>
                                            </div>
                                        {/* <span>{item.createdAt}</span > */}
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
                            onChange={setPage} // 페이지 변경을 핸들링하는 함수
                        />
                    }
                    {/* <AgGrid data={boardData} column={column} paging={true} /> */}
                    <div className="write-btn" onClick={()=> isWrite ? onConfirmHandler(1) : isModify ? onConfirmHandler(7,selectedList.csTalkId) : setIsWrite(!isWrite)}><span>Write</span></div>
                </div>
                {
                    isWrite
                    ?
                    <div className="editor-wrapper">
                    <EditorModify data={content} setData={setContent} onSave={onSaveContent} onClose={()=>(content.title !=='' || content.content !=='')? onConfirmHandler(1) : setIsWrite(false)} onAttach={onAttachFiles} range />
                    </div>
                    :
                    !isWrite && selectedList.csTalkId!=='' && !isModify
                    ?
                    <div className="editor-wrapper">
                        <div className={`cstalk-right ${isLoading ? 'loadingOpacity':''}`}>
                    <div className="cstalk-right-top">
                        <p>{selectedList.subject}</p>
                        <div className="custom-flex-item selected-info">
                            <span>Writer : {selectedList.writerName}</span>
                            <span>Date : {moment(selectedList.createdAt).format('YYYY-M-DD')}</span>
                        </div>
                        {
                            fileStore.length !== 0 &&
                            fileStore.map((file,idx)=>{
                                return (
                                    <div className="custom-flex-item" key={generateRandomString(idx)}>
                                        <img src={Attachment} alt="attachment"/> 
                                        <span className="custom-self-align">Attachment</span>
                                        <span className="custom-flex-item cstalk-attach-down ">
                                            <span className="custom-self-align">{` (${idx+1}) `}</span><p className="custom-hyphen custom-self-align ">-</p><span className="cstalk-attach custom-flex-item"><p>{file.fileName}</p><img src={Download} alt='download_attachment'/></span>
                                        </span>
                                    </div> 
                                )
                            })
                        }  
                        <div className="user-action custom-flex-item ">
                            <span className="cstalk-like custom-flex-item " onClick={(e)=>onClickAction(e,selectedList.csTalkId)}><img src={selectedList.reactionState!=='NONE'?Liked : Like} alt="btn_like" className="cursor-btn"/><p>{selectedList.likeCount}</p></span>   
                            
                        </div> 
                    </div>
                    <div className="cstalk-right-middle">
                       <div className="ck-viewer"> <Viewer content={selectedList.content}/></div>
                        <div className="setting-viewer custom-flex-item">
                            { 
                                selectedList.writerID===user.id
                                &&
                                <div style={{marginRight:'auto'}}><button onClick={()=>onConfirmHandler(3)} className="custom-flex-item custom-align-item ">Delete</button></div>
                            }
                            {
                               ( selectedList.isPublic !== 1 && user.subsidiary==='LGEKR' ) &&
                                <div><button className="custom-flex-item custom-align-item" onClick={()=>onConfirmHandler(2)}>Allow Views</button></div>
                            }
                            {
                                selectedList.writerID===user.id
                                &&
                                <div><button className="custom-flex-item custom-align-item" onClick={onEditMode}>Modify</button></div>
                            }
                           {
                            selectedList.writerID!=='ID_LK' &&
                            <div><button className="custom-flex-item custom-align-item" onClick={onAddAnswer}>Answer</button></div>
                           }
                        </div>
                    </div>
                    <div className="cstalk-right-bottom">
                        <div className="cstalk-comment-wrapper">
                        <span>Comments</span><span className="comment-cnt-title">total <p className="custom-stress-txt comment-cnt">{selectedList?.commentCount}</p></span>
                            <div className="custom-justify-between">
                                <div className="comment-input">
                                    <span>Writer : {user.name}</span>
                                    <textarea value={comment} onChange={(e)=>setComment(e.target.value)}/>
                                </div>
                                <button onClick={()=>onAddComment(1)}>Write</button>
                            </div>
                        </div>
                        <div className="cstalk-comment-list">
                            <ul>
                                {
                                    commentList?.map((comment,idx)=>{
                                        return(
                                            <li key={generateRandomString(idx)}>
                                                <div className="comment-top custom-flex-item custom-justify-between">
                                                    <div>
                                                        <span>{comment.writerName}</span>
                                                        <span>{moment(comment.createdAt).format('YYYY-MM-DD')}</span>
                                                    </div>
                                                    <span className="custom-flex-item">
                                                        {
                                                            comment.writerID===user.id &&
                                                            <p className="cursor-btn" onClick={()=>onConfirmHandler(4,comment.commentId)}>Delete</p>
                                                        }
                                                         <p className="cursor-btn" onClick={()=>{openCommentInput(idx); setSubComment('')}}>Answer</p>
                                                    </span>
                                                </div>
                                                <div className="comment-middle">{comment.content?.slice(0,250)}{comment.content?.length>250 && <span className="custom-stress-txt">...More</span>}</div>
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
                                                                                        <span className="custom-flex-item">
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
                                onChange={setPages} // 페이지 변경을 핸들링하는 함수
                            />
                            }
                        </div>
                    </div>
                </div>
                    </div>
                    :
                    isModify
                    ?
                    <EditorModify data={content} setData={setContent} range onSave={onEditContent}  onClose={()=>(content.title !=='' || content.content !=='')? onConfirmHandler(1) : setIsModify(false)} onDelete={()=>onConfirmHandler(3)}/>
                    :
                    <div className="cstalk-right custom-flex-item custom-align-item custom-justify-center">
                        <p>If you select a list, you can see the contents</p>
                    </div>
                }
                 {/* <button style={{position:'absolute'}} onClick={()=>setFavoriteModal(true)}>test btn</button> */}
            </div>

            <Zendesk />

            {
                alertModal
                &&
                <Alert alertTxt={alertSetting.alertTxt} onClose={()=>setAlertModal(false)} onConfirm={alertSetting.onConfirm} twoBtn={alertSetting.isDoubleBtn} btnTxt={alertSetting.btnTxt}/>
            }
            </div>
        </div>
        <Tab />
        </div>
    )
}

export default CStalk


import { useContext, useState, useEffect, useLayoutEffect } from "react"
import { styled } from "styled-components"

import moment from "moment"
import Pagination from "react-js-pagination"

import Header from "../../components/Header"
import Top from "../../components/Top"
import Zendesk from "../../components/Zendesk"
import SelectBox from '../../components/SelectBox'
import Viewer from "../../components/Viewer"
import MaximalView from "../Common/MaximalView"
import EditorModify from "../../components/EditorModify"
import Tab from "../../components/Tab"
import Alert from "../../components/Alert"

import { axiosInstance2, generateRandomString,downloadAttachment, convertFileSize } from "../../utils/CommonFunction"

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
import Close from '../../assets/svgs/icon_close2.svg'
import Maximize from '../../assets/svgs/icon_screen.svg'

import {UserContext} from '../../hooks/UserContext'


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

   

    /** 페이징 관련 ▼ ============================================================= */
    const [activePage, setActivePage] = useState(1); // 현재 페이지
    const [itemsPerPage] = useState(16); // 페이지당 아이템 갯수

    const [subsidiary, setSubsidiary ] = useState([
        {value:'',label:'All'}, 
        {value:'LGEAI',label:'LGEAI'}, 
        {value:'LGECI',label:'LGECI'}, 
        {value:'LGEES',label:'LGEES'}, 
        {value:'LGEJP',label:'LGEJP'}, 
        {value:'LGEKR',label:'LGEKR'},
        {value:'LGEMC',label:'LGEMC'},
    ])

    const [maximizing, setMaxmizing] = useState(false)
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
        isPublic : null,
        attachments : null,
        csTalkId : ''
    });

    const [selectedList, setSelectedList] = useState({
        attachments : '',
        subject: '',
        branch : '',
        center : '',
        commentCount : 0,
        content : '',
        createdAt : '',
        csTalkId : '',
        hits : 0,
        isPublic :  null,
        likeCount : 0, 
        parentCsId : '',
        subsidiary : '',
        writerID : '',
        reactionState : '',
        writerName : '',
    });

    // 유저 정보로 권한 체크 추가
    useEffect(()=>{
        console.log(user)
        let role = user.role;
        setAuth({
            ...auth,
            isViewer : true,
            isWriter : true
        })
        // if(role==='LK') {
        //   setAuth({
        //     ...auth,
        //     isViewer : true
        //   })
        // }else if(role==='SA') {
        //   setAuth({
        //     ...auth,
        //     isViewer : true,
        //     isWriter : selectedList.writerID === user.id ? true : false
        //   })
        // }else {
        //   alert('No right to Access')
        //   document.location.href='/login';
        // }
      },[selectedList.csTalkId])

      const [openRight, setOpenRight] = useState(false);

      

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

        console.log(Object.fromEntries(formData))
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
                setSelectedList(data)
                console.log(data,'detail')
            }else {
                console.log(response)
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
        console.log('onConfirmHandler',isWrite)

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
                        isPublic : null,
                        attachments : '',
                        csTalkId : ''
                    })
                    clearState()
                    num===7 && setIsWrite(false)
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
        console.log('handle clikc edf smflknsdklf', item)
        setFileStore([])
        if((isWrite || isModify) && (content.title !== '' || content.content !=='')) {
            onConfirmHandler(1,item)
            return false
        }else {
            isWrite ? setIsWrite(false) : setIsModify(false)
            getDetail(item.csTalkId)
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
                setSelectedList({
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
        .then(function (res){
            let resData = res.data;
            console.log('cs',res)
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
        setSelectedList({
            attachments : '',
            subject: '',
            branch : '',
            center : '',
            commentCount : 0,
            content : '',
            createdAt : '',
            csTalkId : '',
            hits : 0,
            isPublic :  null,
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

        if (content.title==='' || content.content==='' || content.isPublic===null) {
            
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
                       setContent({
                        title : selectedList.subject,
                        content : selectedList.content,
                        isPublic : selectedList.isPublic,
                        attachments : selectedList.attachments,
                        csTalkId : selectedList.csTalkId,
                       })
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

    const onEditContent = () =>{
        if (content.title==='' || content.content==='' || content.isPublic===null) {
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
                       setContent({
                        title : selectedList.subject,
                        content : selectedList.content,
                        isPublic : selectedList.isPublic,
                        attachments : selectedList.attachments,
                        csTalkId : selectedList.csTalkId,
                       })
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
        console.log('onAddComment',num,id)
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
                let resData = response.data;
                if(resData.code===200) {
                    // onConfirmHandler(6)
                    num === 1 ? setComment('') : setSubComment('')
                }else {
                    console.log(resData,'comment list')
                }
            })
            .catch(function(error) {
                console.log('error',error)
            })  
    }

    useEffect(()=>{
       
        if(selectedList && comment==='') {
            getList();
            getDetail(selectedList.csTalkIdid);
            setSelectedList({
                ...selectedList,
                commentCount : selectedList.commentCount+1
            })
            getComment()
            
        }
    },[comment]) 

    useEffect(()=>{
        console.log('content',content)
    },[content])

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

    

    /** loading 시 animation */
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingComment, setIsLoadingComment] = useState(false)
    
    useEffect(()=>{
        setComment('');
        setCommentPage(1)

        setFileStore([])
        if(selectedList?.attachments!=='') {
          
            const jsonString = JSON.parse(selectedList.attachments);
            if(jsonString!==null) {
                let copy = [...jsonString]
                setFileStore(copy)
            }
        }
        if(selectedList) {
            setIsLoading(true)
            getComment();
            const timeoutId = setTimeout(() => {
                setIsLoading(false);
              }, 500); // 3초 후에 isVisible 값을 false로 변경
          
              return () => clearTimeout(timeoutId) 
        }
       
       
    },[selectedList.csTalkId])

    useEffect(()=>{
        console.log('file', fileStore[0]?.fileName)
    },[fileStore])
    useEffect(()=>{
        
        getComment()
        setIsLoadingComment(true)
        const timeoutId = setTimeout(() => {
            setIsLoadingComment(false);
            }, 500); // 3초 후에 isVisible 값을 false로 변경
        
            return () => clearTimeout(timeoutId)
    },[commentPage]) 

    useEffect(()=>{
        if(selectedList.csTalkId!=='' || isWrite || isModify) {
            // if(selectedList.csTalkId!=='' || openCategory || openFaqCreator) {
            setOpenRight(true)
        }else {
            setOpenRight(false)
        }
      },[selectedList.csTalkId,isWrite,isModify])

    useEffect(()=>{
        if(isWrite) {
            setSelectedList({
                attachments : '',
                subject: '',
                branch : '',
                center : '',
                commentCount : 0,
                content : '',
                createdAt : '',
                csTalkId : '',
                hits : 0,
                isPublic :  null,
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
        <Style openright={openRight} iswrite={isWrite || isModify}>
        <div className="notice-container cstalk-container">
        <Header />
        <div className="inner-container">
            {/** auth 권한체크로 수정 필요 */}
            <Top searchArea={true} auth={auth.isWriter} options={subsidiary} handleChange={handleSelectBox} onChange={(e)=>setReqData({...reqData, search:e.target.value})} onClick={getList}/>
            {/** Search Nav */}
            <div>
            {/* <div className="cstalk-nav custom-flex-item custom-justify-between" style={user.role!=='LK' ? {justifyContent :'flex-start'} : null}>
                <div className="custom-flex-item custom-align-item">
                    <p>· Search</p>
                    <input type="text" className="cstalk-nav-input" onChange={(e)=>setReqData({...reqData, search:e.target.value})}></input>
                    <div className="search-wrapper" onClick={getList}><img src={Search} alt='search-btn'/></div>
                </div>
            </div> */}

            {/** Content Area */}
            <div className="cstalk-contents ">
                <div className="cstalk-left">
                <div className="cstalk-count">
                        Total <span className="custom-stress-txt">{boardLength}</span>
                    </div>
                    <div className="board-menu">
                        <span className="col-1" style={selectedList?.csTalkId ? {width: "10%"} : null}>No.</span>
                        <span className="col-3">Title</span>
                        <span className={`col-4 ${openRight ? 'custom-hide-item' : ''}`}>Writer</span>
                        <span className={`col-5 ${openRight ? 'custom-hide-item' : ''}`}>Recommand</span>
                        <span className="col-6" style={selectedList?.csTalkId ? {width: "15%"} : null}>Count</span>
                        <span className="col-7" style={selectedList?.csTalkId ? {width: "15%"} : null}>Date</span>
                    </div>

                    <div className="custom-scroll-area">
                    {/* <ul className="board-table custom-align-item custom-flex-item custom-sticky-area">
                        <li className="col-1">No.</li>
                        <li className="col-3">Title</li>
                        <li className={`col-4 ${openRight ? 'custom-hide-item' : ''}`}>Writer</li>
                        <li className={`col-5 ${openRight ? 'custom-hide-item' : ''}`}>Recommand</li>
                        <li className="col-6">Count</li>
                        <li className="col-7">Date</li>
                    </ul> */}
                    {
                            boardData && boardData.length > 0 && boardData.map((item,idx)=>{
                                return(
                                   <div className="board-list custom-flex-item custom-align-item cursor-btn" key={generateRandomString(idx)} onClick={(e)=>handleClickRow(e,item)} >
                                        <ul className="col-1" style={selectedList?.csTalkId ? {width: "10%"} : null}>
                                            <li  id={`list-item-${idx+1}`}>
                                                <span>{String((activePage-1)*16+(idx+1)).padStart(3, '0')}</span>
                                            </li>
                                        </ul>
                                       
                                        <ul className="col-3" >
                                            <li id={`list-item-${idx+1}`}>
                                                {
                                                    item.parentCsId!==null
                                                    &&
                                                    <span className="custom-stress-txt">[RE]</span>
                                                }
                                                <span className="board-max-length">{!openRight ? item?.subject.slice(0,82) : item?.subject.slice(0,60)}{!openRight ? item.subject?.length > 82 && '...' : item.subject?.length >60 && '...'}</span><img src={moment(item?.createdAt).format('YYYY-MM-DD HH:mm:ss') > now ? New : null} />
                                                {
                                                    item.commentCount!==0
                                                    &&
                                                    <span className="custom-stress-txt">{`(${item.commentCount})`}</span>
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
                                        <ul className="col-6" style={selectedList?.csTalkId ? {width: "15%"} : null}>
                                            <li  id={`list-item-${idx+1}`}>
                                                <span>{item?.hits}</span>
                                            </li>
                                        </ul>
                                        <ul className="col-7" style={selectedList?.csTalkId ? {width: "15%"} : null}>
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
                            onChange={setPage} // 페이지 변경을 핸들링하는 함수
                            hideFirstLastPages={true}
                        />
                    }
                    <div className="write-btn" onClick={()=> !isWrite ? setIsWrite(true) : isModify ? onConfirmHandler(7,selectedList.csTalkId) : isWrite ? onConfirmHandler(1):null}><span>Write</span></div>
                </div>
                {
                    isWrite
                    ?
                    <div className="editor-wrapper">
                    <EditorModify data={content} isWriter={isWrite} setData={setContent} onSave={onSaveContent} onClose={()=>(content.title !=='' || content.content !=='')? onConfirmHandler(1) : (setIsWrite(false), setOpenRight(false))} range />
                    </div>
                    :
                    !isWrite && selectedList.csTalkId!=='' && !isModify
                    ?
                    // <div className="editor-wrapper">
                    <div className={`cstalk-right custom-flex-item ${isLoading ? 'loadingOpacity':''}`}>
                    
                    <div className="board-view-top">
                            <div className="board-btn-area custom-flex-item custom-align-item custom-justify-between">
                            <button className="board-minimize-btn" onClick={()=>{setMaxmizing(true)}}>
                                <img src={Maximize} alt="minimize-btn" className="screen-icon"/> Full Screen
                            </button> 
                            <img src={Close} alt="close-btn" onClick={clearState} />
                        </div>
                        <p className="board-title">{selectedList.subject}</p>
                        <p className="board-title-detail">
                            <span>Writer</span> : {selectedList.writerName} &nbsp;
                            <span>Date</span> : {moment(selectedList.createdAt).format(`'DD.MM.YY`)}
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
                                                <span className="board-attach-down" onClick={() => downloadAttachment(file.uploadPath)}> 
                                                <img src={Download} alt="attachment-download"/> </span>
                                            </span>
                                        )
                                    })
                                }  
                                </div>
                            </span>
                        </div>
                    </div>

                    <div className="board-view-middle">

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
                            selectedList.writerID!==user.id &&
                            <div><button className="custom-flex-item custom-align-item" onClick={onAddAnswer}>Answer</button></div>
                           }
                        </div>
                    </div>
                    <div className="cstalk-right-bottom">
                    <div className="user-action custom-flex-item ">
                            <span className="cstalk-like custom-flex-item " onClick={(e)=>onClickAction(e,selectedList.csTalkId)}><img src={selectedList.reactionState!=='NONE'?Liked : Like} alt="btn_like" className="cursor-btn"/><p>{selectedList.likeCount}</p></span>   
                        </div> 
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
                                                        <span>{moment(comment.createdAt).format('MM.DD.YY')}</span>
                                                    </div>
                                                    <span className="custom-flex-item">
                                                        {
                                                            comment.writerID===user.id &&
                                                            <p className="cursor-btn comment-btn" onClick={()=>onConfirmHandler(4,comment.commentId)}>Delete</p>
                                                        }
                                                         <p className="cursor-btn comment-btn" onClick={()=>{openCommentInput(idx); setSubComment('')}}>Answer</p>
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
                                onChange={setPages} // 페이지 변경을 핸들링하는 함수
                                hideFirstLastPages={true}
                                />
                            }
                        </div>
                    </div>
                    
                    </div>
                </div>
                    // {/* </div> */}
                    :
                    isModify
                    ?
                    <EditorModify data={content} setData={setContent} range onSave={onEditContent}  onClose={()=>(content.title !=='' || content.content !=='')? onConfirmHandler(1) : setIsModify(false)} onDelete={()=>onConfirmHandler(3)} key={selectedList.csTalkId}/>
                    :
                    null
                }
            </div>
            {
                maximizing 
                &&
                <MaximalView data={selectedList} onClose={()=>(setMaxmizing(false), clearState())} onMinimizing={()=>setMaxmizing(false)}/>
            }
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
        </Style>
    )
}

export default CStalk

const Style = styled.div`
    .cstalk-left {
        width: ${props => (props.openright ? '49%' : '100%')} !important; 
    }
    .cstalk-left .cstalk-custom-board li {
        padding : ${props => (props.openright ? '10px 30px;':'17px 30px')}
    }

    .board-list {
        // padding : ${props => (props.openright ? '17px 30px;':'10px 30px;')}
        max-height :  ${props => (props.openright ? '64px;':'42px;')}
        height :  ${props => (props.openright ? '64px;':'42px;')}
    }
    .cstalk-contents{
        .editor-border {
            overflow: ${props => (props.iswrite ? 'auto':'hidden !important;')}
        }
        .cstalk-editor {
          overflow: auto;
          padding-top: 39px !important;
        max-height: 812px;
        }
    
        .cstalk-editor::-webkit-scrollbar {
            width: 8px;
          }
          
          .cstalk-editor::-webkit-scrollbar-thumb {
            background-color: #888;
            border-radius: 4px;
          }
          
          .cstalk-editor::-webkit-scrollbar-track {
            background-color: #f1f1f1;
          }  
          
    }
`
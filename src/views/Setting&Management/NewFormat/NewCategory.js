import React, {useState, useEffect, useRef} from "react";
import { styled } from "styled-components";
import Close from '../../../assets/svgs/icon_close.svg'
import Frame from '../../../assets/svgs/icon_editor_frame.svg'
import MoreIcon from '../../../assets/svgs/icon_more.svg';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Alert from "../../../components/Alert";
import { generateRandomString, axiosInstance, axiosJsonInstance } from "../../../utils/CommonFunction";
import SelectBox from "../../../components/SelectBox";

import Arrow from '../../../assets/svgs/icon_arrow.svg'
import FormEditor from "./Editor/FormEditor";
function NewCategory(props) {


    const { item,parentCategory, data, setData, onSave, onClose,isLower} = props

    console.log('parent category : ',parentCategory)
    const [content, setContent] = useState(data);
    const [attachments, setAttachments] = useState([
        {
            fileName: '',
            filePath : '',
        }
    ])

    const [openIcon, setOpenIcon] = useState(false)       // load icon from server
    const [insertIcon, setInsertIcon] = useState(false)   // upload icon from user pc
    const handleChange = (event) => {
    let value = event.value;
    console.log(value)
    // setReqData({
    //     ...reqData,
    //  useYn: value
    // })
    }
    const [reqData, setReqData] = useState({
        categoryNm:'',
        categoryIcon : '',
        parentCategoryId : '',
        categoryIconPath : '',
        categoryIconFileNM : '',
        categoryIconId : '',        
    })

    const clearState = () => {
        
        setReqData({
            categoryNm:'',
            categoryIcon : '',
            parentCategoryId : '',
            categoryIconPath : '',
            categoryIconFileNM : '',
        })
        setAlertSetting({
            ...alertSetting,
            alertTxt: 'Successfully inserted new catagory',
            onClose : () => (
                onClose(),
                setAlertModal(false)
            )
        })
    }
    const [alertModal, setAlertModal] = useState(false)
    const [alertSetting, setAlertSetting] = useState({
        alertTxt : '',
        onConfirm : function() {},
        isDoubleBtn : false,
        btnTxt : 'Close',
        confirmTxt : '',
        onClose : ()=>setAlertModal(false)
    })

    const onCheckInput = e =>{ 
        let value = e.target.value;
        if (value.length <= 100) {
            setReqData({
                ...reqData,
                categoryNm : value
            })
        }else {
            setAlertSetting({
                ...alertSetting,
                alertTxt : 'Up to 100 characters are allowed.'
            })
        }
    }
    const onStopInput = () => {
        setData(content)
    }

    const onSelectIcon = (item) => {
        setReqData({
            ...reqData,
            categoryIcon :item.categoryIconId,
            categoryIconFileNM : item.categoryIconFileNM,
            categoryIconPath : item.categoryIconPath
    })
        }
    const onDeleteIcon = () => {
        setReqData({
            ...reqData,
            categoryIcon :'',
            categoryIconFileNM : '',
            categoryIconPath : ''
    })
    }

    useEffect(()=>{
        setOpenIcon(false)
    },[reqData])

    useEffect(()=>{
        setReqData({
            ...reqData,
            parentCategoryId : parentCategory.categoryId
        })
       
    },[])

        const addNewCategory = () =>{
            
        if(reqData.categoryIcon==='' && reqData.categoryIconFileNM==='') {
            setAlertSetting({
                ...alertSetting,
            alertTxt:'Please select or attach icon file.'
            })
            return false
        }else if( reqData.categoryNm==='') {
            setAlertSetting({
                ...alertSetting,
            alertTxt:'You should input all the information.'
            })
            return false
        }

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
                headers: { 
                'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_SUBSIDIARY_ADMIN,
                },
            };

        let formdata = new FormData();
        for (let key in reqData) {
            if (reqData.hasOwnProperty(key)) {
                if(key !== 'categoryIconPath' && key!=='categoryIconFileNM') {
                    formdata.append(key, reqData[key]);
                }
        }
        }
        axiosInstance.post('/faqCa/insert', formdata, config).then(res => {
        let resData = res.data;
        if (resData.code === 500) {
            setAlertSetting({
                ...alertSetting,
                alertTxt : resData.msg
            })
        } else if(resData.code === 200 ){
            clearState()
        } 
    }).catch(error => {
            setAlertSetting({
                ...alertSetting,
            alertTxt : 'Fail to upload file.'
            })
        console.log(error);
    })
        }
    const updateFile = (idx, file) => {
        const copyFiles = [...attachments];
        const updateFile = copyFiles[idx];
        updateFile.fileName = file.fileName;
        updateFile.uploadPath = file.uploadPath;

        setContent({ ...content, attachments: JSON.stringify(copyFiles)})
    };
   
    useEffect(()=>{
        if(!alertModal) {
            setAlertSetting({
                ...alertSetting,
                alertTxt : '',
                onConfirm : function() {},
                isDoubleBtn : false,
                btnTxt : 'Close',
                confirmTxt : '',
                onClose : ()=>setAlertModal(false)
            })
        }
    },[alertModal])

    useEffect(()=>{
        if(alertSetting.alertTxt!==''){
            setAlertModal(true)
        }
    },[alertSetting])

    const SelectIcon = props =>{

        const popupRef = useRef(null)
        const {onCloseIcon} =props;

        const [iconList, setIconList] = useState([]);
        const getCategoyList = () =>{

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                headers: { 
                   'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_SUBSIDIARY_ADMIN,
                },
                };
            axiosInstance('/faqCa/iconList', config)
            .then(function (response){
                let resData = response.data;
                if(resData.code===200) {
                    let data = resData.result
                    setIconList(data);
                }else {
                    console.log(resData)
                }
            })
            .catch(function(error) {
                console.log('error',error)
            })
        }

        const handleOutsideClick = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                onCloseIcon()
            }
          };
        useEffect(() => {
            getCategoyList()
        },[])

        useEffect(() => {
            document.addEventListener("mousedown", handleOutsideClick);
            return () => {
              document.removeEventListener("mousedown", handleOutsideClick);
            };
          }, []);

        return(
            <div className="popup" ref={popupRef}>
                <div className="popup-top custom-flex-item custom-justify-between">
                    <p>Icon select</p><img src={Close} alt="close-btn" onClick={onCloseIcon}/>
                </div>
               <ul className="custom-flex-item select-icon">
                {
                    iconList?.map((item,idx) => {
                        return(
                            <li key={generateRandomString(idx)} onClick={()=>onSelectIcon(item)}><img src={process.env.REACT_APP_DOWN_URL+'/'+item.categoryIconPath} alt="category-icons"/></li>
                        )
                    })
                }
               </ul>
            </div>
        )
    }
    return (
        <>
        <div className="faq-setting-new custom-flex-item">
            <div className="content-top custom-flex-item custom-align-item">
                <img src={Frame}/>
                <span>Add New Category</span>
                <div onClick={onClose}><img src={Close} alt="close_btn"/> </div>               
            </div>
            <div className="content-middle setting-middle">

            {
                 isLower && parentCategory.categoryNm !== '' && 
                 <div className="write-row custom-flex-item">
                 <div className="left"> <p>· Parent categoryName</p> </div>
                 <div className="right"> 
                 <input 
                 type="text" 
                 className="category-subject custom-invalid-input" 
                 name="category" 
                 value={parentCategory.categoryNm}
                 readOnly
                 />
                 </div>
             </div>
            }

            <div className="write-row custom-flex-item">
                <div className="left"> <p>· Category Name</p> </div>
                <div className="right"> 
                    <input 
                    type="text" 
                    className="category-subject"
                    name="subject" 
                    value={reqData.categoryNm}
                    onChange={(e)=>{onCheckInput(e)}}
                    onBlur={()=>onStopInput()} 
                    >
                    </input> 
                </div> 
            </div>

            <div className="write-row custom-flex-item">
                <div className="left"> <p>· Icon</p> </div>
                <div className="right file-upload custom-flex-item"> 
                   <div className="icon-wrapper custom-flex-item custom-justify-center">{reqData.categoryIconPath !== '' ? <img src={process.env.REACT_APP_DOWN_URL+'/'+reqData.categoryIconPath} alt="icon_img"/>:null}</div>
                   <div className="custom-flex-item custom-self-align"> 
                   <button id="file-add-icon" style={{display:'none'}} onClick={()=>reqData.categoryIcon===''? setOpenIcon(true):onDeleteIcon()}></button>
                    <label className="custom-flex-item custom-justify-center custom-align-item custom-stress-txt" htmlFor="file-add-icon" >{`${reqData.categoryIcon===''? 'Select':'Delete'}`}</label>
                    <button id="file-upload-icon" style={{display:'none'}} onClick={()=>setInsertIcon(!insertIcon)}></button>
                    <label className="custom-flex-item custom-justify-center custom-align-item custom-white-btn" htmlFor="file-upload-icon" >+ Add</label>
                  
                    {
                        openIcon &&
                        <SelectIcon onCloseIcon={()=>setOpenIcon(false)}/> 
                    }
                    {/* <button id="file-delete-btn" style={{display:'none'}} onClick={()=>deleteRow()}></button>
                    <label className="custom-flex-item custom-justify-center custom-align-item custom-stress-txt" htmlFor="file-delete-btn" >Delete</label> */}
                    </div>
                   
                </div>
                
            </div>
            
                {
                    insertIcon &&
                    <div className="write-row custom-flex-item">
                    <div className="left"><p>· Add Icon</p></div>
                    <div className="right custom-flex-item">
                    <input className="category-subject custom-invalid-input" defaultValue={reqData.categoryIconFileNM} readOnly/>
                   <input 
                        type="file" 
                        className="file-select-btn" 
                        style={{display: "none"}} 
                        id='file-select-btn'
                        onChange={(e)=>{
                            let file = e.target?.files[0];
                            if(file.size > 1024 * 1024 * 20) {
                                setAlertSetting({
                                    ...alertSetting,
                                    alertTxt:'Only files of 20MB or less can be attached.'
                                })
                                return false;
                            }
                            const allowedFileTypes = [
                                'image/svg+xml',
                                'image/png',
                                'image/jpeg',
                            ];
                            if(!allowedFileTypes.includes(file.type)) {
                                setAlertSetting({
                                    ...alertSetting,
                                    alertTxt:'Attached files can only be in SVG, JPEG and PNG formats.'
                                })
                                return false;
                            }
                            let formdata = new FormData();
                            formdata.append("uploadFile", file);
                            // 아이콘 업로드 API 호출
                            const config = { // axios header
                                maxBodyLength: Infinity,
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                    'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_SUBSIDIARY_ADMIN,
                                }
                            }
                            axiosInstance.post('faqCa/iconUpload', formdata, config).then(res => {
                                let resData = res.data;
                                
                                if (resData.code === 200) {
                                    setReqData({
                                        ...reqData,
                                        categoryIconFileNM : file.name,
                                        categoryIcon : resData.result.categoryIconId,
                                    })
                                   
                                } else {
                                    console.log(resData)
                                    setAlertSetting({
                                        ...alertSetting,
                                        alertTxt : resData.msg
                                    })
                                }
                            }).catch(error => {
                                setAlertSetting({
                                    ...alertSetting,
                                    alertTxt : 'Fail to upload file.'
                                })
                                console.log(error);
                            })
                            
                    }}
                    />   
                    <input
                    type="button" 
                    id="file-delete-btn"
                    onClick={()=>onDeleteIcon()}
                    style={{display:'none'}}
                    />
                    <label className="custom-flex-item custom-justify-center custom-align-item custom-stress-txt" htmlFor={reqData.categoryIconFileNM==='' ?'file-select-btn' : 'file-delete-btn'} id="add-btn">{reqData.categoryIconFileNM==='' ?'Add Icon' : 'Delete'} </label>
                    </div>
                </div>
                }
        </div>
        <div className="btn-row custom-flex-item custom-justify-center" >
                <button className="btn-black" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn-red" onClick={addNewCategory}>Save</button>
        </div>
        </div>
        {
            alertModal 
            &&
            <Alert alertTxt={alertSetting.alertTxt} onClose={()=>alertSetting.onClose()} btnTxt={alertSetting.btnTxt} />
        }
        </>
    )
}
export default NewCategory

const Style = styled.div`
    #list-item-${props=>props.selectId} {
        background : #FAF1F4; color : #BB0841; 
    }
    .faq-left {
        width: ${props => (props.openRight ? '49%' : '100%')};
    }
    
`
import React, {useState, useEffect, useRef} from "react";
import { styled } from "styled-components";
import Close from '../../../assets/svgs/icon_close.svg'
import Frame from '../../../assets/svgs/icon_editor_frame.svg'
import MoreIcon from '../../../assets/svgs/icon_more.svg';
import EditorModify from "../../../components/EditorModify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Alert from "../../../components/Alert";
import { generateRandomString, axiosInstance } from "../../../utils/CommonFunction";
import SelectBox from "../../../components/SelectBox";

import Arrow from '../../../assets/svgs/icon_arrow.svg'
import FormEditor from "./Editor/FormEditor";
function NewCategory(props) {


    const { period, data, setData, range, onSave, onClose, onDelete, onAttach} = props

    const [content, setContent] = useState(data);
    const [attachments, setAttachments] = useState([
        {
            fileName: '',
            filePath : '',
        }
    ])
    const options = [
    {value:'TOP1',label:'TOP1'}, 
    {value:'TOP2',label:'TOP2'}, 
    {value:'TOP3',label:'TOP3'}, 
    {value:'TOP4',label:'TOP4'}, 
    {value:'TOP5',label:'TOP5'}, 
    ]
    const [openIcon, setOpenIcon] = useState(false)
    const handleChange = (event) => {
    let value = event.value;
    console.log(value)
    // setReqData({
    //     ...reqData,
    //  useYn: value
    // })
    }

    const [alertModal, setAlertModal] = useState(false)
    const [alertSetting, setAlertSetting] = useState({
        alertTxt : '',
        onConfirm : function() {},
        isDoubleBtn : false,
        btnTxt : 'Close',
        confirmTxt : ''
    })

    const onCheckInput = e =>{ 
        let value = e.target.value;
        if (value.length <= 100) {
            setContent({
                ...content,
                title : value
            })
        }else {
            setAlertSetting({
                ...alertSetting,
                alertTxt : 'Up to 100 characters are allowed.'
            })
        }
    }
    const onStopInput = () => {
        console.log('onStopInput')
        setData(content)
    }
    const addRow = () =>{

        if(attachments.length < 5) {
            const newObj = {
                fileName: '',
                filePath : '',
            }
            const arr = [...attachments,newObj]
            setAttachments(arr)
        }else {
            setAlertSetting({
                ...alertSetting,
                alertTxt: 'Up to 5 file attachments are allowed.'
            })
        }
        
    }
    const deleteRow = (idx) => {
        if(attachments.length > 1) {
            setAttachments(prevArray => {
                const newArray = [...prevArray];
                newArray.splice(idx, 1);
                return newArray;
            })
        } 
        else {
            setAlertSetting({
                ...alertSetting,
                alertTxt : 'At least one attachment is required.'
            })
        }
    }
    const updateFile = (idx, file) => {
        console.log('########## updateFile ###########', idx, file)

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
                confirmTxt : ''
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
                   'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
                },
                };
            axiosInstance('/faqCa/iconList', config)
            .then(function (response){
                let resData = response.data;
                console.log(resData,'dddd')
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
               <ul className="custom-flex-item">
                {
                    iconList?.map((item,idx) => {
                        return(
                            <li key={generateRandomString(idx)}><img src={process.env.REACT_APP_DOWN_URL+'/'+item.categoryIconPath} alt="category-icons"/></li>
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
            
            <div className="write-row custom-flex-item">
                <div className="left"> <p>· Parent categoryName</p> </div>
                <div className="right"> 
                <input 
                type="text" 
                className="category-subject custom-invalid-input" 
                name="category" 
                value='Hold'
                readOnly
                />
                </div>
            </div>

            <div className="write-row custom-flex-item">
                <div className="left"> <p>· Category Name</p> </div>
                <div className="right"> 
                    <input 
                    type="text" 
                    className="category-subject"
                    name="subject" 
                    value={content.title}
                    onChange={(e)=>{onCheckInput(e)}}
                    onBlur={()=>onStopInput()} 
                    >
                    </input> 
                </div> 
            </div>

            <div className="write-row custom-flex-item">
                <div className="left"> <p>· Icon</p> </div>
                <div className="right file-upload custom-flex-item"> 
                   <div className="icon-wrapper custom-flex-item custom-justify-center"><img src={Arrow} alt="icon_img"/></div>
                   <div className="custom-flex-item"> 
                   <button id="file-add-icon" style={{display:'none'}} onClick={()=>setOpenIcon(true)}></button>
                    <label className="custom-flex-item custom-justify-center custom-align-item custom-stress-txt" htmlFor="file-add-icon" >Select</label>
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
                            console.log(file)
                            let formdata = new FormData();
                            formdata.append("uploadFiles", file);
                            formdata.append("directoryType", 'notice');
                
                            // 파일업로드 API 호출
                            axiosInstance.post('/fileUpload', formdata).then(res => {
                                let resData = res.data;
                                if (resData.code == 500) {
                                    setAlertSetting({
                                        ...alertSetting,
                                        alertTxt : resData.msg
                                    })
                                } else {
                                    updateFile(1, resData.result[0]);
                                }
                            }).catch(error => {
                                setAlertSetting({
                                    ...alertSetting,
                                    alertTxt : 'Fail to attach file.'
                                })
                                console.log(error);
                            })
                            
                    }}
                    />   
                    <label className="custom-flex-item custom-justify-center custom-align-item custom-stress-txt" htmlFor="file-select-btn" >Add Icon</label>
                    {
                        openIcon &&
                        <SelectIcon onCloseIcon={()=>setOpenIcon(false)}/> 
                    }
                    {/* <button id="file-delete-btn" style={{display:'none'}} onClick={()=>deleteRow()}></button>
                    <label className="custom-flex-item custom-justify-center custom-align-item custom-stress-txt" htmlFor="file-delete-btn" >Delete</label> */}
                    </div>
                   
                </div>

            </div>

        </div>
        <div className="btn-row custom-flex-item custom-justify-center" >
                <button className="btn-black" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn-red" onClick={onSave}>Save</button>
        </div>
        </div>
        </>
    )
}
export default NewCategory

const Style = styled.div`
    #list-item-${props=>props.selectId} {
        background : #FAF1F4; color : #BB0841; 
    }
    .faq-left {
        width: ${props => (props.openRight ? '48%' : '100%')};
    }
    
`
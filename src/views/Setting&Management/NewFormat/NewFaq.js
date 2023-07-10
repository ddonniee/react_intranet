import React, {useState, useEffect} from "react";
import { styled } from "styled-components";
import Close from '../../../assets/svgs/icon_close.svg'
import Frame from '../../../assets/svgs/icon_editor_frame.svg'
import MoreIcon from '../../../assets/svgs/icon_more.svg';
import EditorModify from "../../../components/EditorModify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Alert from "../../../components/Alert";
import FormEditor from "./Editor/FormEditor";
import { generateRandomString, axiosInstance } from "../../../utils/CommonFunction";
import SelectBox from "../../../components/SelectBox";

import Arrow from '../../../assets/svgs/icon_arrow.svg'
function NewFaq(props) {


    const { data, setData, onSave, onClose, onAttach} = props

    const [content, setContent] = useState({
        title : '',
        content : '',
        isPublic : '',
        attachments : null,
        categoryId : ''
    });
    
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
            confirmTxt : '',
            onClose : ()=>setAlertModal(false)
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
 
    return (
        <>
        <div className="faq-setting-new ">
            <div className="content-top custom-flex-item custom-align-item">
                <img src={Frame}/>
                <span>New FAQ</span>
                <div onClick={onClose}><img src={Close} alt="close_btn"/> </div>               
            </div>
            <div className="content-middle">
            <div className="editor-container">
            
            <div className="write-row">
                <div className="left custom-flex-item custom-align-item"> <p>· Top 5 Setting</p> </div>
                <div className="right"> 
                <SelectBox options={options} handleChange={handleChange} placeholder='Select'/>
                </div>
            </div>
            <div className="write-row">
                <div className="left custom-flex-item custom-align-item"> <p>· Category</p> </div>
                <div className="right"> 
                    <input 
                    type="text" 
                    className="category-subject" 
                    name="category" 
                    value='Hold'
                    readOnly
                    >
                    </input> 
                   <img src={Arrow} alt="depth"/>
                    <input 
                    type="text" 
                    className="category-subject" 
                    name="category" 
                    value='Hold Codes'
                    readOnly
                    >
                    </input> 
                </div>

            </div>

            <div className="write-row">
                <div className="left custom-flex-item custom-align-item"> <p>· Subject</p> </div>
                <div className="right"> 
                    <input 
                    type="text" 
                    className="write-input" 
                    name="subject" 
                    value={content.title}
                    onChange={(e)=>{onCheckInput(e)}}
                    onBlur={()=>onStopInput()} 
                    >
                    </input> 
                </div>
            </div>
            <FormEditor data={content} setData={setContent} onSave={onSave} onClose={onClose}/>
        </div>
            </div>
            {
                alertModal &&
                <Alert alertTxt={alertSetting.alertTxt} btnTxt={alertSetting.btnTxt} onClose={alertSetting.onClose} />
            }
        </div>
        </>
    )
}
export default NewFaq

const Style = styled.div`
    #list-item-${props=>props.selectId} {
        background : #FAF1F4; color : #BB0841; 
    }
    .faq-left {
        width: ${props => (props.openRight ? '48%' : '100%')};
    }
    
`
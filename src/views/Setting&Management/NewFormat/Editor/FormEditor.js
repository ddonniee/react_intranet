import React, {useState, useEffect} from "react";
import { styled } from "styled-components";
import Close from '../../../../assets/svgs/icon_close.svg'
import Frame from '../../../../assets/svgs/icon_editor_frame.svg'
import MoreIcon from '../../../../assets/svgs/icon_more.svg';
import EditorModify from "../../../../components/EditorModify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Alert from "../../../../components/Alert";
import { generateRandomString, axiosInstance } from "../../../../utils/CommonFunction";
import SelectBox from "../../../../components/SelectBox";

import Arrow from '../../../../assets/svgs/icon_arrow.svg'
function FormEditor(props) {

    const { data, setData, onSave, onClose, onDelete, onAttach} = props
    const [content, setContent] = useState(data)
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
    
    const [alertModal, setAlertModal] = useState(false)
    const [alertSetting, setAlertSetting] = useState({
        alertTxt : '',
        onConfirm : function() {},
        isDoubleBtn : false,
        btnTxt : 'Close',
        confirmTxt : ''
    })

    const getCategoyList = () =>{

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            headers: { 
               'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
            },
            };
        axiosInstance('/faqCa/list', config)
        .then(function (response){
            let resData = response.data;
            console.log(resData,'dddd')
            if(resData.code===200) {
                let data = resData.result
                console.log(data)
                // setBoardData(data.list)
                // setFrequentList(data.top5list)
            }else {
                console.log(resData)
            }
        })
        .catch(function(error) {
            console.log('error',error)
        })
    }
    const handleChange = (event) => {
        let value = event.value;
        console.log(value)
        // setReqData({
        //     ...reqData,
        //  useYn: value
        // })
        }
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

    useEffect(() => {
        getCategoyList()
    },[])
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
         <div className="editor-container custom-editor">
            <div className="write-row">
                <div className="left custom-flex-item custom-align-item"> <p>· Detail</p> </div>
                <div className="right"> 
                    {/* <input type="text" className="write-input"></input>  */}
                    <CKEditor
                        editor={ ClassicEditor }
                        data={content.content}
                        // config={editorConfig}
                        onReady={ editor => {
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const inputData = editor.getData();
                            const dbTxt = encodeURIComponent(inputData)
                            // setTxt(dbTxt)
                            setContent({
                                ...content,
                                content : inputData,
                            })
                        } }
                        onBlur={ ( event, editor ) => {
                            onStopInput();
                        } }
                        onFocus={ ( event, editor ) => 
                            {
                            console.log( 'Focus.', editor );
                        } }
                    />
                </div>
            </div>
            <div className="write-row">
                <div className="left custom-flex-item custom-align-item custom-justify-between"> <p className="custom-flex-item custom-justify-center custom-align-item">· Attachments</p> 
                <label htmlFor="add-row">
                    <img src={MoreIcon} />              
                </label>
                <button onClick={()=>addRow()} name="attachments" style={{display: "none"}} id="add-row"/>
                </div>
                
                <div className="right file-upload"> 
                    {
                    attachments?.map((item,idx)=>{
                        return (
                            <div className="custom-flex-item custom-align-item" key={generateRandomString(idx)}>
                            <input type="text" className="write-input attach-input" name="filename" readOnly defaultValue={item.fileName}></input> 
                            <label className="custom-flex-item custom-justify-center custom-align-item custom-stress-txt" htmlFor="file-select-btn">Select</label>
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
                                        'application/pdf', 
                                        'application/x-hwp', 
                                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
                                    ];
                                    if(!allowedFileTypes.includes(file.type)) {
                                        setAlertSetting({
                                            ...alertSetting,
                                            alertTxt:'Attached files can only be in PDF, HWP, Docx, xls, and PPT formats.'
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
                                            updateFile(idx, resData.result[0]);
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
                            <button id="file-delete-btn" style={{display:'none'}} onClick={()=>deleteRow(idx)}></button>
                            <label className="custom-flex-item custom-justify-center custom-align-item custom-stress-txt" htmlFor="file-delete-btn" >Delete</label>
                        </div>
                        )
                    })
                    }
                    
                    <p className="attach-desc">Attached files can only be in PDF, HWP, Docx, xls, and PPT formats (Support up to 100MB)</p>
                </div>
            </div>
            <div className="btn-row" >
                    <button className="btn-black" onClick={onClose}>Cancel</button>
                    <button type="submit" className="btn-red" onClick={onSave}>Save</button>
            </div>
            {
                alertModal
                &&
                <Alert alertTxt={alertSetting.alertTxt} onClose={()=>setAlertModal(false)} onConfirm={alertSetting.onConfirm} twoBtn={alertSetting.isDoubleBtn} btnTxt={alertSetting.btnTxt}/>
            }
        </div>            
    )
    }

export default FormEditor

const Style = styled.div`
    #list-item-${props=>props.selectId} {
        background : #FAF1F4; color : #BB0841; 
    }
    .faq-left {
        width: ${props => (props.openRight ? '48%' : '100%')};
    }
    
`
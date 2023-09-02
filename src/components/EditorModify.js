import React, { useContext,useState,useEffect } from "react";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; 
import CustomDatePicker from "./DatePicker";
// import FileUpload from "../hooks/FileUpload";

import '../scss/style.scss';
import MoreIcon from '../assets/svgs/icon_more.svg';
import { styled } from "styled-components";

import {UserContext} from '../hooks/UserContext'
import moment from "moment";
import Alert from "./Alert";
import { generateRandomString,fetchInstance } from "../utils/CommonFunction";

/**
 * 작성자 : 이은정
 * 작성일 : 2023.05.22
 * 구현기능 : 현재 에디터 실행과 동영상 첨부까지 확인, 버튼 만들어서 등록/수정시 첨부파일 반환 or API 연결
 * react-html-parser -> buffer 모듈설치 // npm install buffer 추후에
 * @returns 
 */
function EditorModify(props) {

    
    const { period, data, setData, range, onSave, onClose, onDelete, onAttach } = props;
    const user = useContext(UserContext);
    const [alertModal, setAlertModal] = useState(false)
    const [alertSetting, setAlertSetting] = useState({
        alertTxt : '',
        onConfirm : function() {},
        isDoubleBtn : false,
        btnTxt : 'Close',
        confirmTxt : ''
    })
    const [attachments, setAttachments] = useState([
       {
        fileName: '',
        filePath : '',
       }
    ])
    const editorConfig = {
        // plugins: [UploadAdapter],
        // toolbar: [
        //     'imageUpload', 'bold', 'italic', 'link', 'bulletedList', 'numberedList',
        //     'mediaEmbed','fontFamily','fontSize','underline','alignment','undo','redo'
        // ],
        // 에디터 설정 커스터마이징시 활성화
    };

    const handleClickRadio = (e,num) =>{
        console.log(num)
        setData({
            ...data,
            isPublic : num
        })
    }

    const updateFile = (idx, file) => {
        console.log('########## updateFile ###########', idx, file)

        const copyFiles = [...attachments];
        const updateFile = copyFiles[idx];
        updateFile.fileName = file.fileName;
        updateFile.uploadPath = file.uploadPath;

        setData({ ...data, attachments: JSON.stringify(copyFiles)})
    };

    const onStopInput = () => {
        console.log('onStopInput')
        setData(data)
    }
    const onCheckInput = e =>{ 
        let value = e.target.value;
        if (value.length <= 100) {
            setData({
                ...data,
                title : value
            })
        }else {
            setAlertSetting({
                ...alertSetting,
                alertTxt : 'Up to 100 characters are allowed.'
            })
        }
       
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
        console.log(idx)
        if (attachments.length > 1) {
          setAttachments(prevArray => {
            const newArray = [...prevArray];
            newArray.splice(idx, 1);
            return newArray;
          });
        } else {
          setAlertSetting({
            ...alertSetting,
            alertTxt: 'At least one attachment is required.'
          });
        }
      };

    const resetRowFile = (idx) =>{
        setAttachments(prevArray => {
            const newArray = [...prevArray];
            newArray[idx] = {
                fileName: '',
                filePath : '',
               }
            return newArray;
        })
    }


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

    useEffect(()=>{
        console.log('---------------------------------------------------------------------!!')
        setData({
            ...data,
            isPublic : data.isPublic
        })
    },[data.isPublic])

    return (
        <Style>
        <div className="editor-container editor-border cstalk-editor">
            <div className="write-row">
                <div className="left custom-flex-item custom-align-item"> <p>· Writer</p> </div>
                <div className="right"> <input type="text" className="write-input" name="writer" readOnly value={user.name}></input> </div>
            </div>
            <div className="write-row">
                <div className="left custom-flex-item custom-align-item"> <p>· Date</p> </div>
                <div className="right"> <input type="text" className="write-input" name="date" readOnly value={moment().format('MM.DD.YY')}></input> </div>
            </div>
            <div className="write-row">
                <div className="left custom-flex-item custom-align-item"> <p>· Release to</p> </div>
                <div className="right radio-row custom-flex-item">
                <label id="custom-label" onClick={(e)=>handleClickRadio(e,1)}>
                    <input className="hiddenRadio" type="radio" name="release" value={range ? 1 : "ALL"} checked={data.isPublic === 1 ? true : false}/>
                    <div className="showRadio"></div>
                    <span>All</span>
                </label>
                <label id="custom-label" onClick={(e)=>handleClickRadio(e,0)}>
                    <input className="hiddenRadio" type="radio" name="release" value={range ? 0 : "LGC"} checked={data.isPublic === 0 ? true : false}/>
                    <div className="showRadio"></div>
                    <span>{range ? 'Me' : 'LGC'}</span>
                </label>
                <label id="custom-label" onClick={(e)=>handleClickRadio(e,2)}>
                    <input className="hiddenRadio" type="radio" name="release" value={range ? 2 : "ASC"} checked={data.isPublic === 2 ? true : false}/>
                    <div className="showRadio"></div>
                    <span>{range ? 'Center' : 'ASC'}</span>
                </label>
                </div>
            </div>
            {
                period &&
                <div className="write-row">
                    <div className="left custom-flex-item custom-align-item"> <p>· Period</p> </div>
                    <div className="right">
                        <CustomDatePicker isDuration={true} startName={'startName'} endName={'endName'} />
                    </div>
                </div>
            }
            <div className="write-row">
                <div className="left custom-flex-item custom-align-item"> <p>· Subject</p> </div>
                <div className="right"> 
                    <input 
                    type="text" 
                    className="write-input" 
                    ame="subject" 
                    value={data.title}
                    onChange={(e)=>{onCheckInput(e)}}
                    onBlur={()=>onStopInput()} 
                    >
                    </input> 
                </div>
            </div>
            <div className="write-row">
                <div className="left custom-flex-item custom-align-item"> <p>· Detail</p> </div>
                <div className="right"> 
                    {/* <input type="text" className="write-input"></input>  */}
                    <CKEditor
                        editor={ ClassicEditor }
                        data={data.content}
                        onReady={ editor => {
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const inputData = editor.getData();
                            const dbTxt = encodeURIComponent(inputData)
                            // setTxt(dbTxt)
                            setData({
                                ...data,
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
                            <label className="custom-flex-item custom-justify-center custom-align-item custom-stress-txt" htmlFor={attachments[idx].fileName===''? `file-select-btn-${idx}`:`file-reset-btn-${idx}`}>{attachments[idx].fileName===''?'Select':'Delete'}</label>
                            <input 
                                type="file" 
                                className="file-select-btn" 
                                style={{display: "none"}} 
                                id={`file-select-btn-${idx}`}
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
                                    formdata.append("directoryType", 'cstalk');
                        
                                    // 파일업로드 API 호출
                                    fetchInstance.post('/fileUpload', formdata).then(res => {
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
                            <button id={`file-reset-btn-${idx}`} style={{display:'none'}} onClick={()=>resetRowFile(idx)}></button>
                            <button id="file-delete-btn" style={{display:'none'}} onClick={()=>deleteRow(idx)}></button>
                            <label className="custom-flex-item custom-justify-center custom-align-item custom-stress-txt" htmlFor="file-delete-btn" >Delete</label>
                        </div>
                        )
                    })
                   }
                    
                    <p className="attach-desc">Attached files can only be in PDF, HWP, Docx, xls, and PPT formats (Support up to 100MB)</p>
                </div>
            </div>
            <div className="btn-row" style={data.csTalkId==='' ? {justifyContent:'flex-end'} : null}>
                {
                    data.csTalkId !== '' &&
                    <button className="btn-white" onClick={onDelete}>Delete</button>
                }
                <div>
                    <button className="btn-black" onClick={onClose}>Cancel</button>
                    <button type="submit" className="btn-red" onClick={onSave}>Save</button>
                </div>
            </div>
            {
                alertModal
                &&
                <Alert alertTxt={alertSetting.alertTxt} onClose={()=>setAlertModal(false)} onConfirm={alertSetting.onConfirm} twoBtn={alertSetting.isDoubleBtn} btnTxt={alertSetting.btnTxt}/>
            }
        </div>
        </Style>
    )
}
export default EditorModify

const Style = styled.div `
`

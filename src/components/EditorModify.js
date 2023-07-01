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
import { generateRandomString } from "../utils/CommonFunction";

/**
 * 작성자 : 이은정
 * 작성일 : 2023.05.22
 * 구현기능 : 현재 에디터 실행과 동영상 첨부까지 확인, 버튼 만들어서 등록/수정시 첨부파일 반환 or API 연결
 * react-html-parser -> buffer 모듈설치 // npm install buffer 추후에
 * @returns 
 */
function EditorModify({ period, data, setData, range, onSave, onClose, onDelete }) {

    console.log(data,'editedit')
    const user = useContext(UserContext);
    const [content, setContent] = useState(data);
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
        setContent({
            ...content,
            isPublic : num
        })
    }
    const onStopInput = () => {
        console.log('onStopInput')
        setData(content)
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
            isPublic : content.isPublic
        })
    },[content.isPublic])

    return (
        <Style>
        <div className="editor-container editor-border">
            <div className="write-row">
                <div className="left custom-flex-item custom-align-item"> <p>· Writer</p> </div>
                <div className="right"> <input type="text" className="write-input" name="writer" readOnly value={user.name}></input> </div>
            </div>
            <div className="write-row">
                <div className="left custom-flex-item custom-align-item"> <p>· Date</p> </div>
                <div className="right"> <input type="text" className="write-input" name="date" readOnly value={moment().format('YYYY-MM-DD')}></input> </div>
            </div>
            <div className="write-row">
                <div className="left custom-flex-item custom-align-item"> <p>· Release to</p> </div>
                <div className="right radio-row custom-flex-item">
                <label id="custom-label" onClick={(e)=>handleClickRadio(e,1)}>
                    <input className="hiddenRadio" type="radio" name="release" value={range ? 1 : "ALL"} checked={content.isPublic === 1 ? true : false}/>
                    <div className="showRadio"></div>
                    <span>All</span>
                </label>
                <label id="custom-label" onClick={(e)=>handleClickRadio(e,0)}>
                    <input className="hiddenRadio" type="radio" name="release" value={range ? 0 : "LGC"} checked={content.isPublic === 0 ? true : false}/>
                    <div className="showRadio"></div>
                    <span>{range ? 'Me' : 'LGC'}</span>
                </label>
                <label id="custom-label" onClick={(e)=>handleClickRadio(e,2)}>
                    <input className="hiddenRadio" type="radio" name="release" value={range ? 2 : "ASC"} checked={content.isPublic === 2 ? true : false}/>
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
                    value={content.title}
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
                            <input type="text" className="write-input attach-input" name="filename" readOnly></input> 
                            <label className="custom-flex-item custom-justify-center custom-align-item custom-stress-txt" htmlFor="file-delete-btn">{item.fileName===''?'Select':'Delete'}</label>
                            <input 
                                type="file" 
                                className="file-delete-btn" 
                                style={{display: "none"}} 
                                id='file-delete-btn'
                                onChange={(e)=>{
                                    console.log(e.target?.files)
                                    if(e.target?.files[0]) {
                                        let formData = new FormData();
                                        formData.append('fileName',e.target?.files[0])
                                        // api 연동..
                                    }
                                    
                            }}
                            />       
                        </div>
                        )
                    })
                   }
                    
                    <p className="attach-desc">Attached files can only be in PDF, HWP, Docx, xls, and PPT formats (Support up to 100MB)</p>
                </div>
            </div>
            <div className="btn-row" style={content.csTalkId==='' ? {justifyContent:'flex-end'} : null}>
                {
                    content.csTalkId !== '' &&
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
import React, { useContext,useState,useEffect } from "react";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; 
import CustomDatePicker from "./DatePicker";
// import FileUpload from "../hooks/FileUpload";
import { axiosInstance } from "../utils/CommonFunction";

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
function EditorWrite({ period, data, setData, range, isChange, isWriter, onSave, onClose, onDelete, onRestore }) {

    const user = useContext(UserContext);
    const [content, setContent] = useState(data);
    const [attachments, setAttachments] = useState([
        {
            fileName: '',
            uploadPath: '',
        },
     ])
    const [alertModal, setAlertModal] = useState(false)
    const [alertTxt, setAlertTxt] = useState('')
    
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [editDate, setEditDate] = useState(false);
    
    const editorConfig = {
        // plugins: [UploadAdapter], 
        // toolbar: [
        //     'imageUpload', 'bold', 'italic', 'link', 'bulletedList', 'numberedList',
        //     'mediaEmbed','fontFamily','fontSize','underline','alignment','undo','redo'
        // ],
        // 에디터 설정 커스터마이징시 활성화
    };

    const handleClickRadio = (e) => {
        let value = e.target.value;
        if(!isWriter) return false;
        
        setContent({ ...content, view : value })
    }

    const onSaveEditor = () => {
        console.log('save data(editor) >>>>>>', content)

        if (!content.title || !content.content || (range ? !content.isPublic : !content.view)) {
            setAlertTxt('Please fill out all the information.')
            console.log('if')
            return false;
        } else if((!content.postStartDate && content.postEndDate) || (content.postStartDate && !content.postEndDate)) {
            setAlertTxt('Please check out all the date.')
            console.log('else if')
            return false;
        } else {
            if(editDate) {
                let start = moment(startDate).format('YYYY-MM-DD');
                let end = moment(endDate).format('YYYY-MM-DD');
                console.log('startDate', start, '/ endDate', end)
                setData({ ...content, postStartDate : start, postEndDate : end })
            } else {
                console.log('save success')
                setData(content)
            }
        }
    }

    useEffect(() => {
        console.log('content >>>>>>>>>>>>>>>>>>>', content)
        if(content) { isChange(true) }
    }, [content])

    const onCheckInput = e =>{ 
        let value = e.target.value;
        if (value.length <= 100) {
            setContent({
                ...content,
                title : value
            })
        } else {
            setAlertTxt('Up to 100 characters are allowed.')
        }
    }

    const addRow = () => {
        if(attachments.length < 5) {
            const newObj = {
                fileName: '',
                uploadPath : '',
            }
            const arr = [...attachments, newObj]
            setAttachments(arr)
        } else {
            setAlertTxt('Up to 5 file attachments are allowed.')
        }
    }

    const deleteRow = (idx) => {
        if(attachments.length > 1) {
            setAttachments(prevArray => {
                const newArray = [...prevArray];
                newArray.splice(idx, 1);
                return newArray;
            })
        } else {
            setAlertTxt('At least one attachment is required.')
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
        console.log('editor file --->', attachments)
    }, [attachments])

    useEffect(()=>{
        if(!alertModal) {
            setAlertTxt('')
        }
    },[alertModal])

    useEffect(()=>{
        if(alertTxt!==''){
            setAlertModal(true)
        }
    },[alertTxt])

    return (
        <Style>
        <div className="editor-container">
            <div className="write-row">
                <div className="left custom-flex-item custom-align-item"> <p>· Writer</p> </div>
                <div className="right"> <p className="custom-flex-item custom-align-item">{user.name}</p> </div>
            </div>
            <div className="write-row">
                <div className="left custom-flex-item custom-align-item"> <p>· Date</p> </div>
                <div className="right"> <p className="custom-flex-item custom-align-item">{data ? moment(content?.createdAt).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')}</p> </div>

            </div>
            <div className="write-row">
                <div className="left custom-flex-item custom-align-item"> <p>· Release to</p> </div>
                <div className="right radio-row custom-flex-item">
                <label id="custom-label" onClick={handleClickRadio}>
                    <input className="hiddenRadio" type="radio" name={range ? 'isPublic' : 'view'} value={range ? 1 : "ALL"} 
                        defaultChecked={data && range ? content?.isPublic === 1 && true : data ? content?.view === 'ALL' && true : false} />
                    <div className="showRadio"></div>
                    <span>All</span>
                </label>
                <label id="custom-label" onClick={handleClickRadio}>
                    <input className="hiddenRadio" type="radio" name={range ? 'isPublic' : 'view'} value={range ? 0 : "LGC"} 
                        defaultChecked={data && range ? content?.isPublic === 0 && true : data ? content?.view === 'LGC' && true : false} />
                    <div className="showRadio"></div>
                    <span>{range ? 'Me' : 'LGC'}</span>
                </label>
                <label id="custom-label" onClick={handleClickRadio}>
                    <input className="hiddenRadio" type="radio" name={range ? 'isPublic' : 'view'} value={range ? 2 : "ASC"} 
                        defaultChecked={data && range ? content?.isPublic === 2 && true : data ? content?.view === 'ASC' && true : false} />
                    <div className="showRadio"></div>
                    <span>{range ? 'Center' : 'ASC'}</span>
                </label>
                </div>
            </div>
            {
                period &&
                <div className="write-row">
                    <div className="left custom-flex-item custom-align-item"> <p>· Period</p> </div>
                    <div className="right" onClick={() => setEditDate(true)}>
                        <CustomDatePicker isDuration={true} startDate={content?.postStartDate} endDate={content?.postEndDate} startName='postStartDate' endName='postEndDate'
                            setStartDate={setStartDate} setEndDate={setEndDate} />
                    </div>
                </div>
            }
            <div className="write-row">
                <div className="left custom-flex-item custom-align-item"> <p>· Subject</p> </div>
                <div className="right"> 
                    <input 
                    type="text" 
                    className="write-input" 
                    // name="title" 
                    readOnly={!isWriter}
                    defaultValue={data && content?.title}
                    onChange={(e)=>{onCheckInput(e)}}
                    >
                    </input> 
                </div>
            </div>
            <div className="write-row">
                <div className="left custom-flex-item custom-align-item"> <p>· Detail</p> </div>
                <div className="right"> 
                    <CKEditor
                        editor={ ClassicEditor }
                        // name="content"
                        readOnly={!isWriter}
                        data={data && content?.content}
                        // config={editorConfig}
                        onReady={ editor => {
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const inputData = editor.getData();
                            // const dbTxt = encodeURIComponent(inputData)
                            // console.log(inputData)
                            setContent({
                                ...content,
                                content : inputData,
                            })
                        } }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                    />
                </div>
            </div>
            <div className="write-row">
                <div className="left custom-flex-item custom-align-item"> 
                    <p className="custom-flex-item custom-justify-center custom-align-item">· Attachments</p>
                    <label htmlFor="add-row">
                        <img className="file-more-btn" src={MoreIcon} />              
                    </label>
                    <button onClick={() => addRow()} name="attachments" style={{display: "none"}} id="add-row"/>
                </div>
                
                <div className="right file-upload"> 
                    {
                        attachments?.map((item, idx) => {
                            return (
                                <div className="custom-flex-item custom-align-item" key={generateRandomString(idx)}>
                                    <input type="text" className="write-input attach-input" name="filename" id={`filename_${idx}`} defaultValue={attachments[idx].fileName} readOnly></input> 
                                    <label className="custom-flex-item custom-justify-center custom-align-item custom-stress-txt" 
                                        htmlFor={`file-select-btn-${idx}`}>Select</label>
                                    <label className="custom-flex-item custom-justify-center custom-align-item custom-stress-txt" 
                                        onClick={() => deleteRow(idx)}>Delete</label>
                                    <input 
                                        type="file" 
                                        className="file-select-btn" 
                                        style={{display: "none"}} 
                                        id={`file-select-btn-${idx}`}
                                        onChange={(e) => { 
                                            if (e.target?.files[0]) {
                                                const file = e.target?.files[0];
                                                if(file.size > 1024 * 1024 * 20) {
                                                    setAlertTxt('Only files of 20MB or less can be attached.')
                                                    return false;
                                                }
                                    
                                                let formdata = new FormData();
                                                formdata.append("uploadFiles", file);
                                                formdata.append("directoryType", 'notice');
                                    
                                                // 파일업로드 API 호출
                                                axiosInstance.post('/fileUpload', formdata).then(res => {
                                                    let resData = res.data;
                                                    console.log('idx ?????????????', idx)

                                                    if (resData.code == 500) {
                                                      alert(resData.msg)
                                                    } else {
                                                    //   document.getElementById(`filename_${idx}`).value = resData.result[0].fileName || ''; // 첨부파일명 출력
                                                      updateFile(idx, resData.result[0]);
                                                    }
                                                }).catch(error => {
                                                    console.log(error);
                                                })
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

            <div className="btn-row">
                <button className={`btn-white ${(!data || !isWriter || content?.deleteAt) && 'custom-hidden'}`} onClick={onDelete}>Delete</button>
                <div>
                    <button className="btn-black" onClick={() => onClose(false)}>Cancel</button>
                    { (isWriter && !content?.deleteAt) ? 
                        <button type="submit" className="btn-red" onClick={onSaveEditor}>Save</button> 
                        : (isWriter && content?.deleteAt) ? 
                        <button type="submit" className="btn-red" style={{width: "122px"}} onClick={onRestore}>Restoration</button>
                        : null 
                    }
                </div>
            </div>
            {
                alertModal
                &&
                <Alert alertTxt={alertTxt} onClose={()=>setAlertModal(false)} onConfirm={()=>setAlertModal(false)} btnTxt='Close' />
            }
        </div>
        </Style>
    )
}
export default EditorWrite

const Style = styled.div `
`
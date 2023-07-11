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
import { generateRandomString, axiosInstance } from "../utils/CommonFunction";

/**
 * 작성자 : 이은정
 * 작성일 : 2023.05.22
 * 구현기능 : 현재 에디터 실행과 동영상 첨부까지 확인, 버튼 만들어서 등록/수정시 첨부파일 반환 or API 연결
 * react-html-parser -> buffer 모듈설치 // npm install buffer 추후에
 * @param {
 * period : 기간 설정 여부 (bool)
 * data : 상세 데이터
 * setData : 변경된 데이터
 * range : 라디오버튼 타입 (bool)
 * isChange : 내용 변경 여부 (bool)
 * isWriter : 작성 권한 여부 (bool)
 * onSave : 글 저장 함수
 * onClose : 에디터 닫기 함수
 * onDelete : 글 삭제 함수
 * onRestore : 글 복구 함수
 * }
 * @returns 
 */
function Editor({ period, data, setData, range, isChange, isWriter, onSave, onClose, onDelete, onRestore }) {

    const user = useContext(UserContext);
    const [content, setContent] = useState(data);
    const [origin, setOrigin] = useState(data);
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

    useEffect(() => {
        let content = data;
        console.log('editor file data --->', JSON.parse(content.attachments))
        setTimeout(() => {
            setContent(content);
            setOrigin(content);
            setAttachments(JSON.parse(content.attachments))
        }, 10);

        return () => {
            setContent();
            setOrigin();
            setAttachments();
        }
    }, [data])

    useEffect(() => {
        console.log('attachments', attachments)
    }, [attachments])

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
                let start = startDate // moment(startDate).format('YYYY-MM-DD');
                let end = endDate // moment(endDate).format('YYYY-MM-DD');
                console.log('startDate', start, '/ endDate', end)
                setData({ ...content, postStartDate : start, postEndDate : end })
            } else {
                console.log('save success')
                const uploadFiles = attachments.filter(item => item.fileName !== '');
                // setData(content)
                setData({ ...content, attachments: JSON.stringify(uploadFiles)})
            }
        }
    }

    const extractChangedPart = (obj1, obj2) => {
        
        if (Object.keys(obj1).length !== Object.keys(obj2).length) {
            return true;
        }
        for (let key in obj1) {
            if (!obj2.hasOwnProperty(key)) {
                return true;
            }
            if (obj1[key] !== obj2[key]) {
                return true;
            }
        }
        return false;
    }

    useEffect(() => {
        // console.log('content >>>>>>>>>>>>>>>>>>>', content)
        if(origin && content) {
            isChange(extractChangedPart(origin, content))
        }
    }, [content])

    // useEffect(() => {
    //     let start = moment(startDate).format('YYYY-MM-DD');
    //     let end = moment(endDate).format('YYYY-MM-DD');
    //     console.log('startDate', start, '/ endDate', end)

    //     setContent({ ...content, postStartDate : start, postEndDate : end })
    // }, [startDate, endDate])

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
        { content &&
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
                        attachments?.map((item, idx)=>{
                            return (
                                <div className="custom-flex-item custom-align-item" key={generateRandomString(idx)}>
                                    <input type="text" className="write-input attach-input" name="filename" id={`filename_${idx}`} defaultValue={item.fileName} readOnly></input> 
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
                                                // console.log('input file type ============', file.type)

                                                if(file.size > 1024 * 1024 * 100) {
                                                    setAlertTxt('Only files of 100MB or less can be attached.')
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
                                                    setAlertTxt('Attached files can only be in PDF, HWP, Docx, xls, and PPT formats.')
                                                    return false;
                                                }
                                    
                                                let formdata = new FormData();
                                                formdata.append("uploadFiles", file);
                                                formdata.append("directoryType", 'notice');
                                    
                                                // 파일업로드 API 호출
                                                axiosInstance.post('/fileUpload', formdata).then(res => {
                                                    let resData = res.data;
                                                    // console.log('idx ---->', idx)

                                                    if (resData.code == 500) {
                                                      alert(resData.msg)
                                                    } else {
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
                {
                    isWriter && content?.deleteAt
                    ? <button type="submit" className="btn-white" style={{width: "122px"}} onClick={onRestore}>Restoration</button>
                    : <button className={`btn-white ${(!data || !isWriter || content?.deleteAt) && 'custom-hidden'}`} onClick={onDelete}>Delete</button>
                }
                { 
                    isWriter && !content?.deleteAt ? 
                    <div>
                        <button className="btn-black" onClick={() => onClose(false)}>Cancel</button>
                        <button type="submit" className="btn-red" onClick={onSaveEditor}>Save</button> 
                    </div>
                    : null 
                }
            </div>
            {
                alertModal
                &&
                <Alert alertTxt={alertTxt} onClose={()=>setAlertModal(false)} onConfirm={()=>setAlertModal(false)} btnTxt='Close' />
            }
        </div>
        }
        </Style>
    )
}
export default Editor

const Style = styled.div `
`
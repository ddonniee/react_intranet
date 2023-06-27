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

/**
 * 작성자 : 이은정
 * 작성일 : 2023.05.22
 * 구현기능 : 현재 에디터 실행과 동영상 첨부까지 확인, 버튼 만들어서 등록/수정시 첨부파일 반환 or API 연결
 * react-html-parser -> buffer 모듈설치 // npm install buffer 추후에
 * @returns 
 */
function Editor({ period, data, setData }) {

    const user = useContext(UserContext);
    const [txt, setTxt] = useState('');
    // const [dbtxt, setDbtxt] = useEffect
    
    const editorConfig = {
        // plugins: [UploadAdapter],
        // toolbar: [
        //     'imageUpload', 'bold', 'italic', 'link', 'bulletedList', 'numberedList',
        //     'mediaEmbed','fontFamily','fontSize','underline','alignment','undo','redo'
        // ],
        // 에디터 설정 커스터마이징시 활성화
    };

    return (
        <Style>
        <div className="editor-container">
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
                    <label id="custom-label">
                        <input className="hiddenRadio" type="radio" name="release" value="ALL" />
                        <div className="showRadio"></div>
                        <span>All</span>
                    </label>
                    <label id="custom-label">
                        <input className="hiddenRadio" type="radio" name="release" value="LGC" />
                        <div className="showRadio"></div>
                        <span>LGC</span>
                    </label>
                    <label id="custom-label">
                        <input className="hiddenRadio" type="radio" name="release" value="ASC" />
                        <div className="showRadio"></div>
                        <span>ASC</span>
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
                <div className="right"> <input type="text" className="write-input" name="subject"></input> </div>
            </div>
            <div className="write-row">
                <div className="left custom-flex-item custom-align-item"> <p>· Detail</p> </div>
                <div className="right"> 
                    {/* <input type="text" className="write-input"></input>  */}
                    <CKEditor
                        editor={ ClassicEditor }
                        data=""
                        // config={editorConfig}
                        onReady={ editor => {
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            const dbTxt = encodeURIComponent(data)
                            setTxt(dbTxt)
                            console.log( { txt, data } );
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
                <div className="left custom-flex-item custom-align-item"> <p className="custom-flex-item custom-justify-center custom-align-item">· Attachments</p> 
                <label htmlFor="file-upload">
                    <img src={MoreIcon} />              
                </label>
                <input type="file" name="attachments" style={{display: "none"}} id="file-upload"/>
                </div>
                
                <div className="right"> 
                    <input type="text" className="write-input attach-input" name="filename"></input> 
                    <button className="file-delete-btn">Delete</button>
                    <p className="attach-desc">Attached files can only be in PDF, HWP, Docx, xls, and PPT formats (Support up to 100MB)</p>
                </div>
            </div>
            <div className="btn-row">
                <button className="btn-white">Delete</button>
                <div>
                    <button className="btn-black">Cancel</button>
                    <button type="submit" className="btn-red">Save</button>
                </div>
            </div>
        </div>
        </Style>
    )
}
export default Editor

const Style = styled.div `
`
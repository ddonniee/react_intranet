import React, { useState,useEffect } from "react";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; 
import CustomDatePicker from "./DatePicker";
// import FileUpload from "../hooks/FileUpload";

import '../scss/style.scss';
import { ReactComponent as MoreIcon } from '../assets/svgs/icon_more.svg';

/**
 * 작성자 : 이은정
 * 작성일 : 2023.05.22
 * 구현기능 : 현재 에디터 실행과 동영상 첨부까지 확인, 버튼 만들어서 등록/수정시 첨부파일 반환 or API 연결
 * react-html-parser -> buffer 모듈설치 // npm install buffer 추후에
 * @returns 
 */
function Editor({ period, data, setData }) {

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
        <div className="editor-container">
            <div className="write-row">
                <div className="left custom-flex-item custom-align-item"> <p>· Writer</p> </div>
                <div className="right"> <input type="text" className="write-input" name="writer"></input> </div>
            </div>
            <div className="write-row">
                <div className="left custom-flex-item custom-align-item"> <p>· Date</p> </div>
                <div className="right"> <input type="text" className="write-input" name="date"></input> </div>
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
                        data="<p>Hello from CKEditor 5!</p>"
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
                <div className="left custom-flex-item custom-align-item"> <p>· Attachments</p> <MoreIcon /> </div>
                <input type="file" name="attachments" style={{display: "none"}} />
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


        // <div className="editor-wrapper">
        //     <form>
        //         <div className="editor-top">
        //             <div>
        //                 <label className="label-txt">· Writer</label>
        //                 <input disabled ></input>
        //             </div>
        //             <div>
        //                 <label className="label-txt">· Date</label>
        //                 <input></input>
        //             </div>
        //             <div>
        //                 <label className="label-txt">· Subject</label>
        //                 <input></input>
        //             </div>
        //         </div>
        //         <div className="editor-middle">
        //             <div className="custom-flex-item custom-justify-between">
        //                 <label className="label-txt">· Detail</label>
        //                 <CKEditor
        //                 editor={ ClassicEditor }
        //                 data="<p>Hello from CKEditor 5!</p>"
        //                 // config={editorConfig}
        //                 onReady={ editor => {
        //                     // You can store the "editor" and use when it is needed.
        //                     console.log( 'Editor is ready to use!', editor );
        //                 } }
        //                 onChange={ ( event, editor ) => {
        //                     const data = editor.getData();
        //                     const dbTxt = encodeURIComponent(data)
        //                     setTxt(dbTxt)
        //                     console.log( { txt, data } );
        //                 } }
        //                 onBlur={ ( event, editor ) => {
        //                     console.log( 'Blur.', editor );
        //                 } }
        //                 onFocus={ ( event, editor ) => {
        //                     console.log( 'Focus.', editor );
        //                 } }
        //             />
        //             </div>
        //             <div>
        //                 <label className="label-txt">· Attachment</label>
        //                 <div></div>
        //                 <label htmlFor="file-btn">Select</label>
        //                 <input type="file" style={{display:'none'}} id="file-btn"></input>
        //             </div>
        //         </div>
        //         <div className="editor-bottom">
        //             <button onClick={(e)=>console.log(e)}>Cancel</button>
        //             <button className="primary-red-btn" onClick={(e)=>console.log(e)}>Save</button>
        //         </div>
        //     </form>
        // </div>
    )
}
export default Editor
import React, { useState,useEffect } from "react";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; 
// import FileUpload from "../hooks/FileUpload";
/**
 * 작성자 : 이은정
 * 작성일 : 2023.05.22
 * 구현기능 : 현재 에디터 실행과 동영상 첨부까지 확인, 버튼 만들어서 등록/수정시 첨부파일 반환 or API 연결
 * react-html-parser -> buffer 모듈설치 // npm install buffer 추후에
 * @returns 
 */
function Editor() {

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
        <div className="editor-wrapper">
            <form>
                <div className="editor-top">
                    <div>
                        <label className="label-txt">· Writer</label>
                        <input disabled ></input>
                    </div>
                    <div>
                        <label className="label-txt">· Date</label>
                        <input></input>
                    </div>
                    <div>
                        <label className="label-txt">· Subject</label>
                        <input></input>
                    </div>
                </div>
                <div className="editor-middle">
                    <div className="custom-flex-item custom-justify-between">
                        <label className="label-txt">· Detail</label>
                        <CKEditor
                        editor={ ClassicEditor }
                        data="<p>Hello from CKEditor 5!</p>"
                        // config={editorConfig}
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
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
                    <div>
                        <label className="label-txt">· Attachment</label>
                        <div></div>
                        <label htmlFor="file-btn">Select</label>
                        <input type="file" style={{display:'none'}} id="file-btn"></input>
                    </div>
                </div>
                <div className="editor-bottom">
                    <button onClick={(e)=>console.log(e)}>Cancel</button>
                    <button className="primary-red-btn" onClick={(e)=>console.log(e)}>Save</button>
                </div>
            </form>
        </div>
    )
}
export default Editor
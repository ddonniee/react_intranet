import React, {useState, useEffect} from "react";

import FormEditor from "./Editor/FormEditor";
import SelectBox from "../../../components/SelectBox";

import Close from '../../../assets/svgs/icon_close.svg'
import Frame from '../../../assets/svgs/icon_editor_frame.svg'
import Arrow from '../../../assets/svgs/icon_arrow.svg'

function EditFaq(props) {
    const { period, data, setData, range, onSave, onClose, onDelete, onAttach} = props;
    const [content, setContent] = useState(data)

    const options = [
        {value:'TOP1',label:'TOP1'}, 
        {value:'TOP2',label:'TOP2'}, 
        {value:'TOP3',label:'TOP3'}, 
        {value:'TOP4',label:'TOP4'}, 
        {value:'TOP5',label:'TOP5'}, 
    ]
    const handleSelect = (event) => {
        let value = event.value;
        setData(value)
        // setReqData({
        //     ...reqData,
        //  useYn: value
        // })
    }
    const handleChange = (event) =>{
        let value = event.target.value;
        console.log(value)
        setContent({
            ...content,
            subject: value
        })
    }

    console.log(content,'========EditFaq=========')
    return(
        <>
         <div className="faq-setting-new custom-flex-item">
        <div className="content-top custom-flex-item custom-align-item">
                {/* <img src={Frame} className="maximizing-btn"/> */}
                <span>Edit FAQ</span>
                <div><img src={Close} alt="close_btn" onClick={onClose} className="cursor-btn"/> </div>               
            </div>

            <div className="write-row custom-flex-item">
                <div className="left custom-flex-item custom-align-item"> <p>· Top 5 Setting</p> </div>
                <div className="right"> 
                <SelectBox options={options} handleChange={handleSelect} placeholder='Select'/>
                </div>
            </div>

            <div className="write-row custom-flex-item">
                <div className="left custom-flex-item custom-align-item"> <p>· Category</p> </div>
                <div className="right"> 
                    <input 
                    type="text" 
                    className="category-subject custom-invalid-input" 
                    name="category" 
                    value='Hold'
                    readOnly
                    >
                    </input> 
                   <img src={Arrow} alt="depth"/>
                    <input 
                    type="text" 
                    className="category-subject custom-invalid-input" 
                    name="category" 
                    value='Hold Codes'
                    readOnly
                    >
                    </input> 
                </div>

            </div>

            <div className="write-row custom-flex-item">
                <div className="left custom-flex-item custom-align-item"> <p>· Subject</p> </div>
                <div className="right"> 
                    <input 
                    type="text" 
                    className="category-subject custom-wide-subject" 
                    name="subject" 
                    value={content.subject}
                    onChange={handleChange}
                    // onBlur={()=>onStopInput()} 
                    >
                    </input> 
                </div>
            </div>

            <div className="content-middle setting-middle">
                <FormEditor data={content} setData={setContent} onSave={()=>setData(content)}/>
            </div>
            </div>
        </>
    )

}   
export default EditFaq
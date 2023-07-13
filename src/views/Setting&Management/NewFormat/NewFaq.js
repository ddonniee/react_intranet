import React, {useState, useEffect} from "react";
import { styled } from "styled-components";
import Close from '../../../assets/svgs/icon_close.svg'
import Frame from '../../../assets/svgs/icon_editor_frame.svg'
import MoreIcon from '../../../assets/svgs/icon_more.svg';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Alert from "../../../components/Alert";
import FormEditor from "./Editor/FormEditor";
import { generateRandomString, axiosInstance } from "../../../utils/CommonFunction";
import SelectBox from "../../../components/SelectBox";

import Arrow from '../../../assets/svgs/icon_arrow.svg'
function NewFaq(props) {


    const { data, setData, onSave, onClose, onAttach} = props

    // acios header
    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        headers: { 
           'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
        },
        };
    const [categoryLists, setCategoryLists] = useState([]) 
    const [subCategory, setSubCategory] = useState([])
    const [content, setContent] = useState({
        title : '',
        content : '',
        isPublic : '',
        attachments : null,
        categoryId : '',
        parentCategory : '',
        subCategory : ''
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
        // console.log('onStopInput')
        // setData(content)
    }

    const getCategory = () =>{

        console.log('getCAegrogffgosd')
        axiosInstance('/faqCa/list', config)
        .then(function (response){
            let resData = response.data;
            if(resData.code===200) {
                let data = resData.result
                console.log('getCategory',resData)
                let temp = []
                let subTemp = [];
                temp = data.map(d => ({ 
                    value: d.categoryId, 
                    label: d.categoryNm 
                }));
                data.forEach(d => {
                    if (d.subCategory.length !== 0) {
                        d.subCategory.map(item=>{
                            subTemp.push({ value: item.categoryId, label: item.categoryNm });
                        })
                   
                    }
                  });
                setCategoryLists(temp)
                setSubCategory(subTemp)
            }else {
                console.log(resData)
            }
        })
        .catch(function(error) {
            console.log('error',error)
        })
    }

    useEffect(()=>{
        getCategory();
    },[])
    useEffect(()=>{
        setData(content)
        console.log(content,'===============')
    },[content])
    useEffect(()=>{
        console.log(categoryLists)
        console.log(subCategory)
    },[categoryLists, subCategory])

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
                <div className="right custom-flex-item custom-align-item"> 
                <SelectBox options={categoryLists} placeholder='Select' handleChange={(e)=>setContent({...content,categoryId:e.value})}/>
                <SelectBox options={subCategory} placeholder='Select' handleChange={(e)=>setContent({...content,subCategory:e.target.value})}/>
                    {/* <input 
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
                    </input>  */}
                    
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
        width: ${props => (props.openRight ? '49%' : '100%')};
    }
    
`
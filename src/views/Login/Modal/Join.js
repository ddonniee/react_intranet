import React, {useState, useEffect} from "react";

import Close from '../../../assets/svgs/icon_close.svg'
import SelectBox from "../../../components/SelectBox";
import { axiosInstance, generateRandomString } from "../../../utils/CommonFunction";
import { styled } from "styled-components";

const Join = props => {

    const {onClose} = props;
    
    // temp data
    const options = [
        {value:'1',label:'Engineer1'}, 
        {value:'2',label:'Engineer2'}, 
        {value:'3',label:'Engineer3'}, 
        {value:'4',label:'Engineer4'}, 
    ]
   
    const clearForm = () =>{
        setJoinForm({
            id: '',
            branch: '',
            email : '',
            name : '',
            phone : '',
            mobile : '',
            type : '',
        })
    }   
    
    const [joinForm, setJoinForm] = useState({
        id: '',
        branch: '',
        email : '',
        name : '',
        phone : '',
        mobile : '',
        type : '',
    })
    const [isMandatory, setIsMandatory] = useState(false);

    const handleSubmitForm = event => {
        event.preventDefault();
        event.stopPropagation();

        let form = event.currentTarget;
        let formData = Object.fromEntries(new FormData(form));
        
        // state에 저장된 user-type추가
        // formData.append('uesr-type', joinForm.type) 
        // 통신. . . .
        // 완료 후 clearForm()
    }

    const handleChangeSelect = res => {
        console.log(res.label)
        let type = res.label;
        setJoinForm({
            ...joinForm,
            type: type,
        })
       
    }
    const handleChangeInput = e => {
        let title = e.target.id;
        let value = e.target.value;

        console.log(value,title)
        if(title==='user-branch') {
            setJoinForm({
                ...joinForm,
                branch : value
            })
        }else if(title==='user-email') {
            setJoinForm({
                ...joinForm,
                email : value
            })
        }else if(title==='user-name') {
            setJoinForm({
                ...joinForm,
                name: value
            })
        }else if(title==='user-id') {
            setJoinForm({
                ...joinForm,
                id: value
            })
        }else if(title==='user-phone') {
            setJoinForm({
                ...joinForm,
                phone: value
            })
        }else if(title==='user-mobile') {
            setJoinForm({
                ...joinForm,
                mobile: value
            })
        }
    }

    useEffect(()=>{
        console.log('dd',joinForm)
        if(joinForm.id!=='' && joinForm.name !== '' && joinForm.email!=='' && joinForm.phone !== '' && joinForm.mobile !== '' && joinForm.branch !== '' ) {
            setIsMandatory(true)
        }else {
            setIsMandatory(false)
        }
    },[joinForm])

    useEffect(()=>{
        console.log(isMandatory)
    },[isMandatory])
    return (
        <>
        <Style isActive={isMandatory?true:false}>
            <div className="modal" >
               
                <div className="modal-content modal-join">
                <form onSubmit={handleSubmitForm}>
                    <div className="alert-top"><span className="modal-title">Request New Account</span><img src={Close} alt="close-btn" onClick={onClose} /></div>
                    <div className="alert-middle">
                        <div className="alert-middle-info join-input">
                            <div className="custom-flex-item custom-justify-between custom-align-item ">
                                <lable htmlfor='user-branch' className='label-txt'>· SHIP TO</lable>
                                <input type="text" id='user-branch' name="user-branch" onChange={handleChangeInput}></input>
                            </div>
                            <div className="custom-flex-item custom-justify-between custom-align-item ">
                                <lable htmlfor='user-email' className='label-txt'>· EMAIL</lable>
                                <input type="email" id='user-email' name="user-email" onChange={handleChangeInput}></input>
                            </div>
                            <div className="custom-flex-item custom-justify-between custom-align-item ">
                                <lable htmlfor='user-name' className='label-txt'>· NAME</lable>
                                <input type="text" id='user-name' name="user-name" onChange={handleChangeInput}></input>
                            </div>
                            <div className="custom-flex-item custom-justify-between custom-align-item ">
                                <lable htmlfor='user-id' className='label-txt'>· USER ID</lable>
                                <input type="text" id='user-id'  onChange={handleChangeInput}></input>
                            </div>
                            <div className="custom-flex-item custom-justify-between custom-align-item ">
                                <lable htmlfor='user-phone' className='label-txt'>· PHONE NO</lable>
                                <input type="tel" id='user-phone' name="user-phone" onChange={handleChangeInput}></input>
                            </div>
                            <div className="custom-flex-item custom-justify-between custom-align-item ">
                                <lable htmlfor='user-mobile' className='label-txt' >· MOBILE NO</lable>
                                <input type="tel" id='user-mobile' name="mobile" onChange={handleChangeInput}></input>
                            </div>
                            <div className="custom-flex-item custom-justify-between custom-align-item ">
                                <lable htmlfor='user-type' className='label-txt'>· JOB TYPE</lable>
                                {/* <input type="mail" id='user-emila'></input> */}
                                {/* <select className="user-type " id="user-type">
                                    {options.map((option,idx)=>{
                                        return (
                                        <option className="test" key={generateRandomString(idx)}>{option.label}</option>
                                        )
                                    })}
                                </select> */}
                                <SelectBox options={options} handleChange={handleChangeSelect} />
                            </div>
                        </div>
                    </div>
                    <div className="alert-bottom">
                        <button type="submit" disabled={isMandatory ? false : true} className="checkForm-btn">Apply</button>
                    </div>
                    </form>
                </div>
                
            </div>
            </Style>
        </>
    )
}
export default Join

const Style = styled.div `
.checkForm-btn {
    background-color : ${props=>props.isActive ? '#BB0841' : '#666666'}
}
`

import React, {useState, useEffect} from "react";

import Close from '../../../assets/svgs/icon_close.svg'
import SelectBox from "../../../components/SelectBox";
import { axiosInstance, generateRandomString } from "../../../utils/CommonFunction";

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
            id: undefined,
            branch: undefined,
            email : undefined,
            name : undefined,
            phone : undefined,
            mobile : undefined,
            type : undefined,
        })
    }   
    
    const [joinForm, setJoinForm] = useState({
        id: undefined,
        branch: undefined,
        email : undefined,
        name : undefined,
        phone : undefined,
        mobile : undefined,
        type : undefined,
    })
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
    return (
        <>
            <div className="modal" >
                <form onSubmit={handleSubmitForm}>
                <div className="modal-content modal-join">
                    <div className="alert-top"><span className="modal-title">Request New Account</span><img src={Close} alt="close-btn" onClick={onClose} /></div>
                    <div className="alert-middle">
                        <div className="alert-middle-info join-input">
                            <div className="custom-flex-item custom-justify-between custom-align-item ">
                                <lable htmlfor='user-branch' className='label-txt'>· SHIP TO</lable>
                                <input type="text" id='user-barnch' name="user-barnch"></input>
                            </div>
                            <div className="custom-flex-item custom-justify-between custom-align-item ">
                                <lable htmlfor='user-email' className='label-txt'>· EMAIL</lable>
                                <input type="mail" id='user-email' name="user-email"></input>
                            </div>
                            <div className="custom-flex-item custom-justify-between custom-align-item ">
                                <lable htmlfor='user-name' className='label-txt'>· NAME</lable>
                                <input type="mail" id='user-name' name="user-name"></input>
                            </div>
                            <div className="custom-flex-item custom-justify-between custom-align-item ">
                                <lable htmlfor='user-id' className='label-txt'>· USER ID</lable>
                                <input type="mail" id='user-id'></input>
                            </div>
                            <div className="custom-flex-item custom-justify-between custom-align-item ">
                                <lable htmlfor='user-phone' className='label-txt'>· PHONE NO</lable>
                                <input type="mail" id='user-phone' name="user-phone"></input>
                            </div>
                            <div className="custom-flex-item custom-justify-between custom-align-item ">
                                <lable htmlfor='user-mobile' className='label-txt'>· MOBILE NO</lable>
                                <input type="mail" id='user-mobile' name="mobile"></input>
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
                        <button type="submit">Apply</button>
                    </div>
                </div>
                </form>
            </div>
        </>
    )
}
export default Join
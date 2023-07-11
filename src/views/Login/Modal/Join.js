import React, {useState, useEffect} from "react";

import Close from '../../../assets/svgs/icon_close.svg'
import SelectBox from "../../../components/SelectBox";
import { axiosInstance, generateRandomString, jsonToFormData } from "../../../utils/CommonFunction";
import { styled } from "styled-components";
import axios from "axios";

const Join = props => {

    const {onClose} = props;

    const options = [
        { value: 'LGEKR', label: 'LGEKR' },
        { value: 'Subsidiary Staff', label: 'Subsidiary Staff' },
        { value: 'Subsidiary Admin', label: 'Subsidiary Admin' },
        { value: 'LGC Director', label: 'LGC Director' },
        { value: 'LGC Engineer', label: 'LGC Engineer' },
        { value: 'ASC Director', label: 'ASC Director' },
        { value: 'ASC Engineer', label: 'ASC Engineer' }

    ]
   
    const clearForm = () =>{
        setJoinForm({
            userId: '',
            userName: '',
            email : '',
            shipTo : '',
            phoneNo : '',
            mobileNo : '',
            jobType : '',
        })
    }   
    
    const [joinForm, setJoinForm] = useState({
        userId: '',
        userName: '',
        email : '',
        shipTo : '',
        phoneNo : '',
        mobileNo : '',
        jobType : '',
    })
    const [isMandatory, setIsMandatory] = useState(false);

    const handleSubmitForm = event => {
        event.preventDefault();
        event.stopPropagation();

        console.log(joinForm);

        const config =  {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
        }
        // state에 저장된 user-type추가
        // 통신. . . .
        // 완료 후 clearForm()
        axios.post(process.env.REACT_APP_SERVER_URL + '/login/requestNewAccount', joinForm)
        .then(res => {
            let resData = res.data;
            console.log(resData);
        })
        .catch(error => {
            console.log("ERROR>>>", error.response)
            // setFailModal(true);
        })
    }

    const handleChangeSelect = res => {
        console.log(res.label)
        let type = res.label;
        setJoinForm({
            ...joinForm,
            jobType: type,
        })
       
    }
    const handleChangeInput = e => {
        let title = e.target.id;
        let value = e.target.value;

        if(title==='user-branch') {
            setJoinForm({
                ...joinForm,
                shipTo : value
            })
        }else if(title==='user-email') {
            setJoinForm({
                ...joinForm,
                email : value
            })
        }else if(title==='user-name') {
            setJoinForm({
                ...joinForm,
                userName: value
            })
        }else if(title==='user-id') {
            setJoinForm({
                ...joinForm,
                userId: value
            })
        }else if(title==='user-phone') {
            setJoinForm({
                ...joinForm,
                phoneNo: value
            })
        }else if(title==='user-mobile') {
            setJoinForm({
                ...joinForm,
                mobileNo: value
            })
        }
    }

    useEffect(()=>{
        if(joinForm.userId!=='' && joinForm.userName !== '' && joinForm.email!=='' && joinForm.phoneNo !== '' && joinForm.mobileNo !== '' && joinForm.shipTo !== '' ) {
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
        <Style isactive={isMandatory?true:false}>
            <div className="modal" >
               
                <div className="modal-content modal-join">
                <form onSubmit={handleSubmitForm}>
                    <div className="alert-top"><span className="modal-title">Request New Account</span><img src={Close} alt="close-btn" onClick={onClose} /></div>
                    <div className="alert-middle">
                        <div className="alert-middle-info join-input">
                            <div className="custom-flex-item custom-justify-between custom-align-item ">
                                <label htmlFor='user-branch' className='label-txt'>· SHIP TO</label>
                                <input type="text" id='user-branch' name="shipTo" onChange={handleChangeInput}></input>
                            </div>
                            <div className="custom-flex-item custom-justify-between custom-align-item ">
                                <label htmlFor='user-email' className='label-txt'>· EMAIL</label>
                                <input type="email" id='user-email' name="email" onChange={handleChangeInput}></input>
                            </div>
                            <div className="custom-flex-item custom-justify-between custom-align-item ">
                                <label htmlFor='user-name' className='label-txt'>· NAME</label>
                                <input type="text" id='user-name' name="userName" onChange={handleChangeInput}></input>
                            </div>
                            <div className="custom-flex-item custom-justify-between custom-align-item ">
                                <label htmlFor='user-id' className='label-txt'>· USER ID</label>
                                <input type="text" id='user-id' name="userId" onChange={handleChangeInput}></input>
                            </div>
                            <div className="custom-flex-item custom-justify-between custom-align-item ">
                                <label htmlFor='user-phone' className='label-txt'>· PHONE NO</label>
                                <input type="tel" id='user-phone' name="phoneNo" onChange={handleChangeInput}></input>
                            </div>
                            <div className="custom-flex-item custom-justify-between custom-align-item ">
                                <label htmlFor='user-mobile' className='label-txt' >· MOBILE NO</label>
                                <input type="tel" id='user-mobile' name="mobileNo" onChange={handleChangeInput}></input>
                            </div>
                            <div className="custom-flex-item custom-justify-between custom-align-item ">
                                <label htmlFor='user-type' className='label-txt'>· JOB TYPE</label>
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
    background-color : ${props=>props.isactive ? '#BB0841' : '#666666'}
}
`

import React, {useState, useEffect} from "react";

import { styled } from "styled-components";

import Close from '../../../assets/svgs/icon_close.svg'
import Check from '../../../assets/svgs/icon_check.svg'

const Otp = props => {

    const {onClose} = props;

    const [userInfo, setUserInfo] = useState({
        id : '',
        password : '',
        email : '',
    })

    const [authenticated, setAuthenticated] = useState(false) 

    const handleChangeInput = e =>{
        let title = e.target.id;
        let value = e.target.value;
        if(title==='user-id') {
            setUserInfo({
                ...userInfo,
                id : value
            })
        }else if(title==='user-password') {
            setUserInfo({
                ...userInfo,
                password : value
            })
        }else if(title==='user-email') {
            setUserInfo({
                ...userInfo,
                email : value
            })
        }
    }
    

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

    const handleCheckUser = event => {

        event.preventDefault();
        event.stopPropagation();
        
        console.log(event)
        // GSFS 사용자 인증 후 true 버튼 활성화
        setAuthenticated(true)
    }

    
    return (
        <>
        <Style isActive={ userInfo.email === '' || userInfo.id==='' || userInfo.password === '' ? false : true} >
            <div className="modal">
                <form onSubmit={handleSubmitForm} >
                <div className="modal-content modal-join modal-otp">
                    <div className="alert-top"><span className="modal-title">OTP Key Request</span><img src={Close} alt="close-btn" onClick={onClose} /></div>
                    <div className="alert-middle">
                        <div className="alert-middle-info">
                            <div className="custom-flex-item custom-justify-between custom-align-item ">
                                <lable htmlfor='user-id' className='label-txt'>· GSFS ID</lable>
                                <input type="text" id='user-id' name="user-id" onChange={handleChangeInput}></input>
                            </div>
                            <div className="custom-flex-item custom-justify-between custom-align-item ">
                                <lable htmlfor='user-password' className='label-txt'>· PASSWORD</lable>
                                <input type="password" id='user-password' name="user-password" onChange={handleChangeInput}></input>
                            </div>
                            <div className="custom-flex-item custom-justify-between custom-align-item ">
                                <lable htmlfor='user-email' className='label-txt'>· EMAIL</lable>
                                <input type="email" id='user-email' name="user-email" onChange={handleChangeInput}></input>
                            </div>
                        </div>
                    </div>
                    <div className="alert-bottom">
                        <button onClick={handleCheckUser}  className="checkForm-btn" disabled={ userInfo.email === '' || userInfo.id==='' || userInfo.password === '' ? true : false}>Authentication</button>
                        <div className="horizon-division"></div>
                        <button type="submit" disabled={authenticated? false : true} style={authenticated ? {backgroundColor : '#BB0841'}:{backgroundColor:'#666666'}}>OTP Key Request</button>
                    </div>
                </div>
                </form>
            </div>
            </Style>
        </>
    )
}
export default Otp

const Style = styled.div `
    .checkForm-btn {
        background-color : ${props=>props.isActive ? '#BB0841' : '#666666'}
    }
`
import React, {useState, useEffect} from "react";

import { styled } from "styled-components";

import Alert from "../../../components/Alert";

import Close from '../../../assets/svgs/icon_close.svg'
import Check from '../../../assets/svgs/icon_check.svg'

const TempOtp = props => {

    const {onClose} = props;

    const [userInfo, setUserInfo] = useState({                   // 버튼 활성화/비활성화를 위해 필수데이터 onChnage시 입력, 전송은 form 태그로...
        id : '',
        password : '',
        email : '',
        type : '',
    })

    const [authenticated, setAuthenticated] = useState(false)    // GSFS 사용자 인증 상태
    const [alertModal, setAlertModal] = useState(false)          // OTP 카드 존재시 알림창으로 발급 여부 확인하는 창
    
    const alertTxt = `Gsfsplus-America.lge.com say
    Do you want to make the new OTP Key?
    If you have previously, your OTP Key will be
    reset.`;

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
    
    const handleChangeCheckbox = e => {
        let authType = e.target.id;
        setUserInfo({
            ...userInfo,
            type : authType
        })
    }
    const handleSubmitForm = event => {
        event.preventDefault();
        event.stopPropagation();

        let form = event.currentTarget;
        let formData = Object.fromEntries(new FormData(form));
        
        // state에 저장된 user-type추가
        // formData.append('uesr-type', joinForm.type) 
        // 통신. . . .
        
        // OTP 카드 존재시 알림창으로 발급 여부 확인하는 창
        setAlertModal(true)
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
        <Style isactive={userInfo.id==='' || userInfo.password === '' ? false : true} >
            <div className="modal">
                <form onSubmit={handleSubmitForm} >
                <div className="modal-content modal-join modal-otp tmp-otp">
                    <div className="alert-top"><span className="modal-title">OTP Temporary Pawwrod Request</span><img src={Close} alt="close-btn" onClick={onClose} /></div>
                    <div className="alert-middle">
                        <div className="alert-middle-info">
                            <div className="custom-flex-item custom-justify-between custom-align-item ">
                                <label htmlFor='user-id' className='label-txt'>· GSFS ID</label>
                                <input type="text" id='user-id' name="user-id" onChange={handleChangeInput}></input>
                            </div>
                            <div className="custom-flex-item custom-justify-between custom-align-item ">
                                <label htmlFor='user-password' className='label-txt'>· PASSWORD</label>
                                <input type="password" id='user-password' name="user-password" onChange={handleChangeInput}></input>
                            </div>
                            
                        </div>
                    </div>
                    <div className="alert-bottom">
                        <button onClick={handleCheckUser}  className="checkForm-btn" disabled={userInfo.id==='' || userInfo.password === '' ? true : false}>Authentication</button>
                        <div className="horizon-division"></div>

                        <div className="custom-flex-item custom-align-item otp-checkbox">
                                <div className="custom-flex-item">
                                    <input type="radio" id='email' name="auth-type" onChange={handleChangeCheckbox} className="radio-btn"></input>
                                    <label htmlFor='user-email' className='label-txt'>· EMAIL</label>
                                </div>
                                <div className="custom-flex-item">
                                    <input type="radio" id='tel' name="auth-type" onChange={handleChangeCheckbox} className="radio-btn"></input>
                                    <label htmlFor='user-mobile' className='label-txt'>· MOBILE NO</label>
                                </div>
                        </div>
                        <div className="custom-flex-item custom-justify-between custom-align-item ">
                                <input type={userInfo.authType !==''  ? userInfo.authType :'text'} id='user-email' name="user-email" onChange={handleChangeInput}></input>
                        </div>

                        <button type="submit" className="otp-btn" disabled={authenticated? false : true} style={authenticated ? {backgroundColor : '#BB0841'}:{backgroundColor:'#666666'}}>OTP Key Request</button>
                    </div>
                </div>
                </form>
                {
                    alertModal
                    &&
                    <Alert alertTxt={alertTxt} onClose={()=>setAlertModal(false)} twoBtn btnTxt='OK'/>
                }
            </div>
            </Style>
        </>
    )
}
export default TempOtp

const Style = styled.div `
    .checkForm-btn {
        background-color : ${props=>props.isactive ? '#BB0841' : '#666666'}
    }
`
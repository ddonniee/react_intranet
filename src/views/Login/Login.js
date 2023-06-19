import React, { useEffect, useState } from "react";

import { styled } from "styled-components";

// views
import Header from "../../components/Header";
// modal
import Join from "./Modal/Join";
import FindPW from "./Modal/FindPW";
import Password from "./Modal/Password";
import Otp from "./Modal/Otp";
import TempOtp from "./Modal/TempOtp";
// components
import Zendesk from "../../components/Zendesk";
import Alert from "../../components/Alert";
// icons
import Reload from '../../assets/svgs/icon_reload.svg'
import Link from '../../assets/svgs/icon_more.svg'
import Check from '../../assets/svgs/icon_check.svg'
// functions
import { detectUserAgent, generateRandomString } from "../../utils/CommonFunction";



const Login = () =>{

    const [loginInfo, setLoginInfo] = useState({
        id : '',
        pw : '',
        otp : '',
    })
    
    const [failModal, setFailModal] = useState(false);               // 로그인 실패시 알림창 
    const [joinModal, setJoinModal] = useState(false);               // 회원가입 모달창
    const [passwordModal, setPasswordModal] = useState(false);       // 패스워드찾기 모달창
    const [otpModal, setOtpModal] = useState(false);                 // OTP 발급 모달창
    const [tempOtpModal, setTempOtpModal] = useState(false);         // 일회용 OTP 모달창


    // 횟수에 따라 once 부분 바꾸는 로직 필요
    const [alertTxt, setAlertTxt] = useState(`You entered your ID and PW incorrectly once.\nYou cannot log in if you enter incorrectly more than 5 times.`)

    // 보안문자 서버에서 내려오는 이미지 저장
    const [securityUrl, setSecurityUrl] = useState('https://images.pexels.com/photos/17202950/pexels-photo-17202950.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    // OTP 인증 로그인 여부
    const [isOtp, setIsOtp] = useState(false);
    const linkList = [
        {title : `REQUEST NEW ACCOUNT`, value:'join'},
        {title : `FORGET PASSWORD`, value:'find-pw'},
        {title : `OTP KEY REQUEST`, value:'req-otp'},
        {title : `OTP TEMPORARY PASSWORD`, value:'req-tmp-otp'},
    ]
    const handleCheckLogin = e => {
        // 로그인 처리
        // 실패시
        setFailModal(true)
    }
    const handleChangeInput = e =>{
        let title = e.target.id;
        let value = e.target.value;
        if(title==='login-id') {
            setLoginInfo({
                ...loginInfo,
                id : value
            })
        }else if(title==='login-pw') {
            setLoginInfo({
                ...loginInfo,
                pw : value
            })
        }else if(title==='login-otp') {
            setLoginInfo({
                ...loginInfo,
                otp : value
            })
        }
    }
    const handleChangeCheck = e => {

        let title = e.target.id
        console.log(title)
        if(title==='otp-checkbox') {
            setIsOtp(!isOtp)
        }
    }
    const generateSecurityCode = e => {
        // 서버에 보안문자 새로 요청
        let newSecurity = 'https://cdn.pixabay.com/photo/2023/05/05/11/07/sweet-7972193_640.jpg'
        setSecurityUrl(newSecurity);
    }
    const handleClickLink = e => {
        let title = e.target.title;
        if(title==='join') {
           setJoinModal(!joinModal)
        }else if(title==='find-pw') {
            setPasswordModal(!passwordModal)
        }else if(title==='req-otp') {
            setOtpModal(!otpModal)
        }else if(title==='req-tmp-otp') {
            setTempOtpModal(!tempOtpModal)
        }
    }

    const [isMobile, setIsMobile] = useState();
    const checkUserAgent = () => {
        let agent = detectUserAgent();
        setIsMobile(agent==='pc'?false:true)
    }
    useEffect(()=>{
        checkUserAgent()
    },[])
    return (
        <>
        <Style disable={(loginInfo.id === '' || loginInfo.pw ==='') && true} >
            {
                isMobile &&
                <Header />
            }
            <div className="inner-container">
                <div className="login-background">
                    <div className="login-area">
                        <div className="login-top"><span className="welcome-title">{isMobile ? 'Login' : 'Welcome to LG CS portal' } </span></div>
                        <div className="login-middle" >
                            <div className="login-info-left">
                                <input type="text" id="login-id" placeholder="USER ID"  onChange={handleChangeInput}/>
                                <input type="password" id="login-pw" placeholder="PASSWORD"  onChange={handleChangeInput}/>
                                <div className="login-check-area">
                                    <label htmlFor="login-checkbox" className="custom-checkbox-label">
                                        <input type="checkbox" id="login-checkbox" className="custom-checkbox" />
                                        <span className="custom-checkbox-icon"><img src={Check} alt='icon-check'/></span>
                                        <span className="custom-checkbox-text">Remember my ID</span>
                                    </label>
                                    <label id="otp-check" htmlFor="otp-checkbox" className="custom-checkbox-label" onClick={handleChangeCheck}>
                                        <input type="checkbox" id="otp-checkbox" className="custom-checkbox" />
                                        <span className="custom-checkbox-icon"><img src={Check} alt='icon-check'/></span>
                                        <span className="custom-checkbox-text">OTP Login</span>
                                    </label>
                                </div>
                                {
                                    isOtp 
                                    ?
                                    <div className="login-otp-area">
                                        <input type="password" id="login-otp" placeholder="OTP PASSWORD (Optional)" onChange={handleChangeInput}/>
                                        <span className="login-warning">※ You can use all functions only when you log in after entering OTP.</span>
                                    </div>
                                    :
                                    <div className="login-security-txt custom-justify-between">
                                        <div>
                                            <img src={securityUrl} className="security-num"/>
                                            <img src={Reload} alt='reload-security-num' className="security-reload" onClick={generateSecurityCode}/>
                                        </div>
                                        <input className="secutiry-txt" type="text" />
                                    </div>
                                }
                                <button className="login-btn" onClick={handleCheckLogin} disabled={(loginInfo.id === '' || loginInfo.pw ==='') ? true : false} >ENTER</button>
                            </div>
                            <div className="login-info-right">
                                <ul>
                                    {
                                        linkList?.map((list,idx)=>{
                                            return (
                                                <li title={list.value} key={generateRandomString(idx)} className="custom-justify-between" onClick={handleClickLink}><span title={list.value}>{list.title}</span><img  title={list.value} src={Link} alt='login-link'/></li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="login-bottom">
                            <span>Notice</span>
                            <span>{`This Web site is strictly restricted to only employees or business parrtners of LG Electronics \n Any illegal access will be punished according to related laws.`}</span>
                        </div>
                    </div>
                   
                </div>
                {
                    !isMobile
                    &&
                    <Zendesk />
                }
                    {
                        failModal
                        &&
                        // Confirm 누르면 연결되는 event로 추후변경
                        <Alert alertTxt={alertTxt} onClose={()=>setFailModal(false)} btnTxt='Confirm' onConfirm={()=>setFailModal(false)}/>
                    }
                    {
                        joinModal
                        &&
                        <Join onClose={()=>setJoinModal(false)}/>
                    }
                     {
                        passwordModal
                        &&
                        <Password onClose={()=>setPasswordModal(false)}/>
                    }
                    {
                        otpModal
                        &&
                        <Otp onClose={()=>setOtpModal(false)} />
                    }
                    {
                        tempOtpModal
                        &&
                        <TempOtp onClose={()=>setTempOtpModal(false)}/>
                    }
            </div>
            </Style>
        </>
    )
}

export default Login

const Style = styled.div `
    .login-btn {
        background-color : ${props=>props.disable===true ? '#FAF1F4' : '#BB0841'}
    }
    .login-btn:hover {
        background-color : ${props=>props.disable===true ? '#FAF1F4' : '#82072e'}
    }
`
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
import { axiosInstance, detectUserAgent, generateRandomString } from "../../utils/CommonFunction";
import axios from "axios";


const Login = () =>{

    const [loginInfo, setLoginInfo] = useState({
        userId : '',
        password : '',
        authType : '',
        authKey : '',
    })
    
    const [failModal, setFailModal] = useState(false);               // 로그인 실패시 알림창 
    const [joinModal, setJoinModal] = useState(false);               // 회원가입 모달창
    const [passwordModal, setPasswordModal] = useState(false);       // 패스워드찾기 모달창
    const [otpModal, setOtpModal] = useState(false);                 // OTP 발급 모달창
    const [tempOtpModal, setTempOtpModal] = useState(false);         // 일회용 OTP 모달창

    // 캡차 인증 문자 가져오기
    const [captchaSrc, setCaptchaSrc] = useState("http://localhost:8090/login/getCaptcha");

    // 횟수에 따라 once 부분 바꾸는 로직 필요
    const [alertTxt, setAlertTxt] = useState(`You entered your ID and PW incorrectly once.\nYou cannot log in if you enter incorrectly more than 5 times.`)

    // OTP 인증 로그인 여부
    const [isOtp, setIsOtp] = useState(false);

    const handleCheckLogin = e => {
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + process.env.REACT_APP_TEMP_JWT_LGEKR,
            },
            data: loginInfo
        };

        // 로그인 처리
        axiosInstance.post("/login/doLogin", config)
        .then(res => {
            console.log(res);

        })
        .catch(error => {
            console.log(error)
            setFailModal(true);
        })
    }

    const handleChangeInput = e =>{
        let title = e.target.id;
        let value = e.target.value;
        if(title==='login-id') {
            setLoginInfo({
                ...loginInfo,
                userId : value
            })
        }else if(title==='login-pw') {
            setLoginInfo({
                ...loginInfo,
                password : value
            })
        }else if(title==='login-otp') {
            setLoginInfo({
                ...loginInfo,
                authKey : value
            })
        }
    }

    /** 체크 박스 선택 */
    const handleChangeCheck = e => {
        let title = e.target.id
        if(title==='otp-checkbox') {
            setIsOtp(!isOtp)
            let authType = e.target.value ? "otp" : "captcha";  // 인증타입
            setLoginInfo({ ...loginInfo, authType: authType, authKey: "" });
        }
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


    // 캡차 이미지 가져오기
    const getCaptcha = (e) => {
        e.preventDefault();

        // 매번 새로운 캡차를 받기 위해 랜덤 문자열을 넣어줌
        var rand = Math.random();
        var url = "http://localhost:8090/login/getCaptcha?rand=" + rand;
        setCaptchaSrc(url);
    };

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
        <Style disabled={(loginInfo.id === '' || loginInfo.pw ==='') && true} >
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
                                            <img src={captchaSrc} className="security-num"/>
                                            <img src={Reload} alt='reload-security-num' className="security-reload" onClick={getCaptcha}/>
                                        </div>
                                        <input className="secutiry-txt" type="text" onChange={e => setLoginInfo({ ...loginInfo, authKey: e.target.value })}/>
                                    </div>
                                }
                                <button className="login-btn" onClick={handleCheckLogin} disabled={(loginInfo.id === '' || loginInfo.pw ==='') ? true : false} >ENTER</button>
                            </div>
                            <div className="login-info-right">
                                <ul>
                                        <li title={"join"} className="custom-justify-between" onClick={handleClickLink}><span title={"join"}>REQUEST NEW ACCOUNT</span><img title={"join"} src={Link} alt='login-link' /></li>
                                        <li title={"find-pw"} className="custom-justify-between" onClick={handleClickLink}><span title={"find-pw"}>FORGET PASSWORD</span><img title={"find-pw"} src={Link} alt='login-link' /></li>
                                        <li title={"req-otp"} className="custom-justify-between" onClick={handleClickLink}><span title={"req-otp"}>OTP KEY REQUEST</span><img title={"req-otp"} src={Link} alt='login-link' /></li>
                                        <li title={"req-tmp-otp"} className="custom-justify-between" onClick={handleClickLink}><span title={"req-tmp-otp"}>OTP TEMPORARY PASSWORD</span><img title={"req-tmp-otp"} src={Link} alt='login-link' /></li>
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
        background-color : ${props=>props.disabled===true ? '#FAF1F4' : '#BB0841'}
    }
    .login-btn:hover {
        background-color : ${props=>props.disabled===true ? '#FAF1F4' : '#82072e'}
    }
`
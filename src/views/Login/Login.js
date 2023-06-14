import React, { useEffect, useState } from "react";

import { styled } from "styled-components";
import Zendesk from "../../components/Zendesk";

import Reload from '../../assets/svgs/icon_reload.svg'
import Link from '../../assets/svgs/icon_more.svg'
import Check from '../../assets/svgs/icon_check.svg'


const Login = () =>{

    const [loginInfo, setLoginInfo] = useState({
        id : '',
        pw : '',
        otp : '',
    })

    const [securityUrl, setSecurityUrl] = useState('https://images.pexels.com/photos/17202950/pexels-photo-17202950.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    const [isOtp, setIsOtp] = useState(false);

    const handleCheckLogin = e => {
        console.log(e)

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
    useEffect(()=>{
        console.log('id',loginInfo.id)
        console.log('pw',loginInfo.pw)
    },[loginInfo])
    return (
        <>
        <Style disable={(loginInfo.id === '' || loginInfo.pw ==='') && true} >
            <div className="inner-container">
                <div className="login-background">
                    <div className="login-area">
                        <div className="login-top"><span className="welcome-title">Welcome to LG CS portal</span></div>
                        <div className="login-middle custom-justify-between" >
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
                                            <img src={Reload} alt='reload-security-num' className="security-reload"/>
                                        </div>
                                        <input className="secutiry-txt" type="text" />
                                    </div>
                                }
                                <button className="login-btn" onClick={handleCheckLogin} disabled={(loginInfo.id === '' || loginInfo.pw ==='') ? true : false} >ENTER</button>
                            </div>
                            <div className="login-info-right">
                                <ul>
                                    <li className="custom-justify-between"><span>{`REQUEST \n NEW ACCOUNT`}</span><img src={Link} alt='login-link'/></li>
                                    <li className="custom-justify-between"><span>{`FORGET \n PASSWORD`}</span><img src={Link} alt='login-link'/></li>
                                    <li className="custom-justify-between"><span>{`OTP KEY \n REQUEST`}</span><img src={Link} alt='login-link'/></li>
                                    <li className="custom-justify-between"><span>{`OTP TEMPORARY \n PASSWORD`}</span><img src={Link} alt='login-link'/></li>
                                </ul>
                            </div>
                        </div>
                        <div className="login-bottom">
                            <span>Notice</span>
                            <span>{`This Web site is strictly restricted to only employees or business parrtners of LG Electronics \n Any illegal access will be punished according to related laws.`}</span>
                        </div>
                    </div>
                </div>
                <Zendesk />
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
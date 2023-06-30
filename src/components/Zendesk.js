import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { getBrowserLanguage } from "../utils/CommonFunction";
import Logo from '../assets/svgs/icon_qna.svg'
const Zendesk = () =>{

    const [lang, setLang] = useState('');
    const [url, setUrl] = useState('');

    const setZendeskUrl = () =>{
        let set = process.env.REACT_APP_US_ISSUE_TICKET
        if(lang==='en-US') {
            set = process.env.REACT_APP_US_ISSUE_TICKET
        }else if(lang==='en-CA') {
            set = process.env.REACT_APP_CA_ISSUE_TICKET
        }
        setUrl(set)
    }

    const handleClickLogo = e => {
        window.open(url, "_blank")
    }
    useEffect(()=>{
        const browserLanguage = getBrowserLanguage();
        setLang(browserLanguage)
    },[])

    useEffect(()=>{
        setZendeskUrl()
    },[lang])

    return(
        <Style>
        <div className="zendesk-btn cursor-btn" onClick={handleClickLogo}><img src={Logo} alt="logo"/></div>
        </Style>
    )

}

export default Zendesk;

const Style = styled.div`
    .zendesk-btn {
        position : absolute; bottom: 0; right: 0; padding: 20px
    }
`
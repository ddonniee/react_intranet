import React, {useState, useEffect} from "react";

import { styled } from "styled-components";
import Close from '../../../assets/svgs/icon_close.svg'
import SelectBox from "../../../components/SelectBox";
import { fetchInstance, generateRandomString } from "../../../utils/CommonFunction";

const Password = props => {

    const {onClose} = props;

    // temp data
    const infoTxt = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es
    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, to
    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur ma
    Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed qu
    `;

    const [resultMsg, setResultMsg] = useState();
    const [userInfo, setUserInfo] = useState({
        userId: '',
        email: ''
    })

    const handleChangeInput = e =>{
        let title = e.target.id;
        let value = e.target.value;
        if(title==='user-id') {
            setUserInfo({
                ...userInfo,
                id : value
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
        let formData = new FormData(form)
        
        console.log(Object.fromEntries(formData));
        
        fetchInstance.post("/login/findPassword", formData)
        .then(res => {
            setResultMsg(res.data.msg);
        })
        .catch(error => {
            console.log(error);
        })
    }

    const closeAlert =()=> {
        onClose();
    }

    return (
        <>
        <Style isactive={userInfo.email==='' || userInfo.id==='' ? false : true}>
            <div className={`modal ${resultMsg ? "no-radius" : ""}`}>
                <form onSubmit={handleSubmitForm}>
                <div className="modal-content modal-join modal-password">
                    <div className="alert-top"><span className="modal-title">Find Password</span><img src={Close} alt="close-btn" onClick={closeAlert} /></div>
                    <div className="alert-middle">
                        <div className="alert-middle-txt">{infoTxt}</div>
                        <div className="alert-middle-info join-input">
                         
                            <div className="custom-flex-item custom-justify-between custom-align-item ">
                                <label htmlFor='user-id' className='label-txt'>· USER ID</label>
                                <input type="text" id='user-id' name="userId" onChange={handleChangeInput}></input>
                            </div>

                            <div className="custom-flex-item custom-justify-between custom-align-item ">
                                <label htmlFor='user-email' className='label-txt'>· EMAIL</label>
                                <input type="email" id='user-email' name="email" onChange={handleChangeInput}></input>
                            </div>
                          
                        </div>
                    </div>
                    <div className="alert-bottom">
                        <button type="submit" className="checkForm-btn" disabled={userInfo.email==='' || userInfo.id==='' ? true : false}>Apply</button>
                    </div>
                </div>
                {resultMsg && <div className="result-msg">{resultMsg}</div>}
                </form>
            </div>
            </Style>
        </>
    )
}
export default Password

const Style = styled.div `
    .checkForm-btn {
        background-color : ${props=>props.isactive ? '#BB0841' : '#666666'}
    }
`

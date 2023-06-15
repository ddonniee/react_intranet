import React, {useState, useEffect} from "react";

import { styled } from "styled-components";
import Close from '../../../assets/svgs/icon_close.svg'
import SelectBox from "../../../components/SelectBox";
import { axiosInstance, generateRandomString } from "../../../utils/CommonFunction";

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

    const [userInfo, setUserInfo] = useState({
        id: '',
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
        let formData = Object.fromEntries(new FormData(form));
        
        console.log(formData)
        // 통신. . . .
    }
    return (
        <>
        <Style isActive={userInfo.email==='' || userInfo.id==='' ? false : true}>
            <div className="modal" >
                <form onSubmit={handleSubmitForm}>
                <div className="modal-content modal-join modal-password">
                    <div className="alert-top"><span className="modal-title">Find Password</span><img src={Close} alt="close-btn" onClick={onClose} /></div>
                    <div className="alert-middle">
                        <div className="alert-middle-txt">{infoTxt}</div>
                        <div className="alert-middle-info join-input">
                         
                            <div className="custom-flex-item custom-justify-between custom-align-item ">
                                <lable htmlfor='user-id' className='label-txt'>· USER ID</lable>
                                <input type="text" id='user-id' name="user-id" onChange={handleChangeInput}></input>
                            </div>

                            <div className="custom-flex-item custom-justify-between custom-align-item ">
                                <lable htmlfor='user-email' className='label-txt'>· EMAIL</lable>
                                <input type="mail" id='user-email' name="user-email" onChange={handleChangeInput}></input>
                            </div>
                          
                        </div>
                    </div>
                    <div className="alert-bottom">
                        <button type="submit" className="checkForm-btn" disabled={userInfo.email==='' || userInfo.id==='' ? true : false}>Apply</button>
                    </div>

                    
                </div>
                </form>
            </div>
            </Style>
        </>
    )
}
export default Password

const Style = styled.div `
    .checkForm-btn {
        background-color : ${props=>props.isActive ? '#BB0841' : '#666666'}
    }
`

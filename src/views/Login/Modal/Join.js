import React, {useState, useEffect} from "react";

import Close from '../../../assets/svgs/icon_close.svg'

const Join = props => {

    const {onClose} = props;
    const handleJoin = e =>{
        console.log('apply join')
    }
    const infoTxt = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es
    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, to
    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur ma
    Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed qu`;

    return (
        <>
            <div className="modal">
                <div className="modal-content modal-join">
                    <div className="alert-top"><span className="modal-title">Request New Account</span><img src={Close} alt="close-btn" onClick={onClose} /></div>
                    <div className="alert-middle">
                        <div className="alert-middle-txt">{infoTxt}</div>
                        <div className="alert-middle-info">
                            <lable htmlfor='user-id'>USER ID</lable>
                            <input type="text" id='user-id'></input>
                            <lable htmlfor='user-email'>EMAIL</lable>
                            <input type="mail" id='user-emila'></input>
                        </div>
                    </div>
                    <div className="alert-bottom">
                        <button onClick={handleJoin}>Apply</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Join
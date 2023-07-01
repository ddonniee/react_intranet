import React, {useState, useEffect} from "react";

import Close from '../assets/svgs/icon_close.svg'

const Alert = props => {

    const {alertTxt, onClose, btnTxt, twoBtn, onConfirm} = props;

    return (
        <>
            <div className="modal">
                <div className="modal-content alert-only custom-justify-between">
                    <div className="alert-top"><img src={Close} alt="close-btn" onClick={onClose} /></div>
                    <div className="alert-middle"><span>{alertTxt}</span></div>
                    <div className="alert-bottom">
                        {
                            !twoBtn
                            ?
                            <button onClick={onClose}>{btnTxt}</button>
                            :
                            <>
                            <button onClick={onClose} className="cancel-btn">Cancel</button>
                            <button onClick={onConfirm}>{btnTxt}</button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Alert
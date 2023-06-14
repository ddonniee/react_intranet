import React, {useState, useEffect} from "react";

import Close from '../assets/svgs/icon_close.svg'

const Alert = props => {

    const {txt, onClose} = props;

    return (
        <>
            <div className="modal">
                <div className="modal-content">
                    <div className="alert-top"><img src={Close} alt="close-btn" onClick={onClose} /></div>
                    <div className="alert-middle"><span>{txt}</span></div>
                    <div className="alert-bottom">
                        <button onClick={onClose}>Confirm</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Alert
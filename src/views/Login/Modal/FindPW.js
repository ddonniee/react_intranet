import React, {useState, useEffect} from "react";

import Close from '../../../assets/svgs/icon_close.svg'
import Check from '../../../assets/svgs/icon_check.svg'
const FindPW = props => {

    const {onClose} = props;
    const handleFind = e =>{
        console.log('find pw')
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
                <div className="modal-content modal-pw">
                    <div className="alert-top"><span className="modal-title">Privacy Policy (Mandatory)</span><img src={Close} alt="close-btn" onClick={onClose} /></div>
                    <div className="alert-middle">
                        <div className="alert-middle-txt">{infoTxt}</div>
                        <div className="alert-middle-info">
                            <label htmlFor="pw-checkbox" className="custom-checkbox-label">
                                <input type="checkbox" id="pw-checkbox" className="custom-checkbox" />
                                <span className="custom-checkbox-icon"><img src={Check} alt='icon-check'/></span>
                                <span className="custom-checkbox-text">I Agree</span>
                            </label>
                        </div>
                    </div>
                    <div className="alert-bottom">
                        <button onClick={handleFind}>Apply</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default FindPW
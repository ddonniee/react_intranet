import React from "react";
import styled from "styled-components";

const Warning = props =>{

    const {text, onClose} = props;

    setTimeout(()=>{
        onClose(false)
    },[3000])

    return(
        <Style>
            <div className="modal">
                <div className="timeout-modal">
                    <span>{text}</span>
                </div>
            </div>
        </Style>
    )
}
export default Warning;

const Style = styled.div`
    .timeout-modal {
        background : black; padding: 10px 15px; border-radius: 10px;
        span {
            color: white; font-size: 1.2rem; font-weight: 600;
        }
    }
`
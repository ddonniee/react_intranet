import React from "react";
import Spinner from '../assets/gif/Spin-1s-200px.gif'
import { styled } from "styled-components";

const Loading = () =>{
    return(
        <Style>
        <div className="loading-wrapper custom-align-item custom-flex-item custom-justify-center">
            <img src={Spinner} alt="loading"/>
        </div>
        </Style>
    )
}
export default Loading;

const Style = styled.div`
    .loading-wrapper {
        height : 100%;
        img {
            width : 30px; height : 30px;
        }
    }
`

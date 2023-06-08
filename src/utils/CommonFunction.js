import { elements } from "chart.js";
import React, {useRef, useEffect} from "react";

/** key값 추가를 위한 랜덤문자열 생성 함수 */
export const generateRandomString = (num) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
/** Browser 언어 설정 읽어오는 함수 */
export const getBrowserLanguage = () =>{
    const browserLanguage = navigator.language;
    
    return browserLanguage;
};
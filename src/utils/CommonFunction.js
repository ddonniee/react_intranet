import { elements } from "chart.js";
import React, {useRef, useEffect} from "react";
import axios from 'axios';

/** axios instance */
export const axiosInstance = axios.create({
    baseURL: 'https://www.ag-grid.com', // 서버 나오면 수정
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('Token'),
        'Content-Type': 'multipart/form-data'
    }
});

export const axiosJsonInstance = axios.create({
    baseURL: 'https://www.ag-grid.com',
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('Token'),
        'Content-Type': 'application/json; charset=utf-8'
    }
});

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
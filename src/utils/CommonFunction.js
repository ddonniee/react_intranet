import React, { useRef, useEffect } from "react";
import axios from 'axios';
import CryptoJS from 'crypto-js';

/** axios instance */
export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    // baseURL: 'http://localhost:8090',
    maxBodyLength: Infinity,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

export const axiosInstance2 = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    maxBodyLength: Infinity,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

export const axiosJsonInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    maxBodyLength: Infinity,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    }
});

export const axiosIconInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  maxBodyLength: Infinity,
  headers: { 
    'Authorization': 'Bearer '+process.env.REACT_APP_TEMP_JWT_SUBSIDIARY_ADMIN, 
  },
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

export const loadCSS =(cssPath)=> {
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  var cssFilePath = isMobile ? 'mobile.css' : 'pc.css';

  var cssLink = document.createElement('link');
  cssLink.rel = 'stylesheet';
  cssLink.href = cssPath;

  document.head.appendChild(cssLink);
}

export const detectUserAgent =()=> {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  let agent = '';
    
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
      userAgent
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      userAgent.substr(0, 4)
    )
  ) {
    // 모바일용 CSS 파일 경로
    agent = 'mobile'
  } else {
    // PC용 CSS 파일 경로
    agent = 'pc'
  }
  return agent
}

// 첨부파일 다운로드
export const downloadAttachment = (path) => {
    window.location.href = process.env.REACT_APP_DOWN_URL+"/"+path;
}

// 데이터 암호화 
export const encryptData = (plaindata) => {
  const secretPass = process.env.REACT_APP_ENCRYPT_KEY;
  const data = CryptoJS.AES.encrypt(
    JSON.stringify(plaindata),
    secretPass
  ).toString();
  return data;
}

// 데이터 복호화
export const decryptData = (plaindata) => {
  const secretPass = process.env.REACT_APP_ENCRYPT_KEY;
  const bytes = CryptoJS.AES.decrypt(plaindata, secretPass);
  const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return data;
};

// 로그인 정보 암호화한 데이터 복호화 하기
export const userinfoDecrypt = () => {
  try {
    const userinfoStr = decryptData(sessionStorage.getItem(process.env.REACT_APP_USERINFO_KEY));
    return JSON.parse(userinfoStr)
  } catch (error) {
    console.log(error);
    // document.location.href = '/login';
  }
}

// 토큰 가져오기
export const tokenDecrypt =()=> {
  try {
    const userinfoStr = decryptData(sessionStorage.getItem(process.env.REACT_APP_TOKEN_KEY));
    return userinfoStr
  } catch (error) {
    console.log(error);
    // document.location.href = '/login';
  }
}

// json -> form data
export const jsonToFormData = (json) => {
  const formData = new FormData();

  for (const key in json) {
      if (json.hasOwnProperty(key)) {
          formData.append(key, json[key]);
      }
  }

  return formData;
}

/** convert file size */
export const convertFileSize = (sizeInBytes) => {
    const kilobyte = 1024;
    const megabyte = kilobyte * 1024;

    if (sizeInBytes >= megabyte) {
      return `${(sizeInBytes / megabyte).toFixed(0)}MB`;
    } else if (sizeInBytes >= kilobyte) {
      return `${(sizeInBytes / kilobyte).toFixed(0)}KB`;
    } else {
      return `${sizeInBytes}B`;
    }
};

// html 문자열에서 태그 제거
export const removeHTMLTags = (htmlString) => {
  const doc = new DOMParser().parseFromString(htmlString, 'text/html');
  return doc.body.textContent || '';
}

/** fetch instance */
export const fetchInstance = (url, formData) => {
  
  console.log(formData)
  console.log(url)
  var config = {
            method: 'post',
            maxBodyLength: Infinity,
            headers: { 
              "Content-Type": "application/json"
            },
            body : JSON.stringify(formData)
            };

  return fetch(process.env.REACT_APP_SERVER_URL+url, formData && config)
    .then((response) => {
      console.log(response)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

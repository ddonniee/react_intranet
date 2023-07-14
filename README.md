# asc_portal site settings test1

## 문서정보
작성자 : 이은정
작성일자 : 2023-05-13

## 버전관리
node v18.16.0
npm v6.14.13
Docker version 23.0.5

## 도커 이미지로 프로젝트 실행
docker run -d -p 8080:3000 portal_image:버전

## 소스코드 변경시 컨테이너 재시작 (개발환경)
docker stop containerID
docket start container ID

## 폴더 구조 설명
asc_portal
├─node_modules
├─public
└─src
│  App.css
│  App.js
│  App.test.js
│  index.css
│  index.js
│  logo.svg
│  reportWebVitals.js
│  routes.js
│  setupTests.js
│
├─assets          // 정적파일
├─components      // 재사용 컴포넌트
├─hooks           // React hook 
├─scss            // css files 
├─utils           // 재사용 함수
└─views           // 페이지 소스

## 컴포넌트 설명
Editor.js         // wyswyg
CreateTicket.je   // 위젯으로 바로 티켓 발행
Top.js            // url 값으로 페이지 타이틀 및 경로 설정
## utils 설명
ExportExcel.js    // 배열전달시 엑셀로 추출

## hooks 설명
TestContext.js    // 전역으로 user 정보 관리하는 hooks 
FileUpload.js     // 대용량 파일 첨부


## 로그인 후 사용자 정보 및 토큰 가져오기
### `사용자 정보 가져오기`
```js
import { userinfoDecrypt } from "../../utils/CommonFunction";

// 사용자 정보 가져오기
userinfoDecrypt();

// userinfoDecrypt() 결과에서 필요한 내용 꺼내서 사용
let userInfo = {
    "userId": "CSPORTAL",                     // 아이디
    "userName": "Joseph",                     // 사용자명
    "corporationCode": "LGEKR",               // 법인코드
    "billToCustomerCode": "LGEKR007194H",     // 센터코드
    "billToCustomerName": "LGEKR_ELECTRIC",   // 센터명
    "branchCode": "LGEKR_BRANCH_8736U",       // 브랜치코드
    "branchName": "Alexander electric shop",  // 브랜치명
    "jobType": "Subsidiary Admin",  // 잡타입
    "authzCode": "SA",              // 권한코드
    "language": "kr",               // 언어
    "centerType": "LGC",            // 센터타입
};

// 사용 예
const userInfo = userinfoDecrypt();
console.log(userInfo?.userId);
```

### `토큰 가져오기`
```js
const token = tokenDecrypt();
```

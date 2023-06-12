# asc_portal site settings

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
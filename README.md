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

## 프론트 코드 실행
npm start

## json server 실행
json 서버로 이동
cd ./src/database
json-server --watch faq.json --port 8090

## 접근 가능한 게시판 
Support / process&Support / faq

### `사용자 정보 가져오기`
App단에 저장된 사용자 정보 useContext로 각 컴포넌트에 전달
(로그인시 userinfoDecrypt()로 사용자 정보 읽기)
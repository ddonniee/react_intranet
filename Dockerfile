# 노드버전
FROM nodev18.16.0

# 작업 디렉토리 설정
WORKDIR /app

# package.json 및 package-lock.json 복사
COPY package.json .
# COPY yarn.lock .

# 의존성
# 패키지 설치
RUN npm install --global npm@6.14.13 
    # npm install --global yarn@1.22.17 && \
    # yarn install

# 소스 코드 복사
COPY . .

# 포트 노출 및 실행 명령어
EXPOSE 3000
CMD ["npm", "start"]
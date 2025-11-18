# pwa2-meerketgram
| 항목            | 내용                                                       |
| ------------- | -------------------------------------------------------- |
| **프로젝트명**     | meerketgram                                                |
| **설명**        | 사용자들이 게시글과 댓글로 소통하는 커뮤니티형 웹앱                             |
| **핵심 기능**     | 회원가입/로그인(JWT), 소셜 로그인, 권한(Role) 기반 접근, 사진 업로드, PWA 푸시 알림 |
| **사용 기술**     | Vite + React 19 (프론트) / Express 5 (백엔드) / MySQL 8.4 (DB) |
| **SRS**     | [SRS_meertagram.xlsx](https://github.com/user-attachments/files/23586389/SRS_meertagram.xlsx) |

<br>

# 프로젝트 구조
````
meerkatgram/
├── client/             # Vite + React (PWA)
│   ├── src/                # React 실행 관련 로직
│   │   ├── assets/             # 비공개 정적 파일
│   │   ├── config/             # 설정 파일 (환경 변수, API 엔드포인트, Firebase/Web Push 설정 등)
│   │   ├── components/         # 컴포넌트
│   │   ├── routes/             # React 라우터
│   │   ├── store/              # 리덕스 관련
│   │   │   ├── slices/            # 리덕스 슬라이스 관련
│   │   │   └── store.js
│   │   ├── utils/              # 유틸
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── sw.js               # service-worker 파일
│   ├── index.html
│   └── vite.config.js
│
├── server/             # Express
│   ├── app/                # Express 실행 관련 로직
│   │   ├── controllers/        # 컨트롤러 레이어 (유효성 검사 & Request·Response 시 데이터 가공 처리 & 비지니스 로직으로의 연결)
│   │   ├── middlewares/        # 미들웨어 (JWT 인증, 권한 체크, 에러 핸들링, 로깅 등)
│   │   ├── models/             # 모델 (Sequelize 등 모델)
│   │   ├── repositories/       # DB 접근 레이어
│   │   ├── services/           # 비즈니스 로직 레이어
│   │   └── utils/              # 유틸
│   ├── configs/                # 전역 설정 파일 (DB, JWT, OAuth, Push 등)
│   ├── database/           # 데이터베이스 관련
│   │   ├── migrations/         # 마이그레이션 (DB 스키마 작성 파일 등)
│   │   └── seeders/            # 시더 (DB 더미 데이터 생성 파일 등)
│   ├── routes/             # API 엔드포인트 정의
│   ├── storage/            # 정적 파일을 서빙 디렉토리 (업로드 파일, PWA build 결과물 저장소), 주의: 운영환경은 경로 다름 
│   ├── app.js              # API 엔트리 포인트
│   └── .env                # 환경 변수 설정 파일
└── READEME.md
````

<br>

# 프로젝트 디자인
<img width="1273" height="1221" alt="Image" src="https://github.com/user-attachments/assets/36813f6a-a155-4ffe-a341-8f4413fa4520" />

<br>

# ERD
<img width="1773" height="982" alt="Image" src="https://github.com/user-attachments/assets/4ae34858-7936-415a-9081-d7b3435343d3" />

<br>

# 설치 라이브러리
### client
````
npm create vite@latest .
npm i dayjs react-router-dom @reduxjs/toolkit react-redux axios jwt-decode
npm install -D vite-plugin-pwa
````

### server
````
npm init
npm i express express-validator morgan winston dotenv sequelize sequelize-cli mysql2 cookie-parser jsonwebtoken cors multer swagger-ui-express yaml dayjs bcrypt web-push
npm install -D nodemon
````
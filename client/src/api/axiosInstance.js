import axios from 'axios';

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: '', // 기본 URL (axios 호출 시, 가장 앞에 자동으로 연결하여 동작)
  headers: {
    'Content-Type': 'application/json',  // 문자열로 인식시키기 위해서 ' '사용
  },
  // 크로스 도메인(서로 다른 도메인)에 요청 보낼 때, credential 정보를 담아서 보낼지 여부 설정.
  // credential 정보 : 1. 쿠키, 2. 헤더 Authorization 항목
  withCredentials: true, 
});


export default axiosInstance;
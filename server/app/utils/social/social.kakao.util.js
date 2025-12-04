/**
 * @file app/utils/social/social.kakao.util.js
 * @description 카카오 소셜 관련 유틸리티
 * 251204 v1.0.0 yeon init
 */

/**
 * 카카오 인가 코드 발급 URL 생성
 * @returns {string} URL
 */
function getAuthorizeURL() {
 const params = { // 객체 -> 쿼리 파라미터로 바꾸어야 함. 
  client_id: process.env.SOCIAL_KAKAO_REST_API_KEY, // rest API 키 
  redirect_uri: `${process.env.APP_URL}${process.env.SOCIAL_KAKAO_CALLBACK_URL}`,
  response_type: 'code',
  // prompt: 'login', 
  // TODO: 나중에 다시 살릴 것(테스트 용이성을 위해 잠시 지워둠.)
 };
 // Java Script 내에서 
 const queryParams = new URLSearchParams(params).toString();

 return `${process.env.SOCIAL_KAKAO_API_URL_AUTHORIZE}?${queryParams}`;
}

function getTokenRequest(code) {
  const headers = {
    'Content_Type': 'Content-Type: application/x-www-form-urlencoded;charset=utf-8' 
  };

  const params = {
    grant_type: 'authorization_code',
    client_id: process.env.SOCIAL_KAKAO_REST_API_KEY,
    redirect_uri: `${process.env.APP_URL}${process.env.SOCIAL_KAKAO_CALLBACK_URL}`,
    code: code
  };

  const searchParams = new URLSearchParams(params);

  return { headers, searchParams };
}

function getUserRequest(token) {
   const headers = {
    Authorization: `Bearer ${token}`,
    'Content_Type': 'Content-Type: application/x-www-form-urlencoded;charset=utf-8' 
  };

  const params = {
    secure_resource: true
  };

  const searchParams = new URLSearchParams(params);

  return { headers, searchParams };
}

function getLogoutRequest(id, token) {
   const headers = {
    Authorization: `Bearer ${token}`,
    'Content_Type': 'Content-Type: application/x-www-form-urlencoded;charset=utf-8' 
  };

  const params = {
    target_id_type: 'user_id',
    target_id: id
  };

  const searchParams = new URLSearchParams(params);

  return { headers, searchParams }

}

export default {
  getAuthorizeURL,
  getTokenRequest,
  getUserRequest,
  getLogoutRequest
}
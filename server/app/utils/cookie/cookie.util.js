/**
 * @file app/utils/cookie/cookie.util.js
 * @description Cookie 유틸리티
 * 251125 v1.0.0 yeon init
 */

import dayjs from 'dayjs';

// -----------------------
// private
// -----------------------
/**
 * 
 * @param {import("express").Response} res 
 * @param {string} cookieName 
 * @param {string} cookieValue 
 * @param {number} ttl 
 * @param {boolean} httpOnlyFlg 
 * @param {boolean} secureFlg 
 * @param {string|null} path
 */
function setCookie(res, cookieName, cookieValue, ttl, httpOnlyFlg = true, secureFlg = false, path = null) {
  const options = {
    expires: dayjs().add(ttl, 'second').toDate(),
    httpOnly: httpOnlyFlg,
    secure: secureFlg,
    sameSite:'none',
  }

  if(path) {
    options.path = path;
  }

  res.cookie(cookieName, cookieValue, options);
}

/**
 * 특정 쿠키 획득(미존재 시, 빈 문자열 반환)
 * @param {import("express").Request} req 
 * @param {string} cookieName
 * @returns {string} 
 */
function getCookie(req, cookieName) {
  let cookieValue = '';

  if(req.cookies) {
    cookieValue = req.cookies[cookieName];
  }

  return cookieValue;
}

/**
 * 쿠키 제거 
 * @param {import("express").Response} res 
 * @param {string} cookieName  
 * @param {boolean} httpOnlyFlg 
 * @param {boolean} secureFlg 
 * @param {string|null} path
 */
function clearCookie(res, cookieName, httpOnlyFlg = true, secureFlg = false, path = null) {
  const options = {
    httpOnly: httpOnlyFlg,
    secure: secureFlg,
    sameSite: 'none',
  }

  if(path) {
    options.path = path;
  }

  res.clearCookie(cookieName, options);
}

// -----------------------
// public
// ------------------------
/**
 * 쿠키에 리프래시 토큰 설정
 * @param {import("express").Response} res 
 * @param {string} refreshToken 
 */
function setCookieRefreshToken(res, refreshToken) {
  setCookie(
    res,
    process.env.JWT_REFRESH_TOKEN_COOKIE_NAME,
    refreshToken,
    parseInt(process.env.JWT_REFRESH_TOKEN_COOKIE_EXPIRY),
    true,
    true,
    process.env.JWT_REISS_URI
  );
}

/**
 * 특정 쿠키 획득(미존재 시, 빈 문자열 반환)
 * @param {import("express").Request} req
 * @returns {string}
 */
function getCookieRefreshToken(req) {
  return getCookie(req, process.env.JWT_REFRESH_TOKEN_COOKIE_NAME);
}

/**
 * 리프래시 토큰 쿠기 제거
 */
function clearCookieRefreshToken(res) {
  clearCookie(
    res,
    process.env.JWT_REFRESH_TOKEN_COOKIE_NAME,
    true,
    true,
    process.env.JWT_REISS_URI
  );
}

export default {
  setCookieRefreshToken,
  getCookieRefreshToken,
  clearCookieRefreshToken,
}
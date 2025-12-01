/**
 * @file app/controllers/auth.controller.js
 * @description 인증 관련 컨트롤러
 * 251119 v1.0.0 yeon init 
 */

import { REISSUE_ERROR, SUCCESS } from "../../configs/responseCode.config.js";
import myError from "../errors/customs/my.error.js";
import authService from "../services/auth.service.js";
import cookieUtil from "../utils/cookie/cookie.util.js";
import { createBaseResponse } from "../utils/createBaseResponse.util.js";

// --------------------
// -------public-------
// --------------------
/**
 * 로그인 컨트롤러 처리
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체
 */

async function login(req, res, next) {
  try {
    const body = req.body; // 파라미터 획득

    // 로그인 서비스 호출 
    const { accessToken, refreshToken, user } = await authService.login(body);

    // Cookie에 RefreshToken 설정
    cookieUtil.setCookieRefreshToken(res, refreshToken);

    res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, {accessToken, user}));
  } catch (error) {
    next(error);
  }
}

/**
 * 토큰 재발급 컨트롤러 처리
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체
 */
async function reissue(req, res, next) {
  console.log(req.cookies);
  try {
    const token = cookieUtil.getCookieRefreshToken(req);


    // 토큰 존재 여부 확인 
    if(!token) {
      throw myError('리프래시 토큰 없음', REISSUE_ERROR);
    }

    // 토큰 재발급 처리 
    const { accessToken, refreshToken, user } = await authService.reissue(token);

    // 쿠키에 리프래시 토큰 설정
    cookieUtil.setCookieRefreshToken(res, refreshToken);

    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, { accessToken, user }))
  } catch (error) {
    next(error);
  }
};


// ------------
// export
// ------------
export const authController = {
  login,
  reissue,
};

// export default {
//  login,
// };
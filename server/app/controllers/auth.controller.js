/**
 * @file app/controllers/auth.controller.js
 * @description 인증 관련 컨트롤러
 * 251119 v1.0.0 yeon init 
 */

import { SUCCESS } from "../../configs/responseCode.config.js";
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
  const body = req.body;
  res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, body));
}

// ------------
// export
// ------------
export const authController = {
  login,
};

// export default {
//  login,
// };
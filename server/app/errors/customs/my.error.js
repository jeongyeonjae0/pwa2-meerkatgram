/**
 * @file app/errors/customs/my.error.js
 * @description 커스텀 에러 객체 생성
 * 251124 v1.0.0 yeon init
 */

import { SYSTEM_ERROR } from "../../../configs/responseCode.config.js";

/**
 * 공통 에러 객체 생성
 * @param {string} msg - 에러 메세지
 * @param {import("../../../configs/responseCode.config.type.js").ResponseCodeConfig} codeInfo - 응답 코드 정보
 * @returns
 */
export default function myError(msg = '', codeInfo = SYSTEM_ERROR) {
  const err = new Error(msg);
  err.codeInfo = codeInfo;
  return err;
}
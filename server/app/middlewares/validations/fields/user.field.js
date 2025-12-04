/**
 * @file app/middlewares/validations/fields/user.field.js
 * @description 유저 정보 유효성 검토 필드
 * 251119 v1.0.0 yeon init 
 */

import { body, param } from "express-validator";
import PROVIDER from "../../auth/configs/provider.enum.js";

// export const email = body('email')
//   .notEmpty()
//   .withMessage('이메일은 필수 항목입니다.')
//   .bail()
//   .isEmail()
//   .withMessage('유효한 이메일을 입력해 주세요')
// ;

// export const password = body('password')
//   .notEmpty()
//   .withMessage('비밀번호는 필수 항목입니다.')
//   .bail()
//   .matches(/^[a-zA-Z0-9!@#$]{8,20}$/) // 정규식 활용
//   .withMessage('영어대소문자·숫자·!·@·#·$, 8~20자 허용') 
// ;

const email = body('email')
  .trim()
  .notEmpty()
  .withMessage('이메일은 필수 항목입니다.')
  .bail()
  .isEmail()
  .withMessage('유효한 이메일을 입력해 주세요')
;

const password = body('password')
  .trim()
  .notEmpty()
  .withMessage('비밀번호는 필수 항목입니다.')
  .bail()
  .matches(/^[a-zA-Z0-9!@#$]{8,20}$/) // 정규식 활용
  .withMessage('영어대소문자·숫자·!·@·#·$, 8~20자 허용') 
;

const provider = param('provider')
  .trim()
  .notEmpty()
  .withMessage('필수 항목입니다.')
  .bail()
  .custom(val => {
    return PROVIDER[val.toUpperCase()] ? true : false;
  })
  .withMessage('허용하지 않는 값입니다.')

export default {
  email,
  password,
  provider,
};
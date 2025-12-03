/**
 * @file app/middlewares/validations/fields/comment.field.js
 * @description comment 유효성 검사 필드
 * 251203 v1.0.0 yeon init 
 */

import { body } from "express-validator";

// 게시글 pk 필드
export const postId = body('postId') 
  .trim()
  .notEmpty()
  .withMessage('필수 항목 입니다.')
  .bail()
  .isNumeric()
  .withMessage('숫자만 허용합니다.')
  .toInt();

// 유저 pk 필드
export const replyId = body('replyId') 
  .trim()
  .notEmpty()
  .withMessage('필수 항목 입니다.')
  .bail()
  .isNumeric()
  .withMessage('숫자만 허용합니다.')
  .toInt();

// 게시글 내용
export const content = body('content')
  .trim()
  .notEmpty()
  .withMessage('내용은 필수 항목입니다.');
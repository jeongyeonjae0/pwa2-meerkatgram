/**
 * @file app/controllers/files.controller.js
 * @description 파일 업로드 관련 컨트롤러
 * 251127 v1.0.0 yeon init 
 */

import { BAD_FILE_ERROR, SUCCESS } from "../../configs/responseCode.config.js";
import myError from "../errors/customs/my.error.js";
import { createBaseResponse } from "../utils/createBaseResponse.util.js";

// --------------------
// -------public-------
// --------------------
/**
 * 게시글 이미지 업로드 컨트롤러
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체
 * @returns
 */
async function storePost(req, res, next) {
  try {
    // 파일 여부 확인
    if(!req.file) {
      throw myError('파일 없음', BAD_FILE_ERROR);
    }

    const result = {
      // http://localhost:3000/files/posts/3tgtg-
      path: `${process.env.APP_URL}${process.env.ACCESS_FILE_POST_IMAGE_PATH}/${req.file.filename}`
    };
    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
  } catch (error) {
    next(error);
  }
}


/**
 * 게시글 프로필 업로드 컨트롤러
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체
 * @returns
 */
async function storeProfile(req, res, next) {
  try {
    // 파일 여부 확인
    if(!req.file) {
      throw myError('파일 없음', BAD_FILE_ERROR);
    }

    const result = {
      // http://localhost:3000/files/profile/3tgtg-g3434.png
      path: `${process.env.APP_URL}${process.env.ACCESS_FILE_USER_PROFILE_PATH}/${req.file.filename}`
    };
    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
  } catch (error) {
    next(error);
  }
}
export default {
  storePost,
  storeProfile,
}
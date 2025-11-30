/**
 * @file app/controllers/posts.controller.js
 * @description 게시글 리스트 조회 컨트롤러
 * 251128 v1.0.0 yeon init 
 */

import { SUCCESS } from "../../configs/responseCode.config.js";
import postsService from "../services/posts.service.js";
import { createBaseResponse } from "../utils/createBaseResponse.util.js";

/**
 * 게시글 리스트 조회 
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체
 * @returns
 */
async function index(req, res, next) {
  try {
    const page = req.body?.page || 1;

    const result = await postsService.pagination(page);

    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
  } catch (error) {
    return next(error);
  }
}

/**
 * 게시글 상세 조회 
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체
 * @returns
 */
async function show(req, res, next) {
  try {
    const result = await postsService.show(req.params.id);

    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
  } catch (error) {
    return next(error);
  }
};




/**
 * 게시글 작성
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체 
 * @returns
 */
async function store(req, res, next) {
  try {
    const data = {
      userId: req.user.id,
      content: req.body.content,
      image: req.body.image,
    };

    const result = await postsService.create(data);

    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
  } catch(error) {
    return next(error);
  }
}

/**
 * 게시글 삭제
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFunction 객체 
 * @returns
 */
async function destroy(req, res, next) {
  try {
    const data = {
      userId: req.user.id,
      postId: req.params.id
    };

    await postsService.destroy(data);

    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS));
  } catch(error) {
    return next(error);
  }
}

export default {
  index,
  show,
  store,
  destroy,
}

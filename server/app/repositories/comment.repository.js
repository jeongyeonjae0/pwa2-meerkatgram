/**
 * @file app/repositories/comment.repository.js
 * @description comment Repository
 * 251129 v1.0.0 park init
 */

import db from '../models/index.js';
const {sequelize, Post, Comment} = db;

/**
 * 게시글 삭제
 * @param {import("sequelize").Transaction|null} t 
 * @param {import("../middlewares/validations/validators/posts/show.validator.type.js").PostShowParams} id 
 * @returns {Promise<number>}
 */
async function destroy(t = null, id) {
  return await Comment.destroy(
    {
      where: { postId : id },
      transaction: t
    }
  );
}

export default {
  destroy,
}
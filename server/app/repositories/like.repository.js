/**
 * @file app/repositories/like.repository.js
 * @description like Repository
 * 251129 v1.0.0 park init
 */

import db from '../models/index.js';
const {sequelize, Post, Like} = db;

/**
 * 게시글 삭제
 * @param {import("sequelize").Transaction|null} t 
 * @param {import("../middlewares/validations/validators/posts/show.validator.type.js").PostShowParams} id 
 * @returns {Promise<number>}
 */
async function destroy(t = null, id) {
  return await Like.destroy(
    {
      where: { postId : id },
      transaction: t
    }
  );
}

export default {
  destroy,
}
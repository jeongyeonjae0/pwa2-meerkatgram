/**
 * @file app/services/posts.service.js
 * @description posts Service
 * 251128 yeon init
 */

import postRepository from "../repositories/post.repository.js";
import db from '../models/index.js';
import commentRepository from "../repositories/comment.repository.js";
import likeRepository from "../repositories/like.repository.js";

// -----------------------
// Types
// -----------------------
/**
 * 페잊 타입
 * @typedef {number} Page
 */

/**
 * 게시글 ID 타입
 * @typedef {number} Id
 */

/**
 * 게시글 작성 타입
 * @typedef {object} PostStoreData
 * @property {number} userId
 * @property {string} content
 * @property {string} image
 */


// -----------------------
// Public
// -----------------------
/**
 * 게시글 페이지네이션(최상위 댓글 포함)
 * @param {Page} page - 페이지 번호
 * @returns {Promise<Array<import("../models/Post.js").Post>>}
 */
async function pagination(page) {
  const limit = 6;
  const offset = limit * (page - 1);

  return await postRepository.pagination(null, { limit, offset });
}

/**
 * 게시글 상세
 * @param {Id} id 
 * @returns {Promise<import("../models/Post.js").Post>}
 */
async function show(id) {
  return await postRepository.findByPk(null, id);
}

/**
 * 게시글 작성
 * @param {PostStoreData} data
 * @returns {Promise<import("../models/Post.js").Post>}
 */
async function create(data) {
  return await postRepository.create(null, data);
}

/**
 * 게시글 삭제
 * @param {Id} id 
 * @returns {Promise<number>}
 */
async function destroy(id) {
  // 트랜잭션 시작
  return db.sequelize.transaction(async t => {
    // 코멘트 삭제
    await commentRepository.destroy(t, id);

    // 좋아요 삭제
    await likeRepository.destroy(t, id);
    
    // 게시글 삭제
    await postRepository.destroy(t, id);
  });
  
}

export default {
  pagination,
  show,
  create,
  destroy,
}
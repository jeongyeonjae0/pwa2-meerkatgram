/**
 * @file app/services/posts.service.js
 * @description posts Service
 * 251128 yeon init
 */

import myError from '../errors/customs/my.error.js';
import postRepository from "../repositories/post.repository.js";
import db from '../models/index.js';
import commentRepository from "../repositories/comment.repository.js";
import likeRepository from "../repositories/like.repository.js";
import { UNMATCHING_USER_ERROR } from '../../configs/responseCode.config.js';

// -----------------------
// Public
// -----------------------
/**
 * 게시글 페이지네이션(최상위 댓글 포함)
 * @param {import("./posts.service.type.js").page} page - 페이지 번호
 * @returns {Promise<Array<import("../models/Post.js").Post>>}
 */
async function pagination(page) {
  const limit = 6;
  const offset = limit * (page - 1);

  return await postRepository.pagination(null, { limit, offset });
}

/**
 * 게시글 상세
 * @param {import("./posts.service.type.js").Id} id 
 * @returns {Promise<import("../models/Post.js").Post>}
 */
async function show(id) {
  return await postRepository.findByPkWithComments(null, id);
}

/**
 * 게시글 작성
 * @param {import("./posts.service.type.js").PostStoreData} data
 * @param {Promise<Array<import("../models/Post.js").Post>>} 
 */
async function create(data) {
  return await db.sequelize.transaction(async t => {
    return await postRepository.create(t, data);
  });
}

/**
 * 게시글 삭제
 * @param {import("./posts.service.type.js").PostDestroyData} data 
 * @returns {Promise<number>}
 */
async function destroy({ userId, postId }) {
  // 트랜잭션 시작
  return await db.sequelize.transaction(async t => {
    // (게시글 작성자 일치 확인용)
    const post = await postRepository.findByPk(t, postId);

    // 게시글 작성자 일치 확인
    if(post.userId !== userId) {
      throw myError('작성자 불일치', UNMATCHING_USER_ERROR);
    }
    
    // 코멘트 삭제
    await commentRepository.destroy(t, postId);

    // 좋아요 삭제
    await likeRepository.destroy(t, postId);
    
    // 게시글 삭제
    await postRepository.destroy(t, postId);
  });
  
}

export default {
  pagination,
  show,
  create,
  destroy,
}
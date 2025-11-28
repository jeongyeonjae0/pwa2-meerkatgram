/**
 * @file app/services/posts.service.js
 * @description posts Service
 * 251128 yeon init
 */

import postRepository from "../repositories/post.repository.js";

async function pagination(page) {
  const limit = 6;
  const offset = limit * (page - 1);

  return await postRepository.pagination(null, { limit, offset });
}

async function show(id) {
  return await postRepository.findByPk(null, id);
}

export default {
  pagination,
  show,
}
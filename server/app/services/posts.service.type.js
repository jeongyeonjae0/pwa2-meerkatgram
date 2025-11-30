/**
 * @file app/services/posts.service.type.js
 * @description posts Service Types
 * 251129 park init
 */

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

/**
 * 게시글 삭제 타입
 * @typedef {object} PostDestroyData
 * @property {number} userId
 * @property {number} postId
 */

export default {}
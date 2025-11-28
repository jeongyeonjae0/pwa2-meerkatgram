/**
 * @file app/repositories/post.repository.js
 * @description post Repository 
 * 251128 v1.0.0 yeon init
 */

import db from '../models/index.js';
const {sequelize, Post, Comment} = db;

async function pagination(t = null, data) {
  return await Post.findAll(
    // data, 
    // {
    //   transaction: t,
    // }
    {
      order: [
        ['createdAt', 'DESC'],
        ['updatedAt', 'DESC'],
        ['id', 'ASC']
      ],
      limit: data.limit,
      offset: data.offset
    },
    {
      transaction: t,
    }
  );
}

async function findByPk(t = null, id) {
  return await Post.findByPk(
    id,
    {
      include: [
        {
          model: Comment,
          as: 'post-has-comment',
          where: {
            replyId: 0
          },
          required: false, // Left Join 설정
        }
      ],
      transaction: t
    }
  );
}

export default {
  pagination,
  findByPk,
}
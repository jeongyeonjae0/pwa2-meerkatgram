/**
 * @file app/repositories/pushSubscription.repository.js
 * @description pushSubscription Repository 
 * 251208 v1.0.0 yeon init
 */

import db from '../models/index.js';
const { PushSubscription } = db;

async function upsert(t = null, data) {
  return await PushSubscription.upsert(data, {transaction: t});
}

async function findByUSerId(t = null, userId) {
  return await PushSubscription.findAll(
    {
      where: {
        userId: userId
      }
    },
    {
      transaction: t
    }
  );
}

async function hardDestory(t = null, id) {
  return await PushSubscription.destory({
    where: {id: id},
    force: true, // 모델에 soft-delete 옵션이 있으므로, hard-delete로 동작하게 바꿔 줌
    transaction: t,
  });
}

export default {
  upsert,
  findByUSerId,
  hardDestory,
}
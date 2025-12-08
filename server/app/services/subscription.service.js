/**
 * @file app/services/subscription.service.js
 * @description subscription Service
 * 251208 yeon init
 */

import pushSubscriptionRepository from "../repositories/pushSubscription.repository.js";

async function subscribe(params) {
  const { userId, subscription, deviceInfo } = params;
  // subscription의 구조
  // {
  //   endpoint: 'https://fcm.googleapis.com/fcm/send/dFlTq11Ly-w:...',   O
  //   expirationTime: null,
  //   keys: {
  //     p256dh: 'BD9B5KMdQbwgG7...',                                     O
  //     auth: 'OL56CZS...'                                               O   
  //   }
  // }
  // deviceInfo의 구조 , 유저가 어떤 디바이스로 subscription을 보내왔는지 
  // {
  //   userAgent: navigator.userAgent,   // 브라우저/디바이스 정보            O
  //   language: navigator.language      // 언어 정보
  // }
  // 구조 분해 
  const { endpoint, keys } = subscription;
  const { userAgent } = deviceInfo;

  const data = {
    userId: userId,
    endpoint: endpoint,
    p256dh: keys.p256dh,
    auth: keys.auth,
    device: userAgent
  };


  return await pushSubscriptionRepository.upsert(null, data);
}

export default {
  subscribe,
}
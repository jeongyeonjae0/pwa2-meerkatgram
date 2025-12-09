/**
 * @file app/services/comments.service.js
 * @description comments Service
 * 251203 yeon init
 */

import webpush from '../../configs/webpush.config.js';
import commentRepository from "../repositories/comment.repository.js";
import postRepository from '../repositories/post.repository.js';
import userRepository from '../repositories/user.repository.js';
import db from '../models/index.js';
import pushSubscriptionRepository from "../repositories/pushSubscription.repository.js";

/**
 * 코멘트 작성 처리
 * @param {{postId: string, userId: string, content: string}} data 
 */
async function store(data) {
  // 코멘트 작성
  const comment = await commentRepository.create(null, data);

  // 게시글 조회
  const post = await postRepository.findByPk(null, data.postId);

  // 타인 게시글일 경우만, 푸시 보내기
  if(post.userId !== data.userId) {
    await db.sequelize.transaction(async t => {
      // 댓글 작성자 정보 조회 
      const user = await userRepository.findByPk(t, data.userId);
      
      // 푸시 데이터 작성
      const payload = JSON.stringify({
        title: '새로운 댓글', // 푸시 제목
        message: `${user.nick}님께서 당신의 게시글에 댓글을 작성하였습니다.`, // 푸시 내용
        data: { // 푸시 화면에는 출력하지 않지만 전달할 필요가 있는 data
          // 서버와 프론트 URL을 나누지 않았으므로 APP_URL 이용 
          // 만약 서버와 프론트 URL을 나눈다면 프론트 URL로 대체 해야 함. 
          targetUrl: `${process.env.APP_URL}${process.env.WEB_PUSH_FRONT_URL_POST_SHOW}/${data.postId}`
        } 
      });

      // 게시글 작성자의 푸시 정보 획득
      const pushSubscriptions = await pushSubscriptionRepository.findByUSerId(t, post.userId); 
      
      // 해당 푸시 발송
      // 동기 처리로 하면, 서버와 통신을 예를 들어 10번을 하게 된다면 시간이 오래 걸림
      // 비동기 처리로 해서 병렬 처리(한번에 보내기)로 하면 시간을 단축 시킬 수 있음. 
      // 1. 복수이므로 루프 돌리기 
      // pushSubscriptions(배열 처럼 쓸 수 있음)
      // pushSubscription(한 개의 레코드를 가져옴)
      const pushList = pushSubscriptions.map(async pushSubscription => {
        // subscription 구조
        const subscription = {
          endpoint: pushSubscription.endpoint, // DB에서 가져온 것
          expirationTime: null,
          keys: {
            p256dh: pushSubscription.p256dh, // 암호화된 키 
            auth: pushSubscription.auth      // 접근할 수 있는 권한 
          }
        };

        try {
          await webpush.sendNotification(subscription, payload);
        } catch (error) {
          // 2. expired(410 에러)한 푸시는 제거
          // hard-delete 해야 하는 근거 
          // soft delete : 관리자 입장에서 추후에 여러 가지 할 때 필요한 데이터 ex)통계 
          // endpoint : 통계가 필요할까?, 관리자 입장에서 필요하지 않으므로 신속히 hard-delete 해야 함.   
          if(error.statusCode === 410) {
            await pushSubscriptionRepository.hardDestory(t, pushSubscription.id);
          }
          console.log('push error', error);
        }
      });

        // 3. 병렬처리 완료 확인 
        // const return result를 삭제하는 이유 : 추후에 사용하지 않을 것 같으므로 삭제
       await Promise.allSettled(pushList); 
      console.log('pushSubscriptions', pushSubscriptions); 
    });
  }

  // 4. 문제 없으면 후속처리 진행  
  return comment; 

}

export default {
  store,
}
import webpush from 'web-push';

// push 할 때 보내는 설정 값들 
webpush.setVapidDetails(
  // 발행자, public key, private key
  `mailto:${process.env.JWT_ISSUER}`, 
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY,
);

export default webpush;
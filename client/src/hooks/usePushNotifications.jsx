import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance.js";

export default function usePushNotifications() {
  // 권한 플래그
  // NotificationPermission: "default" | "denied" | "granted"
  // 설정을 안한 기본 상태 : default
  // 거부 : denied
  // 승낙 : granted
  // 유저가 권한 거부를 한 경우, 코드상으로는 재설정 불가능
  // 크롬의 경우 `chrome://settings/content/notifications`로 접속하여 직접 허용 설정 필요
  const [isSubscribing, setIsSubscribing] = useState(false);
  // isSubscribing : push service를 등록 했는지 확인. 
  const [isInit, setIsInit] = useState(false);
  // isInit : 초기화 처리 
  const [isCheckedSubscribe, setIsCheckedSubscribe] = useState(false);
  // isCheckedSubscribe : Accept를 한번이라도 눌렀는지 확인

  useEffect(() => {
    // usePushNotifications 초기화
    async function init() {
      try {
        // 서비스 워커 준비
        const registration = await navigator.serviceWorker.ready;
        
        // 등록 중인 구독 정보 획득
        const subscribing = await registration.pushManager.getSubscription();
        if(subscribing) {
          setIsSubscribing(true);
        }
      } catch(error) {
        console.log(error);
      } finally {
        setIsInit(true);
      }
    }
    init();
  }, []);

  // 권한 요청
  async function requestPermission() {
    try {
      // 알림 허용을 해주지 않는 브라우저인지 확인 
      if('Notification' in window) {
        // Notification 지원하는 경우
        if(Notification?.permission === 'default') {
          // 허용이 아닌경우 처리
          const result = await Notification.requestPermission();
          // 실행하면 허용할지 말지 창이 뜸 (사용자가 허용할지 안 할지 클릭하는 동안까지 기다림)

          if(result !== 'granted') {
            alert('알림 허용을 하지 않으면 서비스 이용에 제한이 있습니다.');
            return false;
          } else {
            return true; // 허용을 반환
          }
        } else if(Notification?.permission === 'denied') {
            alert('알림을 거부하신 이력이 있습니다.\n알림 허용을 하지 않으면 서비스 이용에 제한이 있습니다.');
            // service walker 지원하는 브라우저 일 때, 어떤 행동을 하면 허용할 수 있는지 페이지 만들기. 
            return false;
        } else {
          return true;
        }
      } else {
        // Notification 지원하지 않는 경우
        alert('알림을 지원하지 않는 브라우저입니다.');
        return false;
      }
    } catch(error) {
      console.error(error);
      throw error;
    }
  }

  // 구독 등록
  async function subscribeUser() {
    try {
      if(!isSubscribing) {
        const isGranted = await requestPermission();

        // 권한 확인
        if(!isGranted) {
          return; // false로 오면 처리 종료 후, finally로 이동 후 체크했었다라는 이력을 남기고 종료   
        }
        // 서비스 워커 준비
        const registration = await navigator.serviceWorker.ready;

        // 서비스 워커에 구독 정보 등록
        // subscribe 메소드의 역할 : push service에게 push service 등록 해줘. 
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          // 백엔드에서 발급한 서비스키 전송 (publicKey)
          // 어떻게 전송? : 직접적으로 전달 (백엔드에서 만든 설정 값을 프론트의 설정 값에 저장) 
          applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY
        });
        
        // subscription의 구조
        // {
        //   endpoint: 'https://fcm.googleapis.com/fcm/send/dFlTq11Ly-w:...',
        //   expirationTime: null,
        //   keys: {
        //     p256dh: 'BD9B5KMdQbwgG7...',
        //     auth: 'OL56CZS...'
        //   }
        // }

        // 백엔드에게 전달해주기 위해 디바이스 정보도 전달해주어야 함.
        // 예전에는 platform을 사용했었는데, 현재는 Deplicated 된 상태. 
        const deviceInfo = {
          userAgent: navigator.userAgent,   // 브라우저/디바이스 정보
          language: navigator.language      // 언어 정보
        };
        
        // Backend에 구독 정보 등록 요청
        await axiosInstance.post('/api/subscriptions', {subscription, deviceInfo});

        // 정상 동작한다는 전제하에 별도의 후속처리 x 
        alert('구독 성공');
      }
    } catch(error) {
      console.error("구독 실패: ", error);
    } finally {
      setIsCheckedSubscribe(true);
    }
  }

  return {
    isInit,
    isSubscribing,
    isCheckedSubscribe,
    subscribeUser,
  }
}
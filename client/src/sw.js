import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';

const PREFIX = import.meta.env.VITE_APP_NAME;

// --------------------------
// 정적 파일 캐싱 
// --------------------------
precacheAndRoute(self.__WB_MANIFEST); // vite 파일에서 정의한 이미지를 캐싱

// --------------------------
// HTML, 오프라인 대응
// --------------------------
registerRoute( 
  // 검증용 파라미터
  ({request}) => request.mode === 'navigate',
  // true일 때 실행할 캐싱전략
  // 유저에게 데이터 제공을 어떻게 해주느냐에 따라 다른 캐싱 전략을 사용해야 한다. 
  new NetworkFirst({
    // 객체 안에 파라미터 속성 넣기
    cacheName: `${PREFIX}-html-cache`,
    // 서버에 요청했을 때 3초동안 기다리다가 응답이 없으면 연결을 끊겠다.
    // 설정하지 않으면 무한정 대기 해야 한다. 
    networkTimeoutSeconds: 3 
  })
);

// --------------------------
// 이미지 캐싱
// --------------------------
registerRoute(
  ({request}) => request.destination === 'image', 
  // 이미지 캐싱을 통해 유저 용량에 부담을 줄 것 같으면 이미지 캐싱은 사용하지 않아야 한다.
  // P to P 사이트와는 다르다.
  new CacheFirst({
    cacheName: `${PREFIX}-image-cache`,
    networkTimeoutSeconds: 3
  })
);

// ---------------------------------------------------
// API 요청 캐싱(최소 동작 보장, GET을 제외한 나머지는 제외)
// ---------------------------------------------------
registerRoute(
  // 도메인/posts 를 url에 담아줌. 우리 도메인이 맞는지 확인 해주어야 함 && GET 메소드만 허용 
  ({request, url}) => url.origin === import.meta.env.VITE_SERVER_URL && request.method === 'GET',
  new StaleWhileRevalidate({
    cacheName: `${PREFIX}-api-cache`,
    networkTimeoutSeconds: 3
  })
);

// ------------
// 웹푸시 핸들러
// ------------
self.addEventListener('push', e=>{
  // 푸시 데이터 받아오기(js 객체 형태로 받아옴) 
  const data = e.data.json();
  // payload 데이터가 옴 
  self.registration.showNotification(
    data.title,
    {
      body: data.message,
      icon: '/icons/meerkat_32.png',
      data: {
        targetUrl: data.data.targetUrl
      }
    }
  );
});

// -----------------
// 웹 푸시 클릭 이벤트
// -----------------
self.addEventListener('notificationclick', e => {
  e.notification.close(); // 푸시 알림 창 닫기

  // 페이로드에서 백에드가 전달해 준 전체 URL 추출
  const openUrl = e.notification.data.targetUrl;

  // Origin 획득
  const origin = self.location.origin; // 현재 사용하고 있는 도메인 주소를 가져옴

  e.waitUntill(
    // clients의 구조
    // [
    //   WindowClient (브라우저의 탭 정보) = {
    //     focused: false,
    //     frameType: "top-level",
    //     id: "f6e4c645-16ba-4ebe-9600-443b91141742",
    //     type: "window",
    //     url: "http://localhost:3000/posts",
    //     visibilityState: "visible"
    //   },
    //   // ...
    // ]
    // type: 'window - 열려있는 탭들 
    // includeUncontrolled: true - service worker가 제어하고 있는지 않은 것도 열겠다.
    // 현재 service worker가 활성화 된 상태에서 열었을 때
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }) 
    .then(clients => {
      // 앱에서 루트 도메인 탭이 있는지 확인
      // client : 브라우저 탭 하나, url
      const myClient = clients.find(client => client.url.startsWith(origin));

      // 재활용할 탭이 있다면 포커스 및 네비게이트 처리
      if(myClient) {
        myClient.focus();
        return myClient.navigate(openUrl);
      }

      // 재활용할 탭이 없다면 새창으로 열기
      if(self.clients.openWindow) {
        return self.clients.openWindow(openUrl);
      }
    })
  );
});
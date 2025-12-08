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
const swRegister = () => {
   // 브라우저에 service worker가 있는지 확인
  if ("serviceWorker" in navigator) { 
    navigator.serviceWorker
    // 우리 도메인이면 service worker를 쓰겠다고 등록
      .register("/sw.js", { scope: '/' })
      .then((registration) => {
        console.log("서비스워커 등록 성공", registration);
      })
      .catch((error) => {
        console.error("서비스워커 등록 실패: ", error);
      });
  }
}

export default swRegister;
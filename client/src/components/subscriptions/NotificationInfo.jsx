import './NotificationInfo.css';
import usePushNotifications from "../../hooks/usePushNotifications.jsx";
import { useSelector } from 'react-redux';

export default function NotificationInfo() {
  // isInit : 구독이 초기화 되었는지 확인
  // isSubscribing : 구독 서비스 등록되었는지 확인 
  // subscribe : 체크 확인 
  const { isInit, isSubscribing, isCheckedSubscribe, subscribeUser } = usePushNotifications();
  const { isLoggedIn } = useSelector(state => state.auth);

  return (
    <>
      {
        ( isLoggedIn && isInit && !isSubscribing && !isCheckedSubscribe) && (
          <div className="notification-info-container">
            <div className="notification-info-content-box bg-light">
              <div className="notification-info-content-info">
                <p>알림 허용을 하지 않으면 서비스 이용에 제한이 있습니다.</p>
                <br />
                <p>광고성 알림을 절대 보내지 않습니다.</p>
              </div>
              <div className="notification-info-btn-box">
                <button type="button" className='btn-medium bg-dark' onClick={subscribeUser}>Accept</button>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}
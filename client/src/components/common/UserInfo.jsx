import './UserInfo.css';

export default function UserInfo() {
  return (
    <>
      <div className="user-info-container bottom-line">
        <div className="profile profile-medium" style={{backgroundImage: `url("/dev/kanna.jpg")`}}></div>
        <div className="user-info-controll-box">
          <div className="user-info-stat-items">
            <p className='user-info-stat-name'>Kanna_kamui</p>
            <p className='user-info-stat-etc'>posts 1911</p>
          </div>
          <div className="user-info-btn-items">
            <div className="user-info-btn" style={{backgroundImage: `url("/icons/btn-post-index.png")`}}></div>
            <div className="user-info-btn" style={{backgroundImage: `url("/icons/btn-add.png")`}}></div>
            <div className="user-info-btn" style={{backgroundImage: `url("/icons/btn-user-index.png")`}}></div>
          </div>
        </div>
      </div>
    </>
  )
}

import { useSelector } from 'react-redux';
import './UserInfo.css';
import { useNavigate } from 'react-router-dom';

export default function UserInfo() {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  function redirectPosts() {
    navigate('/login');
  } 

  function redirectPostCreate() {
    navigate('/posts/create');
  } 

  function redirectUserInfo() {
    navigate(`/users/${user?.id}`);
  } 
  return (
    <>
      <div className="user-info-container bottom-line">
        <div className="profile profile-medium" style={{backgroundImage: `url("${user?.profile}")`}}></div>
        <div className="user-info-controll-box">
          <div className="user-info-stat-items">
            <p className='user-info-stat-name'>{user.nick}</p>
            <p className='user-info-stat-etc'>posts 1911</p>
          </div>
          <div className="user-info-btn-items">
            <div className="user-info-btn" onClick={redirectPosts} style={{backgroundImage: `url("/icons/btn-post-index.png")`}}></div>
            <div className="user-info-btn" onClick={redirectPostCreate }style={{backgroundImage: `url("/icons/btn-add.png")`}}></div>
            <div className="user-info-btn" onClick={redirectUserInfo} style={{backgroundImage: `url("/icons/btn-user-index.png")`}}></div>
          </div>
        </div>
      </div>
    </>
  )
}

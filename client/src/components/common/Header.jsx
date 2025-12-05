import './Header.css';
import { useLocation, useNavigate } from "react-router-dom";
import UserInfo from './UserInfo.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { logoutThunk } from '../../store/thunks/authThunk.js';
import { clearAuth } from '../../store/slices/authSlice.js';

export default function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector(state => state.auth)

  const onlyTitleList = ['/login', '/registration'];
  const onlyTitleFlg = onlyTitleList.some(path => path === location.pathname);

  function redirecLogin() {
    navigate(`/login`);
  } 

  function redirectRegistration() {
    navigate(`/registration`);
  } 

  function redirectPosts() {
    navigate('/posts');
  }


  async function logout() {
    try {
      navigate('/posts'); // History 남기는 여부 선택 하기
      const result = await dispatch(logoutThunk());
      if(result.type.endsWith('/rejected')) {
        throw result.payload;
      }
      dispatch(clearAuth());
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="header-container">
        <div className={`${(onlyTitleFlg && 'header-top') || 'bottom-line header-top-grid'}`}>
          <h1 className={`${(onlyTitleFlg && 'header-top-title-only') || ''}`} onClick={redirectPosts} >Meerkatgram</h1>
          {
            !onlyTitleFlg && (
              <div className='header-top-btn-box'>
                {
                  (isLoggedIn && <button type="button" onClick={logout} className='btn-small bg-dark' >Logout</button>)
                  ||
                  <>
                    <button type="button" onClick={redirecLogin} className='btn-small bg-gray'>Sign In</button>
                    <button type="button" onClick={redirectRegistration} className='btn-small bg-light'>Sign Up</button>
                  </>
                }
              </div>
            )
          }
        </div>
        {
          isLoggedIn && <UserInfo />
        }
      </div>
    </>
  )
}

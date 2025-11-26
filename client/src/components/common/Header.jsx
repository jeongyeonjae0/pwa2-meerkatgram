import './Header.css';
import { useLocation } from "react-router-dom";
import UserInfo from './UserInfo.jsx';

export default function Header() {
  const location = useLocation();
  const onlyTitleList = ['/login', '/registration'];
  const onlyTitleFlg = onlyTitleList.some(path => path === location.pathname);
  const authFlg = !onlyTitleFlg && true;

  return (
    <>
      <div className="header-container">
        <div className={`${(onlyTitleFlg && 'header-top') || 'bottom-line header-top-grid'}`}>
          <h1 className={`${(onlyTitleFlg && 'header-top-title-only') || ''}`}>Meerkagram</h1>
          {
            !onlyTitleFlg && (
              <div className='header-top-btn-box'>
                {
                  (authFlg && <button type="button" className='btn-small bg-dark'>Logout</button>)
                  ||
                  <>
                    <button type="button" className='btn-small bg-gray'>Sign In</button>
                    <button type="button" className='btn-small bg-light'>Sign Up</button>
                  </>
                }
              </div>
            )
          }
        </div>
        {
          authFlg && <UserInfo />
        }
      </div>
    </>
  )
}

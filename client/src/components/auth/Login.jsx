import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import { loginThunk } from '../../store/thunks/authThunk.js';

export default function Login() {
  const dispatch = useDispatch();          // thunk나 actions 호출
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    // 기존 이벤트 취소
    e.preventDefault();

    try {
      // 로그인 요청
      await dispatch(loginThunk({email, password})).unwrap();
      return navigate('/posts', { replace: true }); // history를 남기지 않겠다.
    } catch (error) {
      const code = error.response?.data?.code;
      alert(`로그인 실패했습니다. ${code}`);
    }
  }

  function handleSocial(provider) {
    window.location.replace(`/api/auth/social/${provider}`);
  }

  return (
    <>
      <form className="login-container" onSubmit={handleLogin}>
        <input type="text" className='input-big-border' onChange={ e => { setEmail(e.target.value) } } placeholder='email' />
        <input type="password" className='input-big-border' onChange={ e => { setPassword(e.target.value) } }placeholder='password' />
        <button type="submit" className="btn-big bg-gray">Log in</button>
        <div className="text-on-line">or</div>
        <button type="button" className="btn-big bg-img-kakao" onClick={() => {handleSocial('kakao')}} ></button>
        <button type="button" className="btn-big bg-light">Sign up</button>
      </form>
    </>
  )
}

import './Login.css'

export default function Login() {
  return (
    <>
      <div className="login-container">
        <input type="text" className='input-big-border' name="email" id="email" placeholder='email' />
        <input type="text" className='input-big-border' name="password" id="password" placeholder='password' />
        <button type="button" className="btn-big bg-gray">Log in</button>
        <div className="text-on-line">or</div>
        <button type="button" className="btn-big bg-img-kakao"></button>
        <button type="button" className="btn-big bg-light">Sign up</button>
      </div>
    </>
  )
}

import './Registration.css';

export default function Registration() {
  return (
    <>
      <div className="registration-container">
        <input type="text" className='input-big-border' name="email" id="email" placeholder='email' />
        <input type="text" className='input-big-border' name="password" id="password" placeholder='password' />
        <input type="text" className='input-big-border' name="passwordChk" id="passwordChk" placeholder='password check' />
        <input type="text" className='input-big-border' name="name" id="name"  placeholder='name' />
        <input type="file" name="profile" id="profile" accept="image/*" />
        <div className="profile profile-medium" style={{backgroundImage: `url("http://localhost:5173/dev/kanna.jpg")`}}></div>
        <button type="button" className="btn-big bg-gray">Sign up</button>
      </div>
    </>
  )
}
import './UserInfo.css';

export default function UserInfo() {
  return (
    <>
      <div className="registration-container">
        <input type="text" className='input-big-border' name="password" id="password" placeholder='password' />
        <input type="text" className='input-big-border' name="passwordChk" id="passwordChk" placeholder='password check' />
        <input type="text" className='input-big-border' name="name" id="name" value='Kanna_Kamui' />
        <input type="file" name="profile" id="profile" accept="image/*" />
        <div className="profile profile-medium" style={{backgroundImage: `url("/dev/kanna.jpg")`}}></div>
        <button type="button" className="btn-big bg-gray">Change</button>
      </div>
    </>
  )
}
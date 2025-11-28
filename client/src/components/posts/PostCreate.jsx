import './PostCreate.css';

export default function PostCreate() {
  return (
    <>
      <div className="post-create-container">
        <textarea className='post-create-textarea' name="content" placeholder='내용 작성'></textarea>
        <input type="file" name="profile" id="profile" accept="image/*" />
        <div className="post-create-image" style={{backgroundImage: `url("/dev/zzazan.jpg")`}}></div>
        <button type="button" className="btn-big bg-gray">Write</button>
      </div>
    </>
  )
}
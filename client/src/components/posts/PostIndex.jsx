import './PostIndex.css';

export default function PostIndex() {
  return (
    <>
      <div className="post-index-container">
        <div className="post-index-card-box">
          <div className="post-index-card" style={{backgroundImage: `url("/dev/osoi.jpg")`}}></div>
          <div className="post-index-card" style={{backgroundImage: `url("/dev/choco.jpg")`}}></div>
          <div className="post-index-card" style={{backgroundImage: `url("/dev/koitsu.png")`}}></div>
          <div className="post-index-card" style={{backgroundImage: `url("/dev/ok.png")`}}></div>
          <div className="post-index-card" style={{backgroundImage: `url("/dev/zayeung.jpg")`}}></div>
          <div className="post-index-card" style={{backgroundImage: `url("/dev/zzazan.jpg")`}}></div>
          <div className="post-index-card" style={{backgroundImage: `url("/dev/cat.jpg")`}}></div>
          <div className="post-index-card" style={{backgroundImage: `url("/dev/osoi.jpg")`}}></div>
          <div className="post-index-card" style={{backgroundImage: `url("/dev/choco.jpg")`}}></div>
          <div className="post-index-card" style={{backgroundImage: `url("/dev/koitsu.png")`}}></div>
          <div className="post-index-card" style={{backgroundImage: `url("/dev/ok.png")`}}></div>
          <div className="post-index-card" style={{backgroundImage: `url("/dev/zayeung.jpg")`}}></div>
          <div className="post-index-card" style={{backgroundImage: `url("/dev/zzazan.jpg")`}}></div>
          <div className="post-index-card" style={{backgroundImage: `url("/dev/cat.jpg")`}}></div>
        </div>
        <button type="button" className='btn-full-width bg-gray'>Show more posts from Kanna_Kamui</button>
      </div>
    </>
  )
}
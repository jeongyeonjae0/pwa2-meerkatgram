import { useState } from 'react';
import PostComment from './comments/PostComment.jsx';
import './PostShow.css';
import PostDelete from './PostDelete.jsx';

export default function PostsShow() {
  const content = '초콜렛이.. 없어...?\n손나 바카나!!';
  const [openDeleteFlg, setOpenDeleteFlg] = useState(false);

  function openDeleteModal() {
    setOpenDeleteFlg(true);
  }
  function closeDeleteModal() {
    setOpenDeleteFlg(false);
  }

  return (
    <>
      <div className="post-show-container">
        <div className="post-show-post-box bottom-line">
          <img className="post-show-post-img" src={`/dev/choco.jpg`}></img>
          <div className="post-show-post-info-items">
            <div className="icon-delete" onClick={openDeleteModal} ></div>
            <div className="post-show-post-likes-items">
              <p>1919</p>
              <div className='icon-heart-fill'></div>
            </div>
          </div>
          <textarea className="post-show-post-constent" defaultValue={content}></textarea>
        </div>
        <PostComment /> 
      </div>
      {
        openDeleteFlg && <PostDelete setCloseDeleteModal={closeDeleteModal} />
      }
    </>
  )
}
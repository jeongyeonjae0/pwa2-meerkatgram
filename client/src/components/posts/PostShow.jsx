import { useEffect, useState } from 'react';
import PostComment from './comments/PostComment.jsx';
import './PostShow.css';
import PostDelete from './PostDelete.jsx';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postShowThunk } from '../../store/thunks/postShowThunk.js';
import { clearPostShow } from '../../store/slices/postIndShowSlice.js';

export default function PostsShow() {
  const {id} = useParams();
  const dispatch = useDispatch();
  const { show } = useSelector(state => state.postShow);
  const [openDeleteFlg, setOpenDeleteFlg] = useState(false);

  useEffect(() => {
    dispatch(postShowThunk(id));

    return () => {
      dispatch(clearPostShow());
    }
  }, []);

  function openDeleteModal() {
    setOpenDeleteFlg(true);
  }
  function closeDeleteModal() {
    setOpenDeleteFlg(false);
  }

  return (
    <>
    {
      show && (
      <div className="post-show-container">
        <div className="post-show-post-box bottom-line">
          <img className="post-show-post-img" src={`${show.image}`}></img>
          <div className="post-show-post-info-items">
            <div className="icon-delete" onClick={openDeleteModal} ></div>
            <div className="post-show-post-likes-items">
              <p>1919</p>
              <div className='icon-heart-fill'></div>
            </div>
          </div>
          <textarea className="post-show-post-constent" defaultValue={show.content}></textarea>
        </div>
        <PostComment id={id} comments={show['post-has-comment']} /> 
      </div>
      )
    }
    {
      openDeleteFlg && <PostDelete setCloseDeleteModal={closeDeleteModal} />
    }
    </>
  )
}
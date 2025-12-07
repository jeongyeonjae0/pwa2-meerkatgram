import { useEffect, useState } from 'react';
import PostComment from './comments/PostComment.jsx';
import './PostShow.css';
import PostDelete from './PostDelete.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postShowThunk } from '../../store/thunks/postShowThunk.js';
import { clearPostShow } from '../../store/slices/postIndShowSlice.js';

export default function PostsShow() {
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { show } = useSelector(state => state.postShow);
  const { user } = useSelector(state => state.auth);
  const [openDeleteFlg, setOpenDeleteFlg] = useState(false);

  useEffect(() => {
    // 상세 획득 실패 시 인덱스 페이지로 이동
    async function getShow() {
      try {
        const result = await dispatch(postShowThunk(id));

        if(result.type.endsWith('/rejected')) {
          throw new Error('상세 획득 실패');
        }
      } catch(error) {
        console.log(error);
        alert('접근 할 수 없는 게시글입니다.');
        navigate('/posts', {replace: true});
      }
    }

    getShow();

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
            {
              // 게시글 작성자만 삭제 버튼 보이게 처리
              (user.id === show.userId && <div className="icon-delete" onClick={openDeleteModal} ></div>)
              ||
              <div></div>
            }
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
      openDeleteFlg && <PostDelete id={id} setCloseDeleteModal={closeDeleteModal} />
    }
    </>
  )
}
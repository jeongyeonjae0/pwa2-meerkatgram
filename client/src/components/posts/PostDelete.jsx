import { useDispatch } from 'react-redux';
import './PostDelete.css';
import { useNavigate } from 'react-router-dom';
import { postDestroyThunk } from '../../store/thunks/postDestroyThunk.js';

export default function PostDelete({id, setCloseDeleteModal}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function excuteDestroy() {
    try {
      const result = await dispatch(postDestroyThunk(id));

      if(result.type.startsWith('/rejected')) {
        throw new Error('삭제 실패');
      }

      setCloseDeleteModal(); // 모달 닫기
      
      return navigate('/posts', {replace: true});
    } catch(error) {
      console.log(error);
      alert('게시글 삭제에 실패했습니다.');
    }
  }

  return (
    <>
      <div className="post-delete-container">
        <div className="post-delete-content-box bg-light">
          <div className="post-delete-content-info">
            <p>삭제된 게시글은 되돌릴 수 없습니다.</p>
            <br />
            <p>정말 삭제하시겠습니까?</p>
          </div>
          <div className="post-delete-btn-box">
            <button type="button" className='btn-medium bg-dark' onClick={excuteDestroy} >Delete</button>
            <button type="button" className='btn-medium bg-gray' onClick={setCloseDeleteModal}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  )
}
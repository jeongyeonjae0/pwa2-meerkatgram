import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './PostIndex.css';
import { useEffect } from 'react';
import { postIndexThunk } from '../../store/thunks/postIndexThunk.js';

export default function PostIndex() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list, page, isLasted } = useSelector(state => state.postIndex);

  useEffect(() => {
    if(!list) {
      dispatch(postIndexThunk(page + 1));
    }
  }, []);

  function nextpage() {
    dispatch(postIndexThunk(page + 1));
  }

  function redirectPostShow(id) {
    navigate(`/posts/show/${id}`);
  }

  return (
    <>
      <div className="post-index-container">
        <div className="post-index-card-box">
          {
            list && list.map(item => {
              return (
                  <div 
                    className="post-index-card" 
                    style={{backgroundImage: `url("${item.image}")`}} 
                    key={item.id}
                    onClick={() => { redirectPostShow(item.id) }}
                  ></div>
                ) 
            })
          }
        </div>
        {
          !isLasted && <button type="button" className='btn-full-width bg-gray' onClick={nextpage}>Show more posts from Kanna_Kamui</button>
        }
      </div>
    </>
  )
}
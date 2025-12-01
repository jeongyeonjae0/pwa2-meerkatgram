import { useDispatch, useSelector } from 'react-redux';
import './PostIndex.css';
import { useEffect } from 'react';
import { postIndexThunk } from '../../store/thunks/postIndexThunk.js';

export default function PostIndex() {
  const dispatch = useDispatch();
  const { list, page } = useSelector(state => state.postIndex);

  useEffect(() => {
    dispatch(postIndexThunk(page + 1));
  }, []);

  return (
    <>
      <div className="post-index-container">
        <div className="post-index-card-box">
          {
            list && list.map(item => {
              return <div className="post-index-card" style={{backgroundImage: `url("${item.image}")`}} key={item.id}></div>
            })
          }
        </div>
        <button type="button" className='btn-full-width bg-gray'>Show more posts from Kanna_Kamui</button>
      </div>
    </>
  )
}
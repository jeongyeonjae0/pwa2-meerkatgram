import './PostDelete.css';

export default function PostDelete({setCloseDeleteModal}) {
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
            <button type="button" className='btn-medium bg-dark'>Delete</button>
            <button type="button" className='btn-medium bg-gray' onClick={setCloseDeleteModal}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  )
}
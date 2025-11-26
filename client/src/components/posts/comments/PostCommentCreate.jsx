import './PostCommentCreate.css';

export default function PostCommentCreate({postId, replyId = 0}) {
  return (
    <>
      <div className="post-comment-create-box">
        <input type="text" className="post-comment-create-input-add" name="comment" placeholder={`add comments...`} />
        <div className="post-comment-create-btn-add" style={{backgroundImage: `url("http://localhost:5173/icons/btn-add.png")`}}></div>
      </div>
    </>
  )
}
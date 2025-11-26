import { useState } from 'react';
import './PostCommentItem.css';
import PostCommentCreate from './PostCommentCreate.jsx';

export default function PostCommentItem({comment, depth = 1}) {
  // 재귀 호출 시 대댓글 인덴트 조절
  const writeReplyFlg = depth < 2;

  const [openReplyFlg, setOpenReplyFlg] = useState(false);

  function changeReplyFlg() {
    setOpenReplyFlg(!openReplyFlg);
  }
  return (
    <>
      <div className="post-comment-item-box" key={comment.id}>
        <div className="profile profile-small" style={{backgroundImage: `url("${comment.user.profile}")`}}></div>
        <div className="post-comment-item-comment">
          <div className="post-comment-item-comment-info">
            <p className='post-comment-item-item-nick'>{comment.user.nick}</p>
            <p className='post-comment-item-item-content'>{comment.content}</p>
          </div>
          <div className="post-comment-item-reply-box">
              {
                // 답글 UI가 닫혀있고, 답글 작성이 가능한 depth일 때 '답글' 텍스트 출력
                (!openReplyFlg && writeReplyFlg && <p className='post-comment-item-reply-view' onClick={changeReplyFlg}>답글</p>)
                ||
                // 답글 작성이 가능한 depth일 때 PostCommentCreate 컴포넌트 출력
                (writeReplyFlg && <PostCommentCreate postId={comment.postId} replyId={comment.id} />)
              }
            {
              comment.replyFlg && (
                // 대댓글 제어 : 각 답글에 대해 PostCommentItem 컴포넌트를 재귀적 호출
                // 재귀 호출: 함수 또는 컴포넌트가 자기 자신을 다시 호출하는 것
                // depth를 1 증가시켜 답글의 깊이를 표현
                (comment.replies.length > 0 &&  comment.replies.map(item => {
                  return <PostCommentItem comment={item} depth={depth + 1} key={item.id} />
                }))
                ||
                <div className="post-comment-index-reply-view link">view more comments</div>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}
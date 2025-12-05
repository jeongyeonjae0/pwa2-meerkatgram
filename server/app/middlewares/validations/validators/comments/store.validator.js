/**
 * @file app/middlewares/validations/validators/comments/store.validator.js
 * @description 코멘트 작성 검사기
 * 251203 v1.0.0 yeon init
 */

import { content, postId, replyId } from "../../fields/comment.field.js";


export default [postId, replyId, content]; // 검사하고 싶은 field 넣어주면 된다.
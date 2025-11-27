/**
 * @file app/middleware/multer/multer.middleware.js
 * @description multer 미들웨어(업로더를 모아서 내보내기)
 * 251127 v1.0.0 yeon init
 */

import postUploader from "./uploaders/post.uploader.js";
import profileUploader from "./uploaders/profile.uploader.js";

export default {
  postUploader,
  profileUploader,
}
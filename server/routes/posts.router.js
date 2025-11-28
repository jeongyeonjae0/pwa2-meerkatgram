/**
 * @file routes/posts.router.js
 * @description 게시글 관련 라우터
 * 251128 v1.0.0 yeon init
 */

import express from 'express';
import postsController from '../app/controllers/posts.controller.js';
import indexValidator from '../app/middlewares/validations/validators/posts/index.validator.js';
import validationHandler from '../app/middlewares/validations/validationHandler.js';
import authMiddleware from '../app/middlewares/auth/auth.middleware.js';
import showValidator from '../app/middlewares/validations/validators/posts/show.validator.js';

const postsRouter = express.Router();

postsRouter.get('/', indexValidator, validationHandler,  postsController.index);
postsRouter.get('/:id', authMiddleware, showValidator, validationHandler, postsController.show);

export default postsRouter;
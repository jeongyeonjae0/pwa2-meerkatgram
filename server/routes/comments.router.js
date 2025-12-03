/**
 * @file routes/comments.router.js
 * @description comment 관련 라우터
 * 251203 v1.0.0 yeon init 
 */

import express from 'express';
import authMiddleware from '../app/middlewares/auth/auth.middleware.js';
import storeValidator from '../app/middlewares/validations/validators/comments/store.validator.js';
import validationHandler from '../app/middlewares/validations/validationHandler.js';
import commentsController from '../app/controllers/comments.controller.js';

const commentsRouter = express.Router();

commentsRouter.post('/', authMiddleware, storeValidator, validationHandler, commentsController.store);

export default commentsRouter;

/**
 * @file routes/subscriptions.router.js
 * @description subscriptions 관련 라우터
 * 251208 v1.0.0 yeon init
 */

import express from 'express';
import authMiddleware from '../app/middlewares/auth/auth.middleware.js';
import subscriptionsController from '../app/controllers/subscriptions.controller.js';

const subscriptionsRouter = express.Router();

// DB에 등록하는 처리이므로 post 
subscriptionsRouter.post('/', authMiddleware, subscriptionsController.subscribe);

export default subscriptionsRouter;
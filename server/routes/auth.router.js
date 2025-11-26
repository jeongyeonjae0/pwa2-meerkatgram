/**
 * @file routes/auth.router.js
 * @description 인증 관련 라우터
 * 251119 v1.0.0 yeon init 
 */

import express from 'express';
import { authController } from '../app/controllers/auth.controller.js';
import loginValidator from '../app/middlewares/validations/validators/auth/login.validator.js';
import validationHandler from '../app/middlewares/validations/validationHandler.js';
import authMiddleware from '../app/middlewares/auth/auth.middleware.js';

const authRouter = express.Router();

authRouter.post('/login', loginValidator, validationHandler, authController.login);
authRouter.post('/reissue', authMiddleware, (req, res, next) => {
  return res.send('reissue test');
});

export default authRouter;
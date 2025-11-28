/**
 * @file routes/notFound.router.js
 * @description 404 관련 라우터
 * 251128 v1.0.0 yeon init
 */

import express from 'express';
import { NOT_FOUND_ERROR } from '../configs/responseCode.config.js';
import { createBaseResponse } from '../app/utils/createBaseResponse.util.js';

const notFoundRouter = express.Router();

notFoundRouter.all(/^\/api\/.*/, (req, res) => {
  return res.status(NOT_FOUND_ERROR.status).send(createBaseResponse(NOT_FOUND_ERROR));
});

export default notFoundRouter;
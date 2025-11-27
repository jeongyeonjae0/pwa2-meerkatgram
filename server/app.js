/**
 * @File app.js
 * @description Entry Point
 * 251117 v1.0.0 yeon
 */

import express from 'express';
import './configs/env.config.js';
import authRouter from './routes/auth.router.js';
import errorHandler from './app/errors/errorHandler.js';
import swaggerUi from 'swagger-ui-express';
import SwaggerParser from 'swagger-parser';
import path from 'path';
import filesRouter from './routes/files.router.js';

const app = express();
app.use(express.json()); // JSON 요청 파싱 처리

// --------------------
// 정적 파일 제공 등록 
// --------------------
app.use(process.env.ACCESS_FILE_POST_IMAGE_PATH, express.static(process.env.FILE_POST_IMAGE_PATH));
app.use(process.env.ACCESS_FILE_USER_PROFILE_PATH, express.static(process.env.FILE_USER_PROFILE_PATH));

// --------------------
// Swagger 등록
// --------------------
// swagger yaml file bundling
const swaggerDoc = await SwaggerParser.bundle(path.join(path.resolve(), 'swagger/swagger.yaml'));
// swagger ui 등록
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// ---------------------
// 라우터 정의
// ---------------------
app.use('/api/auth', authRouter);
app.use('/api/files', filesRouter);

// 에러 핸들러 등록
app.use(errorHandler);

// ---------------------- 
// 해당 Port로 express 실행 
// -----------------------
app.listen(parseInt(process.env.APP_PORT ));
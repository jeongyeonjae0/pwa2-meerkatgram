/**
 * @file /app/utils/path/path.util.js
 * @description path 유틸리티
 * 251128 v1.0.0 yeon init
 */

import path from 'path';

function getViewDirPath() {
  const __dirname = process.env.APP_MODE !== 'dev' ? process.env.APP_DIST_PATH : path.resolve(process.env.APP_DIST_PATH);

  return path.join(__dirname, 'index.html');
 }

 export default {
  getViewDirPath,
 }
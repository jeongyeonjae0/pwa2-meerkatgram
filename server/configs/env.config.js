/**
 * @file configs/env.config.js
 * @description 환경에 따른 env 설정 파일
 * 251117 v1.0.0 yeon 최초 생성
 */

import fs from 'fs';
import dotenv from 'dotenv';

const envFiles = [
  '.env.production',
  '.env.test',
  '.env'
];
let filePath = '';

// `envFiles` 루프 : 해당 파일이 있으면 파일 경로 저장 
// 예) `.env.test`와 `.env`가 있을 경우 최종적으로 `.env`를 세팅
// 예) `.env.test`만 있을 경우 최종적으로 `.env.test`를 세팅
// 예) `.env.production`, `.env.test`, `.env`가 있을 경우 최종적으로 `.env`를 세팅
for (const file of envFiles) {
  if(fs.existsSync(file)) {
    filePath = file;
  }
}

// 세팅 된 filePath로 dotenv 설정
dotenv.config({
  path: filePath,
  debug: filePath === '.env' ? true : false
});
console.log(`Loaded env: ${filePath}`);
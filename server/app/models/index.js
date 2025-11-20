/**
 * @file app/models/index.js
 * @description Sequelize 인스턴스 생성 File
 * 251120 v1.0.0 yeon init
 */

import '../../configs/env.config.js';
import { Sequelize } from 'sequelize';
import User from './User.js';

const db = {}; // 생성할 db 인스턴스 저장용

// Sequelize 인스턴스 생성
const sequelize = new Sequelize(
  process.env.DB_MYSQL_DB_NAME        // DB명
  , process.env.DB_MYSQL_USER         // DB 접속 유저
  , process.env.DB_MYSQL_PASSWORD     // DB 접속 패스워드
  ,{
    host: process.env.DB_MYSQL_HOST                     // 사용 DB Host
    ,port: parseInt(process.env.DB_MYSQL_PORT)          // 사용 DB Port
    ,dialect: process.env.DB_MYSQL_DIALECT              // 사용 DB 드라이버
    ,timezone: process.env.DB_MYSQL_TIMEZONE            // 타임존
    ,logging: process.env.DB_MYSQL_LOG_FLG === 'true' && console.log  // DB Loggin on/off
    ,dialectOptions: {
        dateStrings: true  // 문자열로 날짜 받기
    }
    ,pool: { // 커넥션풀 설정
      max: parseInt(process.env.DB_MYSQL_CONNECTION_COUNT_MAX),   // 최대 커넥션 수
      min: parseInt(process.env.DB_MYSQL_CONNECTION_COUNT_MIN),   // 최소 커넥션 수
      acquire: parseInt(process.env.DB_MYSQL_ACQUIRE_LIMIT),      // 연결 최대 대기 시간 (ms)
      idle: parseInt(process.env.DB_MYSQL_IDLE_LIMIT)             // 유휴 커넥션 유지 시간 (ms)
    }
}
);

db.sequelize = sequelize; // 생성한 sequelize 인스턴스 db에 저장

// 모델 초기화 
db.User = User.init(sequelize);

// 모델 관계 설정


export default db;
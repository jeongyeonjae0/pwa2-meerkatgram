/**
 * @File databases/migrations/20251117-01-create-users.js
 * @description users migration file
 * 251117 v1.0.0 yeon init
 */

import { DataTypes } from 'sequelize';

// 테이블명
const tableName = 'users';

// 컬럼 정의
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '유저 PK',
  },
  email: {
    field: 'email',
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true, 
    comment: '이메일(로그인ID)'
  },
  password: {
    field: 'password',
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '비밀번호',
  },
  nick: {
    field: 'nick',
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true,
    comment: '닉네임'
  },
  provider: {
    field: 'provider',
    type: DataTypes.STRING(10),
    allowNull: false,
    comment: '로그인 제공자(NONE, KAKAO, GOOGLE...)'
  }, 
  role: {
    field: 'role',
    type: DataTypes.STRING(10),
    allowNull: false,
    comment: '유저 권한(NORMAL, SUPER...)',
  },
  profile: {
    field: 'profile',
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '유저 프로필',
  },
  refreshToken: {
    field: 'refresh_token',
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '리프레시 토큰', 
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    allowNull: true,
  },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE,
    allowNull: true,
  },
  deletedAt: {
    field: 'deleted_at',
    type: DataTypes.DATE,
    allowNull: true,
  }
};

// 옵션
const options = {
  charset: 'utf8mb4',       // 테이블 문자셋 설정 (이모지 지원)
  collate: 'utf8mb4_bin',   // 정렬 방식 설정 (영어 대소문자 구분 정렬)
  engine: 'InnoDB'          // 사용 엔진 설정, 대량의 데이터 조회에 특화    
};

/** @type {import('sequelize-cli').Migration} */
export default {
  // 마이그레이션 실행 시 호출되는 메소드 (스키마 생성, 수정)
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(tableName, attributes, options);
  },

  // 마이그레이션을 롤백 시 호출되는 메소드(스키마 제거, 수정)
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(tableName);
  }
};

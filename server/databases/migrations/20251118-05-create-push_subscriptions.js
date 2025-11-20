/**
 * @File databases/migrations/20251118-05-create-push_subscriptions.js
 * @description push_subscriptions migration file
 * 251118 v1.0.0 yeon init
 */

import { DataTypes } from 'sequelize';


// 테이블명
const tableName = 'push_subscriptions';

// 컬럼 정의
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '푸시구독 PK',
  },
  userId: {
    field: 'user_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '유저 PK'
  },
  endpoint: {
    field: 'endpoint',
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    comment: '앤드 포인트'
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
  collate: 'utf8mb4_0900_ai_ci',   // 정렬 방식 설정 (기본 설정)
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

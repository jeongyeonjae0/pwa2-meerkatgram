/**
 * @File databases/migrations/20251118-01-create-posts.js
 * @description posts migration file
 * 251118 v1.0.0 yeon init
 */

import { DataTypes } from 'sequelize';

// 테이블명
const tableName = 'posts';

// 컬럼 정의
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '게시글 PK',
  },
  userId: {
    field: 'user_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '유저 PK'
  },
  content: {
    field: 'content',
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: '내용'
  },
  image: {
    field: 'image',
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null, 
    comment: '게시글 이미지'
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

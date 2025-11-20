/**
 * @File databases/migrations/20251118-06-alter-notifications-is_read.js
 * @description notifications-is_read change
 * 251118 v1.0.0 yeon init
 */

import { DataTypes } from 'sequelize';

// 테이블명
const tableName = 'notifications';

// 키명
const key = 'is_read';

// 컬럼 정의
const upAttributes = {
  type: DataTypes.BOOLEAN,
  allowNull: false,
  defaultValue: false,
  comment: '읽음여부',
};
const downAttributes = {
  type: DataTypes.TINYINT(1),
  allowNull: false,
  defaultValue: 0, 
  comment: '읽음 여부'
}


/** @type {import('sequelize-cli').Migration} */
export default {
  // 마이그레이션 실행 시 호출되는 메소드 (스키마 생성, 수정)
  async up (queryInterface, Sequelize) {
    // 컬럼 수정: queryInterface.changeColumn(tableName, key, attributes, options)
    await queryInterface.changeColumn(tableName, key, upAttributes);
  },

  // 마이그레이션을 롤백 시 호출되는 메소드(스키마 제거, 수정)
  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(tableName, key, downAttributes);
  }
};

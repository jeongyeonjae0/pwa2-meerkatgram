/**
 * @file app/services/auth.service.js
 * @description auth Service
 * 251120 yeon init
 */

import bcrypt from 'bcrypt';
import userRepository from "../repositories/user.repository.js";
import myError from '../errors/customs/my.error.js';
import { NOT_REGISTERED_ERROR } from '../../configs/responseCode.config.js';
import jwtUtil from '../utils/jwt/jwt.util.js';
import db from '../models/index.js';

/**
 * 로그인
 * @param {{emali: string, password: string}}} body 
 * @returns {Promise<import("../models/User.js").User>}
 */
async function login(body) {
  // 트랜잭션 처리
  //   async function login(body) {
  // return await db. sequelize.transaction(async t => {
  // // 비지니스 로직 작성... 
  // });

  // 트랜잭션 처리
  return await db.sequelize.transaction(async t => {
    const { email , password } = body;
  
    // email로 유저 정보 획득 
    const user = await userRepository.findByEmail(t, email);
  
    // 유저 존재 여부 체크 
    if(!user) {
      throw myError('유저 미존재', NOT_REGISTERED_ERROR);
    }
  
    // 비밀번호 체크
    if(!bcrypt.compareSync(password, user.password)) {
      // throw new Error('비밀번호 틀림'); // codeInfo가 없는 객체 => 시스템 에러를 반환 
      throw myError('비밀번호 틀림', NOT_REGISTERED_ERROR);
    }
  
    // JWT 생성(accessToken, refreshToken)
    const accessToken = jwtUtil.generateAccessToken(user);
    const refreshToken = jwtUtil.generateRefreshToken(user);
  
    // refreshToken 저장
    user.refreshToken = refreshToken;
    await userRepository.save(t, user);
  
    return {
      accessToken,
      refreshToken,
      user
    }
  });
}


export default {
  login,
}
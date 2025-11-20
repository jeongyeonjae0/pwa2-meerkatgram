/**
 * @file app/services/auth.service.js
 * @description auth Service
 * 251120 yeon init
 */

import bcrypt from 'bcrypt';
import userRepository from "../repositories/user.repository.js";

async function login(body) {
  const { email , password } = body;

  // email로 유저 정보 획득 
  const result = await userRepository.findByEmail(null, email);

  // 유저 존재 여부 체크 
  if(!result) {
    throw new Error('유저 없음');
  }

  // 비밀번호 체크
  if(!bcrypt.compareSync(password, result.password)) {
    throw new Error('비밀번호 틀림');
  }

  return result;
}

export default {
  login,
}
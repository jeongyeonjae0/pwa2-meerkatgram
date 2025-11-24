/**
 * @file app/services/auth.service.js
 * @description auth Service
 * 251120 yeon init
 */

import bcrypt from 'bcrypt';
import userRepository from "../repositories/user.repository.js";
import myError from '../errors/customs/my.error.js';
import { NOT_REGISTERD_ERROR } from '../../configs/responseCode.config.js';


async function login(body) {
  const { email , password } = body;

  // email로 유저 정보 획득 
  const result = await userRepository.findByEmail(null, email);

  // 유저 존재 여부 체크 
  if(!result) {
    throw myError('유저 미존재', NOT_REGISTERD_ERROR);
  }

  // 비밀번호 체크
  if(!bcrypt.compareSync(password, result.password)) {
    // throw new Error('비밀번호 틀림'); // codeInfo가 없는 객체 => 시스템 에러를 반환 
    throw myError('비밀번호 틀림', NOT_REGISTERD_ERROR);
  }

  return result;
}

export default {
  login,
}
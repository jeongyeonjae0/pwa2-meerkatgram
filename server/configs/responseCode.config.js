/**
 * @file configs/responseCode.config.js
 * @description 서비스 전역 응답 코드 설정 모듈(각 API 응답 시 참조되는 표준 응답 코드 정의)
 * 251119 v1.0.0 yeon init
 */

// ---------------------
// type import 
// ---------------------
/**
 * @typedef {import('./responseCode.config.type.js').ResponseCodeConfig} ResponseCodeConfig
 */

/**
 * 정상 처리 응답 코드 설정
 * @type {ResponseCodeConfig}
 */
const SUCCESS = {
  code: '00',
  msg: 'NORMAL_CODE',
  info: '정상 처리',
  status: 200
};
Object.freeze(SUCCESS);

/**
 * 로그인 에러 응답 코드 설정
 * @type {ResponseCodeConfig}
 */
const NOT_REGISTERED_ERROR = {
  code: 'E01',
  msg: 'Not Registered Error',
  info: '아이디나 비밀번호가 틀렸습니다.',
  status: 400
};
Object.freeze(NOT_REGISTERED_ERROR);

/**
 * 인증 에러 응답 코드 설정
 * @type {ResponseCodeConfig}
 */
const UNAUTHORIZED_ERROR = {
  code: 'E02',
  msg: 'Unauthorized Error',
  info: '로그인이 필요한 서비스입니다.',
  status: 401 // Unauthorized
};
Object.freeze(UNAUTHORIZED_ERROR);

/**
 * 권한 부족 에러 코드 설정
 * @type {ResponseCodeConfig}
 */
const FORBIDDEN_ERROR = {
  code: 'E03',
  msg: 'Forbidden Error',
  info: '권한이 부족하여 제공할 수 없는 서비스입니다.',
  status: 403
};
Object.freeze(FORBIDDEN_ERROR);

/**
 * 토큰 만료 에러 코드 설정
 * @type {ResponseCodeConfig}
 */
const EXPIRED_TOKEN_ERROR = {
  code: 'E05',
  msg: 'Invalid Token Error',
  info: '만료된 토큰입니다.',
  status: 401
};
Object.freeze(EXPIRED_TOKEN_ERROR);

/**
 * 토큰 이상 에러 코드 설정
 * @type {ResponseCodeConfig}
 */
const INVALID_TOKEN_ERROR = {
  code: 'E06',
  msg: 'Invalid Token Error',
  info: '유효한 토큰이 아닙니다.',
  status: 401
};
Object.freeze(INVALID_TOKEN_ERROR);

/**
 * 중복 가입 에러 코드 설정
 * @type {ResponseCodeConfig}
 */
const CONFLICT_ERROR = {
  code: 'E07',
  msg: 'Conflict Error',
  info: '이미 가입 된 회원입니다.',
  status: 409
};
Object.freeze(CONFLICT_ERROR);

/**
 * 권한 부족 에러 코드 설정
 * @type {ResponseCodeConfig}
 */
const UNMATCHING_USER_ERROR = {
  code: 'E08',
  msg: 'Unmatching User Error',
  info: '로그인한 유저로는 수행할 수 없는 작업입니다.',
  status: 403
};
Object.freeze(UNMATCHING_USER_ERROR);

/**
 * 리이슈 에러 코드 설정
 * @type {ResponseCodeConfig}
 */
const REISSUE_ERROR = {
  code: 'E09',
  msg: 'Reissue Error',
  info: '재발급 불가능합니다.',
  status: 401
};
Object.freeze(REISSUE_ERROR);

/**
 * 전역 응답 코드 설정
 * @type {ResponseCodeConfig}
 */
const NOT_FOUND_ERROR = {
  code: 'E20',
  msg: 'Not Found Error',
  info: '제공되지 않는 서비스입니다.',
  status: 404
};
Object.freeze(NOT_FOUND_ERROR);

/**
 * 파라미터 에러 코드 설정
 * @type {ResponseCodeConfig}
 */
const BAD_REQUEST_ERROR = {
  code: 'E21',
  msg: 'Bad Request Error',
  info: '요청 파라미터에 이상이 있습니다.',
  status: 400
};
Object.freeze(BAD_REQUEST_ERROR);

/**
 * BAD_FILE_ERROR 코드 설정
 * @type {ResponseCodeConfig}
 */
const BAD_FILE_ERROR = {
  code: 'E22',
  msg: 'Bad File Error',
  info: '파일은 필수(10MB이하)입니다.',
  status: 400
};
Object.freeze(BAD_FILE_ERROR);

/**
 * DB 에러 응답 코드 설정
 * @type {ResponseCodeConfig}
 */
const DB_ERROR = {
  code: 'E80',
  msg: 'DB Error',
  info: '서비스 제공 상태가 원활하지 않습니다.',
  status: 500
};
Object.freeze(DB_ERROR);

/**
 * 시스템 에러 응답 코드 설정
 * @type {ResponseCodeConfig}
 */
const SYSTEM_ERROR = {
  code: 'E99',
  msg: 'Application Error',
  info: '서비스 제공 상태가 원활하지 않습니다.',
  status: 500
};
Object.freeze(SYSTEM_ERROR);

export {
  SUCCESS,
  NOT_REGISTERED_ERROR,
  UNAUTHORIZED_ERROR,
  FORBIDDEN_ERROR,
  EXPIRED_TOKEN_ERROR,
  INVALID_TOKEN_ERROR,
  CONFLICT_ERROR,
  UNMATCHING_USER_ERROR,
  REISSUE_ERROR,
  NOT_FOUND_ERROR,
  BAD_REQUEST_ERROR,
  BAD_FILE_ERROR,
  DB_ERROR,
  SYSTEM_ERROR,
};
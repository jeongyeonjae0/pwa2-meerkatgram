/**
 * @file app/middlewares/validations/validators/users/store.validator.js
 * @description 회원가입 정보 작성 검사기
 * 251205 v1.0.0 yeon init
 */

import userFields from "../../fields/user.field.js";
const { profile, email, password, passwordChk, nick } = userFields;

export default [profile, email, password, passwordChk, nick];
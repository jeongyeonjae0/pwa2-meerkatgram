/**
 * @file app/middlewares/validations/validators/auth/social.validator.js
 * @description social 유효성 체크 
 * 251204 v1.0.0 yeon init 
 */

import userField from "../../fields/user.field.js";

export default [userField.provider];
/**
 * @file app/middlewares/auth/configs/role.permissions.js
 * @description 요청 별 접근 권한 설정
 * 251126 v1.0.0 yeon init
 */

import ROLE from "./role.enum.js";
const { ADMIN, NORMAL, SUPER } = ROLE;

// 인증 및 인가가 필요한 요청만 정의
const ROLE_PERMISSIONS = {
  GET: [
    // /api/posts/:id(pk)
    { path: /^\/api\/posts\/[0-9]+$/, roles: [NORMAL, SUPER] },
    { path: /^\/api\/comments\/[0-9]+\/[0-9]+$/, roles: [NORMAL, SUPER]}
  ],
  POST: [
    { path: /^\/api\/auth\/reissue$/, roles: [NORMAL, SUPER] },
    { path: /^\/api\/posts$/, roles: [NORMAL, SUPER]},
    { path: /^\/api\/comments$/, roles: [NORMAL, SUPER]},
    { path: /^\/api\/files\/posts$/, roles: [NORMAL, SUPER]},
    { path: /^\/api\/files\/profiles$/, roles: [NORMAL, SUPER]},
  ],
  PUT: [
    { path: /^\/api\/users$/, roles: [NORMAL, SUPER]},

  ],
  DELETE: [
    { path: /^\/api\/posts\/[0-9]+$/, roles: [NORMAL, SUPER] },
  ]
}
Object.freeze(ROLE_PERMISSIONS);

export default ROLE_PERMISSIONS;
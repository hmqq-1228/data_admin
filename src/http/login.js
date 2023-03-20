import { get, post ,deletes, put} from "../http.js";

// 登陆
export const userLogin = params =>post("/auth/login/project",params)
// 公钥
export const getPublic = params =>get("/auth/rsa/publicKey",params)
// 退出
export const userLogout = params =>post("/auth/logout/project",params)
// 获取签名
export const getOssSign = params =>post("/base/upload/oss/sign",params)
// 用户详情
export const getUserInfo = params =>get("/auth/user/detail/project",params)

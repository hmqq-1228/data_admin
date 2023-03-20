import { get, post ,deletes, put} from "../http.js";

// *************** PC *************
// // 集团基础信息
export const totalData = params =>get("/teamBaseInfo/getBaseInfo",params)
// // 集团各标段学习信息
export const learnInfo = params =>get("/teamBaseInfo/getSubordinateUnitsLearnInfoPage",params)
// // 集团各工种人数
export const workType = params =>get("/teamUserInfo/getUserWorkTypeInfo",params)
// // 下属单位列表
export const branchList = params =>get("/teamBaseInfo/getSubordinateUnitsLearnInfoPage",params)
// // 项目班组数量
// export const groupList = params =>get("/projectStatistics/getProjectTeamPage",params)
// // 项目班组下拉
export const allGroup = params =>get("/projectStatistics/getProjectTeamList",params)
// // 个人学习情况
export const personInfo = params =>get("/projectStatistics/getUserLearnPage",params)
// // 项目学习情况
// export const projectInfo = params =>get("/projectStatistics/getProjectLearnInfo",params)
// // 折线图
export const branchData = params =>get("/teamBaseInfo/getSubordinateUnitsLearnInfoPage",params)
// 学习排行榜worKareaList
export const studyRank = params =>get("/teamBaseInfo/getLearnRank",params)
export const worKareaList = params =>get("/teamBaseInfo/getSubordinateUnitsList",params)

// *************** MB *************

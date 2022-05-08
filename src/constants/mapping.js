import { FaCheckCircle, FaQuestionCircle, FaTimesCircle } from "react-icons/fa";

const statusColorMap = {
  "0": "blue",
  "1": "green",
  "-1": "red"
}
const statusIconMap = {
  "0": FaQuestionCircle,
  "1": FaCheckCircle,
  "-1": FaTimesCircle
}
const ignoreTypeMap = {
  "exempt": "免值",
  "diner": "餐勤",
  "quarantine": "隔離",
  "occation": "請假",
  "hospitalized": "住院",
  "discharged": "退伍",
  "other": "其他",
  0: "無",
}

export { statusColorMap, statusIconMap, ignoreTypeMap }
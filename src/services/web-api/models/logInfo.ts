import { ErrorResponse } from './common'

export interface GetLogInfoTableParamsType {
  bot_id: string
  page: number
  pageSize: number
}

export interface LogInfoTableRow {
  id: number //编号
  bot_id: string //机器人id
  question: string //问题
  answer: string //答案
  create_date: number //创建时间
}

export interface LogInfoTableResponseType extends ErrorResponse {
  data: {
    count: number
    content: LogInfoTableRow[]
  }
}

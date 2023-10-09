import logInfo from '@/services/web-api/logInfo'
import { LogInfoTableRow } from '@/services/web-api/models/logInfo'
import { ActionType } from '@/constants/enums'
import { message } from 'antd'
import { useState } from 'react'
import { useModel } from '@umijs/max'

export default function useHistoryDialogs() {
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}

  const [data, setData] = useState<LogInfoTableRow[]>([])
  const [total, setTotal] = useState(0)
  const [pageSize] = useState(20)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const transferTableData = (rows: LogInfoTableRow[]) => {
    let dialogs: { type: string; content: string }[] = []
    rows.forEach(row => {
      dialogs.push({
        type: 'question',
        content: row.question,
      })
      dialogs.push({
        type: 'answer',
        content: row.answer,
      })
    })
    return dialogs
  }

  const getHistoryTable = async (_page: number = 1) => {
    if (currentUser?.bot_id) {
      setLoading(true)
      try {
        const res = await logInfo.getHistoryTable({
          bot_id: currentUser.bot_id,
          page: _page,
          pageSize,
          uuid: currentUser.bot_id,
        })
        if (res.ActionType === ActionType.OK) {
          const sortedData = res.data.content.sort((a, b) => new Date(a.create_date).getTime() - new Date(b.create_date).getTime())
          sortedData.concat(data)
          setData(sortedData)
          setTotal(res.data.count)
          setLoading(false)
          return transferTableData(sortedData)
        } else {
          message.error(res?.message || '获取对话历史记录失败')
          setLoading(false)
          return transferTableData(data)
        }
      } catch (error) {
        message.error('获取对话历史记录失败')
        setLoading(false)
        return transferTableData(data)
      }
    } else {
      message.error('获取机器人ID失败')
      return transferTableData(data)
    }
  }

  const getPreviousDialogs = async (_total: number) => {
    if (_total <= page * pageSize) {
      return
    }
    setPage(page + 1)
    console.log('page', page + 1)
    const rows = await getHistoryTable(page + 1)
    return rows
  }

  return {
    total,
    data,
    loading,
    getHistoryTable,
    getPreviousDialogs,
  }
}
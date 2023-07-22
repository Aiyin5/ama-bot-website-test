import { useEmotionCss } from '@ant-design/use-emotion-css'
import { history, useParams } from '@umijs/max'
import QA from './QA'
import Divider from 'antd/es/divider'
import styles from './index.less'
import { useEffect, useState } from 'react'
import BotAPI from '@/services/web-api/bot'
import { ActionType } from '@/constants/enums'
import { BotDataType } from '@/models/bot'

const Bot: React.FC = () => {
  const { id } = useParams()
  const [botInfo, setBotInfo] = useState<BotDataType>({} as BotDataType)

  const initBotInfo = async (email: string, bot_id: string) => {
    const res = await BotAPI.fetchBotInfo(email, bot_id)
    if (res?.ActionType === ActionType.OK) {
      const { name, image_url, welcomes, bgImg_url, contact, faq_contents } = res
      const botInfo = {
        id: bot_id,
        name,
        image_url,
        bgImg_url,
        welcomes: JSON.parse(welcomes),
        contact: JSON.parse(contact),
        faq_contents: JSON.parse(faq_contents),
      }
      setBotInfo(botInfo)
    }
  }

  const checkBot = async (id: string) => {
    const res = await BotAPI.checkBotValid(id)

    if (res?.ActionType === ActionType.False) {
      history.push('/user/register')
    } else {
      // todo
      await initBotInfo('', '')
      if (botInfo.bgImg_url) {
        document.getElementsByTagName('body')[0].style.backgroundImage = `url('${botInfo.bgImg_url}')`
      }
    }
  }

  useEffect(() => {
    if (id) {
      checkBot(id)
    }
  }, [])

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'space-between',
      justifyContent: 'space-between',
      height: '100vh',
      overflow: 'auto',
      maxWidth: '688px',
      margin: '0 auto',
    }
  })

  const handleJump = () => {
    history.push('/landing')
  }

  return (
    <div className={`${styles.bg} w-full`}>
      <div className={containerClassName}>
        <div style={{ flex: 1, padding: '12px 18px 10px 18px', overflow: 'hidden' }} className="fcc-between">
          <h2 className="text-center mb-0 text-black">Askio 的 AI 小客服</h2>
          <Divider style={{ margin: '12px 0 12px 0' }} />
          <QA
            style={{ flex: 1, overflow: 'auto' }}
            id={botInfo.id}
            contactCode={botInfo.contact}
            FAQContents={botInfo.faq_contents}
            welcomes={botInfo.welcomes}
          />
          <div style={{ textAlign: 'center', padding: 2, color: '#000000', fontSize: 12 }}>
            ©2023 <span onClick={handleJump}>Askio （ 悦问AI ）</span> 提供技术支持
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bot

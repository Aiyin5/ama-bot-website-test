import { GithubOutlined, GlobalOutlined } from '@ant-design/icons'
import { DefaultFooter } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import React from 'react'

const Footer: React.FC = () => {
  const intl = useIntl()
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'FreeBe DAO Askio Team',
  })

  const currentYear = new Date().getFullYear()

  return (
    <div className="fcc-center">
      <DefaultFooter
        style={{
          background: 'none',
        }}
        copyright={`${currentYear} ${defaultMessage}`}
        links={[
          {
            key: 'Askio',
            title: <GlobalOutlined />,
            href: REACT_APP_OFFICIAL_SITE,
            blankTarget: true,
          },
          {
            key: 'github',
            title: <GithubOutlined />,
            href: REACT_APP_GITHUB_SITE,
            blankTarget: true,
          },
        ]}
      />

      <a className="frc-center" href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">
        <img src="https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/ba.png" alt="" />
        <span className="ml-4"> 苏ICP备2022035073号-3 </span>
      </a>
    </div>
  )
}

export default Footer

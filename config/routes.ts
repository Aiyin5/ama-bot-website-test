﻿/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/',
    layout: false,
    routes: [
      {
        path: '/',
        redirect: '/landing',
      },
      {
        path: 'landing',
        layout: false,
        name: 'landing',
        component: './Landing',
      },
      {
        path: 'dna',
        layout: false,
        name: 'dna',
        component: './DNA',
      },
    ],
  },
  {
    path: '/user',
    name: 'user',
    component: './User/Layout',
    layout: false,
    routes: [
      {
        name: 'register',
        path: 'register',
        component: './User/Register',
      },
      {
        name: 'login',
        path: 'login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/config-group',
    name: 'config-group',
    redirect: '/database-config',
    access: 'user',
    disabled: true,
  },
  {
    path: '/database-config',
    name: 'database-config',
    icon: 'smile',
    access: 'user',
    routes: [
      {
        path: '/database-config',
        redirect: '/database-config/corpus',
      },
      {
        path: '/database-config/corpus',
        name: 'corpus',
        icon: 'dashOutlined',
        component: './Corpus',
      },
      {
        path: '/database-config/standard-lib',
        name: 'standard-lib',
        icon: 'smallDashOutlined',
        component: './StandardLib',
      },
    ],
  },
  {
    path: '/ama',
    name: 'ama',
    icon: 'message',
    access: 'user',
    component: './AskMeAnything',
  },
  {
    path: '/robot-config',
    name: 'robot-config',
    icon: 'setting',
    access: 'user',
    component: './BotConfig',
    // hideInMenu: true,
    // routes: [
    //   {
    //     path: '/robot-config',
    //     redirect: '/robot-config/im-connect',
    //   },
    //   {
    //     path: '/robot-config/im-connect',
    //     name: 'im-connect',
    //     icon: 'apiOutlined',
    //     component: './IMConnect',
    //   },
    //   {
    //     path: '/robot-config/visual-programming',
    //     name: 'visual-programming',
    //     icon: 'blockOutlined',
    //     component: './VisualProgramming',
    //   },
    // ],
  },
  {
    path: '/services-group',
    name: 'services-group',
    redirect: '/dialog-history',
    access: 'user',
    disabled: true,
  },
  {
    path: '/dialog-history',
    name: 'dialog-history',
    icon: 'history',
    access: 'user',
    component: './DialogHistory',
  },
  {
    path: '/service-pricing',
    name: 'service-pricing',
    icon: 'switcherOutlined',
    access: 'user',
    component: './ServicePricing',
  },
  {
    path: '/balance',
    name: 'balance',
    icon: 'hourglassOutlined',
    access: 'user',
    component: './Balance',
    hideInMenu: true,
  },
  {
    path: '/bot/:id',
    name: 'bot',
    layout: false,
    component: './Bot/$id',
    hideInMenu: true,
  },
  {
    path: '/404',
    name: '404',
    layout: false,
    component: './404',
  },
  {
    path: '/',
    redirect: '/landing',
  },
  {
    path: '*',
    redirect: '/404',
  },
]

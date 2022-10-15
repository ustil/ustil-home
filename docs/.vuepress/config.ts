import { defaultTheme, defineUserConfig } from 'vuepress'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'USTIL',
  description: '大学生科技创新实验室',
  head: [['link', { rel: 'icon', href: '/images/logo.webp' }]],
  theme: defaultTheme({
    navbar: [
      {
        text: '导航',
        link: 'https://gate.ustillab.com',
      },
      {
        text: '博客',
        link: 'https://blog.ustillab.com',
      },
      {
        text: '论坛',
        link: 'https://bbs.ustillab.com',
      },
    ],
    logo: '/images/logo.webp',
  }),
})

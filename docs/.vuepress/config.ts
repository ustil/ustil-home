import { defaultTheme, defineUserConfig } from 'vuepress'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'USTIL',
  description: '大学生科技创新实验室',
  head: [['link', { rel: 'icon', href: '/images/logo.webp' }]],
  theme: defaultTheme({
    logo: '/images/logo.webp',
  }),
})

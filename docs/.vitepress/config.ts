import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'USTIL',
  description: '大学生科技创新实验室',
  head: [['link', { rel: 'icon', href: '/images/logo.webp' }]],
  themeConfig: {
    logo: '/images/logo.webp',
  },
})

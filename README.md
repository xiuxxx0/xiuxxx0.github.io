<p align="center">
  <img src="https://raw.githubusercontent.com/xiuxxx0/xiuxxx0.github.io/main/images/avatar.jpg" width="120" height="120" style="border-radius:50%" alt="avatar" />
</p>

<h1 align="center">修的个人网站</h1>
<p align="center">
  <a href="https://xiuxxx0.github.io"><img src="https://img.shields.io/badge/GitHub_Pages-在线-2563eb?logo=github" /></a>
  <img src="https://img.shields.io/badge/license-MIT-green" />
  <img src="https://img.shields.io/badge/HTML5-CSS3-JavaScript-f59e0b" />
</p>

---

## 👤 关于

🎓 **江西科技师范大学** · 计算机科学与技术  
💻 当前学习：Java 后端开发 · Spring Boot · AI 应用开发  
🚀 兴趣方向：游戏开发 · 人工智能 · 软件工程

## ✨ 特性

- 🌗 白天 / 暗夜主题切换（跟随系统偏好，localStorage 持久化，无首屏闪烁）
- 📱 响应式布局 + 移动端汉堡菜单
- 📈 GitHub 统计数据自动更新（GitHub Actions 每小时同步 + 前端 API 实时兜底）
- 📦 项目 / 博客数据由 `data/*.json` 驱动，JS 内置离线回退
- ♿ 无障碍支持（ARIA、焦点样式、reduced-motion）
- 🔍 SEO 友好（Open Graph、canonical、sitemap.xml、robots.txt）

## 🚀 项目

| 项目 | 技术栈 | 链接 |
|------|--------|------|
| 🐍 **圈一圈（Ouroboros）** | Vue 3 · Phaser · TypeScript | [在线试玩](https://xiuxxx0.github.io/Ouroboros_gamejam/) · [详情页](https://xiuxxx0.github.io/projects/ouroboros-gamejam.html) · [源码](https://github.com/xiuxxx0/Ouroboros_gamejam) |
| ♾️ **Echo ∞ 双生时间线** | JavaScript · Canvas | [在线试玩](https://xiuxxx0.github.io/echo-infinity-game/) · [详情页](https://xiuxxx0.github.io/projects/echo-infinity.html) · [源码](https://github.com/xiuxxx0/echo-infinity-game) |
| 🐍 **NEON SNAKE 霓虹贪吃蛇** | JavaScript · Canvas · Web Audio | [在线试玩](https://xiuxxx0.github.io/snake-game/) · [详情页](https://xiuxxx0.github.io/projects/snake-game.html) · [源码](https://github.com/xiuxxx0/snake-game) |
| 🎣 **AI 捕鱼游戏** | JavaScript · Canvas · AI | [在线试玩](https://xiuxxx0.github.io/ai-fishing-game/) · [详情页](https://xiuxxx0.github.io/projects/ai-fishing.html) |
| 🤖 **RepoCourse 复盘助手** | Python · LLM · CLI | [详情页](https://xiuxxx0.github.io/projects/ai-project-reviewer.html) · [源码](https://github.com/xiuxxx0/ai-project-reviewer) |
| 🖥️ **DeepSeek Harness 桌面版** | C# · WebView2 · Windows | [详情页](https://xiuxxx0.github.io/projects/deepseek-harness-desktop.html) · [源码](https://github.com/xiuxxx0/deepseek-harness-desktop) |

## 📝 博客

| 文章 | 日期 | 标签 |
|------|------|------|
| RepoCourse：AI 时代的项目复盘助手 | 2026-08-16 | `AI` |
| DeepSeek Harness 桌面版开发记录 | 2026-08-15 | `桌面应用` |
| 圈一圈（Ouroboros）开发记录 | 2026-08-08 | `游戏` |
| 软件设计师备考记录 | 2026-07-15 | `考证` |
| AI 捕鱼游戏开发过程 | 2026-07-12 | `AI` |

## 🛠 技术栈

- **前端**: HTML5 · CSS3 · Vanilla JavaScript（无构建工具、零依赖）
- **部署**: GitHub Pages
- **CI/CD**: GitHub Actions 每小时同步 GitHub 统计数据

## 📁 目录结构

```
├── .github/workflows/      # GitHub Actions
│   └── update-github-stats.yml
├── index.html              # 主页
├── 404.html                # 404 页面
├── sitemap.xml             # 站点地图
├── robots.txt              # 爬虫规则
├── css/                    # 样式表 (8 个模块化文件)
├── js/                     # JavaScript (6 个模块)
│   ├── main.js             # 主页入口
│   ├── theme.js            # 主题切换
│   ├── nav.js              # 汉堡菜单 / 滚动高亮 / 回到顶部
│   ├── projects.js         # 项目渲染（JSON + 内置回退）
│   ├── blogs.js            # 博客渲染（JSON + 内置回退）
│   └── github.js           # GitHub 统计
├── blog/                   # 博客文章
├── projects/               # 项目详情页
├── data/                   # JSON 数据（含自动更新的 GitHub 统计）
└── images/                 # 图片资源
```

## 🌐 部署

| 平台 | URL |
|------|-----|
| **GitHub Pages** | [xiuxxx0.github.io](https://xiuxxx0.github.io) |

## 🏠 本地运行

```bash
# 直接用浏览器打开（离线也能渲染，JSON 加载失败自动回退内置数据）
start index.html

# 或起一个静态服务
python -m http.server 8080
```

无需任何构建工具或依赖安装。

## 📄 License

MIT © 修

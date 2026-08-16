/* =====================
   Blog List Renderer
   优先加载 data/blogs.json，失败时回退到内置数据
===================== */
const Blogs = (() => {
  const DATA = [
    {
      title: "RepoCourse：AI 时代的项目复盘助手",
      date: "2026-08-16",
      tag: "AI",
      desc: "AI 让「完成项目」越来越快，但完成不等于理解：记录项目复盘助手 RepoCourse 的设计与开发过程。",
      url: "blog/ai-project-reviewer.html"
    },
    {
      title: "DeepSeek Harness 桌面版开发记录",
      date: "2026-08-15",
      tag: "桌面应用",
      desc: "用 WebView2 给 DeepSeek Harness 做一个 Windows 桌面外壳：品牌启动画面、服务自动拉起与生命周期管理。",
      url: "blog/deepseek-harness-desktop.html"
    },
    {
      title: "圈一圈（Ouroboros）开发记录",
      date: "2026-08-08",
      tag: "游戏",
      desc: "2026 BOKE VIBE JAM 一等奖作品的完整开发记录：闭环玩法、Boss 战与多端打包。",
      url: "blog/ouroboros.html"
    },
    {
      title: "软件设计师备考记录",
      date: "2026-07-15",
      tag: "考证",
      desc: "软件设计师（软考中级）考试概述与备考计划：数据结构、数据库、操作系统与软件工程。",
      url: "blog/soft-test.html"
    },
    {
      title: "AI捕鱼游戏开发过程",
      date: "2026-07-12",
      tag: "AI",
      desc: "从一个小游戏开始，逐步加入 AI 队友、行为分析与聊天系统的过程记录。",
      url: "blog/ai-fishing.html"
    },
  ];

  let data = DATA;

  function fetchJSON(url, timeoutMs) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    return fetch(url, { signal: ctrl.signal, cache: "no-cache" })
      .then((res) => {
        clearTimeout(timer);
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .catch((err) => {
        clearTimeout(timer);
        throw err;
      });
  }

  function cardHTML(b, i) {
    return (
      '<div class="blog-card reveal" style="transition-delay:' + i * 0.08 + 's">' +
      '<div class="blog-meta">' +
      '<span class="blog-tag">' + b.tag + "</span>" +
      '<span class="blog-date">' + b.date + "</span>" +
      "</div>" +
      "<h3>" + b.title + "</h3>" +
      '<p class="blog-desc">' + b.desc + "</p>" +
      '<a href="' + b.url + '">阅读全文 →</a>' +
      "</div>"
    );
  }

  function render(container) {
    container.innerHTML = data.map(cardHTML).join("");
  }

  async function init() {
    const container = document.getElementById("blog-list");
    if (!container) return;

    try {
      const json = await fetchJSON("data/blogs.json", 2500);
      if (Array.isArray(json) && json.length) data = json;
    } catch (err) {
      /* 离线或加载失败时使用内置数据 */
      console.warn("blogs.json load failed, using inline data:", err.message);
    }

    render(container);
  }

  return { init };
})();

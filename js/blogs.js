/* =====================
   Blog List Renderer (inline data)
===================== */
const Blogs = (() => {
  const DATA = [
    {
      title: "圈一圈（Ouroboros）开发记录",
      date: "2026-08-08",
      tag: "游戏",
      desc: "2026 BOKE VIBE JAM 一等奖作品的完整开发记录：闭环玩法、Boss 战与多端打包。",
      url: "blog/ouroboros.html"
    },
    {
      title: "Java基础学习笔记",
      date: "2026-07-10",
      tag: "Java",
      desc: "从 Java 基础语法到面向对象与数据结构的学习笔记。",
      url: "blog/java-basic.html"
    },
    {
      title: "AI捕鱼游戏开发过程",
      date: "2026-07-12",
      tag: "AI",
      desc: "从一个小游戏开始，逐步加入 AI 队友、行为分析与聊天系统的过程记录。",
      url: "blog/ai-fishing.html"
    },
    {
      title: "软件设计师备考记录",
      date: "2026-07-15",
      tag: "考试",
      desc: "软件设计师考试的备考计划与知识点整理。",
      url: "blog/soft-test.html"
    }
  ];

  function init() {
    const container = document.getElementById("blog-list");
    if (!container) return;

    container.innerHTML = DATA.map((b, i) => `
      <div class="blog-card reveal" style="transition-delay:${i * 0.08}s">
        <div class="blog-meta">
          <span class="blog-tag">${b.tag}</span>
          <span class="blog-date">${b.date}</span>
        </div>
        <h3>${b.title}</h3>
        <p class="blog-desc">${b.desc}</p>
        <a href="${b.url}" target="_blank">阅读全文 →</a>
      </div>
    `).join("");
  }

  return { init };
})();

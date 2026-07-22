/* =====================
   Blog List Renderer (inline data)
===================== */
const Blogs = (() => {
  const DATA = [
    {
      title: "Java基础学习笔记",
      date: "2026-07-10",
      tag: "Java",
      url: "blog/java-basic.html"
    },
    {
      title: "AI捕鱼游戏开发过程",
      date: "2026-07-12",
      tag: "AI",
      url: "blog/ai-fishing.html"
    },
    {
      title: "软件设计师备考记录",
      date: "2026-07-15",
      tag: "考试",
      url: "blog/soft-test.html"
    }
  ];

  function init() {
    const container = document.getElementById("blog-list");
    if (!container) return;

    container.innerHTML = DATA.map(b => `
      <div class="blog-card">
        <h3>${b.title}</h3>
        <p>发布时间：${b.date}</p>
        <div class="blog-tags">
          <span>${b.tag}</span>
        </div>
        <a href="${b.url}" target="_blank">阅读全文 →</a>
      </div>
    `).join("");
  }

  return { init };
})();

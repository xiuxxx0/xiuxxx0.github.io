/* =====================
   Projects Renderer (inline data)
===================== */
const Projects = (() => {
  const DATA = [
    {
      title: "圈一圈（Ouroboros）",
      image: "images/ouroboros-logo.png",
      desc: "一个围绕「无限循环」设计的生存类游戏：控制蛇身闭合形成圆环，将敌人困在环内消灭。",
      tech: ["Vue 3", "Phaser", "TypeScript"],
      link: "projects/ouroboros-gamejam.html"
    },
    {
      title: "AI捕鱼游戏",
      image: "images/fishing1.png",
      desc: "一个基于 HTML5 Canvas 开发的 AI 驱动捕鱼游戏，包含 AI 队友与玩家行为分析。",
      tech: ["JavaScript", "Canvas", "AI Behavior"],
      link: "projects/ai-fishing.html"
    },
    {
      title: "Java学习项目",
      image: "images/avatar.jpg",
      desc: "记录从 Java 基础到后端开发的学习过程：面向对象、数据结构与项目实践。",
      tech: ["Java", "Spring Boot", "MySQL", "Redis"],
      link: "projects/java-study.html"
    }
  ];

  function init() {
    const container = document.getElementById("project-list");
    if (!container) return;

    container.innerHTML = DATA.map((p, i) => `
      <div class="card reveal" style="transition-delay:${i * 0.08}s">
        <div class="card-media"><img src="${p.image}" alt="${p.title}"></div>
        <div class="card-body">
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <div class="tags">
            ${p.tech.map(t => `<span>${t}</span>`).join("")}
          </div>
          <a class="project-btn" href="${p.link}" target="_blank">查看详情 →</a>
        </div>
      </div>
    `).join("");
  }

  return { init };
})();

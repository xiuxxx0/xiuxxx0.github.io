/* =====================
   Projects Renderer (inline data)
===================== */
const Projects = (() => {
  const DATA = [
    {
      title: "AI捕鱼游戏",
      image: "images/fishing1.png",
      desc: "基于Canvas开发的AI小游戏",
      tech: ["JavaScript", "Canvas", "AI"],
      link: "projects/ai-fishing.html"
    },
    {
      title: "Java学习项目",
      image: "images/avatar.jpg",
      desc: "Java后端学习项目",
      tech: ["Java", "Spring Boot", "MySQL"],
      link: "projects/java-study.html"
    }
  ];

  function init() {
    const container = document.getElementById("project-list");
    if (!container) return;

    container.innerHTML = DATA.map(p => `
      <div class="card">
        <img src="${p.image}" alt="${p.title}">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="tags">
          ${p.tech.map(t => `<span>${t}</span>`).join("")}
        </div>
        <a class="project-btn" href="${p.link}" target="_blank">查看详情</a>
      </div>
    `).join("");
  }

  return { init };
})();

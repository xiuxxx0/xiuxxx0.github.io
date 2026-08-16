/* =====================
   Projects Renderer
   优先加载 data/projects.json，失败时回退到内置数据
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
      title: "Echo ∞ 双生时间线",
      image: "images/echo-infinity.png",
      desc: "穿越屏幕中线交换时间环的双时间线射击游戏，上一轮的子弹轨迹会在下一轮回响重现。",
      tech: ["JavaScript", "Canvas", "Game"],
      link: "projects/echo-infinity.html"
    },
    {
      title: "NEON SNAKE 霓虹贪吃蛇",
      image: "images/snake-game.png",
      desc: "单文件零依赖的霓虹风贪吃蛇：平滑插值移动、连击倍率、粒子特效与合成音效。",
      tech: ["JavaScript", "Canvas", "Web Audio"],
      link: "projects/snake-game.html"
    },
    {
      title: "AI捕鱼游戏",
      image: "images/fishing1.jpg",
      desc: "一个基于 HTML5 Canvas 开发的 AI 驱动捕鱼游戏，包含 AI 队友与玩家行为分析。",
      tech: ["JavaScript", "Canvas", "AI Behavior"],
      link: "projects/ai-fishing.html"
    },
    {
      title: "RepoCourse 复盘助手",
      image: "images/repocourse.png",
      desc: "AI 时代的项目复盘工具：扫描代码项目，基于多源证据 + LLM 生成技术复盘与学习报告。",
      tech: ["Python", "LLM", "CLI"],
      link: "projects/ai-project-reviewer.html"
    },
    {
      title: "Java学习项目",
      image: "images/avatar.jpg",
      desc: "记录从 Java 基础到后端开发的学习过程：面向对象、数据结构与项目实践。",
      tech: ["Java", "Spring Boot", "MySQL", "Redis"],
      link: "projects/java-study.html"
    }
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

  function cardHTML(p, i) {
    const tech = p.tech.map((t) => "<span>" + t + "</span>").join("");
    return (
      '<div class="card reveal" style="transition-delay:' + i * 0.08 + 's">' +
      '<div class="card-media"><img src="' + p.image + '" alt="' + p.title + '" loading="lazy" decoding="async"></div>' +
      '<div class="card-body">' +
      "<h3>" + p.title + "</h3>" +
      "<p>" + p.desc + "</p>" +
      '<div class="tags">' + tech + "</div>" +
      '<a class="project-btn" href="' + p.link + '">查看详情 →</a>' +
      "</div></div>"
    );
  }

  function render(container) {
    container.innerHTML = data.map(cardHTML).join("");
  }

  async function init() {
    const container = document.getElementById("project-list");
    if (!container) return;

    try {
      const json = await fetchJSON("data/projects.json", 2500);
      if (Array.isArray(json) && json.length) data = json;
    } catch (err) {
      /* 离线或加载失败时使用内置数据 */
      console.warn("projects.json load failed, using inline data:", err.message);
    }

    render(container);
  }

  return { init };
})();

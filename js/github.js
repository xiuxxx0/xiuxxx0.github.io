/* =====================
   GitHub Stats Module
   1) 优先读取 GitHub Actions 缓存的 data/github-stats.json
   2) 失败时回退到 GitHub REST API 实时数据
   3) 贡献图加载失败时降级为文字链接
===================== */
const GitHub = (() => {
  const STATS_PATH = "data/github-stats.json";
  const USER_API = "https://api.github.com/users/xiuxxx0";
  const REPOS_API = "https://api.github.com/users/xiuxxx0/repos?per_page=100";

  let inited = false;

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerText = value;
  }

  function fmtDate(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    const p = (n) => String(n).padStart(2, "0");
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
  }

  /* 贡献图加载失败 → 换成文字链接 */
  function initChartFallback() {
    const chart = document.getElementById("gh-chart");
    if (!chart) return;
    const replace = () => {
      const a = document.createElement("a");
      a.className = "project-btn";
      a.href = "https://github.com/xiuxxx0";
      a.target = "_blank";
      a.rel = "noopener";
      a.innerText = "在 GitHub 查看贡献记录";
      chart.replaceWith(a);
    };
    if (chart.complete && chart.naturalWidth === 0) {
      replace();
    } else {
      chart.addEventListener("error", replace, { once: true });
    }
  }

  async function init() {
    if (inited) return;
    inited = true;

    initChartFallback();

    /* 1) 缓存数据 */
    try {
      const res = await fetch(STATS_PATH, { cache: "no-cache" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const d = await res.json();
      setText("repo-count", d.public_repos);
      setText("star-count", d.stars);
      setText("followers-count", d.followers);
      setText("stats-updated", d.updated_at ? "更新于 " + fmtDate(d.updated_at) : "");
      return;
    } catch (err) {
      console.warn("cached stats load failed, trying live API:", err.message);
    }

    /* 2) 实时 API 兜底 */
    try {
      const [u, r] = await Promise.all([
        fetch(USER_API).then((x) => (x.ok ? x.json() : Promise.reject(new Error("HTTP " + x.status)))),
        fetch(REPOS_API).then((x) => (x.ok ? x.json() : Promise.reject(new Error("HTTP " + x.status))))
      ]);
      setText("repo-count", u.public_repos || 0);
      setText(
        "star-count",
        Array.isArray(r) ? r.reduce((s, repo) => s + (repo.stargazers_count || 0), 0) : 0
      );
      setText("followers-count", u.followers || 0);
      setText("stats-updated", "实时数据");
    } catch (err) {
      console.warn("GitHub stats load failed:", err.message);
    }
  }

  return { init };
})();

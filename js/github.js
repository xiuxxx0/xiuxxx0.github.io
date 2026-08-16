/* =====================
   GitHub Stats Module
   1) 优先读取 GitHub Actions 缓存的 data/github-stats.json
   2) 失败时回退到 GitHub REST API 实时数据
   3) 贡献日历：渲染 data/contributions.json（自然年 1月 → 12月）
===================== */
const GitHub = (() => {
  const STATS_PATH = "data/github-stats.json";
  const CONTRIB_PATH = "data/contributions.json";
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

  /* ---- 贡献日历（按自然年渲染，1 月开头，自适应不溢出） ---- */
  async function initContribCalendar() {
    const wrap = document.getElementById("contrib-calendar");
    if (!wrap) return;

    let data = null;
    try {
      const res = await fetch(CONTRIB_PATH, { cache: "no-cache" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      data = await res.json();
    } catch (err) {
      console.warn("contributions.json load failed:", err.message);
    }

    if (!data || !Array.isArray(data.days) || !data.days.length) {
      wrap.innerHTML =
        '<p class="cal-fallback">贡献日历暂不可用 — <a href="https://github.com/xiuxxx0" target="_blank" rel="noopener">在 GitHub 查看贡献记录</a></p>';
      return;
    }

    renderCalendar(wrap, data);
  }

  function renderCalendar(wrap, data) {
    const byDate = {};
    data.days.forEach((d) => { byDate[d.d] = d.c || 0; });

    const year = data.year || new Date().getFullYear();
    const today = new Date();
    const p2 = (n) => String(n).padStart(2, "0");
    const MONTHS = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];

    let html =
      '<div class="cal-summary">' +
      '<span class="cal-total">' + year + ' 年共 <strong>' + (data.total || 0) + '</strong> 次贡献</span>' +
      '<span class="cal-legend">少<span class="sw"></span><span class="sw l1"></span><span class="sw l2"></span><span class="sw l3"></span><span class="sw l4"></span>多</span>' +
      "</div>" +
      '<div class="cal-months">';

    for (let m = 0; m < 12; m++) {
      const daysInMonth = new Date(year, m + 1, 0).getDate();
      const firstDow = new Date(year, m, 1).getDay(); // 0 = Sunday
      html += '<div class="cal-month"><h4>' + MONTHS[m] + '</h4><div class="cal-days">';
      for (let i = 0; i < firstDow; i++) html += '<span class="cal-day empty"></span>';
      for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = year + "-" + p2(m + 1) + "-" + p2(d);
        const isFuture = new Date(year, m, d) > today;
        if (isFuture) {
          html += '<span class="cal-day empty"></span>';
          continue;
        }
        const c = byDate[dateStr] || 0;
        const lvl = c === 0 ? 0 : c <= 2 ? 1 : c <= 5 ? 2 : c <= 9 ? 3 : 4;
        html +=
          '<span class="cal-day' + (lvl ? " l" + lvl : "") + '" title="' +
          dateStr + "：" + c + ' 次贡献"></span>';
      }
      html += "</div></div>";
    }

    html += "</div>";
    wrap.innerHTML = html;
  }

  async function init() {
    if (inited) return;
    inited = true;

    initContribCalendar();

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

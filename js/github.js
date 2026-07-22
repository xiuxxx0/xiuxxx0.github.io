/* =====================
   GitHub API Module
   (uses cached data from GitHub Actions)
===================== */
const GitHub = (() => {
  const STATS_PATH = "data/github-stats.json";

  async function fetchStats() {
    try {
      const res = await fetch(STATS_PATH);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      document.getElementById("repo-count").innerText = data.public_repos;
      document.getElementById("star-count").innerText = data.stars;
      document.getElementById("followers-count").innerText = data.followers;
    } catch (err) {
      console.warn("GitHub stats load failed:", err.message);
      document.querySelectorAll(".github-stats h3").forEach(el => {
        el.innerText = "—";
      });
    }
  }

  async function init() {
    await fetchStats();
  }

  return { init };
})();

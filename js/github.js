/* =====================
   GitHub API Module
===================== */
const GitHub = (() => {
  const USERNAME = "xiuxxx0";
  const API_BASE = "https://api.github.com";

  async function fetchUser() {
    try {
      const res = await fetch(`${API_BASE}/users/${USERNAME}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      document.getElementById("repo-count").innerText = data.public_repos;
      document.getElementById("followers-count").innerText = data.followers;
    } catch (err) {
      console.warn("GitHub user data load failed:", err.message);
    }
  }

  async function fetchStars() {
    try {
      const res = await fetch(`${API_BASE}/users/${USERNAME}/repos`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const repos = await res.json();
      const stars = repos
        .filter(repo => !repo.fork)
        .reduce((sum, repo) => sum + repo.stargazers_count, 0);
      document.getElementById("star-count").innerText = stars;
    } catch (err) {
      console.warn("GitHub stars load failed:", err.message);
    }
  }

  async function init() {
    await Promise.all([fetchUser(), fetchStars()]);
  }

  return { init };
})();

/* =====================
   Theme Toggle Module
===================== */
const Theme = (() => {
  const btn = document.getElementById("theme-btn");

  function init() {
    if (!btn) return;

    // Load saved preference
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
      btn.innerHTML = "☀️";
    }

    btn.onclick = () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      btn.innerHTML = isDark ? "☀️" : "🌙";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    };
  }

  return { init };
})();

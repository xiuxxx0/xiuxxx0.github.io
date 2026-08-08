/* =====================
   Theme Toggle Module
===================== */
const Theme = (() => {
  const btn = document.getElementById("theme-btn");
  const tip = document.getElementById("theme-tip");

  function setTipText(isDark) {
    if (!tip) return;
    tip.textContent = isDark ? "☀️ 点击这里切换白天模式" : "💡 点击这里切换黑夜模式";
  }

  function showTip() {
    if (tip) tip.classList.add("show");
  }

  function hideTip() {
    if (tip) tip.classList.remove("show");
  }

  function init() {
    if (!btn) return;

    // Load saved preference
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
      btn.innerHTML = "☀️";
      setTipText(true);
    }

    btn.onclick = () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      btn.innerHTML = isDark ? "☀️" : "🌙";
      localStorage.setItem("theme", isDark ? "dark" : "light");
      setTipText(isDark);
      hideTip();
    };

    // 首次访问提醒：右上角月亮按钮支持切换黑夜/白天模式
    if (tip && !localStorage.getItem("theme-tip-seen")) {
      showTip();
      setTimeout(hideTip, 6000);
      localStorage.setItem("theme-tip-seen", "1");
    }

    // 悬停 / 聚焦时显示提醒
    btn.addEventListener("mouseenter", showTip);
    btn.addEventListener("mouseleave", hideTip);
    btn.addEventListener("focus", showTip);
    btn.addEventListener("blur", hideTip);
    btn.addEventListener("click", hideTip);
  }

  return { init };
})();

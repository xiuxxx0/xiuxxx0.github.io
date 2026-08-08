/* =====================
   Theme Toggle Module
   暗夜模式切换逻辑：
   - 首次访问根据系统 prefers-color-scheme 决定主题
   - 用户选择保存到 localStorage，刷新后保持
   - 通过 html.dark 类切换主题，避免首屏闪烁
===================== */
const Theme = (() => {
  const btn = document.getElementById("theme-btn");
  const tip = document.getElementById("theme-tip");
  const root = document.documentElement;

  const STORAGE_KEY = "theme";

  // 当前是否为暗夜模式
  function isDark() {
    return root.classList.contains("dark");
  }

  // 同步提醒气泡文案
  function setTipText(dark) {
    if (!tip) return;
    tip.textContent = dark ? "☀️ 点击这里切换白天模式" : "💡 点击这里切换黑夜模式";
  }

  // 同步开关状态与无障碍属性
  function updateSwitch(dark) {
    if (!btn) return;
    btn.setAttribute("aria-checked", dark ? "true" : "false");
    btn.setAttribute("aria-label", dark ? "切换到白天模式" : "切换到暗夜模式");
  }

  function showTip() {
    if (tip) tip.classList.add("show");
  }

  function hideTip() {
    if (tip) tip.classList.remove("show");
  }

  // 应用主题；save 为 true 时写入 localStorage
  function applyTheme(dark, save) {
    root.classList.toggle("dark", dark);
    if (save) {
      try { localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light"); } catch (e) {}
    }
    updateSwitch(dark);
    setTipText(dark);
  }

  function init() {
    if (!btn) return;

    // 初始主题：localStorage 优先，否则跟随系统偏好
    let saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    const initialDark = saved
      ? saved === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(initialDark, false);

    // 点击切换白天 / 暗夜模式
    btn.addEventListener("click", () => {
      applyTheme(!isDark(), true);
      hideTip();
    });

    // 首次访问提醒气泡：提示右上角开关可切换主题
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
  }

  return { init };
})();

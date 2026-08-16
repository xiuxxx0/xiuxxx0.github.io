/* =====================
   Theme Toggle Module
   暗夜模式切换逻辑：
   - 首次访问根据系统 prefers-color-scheme 决定主题
   - 用户选择保存到 localStorage，刷新后保持
   - 通过 html.dark 类切换主题，避免首屏闪烁
===================== */
const Theme = (() => {
  const btn = document.getElementById("theme-btn");
  const root = document.documentElement;

  const STORAGE_KEY = "theme";

  // 当前是否为暗夜模式
  function isDark() {
    return root.classList.contains("dark");
  }

  // 同步开关状态与无障碍属性
  function updateSwitch(dark) {
    if (!btn) return;
    btn.setAttribute("aria-checked", dark ? "true" : "false");
    btn.setAttribute("aria-label", dark ? "切换到白天模式" : "切换到暗夜模式");
  }

  // 应用主题；save 为 true 时写入 localStorage
  function applyTheme(dark, save) {
    root.classList.toggle("dark", dark);
    if (save) {
      try { localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light"); } catch (e) {}
    }
    updateSwitch(dark);
  }

  let inited = false;

  function init() {
    if (inited || !btn) return;
    inited = true;

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
    });
  }

  return { init };
})();

/* 子页面没有 main.js，这里自动初始化（init 有幂等保护） */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => Theme.init());
} else {
  Theme.init();
}

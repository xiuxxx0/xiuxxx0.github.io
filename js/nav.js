/* =====================
   Nav Module
   汉堡菜单 / 滚动高亮 / 回到顶部
===================== */
const Nav = (() => {
  let inited = false;

  function init() {
    if (inited) return;
    inited = true;

    const burger = document.getElementById("hamburger");
    const menu = document.getElementById("nav-menu");

    /* ---- 汉堡菜单 ---- */
    if (burger && menu) {
      const setOpen = (open) => {
        menu.classList.toggle("open", open);
        burger.setAttribute("aria-expanded", open ? "true" : "false");
        burger.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
      };

      burger.addEventListener("click", () => {
        setOpen(!menu.classList.contains("open"));
      });

      // 点击菜单项后收起
      menu.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => setOpen(false));
      });

      // 点击面板外部关闭
      document.addEventListener("click", (e) => {
        if (
          menu.classList.contains("open") &&
          !menu.contains(e.target) &&
          !burger.contains(e.target)
        ) {
          setOpen(false);
        }
      });

      // Esc 关闭并把焦点还给按钮
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && menu.classList.contains("open")) {
          setOpen(false);
          burger.focus();
        }
      });
    }

    /* ---- 回到顶部 ---- */
    const top = document.getElementById("back-to-top");
    if (top) {
      const onScroll = () => top.classList.toggle("show", window.scrollY > 480);
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      top.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    /* ---- 滚动高亮当前区块（仅主页锚点） ---- */
    const sections = document.querySelectorAll("main section[id]");
    const links = document.querySelectorAll('.nav-menu a[href^="#"]');
    if (sections.length && links.length && "IntersectionObserver" in window) {
      const spy = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              links.forEach((l) => {
                l.classList.toggle(
                  "active",
                  l.getAttribute("href") === "#" + entry.target.id
                );
              });
            }
          });
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      sections.forEach((s) => spy.observe(s));
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  return { init };
})();

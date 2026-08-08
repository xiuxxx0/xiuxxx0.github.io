/* =====================
   Main Entry Point
===================== */
(function main() {
  Theme.init();
  GitHub.init();
  Projects.init();
  Blogs.init();
  initReveal();
  initNavbarScroll();
})();

/* 滚动出现动画：元素进入视口时添加 visible 类 */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach(el => el.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  els.forEach(el => observer.observe(el));
}

/* 导航栏滚动状态：滚动后加深阴影，增加层次感 */
function initNavbarScroll() {
  const nav = document.querySelector(".navbar");
  if (!nav) return;
  const update = () => nav.classList.toggle("scrolled", window.scrollY > 12);
  window.addEventListener("scroll", update, { passive: true });
  update();
}

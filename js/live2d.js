/* =====================
   Live2D 看板娘加载器
   控件文件自托管于 /live2d/，模型走 live2d_api CDN
===================== */
const live2d_path = '/live2d/';

function loadExternalResource(url, type) {
  return new Promise((resolve, reject) => {
    let tag;

    if (type === 'css') {
      tag = document.createElement('link');
      tag.rel = 'stylesheet';
      tag.href = url;
    }
    else if (type === 'js') {
      tag = document.createElement('script');
      tag.type = 'module';
      tag.src = url;
    }
    if (tag) {
      tag.onload = () => resolve(url);
      tag.onerror = () => reject(url);
      document.head.appendChild(tag);
    }
  });
}

(async () => {
  // 手机端不显示看板娘，保持页面清爽（如需手机显示，注释掉下一行即可）
  if (screen.width < 768) return;

  // 避免图片资源跨域问题
  const OriginalImage = window.Image;
  window.Image = function (...args) {
    const img = new OriginalImage(...args);
    img.crossOrigin = 'anonymous';
    return img;
  };
  window.Image.prototype = OriginalImage.prototype;

  // 加载看板娘样式和脚本
  await Promise.all([
    loadExternalResource(live2d_path + 'waifu.css', 'css'),
    loadExternalResource(live2d_path + 'waifu-tips.js', 'js'),
  ]);

  initWidget({
    waifuPath: live2d_path + 'waifu-tips.json',
    cdnPath: 'https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/',
    cubism2Path: live2d_path + 'live2d.min.js',
    cubism5Path: 'https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js',
    modelId: 0, // 默认模型：Pio（Potion-Maker 小魔女），可点击按钮切换模型（4=Shizuku）
    tools: ['hitokoto', 'asteroids', 'switch-model', 'switch-texture', 'photo', 'info', 'quit'],
    logLevel: 'warn',
    drag: false, // 固定位置，禁止拖动
  });
})();

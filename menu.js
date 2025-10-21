(function () {
  const wrapper = document.getElementById('menuWrapper');
  if (!wrapper) return;
  const hotspot = wrapper.querySelector('.menu-hotspot');

  hotspot.addEventListener('click', (e) => {
    e.stopPropagation();
    wrapper.classList.toggle('touch-open');
  });

  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) wrapper.classList.remove('touch-open');
  });

  document.addEventListener('touchstart', (e) => {
    if (!wrapper.contains(e.target)) wrapper.classList.remove('touch-open');
  }, { passive: true });

  wrapper.addEventListener('mouseleave', () => wrapper.classList.remove('touch-open'));
  wrapper.addEventListener('pointerleave', () => wrapper.classList.remove('touch-open'));

  // 作品對應 URL
  const map = {
    '作品一': 'https://a0961120123-cloud.github.io/10142/',
    '作品二': 'https://hackmd.io/@zbZkU_9vQqi1kN_TT2jVkA/BkjxtOJ3gl'
  };

  const items = wrapper.querySelectorAll('.menu-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      const txt = item.textContent.trim();
      if (map[txt]) openIframeOverlay(map[txt]);
      wrapper.classList.remove('touch-open');
    });
  });

  function openIframeOverlay(url) {
    let overlay = document.getElementById('iframeOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'iframeOverlay';
      overlay.innerHTML = `
        <div class="iframe-wrapper" role="dialog" aria-modal="true">
          <button class="iframe-close" aria-label="關閉">&times;</button>
          <iframe src="" frameborder="0" allowfullscreen sandbox="allow-same-origin allow-scripts allow-forms allow-popups"></iframe>
        </div>
      `;
      document.body.appendChild(overlay);

      overlay.querySelector('.iframe-close').addEventListener('click', closeIframeOverlay);
      overlay.addEventListener('click', (ev) => { if (ev.target === overlay) closeIframeOverlay(); });

      // ESC 關閉
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeIframeOverlay(); });
    } else {
      overlay.querySelector('iframe').src = '';
    }

    const iframe = overlay.querySelector('iframe');
    let loaded = false;
    const onLoad = () => {
      loaded = true;
      overlay.classList.add('open');
      iframe.removeEventListener('load', onLoad);
      clearTimeout(fallbackTimeout);
    };
    iframe.addEventListener('load', onLoad);

    // 設定 src（若被 X-Frame-Options 阻擋，會觸發 fallback）
    iframe.src = url;

    // fallback：1.2s 未 load 則改在新分頁開啟
    const fallbackTimeout = setTimeout(() => {
      if (!loaded) {
        if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
        window.open(url, '_blank', 'noopener');
      }
    }, 1200);
  }

  function closeIframeOverlay() {
    const overlay = document.getElementById('iframeOverlay');
    if (!overlay) return;
    overlay.classList.remove('open');
    setTimeout(() => { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 240);
  }
})();
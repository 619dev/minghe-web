// Apply preferences before styles load to avoid flashing the wrong theme.
(() => {
  const read = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const theme = read('minghe-theme');
  document.documentElement.dataset.theme = ['light', 'dark'].includes(theme)
    ? theme : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const locales = window.MINGHE_LOCALES;
  const language = read('minghe-language');
  const browserLanguages = navigator.languages || [navigator.language];
  const detected = browserLanguages.map(value => value.toLowerCase().split('-')[0]).find(value => Object.hasOwn(locales, value)) || 'en';
  const preferred = Object.hasOwn(locales, language) ? language : detected;
  // Explicit locale URLs always stay accessible, including Chinese without storage.
  if ((location.pathname === '/' || location.pathname === '/index.html') && preferred !== 'zh') {
    location.replace(locales[preferred].path + location.search + location.hash);
  }
})();

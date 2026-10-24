const locales = window.MINGHE_LOCALES;
const language = document.documentElement.lang.split('-')[0];
const ui = locales[language] || locales.en;
const save = (key, value) => { try { localStorage.setItem(key, value); } catch { /* Preferences still work without storage. */ } };
const menu = document.querySelector('.menu');
const setMenu = open => {
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? ui.closeMenu : ui.openMenu);
  document.querySelector('nav').classList.toggle('open', open);
};
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
document.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });
document.querySelector('#language-switch').addEventListener('change', event => {
  const next = event.currentTarget.value;
  if (!locales[next]) return;
  save('minghe-language', next);
  location.assign(locales[next].path + location.search + location.hash);
});
const themeButton = document.querySelector('#theme-switch');
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
const applyTheme = theme => {
  document.documentElement.dataset.theme = theme;
  const dark = theme === 'dark';
  themeButton.setAttribute('aria-pressed', String(dark));
  const label = dark ? ui.light : ui.dark;
  themeButton.setAttribute('aria-label', label);
  themeButton.title = label;
  themeButton.firstElementChild.textContent = dark ? '☀' : '☾';
  document.querySelector('meta[name="theme-color"]').content = dark ? '#111d18' : '#f8f9f5';
};
let manualTheme = false;
try { manualTheme = ['light','dark'].includes(localStorage.getItem('minghe-theme')); } catch {}
applyTheme(document.documentElement.dataset.theme);
themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  manualTheme = true;
  save('minghe-theme', theme);
  applyTheme(theme);
});
systemTheme.addEventListener('change', event => { if (!manualTheme) applyTheme(event.matches ? 'dark' : 'light'); });
document.querySelector('#copy').addEventListener('click', async () => {
  const toast = document.querySelector('#toast');
  try {
    await navigator.clipboard.writeText(document.querySelector('#commands').textContent);
    toast.textContent = ui.copied;
  } catch {
    toast.textContent = ui.copyFailed;
  }
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
});

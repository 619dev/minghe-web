import { readFile, writeFile } from 'node:fs/promises';
const config = JSON.parse(await readFile('locales/config.json', 'utf8'));
const template = await readFile('index.html', 'utf8');
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const attributes = { '鸣鹤首页':'home', '主导航':'nav', '打开导航':'openMenu', '复制部署命令':'copy', '切换配色方案':'dark', '选择语言':'language', '两台分机通过鸣鹤服务器加密连接的示意图':'diagram', 'Tantuns H5 黑色实体按键 4G SIP 便携电话机':'image' };
for (const [code, locale] of Object.entries(config)) {
  const dict = code === 'zh' ? null : JSON.parse(await readFile(code === 'en' ? 'translations.json' : `locales/${code}.json`, 'utf8'));
  let page = template.replace(/(<select id="language-switch"[^>]*>)[\s\S]*?(<\/select>)/, '$1$2');
  if (dict) page = page.replace(/>([^<>]+)</g, (match, text) => {
    const key = text.trim();
    if (!/[\u4e00-\u9fff]/.test(key)) return match;
    if (!(key in dict)) throw new Error(`${code}: Missing translation: ${key}`);
    return `>${text.replace(key, escape(dict[key]))}<`;
  });
  for (const [zh, field] of Object.entries(attributes)) page = page.replaceAll(`="${zh}"`, `="${escape(locale[field])}"`);
  page = page.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escape(locale.description)}">`)
    .replace('<html lang="zh-CN">', `<html lang="${locale.htmlLang}">`)
    .replace(/<select id="language-switch"[^>]*>[\s\S]*?<\/select>/, `<select id="language-switch" aria-label="${escape(locale.language)}">${Object.entries(config).map(([key, item]) => `<option value="${key}" lang="${item.htmlLang}"${key === code ? ' selected' : ''}>${item.name}</option>`).join('')}</select>`)
    .replace(/<link rel="alternate"[^>]+>/g, '');
  const alternates = Object.values(config).map(item => `<link rel="alternate" hreflang="${item.htmlLang}" href="${item.path}">`).join('');
  page = page.replace('<link rel="icon"', alternates + '<link rel="icon"');
  if (code !== 'zh') page = page.replace('https://github.com/619dev/minghe#快速开始', 'https://github.com/619dev/minghe/blob/main/README_EN.md').replaceAll('<strong>MingHe<span>MingHe</span></strong>', '<strong>MingHe</strong>');
  await writeFile(`${code}.html`, page);
}
await writeFile('locale-config.js', `window.MINGHE_LOCALES = ${JSON.stringify(config)};\n`);
console.log(`Generated ${Object.keys(config).length} complete language pages and shared locale configuration`);

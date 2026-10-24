import './localize.mjs';
import { mkdir, copyFile, cp } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
for (const file of ['index.html', 'style.css', 'app.js', 'preferences.js', 'locale-config.js', 'zh.html', 'en.html', 'ja.html', 'ko.html', 'es.html', 'ru.html', 'fr.html', 'de.html']) await copyFile(file, `dist/${file}`);
await cp('public', 'dist', { recursive: true });
console.log('Built static website → dist');

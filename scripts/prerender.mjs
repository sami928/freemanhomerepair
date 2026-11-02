/**
 * Build-time prerender. Run after `vite build` (client) and
 * `vite build --ssr src/entry-server.tsx --outDir dist-ssr` (renderer).
 *
 * For every real page it writes static HTML with that page's own <head>
 * (title, description, canonical, Open Graph, JSON-LD) and body markup, so
 * crawlers and link previews that don't run JavaScript see the right page.
 * It also writes 404.html, sitemap.xml, the routing block of .htaccess
 * (Apache/LiteSpeed) and _redirects (Netlify) from the same page list.
 *
 *   /                 → dist/index.html
 *   /christmas-lights → dist/_pages/christmas-lights.html
 *   unknown URL       → dist/404.html, served with a real 404 status
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');
const SITE = 'https://freeman-homeservices.com';
/** Never in the sitemap (still prerendered so a refresh works). */
const UNLISTED = new Set(['/thank-you', '/services/other']);

const { render, pagePaths, redirects } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href);
const template = await readFile(join(dist, 'index.html'), 'utf8');
if (!template.includes('<!--app-head-->') || !template.includes('<div id="root"></div>')) {
  throw new Error('index.html is missing the <!--app-head--> marker or an empty #root');
}

const fill = (path) => {
  const { html, head } = render(path);
  return template.replace('<!--app-head-->', head).replace('<div id="root"></div>', `<div id="root">${html}</div>`);
};
const fileFor = (path) => (path === '/' ? join(dist, 'index.html') : join(dist, '_pages', `${path.slice(1)}.html`));

const paths = pagePaths();
for (const path of paths) {
  const file = fileFor(path);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, fill(path));
}
await writeFile(join(dist, '404.html'), fill('/__not-found__'));

// Apache / LiteSpeed routing.
const pages = paths.filter((p) => p !== '/');
const re = (p) => p.slice(1).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const apache = [
  '# Old URLs → their current page.',
  ...redirects().map((r) => `RewriteRule ^${re(r.from)}$ ${r.to} [R=301,L]`),
  '# Pages → their prerendered file.',
  ...pages.map((p) => `RewriteRule ^${re(p)}$ _pages${p}.html [L]`),
].join('\n  ');
const htaccess = await readFile(join(dist, '.htaccess'), 'utf8');
if (!htaccess.includes('# @routes')) throw new Error('.htaccess template is missing "# @routes"');
await writeFile(join(dist, '.htaccess'), htaccess.replace('# @routes', apache));

// Netlify (unmatched paths get 404.html with a 404 automatically).
await writeFile(
  join(dist, '_redirects'),
  [...redirects().map((r) => `${r.from} ${r.to} 301`), ...pages.map((p) => `${p} /_pages${p}.html 200`)].join('\n') + '\n',
);

// Sitemap.
const today = new Date().toISOString().slice(0, 10);
const urls = paths.filter((p) => !UNLISTED.has(p)).map((p) => `  <url><loc>${SITE}${p === '/' ? '' : p}</loc><lastmod>${today}</lastmod></url>`);
await writeFile(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
);

await rm(ssrDir, { recursive: true, force: true });
console.log(`prerendered ${paths.length} pages + 404.html; wrote .htaccess, _redirects, sitemap.xml`);

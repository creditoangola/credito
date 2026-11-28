// Verifica o SEO de cada página gerada: densidade da palavra principal, título, descrição, H1-H6,
// tabelas, listas, schemas e botões para o formulário.
//
// Uso (depois de "npm run build"):  npm run seo
// Requer Node 22 (lê src/data/seo.ts diretamente).
import fs from 'node:fs';
import path from 'node:path';
import { SEO, BLOG_KEYWORDS } from '../src/data/seo.ts';

const dist = process.argv[2] || 'dist';
const ALVO_MIN = 2.0;
const ALVO_MAX = 3.3;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
  });
}

const decode = (s) =>
  s.replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

function bodyText(html) {
  const body = (html.match(/<body[\s\S]*<\/body>/i) || [html])[0];
  return decode(
    body
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();
}

const words = (t) => t.toLowerCase().match(/[\p{L}\p{N}]+/gu) || [];
const countPhrase = (joined, phrase) => {
  const p = ' ' + phrase.toLowerCase().match(/[\p{L}\p{N}]+/gu).join(' ') + ' ';
  let n = 0;
  let i = joined.indexOf(p);
  while (i !== -1) {
    n++;
    i = joined.indexOf(p, i + p.length - 1);
  }
  return n;
};

const routeOf = (file) => {
  let r = '/' + path.relative(dist, file).replace(/\\/g, '/').replace(/\.html$/, '');
  r = r.replace(/\/index$/, '') || '/';
  return r;
};

let problemas = 0;
const linhas = [];
for (const file of walk(dist).sort()) {
  const route = routeOf(file);
  if (route === '/404') continue;
  const html = fs.readFileSync(file, 'utf8');
  const text = bodyText(html);
  const ws = words(text);
  const total = ws.length;
  const cred = ws.filter((w) => /^cr[eé]ditos?$/.test(w)).length;
  const dens = total ? (cred / total) * 100 : 0;

  const seo = SEO[route];
  const isPost = route.startsWith('/blog/');
  const joined = ' ' + ws.join(' ') + ' ';
  const sec = (seo?.secondary || (isPost ? BLOG_KEYWORDS.geral.secondary : []))
    .map((p) => `${p}×${countPhrase(joined, p)}`)
    .join(', ');

  const title = (html.match(/<title>([\s\S]*?)<\/title>/i) || [, ''])[1];
  const desc = (html.match(/<meta name="description" content="([^"]*)"/i) || [, ''])[1];
  const h = (n) => (html.match(new RegExp(`<h${n}[\\s>]`, 'gi')) || []).length;
  const tabelas = (html.match(/<table[\s>]/gi) || []).length;
  const listas = (html.match(/<(ul|ol)[\s>]/gi) || []).length;
  const ctas = (html.match(/href="[^"]*#pedir"/gi) || []).length;
  const imgSemAlt = (html.match(/<img(?![^>]*\balt=)[^>]*>/gi) || []).length;
  const canonical = /<link rel="canonical"/.test(html);
  const temForm = /data-wizard/.test(html) || route === '/pedir-credito';

  const tipos = [];
  let jsonOk = true;
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const j = JSON.parse(decode(m[1]));
      (Array.isArray(j) ? j : [j]).forEach((x) => tipos.push(x['@type']));
    } catch {
      jsonOk = false;
    }
  }

  const avisos = [];
  const checkDensity = seo ? seo.density !== false : true;
  if (checkDensity && (dens < ALVO_MIN || dens > ALVO_MAX)) avisos.push(`densidade ${dens.toFixed(2)}% fora de ${ALVO_MIN}-${ALVO_MAX}%`);
  if (title.length > 110 || title.length < 25) avisos.push(`título com ${title.length} caracteres`);
  if (desc.length > 160 || desc.length < 70) avisos.push(`descrição com ${desc.length} caracteres`);
  if (h(1) !== 1) avisos.push(`${h(1)} H1`);
  if (!canonical) avisos.push('sem canonical');
  if (!jsonOk) avisos.push('JSON-LD inválido');
  if (imgSemAlt) avisos.push(`${imgSemAlt} imagens sem alt`);
  if (!temForm && route !== '/aviso-legal' && route !== '/privacidade' && route !== '/termos') avisos.push('sem formulário');

  problemas += avisos.length;
  linhas.push(
    `${avisos.length ? '⚠' : '✓'} ${route}\n` +
      `    palavras ${total} · crédito ${cred} (${dens.toFixed(2)}%) · ${sec || 'sem secundárias definidas'}\n` +
      `    title ${title.length} · description ${desc.length} · H1:${h(1)} H2:${h(2)} H3:${h(3)} H4:${h(4)} H5:${h(5)} H6:${h(6)} · tabelas ${tabelas} · listas ${listas} · botões para #pedir ${ctas}\n` +
      `    schemas: ${[...new Set(tipos)].join(', ') || 'nenhum'}` +
      (avisos.length ? `\n    AVISOS: ${avisos.join('; ')}` : ''),
  );
}
console.log(linhas.join('\n'));
console.log(`\n${problemas === 0 ? 'Tudo certo.' : problemas + ' aviso(s) para rever.'}`);
process.exit(problemas ? 1 : 0);

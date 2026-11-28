import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://credito.ao',
  // URLs sem barra final e sem duplicados: /credito-pessoal (e não /credito-pessoal/)
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
  compressHTML: true,
});

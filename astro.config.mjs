// @ts-check
import { defineConfig } from 'astro/config';
import { sitio } from './src/config/site';

export default defineConfig({
  site: sitio.dominio,
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'always',
    format: 'directory',
  },
  compressHTML: true,
  devToolbar: { enabled: false },
});

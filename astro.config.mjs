// @ts-check
import { defineConfig } from 'astro/config';
import { sitio } from './src/config/site';

export default defineConfig({
  site: sitio.dominio,
  trailingSlash: 'never',
  build: {
    inlineStylesheets: 'always',
    format: 'file',
  },
  compressHTML: true,
  devToolbar: { enabled: false },
});

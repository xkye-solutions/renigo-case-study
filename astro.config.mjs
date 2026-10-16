// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://renigo.xkye.app/',
  // Mirrors publish dist/, so keep it readable: no whitespace collapsing, no minified CSS/JS.
  compressHTML: false,
  vite: { build: { minify: false, cssMinify: false } },
});

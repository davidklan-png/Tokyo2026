import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [mdx()],
  site: 'https://teabagger.github.io/WebPage_Tokyo2026',
  base: '/WebPage_Tokyo2026',
  build: {
    format: 'directory',
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});

import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import UnoCSS from 'unocss/astro'

// https://astro.build/config
export default defineConfig({
  integrations: [
    UnoCSS(),
    tailwind()
  ],
  vite: {
    ssr: {
      external: ['svgo'],
    },
  },
});

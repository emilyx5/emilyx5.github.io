import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import icon from "astro-icon";
import { defineConfig, squooshImageService } from 'astro/config';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';


export default defineConfig({
  integrations: [tailwind(), mdx(), react(), icon({
    include: {
      mdi: ["*"]
    }
  })],
  image: {
    service: squooshImageService()
  },
  site: 'https://emilyx5.github.io',
});
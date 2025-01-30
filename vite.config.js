import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from '@remix-run/dev';
import { defineConfig } from 'vite';
import jsconfigPaths from 'vite-jsconfig-paths';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeImgSize from 'rehype-img-size';
import rehypeSlug from 'rehype-slug';
import rehypePrism from '@mapbox/rehype-prism';

const isStorybook = process.argv[1]?.includes('storybook');

export default defineConfig({
  assetsInclude: ['**/*.glb', '**/*.hdr', '**/*.glsl'],
  build: {
    chunkSizeWarningLimit: 1000, // Increase the chunk size limit to suppress warnings for larger chunks
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Dynamically split vendor dependencies into their own chunks
          if (id.includes('node_modules')) {
            return 'vendor'; // Group node_modules into 'vendor' chunk
          }
          
          // You can further split large files or libraries if needed
        },
      },
    },
  },
  server: {
    port: 7777, // Set the development server port
  },
  plugins: [
    mdx({
      rehypePlugins: [
        [rehypeImgSize, { dir: 'public' }],
        rehypeSlug,
        rehypePrism,
      ],
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      providerImportSource: '@mdx-js/react',
    }),
    // If you're using Cloudflare for local development, keep this plugin
    remixCloudflareDevProxy(),
    remix({
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route('/', 'routes/home/route.js', { index: true });
        });
      },
    }),
    jsconfigPaths(),
  ],
});

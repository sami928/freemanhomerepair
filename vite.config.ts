import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

/**
 * Inlines the (small) stylesheet into index.html in production builds, so the
 * first paint doesn't wait on a separate CSS request. Every prerendered page
 * is built from that index.html, so they all get it.
 */
function inlineCss(): PluginOption {
  return {
    name: 'inline-css',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx?.bundle) return html;
        for (const [key, asset] of Object.entries(ctx.bundle)) {
          if (!key.endsWith('.css') || asset.type !== 'asset') continue;
          const tag = new RegExp(`<link rel="stylesheet"[^>]*href="/${asset.fileName}"[^>]*>`);
          html = html.replace(tag, () => `<style>${asset.source}</style>`);
        }
        return html;
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), inlineCss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: true,
    allowedHosts: true,
  },
});


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  publicDir: 'public',
  assetsInclude: ['**/*.txt', '**/*.xml'],
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
        assetFileNames: (assetInfo) => {
          // Keep robots.txt, sitemap.xml, and news-sitemap.xml in root
          if (assetInfo.name === 'robots.txt' || 
              assetInfo.name === 'sitemap.xml' || 
              assetInfo.name === 'news-sitemap.xml') {
            return '[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    copyPublicDir: true,
  },
  // Ensure XML files are served with correct MIME type
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
}));

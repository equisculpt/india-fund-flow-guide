import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Configure dev server to serve XML files properly
    middlewareMode: false,
    fs: {
      strict: false
    }
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
          // Keep XML files in root with original names
          if (assetInfo.name?.endsWith('.xml')) {
            return '[name][extname]';
          }
          // Keep robots.txt in root
          if (assetInfo.name === 'robots.txt') {
            return '[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    copyPublicDir: true,
  },
  // Configure MIME types for XML files
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
}));

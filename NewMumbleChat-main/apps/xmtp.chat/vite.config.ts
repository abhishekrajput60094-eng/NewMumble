import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: [      { find: "@", replacement: "/src" }],
  },
  optimizeDeps: {
    include: [
      "@xmtp/browser-sdk",
      "@xmtp/content-type-markdown",
      "@xmtp/content-type-reaction",
      "@xmtp/content-type-remote-attachment",
    ],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
});

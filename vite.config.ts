import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "sentry",
    project: "internal",
    url: "http://127.0.0.1:9000/"
  })],

  build: {
    sourcemap: true
  }
})
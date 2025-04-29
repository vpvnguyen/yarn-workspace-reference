import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ mode, command }) => {
  const isDev = mode === 'development';
  return {
    plugins: [react()],
    resolve: {
      alias: isDev
        ? {
            // Alias to source during development
            '@vpvnguyen/yarn-workspace-reference-ui': path.resolve(
              __dirname,
              '../../packages/ui/src/index.ts'
            ),
          }
        : {},
    },
  }
})

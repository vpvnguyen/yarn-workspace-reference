import { defineConfig } from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig(({ mode }) => {
  console.log(`DEBUG`, { mode })
  return {
    plugins: [react(), dts({
      insertTypesEntry: true, // adds "types" to package.json exports
    })],
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.tsx'), // Your main entry file
        formats: ['es', 'cjs'], // Output formats
        fileName: (format) => `index.${format}.js`, // Output filenames
      },
      rollupOptions: {
        external: ['react'], // external dependencies (don't bundle them)
        output: {
          globals: {
            react: 'React',
          }
        }
      },
      outDir: 'dist', // Optional, default is 'dist'
      emptyOutDir: true, // Clear the output directory before building
    }
  }
});

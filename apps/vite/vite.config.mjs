import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ mode, command }) => {
  console.log(`DEBUG`, { mode, command, path: path.resolve(
    __dirname,
    "../../packages/ui/src/index.tsx",
  ) });
  const isDev = mode === "development";
  return {
    plugins: [
      react({
        // Use SWC for faster builds
        include: "**/*.tsx",
      }),
    ],
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/main.jsx"), // Your main entry file
        formats: ["es", "cjs"], // Output formats
        fileName: (format) => `index.${format}.js`, // Output filenames
      },
      rollupOptions: {
        external: ["react"], // external dependencies (don't bundle them)
        output: {
          globals: {
            react: "React",
          },
        },
      },
      outDir: "dist", // Optional, default is 'dist'
      emptyOutDir: true, // Clear the output directory before building
      sourcemap: isDev, // Enable sourcemaps in development mode
    },
    resolve: {
      alias: isDev
        ? {
            // Alias to source during development
            "@vpvnguyen/yarn-workspace-reference-ui": path.resolve(
              __dirname,
              "../../packages/ui/src/index.tsx",
            ),
          }
        : {},
    },
  };
});

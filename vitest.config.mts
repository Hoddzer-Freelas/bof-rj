import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      exclude: [
        "**/*.css",
        "**/node_modules/**",
        "**/out/**",
        "**/.next/**",
        "**/vitest.setup.ts",
        "**/next.config.ts",
        "**/postcss.config.mjs",
        "**/eslint.config.mjs",
      ],
    },
  },
});

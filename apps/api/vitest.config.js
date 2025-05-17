import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["./tests/**/*.test.ts"],
    alias: {
      "#config": path.resolve(__dirname, "./src/config"),
      "#lib": path.resolve(__dirname, "./src/lib"),
      "#middleware": path.resolve(__dirname, "./src/middleware"),
      "#utils": path.resolve(__dirname, "./src/utils"),
    },
    env: {
      DATABASE_URL:
        "postgresql://easy-fixer:my-password@localhost:5433/easy-fixer-test-db",
      NODE_ENV: "test",
    },
    silent: false,
  },
});

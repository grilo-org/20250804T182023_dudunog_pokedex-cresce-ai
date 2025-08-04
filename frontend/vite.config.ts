import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"
import * as path from "path"

const root = path.resolve(__dirname, "./src/**")

export default defineConfig(({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  const env = loadEnv(mode, process.cwd())

  const processEnvValues = {
    "process.env": Object.entries(env).reduce(
      (prev, [key, val]) => {
        return {
          ...prev,
          [key]: val,
        }
      },
      {},
    )
  }

  return {
    plugins: [react(), tsconfigPaths()],
    define: processEnvValues,
    resolve: {
      alias: {
        "@/*": path.resolve(root, "*"),
      }
    }
  }
})

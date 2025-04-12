import reactPlugin from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import tailwindcssPlugin from "@tailwindcss/vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactPlugin(), tailwindcssPlugin()]
})

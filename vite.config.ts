import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    base: "/",
    build: {
        outDir: "dist",
        assetsDir: "assets",
        rollupOptions: {
            input: {
                main: "index.html",
                projects: "projects/index.html"
            }
        }
    },
    plugins: [
        tailwindcss(),
    ],
})

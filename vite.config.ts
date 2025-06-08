import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    base: "/junyali.github.io/",
    build: {
        outDir: "dist",
        assetsDir: "assets"
    },
    plugins: [
        tailwindcss(),
    ],
})

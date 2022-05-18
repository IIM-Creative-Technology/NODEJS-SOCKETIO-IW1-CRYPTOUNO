import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [Vue(), WindiCSS()],
    server: {
        port: 4000,
    },
});

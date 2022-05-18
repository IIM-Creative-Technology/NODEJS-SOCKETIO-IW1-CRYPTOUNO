import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";
import Pages from "vite-plugin-pages";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [Vue(), WindiCSS(), Pages()],
    server: {
        port: 4000,
    },
});

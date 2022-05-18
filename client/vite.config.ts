import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import Components from "unplugin-vue-components/vite";
import PurgeIcons from "vite-plugin-purge-icons";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "~/": `${path.resolve(__dirname, "src")}/`,
        },
    },
    plugins: [
        Vue(),
        WindiCSS(),
        Pages(),
        Layouts({
            defaultLayout: "main",
        }),
        Components({
            dts: true,
            resolvers: [IconsResolver({ componentPrefix: "" })],
        }),
        PurgeIcons(),
        Icons({
            autoInstall: true,
        }),
    ],
    server: {
        port: 4000,
    },
});

import { GlobalTheme, darkTheme, GlobalThemeOverrides } from "naive-ui";
import { defineStore } from "pinia";
import { DarkThemeOverrides, LightThemeOverrides } from "~/config/themeOverrides";

export const useAppStore = defineStore("app", {
    state: () => ({
        isDark: false,
    }),
    getters: {
        theme(): GlobalTheme | null {
            return this.isDark ? darkTheme : null;
        },
        themeOverrides(): GlobalThemeOverrides {
            return this.isDark ? DarkThemeOverrides : LightThemeOverrides;
        },
    },
    actions: {
        toggleTheme() {
            this.isDark = !this.isDark;
        },
    },
});

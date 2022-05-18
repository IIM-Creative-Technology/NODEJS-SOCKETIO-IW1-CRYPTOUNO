import { defineStore } from "pinia";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useUserStore = defineStore("user", {
    state: () => ({
        accessToken: null,
        user: null,
    }),
    getters: {
        isLoggedIn(): boolean {
            return !!this.accessToken;
        },
    },
});

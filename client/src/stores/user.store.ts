import { defineStore } from "pinia";

interface IUserStore {
    accessToken: null | string;
    user: null | { _id: string; username: string };
}

export const useUserStore = defineStore("user", {
    state: () =>
        ({
            accessToken: null,
            user: null,
        } as IUserStore),
    getters: {
        isLoggedIn(): boolean {
            return !!this.accessToken;
        },
    },
});

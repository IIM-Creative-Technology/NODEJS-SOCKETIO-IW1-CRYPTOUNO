import { defineStore } from "pinia";
import router from "~/router";

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
    actions: {
        logIn(walletToken: string) {
            this.accessToken = "API_JWT_TOKEN";
            this.user = { _id: "API_USER_ID", username: "API_USER_NAME" };
        },
        logOut() {
            this.accessToken = null;
            this.user = null;
            router.push("/auth/login");
        },
    },
});

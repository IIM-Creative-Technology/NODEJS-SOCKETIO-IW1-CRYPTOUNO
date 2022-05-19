import { defineStore } from "pinia";
import router from "~/router";
import { AuthController } from "~/api/controllers/auth.controller";
import { useWallet } from "solana-wallets-vue";

interface IUserStore {
    user: null | { _id: string; username: string; walletToken: string };
}

export const useUserStore = defineStore("user", {
    state: () =>
        ({
            accessToken: null,
            user: null,
        } as IUserStore),
    getters: {
        isLoggedIn(): boolean {
            return !!this.user;
        },
    },
    actions: {
        async logIn(walletToken: string) {
            const player = await AuthController.authenticate(walletToken);
            this.user = player as IUserStore["user"];
            setTimeout(() => router.push("/"), 100);
        },
        async logOut() {
            const { disconnect } = useWallet();
            await disconnect();
            this.user = null;
            router.push("/auth/login");
        },
    },
});

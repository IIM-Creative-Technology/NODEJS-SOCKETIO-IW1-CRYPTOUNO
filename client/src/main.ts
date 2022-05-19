import { createApp } from "vue";
import App from "./App.vue";
import naive from "naive-ui";
import "virtual:windi.css";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import router from "./router";

import SolanaWallets from "solana-wallets-vue";
import "solana-wallets-vue/styles.css";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";

const walletOptions = {
    wallets: [new PhantomWalletAdapter({ network: WalletAdapterNetwork.Devnet })],
    autoConnect: true,
};

async function bootstrap() {
    const app = createApp(App);
    const store = createPinia();

    //STORE PLUGINS
    store.use(piniaPersist);

    // APP PLUGINS
    app.use(naive);
    app.use(router);
    app.use(store);
    app.use(SolanaWallets, walletOptions);

    await router.isReady();
    app.mount("#app");
}

bootstrap();

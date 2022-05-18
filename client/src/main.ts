import { createApp } from "vue";
import App from "./App.vue";
import naive from "naive-ui";
import "virtual:windi.css";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import router from "./router";

async function bootstrap() {
    const app = createApp(App);
    const store = createPinia();

    //STORE PLUGINS
    store.use(piniaPersist);

    // APP PLUGINS
    app.use(naive);
    app.use(router);
    app.use(store);

    await router.isReady();
    app.mount("#app");
}

bootstrap();

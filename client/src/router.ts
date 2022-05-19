import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";
import { createRouter, createWebHistory } from "vue-router";
import { useReactifiedApi } from "~/composables/useReactifiedApi";
import { useUserStore } from "~/stores/user.store";

const routes = setupLayouts(generatedRoutes);
const router = createRouter({
    routes,
    history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
    const { loadingBarApi } = useReactifiedApi();
    const userStore = useUserStore();

    if (!from || to.path !== from.path) loadingBarApi?.start();

    if (to?.meta?.auth && !userStore.isLoggedIn) return next("/auth/login");
    return next();
});
router.afterEach(() => {
    const { loadingBarApi } = useReactifiedApi();
    loadingBarApi?.finish?.();
});

export default router;

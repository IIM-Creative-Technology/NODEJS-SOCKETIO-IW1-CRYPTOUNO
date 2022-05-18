import routes from "virtual:generated-pages";
import { createRouter, createWebHistory } from "vue-router";
import { useReactifiedApi } from "~/composables/useReactifiedApi";

const router = createRouter({
    routes,
    history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
    const { loadingBarApi } = useReactifiedApi();
    if (!from || to.path !== from.path) loadingBarApi?.start();

    return next();
});
router.afterEach(() => {
    const { loadingBarApi } = useReactifiedApi();
    loadingBarApi?.finish?.();
});

export default router;

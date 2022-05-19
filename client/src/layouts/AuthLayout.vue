<template>
    <div
        class="w-full h-screen overflow-hidden grid place-items-center relative"
        :style="{
            backgroundColor: themeVars.bodyColor,
            color: themeVars.textColorBase,
        }"
    >
        <img :src="LogoGame" class="absolute top-6 left-6 h-12" />
        <ToggleTheme disable-tooltip button-class="absolute top-6 right-6" />
        <div class="p-4 gap-6 w-full h-full flex flex-col justify-center items-center">
            <n-gradient-text type="primary">
                <div class="flex flex-col gap-4">
                    <div class="text-lg uppercase">Bienvenue sur <i>Fight for the clim</i></div>
                </div>
            </n-gradient-text>
            <NCard :segmented="{ content: true }" class="w-full md:max-w-1/2 overflow-hidden transition-all ease-in-out duration-75">
                <div class="flex flex-col gap-4">
                    <NTabs type="line" animated :value="$route.name" justify-content="space-evenly">
                        <NTab name="auth.login" @click="$route.name !== 'auth.login' && $router.push({ name: 'auth.login' })">
                            <div class="flex items-center text-lg gap-2 uppercase">
                                <span>Sign in</span>
                            </div>
                        </NTab>
                        <NTab name="auth.register" @click="$route.name !== 'auth.register' && $router.push({ name: 'auth.register' })">
                            <div class="flex items-center text-lg gap-2 uppercase">
                                <span>Sign up</span>
                            </div>
                        </NTab>
                    </NTabs>
                    <router-view v-slot="{ Component }">
                        <transition
                            :name="((route?.meta?.transitionName ?? 'slide-fade') as string)"
                            :mode="((route?.meta?.transitionMode ?? 'out-in') as 'default' | 'out-in' | 'in-out')"
                        >
                            <component :is="Component" />
                        </transition>
                    </router-view>
                </div>
            </NCard>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useThemeVars } from "naive-ui";
    import { useRoute } from "vue-router";
    import LogoGame from "~/assets/images/illustration_auth.png";
    import ToggleTheme from "~/components/layout/ToggleTheme.vue";
    import { useReactifiedApi } from "~/composables/useReactifiedApi";

    const themeVars = useThemeVars();
    const route = useRoute();
    useReactifiedApi();
</script>

<style>
    .slide-fade-enter-active,
    .slide-fade-leave-active {
        transition: opacity 0.35s, transform 0.4s;
    }
    .slide-fade-enter-from {
        opacity: 0;
        transform: translateX(-30%);
    }

    .slide-fade-leave-to {
        opacity: 0;
        transform: translateX(30%);
    }
</style>

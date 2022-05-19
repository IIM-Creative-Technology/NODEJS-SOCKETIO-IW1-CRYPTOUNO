<template>
    <n-layout class="h-[100vh]" :native-scrollbar="false">
        <n-layout-header style="background: transparent !important" :inverted="false" position="left">
            <Header />
        </n-layout-header>
        <n-layout-content content-style="padding: 24px; margin-bottom: auto;min-height: 80vh;">
            <router-view v-slot="{ Component, route }">
                <div class="flex flex-col gap-4 min-h-[76vh]">
                    <transition :name="route?.meta?.transitionName ?? 'slide-fade'" :mode="route?.meta?.transitionMode ?? 'out-in'">
                        <component :is="Component" :key="route.name" />
                    </transition>
                </div>
            </router-view>
        </n-layout-content>
    </n-layout>
</template>

<script setup lang="ts">
    import Header from "~/components/layout/Header.vue";
</script>

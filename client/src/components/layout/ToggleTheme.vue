<template>
    <n-tooltip placement="bottom" :disabled="disableTooltip">
        <template #trigger>
            <div
                class="h-8 w-8 grid place-items-center rounded-lg cursor-pointer overflow-hidden bg-gray-200/25 hover:bg-gray-300/25 dark:(bg-gray-700/25 hover:bg-gray-600/25)"
                :class="buttonClass"
                @click="appStore.toggleTheme()"
            >
                <mdi-white-balance-sunny
                    class="transition-all ease-in-out duration-150 transform"
                    :class="appStore.isDark ? 'translate-y-[50%]' : 'translate-y-[-100px]'"
                />
                <ic-baseline-dark-mode
                    class="transition-all ease-in-out duration-150 transform"
                    :class="!appStore.isDark ? 'translate-y-[-50%]' : 'translate-y-[100px]'"
                />
            </div>
        </template>
        <span>{{ appStore.isDark ? "Light" : "Dark" }}</span>
    </n-tooltip>
</template>

<script setup lang="ts">
    import { useAppStore } from "~/stores/app.store";

    const appStore = useAppStore();

    // eslint-disable-next-line no-undef
    const props = defineProps({
        buttonClass: {
            type: String,
            required: false,
            default: "",
        },
        disableTooltip: {
            type: Boolean,
            default: false,
        },
    });
</script>

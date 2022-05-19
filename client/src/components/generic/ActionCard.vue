<template>
    <div ref="cardWrapper" class="cursor-pointer">
        <NCard content-style="aspect-ratio:1/1;width:100%;height:auto;" :embedded="isHovered">
            <div class="w-full h-full grid place-items-center">
                <div class="flex flex-col gap-2 text-center items-center">
                    <NIcon v-if="$slots.icon" :size="50">
                        <slot name="icon" />
                    </NIcon>
                    <slot />
                </div>
            </div>
        </NCard>
    </div>
</template>

<script setup lang="ts">
    import { useElementHover } from "@vueuse/core";
    import { Ref, ref } from "vue";

    const cardWrapper = ref<EventTarget>();
    const isHovered = useElementHover(cardWrapper as Ref<EventTarget>);
</script>

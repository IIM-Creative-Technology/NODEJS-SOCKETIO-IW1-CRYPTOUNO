<template>
    <div class="flex h-screen w-screen p-4 md:p-8 lg:p-16">
        <NCard>
            <div class="flex flex-col gap-4 items-center">
                <h1>{{ playerName }} READY!</h1>
                <h3>Waiting for an other player...</h3>
                <NSpin />
            </div>
        </NCard>
    </div>
</template>

<script setup lang="ts">
    // eslint-disable-next-line no-undef
    const props = defineProps({
        playerName: {
            type: Array,
            required: true,
        },
    });
</script>

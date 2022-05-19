<template>
    <div class="flex flex-col gap-4">
        <GameManager />
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import GameManager from "~/components/features/game/GameManager.vue";
</script>

<route lang="yaml">
name: home
meta:
    auth: true
    layout: MainLayout
</route>

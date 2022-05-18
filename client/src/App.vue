<template>
    <AppProvider>
        <GameBoard />
    </AppProvider>
</template>

<script setup lang="ts">
    import AppProvider from "./AppProvider.vue";
    import GameBoard from "./components/GameBoard.vue";
    import GameSessionManager from "./components/GameSessionManager.vue";
</script>

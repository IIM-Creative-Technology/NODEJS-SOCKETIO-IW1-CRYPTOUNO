<template>
    <div></div>
</template>

<script setup lang="ts">
    import WaitingRoom from "./WaitingRoom.vue";
    import { useWebSocket } from "@vueuse/core";
    import { watch } from "vue";

    const { status, data, send, close } = useWebSocket("wss://demo.piesocket.com/v3/channel_1?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self", {
        immediate: false,
    });

    watch(
        () => status.value,
        () => send("ZQZJQDZQJZQJKDQZ"),
    );
</script>

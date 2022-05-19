<template>
    <div class="flex flex-col gap-4">
        <NCard :segmented="{ content: true }">
            <div class="flex items-center gap-2 uppercase text-2xl !font-medium">
                <NIcon><mdi:users /></NIcon>
                <span>Players lobby</span>
            </div>
        </NCard>
        <PlayerList :players="players" />
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import PlayerList from "~/components/features/player/PlayerList.vue";

    const players = ref<any[]>(
        Array.from({ length: 20 }).map((_, i) => ({
            _id: `${i}`,
            username: `Player ${i}`,
            gameId: i % 2 === 0 ? undefined : `${i}`,
        })),
    );

    const shuffle = () => {
        players.value.sort(() => Math.random() - 0.5);
    };
</script>

<route lang="yaml">
name: home
meta:
    auth: false
    layout: MainLayout
</route>

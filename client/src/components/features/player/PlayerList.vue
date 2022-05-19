<template>
    <TransitionGroup v-if="players?.length" tag="div" name="list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <ActionCard v-for="player in players" :key="player._id">
            <template #icon>
                <mdi:user />
            </template>
            <b>{{ player.username }}</b>
            <NTag :type="player.gameId ? 'warning' : 'success'">{{ player.gameId ? "Dans une partie" : "Dans le lobby" }}</NTag>

            <NDivider class="!m-0 !my-2 w-full" />
            <NButton secondary type="primary" :disabled="!!player.gameId">
                <template #icon>
                    <NIcon><mdi:sword /></NIcon>
                </template>
                Défier
            </NButton>
        </ActionCard>
    </TransitionGroup>
    <div v-else class="w-full h-16 grid place-items-center">
        <NEmpty> No players connected </NEmpty>
    </div>
</template>

<script setup lang="ts">
    import ActionCard from "~/components/generic/ActionCard.vue";

    interface PlayerData {
        _id: string;
        username: string;
        gameId?: string;
    }

    // eslint-disable-next-line no-undef
    const props = defineProps<{ players: PlayerData[] }>();
</script>

<style>
    .list-move,
    .list-enter-active,
    .list-leave-active {
        transition: all 0.5s ease;
    }

    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }

    .list-leave-active {
        position: absolute;
    }
</style>

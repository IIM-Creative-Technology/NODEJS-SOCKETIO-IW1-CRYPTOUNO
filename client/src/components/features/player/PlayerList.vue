<template>
    <div class="flex flex-col gap-8 p-12">
        <NCard>
            <template #header>
                <div class="text-2xl flex items-center gap-2">
                    <mdi:users />
                    <span class="uppercase">Players lobby</span>
                </div>
            </template>
            <template #header-extra> {{ players.filter((player) => player._id != userStore.user?._id)?.length }} online </template>
        </NCard>
        <TransitionGroup v-if="players.filter((player) => player._id != userStore.user?._id)?.length" tag="div" name="list" class="flex flex-col gap-4">
            <ActionCard v-for="player in players.filter((player) => player._id != userStore.user?._id)" :key="player._id">
                <template #icon>
                    <mdi:user />
                </template>
                <NEllipsis>
                    <b>{{ player.username }}</b>
                </NEllipsis>
                <NTag :type="player.gameId ? 'warning' : 'success'">{{ player.gameId ? "Dans une partie" : "Dans le lobby" }}</NTag>

                <NDivider class="!m-0 !my-2 w-full" />
                <NButton secondary type="primary" :disabled="!!player.gameId || invitationDisabled" @click="$emit('SendInvitation', player._id)">
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
    </div>
</template>

<script setup lang="ts">
    import ActionCard from "~/components/generic/ActionCard.vue";
    import { useUserStore } from "~/stores/user.store";
    import { ILobbyPlayer } from "~/types/player.type";

    // eslint-disable-next-line no-undef
    const emit = defineEmits(["SendInvitation"]);
    // eslint-disable-next-line no-undef
    const props = defineProps<{ players: ILobbyPlayer[]; invitationDisabled: boolean }>();
    const userStore = useUserStore();
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

<template>
    <div>
        <PlayerList v-if="!gameState" :players="lobby" :invitation-disabled="invitationPending" @SendInvitation="SendGameInvitation($event)" />
        <GameBoard v-else :game-state="gameState" @PutTokenToBoard="PutTokenToBoard($event)" @ReturnToLobby="ReturnToLobby" />
    </div>
</template>

<script setup lang="ts">
    import { useGameManager } from "~/composables/useGameManager";
    import PlayerList from "~/components/features/player/PlayerList.vue";
    import GameBoard from "~/components/features/game/GameBoard.vue";

    const { lobby, gameState, invitationPending, SendGameInvitation, PutTokenToBoard, ReturnToLobby } = useGameManager();
</script>

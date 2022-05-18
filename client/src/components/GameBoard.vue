<template>
    <div v-if="!gameState">
        <div class="flex flex-col gap-4">You are player {{ playerIdentity }}</div>
    </div>
    <div v-else class="flex h-screen w-screen overflow-hidden flex-col md:flex-row">
        <svg v-if="winCoordinatesPx" class="absolute w-screen h-screen z-50">
            <line
                :x1="Math.round(winCoordinatesPx?.start?.x)"
                :y1="Math.round(winCoordinatesPx?.start?.y)"
                :x2="Math.round(winCoordinatesPx?.end?.x)"
                :y2="Math.round(winCoordinatesPx?.end?.y)"
                style="stroke: black; stroke-width: 5; stroke-linecap: round"
            />
        </svg>
        <div class="h-screen w-full bg-gray-400 w-[calc(100% - 2em)] flex flex-col justify-start items-center gap-2 p-4 overflow-y-auto z-50">
            <h3 class="title">PUISSSANCE 4</h3>
            <hr style="width: 80%" />
            <h3 v-if="!gameState.winCoordinates?.length">TOUR DU JOUEUR {{ gameState.activePlayer }}</h3>
            <h3 v-else :class="gameState.winner === playerIdentity ? 'text-green-500' : 'text-red-500'">
                {{ gameState.winner === playerIdentity ? "VOUS AVEZ GAGNE" : "VOUS AVEZ PERDU" }}
            </h3>
            <hr style="width: 80%" />
            <div class="scores">
                <h4>SCORES :</h4>
                <ul style="margin-top: 10px">
                    <li>JOUEUR 1 : {{ gameState.scores.player1 }}</li>
                    <li style="margin-top: 3px">JOUEUR 2 : {{ gameState.scores.player2 }}</li>
                    <!-- <li style="margin-top: 3px;">MATCH NUL : {{scores.joueur1}}</li> -->
                </ul>
            </div>
            <div class="partieDroite">
                <div class="boutonRestart" @click="ResetBoard">RESTART</div>
            </div>
        </div>
        <div ref="plateau" class="grid grid-cols-7 h-screen auto-rows-[1fr] bg-blue-400 w-auto h-auto" style="aspect-ratio: 1 / 1">
            <div
                v-for="(casePlateau, index) in gameState.gameBoard"
                :key="index"
                ref="cellRefs"
                class="aspect-square grid place-items-center cursor-pointer bg-white m-2 relative rounded-full"
                style="aspect-ratio: 1 / 1"
                @click="PutTokenToBoard(index)"
            >
                {{ index }}
                <div
                    v-if="casePlateau != 0"
                    class="jetonAnim absolute w-full h-full border-solid border-black border-4 rounded-full animate-token"
                    :class="{ 'bg-yellow-400': casePlateau === 1, 'bg-red-400': casePlateau === 2, 'cursor-not-allowed': casePlateau !== 0 }"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useGameBoard } from "../composables/useGameBoard";
    const { gameState, playerIdentity, winCoordinatesPx, cellRefs, PutTokenToBoard } = useGameBoard();
</script>

<style lang="scss">
    // Animation des jetons
    @keyframes slidein {
        from {
            top: -1000%;
        }

        to {
            top: 0;
        }
    }

    .animate-token {
        animation-duration: 0.25s;
        animation-name: slidein;
    }
</style>

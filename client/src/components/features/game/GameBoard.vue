<template>
    <div class="w-screen overflow-hidden flex" style="height: calc(100vh - 66px) !important">
        <svg v-if="winCoordinatesPx" class="absolute w-screen h-screen z-50">
            <line
                :x1="Math.round(winCoordinatesPx?.start?.x)"
                :y1="Math.round(winCoordinatesPx?.start?.y)"
                :x2="Math.round(winCoordinatesPx?.end?.x)"
                :y2="Math.round(winCoordinatesPx?.end?.y)"
                style="stroke: black; stroke-width: 5; stroke-linecap: round"
            />
        </svg>
        <div class="h-screen w-[200px] text-wrap bg-gray-400 flex flex-col justify-start items-center gap-2 p-4 overflow-y-auto z-50">
            <h3 class="title">PUISSSANCE 4</h3>
            <hr style="width: 80%" />
            <h3 v-if="!gameState.winCoordinates?.length">
                <span v-if="gameState.activePlayer === userStore.user?._id">IT'S YOUR TURN</span>
                <span v-else>IT'S YOUR ADVERSARY'S TURN</span>
            </h3>
            <h3 v-else :class="gameState.winner === userStore.user?._id ? 'text-green-500' : 'text-red-500'">
                {{ gameState.winner === userStore.user?._id ? "VOUS AVEZ GAGNE" : "VOUS AVEZ PERDU" }}
            </h3>
            <hr style="width: 80%" />
            <div class="partieDroite">
                <NButton v-if="!gameState.canPlay" class="boutonRestart" @click="$emit('ReturnToLobby')">RETURN TO LOBBY</NButton>
            </div>
        </div>
        <div ref="plateau" class="grid grid-cols-7 h-screen auto-rows-[1fr] bg-blue-400 w-full h-full">
            <div
                v-for="(casePlateau, index) in gameState.gameBoard"
                :key="index"
                ref="cellRefs"
                class="grid place-items-center cursor-pointer bg-white m-2 relative rounded-full"
                @click="$emit('PutTokenToBoard', index)"
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
    import { computed, ref } from "vue";
    import { useUserStore } from "~/stores/user.store";
    import { IGameState } from "~/types/game.type";

    interface Props {
        gameState: IGameState;
    }

    // eslint-disable-next-line no-undef
    const emit = defineEmits(["PutTokenToBoard", "ReturnToLobby"]);
    // eslint-disable-next-line no-undef
    const props = defineProps<Props>();
    const userStore = useUserStore();

    const ComputeCellPosition = (cellRef: HTMLElement | HTMLElement[]) => {
        const rect = ((cellRef as HTMLElement[])?.[0] ?? cellRef)?.getBoundingClientRect?.() ?? {};
        return { y: rect.top + rect.height / 2, x: rect.left + rect.width / 2 };
    };

    const cellRefs = ref<HTMLElement[]>([]);
    const winCoordinatesPx = computed(() =>
        props.gameState?.winCoordinates?.length
            ? {
                  start: ComputeCellPosition(cellRefs.value?.[props.gameState?.winCoordinates[0]] as HTMLElement | HTMLElement[]),
                  end: ComputeCellPosition(cellRefs.value?.[props.gameState?.winCoordinates[1]] as HTMLElement | HTMLElement[]),
              }
            : null,
    );
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

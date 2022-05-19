import { useUserStore } from "~/stores/user.store";
import { useWebSocket } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { io } from "socket.io-client";
import { useMessage } from "naive-ui";

const SOCKET_URL = "ws://localhost:3000" as const;

enum GameEvents {
    GameFull = "GameFull",
    SetPlayerIdentity = "SetPlayerIdentity",
    GameStart = "GameStart",
    PutToken = "PutToken",
    UpdateGameState = "UpdateGameState",
}

interface GameState {
    gameStatus: "playing" | "win" | "even";
    gameBoard: number[];
    gameTurnCount: number;
    activePlayer: 1 | 2;
    winCoordinates: number[];
    canPlay: boolean;
    scores: { player1: number; player2: number };
    winner: 1 | 2 | null;
    player1: string;
    player2: string;
}

const ComputeCellPosition = (cellRef: HTMLElement | HTMLElement[]) => {
    const rect = ((cellRef as HTMLElement[])?.[0] ?? cellRef)?.getBoundingClientRect?.() ?? {};
    return { y: rect.top + rect.height / 2, x: rect.left + rect.width / 2 };
};

export function useGameBoard() {
    const messageApi = useMessage();
    const userStore = useUserStore();
    const socket = io(`${SOCKET_URL}`);

    const gameState = ref<GameState | null>(null);
    const playerIdentity = ref<number>();
    const cellRefs = ref<HTMLElement[]>();
    const winCoordinatesPx = computed(() =>
        gameState.value?.winCoordinates?.length
            ? {
                  start: ComputeCellPosition(cellRefs.value?.[gameState.value?.winCoordinates[0]] as HTMLElement | HTMLElement[]),
                  end: ComputeCellPosition(cellRefs.value?.[gameState.value?.winCoordinates[1]] as HTMLElement | HTMLElement[]),
              }
            : null,
    );

    socket.on(GameEvents.GameFull, () => messageApi.error("Sorry, the game is full"));
    socket.on(GameEvents.SetPlayerIdentity, (identity: number) => (playerIdentity.value = identity));
    socket.on(GameEvents.GameStart, (data: GameState) => (gameState.value = data));
    socket.on(GameEvents.UpdateGameState, (data: GameState) => (gameState.value = data));

    const PutTokenToBoard = (cellIndex: number) => {
        if (playerIdentity.value !== gameState.value?.activePlayer) return messageApi.warning("It's not your turn");
        socket.emit(GameEvents.PutToken, cellIndex);
    };

    return { gameState, playerIdentity, cellRefs, winCoordinatesPx, PutTokenToBoard };
}

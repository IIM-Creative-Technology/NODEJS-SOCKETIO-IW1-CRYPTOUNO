import { useUserStore } from "~/stores/user.store";
import { computed, ref, watch } from "vue";
import { io } from "socket.io-client";
import { useMessage } from "naive-ui";
import { IGameState, GameListenEvents, GameEmitEvents, IGameInvitation } from "~/types/game.type";
import { ILobbyPlayer } from "~/types/player.type";
import { useConfirmDialog } from "./usePromiseDialog";
import { useLoadingNotification } from "./useLoadingNotification";
import { useWallet } from "solana-wallets-vue";
import { Connection, clusterApiUrl, Transaction, PublicKey } from "@solana/web3.js";
import { createTransferCheckedInstruction, getAssociatedTokenAddress, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

export function useGameManager() {
    const messageApi = useMessage();
    const userStore = useUserStore();
    const socket = io(`${import.meta.env?.VITE_SOCKET_URL}?playerId=${userStore.user?._id}`);
    const { publicKey, sendTransaction } = useWallet();

    const invitationPending = ref<boolean>(false);
    const loadingNotification = ref<{ setSuccess: (message: string) => void; setError: (message: string) => void; close: () => void } | null>(null);
    const lobby = ref<ILobbyPlayer[]>([]);
    const gameState = ref<IGameState | null>(null);

    // EMITTED EVENTS
    const SendGameInvitation = (playerId: ILobbyPlayer) => {
        invitationPending.value = true;
        socket.emit(GameEmitEvents.SendGameInvitation, { playerId: playerId });
        loadingNotification.value = useLoadingNotification("Invitation sent, waiting for player answer...");
    };

    const AnswerGameInvitation = (invitation: IGameInvitation, answer: boolean) => {
        return socket.emit(GameEmitEvents.AnswerGameInvitation, { invitationId: invitation._id, acceptDuel: answer });
    };

    const PutTokenToBoard = (cellIndex: number) => {
        socket.emit(GameEmitEvents.PutTokenToBoard, { cellId: cellIndex });
    };

    const ReturnToLobby = () => {
        socket.emit(GameEmitEvents.ReturnToMatchMaking);
        gameState.value = null;
    };

    socket.on(GameListenEvents.LoadLobby, (players: ILobbyPlayer[]) => {
        lobby.value = players;
        messageApi.info("You joinned the lobby!");
    });

    socket.on(GameListenEvents.PlayerOnline, (player: ILobbyPlayer) => {
        if (lobby.value.find((p) => p._id === player._id)) lobby.value[lobby.value.findIndex((p) => p._id === player._id)] = player;
        else lobby.value.push(player);
        messageApi.info(`${player.username} joined the lobby`);
    });

    socket.on(GameListenEvents.PlayerOffline, (player: ILobbyPlayer) => {
        lobby.value = lobby.value.filter((p) => p._id !== player._id);
        messageApi.info(`${player.username} left the lobby`);
    });

    socket.on(GameListenEvents.PlayerJoinedGame, (player: ILobbyPlayer) => {
        lobby.value[lobby.value.findIndex((p) => p._id === player._id)] = player;
        messageApi.info(`${player.username} joined a game`);
    });

    socket.on(GameListenEvents.GameInvitation, async (invitation: IGameInvitation) => {
        const acceptInvitation = await useConfirmDialog({
            type: "info",
            title: "Game invitation",
            content: `${invitation.requester.username} invited you to a game`,
        });
        return AnswerGameInvitation(invitation, acceptInvitation);
    });

    socket.on(GameListenEvents.GameInvitationFailed, (message: string) => {
        invitationPending.value = false;
        loadingNotification.value?.setError(message ?? "Unexpected server error");
        loadingNotification.value = null;
    });

    socket.on(GameListenEvents.AnswerGameInvitationDeclined, () => {
        invitationPending.value = false;
        loadingNotification.value?.setError("Invitation declined!");
        loadingNotification.value = null;
    });

    socket.on(GameListenEvents.GameStarted, async (newGameState: IGameState) => {
        const { success } = await TakeBetFromPlayer(publicKey.value as PublicKey);
        invitationPending.value = false;
        if (!success) loadingNotification.value?.setError("Not enough coins to start game");
        else loadingNotification.value?.setSuccess("Invitation accepted, game start!");
        loadingNotification.value = null;
        if (success) gameState.value = newGameState;
    });

    socket.on(GameListenEvents.UpdateGameState, (newGameState: IGameState) => (gameState.value = newGameState));

    socket.on(GameListenEvents.PutTokenToBoardFailed, (message: string) => messageApi.error(message));

    socket.on(GameListenEvents.GameEnded, (newGameState: IGameState) => {
        gameState.value = newGameState;
        if (!newGameState.winner) messageApi.info("Game ended, it's a draw!");
        messageApi.info(`Game ended, you ${newGameState.winner === userStore.user?._id ? "win" : "loose"}!`);
    });

    async function TakeBetFromPlayer(walletToken: PublicKey) {
        try {
            // return { success: true };
            const connection = new Connection(clusterApiUrl("devnet"));
            const toPublicKey = new PublicKey("2h8S82oV7xpvUpQ9MXbFpKtuFz1xRxvBTQeYZffhgxyE");
            const mint = new PublicKey("4YgT6u6dCmdwYhvWK5bUCvU57uFJjxjLpffE9UVy48xK");
            const fromTokenAccount = await getAssociatedTokenAddress(mint, walletToken);
            const toTokenAccount = await getOrCreateAssociatedTokenAccount(connection, fromTokenAccount, mint, toPublicKey);
            const tx = new Transaction().add(
                createTransferCheckedInstruction(
                    fromTokenAccount, // from (should be a token account)
                    mint, // mint
                    toTokenAccount.address, // to (should be a token account)
                    walletToken, // from's owner
                    1e9, // amount, if your deciamls is 8, send 10^8 for 1 token
                    9, // decimals
                ),
            );
            const signature = await sendTransaction(tx, connection);
            await connection.confirmTransaction(signature);
            return { success: true };
        } catch (e) {
            messageApi.error("No enought tokens in your wallet");
            return { success: false };
        }
    }

    return { lobby, gameState, invitationPending, SendGameInvitation, PutTokenToBoard, ReturnToLobby };
}

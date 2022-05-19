import { IPlayer } from "./player.type";
import { ILobbyPlayer } from "~/types/player.type";

export enum GameRecordResult {
    Draw = "Draw",
    Win = "Win",
}

export interface IGameState {
    _id: string;
    gameBoard: number[];
    gameTurnCount: number;
    activePlayer: string;
    winCoordinates: number[] | null;
    canPlay: boolean;
    winner: string | null;
}

export interface IGameRecord {
    _id?: string;
    players: IPlayer[];
    result: GameRecordResult;
    winner?: IPlayer;
    bet?: number;
}

export interface IGameInvitation {
    _id: string;
    requester: ILobbyPlayer;
    requestee: ILobbyPlayer;
}

export enum GameListenEvents {
    PlayerOnline = "player-online",
    PlayerOffline = "player-offline",
    PlayerJoinedGame = "player-joined-game",
    LoadLobby = "load-lobby",
    GameInvitation = "game-invitation",
    GameInvitationFailed = "game-invitation-failed",
    AnswerGameInvitationDeclined = "answer-game-invitation-declined",
    AnswerGameInvitationFailed = "answer-game-invitation-failed",
    GameStarted = "game-started",
    PutTokenToBoardFailed = "put-token-to-board-failed",
    UpdateGameState = "update-game-state",
    GameEnded = "game-ended",
}

export enum GameEmitEvents {
    SendGameInvitation = "send-game-invitation",
    AnswerGameInvitation = "answer-game-invitation",
    PutTokenToBoard = "put-token-to-board",
    ReturnToMatchMaking = "return-to-match-making",
}

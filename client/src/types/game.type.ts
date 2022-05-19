import { IPlayer } from "./player.type";

export enum GameRecordResult {
    Draw = "Draw",
    Win = "Win",
}

export interface IGameRecord {
    _id?: string;
    players: IPlayer[];
    result: GameRecordResult;
    winner?: IPlayer;
    bet?: number;
}

export enum GameListenEvents {
    PlayerOnline = "player-online",
    PlayerOffline = "player-offline",
    PlayerJoinedGame = "player-joined-game",
    GameInvitation = "game-invitation",
    GameInvitationFailed = "game-invitation-failed",
    AnswetGameInvitationDeclined = "answer-game-invitation-declined",
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

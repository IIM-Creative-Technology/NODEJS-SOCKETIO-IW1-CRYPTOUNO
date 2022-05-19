import { IGameRecord } from "./game.type";

export interface IPlayer {
    _id?: string;
    username: string;
    walletToken?: string;
    gameRecords: IGameRecord[];
}

export interface ILobbyPlayer {
    _id: string;
    username: string;
    gameId?: string | null;
    playerNumber?: 1 | 2;
}

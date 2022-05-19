import { IGameRecord } from "./game.type";

export interface IPlayer {
    _id?: string;
    pseudo: string;
    walletToken?: string;
    gameRecords: IGameRecord[];
}

import { IPlayer } from "./player.type";

export interface IGameRecord {
    _id?: string;
    players: IPlayer[];
    winner: IPlayer;
    bet?: number;
}

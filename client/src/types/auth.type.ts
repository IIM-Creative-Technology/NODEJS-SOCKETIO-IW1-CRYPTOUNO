import { IPlayer } from "./player.type";

export interface IAuthPlayer {
    accessToken: string;
    user: IPlayer;
}

export interface IRegisterPlayer {
    pseudo: string;
    walletToken: string;
    avatar?: string;
}

import { ILobbyPlayer } from "~/types/player.type";
import { ApiInstance } from "../instance";

export const PlayerController = {
    getPlayersInLobby: (): Promise<ILobbyPlayer[]> => ApiInstance.get("/players/in-lobby").then((res) => res.data),
};

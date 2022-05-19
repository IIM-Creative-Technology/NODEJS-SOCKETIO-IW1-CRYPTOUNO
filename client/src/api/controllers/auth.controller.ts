import { IAuthPlayer, IRegisterPlayer } from "~/types/auth.type";
import { ApiInstance } from "~/api/instance";
import { IPlayer } from "~/types/player.type";

export const AuthController = {
    login: (walletToken: string): Promise<IAuthPlayer> => ApiInstance.post("/auth/login", { walletToken }).then((response) => response.data),
    register: (player: IRegisterPlayer): Promise<IPlayer> => ApiInstance.post("/auth/register", player).then((response) => response.data),
};

import { IAuthPlayer, IRegisterPlayer } from "~/types/auth.type";
import { ApiInstance } from "~/api/instance";
import { IPlayer } from "~/types/player.type";

export const AuthController = {
    authenticate: (walletToken: string): Promise<IPlayer> => ApiInstance.post("/auth/authenticate", { walletToken }).then((res) => res.data),
};

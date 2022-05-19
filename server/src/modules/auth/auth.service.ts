import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Player, PlayerDocument } from '@schemas/player.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Player.name) private playerModel: Model<PlayerDocument> 
    ) {}

    async authenticate(walletToken: string): Promise<PlayerDocument> {
        const player = await this.playerModel.findOne({ walletToken });
        if(player) return player
        return this.createPlayer(walletToken);
    }

    createPlayer(walletToken: string): Promise<PlayerDocument> {
        return this.playerModel.create({ _id: new mongoose.Types.ObjectId, username: walletToken, walletToken })
    }
}

import { PlayerStatus } from '@common/types/player.type';
import { PlayerDocument, Player } from '@schemas/player.schema';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel(Player.name) private playerModel: Model<PlayerDocument>,
  ) {}

  findOne(id: string): Promise<PlayerDocument> {
    return this.playerModel.findOne({ _id: id }).exec();
  }

  setPlayerStatus(id: string, status: PlayerStatus): Promise<PlayerDocument> {
    return this.playerModel
      .findOneAndUpdate({ _id: id }, { status }, { new: true })
      .exec();
  }

  getOnlinePlayers(): Promise<PlayerDocument[]> {
    return this.playerModel.find({ status: PlayerStatus.ONLINE }).exec();
  }
}

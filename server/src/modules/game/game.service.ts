import { GameDocument } from '@schemas/game.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game } from '@schemas/game.schema';
import { Model } from 'mongoose';
import { GameRecordResult } from '@common/types/game.type';
import { Player, PlayerDocument } from '@schemas/player.schema';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Game.name) private gameModel: Model<GameDocument>,
    @InjectModel(Player.name) private playerModel: Model<PlayerDocument>,
  ) {}

  async saveGameRecord(
    players: string[],
    result: GameRecordResult,
    winner?: string | null,
  ): Promise<GameDocument> {
    const game = await this.gameModel.create({
      players,
      result,
      ...(winner && { winner }),
    });

    await Promise.all(
      players.map(async (playerId) => {
        const player = await this.playerModel.findById(playerId);
        if (!player) return;

        if (!Array.isArray(player.playedGames)) player.playedGames = [];
        player.playedGames.push(game._id);
        player.markModified('playedGames');
        return await player.save();
      }),
    );
    return game;
  }
}

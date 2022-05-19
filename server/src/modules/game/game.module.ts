import { PlayerModule } from '@modules/player/player.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from '@schemas/game.schema';
import { Player, PlayerSchema } from '@schemas/player.schema';
import { GameController } from './game.controller';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { HeddibuApiModule } from '@modules/heddibu-api/heddibu-api.module';

@Module({
  imports: [
  MongooseModule.forFeature(
      [
        { name: Player.name, schema: PlayerSchema },
        { name: Game.name, schema: GameSchema },
      ],
      'mongo',
    ),
    PlayerModule,
    HeddibuApiModule
  ],
  controllers: [GameController],
  providers: [GameService, GameGateway],
})
export class GameModule {}

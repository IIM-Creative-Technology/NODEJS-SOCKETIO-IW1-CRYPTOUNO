import { Player, PlayerSchema } from '@schemas/player.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Player.name, schema: PlayerSchema }],
      'mongo',
    ),
  ],
  controllers: [PlayerController],
  providers: [PlayerService],
  exports: [PlayerService],
})
export class PlayerModule {}

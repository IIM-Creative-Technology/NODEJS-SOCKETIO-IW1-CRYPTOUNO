import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';
import { PlayerStatus } from '@common/types/player.type';
import { Player } from './player.schema';
import { GameRecordResult } from '@common/types/game.type';

export type GameDocument = Game & Document;

@Schema({ timestamps: true })
export class Game {
  @Prop({ type: mongoose.Types.ObjectId })
  @Transform(({ value }) => value.toString())
  _id: mongoose.Types.ObjectId;

  @Prop([{ type: mongoose.Types.ObjectId, ref: 'Player' }])
  players: Player[];

  @Prop({ enum: GameRecordResult })
  result: GameRecordResult;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Player' })
  winner?: Player;

  @Prop()
  bet?: number;
}

export const GameSchema = SchemaFactory.createForClass(Game);

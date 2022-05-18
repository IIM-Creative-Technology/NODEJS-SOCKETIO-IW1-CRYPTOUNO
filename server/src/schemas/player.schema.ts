import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';
import { PlayerStatus } from '@common/types/player.type';
import { Game } from './game.schema';

export type PlayerDocument = Player & Document;

@Schema({ timestamps: true })
export class Player {
  @Prop({ type: mongoose.Types.ObjectId })
  @Transform(({ value }) => value.toString())
  _id: mongoose.Types.ObjectId;

  @Prop({ enum: PlayerStatus, default: PlayerStatus.OFFLINE })
  status: PlayerStatus;

  @Prop()
  username: string;

  @Prop()
  avatar?: string;

  @Prop()
  walletToken: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }])
  playedGames: Game[];
}

export const PlayerSchema = SchemaFactory.createForClass(Player);

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Player, PlayerSchema } from '@schemas/player.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Player.name, schema: PlayerSchema },
      ],
      'mongo',
    ),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

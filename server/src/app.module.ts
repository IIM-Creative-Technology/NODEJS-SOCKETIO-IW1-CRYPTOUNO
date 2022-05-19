import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './modules/player/player.module';
import { GameModule } from './modules/game/game.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from '@config/app.config';
import { MongooseModule } from '@nestjs/mongoose';
import { HeddibuApiModule } from './modules/heddibu-api/heddibu-api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    MongooseModule.forRoot(appConfig().database.url, {
      connectionName: 'mongo',
    }),
    PlayerModule,
    GameModule,
    AuthModule,
    HeddibuApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

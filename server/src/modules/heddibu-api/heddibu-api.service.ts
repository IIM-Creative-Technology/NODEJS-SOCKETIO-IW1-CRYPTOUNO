import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PlayerDocument } from '@schemas/player.schema';

@Injectable()
export class HeddibuApiService {
    constructor(
        private httpService: HttpService,
        private configService: ConfigService
    ) {}

    async GiveTokensToWinner(player: PlayerDocument): Promise<void> {
        try {
            await this.httpService.post(`${this.configService.get<string>('app.heddibuApiUrl')}/winner`, {
                address: player.walletToken
            })
        } catch(err) {
            Logger.error(err, 'HeddibuApiService');
        }
    }
}

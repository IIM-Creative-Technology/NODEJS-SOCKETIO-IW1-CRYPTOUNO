import { Module } from '@nestjs/common';
import { HeddibuApiService } from './heddibu-api.service';

@Module({
  providers: [HeddibuApiService]
})
export class HeddibuApiModule {}

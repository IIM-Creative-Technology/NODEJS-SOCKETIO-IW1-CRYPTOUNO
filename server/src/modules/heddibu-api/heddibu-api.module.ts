import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HeddibuApiService } from './heddibu-api.service';

@Module({
  imports: [HttpModule],
  providers: [HeddibuApiService],
  exports: [HeddibuApiService],
})
export class HeddibuApiModule {}

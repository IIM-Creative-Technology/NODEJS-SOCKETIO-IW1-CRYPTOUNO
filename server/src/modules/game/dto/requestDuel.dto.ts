import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class RequestDuelDto {
  @IsString()
  @IsNotEmpty()
  playerId: string;
}

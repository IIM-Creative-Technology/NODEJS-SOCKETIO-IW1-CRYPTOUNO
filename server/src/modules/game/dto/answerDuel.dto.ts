import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class AnswerDuelDto {
  @IsBoolean()
  acceptDuel: boolean;

  @IsString()
  @IsNotEmpty()
  invitationId: string;
}

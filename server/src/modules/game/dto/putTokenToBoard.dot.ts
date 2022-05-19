import { IsNumber } from 'class-validator';

export class PutTokenToBoardDto {
  @IsNumber()
  cellId: number;
}

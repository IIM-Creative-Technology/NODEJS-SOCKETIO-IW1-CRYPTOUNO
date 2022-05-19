import { GameSession } from '@modules/game/lib/game.lib';
import { Socket } from 'socket.io';

export interface PlayerSocket extends Socket {
  data: {
    _id: string;
    username: string;
    gameId?: string;
    playerNumber?: 1 | 2;
  };
}

export interface GameInvitation {
  _id: string;
  requester: PlayerSocket['data'];
  responder: PlayerSocket['data'];
}

export enum PutTokenOutputEvent {
  CellNotAvailable = 'CellNotAvailable',
  Win = 'Win',
  Draw = 'Draw',
  Continue = 'Continue',
}

export enum GameRecordResult {
  Win = 'Win',
  Draw = 'Draw',
}

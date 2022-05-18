import { PlayerSocket } from '@common/types/game.type';
import { randomUUID } from 'crypto';
import { Socket } from 'socket.io';
import {
  ComputeColumns,
  ComputeLines,
  ComputeDiagonals,
  GetColumn,
  GetFirstAvailableCellCol,
  CheckWinOnAxis,
  GetLine,
  GetDiagonal,
} from './gameUtils.lib';

const BOARD_SIZE = 7;

export class GameSession {
  _id: string;
  private gameStatus: 'playing' | 'win' | 'draw' = 'playing';
  private gameBoard: number[];
  private gameTurnCount: number;
  private activePlayer: 1 | 2 = 1;
  private canPlay = true;

  private player1: PlayerSocket;
  private player2: PlayerSocket;

  private winCoordinates: number[] = [];
  private scores: { player1: number; player2: number } = {
    player1: 0,
    player2: 0,
  };

  constructor(player1: PlayerSocket, player2: PlayerSocket) {
    this._id = randomUUID();
    this.gameBoard = Array.from({ length: BOARD_SIZE * BOARD_SIZE }, () => 0);
    this.gameTurnCount = 0;
    this.player1 = player1;
    this.player2 = player2;
  }

  getGameState() {
    return {
      _id: this._id,
      gameBoard: this.gameBoard,
      gameTurnCount: this.gameTurnCount,
      activePlayer: this.activePlayer,
      winCoordinates: this.winCoordinates,
      canPlay: this.canPlay,
      scores: this.scores,
      winner: this.winCoordinates.length > 0 ? this.activePlayer : null,
    };
  }

  PutTokenToBoard(targetCell: number) {
    const column = GetColumn(this.getColumns(), targetCell);
    const availableCell = GetFirstAvailableCellCol(column, this.gameBoard);

    if (!availableCell) return { event: 'CellNotAvailable' };

    this.gameBoard[availableCell] = this.activePlayer;
    this.gameTurnCount++;

    const { win, even, coordinates } = this.CheckForWin(availableCell);

    if (win) {
      this.canPlay = false;
      this.scores[`player${this.activePlayer}`]++;
      this.winCoordinates = coordinates as number[];
      return { event: 'Win' };
    }

    if (even) {
      this.canPlay = false;
      return { event: 'Even' };
    }

    this.UpdateActivePlayer();
    return { event: 'Success' };
  }

  private UpdateActivePlayer() {
    this.activePlayer = this.activePlayer === 1 ? 2 : 1;
  }

  private getLines() {
    return ComputeLines(this.gameBoard, BOARD_SIZE);
  }

  private getColumns() {
    return ComputeColumns(this.gameBoard, BOARD_SIZE);
  }

  private getPrimaryDiagonals() {
    return ComputeDiagonals(this.getLines(), 'primary');
  }

  private getSecondaryDiagonals() {
    return ComputeDiagonals(this.getLines(), 'secondary');
  }

  private CheckForWin(targetCell: number) {
    const column = GetColumn(this.getColumns(), targetCell);
    const line = GetLine(this.getLines(), targetCell);
    const diagPrim = GetDiagonal(this.getPrimaryDiagonals(), targetCell);
    const diagSec = GetDiagonal(this.getSecondaryDiagonals(), targetCell);

    const [winCol, winColCoordinates] = CheckWinOnAxis(
      column,
      targetCell,
      this.activePlayer,
      this.gameBoard,
    );

    const [winLine, winLineCoordinates] = CheckWinOnAxis(
      line,
      targetCell,
      this.activePlayer,
      this.gameBoard,
    );
    const [winDiagPrim, winDiagPrimCoordinates] = CheckWinOnAxis(
      diagPrim,
      targetCell,
      this.activePlayer,
      this.gameBoard,
    );
    const [winDiagSec, winDiagSecCoordinates] = CheckWinOnAxis(
      diagSec,
      targetCell,
      this.activePlayer,
      this.gameBoard,
    );

    return {
      win: winCol || winLine || winDiagPrim || winDiagSec,
      even: this.gameBoard.every((value) => value === 0),
      coordinates: winCol
        ? winColCoordinates
        : winLine
        ? winLineCoordinates
        : winDiagPrim
        ? winDiagPrimCoordinates
        : winDiagSec
        ? winDiagSecCoordinates
        : [],
    };
  }
}

import { GameService } from '@modules/game/game.service';
import { PlayerService } from '@modules/player/player.service';
import { Logger, UnauthorizedException, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { randomUUID } from 'crypto';
import { GameSession } from './lib/game.lib';
import { PlayerStatus } from '@common/types/player.type';
import { RequestDuelDto } from './dto/requestDuel.dto';
import { AnswerDuelDto } from './dto/answerDuel.dto';
import { GameInvitation, PlayerSocket } from '@common/types/game.type';

@WebSocketGateway()
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  public static players: PlayerSocket[] = [];
  public static games: GameSession[] = [];
  public static invitations: GameInvitation[] = [];

  constructor(
    private readonly gameService: GameService,
    private readonly playerService: PlayerService,
  ) {}

  @SubscribeMessage('send-game-invitation')
  requestDuel(
    @ConnectedSocket() client: PlayerSocket,
    @MessageBody() data: RequestDuelDto,
  ) {
    const requesterPlayerSocket = GameGateway.players.find(
      (player) => player.id === client.id,
    );
    const targetPlayerSocket = GameGateway.players.find(
      (player) => player.data._id === data.playerId,
    );

    if (!targetPlayerSocket) {
      Logger.debug(
        `Game invitation failed - Player ${data.playerId} not online or not found`,
        'GameGateway',
      );
      return client.emit(
        'game-invitation-failed',
        'Player not found or not online',
      );
    }

    if (targetPlayerSocket.data.game) {
      Logger.debug(
        `Game invitation failed - Player ${data.playerId} already in game`,
        'GameGateway',
      );
      return client.emit('game-invitation', 'Player is already in a game');
    }

    const gameInvitation = {
      _id: randomUUID(),
      requester: client.data,
      responder: targetPlayerSocket.data,
    } as GameInvitation;

    client.emit('game-invitation', {
      invitation: gameInvitation,
      requester: requesterPlayerSocket.data,
    });
  }

  @SubscribeMessage('answer-game-invitation')
  async answerDuelRequest(
    @ConnectedSocket() client: PlayerSocket,
    @MessageBody() data: AnswerDuelDto,
  ) {
    const invitation = this.findInvitationById(data.invitationId);
    const requester = this.findUserById(invitation?.requester?._id);
    const requestee = this.findUserById(invitation?.responder?._id);

    if (!invitation) {
      Logger.debug(
        `Answer duel request failed (Invitation ${data.invitationId} | player ${client.data._id}) - Invitation not found`,
        'GameGateway',
      );
      return client.emit(
        'answer-game-invitation-failed',
        'Invitation not found',
      );
    }

    if (!data.acceptDuel) {
      return requester.emit('answer-game-invitation-declined', invitation);
    }

    const gameSession = new GameSession(requestee, requester);
    this.addPlayerToGame(requestee, gameSession, 1);
    this.addPlayerToGame(requester, gameSession, 2);
    GameGateway.games.push(gameSession);
    this.server
      .to(gameSession._id)
      .emit('game-started', gameSession.getGameState());
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    const { _id } = client.handshake.query;

    const player = await this.playerService.findOne(_id as string);
    player.status = PlayerStatus.ONLINE;
    await player.save();

    client.data = { _id: player._id, username: player.username };
    GameGateway.players.push(client as PlayerSocket);

    Logger.debug(`Player ${player.username} is ONLINE`);
    this.server.emit('player-online', client.data);
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    const findPlayerQuery = (player: PlayerSocket) => player.id === client.id;
    const playerSocket = GameGateway.players.find(findPlayerQuery);

    await this.playerService.setPlayerStatus(
      playerSocket.data._id,
      PlayerStatus.OFFLINE,
    );
    GameGateway.players.splice(
      GameGateway.players.findIndex(findPlayerQuery),
      1,
    );

    Logger.debug(
      `Player ${playerSocket.data.username} is OFFLINE`,
      'GameGateway',
    );
    this.server.emit('player-offline', playerSocket.data);
  }

  private findUserById(id: string) {
    return GameGateway.players.find((player) => player.data._id === id);
  }

  private findUserBySocket(socket: Socket) {
    return GameGateway.players.find((player) => player.id === socket.id);
  }

  private findGameById(id: string) {
    return GameGateway.games.find((game) => game._id === id);
  }

  private findInvitationById(id: string) {
    return GameGateway.invitations.find((invitation) => invitation._id === id);
  }

  private addPlayerToGame(
    player: PlayerSocket,
    game: GameSession,
    playerNumber,
  ) {
    player.data.gameId = game._id;
    player.data.playerNumber = playerNumber;
    GameGateway.players[
      GameGateway.players.findIndex((socket) => socket.id === player.id)
    ] = player;
    player.join(game._id);
  }
}

import {
    AUTHENTICATION_OP_TYPE,
    CREATEPLAYER_OP_TYPE,
    CREATEGAME_OP_TYPE
} from './config';
import { createPlayer, authenticatePlayer } from '../Player';
import { createGame, joinGame } from '../Game';
export { createGame as createGameController };
export { joinGame as joinGameController };
export { createPlayer as createPlayerController };
export { authenticatePlayer as authenticatePlayerController };

export interface IRequest {
    operationType: string;
}
// These two interfaces are for basic req and resp types.
//Concrete types will be created by their controller by extending these base types.
export interface IResponse {
    error?: {
        type: string;
        message: string;
    }
}

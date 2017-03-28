import {
    AUTHENTICATION_OP_TYPE,
    CREATEPLAYER_OP_TYPE,
    CREATEGAME_OP_TYPE
} from './config';
import { createPlayer, authenticatePlayer } from '../Player';
import { createGame } from '../Game';
export { createGame as createGameController };
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
export default (request: any, res: any) => {
    switch (request.body.operationType) {
        case AUTHENTICATION_OP_TYPE:
            authenticatePlayer(request.body, res);
            break;
        case CREATEPLAYER_OP_TYPE:
            createPlayer(request.body, res);
            break;
    }
}
interface IError {

}
interface IData {

}
interface IResponse2 {
    status: boolean;
    data?: IData;
    error?: IError;
}
export class BaseController {
    response: IResponse2;
    constructor() {
        this.response = {
            status: false,
        };
    }
    processRequest() {

    }
    handleError() {

    }
}

import { IRequest, IResponse } from '../controller/index';
import { IGame } from '../db/DataStructure';
import CreateGameService from './service/CreateGameService';
import JoinGameService from './service/JoinGameService';
import { TechnicalException } from '../Exception';
import { GameNotValidException } from './Exception';
export interface ICreateGameRequest extends IRequest {
    isTwoPlayerGame: true;
    isOpenToPublic: true;
}
export interface ICreateGameResponse extends IResponse {
    status: boolean;
    game: IGame;
}
export interface IJoinGameRequest extends IRequest {
    gameId: string;
    playerSeat: number;
}

export const createGame = (createGameRequest: ICreateGameRequest, res: any) => {
    let response: ICreateGameResponse = {
        error: null,
        status: false,
        game: null
    };
    CreateGameService(createGameRequest, res.locals.user).then((data: any) => {
        response.status = true;
        response.game = data;
        res.status(200).json(JSON.stringify(response));
    }).catch((ex: any) => {
        console.error('ex occured in createGame controller', ex);
        const exec = new TechnicalException();
        exec.message = ex.message;
        response.error = exec;
        res.status(500).json(JSON.stringify(response));
    })

}

export const joinGame = (joinGameRequest: IJoinGameRequest, res: any) => {
    let response: ICreateGameResponse = {
        error: null,
        status: false,
        game: null
    };
    JoinGameService(joinGameRequest, res.locals.user).then((data: any) => {
        response.status = true;
        response.game = data.value;
        res.status(200).json(JSON.stringify(response));
    }).catch((ex: any) => {
        if (ex instanceof GameNotValidException) {
            response.error = ex;
        } else {
            console.error('ex occured in JoinGame controller', ex);
            const exec = new TechnicalException();
            exec.message = ex.message;
            response.error = exec;
        }
        res.status(500).json(JSON.stringify(response));
    })

}

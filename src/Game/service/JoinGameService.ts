import { insertGame, getGame, updateGame } from '../db';
import { IJoinGameRequest } from '../index';
import { IGame, IPlayer } from '../../db/DataStructure';
import { validateToken } from '../../Player/service/AuthenticatePlayer';
import { GameNotValidException } from '../Exception';
export default (game: IJoinGameRequest, player: IPlayer): any => {
    const validationPromise = validateJoinGameRequest(game);
    const isGameOpenPromise = getGame({ id: game.gameId });
    return new Promise((resolve, reject) => {
        Promise.all([validationPromise, isGameOpenPromise]).then((data: any) => {
            if (data && data[1] && !data[1].isGameFinalized && !data[1].isGameStarted) {
                const updateDBGame = createUpdateDBGame(game, player);
                updateGame({ id: game.gameId }, updateDBGame).then((updatedGame) => {
                    resolve(updatedGame);
                }).catch((reason) => {
                    reject(reason);
                });
            } else {
                throw new GameNotValidException();
            }
        }).catch((reason: any) => {
            reject(reason);
        });
    });
};

const validateJoinGameRequest = (game: IJoinGameRequest) => {
    // TODO More validations for email regex check and user id check
    return new Promise((resolve: any, reject: any) => {
        // if (player.password !== player.rePassword) {
        //     reject(new PasswordNotMatchedException());
        // }
        resolve();
    });

}

const createUpdateDBGame = (game: IJoinGameRequest, player: IPlayer): any => {
    const playerSeat = 'player' + game.playerSeat;
    const playerJoined = playerSeat + ".player";
    const playerProfile = playerJoined + '.profile',
        playerPoints = playerJoined + '.points',
        playerPause = playerJoined + '.pausePending',
        playerTimer = playerJoined + '.timerWaringUsed',
        dbGame: any = {};
    dbGame[playerSeat + ".hasJoined"] = true;
    dbGame[playerProfile] = player.profile;
    dbGame[playerPoints] = 0;
    dbGame[playerPause] = 3;
    dbGame[playerTimer] = 0;
    console.log('dbGame', dbGame);
    return dbGame;
}

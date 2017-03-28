import { insertGame, getGame } from '../db';
import { IJoinGameRequest } from '../index';
import { IGame, IPlayer } from '../../db/DataStructure';
import { validateToken } from '../../Player/service/AuthenticatePlayer';
export default (game: IJoinGameRequest): any => {
    const validationPromise = validateJoinGameRequest(game);
    const isGameOpenPromise = getGame({ id: game.gameId });
    return new Promise((resolve, reject) => {
        Promise.all([validationPromise, isGameOpenPromise]).then((data) => {
            const createdGame = createDBGame(game, data[1] as IPlayer);
            insertGame(createdGame).then((insertedGame) => {
                resolve(createdGame);
            }).catch((reason) => {
                reject(reason);
            });

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
// Player list will be optional, If Game creater wants to add his friends at the time of creation. they will get an invitation.
// Otherwise person can
const createDBGame = (game: IJoinGameRequest, player: IPlayer): any => {
    const playerSeat = 'player' + game.playerSeat;
    const playerProfile = playerSeat + 'profile',
        playerPoints = playerSeat + 'points',
        playerPause = playerSeat + 'pausePending',
        playerTimer = playerSeat + 'timerWaringUsed',
        dbGame: any = {
            id: game.gameId,
            playerProfile: player.profile,
            playerPoints: 0,
            playerPause: 3,
            playerTimer: false
        };
    return dbGame;
}

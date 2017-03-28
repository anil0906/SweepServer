import { insertGame } from '../db';
import { ICreateGameRequest } from '../index';
import { IGame, IPlayer } from '../../db/DataStructure';
export default (game: ICreateGameRequest, player: IPlayer): any => {
    return new Promise((resolve, reject) => {
        validateCreateGameRequest(game).then(() => {
            const createdGame = createDBGame(game, player);
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

const validateCreateGameRequest = (game: ICreateGameRequest) => {
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
const createDBGame = (game: ICreateGameRequest, player: IPlayer, playerList?: any[]): IGame => {
    let dbGame: IGame = {
        id: new Date().getTime().toString(),
        player1: {
            hasJoined: true,
            player: {
                profile: player.profile,
                points: 0,
                pausePending: 3, // max number of pause allowed in game
                timerWaringUsed: false,
            }
        },
        isTwoPlayerGame: game.isTwoPlayerGame || false,
        isOpenToPublic: game.isOpenToPublic || true,
        isGameStarted: false,
        team1Points: 0,
        team2Points: 0
    }
    return dbGame;
}

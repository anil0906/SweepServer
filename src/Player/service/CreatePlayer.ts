import { IPlayer } from '../../db/DataStructure';
import { insertPlayer, getPlayer, persistToken } from '../db';
import { ICreatePlayerRequest } from '../index';
import { generateToken } from './index';
import {
    EmailAlreadyRegisteredException,
    UserIdExistException,
    PasswordNotMatchedException,
} from '../Exception';

export const createPlayerService = (player: ICreatePlayerRequest): any => {
    const validationPromise = validateCreatePlayerRequest(player);
    const emailCheckPromise = new Promise((resolve: any, reject: any) => {
        checkIfEmailExist(player.email).then((data: any) => {
            if (data) {
                reject(new EmailAlreadyRegisteredException(player.email));
            } else {
                resolve();
            }
        }).catch((reason: any) => {
            reject(reason);

        });
    })
    const userIdCheckPromise = new Promise((resolve: any, reject: any) => {
        checkIfUserIdExist(player.userName).then((data: any) => {
            if (data) {
                reject(new UserIdExistException(player.userName));
            } else {
                resolve();
            }
        }).catch((reason: any) => {
            reject(reason);
        });
    });;
    return new Promise((resolve, reject) => {
        Promise.all([validationPromise, emailCheckPromise, userIdCheckPromise]).then(() => {
            Promise.all([insertPlayer(createDBPlayer(player)), generateToken(player.userName)]).then((data: any) => {
                resolve(data);
            }).catch((reason: any) => {
                reject(reason);
            });
        }).catch((reason: any) => {
            reject(reason);
        });
    });
}

const validateCreatePlayerRequest = (player: ICreatePlayerRequest) => {
    // TODO More validations for email regex check and user id check
    return new Promise((resolve: any, reject: any) => {
        if (player.password !== player.rePassword) {
            reject(new PasswordNotMatchedException());
        }
        resolve();
    });

}

const createDBPlayer = (player: ICreatePlayerRequest): IPlayer => {
    let dbPlayer: IPlayer = {
        profile: {
            userId: player.userName,
            email: player.email,
            displayName: player.userName,
            displayPicUrl: 'default_user.png',
            xpPoints: 0,
            gamesPlayed: 0,
            gamesLost: 0,
            gamesWon: 0
        },
        credentials: {
            userId: player.userName,
            password: player.password
        }
    }
    return dbPlayer;
}

const checkIfEmailExist = (email: string): any => {
    return getPlayer({
        "profile.email": email
    });
}
const checkIfUserIdExist = (userId: string): any => {
    return getPlayer({
        "profile.userId": userId
    });
}

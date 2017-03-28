import { IPlayer } from '../../db/DataStructure';
import { getPlayer, persistToken } from '../db';
import { IAuthenticationRequest } from '../index';
import {
    CredentialDidNotMatchException,
} from '../Exception';
import { SessionException } from '../../Exception';
import { generateToken } from './index';
interface IAuthReq {
    "credentials.password"?: string;
    "credentials.token"?: string;
    "profile.userId"?: string;
    "profile.email"?: string;
}
export const AuthenticatePlayerService = (authRequest: IAuthenticationRequest): any => {
    return new Promise((resolve, reject) => {
        validateAuthenticationRequest(authRequest).then((data: IAuthReq) => {
            console.log('data before getPlayer', data);
            getPlayer(data).then((player: IPlayer) => {
                console.log('player logged', player);
                if (player) {
                    generateToken(player.profile.userId).then((data) => {
                        resolve(data);
                    }).catch((reason) => {
                        reject(reason);
                    });
                } else {
                    console.log('no player logged');
                    reject(new CredentialDidNotMatchException());
                }

            }).catch((reason: any) => {
                console.error(reason);
                reject(reason);
            })
        }).catch((reason: any) => {
            console.error(reason);
            reject(reason);
        });
    })
}
const validateAuthenticationRequest = (authRequest: IAuthenticationRequest): any => {
    return new Promise((resolve, reject) => {
        try {
            let validatedObject = {
                "credentials.password": authRequest.password,
            } as IAuthReq;
            if (isValidEmail(authRequest.userName)) {
                validatedObject["profile.email"] = authRequest.userName;
            } else {
                validatedObject["profile.userId"] = authRequest.userName;
            }
            resolve(validatedObject);
        } catch (ex) {
            console.error(ex);
            reject(ex);
        }
    })
}

//TODO We will implement this later in common validator and will be used in Create Player and Auth Request
const isValidEmail = (userName: string) => {
    return false;
}

export const validateToken = (userId: string, token: string): any => {
    return new Promise((resolve, reject) => {
        let validatedObject = {
            "credentials.token": token,
            "credentials.userId": userId,
        } as IAuthReq;
        getPlayer(validatedObject).then((player: IPlayer) => {
            if (player && isTokenValid(player.credentials.token)) {
                resolve(player);
            } else {
                reject(new SessionException());
            }
        }).catch((reason) => {
            reject(reason);
        });
    });
}

const isTokenValid = (timestamputc: any) => {
    // Session of 30 mins.
    return (new Date().getTime() - timestamputc) < 1000 * 60 * 30;
}

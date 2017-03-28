import { IPlayer } from '../../db/DataStructure';
import { getInstance } from '../../db/DBConnection';
import { PLAYER_COLLECTION } from '../../db/config';
/*
* @param player
* returns true if success
*/
export const insertPlayer = (player: IPlayer) => {

    return new Promise((resolve, reject) => {
        const db = getInstance();
        if (db) {
            try {
                db.collection(PLAYER_COLLECTION, (err: any, collection: any) => {
                    if (err) {
                        reject();
                    } else {
                        collection.insertOne(player, (error: any, obj: any) => {
                            if (!error) {
                                resolve();
                            } else {
                                console.log('err in insertOne', error);
                                reject();
                            }

                        });
                    }
                })
            } catch (e) {
                reject();
                console.error('Exception while inserting player instance:', player, e);
            }
        } else {
            reject();
            console.error('Error in DB connection while inserting player instance:', player);
        }
    });

}

//Either email or userid is necessary to get player data.
// token or password will be used to query for authentiction and verfication
interface IQueryPlayer {
    "profile.email"?: string;
    "profile.userId"?: string;
    "credentials.password"?: string;
    "credentials.token"?: string;
}
export const getPlayer = (queryPlayer: IQueryPlayer) => {

    return new Promise((resolve: any, reject: any) => {
        const db = getInstance();
        if (db) {
            try {
                db.collection(PLAYER_COLLECTION, (err: any, collection: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        collection.findOne(queryPlayer, (err: any, obj: any) => {
                            if (!err) {
                                resolve(obj);
                            } else {
                                console.log('err in findOne Player:', err);
                                reject(err);
                            }
                        })
                    }
                });
            } catch (e) {
                reject(e)
                console.error('Exception while finding player instance:', queryPlayer, e);
            }
        } else {
            reject();
            console.error('Error in DB connection while finding player instance:', queryPlayer);
        }
    });
}

export const persistToken = (queryPlayer: { "credentials.userId": string; }, updateObject: { "credentials.token": string; "credentials.timestamputc": string; }) => {
    return new Promise((resolve, reject) => {
        const db = getInstance();
        if (db) {
            try {
                db.collection(PLAYER_COLLECTION, (err: any, collection: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        collection.findAndModify(queryPlayer, [['__id', 'asc']], { $set: updateObject }, { update: true, new: true }, (err: any, obj: any) => {
                            if (!err) {
                                resolve(obj);
                            } else {
                                console.log('err in persistToken Player:', err);
                                reject(err);
                            }
                        })
                    }
                });
            } catch (e) {
                reject(e)
                console.error('Exception while finding player instance:', queryPlayer, e);
            }
        } else {
            reject();
            console.error('Error in DB connection while finding player instance:', queryPlayer);
        }
    });
}

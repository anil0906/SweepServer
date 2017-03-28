import { IGame } from '../../db/DataStructure';
import { getInstance } from '../../db/DBConnection';
import { GAME_COLLECTION } from '../../db/config';

/*
* @param player
* returns true if success
*/
export const insertGame = (game: IGame) => {

    return new Promise((resolve, reject) => {
        const db = getInstance();
        if (db) {
            try {
                db.collection(GAME_COLLECTION, (err: any, collection: any) => {
                    if (err) {
                        reject();
                    } else {
                        collection.insertOne(game, (error: any, obj: any) => {
                            if (!error) {
                                resolve(obj);
                            } else {
                                console.log('err in insertOne game', error);
                                reject();
                            }

                        });
                    }
                })
            } catch (e) {
                reject();
                console.error('Exception while inserting game instance:', game, e);
            }
        } else {
            reject();
            console.error('Error in DB connection while inserting game instance:', game);
        }
    });

}

export const getGame = (queryGame: { id: string }) => {
    return new Promise((resolve: any, reject: any) => {
        const db = getInstance();
        if (db) {
            try {
                db.collection(GAME_COLLECTION, (err: any, collection: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        collection.findOne(queryGame, (err: any, obj: any) => {
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
                console.error('Exception while finding game instance:', queryGame, e);
            }
        } else {
            reject();
            console.error('Error in DB connection while finding game instance:', queryGame);
        }
    });
}

export const updateGame = (queryGame: { id: string; }, updateObject: any) => {
    return new Promise((resolve, reject) => {
        const db = getInstance();
        if (db) {
            try {
                db.collection(GAME_COLLECTION, (err: any, collection: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        collection.findAndModify(queryGame, [['__id', 'asc']], { $set: updateObject }, { update: true, new: true }, (err: any, obj: any) => {
                            if (!err) {
                                resolve(obj);
                            } else {
                                console.log('err in updateGame:', err);
                                reject(err);
                            }
                        })
                    }
                });
            } catch (e) {
                reject(e)
                console.error('Exception while  finding and updaing game instance:', queryGame, e);
            }
        } else {
            reject();
            console.error('Error in DB connection while findAndModify game instance:', queryGame);
        }
    });
}

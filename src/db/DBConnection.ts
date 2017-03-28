import { MongoClient } from 'mongodb';
import { DB_URL } from './config';
let dbInstance: any = null;
export const connect = () => {
    MongoClient.connect(DB_URL, (err: any, db: any) => {
        if (err) {
            console.error('Error in making Database Connection:', err);
        } else {
            console.log('DB connection succesfully Opened');
            dbInstance = db;
        }
    });
}
export const getInstance = () => {
    if (dbInstance) {
        return dbInstance;
    } else {
        return null;
    }
}

import { persistToken } from '../db';

export const generateToken = (userId: string) => {
    // Original logic to genrate token will come here.
    return persistToken({
        "credentials.userId": userId
    },
        {
            "credentials.token": new Date().getTime().toString(),
            "credentials.timestamputc": new Date().getTime().toString()
        })
};

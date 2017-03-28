import { validateToken } from '../Player/service/AuthenticatePlayer';
import { IResponse } from './';
import { TechnicalException, SessionException } from '../Exception';
import { IPlayer } from '../db/DataStructure';
export default (req: any, res: any, next: any) => {

    const response: IResponse = {
    };
    if (!req.cookies.authUser || !req.cookies.authToken) {
        const exec = new SessionException();
        exec.message = 'No valid session found.'
        response.error = exec;
        res.status(500).json(JSON.stringify(response));
    }
    validateToken(req.cookies.authUser, req.cookies.authToken).then((player: IPlayer) => {
        res.locals.user = player;
        res.locals.authenticated = true;
        next();
    }).catch((reason: any) => {
        console.error('ex occur while authenticating token', reason);
        const respose: IResponse = {};
        if (reason instanceof SessionException) {
            response.error = reason;
        } else {
            const exec = new TechnicalException();
            exec.message = reason.message;
            response.error = exec;
        }
        res.status(500).json(JSON.stringify(response));
    });
}

import { IRequest, IResponse } from '../controller/index';
import { createPlayerService } from './service/CreatePlayer';
import { AuthenticatePlayerService } from './service/AuthenticatePlayer';
import * as playerExcpetions from './Exception';
import { TechnicalException } from '../Exception';
export interface ICreatePlayerRequest extends IRequest {
    userName: string;
    password: string;
    rePassword: string;
    email: string;
}
export interface IAuthenticationRequest extends IRequest {
    userName: string;
    password: string;
}
export interface ICreatePlayerResponse extends IResponse {
    status: boolean;
}
export interface IAuthenticationPlayerResponse extends IResponse {
    status: boolean;
}
export const createPlayer = (request: ICreatePlayerRequest, res: any) => {
    let response: ICreatePlayerResponse = { error: null, status: false };
    createPlayerService(request).then((data: any) => {
        response.status = true;
        res.cookie('authToken', data[1].value.credentials.token);
        res.cookie('authUser', data[1].value.credentials.userId);
        res.status(200).json(JSON.stringify(response));
    }).catch((ex: any) => {
        if (ex instanceof playerExcpetions.UserIdExistException || ex instanceof playerExcpetions.EmailAlreadyRegisteredException || ex instanceof playerExcpetions.PasswordNotMatchedException) {
            response.error = ex;
        } else {
            console.error('ex occured in createPlayer controller', ex);
            const exec = new TechnicalException();
            exec.message = ex.message;
            response.error = exec;
        }
        res.status(500).json(JSON.stringify(response));
    })
}
export const authenticatePlayer = (request: IAuthenticationRequest, res: any) => {
    let response: IAuthenticationPlayerResponse = { error: null, status: false };
    AuthenticatePlayerService(request).then((data: any) => {
        console.log('data reslved in controller', data.value.credentials.token);
        response.status = true;
        res.cookie('authToken', data.value.credentials.token);
        res.cookie('authUser', data.value.credentials.userId);
        res.status(200).json(JSON.stringify(response));
    }).catch((ex: any) => {
        if (ex instanceof playerExcpetions.CredentialDidNotMatchException) {
            response.error = ex;
        } else {
            console.error('ex occured in createPlayer controller', ex);
            const exec = new TechnicalException();
            exec.message = ex.message;
            response.error = exec;
        }
        res.status(500).json(JSON.stringify(response));
    })
}

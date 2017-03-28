export default class Exception {
    type: string;
    message: string;
    constructor() {
        this.type = '';
        this.message = '';
    }
}
/*
* These messages can be overidden by implementing exceptions
*
*/
export class DataException extends Exception {
    constructor() {
        super();
        this.type = 'DATA_EXCEPTION';
        this.message = 'Data you provided is not correct.';
    }
}
export class TechnicalException extends Exception {
    constructor() {
        super();
        this.type = 'TECHNICAL_EXCEPTION';
        this.message = 'Something went wrong. Please try again later.';
    }
}
export class SessionException extends Exception {
    constructor() {
        super();
        this.type = 'SESSION_EXCEPTION';
        this.message = 'Sesion has been expired. please login again.';
    }
}

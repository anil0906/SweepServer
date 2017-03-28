import { DataException } from '../../Exception';
export class UserIdExistException extends DataException {
    constructor(userId: string) {
        super();
        this.message = `${userId} already taken`;
    }
}
export class EmailAlreadyRegisteredException extends DataException {
    constructor(email: string) {
        super();
        this.message = `${email} already registered`;
    }
}
export class PasswordNotMatchedException extends DataException {
    constructor() {
        super();
        this.message = `Password did not match`;
    }
}
export class CredentialDidNotMatchException extends DataException {
    constructor() {
        super();
        this.message = `Either Username or Password you entered did not match with our records`;
    }
}

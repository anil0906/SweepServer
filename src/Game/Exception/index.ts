import { DataException } from '../../Exception';
export class GameNotValidException extends DataException {
    constructor() {
        super();
        this.message = `Game you want to join is not valid anymore`;
    }
}

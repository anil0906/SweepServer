export interface ICard {
    number: number;
    type: string;
}
export interface IPlayer {
    profile: IPlayerProfile;
    credentials?: IPlayerCredentials;
}
export interface ICurrentGamePlayer {
    profile: IPlayerProfile;
    cardsInStack?: ICard[];
    cardsPicked?: ICard[];
    points: number;
    pausePending: number;
    timerWaringUsed: boolean; // If player does not complete his turn in 30 sec warning will be issued and 3 points will be given to opposite team. and player will be given extra 30 sec( Fresh Timer ). Upon next failure team will be disqualified
}
interface IPlayerCredentials {
    userId: string;
    password?: string;
    token?: string;
    timestamputc?: string;
}
interface IPlayerProfile {
    id?: string;
    displayName?: string;
    displayPicUrl?: string;
    userId?: string;
    email?: string;
    xpPoints?: number;
    gamesPlayed?: number;
    gamesWon?: number;
    gamesLost?: number;
}
interface IBoardState {
    id: string;
    houses: [
        {
            number: number;
            cards: ICard[];
            contributors: [{
                player: ICurrentGamePlayer;
                isOwner: boolean;
            }]
        }
    ];
    cards: [
        {
            number: number;
            type: string;
        }
    ];
}

export interface IGame {
    id: string;
    player1?: {
        player: ICurrentGamePlayer;  // cardsInStack will be send if you are current player
        hasJoined: boolean;
    };
    player2?: {
        player: ICurrentGamePlayer;  // cardsInStack will be send if you are current player
        hasJoined: boolean;
    };
    player3?: {
        player: ICurrentGamePlayer;  // cardsInStack will be send if you are current player
        hasJoined: boolean;
    };
    player4?: {
        player: ICurrentGamePlayer;  // cardsInStack will be send if you are current player
        hasJoined: boolean;
    };
    isTwoPlayerGame: boolean;
    boardState?: IBoardState;
    currentTurn?: number; // 1|2|3|4
    isGameStarted?: boolean;
    isGamePaused?: boolean;
    pausedBy?: number; // 1|2|3|4
    turnStartTime?: string; //Date in UTC
    legNumber?: number;
    gameType?: string; // single\multi-leg\unlimited
    team1Points: number;
    team2Points: number;
    isGameFinalized?: boolean;
    isOpenToPublic?: boolean;
    error?: {
        errorCode: string;
        errorMessage: string;
    }
}

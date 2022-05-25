export type TUserRole = "host" | "player"; //still necessary?

export type TQuestionType = "Guess the song title" | "Guess the song artist" | "Guess the liked song";

//game configuration
export interface IGameConfiguration {
    roundDuration: number;
    playBackDuration: number;
    gameRounds: number;
    gameMode: TQuestionType;
    songPool: string;
}

export interface IStompGameConfiguration {
    roundDuration: string;
    playBackDuration: string;
    gameRounds: string;
    gameMode: string;
    songPool: string;
}

export interface IGuessOption {
    answer: string;
    answerId: string;
    picture: string;
}

export interface IGuessQuestion {
    question: TQuestionType;
    currentRound: number;
    totalRounds: number;
    previewURL: string;
    playDuration?: number; //in seconds
    options: IGuessOption[];
}

//game answer
export interface IGameAnswer {
    playerGuess: string;
    responseTime: string;
    token: string;
}

//post game and post round
export interface IPlayerInfo {
    playerId: string;
    playerName: string;
    playerPosition: number;
    roundScore: number;
    totalScore: number;
    streak: number;
    profilePicture: string;
}

//post game and post round
export interface IGameResult {
    coverUrl: string;
    spotifyLink: string;
    artist: string;
    songTitle: string;
    correctAnswer: string;
    players: IPlayerInfo[];
    gameOver: boolean;
}

export interface ISendOptions {
    token: string;
}

export interface IMessageEvent {
    channel: string;
    type: string;
    data: any;
}

export interface IMessageListener {
    (event: IMessageEvent): void;
}

export interface IApi {
    join(listener: IMessageListener): void;

    send(channel: string, type: string, data: any, options?: ISendOptions): void;

    leave(listener: IMessageListener): void;
}

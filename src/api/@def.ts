export type TUserRole = "host" | "player"; //still necessary?

export type TQuestionType = "Guess the song" | "Guess the artist" | "Guess the lyrics";

//game configuration
export interface IGameConfiguration {
    roundDuration: string;
    playBackDuration: string;
    songPool: string;
    gameRounds: number;
    gameMode: string;
}

//game question (guess the artist)
export interface IGuessOption {
    answer: string;
    answerId: string;
    artistLogo: string;
}

//game question (guess the artist)
export interface IGuessQuestion {
    question: TQuestionType;
    previewURL: string;
    playDuration?: number; //in seconds
    options: IGuessOption[];
}

//game answer
export interface IGameAnswer {
    playerGuess: string;
    responseTime: string;
}

//post game and post round
export interface IPlayerInfo {
    playerId: string;
    playerName: string;
    playerPosition: number;
    roundScore: number;
    totalScore: number;
    streak: number;
}

//post game and post round
export interface IGameResult {
    artist: string;
    songTitle: string;
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

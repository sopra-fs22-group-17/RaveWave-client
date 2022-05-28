export type TUserRole = "host" | "player";

export type TQuestionType = "Guess the song title" | "Guess the song artist" | "Guess the liked song";

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
    playDuration?: number;
    options: IGuessOption[];
}

export interface IGameAnswer {
    playerGuess: string;
    responseTime: string;
    token: string;
}

export interface IPlayerInfo {
    playerId: string;
    playerName: string;
    playerPosition: number;
    roundScore: number;
    totalScore: number;
    streak: number;
    profilePicture: string;
}

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

export interface IPlayerJoin {
    name: string;
    likedGameModeUnlocked: boolean;
}

export interface IMessageListener {
    (event: IMessageEvent): void;
}

export interface IApi {
    join(listener: IMessageListener): void;

    send(channel: string, type: string, data: any, options?: ISendOptions): void;

    leave(listener: IMessageListener): void;
}

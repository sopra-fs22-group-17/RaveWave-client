export type TUserRole = "host" | "player"; //still necessary?

export type TQuestionType = "Guess the song song" | "Guess the song artist" | "Guess the song lyrics";

//game configuration
export interface IGameConfiguration {
    roundDuration: string;
    playBackDuration: string;
    songPool: string;
    gameRounds: number;
    gameMode: string;
}

//game question (guess the artist)
export interface IGuessTheArtistOption {
    answer: string;
    answerId: string;
    artistLogo: string;
}

//game question (guess the artist)
export interface IGuessTheArtistQuestion {
    question: string;
    previewURL: string;
    options: IGuessTheArtistOption[];
}

//game answer
export interface IGameAnswer {
    playerGuess: string;
    responseTime: string;
}

//post game and post round
export interface IPlayerInfo {
    playerId: number;
    playerName: string;
    playerPosition: number;
    roundScore: number;
    totalScore: number;
    streak: number;
}

//post post game and post round
export interface IGameResult {
    artist: string;
    songTitle: string;
    players: IPlayerInfo[];
    gameOver: boolean;
}

export interface ISendOptions {
    token: String;
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
}

export interface IGameConfiguration1 {
    gameMode: TQuestionType;
    numberOfRounds: number;
    playbackSpeed: number;
    playbackDuration: number;
}

export interface IGameAnswerOption1 {
    id: string;
    label: string;
    image: string;
}

export interface IGameAnswer1 {
    question: string;
    questionNumber: number;
    type: TQuestionType;
    songLink: string;
    options: IGameAnswerOption1[];
}

export interface IGameQuestion1 {
    question: string;
    questionNumber: number;
    type: TQuestionType;
    songLink: string;
    options: IGuessTheArtistOption[];
}

export interface IGameResul1 {
    correctAnswer: IGuessTheArtistOption;
    results: string[];
}

export interface IGameUserSummary1 {
    username: string;
    image: string;
    finalPoints: number;
    finalRank: number;
}

export interface IGameSummary1 {
    summary: IGameUserSummary1[];
}

export type TUserRole = "host" | "player";

export type TQuestionType = "guessthesong" | "guesstheartist" | "guessthelyrics";

//sent
export interface IGameConfiguration {
    gameMode: TQuestionType;
    numberOfRounds: number;
    playbackSpeed: number;
    playbackDuration: number;
}

//received
export interface IGameAnswerOption {
    id: string;
    label: string;
    image: string;
}

//received
export interface IGameQuestion {
    question: string;
    questionNumber: number;
    type: TQuestionType;
    songLink: string;
    options: IGameAnswerOption[];
}

//sent
export interface IGameAnswer {
    questionId: string;
    answerId: string;
}

//received
export interface IGameUserResult {
    username: string;
    image: string;
    correctness: boolean;
    currentPoints: number;
    currentRank: number;
}

export interface IGameResult {
    correctAnswer: IGameAnswerOption;
    results: IGameUserResult[];
}

//received
export interface IGameUserSummary {
    username: string;
    image: string;
    finalPoints: number;
    finalRank: number;
}

export interface IGameSummary {
    summary: IGameUserSummary[];
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

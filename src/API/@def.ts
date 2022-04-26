export type TUserRole = "host" | "player";

export type TQuestionType = "guessthesong" | "guesstheartist" | "guessthelyrics";

export interface IGameAnswerOption {
    id: string;
    label: string;
    image: string; //link
}

export interface IGameUserResult {
    username: string;
    image: string; //profile
    correctness: boolean;
    currentPoints: number;
}

export interface IGameQuestion {
    questionId: string;
    questionNumber: number;
    type: TQuestionType;
    songLink: string;
    options: IGameAnswerOption[];
}

export interface IGameAnswer {
    questionId: string;
    answerId: string;
}

export interface IGameResult {
    correctAnswer: IGameAnswerOption;
    results: IGameUserResult[];
}

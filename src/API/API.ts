import { IGameQuestion, IGameResult } from "./@def";

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

export class API {
    private listeners: IMessageListener[] = [];

    public join(listener: IMessageListener) {
        this.listeners.push(listener);
    }

    private connect() {}

    public send<T = any>(channel: string, type: string, data: any, options?: ISendOptions) {
        const dummyQuestion: IGameQuestion = {
            questionId: "Q01",
            questionNumber: 1,
            type: "guessthesong",
            songLink: "spotify.link.c",
            options: [
                {
                    id: "a",
                    label: "A",
                    image: "/images/artits/a",
                },
                {
                    id: "b",
                    label: "B",
                    image: "/images/artits/b",
                },
                {
                    id: "c",
                    label: "C",
                    image: "/images/artits/c",
                },
                {
                    id: "d",
                    label: "D",
                    image: "/images/artits/d",
                },
            ],
        };

        const dummyResults: IGameResult = {
            correctAnswer: {
                id: "d",
                label: "D",
                image: "/images/artits/d",
            },

            results: [
                {
                    username: "aaa",
                    image: "A",
                    correctness: true,
                    currentPoints: 900,
                },
                {
                    username: "bbb",
                    image: "B",
                    correctness: false,
                    currentPoints: 500,
                },
                {
                    username: "ccc",
                    image: "C",
                    correctness: true,
                    currentPoints: 700,
                },
                {
                    username: "ddd",
                    image: "D",
                    correctness: true,
                    currentPoints: 500,
                },
            ],
        };
        setTimeout(() => {
            if (data.method === "start") {
                const event: IMessageEvent = {
                    channel: "??",
                    type: "question",
                    data: dummyQuestion,
                };
                this.notify(event);
            } else if (data.method === "answer") {
                const event: IMessageEvent = {
                    channel: "??",
                    type: "result",
                    data: dummyResults,
                };

                this.notify(event);
            }
        }, 2000);
    }

    private notify(event: IMessageEvent) {
        for (const listener of this.listeners) {
            try {
                listener(event);
            } catch {
                console.log("Error");
            }
        }
    }

    private onReceive() {}
}

export const remote = new API();

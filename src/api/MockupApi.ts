import { IApi, IGameQuestion, IGameResult, IGameSummary, IMessageEvent, IMessageListener, ISendOptions } from "./@def";

export class MockupApi implements IApi {
    private listeners: IMessageListener[] = [];

    public join(listener: IMessageListener) {
        this.listeners.push(listener);
    }

    private connect() {}

    public send<T = any>(channel: string, type: string, data: any, options?: ISendOptions) {
        const dummyQuestion: IGameQuestion = {
            question: "Guess the song artist",
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
                    currentRank: 1,
                },
                {
                    username: "bbb",
                    image: "B",
                    correctness: false,
                    currentPoints: 500,
                    currentRank: 3,
                },
                {
                    username: "ccc",
                    image: "C",
                    correctness: true,
                    currentPoints: 700,
                    currentRank: 2,
                },
                {
                    username: "ddd",
                    image: "D",
                    correctness: true,
                    currentPoints: 400,
                    currentRank: 300,
                },
            ],
        };

        const dummySummary: IGameSummary = {
            summary: [
                {
                    username: "aaa",
                    image: "A",
                    finalPoints: 900,
                    finalRank: 2,
                },
                {
                    username: "bbb",
                    image: "A",
                    finalPoints: 1000,
                    finalRank: 1,
                },
                {
                    username: "ccc",
                    image: "A",
                    finalPoints: 800,
                    finalRank: 3,
                },
                {
                    username: "ddd",
                    image: "A",
                    finalPoints: 700,
                    finalRank: 4,
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

                setTimeout(() => {
                    const event: IMessageEvent = {
                        channel: "??",
                        type: "summary",
                        data: dummySummary,
                    };
                    this.notify(event);
                }, 5000);
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

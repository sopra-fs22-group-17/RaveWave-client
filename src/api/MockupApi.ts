import { IApi, IGameResult, IGuessQuestion, IMessageEvent, IMessageListener, ISendOptions } from "./@def";

export class MockupApi implements IApi {
    private listeners: IMessageListener[] = [];

    constructor() {}

    public join(listener: IMessageListener) {
        this.listeners.push(listener);
    }
    //im stompapi zum funktionieren brigen

    private connect() {}

    public send<T = any>(channel: string, type: string, data: any, options?: ISendOptions) {
        setTimeout(() => {
            if (data.method === "start") {
                const event: IMessageEvent = {
                    channel: "??",
                    type: "question",
                    data: GUESS_THE_ARTIST_QUESTION,
                };
                this.notify(event);
            } else if (data.method === "answer") {
                const event: IMessageEvent = {
                    channel: "??",
                    type: "result",
                    data: DUMMY_RESULT,
                };
                this.notify(event);

                setTimeout(() => {
                    const event: IMessageEvent = {
                        channel: "??",
                        type: "summary",
                        data: DUMMY_RESULT,
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

export const GUESS_THE_ARTIST_QUESTION: IGuessQuestion = {
    question: "Guess the artist",
    previewURL: "https://p.scdn.co/mp3-preview/1ac449e52145d1c44dc4346afdb2d8b70e93969b?cid=d7d44473ad6a47cd86c580fcee015449",
    options: [
        {
            answer: "Olivia Rodrigo",
            answerId: "1",
            artistLogo: "/images/olivia-rodrigo.jpeg",
        },
        {
            answer: "Harry Styles",
            answerId: "2",
            artistLogo: "/images/harry-styles.webp",
        },
        {
            answer: "Robin Schulz",
            answerId: "3",
            artistLogo: "/images/robin-schulz.jpg",
        },
        {
            answer: "Tom Odell",
            answerId: "4",
            artistLogo: "/images/tom-odell.jpeg",
        },
    ],
};

export const DUMMY_RESULT: IGameResult = {
    artist: "Cardi B",
    songTitle: "xyz",
    players: [
        {
            playerId: "1",
            playerName: "Dennys",
            playerPosition: 1,
            roundScore: 785,
            totalScore: 785,
            streak: 1,
        },
        {
            playerId: "2",
            playerName: "Bella",
            playerPosition: 2,
            roundScore: 0,
            totalScore: 0,
            streak: 0,
        },
        {
            playerId: "3",
            playerName: "Sheena",
            playerPosition: 1,
            roundScore: 123,
            totalScore: 300,
            streak: 1,
        },
    ],
    gameOver: false,
};

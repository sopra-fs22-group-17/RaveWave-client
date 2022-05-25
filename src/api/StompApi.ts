import SockJS from "sockjs-client";
import Stomp from "stompjs";

import { IGameConfiguration, IGameResult, IGuessQuestion, IMessageEvent, IMessageListener, IStompGameConfiguration } from "./@def";
import { defer } from "./Deferred";
import { getDomain } from "./getDomain";

export interface ISongPool {
    id: string;
    label: string;
    color: string;
}

export interface IPlayerConfirmation {
    playerId: string;
    token: string;
    //
    id: string;
    lobbyId: number;
    playerName: string;
    roundScore: 0;
    streak: 0;
    totalScore: 0;
}

export interface IQuestionAnswer {
    playerGuess: string;
    answerTime: string;
    token: string;
}

export class StompApi {
    private listeners: IMessageListener[] = [];
    private _connected = false;
    private _registered = false;
    private _disconnectCallbacks = [];
    private _registerCallbacks = [];
    private _messageCallbacks = {};

    private sock: any;
    private stomp: any;

    constructor() {
        this._connected = false;
        this._registered = false;
        this._disconnectCallbacks = [];
        this._registerCallbacks = [];
        this._messageCallbacks = {};
    }

    public join(listener: IMessageListener) {
        this.listeners.push(listener);
    }

    public leave(listener: IMessageListener) {
        this.listeners = this.listeners.filter((l) => l !== listener);
    }

    public sendSettings(lobbyId: string, gameConfiguration?: IGameConfiguration): void {
        // const mockupSettings = {
        //     gameMode: "ARTISTGAME",
        //     roundDuration: "FOURTEEN",
        //     playBackDuration: "FOURTEEN",
        //     songPool: "SWITZERLAND",
        //     gameRounds: "12",
        // };

        console.log("SEND SETTINGS 1");
        const stompGameConfiguration: IStompGameConfiguration = {
            roundDuration: NUMBER_STRING_ARRAY[gameConfiguration.roundDuration],
            playBackDuration: NUMBER_STRING_ARRAY[gameConfiguration.playBackDuration],
            gameRounds: String(gameConfiguration.gameRounds),
            gameMode: GAME_MODES[gameConfiguration.gameMode],
            songPool: gameConfiguration.songPool,
        };

        console.log(JSON.stringify(stompGameConfiguration, null, 4));
        this.stomp.send(`/app/lobbies/${lobbyId}/setup`, {}, JSON.stringify(stompGameConfiguration));
        console.log("SEND SETTINGS 2");
    }

    public startGame(lobbyId: string): void {
        this.send(`/app/lobbies/${lobbyId}/start-game`);
    }

    public nextRound(lobbyId: string): void {
        this.send(`/app/lobbies/${lobbyId}/next-round`);
    }

    public endRound(lobbyId: string): void {
        this.send(`/app/lobbies/${lobbyId}/end-round`);
    }

    public saveAnswer(lobbyId: string, answer: IQuestionAnswer): void {
        const playerIdLocal = sessionStorage.getItem("playerId");
        this.send(`/app/lobbies/${lobbyId}/player/${playerIdLocal}/save-answer`, JSON.stringify(answer));
    }

    public isConnected(): boolean {
        return this._connected;
    }

    public isRegistered(): boolean {
        return this._registered;
    }

    public async connect(lobbyId: string): Promise<void> {
        const deferred = defer<void>();
        console.log("StompApi: CONNECT IS CALLED");
        try {
            this.sock.close();
        } catch {}

        // const lobbyId = await this.createLobbyAndGetId(); // regular http request to create and get new lobby id

        //this.sock = new SockJS(`http://localhost:8080/ws`); // local
        this.sock = new SockJS(getDomain() + `/ws`); // remote
        // this.sock = new SockJS(`http://sopra-fs22-group17-server.herokuapp.com/ws`); // remote
        // const endpoint = getEndpoint();
        // this.sock = new SockJS(endpoint);

        this.stomp = Stomp.over(this.sock);
        this.stomp.debug = this._debug;
        this.stomp.connect(
            {},
            () => {
                console.log("CONNECT SUCCESS");
                this._connected = true;
                // this.subscribe(`/topic/lobbies/${lobbyId}`, (r) => this._handleMessage(r));
                this.subscribe(`/topic/lobbies/${lobbyId}`, (r) => this._handleMessage(r));

                deferred.resolve();
                //this.sendSettings(lobbyId);
                //this.startGame(lobbyId);
            },
            () => {
                console.log("CONNECT FAILED");
                deferred.reject();
            },
        );

        this.sock.onclose = (r) => {
            console.log("Socket closed!", r);
            this._handleDisconnect("Socket closed.");
        };
        this.sock.onerror = (e) => this._handleError(e);

        return deferred.promise;
    }

    public disconnect(reason: any): void {
        try {
            this.stomp.disconnect(() => this._handleDisconnect(reason), {});
        } catch {}
    }

    public subscribe(channel: string, callback: (data: any) => void): void {
        this.stomp.subscribe(channel, (r) => callback(this._stripResponse(r)));
    }

    // public register(token: string) {
    //     this.send("/app/register", { token: token });
    // }

    // public reconnect(token: string) {
    //     // remove disconnect callbacks so we don't
    //     // trigger anything while reconnecting

    //     const callbacks = this._disconnectCallbacks.slice();
    //     this._disconnectCallbacks = [];

    //     this.disconnect("Reconnecting");

    //     setTimeout(() => {
    //         this._disconnectCallbacks = callbacks;
    //         this.connectAndRegister(token);
    //     }, 500);
    // }

    public onRegister(callback: () => void) {
        this._registerCallbacks.push(callback);
    }

    /*
    sendToLobby(channel, body) {
        this.send(`/app/lobby/${sessionManager.lobbyId}${channel}`, body);
    }

     */

    public clearMessageSubscriptions() {
        this._messageCallbacks = {};
    }

    public onDisconnect(callback: () => void) {
        this._disconnectCallbacks.push(callback);
    }

    public clearDisconnectSubscriptions() {
        this._disconnectCallbacks = [];
    }

    public onLobbyMessage(channel: string, callback: () => void) {
        if (!this._messageCallbacks.hasOwnProperty(channel)) {
            this._messageCallbacks[channel] = [];
        }
        this._messageCallbacks[channel].push(callback);
    }

    private send(message: string, payload?: any) {
        console.log("Stomp: " + message);
        if (payload) {
            this.stomp.send(message, {}, payload);
        } else {
            this.stomp.send(message);
        }
    }

    private _handleError(error: any) {
        console.error(error);
        this._handleDisconnect("Socket error.");
    }

    private _handleDisconnect(reason: any) {
        this._connected = false;
        for (const callback of this._disconnectCallbacks) {
            callback(reason);
        }
    }

    private _handleRegister(response: any) {
        this._registered = true;
        //sessionManager.lobbyId = response.lobbyId;

        //this.stomp.subscribe(`/user/queue/lobby/${response.lobbyId}/*`, r => this._handleMessage(r));
        //this.stomp.subscribe(`/user/queue/lobby/${response.lobbyId}/*/*`, r => this._handleMessage(r));

        this.stomp.subscribe("/");
        for (let callback of this._registerCallbacks) {
            console.log(response);
            callback(response);
        }
    }

    /* change this */

    //listeners aufrufen (use notify)make message call notify
    private _handleMessage(info: any) {
        console.log("CALLBACK _handleMessage");
        const msg = info.msg;
        if (msg.type === "setup") {
            this._handleSetupMessage(info);
        } else if (msg.type === "question") {
            this._handleQuestionMessage(info);
        } else if (msg.type === "result") {
            this._handleResultMessage(info);
        }
    }

    private _handleSetupMessage(info: any) {
        // create event
        // call notify
    }

    private _handleQuestionMessage(payload: any) {
        const info = payload.msg;
        const data: IGuessQuestion = {
            question: info.question,
            currentRound: info.currentRound,
            totalRounds: info.totalRounds,
            previewURL: info.previewURL,
            playDuration: info.playBackDuration,
            options: info.answers,
        };
        const messageEvent: IMessageEvent = {
            channel: info.channel,
            type: "question",
            data,
        };
        this.notify(messageEvent);
    }

    private _handleResultMessage(payload: any) {
        const info = payload.msg;

        const data: IGameResult = {
            spotifyLink: info.spotifyLink,
            coverUrl: info.coverUrl,
            artist: info.artist,
            songTitle: info.songTitle,
            correctAnswer: info.correctAnswer,
            players: info.players,
            gameOver: info.gameOver,
        };
        const messageEvent: IMessageEvent = {
            channel: info.channel,
            type: data.gameOver ? "summary" : "result",
            data,
        };
        this.notify(messageEvent);
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

    private _stripResponse(response: any) {
        const msg = JSON.parse(response.body);
        const channel = response.headers.destination;
        const lobbyChannel = channel.replace(/.+\/lobby\/.+\//i, "/");
        const info = { msg, channel, lobbyChannel };
        console.log(JSON.stringify(info, null, 4));

        return info;
    }

    private _debug(message: string) {
        // only output debug messages if we're not in the production environment
        console.log("Debug: " + message);
    }
}

export const SONG_POOLS: ISongPool[] = [
    {
        id: "RAVEWAVESPECIAL",
        label: "Creator Special",
        color: "#E8125C",
    },
    {
        id: "PARTY",
        label: "Party",
        color: "#BB5D19",
    },

    {
        id: "HIPHOP",
        label: "Hip-Hop",
        color: "#487D95",
    },
    {
        id: "TECHNO",
        label: "Techno",
        color: "#8C67AB",
    },
    {
        id: "ROCK",
        label: "Rock",
        color: "#777777",
    },
    {
        id: "LATIN",
        label: "Latin",
        color: "#26856A",
    },

    {
        id: "SWITZERLAND",
        label: "Charts",
        color: "#8C67AB",
    },
    {
        id: "EIGHTIES",
        label: "80s Hits",
        color: "#1F3264",
    },
    {
        id: "NINETIES",
        label: "90s Hits",
        color: "#1F3264",
    },
    {
        id: "NOUGHTIES",
        label: "2000s Hits",
        color: "#1F3264",
    },
    {
        id: "USERSTOPTRACKS",
        label: "User's Top Tracks",
        color: "#E8125C",
    },
    {
        id: "USERSSAVEDTRACKS",
        label: "User's Saved Tracks",
        color: "#BB5D19",
    },
];

export const LIKED_SONG_POOLS: ISongPool[] = [
    {
        id: "USERSTOPTRACKS",
        label: "User's Top Tracks",
        color: "#E8125C",
    },
    {
        id: "USERSSAVEDTRACKS",
        label: "User's Saved Tracks",
        color: "#BB5D19",
    },
];

const GAME_MODES = {
    "Guess the song title": "SONGTITLEGAME",
    "Guess the song artist": "ARTISTGAME",
    "Guess the liked song": "LIKEDSONGGAME",
};

const NUMBER_STRING_ARRAY = [
    "ZERO",
    "ONE",
    "TWO",
    "THREE",
    "FOUR",
    "FIVE",
    "SIX",
    "SEVEN",
    "EIGHT",
    "NINE",
    "TEN",
    "ELEVEN",
    "TWELVE",
    "THIRTEEN",
    "FOURTEEN",
    "FIFTEEN",
    "SIXTEEN",
    "SEVENTEEN",
    "EIGHTEEN",
    "NINETEEN",
    "TWENTY",
];

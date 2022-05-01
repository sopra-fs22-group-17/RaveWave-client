import SockJS from "sockjs-client";
import Stomp from "stompjs";

import { api } from "helpers/api";

import { IGameConfiguration, IMessageListener } from "./@def";

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
    /*
     * New functions (might need to be moved to a better location)
     * v v v v v v v v v v v v v v v v v v v v v v v v v v v
     */
    public async createLobbyAndGetId(): Promise<string> {
        const response = await api.post(`/lobbies`);
        if (response.status >= 200 && response.status < 300) {
            console.log("rest response: " + JSON.stringify(response.data));
            return response.data["lobbyId"];
        } else if (response.status === 404) {
            throw new Error("raveWaver with raverId was not found");
        } else if (response.status === 401) {
            throw new Error("Not authorized");
        } else {
            throw new Error("Something went wrong during getUser");
        }
    }

    public async addPlayer(playerName: string) {
        const response = await api.post(`/lobbies`, { playerName: playerName });
        if (response.status >= 200 && response.status < 300) {
            console.log("rest response: " + JSON.stringify(response.data));
            return response.data;
        } else {
            throw new Error("Error happend when trying to add player");
        }
    }

    public sendSettings(lobbyId: string, settings?: IGameConfiguration) {
        const mockupSettings = {
            gameMode: "ARTISTGAME",
            roundDuration: "FOURTEEN",
            playBackDuration: "FOURTEEN",
            songPool: "SWITZERLAND",
            gameRounds: 12,
        };
        const config = settings || mockupSettings;
        this.stomp.send(`/app/lobbies/${lobbyId}/setup`, {}, JSON.stringify(config));
    }

    public startGame(lobbyId: string): void {
        this.stomp.send(`/app/lobbies/${lobbyId}/start-game`);
    }

    private _handleSettingsResponse(r): void {
        console.log("StompApi: Settings received from server: " + JSON.stringify(r));
    }

    /*
     * ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
     * New functions (might need to be moved to a better location)
     */

    public isConnected(): boolean {
        return this._connected;
    }

    public isRegistered(): boolean {
        return this._registered;
    }

    public async connect(lobbyId: string, callback?: () => void): Promise<void> {
        console.log("StompApi: CONNECT IS CALLED");
        try {
            this.sock.close();
        } catch {}

        // const lobbyId = await this.createLobbyAndGetId(); // regular http request to create and get new lobby id

        this.sock = new SockJS(`http://localhost:8080/ws`); // local
        // this.sock = new SockJS(`http://sopra-fs22-group17-server.herokuapp.com/ws`); // remote
        this.stomp = Stomp.over(this.sock);
        this.stomp.debug = this._debug;
        this.stomp.connect({}, () => {
            this._connected = true;

            this.subscribe(`/topic/lobbies/${lobbyId}`, (r) => this._handleMessage(r));

            //this.sendSettings(lobbyId);
            //this.startGame(lobbyId);

            if (callback) {
                callback();
            }
        });

        this.sock.onclose = (r) => {
            console.log("Socket closed!", r);
            this._handleDisconnect("Socket closed.");
        };
        this.sock.onerror = (e) => this._handleError(e);
    }

    public disconnect(reason: any): void {
        try {
            this.stomp.disconnect(() => this._handleDisconnect(reason), {});
        } catch {}
    }
    public async connectAndRegister(token: string): Promise<void> {
        const lobbyId = await this.createLobbyAndGetId();
        this.connect(lobbyId, () => {
            this.testSocket();
            //this.register(token);
        });
    }

    public testSocket(): void {
        // TODO da tuesch zb sache schike und /app musch immer am afang tue wen sache schicke
        // TODO d destination isch schlussendlich /app + d endpoints womer im backed bi WebsocketController isch
        this.send("/app/lobbies/1/next-round");
    }

    public register(token: string) {
        this.send("/app/register", { token: token });
    }

    public reconnect(token: string) {
        // remove disconnect callbacks so we don't
        // trigger anything while reconnecting

        const callbacks = this._disconnectCallbacks.slice();
        this._disconnectCallbacks = [];

        this.disconnect("Reconnecting");

        setTimeout(() => {
            this._disconnectCallbacks = callbacks;
            this.connectAndRegister(token);
        }, 500);
    }

    public subscribe(channel: string, callback: (data: any) => void): void {
        this.stomp.subscribe(channel, (r) => callback(this._stripResponse(r)));
    }

    public send(destination: string, body?: any): void {
        this.stomp.send();
    }

    /*
    sendToLobby(channel, body) {
        this.send(`/app/lobby/${sessionManager.lobbyId}${channel}`, body);
    }

     */

    public onRegister(callback: () => void) {
        this._registerCallbacks.push(callback);
    }

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
    private _handleMessage(response: any) {
        const msg = JSON.parse(response.body);
        const channel = response.headers.destination;
        const lobbyChannel = channel.replace(/.+\/lobby\/.+\//i, "/");
        const info = { msg, channel, lobbyChannel };
        console.log(JSON.stringify(info, null, 4));

        if (!this._messageCallbacks.hasOwnProperty(lobbyChannel)) {
            return;
        }

        for (const callback of this._messageCallbacks[lobbyChannel]) {
            callback(msg);
        }
    }

    private _stripResponse(response: any) {
        return JSON.parse(response.body);
    }

    private _debug(message: string) {
        // only output debug messages if we're not in the production environment
        console.log("Debug: " + message);
    }
}

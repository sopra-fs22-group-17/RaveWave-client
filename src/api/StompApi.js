import SockJS from "sockjs-client";
import Stomp from "stompjs";

import { api } from "helpers/api";

class SockClient {
    constructor() {
        this._connected = false;
        this._registered = false;
        this._disconnectCallbacks = [];
        this._registerCallbacks = [];
        this._messageCallbacks = {};
    }

    /*
     * New functions (might need to be moved to a better location)
     * v v v v v v v v v v v v v v v v v v v v v v v v v v v
     */
    async createLobbyAndGetId() {
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

    async addPlayer(playerName) {
        const response = await api.post(`/lobbies`, { playerName: playerName });
        if (response.status >= 200 && response.status < 300) {
            console.log("rest response: " + JSON.stringify(response.data));
            return response.data;
        } else {
            throw new Error("Error happend when trying to add player");
        }
    }

    sendSettings(lobbyId) {
        const mockupSettings = {
            gameMode: "ARTISTGAME",
            roundDuration: "FOURTEEN",
            playBackDuration: "FOURTEEN",
            songPool: "SWITZERLAND",
            gameRounds: "12",
        };
        this.stomp.send(`/app/lobbies/${lobbyId}/setup`, {}, JSON.stringify(mockupSettings));
    }

    startGame(lobbyId) {
        this.stomp.send(`/app/lobbies/${lobbyId}/start-game`);
    }

    _handleSettingsResponse(r) {
        console.log("StompApi: Settings received from server: " + JSON.stringify(r));
    }

    /*
     * ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
     * New functions (might need to be moved to a better location)
     */

    isConnected() {
        return this._connected;
    }

    isRegistered() {
        return this._registered;
    }

    async connect(callback) {
        console.log("StompApi: CONNECT IS CALLED");
        try {
            this.sock.close();
        } catch {}

        const lobbyId = await this.createLobbyAndGetId(); // regular http request to create and get new lobby id

        this.sock = new SockJS(`http://localhost:8080/ws`); // local
        // this.sock = new SockJS(`http://sopra-fs22-group17-server.herokuapp.com/ws`); // remote
        this.stomp = Stomp.over(this.sock);
        this.stomp.debug = this._debug;
        this.stomp.connect({}, () => {
            this._connected = true;

            this.subscribe(`/topic/lobbies/${lobbyId}`, (r) => {
                switch (r.type) {
                    case "settings":
                        this._handleSettingsResponse(r);
                        break;

                    case "question":
                        //this._handleQuestion(r);
                        break;

                        //case "more":
                        //this._handleQuestion(r);
                        break;

                    default:
                    // throw exception
                }
            });

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

    disconnect(reason) {
        try {
            this.stomp.disconnect(() => this._handleDisconnect(reason), {});
        } catch {}
    }

    connectAndRegister(token) {
        this.connect(() => {
            this.testSocket();
            //this.register(token);
        });
    }

    testSocket() {
        //TODO da tuesch zb sache schike und /app musch immer am afang tue wen sache schicke
        //TODO d destination isch schlussendlich /app + d endpoints womer im backend bi WebsocketController isch
        this.send("/app/lobbies/1/next-round");
    }

    register(token) {
        this.send("/app/register", { token: token });
    }

    reconnect(token) {
        // remove disconnect callbacks so we don't
        // trigger anything while reconnecting

        let callbacks = this._disconnectCallbacks.slice();
        this._disconnectCallbacks = [];

        this.disconnect("Reconnecting");

        setTimeout(() => {
            this._disconnectCallbacks = callbacks;
            this.connectAndRegister(token);
        }, 500);
    }

    subscribe(channel, callback) {
        this.stomp.subscribe(channel, (r) => callback(this._stripResponse(r)));
    }

    send(destination, body) {
        this.stomp.send();
    }

    /*
    sendToLobby(channel, body) {
        this.send(`/app/lobby/${sessionManager.lobbyId}${channel}`, body);
    }

     */

    onRegister(callback) {
        this._registerCallbacks.push(callback);
    }

    clearMessageSubscriptions() {
        this._messageCallbacks = {};
    }

    onDisconnect(callback) {
        this._disconnectCallbacks.push(callback);
    }

    clearDisconnectSubscriptions() {
        this._disconnectCallbacks = [];
    }

    onLobbyMessage(channel, callback) {
        if (!this._messageCallbacks.hasOwnProperty(channel)) {
            this._messageCallbacks[channel] = [];
        }
        this._messageCallbacks[channel].push(callback);
    }

    _handleError(error) {
        console.error(error);
        this._handleDisconnect("Socket error.");
    }

    _handleDisconnect(reason) {
        this._connected = false;
        for (let callback of this._disconnectCallbacks) {
            callback(reason);
        }
    }

    _handleRegister(response) {
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

    _handleMessage(response) {
        let msg = JSON.parse(response.body);
        let channel = response.headers.destination;
        let lobbyChannel = channel.replace(/.+\/lobby\/.+\//i, "/");

        if (!this._messageCallbacks.hasOwnProperty(lobbyChannel)) {
            return;
        }

        for (let callback of this._messageCallbacks[lobbyChannel]) {
            callback(msg);
        }
    }

    _stripResponse(response) {
        return JSON.parse(response.body);
    }

    _debug(message) {
        // only output debug messages if we're not in the production environment
        console.log(message);
    }
}

const stompClient = new SockClient();

export { stompClient };

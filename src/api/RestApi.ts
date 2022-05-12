import axios from "axios";
import { getDomain } from "./getDomain";

export const remote = axios.create({
    baseURL: getDomain(),
    headers: { "Content-Type": "application/json" },
});

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
}

export class RestApi {
    constructor() {}
    _user = null;

    // @PostMapping("/ravewavers")
    async registerUser(username, password) {
        const requestBody = JSON.stringify({username, password});
        const response = await remote.post("/ravewavers", requestBody);
        if (response.status >= 200 && response.status < 300) {
            const user = response.data;
            this._user = user;
            // Store the token into the local storage.
            localStorage.setItem("token", user.token);
            return user;
        } else if (response.status === 409) {
            throw new Error("Add user failed because username already exists");
        } else {
            throw new Error("Something went wrong during registerUser");
        }
    }

    // @PostMapping("/login")
    async loginUser(username, password) {
        const requestBody = JSON.stringify({username, password});
        const response = await remote.post("/login", requestBody);
        if (response.status >= 200 && response.status < 300) {
            const user = response.data;
            // Store the token into the local storage.
            localStorage.setItem("token", user.token);
            localStorage.setItem("playerId", user.id);
            this._user = user;
            return response.data;
        } else if (response.status === 404) {
            throw new Error("user not found");
        } else if (response.status === 401) {
            throw new Error("invalid credentials");
        } else {
            throw new Error("Something went wrong during login user");
        }
    }

    // @PutMapping("/ravewavers/{raverId}")
    async updateUser(raverId) {
        // what to pass ??
        // make new raveWaver here
        const requestBody = raverId; // send raveWaver as request body
        const response = await remote.put(`/ravewavers/${raverId}`, requestBody);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else if (response.status === 404) {
            throw new Error("user with raverId was not found");
        } else if (response.status === 401) {
            throw new Error("Not authorized");
        } else if (response.status >= 400 && response.status < 500) {
            throw new Error("Username already exists or birthday format wrong");
        } else {
            throw new Error("Something went wrong during updateUser");
        }
    }

    public async createLobbyAndGetId(): Promise<string> {
        const response = await remote.post(`/lobbies`);
        if (response.status >= 200 && response.status < 300) {
            console.log("rest response: " + JSON.stringify(response.data));
            return response.data.lobbyId;
        } else if (response.status === 404) {
            throw new Error("raveWaver with raverId was not found");
        } else if (response.status === 401) {
            throw new Error("Not authorized");
        } else {
            throw new Error("Something went wrong during getUser");
        }
    }

    public async addPlayer(lobbyId: string, playerName: string): Promise<IPlayerConfirmation> {
        const response = await remote.post(`/lobbies/${lobbyId}`, { playerName: playerName });
        if (response.status >= 200 && response.status < 300) {
            const user = response.data;
            // Store the playerId into the local storage.
            localStorage.setItem("playerId", user.id);
            user.id = String(user.id);
            console.log("rest response: " + JSON.stringify(user, null, 4));
            return user;
        } else {
            throw new Error("Error happend when trying to add player");
        }
    }

    // @GetMapping(value = "/Spotify/authorizationCodeUri")
    async getAuthorizationCodeUri() {
        const response = await remote.get("/Spotify/authorizationCodeUri"); // remote.get
        const URL = response;
        if (response.status >= 200 && response.status < 300) {
            return URL;
        } else {
            throw new Error("Something went wrong during authorizationCodeUri");
        }
    }

    public async setAuthorizationCode(code: string) {
        const response = await remote.post("/Spotify/authorizationCode", code);
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            throw new Error("Something went wrong during authorizationCode");
        }
    }

    handleError = (error) => {
        const response = error.response;

        // catch 4xx and 5xx status codes
        if (response && !!`${response.status}`.match(/^[4|5]\d{2}$/)) {
            let info = `\nrequest to: ${response.request.responseURL}`;

            if (response.data.status) {
                info += `\nstatus code: ${response.data.status}`;
                info += `\nerror: ${response.data.error}`;
                info += `\nerror message: ${response.data.message}`;
            } else {
                info += `\nstatus code: ${response.status}`;
                info += `\nerror message:\n${response.data}`;
            }

            console.log("The request was made and answered but was unsuccessful.", error.response);
            return info;
        } else {
            if (error.message.match(/Network Error/)) {
                alert("The server cannot be reached.\nDid you start it?");
            }

            console.log("Something else happened.", error);
            return error.message;
        }
    }
}
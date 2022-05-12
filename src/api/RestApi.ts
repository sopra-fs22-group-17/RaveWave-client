import { api } from "helpers/api";

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
    constructor() {
    }

    _user = null;

    // @GetMapping("/ravewavers/{raverId}")
    async getUser(raverId) {
        const response = await api.get(`/ravewavers/${raverId}`);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else if (response.status === 404) {
            throw new Error("raveWaver with raverId was not found");
        } else if (response.status === 401) {
            throw new Error("Not authorized");
        } else {
            throw new Error("Something went wrong during getUser");
        }
    }

    // @GetMapping("/ravewavers")
    async getUsers() {
        const response = await api.get(`/ravewavers`);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else if (response.status >= 300 && response.status < 400) {
            throw new Error("Bad request");
        } else {
            throw new Error("Something went wrong during getUsers");
        }
    }

    // @PostMapping("/ravewavers")
    async registerUser(username, password) {
        const requestBody = JSON.stringify({username, password});
        const response = await api.post("/ravewavers", requestBody);
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
        const response = await api.post("/login", requestBody);
        if (response.status >= 200 && response.status < 300) {
            const user = response.data;
            // Store the token into the local storage.
            localStorage.setItem("token", user.token);
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
        const response = await api.put(`/ravewavers/${raverId}`, requestBody);
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

    // NOT PRESENT from here
    // remove token and set status to offline
    logoutUser() {
        const userToken = localStorage.getItem("token");
        api.put(`/users/logout?token=${userToken}`);
        localStorage.removeItem("token");
        this._user = null;
    }

    // check if there is a token in local storage
    isLoggedIn() {
        return !!localStorage.getItem("token");
    }

    // check if logged in user corresponds to user (important for edit profile)
    isUserLoggedIn(user) {
        return user && user.token === localStorage.getItem("token");
    }

    // @PostMapping("/lobbies")
    public async createLobbyAndGetId(): Promise<string> {
        const response = await api.post(`/lobbies`);
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

    // @PutMapping("/lobbies/{lobbyId}")
    public async addPlayer(lobbyId: string, playerName: string): Promise<IPlayerConfirmation> {
        const response = await api.post(`/lobbies/${lobbyId}`, {playerName: playerName});
        if (response.status >= 200 && response.status < 300) {
            const data = response.data;
            data.id = String(data.id);
            console.log("rest response: " + JSON.stringify(data, null, 4));
            return data;
        } else {
            throw new Error("Error happend when trying to add player");
        }
    }

    // SPOTINIO
    // @GetMapping(value = "/Spotify/authorizationCodeUri")
    async getAuthorizationCodeUri() {
        const response = await api.get("/Spotify/authorizationCodeUri"); // remote.get
        const URL = response;
        if (response.status >= 200 && response.status < 300) {
            return URL;
        } else {
            throw new Error("Something went wrong during authorizationCodeUri");
        }
    }

    // @PostMapping(value = "/Spotify/authorizationCode"
    public async setAuthorizationCode(code: string) {
        const response = await api.post("/Spotify/authorizationCode", code);
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            throw new Error("Something went wrong during authorizationCode");
        }
    }
}

export const remote = new RestApi();

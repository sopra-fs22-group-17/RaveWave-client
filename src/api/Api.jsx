import { api } from "helpers/api";

export class API {
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
        const requestBody = JSON.stringify({ username, password });
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

    // @PostMapping("/lobbies")
    async addLobby(gamemode) {
        // create game mode here
        const requestBody = gamemode; // pass game mode as request body
        const response = await api.post("/lobbies", requestBody);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else if (response.status === 409) {
            throw new Error("Add user failed because username already exists");
        } else {
            throw new Error("Something went wrong during addLobby");
        }
    }

    // @PutMapping("/lobbies/{lobbyId}")
    async addPlayertoLobby(raveWaver, lobbyId) {
        // create new raveWaver here
        const requestBody = raveWaver; // pass game mode as request body
        const response = await api.put(`/lobbies/${lobbyId}`, requestBody);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else if (response.status === 409) {
            throw new Error("failed because username already exists in lobby");
        } else {
            throw new Error("Something went wrong during addPlayertoLobby");
        }
    }

    // @PostMapping("/login")
    async loginUser(username, password) {
        const requestBody = JSON.stringify({ username, password });
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

    // SPOTINIO
    // @GetMapping(value = "/Spotify/authorizationCodeUri")
    async getAuthorizationCodeUri() {
        const response = await api.get("/Spotify/authorizationCodeUri");
        const URL = JSON.parse(response)
        alert(URL)
        if (response.status >= 200 && response.status < 300) {
            alert(URL)
            return URL;
        } else {
            throw new Error("Something went wrong during authorizationCodeUri");
        }
    }

    // @PostMapping(value = "/Spotify/authorizationCode"
    async postAuthorizationCode() {
        const response = await api.post("authorizationCode");
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            throw new Error("Something went wrong during authorizationCode");
        }
    }

    //SPOTIFY REFRESH

    // WBESOCKETI
    // @MessageMapping("/lobby/{lobbyId}/start-game")
    // @MessageMapping("/lobby/{lobbyId}/player/{playerId}/check-answer")
    // @MessageMapping("/lobby/{lobbyId}/end-game")
    // @MessageMapping("/lobby/{lobbyId}/setup")
    // @MessageMapping("/lobby/{lobbyId}/leaderboard")
    // @MessageMapping("/lobby/{lobbyId}/next-round") //postman showcase
    // @MessageMapping("/lobby/test")

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
}

export const remote = new API();

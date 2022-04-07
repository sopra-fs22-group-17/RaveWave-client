import { api } from "helpers/api";

export class API {
    _user = null;

    // register new user
    async registerUser(username, password) {
        const requestBody = JSON.stringify({ username, password });
        const response = await api.post("/users", requestBody);
        if (response.status >= 200 && response.status < 300) {
            const user = response.data;
            this._user = user;
            // Store the token into the local storage.
            localStorage.setItem("token", user.token);
            return user;
        } else if (response.status === 409) {
            throw new Error("Add user failed because username already exists");
        } else {
            throw new Error("Something went wrong");
        }
    }

    // login a user with credemtials
    async loginUser(username, password) {
        const requestBody = JSON.stringify({ username, password });
        const response = await api.post("/login", requestBody);
        if (response.status >= 200 && response.status < 300) {
            const user = response.data;
            // Store the token into the local storage.
            localStorage.setItem("token", user.token);
            this._user = user;
            return response.data;
        } else if (response.status === 409) {
            throw new Error("Login user failed because nouser under these credentials exists");
        } else {
            throw new Error("Something went wrong");
        }
    }

    // get user based on userId
    async getUser(userId) {
        const token = localStorage.getItem("token");
        const response = await api.get(`/users/${userId}?token=${token}`);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else if (response.status === 404) {
            throw new Error("User with userId was not found");
        } else if (response.status === 401) {
            throw new Error("Not authorized");
        } else {
            throw new Error("Something went wrong");
        }
    }

    async getUsers() {
        const token = localStorage.getItem("token");
        const response = await api.get(`/users?token=${token}`);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else if (response.status >= 300 && response.status < 400) {
            throw new Error("Bad request");
        } else {
            throw new Error("Something went wrong");
        }
    }

    // update username and password of a user
    async updateUser(userId, username, birthday) {
        const token = localStorage.getItem("token");
        const requestBody = JSON.stringify({ username, birthday });
        const response = await api.put(`/users/${userId}?token=${token}`, requestBody);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else if (response.status === 404) {
            throw new Error("User with userId was not found");
        } else if (response.status === 401) {
            throw new Error("Not authorized");
        } else if (response.status >= 400 && response.status < 500) {
            throw new Error("Username already exists or birthday format wrong");
        } else {
            throw new Error("Something went wrong");
        }
    }

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

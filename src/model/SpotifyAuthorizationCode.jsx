class spotifyAuthorizationCode {
    constructor(data = {}) {
        this.accessToken = null;
        Object.assign(this, data);
    }
}

export default spotifyAuthorizationCode;

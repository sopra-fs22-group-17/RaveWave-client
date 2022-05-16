class spotifyURL {
    redirectionURL: null;
    constructor(data = {}) {
        this.redirectionURL = null;
        Object.assign(this, data);
    }
}

export default spotifyURL;
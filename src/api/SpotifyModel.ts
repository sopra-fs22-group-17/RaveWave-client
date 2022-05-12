export class SpotifyAuthorizationCode {
    public accessToken: string;

    constructor(data: any = {}) {
        this.accessToken = null;
        Object.assign(this, data);
    }
}

export class SpotifyURL {
    public redirectionURL: string;

    constructor(data: any = {}) {
        this.redirectionURL = null;
        Object.assign(this, data);
    }
}

export class SpotifyURLAuthorizationCode {
    public code: string = null;

    constructor(data: any = {}) {
        this.code = null;
        Object.assign(this, data);
    }
}

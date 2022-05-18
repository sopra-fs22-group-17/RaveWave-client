export class SpotifyURL {
    public redirectionURL: string;

    constructor(data: any = {}) {
        this.redirectionURL = null;
        Object.assign(this, data);
    }
}

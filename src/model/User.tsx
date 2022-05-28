class User {
    token: string;
    id: null;
    private username: null;

    constructor(data = {}) {
        this.token = null;
        this.id = null;
        this.username = null;
        Object.assign(this, data);
    }
}

export default User;

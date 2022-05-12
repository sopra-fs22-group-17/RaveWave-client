export function getDomain(): string {
    const prodUrl = "https://sopra-fs22-group17-server.herokuapp.com/"; // TODO: insert your groups heroku prod url for server (once deployed)
    const devUrl = "https://sopra-fs22-group17-server.herokuapp.com/";
    // const prodUrl = "http://192.168.1.135:8080"; // TODO: insert your groups heroku prod url for server (once deployed)

    return devUrl;
    // return isProduction() ? prodUrl : devUrl;
}

export function getEndpoint(): string {
    return getDomain() + "ws";
}

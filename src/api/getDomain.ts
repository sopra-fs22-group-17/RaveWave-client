import { isProduction } from "./isProduction";

export function getDomain(): string {
    const prodUrl = "http://localhost:8080";
    const devUrl = "http://localhost:8080";

    //const prodUrl = "https://sopra-fs22-group17-server.herokuapp.com/";
    //const devUrl = "https://sopra-fs22-group17-server.herokuapp.com/";

    return isProduction() ? prodUrl : devUrl;
}

export function getEndpoint(): string {
    return getDomain() + "ws";
}

import {isProduction} from "./isProduction";

export function getDomain(): string {
    const prodUrl = "http://localhost:8080";
    const devUrl = "http://sopra-fs22-group17-server.herokuapp.com/";

    return isProduction() ? prodUrl : devUrl;
}

export function getEndpoint(): string {
    return getDomain() + "ws";
}

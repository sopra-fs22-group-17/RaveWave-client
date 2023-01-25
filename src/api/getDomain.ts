import { isProduction } from "./isProduction";

export function getDomain(): string {
    const devUrl = "https://sopra-fs22-group17-server.herokuapp.com/";
    const prodUrl = "http://localhost:8080";

    return isProduction() ? prodUrl : devUrl;
}

export function getEndpoint(): string {
    return getDomain() + "ws";
}

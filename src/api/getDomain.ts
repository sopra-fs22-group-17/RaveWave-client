import {isProduction} from "./isProduction";

export function getDomain(): string {
    const prodUrl = "https://sopra-fs22-group17-server.herokuapp.com/";
    //const devUrl = "https://sopra-fs22-group17-server.herokuapp.com/";
    //const prodUrl = "http://localhost:3000/";
    const devUrl = "http://localhost:8080/";
    // const prodUrl = "http://192.168.1.135:8080";

    return isProduction() ? prodUrl : devUrl;
}

export function getEndpoint(): string {
    return getDomain() + "ws";
}

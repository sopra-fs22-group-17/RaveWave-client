import { isProduction } from "./isProduction";

export function getDomain(): string {
    const devUrl = "https://rwbe.app.runonflux.io/";
    const prodUrl = "http://localhost:8080";

    return isProduction() ? prodUrl : devUrl;
}

export function getEndpoint(): string {
    return getDomain() + "ws";
}

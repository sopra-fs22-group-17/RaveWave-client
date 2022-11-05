import { isProduction } from "./isProduction";

export function getDomain(): string {
    const prodUrl = "https://rwbe.app.runonflux.io/";
    const devUrl = "http://localhost:3000";

    return isProduction() ? prodUrl : devUrl;
}

export function getEndpoint(): string {
    return getDomain() + "ws";
}

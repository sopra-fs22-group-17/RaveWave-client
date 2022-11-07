import { isProduction } from "./isProduction";

export function getDomain(): string {
    const devUrl = "https://ravewavewip.app.runonflux.io/";
    const prodUrl = "http://localhost:3000";

    return isProduction() ? prodUrl : devUrl;
}

export function getEndpoint(): string {
    return getDomain() + "ws";
}

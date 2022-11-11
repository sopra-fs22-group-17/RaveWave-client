import { isProduction } from "./isProduction";

export function getDomain(): string {
    const devUrl = "https://ravewavewip.app.runonflux.io/";
    const prodUrl = "https://ravewavewip.app.runonflux.io/";

    return isProduction() ? prodUrl : devUrl;
}

export function getEndpoint(): string {
    return getDomain() + "ws";
}

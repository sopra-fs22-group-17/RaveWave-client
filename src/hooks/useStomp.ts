import { StompApi } from "../api/StompApi";

const _stomp = new StompApi();

export const useStomp = () => {
    return _stomp;
};

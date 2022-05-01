import { useRef } from "react";

import { StompApi } from "../api/StompApi";

const _api = new StompApi();

export const useAPI = () => {
    const api = useRef<StompApi>(_api);
    // const api = useRef<IApi>(new StompApi());
    return api.current;
};

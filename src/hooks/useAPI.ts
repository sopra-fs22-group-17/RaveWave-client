import {useRef} from "react";

import {IApi} from "../api/@def";
import {MockupApi} from "../api/MockupApi";

const _api = new MockupApi();

export const useAPI = () => {
    const api = useRef<IApi>(_api);
    // const api = useRef<IApi>(new StompApi());
    return api.current;
};

import { useRef } from "react";
import { IApi } from "../api/@def";
import { MockupApi } from "../api/MockupApi";

export const useAPI = () => {
    const api = useRef<IApi>(new MockupApi());
    // const api = useRef<IApi>(new StompApi());
    return api.current;
};

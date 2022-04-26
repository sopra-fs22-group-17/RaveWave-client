import { useRef } from "react";
import { API } from "../api/API";

export const useAPI = () => {
    const api = useRef(new API());
    return api.current;
};

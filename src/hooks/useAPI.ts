import { RestApi } from "../api/RestApi";

const _api = new RestApi();

export const useApi = () => {
    return _api;
};

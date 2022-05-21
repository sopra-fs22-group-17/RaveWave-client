import {useMemo} from "react";
import {useLocation} from "react-router-dom";

export function useQuery(): URLSearchParams {
    const {search} = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}

export function useQueryParam(key: string) {
    const query = useQuery();

    if (query) {
        return query.get(key);
    } else {
        return null;
    }
}

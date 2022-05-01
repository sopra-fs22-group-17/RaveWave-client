import {createContext, useContext, useEffect, useState} from "react";

import {useAPI} from "hooks/useAPI";

import {TUserRole} from "../api/@def";
import {StompApi} from "../api/StompApi";
import {FCC} from "../components/@def";

interface IGameContext {
    api: StompApi;
    gameId?: string;
    userId?: string;
    userRole?: TUserRole;

    setGameId: (gameId: string) => void;
    setUserId: (userId: string) => void;
    setUserRole: (role: TUserRole) => void;
}

export interface IGameProviderProps {}

export const GameContext = createContext<IGameContext>(null);

export const GameProvider: FCC<IGameProviderProps> = ({ children }) => {
    const [gameId, setGameId] = useState<string>();
    const [userId, setUserId] = useState<string>();
    const [userRole, setUserRole] = useState<TUserRole>();
    const api = useAPI();

    const content: IGameContext = {
        api,
        gameId,
        userId,
        userRole,
        setGameId,
        setUserId,
        setUserRole,
    };

    useEffect(() => {
        console.log("   " + window.location);
    }, []);

    return (
        <GameContext.Provider value={content}>
            <ContextGuard children={children} />
        </GameContext.Provider>
    );
};

const ContextGuard: FCC<{}> = ({ children }) => {
    const context = useContext(GameContext);

    if (!context) return null;
    return <>{children}</>;
};

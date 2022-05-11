import { showNotification } from "@mantine/notifications";
import { useApi } from "hooks/useApi";
import { createContext, useContext, useEffect, useState } from "react";
import { IGameConfiguration, TUserRole } from "../api/@def";
import { RestApi } from "../api/RestApi";
import { SONG_POOLS, StompApi } from "../api/StompApi";
import { FCC } from "../components/@def";
import { useStomp } from "../hooks/useStomp";

interface IGameContext {
    info: (message: string) => void;
    error: (message: string) => void;

    api: RestApi;
    stomp: StompApi;
    lobbyId?: string;
    userId?: string;
    userRole?: TUserRole;
    playerName?: string;
    gameConfiguration?: IGameConfiguration;

    setLobbyId: (lobbyId: string) => void;
    setUserId: (userId: string) => void;
    setUserRole: (role: TUserRole) => void;
    setPlayerName: (playerName: string) => void;
    setGameConfiguration: (config: IGameConfiguration) => void;
}

export interface IGameProviderProps {}

export const GameContext = createContext<IGameContext>(null);

export const GAME_CONFUGURATION: IGameConfiguration = {
    roundDuration: 15,
    gameMode: "Guess the song",
    gameRounds: 15,
    playBackDuration: 15,
    songPool: SONG_POOLS[0].id,
};

export const GameProvider: FCC<IGameProviderProps> = ({ children }) => {
    const [lobbyId, setLobbyId] = useState<string>();
    const [userId, setUserId] = useState<string>();
    const [userRole, setUserRole] = useState<TUserRole>();
    const [playerName, setPlayerName] = useState<string>("Anonymous");
    const [gameConfiguration, setGameConfiguration] = useState<IGameConfiguration>(GAME_CONFUGURATION);
    const api = useApi();
    const stomp = useStomp();

    const info = (message: string) => {
        console.log(message);
        showNotification({
            title: "Info",
            message,
        });
    };
    const error = (message: string) => {
        console.error(message);
        showNotification({
            title: "Error",
            color: "red",
            message,
        });
    };

    const content: IGameContext = {
        info,
        error,
        api,
        stomp,
        lobbyId,
        userId,
        userRole,
        playerName,
        gameConfiguration,
        setLobbyId,
        setUserId,
        setUserRole,
        setPlayerName,
        setGameConfiguration,
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

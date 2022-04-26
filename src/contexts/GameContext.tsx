import { Box } from "@mantine/core";
import { createContext, useEffect, useState } from "react";
import { TUserRole } from "../api/@def";
import { FCC } from "../components/@def";

interface IGameContext {
    role?: TUserRole;
    gameId?: string;
}

export interface IGameProviderProps {
    gameIdentifier: string;
}

export const GameContext = createContext<IGameContext>({});

export const GameProvider: FCC<IGameProviderProps> = ({ gameIdentifier, children }) => {
    const [role, setRole] = useState<TUserRole>();
    const [gameId, setGameId] = useState<string>(gameIdentifier);

    const content: IGameContext = {
        role,
        gameId,
    };

    useEffect(() => {
        console.log("   " + window.location);
    }, []);

    const type = gameId ? "Player" : "Host";

    return (
        <GameContext.Provider value={content}>
            <Box>{type}</Box>
            {children}
        </GameContext.Provider>
    );
};

import { Box } from "@mantine/core";
import { createContext, useEffect, useState } from "react";
import { TUserRole } from "../api/@def";
import { FCC } from "../components/@def";

interface IGameContext {
    role?: TUserRole;
    gameId?: string;
}

export interface IGameProviderProps {
    gameId: string;
}

export const GameContext = createContext<IGameContext>({});

export const GameProvider: FCC<IGameProviderProps> = ({ gameId, children }) => {
    const [role, setRole] = useState<TUserRole>();

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

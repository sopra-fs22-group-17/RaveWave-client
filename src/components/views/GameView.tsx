import { FC } from "react";
import { useParams } from "react-router-dom";
import { TUserRole } from "../../api/@def";
import { GameProvider } from "../../contexts/GameContext";
import { GameController } from "./GameController";

export const GameView: FC<{}> = ({}) => {
    const { id } = useParams<any>();

    const role: TUserRole = id ? "player" : "host";
    console.log("==> " + id);

    return (
        <GameProvider gameIdentifier={id}>
            <GameController role={role} />
        </GameProvider>
    );
};

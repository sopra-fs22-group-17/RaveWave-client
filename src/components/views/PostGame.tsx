import { Container, Stack } from "@mantine/core";
import { FC, useContext } from "react";

import { IGameResult } from "../../api/@def";
import { GameContext } from "../../contexts/GameContext";
import { GameResult } from "../ui/GameResult";
import Podium from "../ui/Podium";
import { IGameController } from "./GameController";

export interface IPostGameProps {
    controller: IGameController;
    result: IGameResult;
}

export const PostGame: FC<IPostGameProps> = ({ controller, result }) => {
    const context = useContext(GameContext);
    if (!result) return null;

    const podiumData = result.players.map((player, position) => ({ ...player, position }));

    return (
        <Container size={500}>
            <Stack align="center">
                <h1>Final Results</h1>
                <Podium players={podiumData} />
                <GameResult result={result} />
            </Stack>
        </Container>
    );
};
